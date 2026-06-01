#!/usr/bin/env bash
#
# Tvashtra — one-line installer for Linux.
#
#   curl -fsSL https://misc42.github.io/tvashtra-landing/install.sh | bash
#
# Installs the latest `.AppImage` from the public Releases on
# `Misc42/tvashtra-landing` into `~/.local/bin/tvashtra` plus a
# Desktop Entry so the app shows up in your GNOME / KDE / XFCE
# Activities search as "Tvashtra".
#
# The AppImage is self-contained — it carries its own OCCT 7.8
# shared libraries inside the squashfs payload. The .deb and .rpm
# variants on the same release page link against the host's
# `libTKDE.so.7.8`, which Ubuntu 22.04 / 24.04 LTS do NOT ship
# (their repos are stuck on OCCT 7.5). The installer therefore
# chooses the AppImage path for everyone, on every distro,
# regardless of which package manager you have. No sudo needed,
# no apt / dnf / pacman branching, no root.
#
# What the host MUST already have (universal across modern distros):
#   - glibc ≥ 2.31  (Ubuntu 20.04+, Fedora 32+, Debian 11+)
#   - WebKit2GTK 4.1 + GTK 3 + libsoup 3 + libjavascriptcoregtk 4.1
#     (Tauri 2's WebKit shell needs these — almost always present
#      on any desktop Linux with a modern browser)
#   - FUSE  (the AppImage mounts via FUSE on launch; modern distros
#      ship FUSE3 by default, AppImage's libfuse2 shim is bundled)
#
# Optional, only needed if you use the Stress preview feature:
#   - calculix-ccx  (the FEM solver)
#   - gmsh           (the mesher)
# These are NOT installed by this script — they're heavy and most
# users won't touch FEM. If you want Stress preview, install them
# with your package manager:
#   sudo apt install calculix-ccx gmsh    # Debian / Ubuntu
#   sudo dnf install calculix gmsh        # Fedora
#
# This script is intentionally idempotent — running it twice on the
# same machine is a no-op (or upgrades if a new version is on the
# Releases page).

set -euo pipefail

# ─── Config ───────────────────────────────────────────────────────────
VERSION="0.9.0"
TAG="v${VERSION}"
ASSET="Tvashtra_${VERSION}_amd64.AppImage"
RELEASE_BASE="https://github.com/Misc42/tvashtra-landing/releases/download/${TAG}"

INSTALL_DIR="${INSTALL_DIR:-${HOME}/.local/bin}"
APPIMAGE_PATH="${INSTALL_DIR}/tvashtra"
APPS_DIR="${HOME}/.local/share/applications"
ICONS_DIR="${HOME}/.local/share/icons/hicolor/256x256/apps"
DESKTOP_FILE="${APPS_DIR}/Tvashtra.desktop"

# ─── Colours ──────────────────────────────────────────────────────────
if [ -t 1 ]; then
    RED=$'\033[0;31m'
    GREEN=$'\033[0;32m'
    YELLOW=$'\033[1;33m'
    DIM=$'\033[0;90m'
    BOLD=$'\033[1m'
    NC=$'\033[0m'
else
    RED= GREEN= YELLOW= DIM= BOLD= NC=
fi

info()  { printf "${GREEN}[✓]${NC} %s\n" "$*"; }
warn()  { printf "${YELLOW}[!]${NC} %s\n" "$*"; }
fail()  { printf "${RED}[✗]${NC} %s\n" "$*" >&2; exit 1; }
step()  { printf "\n${BOLD}── %s${NC}\n" "$*"; }

# ─── Pre-flight ───────────────────────────────────────────────────────
detect_os() {
    case "$(uname -s)" in
        Linux*)  OS="linux";;
        Darwin*) fail "macOS is not in v${VERSION}. Track: https://github.com/Misc42/tvashtra-landing/releases";;
        *) fail "Unsupported OS: $(uname -s). v${VERSION} ships Linux only.";;
    esac
}

detect_arch() {
    case "$(uname -m)" in
        x86_64|amd64) ARCH="x86_64";;
        *) fail "Unsupported architecture: $(uname -m). v${VERSION} ships x86_64 only (no ARM64 yet).";;
    esac
}

check_glibc() {
    if ! command -v ldd &>/dev/null; then
        warn "ldd not found — skipping glibc version check"
        return 0
    fi
    local v
    v=$(ldd --version 2>&1 | head -1 | grep -oE '[0-9]+\.[0-9]+' | head -1)
    if [ -z "$v" ]; then
        warn "could not parse glibc version — proceeding anyway"
        return 0
    fi
    local major minor
    major=$(echo "$v" | cut -d. -f1)
    minor=$(echo "$v" | cut -d. -f2)
    if [ "$major" -lt 2 ] || { [ "$major" -eq 2 ] && [ "$minor" -lt 31 ]; }; then
        fail "glibc ${v} is too old. Tvashtra needs ≥ 2.31 (Ubuntu 20.04+, Debian 11+, Fedora 32+)."
    fi
    info "glibc ${v}"
}

check_downloader() {
    if command -v curl &>/dev/null; then DL="curl"
    elif command -v wget &>/dev/null; then DL="wget"
    else fail "neither curl nor wget found. Install one (e.g. 'apt install curl') and re-run."
    fi
    info "downloader: ${DL}"
}

check_webkit_gtk() {
    # libwebkit2gtk-4.1-0 and libgtk-3-0 are runtime libs the AppImage's
    # bundled webkit shell loads from the host. The AppImage payload
    # contains everything else; webkit + gtk live on the host because
    # they wire deeply into the user's display server + GPU stack.
    local missing=()
    for lib in libwebkit2gtk-4.1.so libgtk-3.so libsoup-3.0.so libjavascriptcoregtk-4.1.so; do
        if ! ldconfig -p 2>/dev/null | grep -q "${lib}"; then
            missing+=("${lib}")
        fi
    done
    if [ ${#missing[@]} -gt 0 ]; then
        warn "missing host runtime libs: ${missing[*]}"
        printf "    ${DIM}Tvashtra needs WebKit2GTK 4.1 + GTK 3 + libsoup 3 on the host.${NC}\n"
        printf "    ${DIM}On Debian / Ubuntu:${NC}\n"
        printf "      ${BOLD}sudo apt install libwebkit2gtk-4.1-0 libgtk-3-0 libsoup-3.0-0 libjavascriptcoregtk-4.1-0${NC}\n"
        printf "    ${DIM}On Fedora:${NC}\n"
        printf "      ${BOLD}sudo dnf install webkit2gtk4.1 gtk3 libsoup3${NC}\n\n"
        read -rp "    Try to install them now via sudo? [y/N] " yn
        case "$yn" in
            y|Y|yes)
                if command -v apt-get &>/dev/null; then
                    sudo apt-get update -qq
                    sudo apt-get install -y libwebkit2gtk-4.1-0 libgtk-3-0 libsoup-3.0-0 libjavascriptcoregtk-4.1-0
                elif command -v dnf &>/dev/null; then
                    sudo dnf install -y webkit2gtk4.1 gtk3 libsoup3
                else
                    fail "no apt or dnf found — install the libs manually then re-run."
                fi
                info "webkit + gtk libs installed"
                ;;
            *)
                fail "aborted — install the runtime libs then re-run this script."
                ;;
        esac
    else
        info "webkit2gtk-4.1 + gtk-3 + libsoup-3 + javascriptcoregtk-4.1 present"
    fi
}

check_disk_space() {
    local need_mb=200
    local free_mb
    free_mb=$(df --output=avail -BM "$HOME" 2>/dev/null | tail -1 | tr -d 'M ' || echo 999999)
    if [ "${free_mb:-999999}" -lt "$need_mb" ]; then
        fail "less than ${need_mb} MB free in ${HOME}. Free up space and re-run."
    fi
    info "disk space ok (${free_mb} MB free in ${HOME})"
}

check_existing() {
    if [ -x "${APPIMAGE_PATH}" ]; then
        local current
        current=$("${APPIMAGE_PATH}" --version 2>/dev/null | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1 || echo "?")
        if [ "$current" = "${VERSION}" ]; then
            info "Tvashtra v${VERSION} already installed at ${APPIMAGE_PATH} — nothing to do"
            info "launch from your Activities search: ${BOLD}Tvashtra${NC}"
            exit 0
        else
            warn "found existing install v${current} — upgrading to v${VERSION}"
        fi
    fi
}

# ─── Download ─────────────────────────────────────────────────────────
download() {
    local url="$1" out="$2" what="$3"
    info "downloading ${what}"
    case "$DL" in
        curl) curl -fL --retry 3 --retry-delay 2 --proto '=https' --tlsv1.2 \
                  -o "$out" "$url" || fail "download failed: $url" ;;
        wget) wget --tries=3 --waitretry=2 -qO "$out" "$url" \
                  || fail "download failed: $url" ;;
    esac
    if [ ! -s "$out" ]; then fail "downloaded file is empty: $out"; fi
}

verify_sha() {
    local file="$1" sumfile="$2"
    if [ ! -s "$sumfile" ]; then
        warn "checksum sidecar missing — proceeding without integrity check"
        return 0
    fi
    if ! command -v sha256sum &>/dev/null; then
        warn "sha256sum not found — skipping integrity check"
        return 0
    fi
    local expected actual
    expected=$(awk '{print $1}' "$sumfile")
    actual=$(sha256sum "$file" | awk '{print $1}')
    if [ "$expected" != "$actual" ]; then
        fail "SHA-256 mismatch:\n  expected ${expected}\n  actual   ${actual}\nNetwork tampering or partial download — re-run the installer."
    fi
    info "SHA-256 verified"
}

# ─── Install + Desktop integration ────────────────────────────────────
install_appimage() {
    mkdir -p "${INSTALL_DIR}" "${APPS_DIR}" "${ICONS_DIR}"
    local tmp
    tmp=$(mktemp -d -t tvashtra-install.XXXXXX)
    trap "rm -rf '${tmp}'" EXIT INT TERM

    download "${RELEASE_BASE}/${ASSET}"        "${tmp}/${ASSET}"        "${ASSET}"
    download "${RELEASE_BASE}/${ASSET}.sha256" "${tmp}/${ASSET}.sha256" "checksum"
    verify_sha "${tmp}/${ASSET}" "${tmp}/${ASSET}.sha256"

    chmod +x "${tmp}/${ASSET}"
    mv "${tmp}/${ASSET}" "${APPIMAGE_PATH}"
    info "installed binary: ${APPIMAGE_PATH}"

    # Extract the icon from the AppImage so the Desktop Entry can
    # reference it locally instead of pointing inside the AppImage
    # (which would break if the file is moved). AppImage's own
    # --appimage-extract honours a glob.
    pushd "${tmp}" >/dev/null
    "${APPIMAGE_PATH}" --appimage-extract '*.desktop' &>/dev/null || true
    "${APPIMAGE_PATH}" --appimage-extract '*.png' &>/dev/null || true
    if [ -f squashfs-root/tvashtra.png ]; then
        cp squashfs-root/tvashtra.png "${ICONS_DIR}/tvashtra.png"
    elif [ -f squashfs-root/Tvashtra.png ]; then
        cp squashfs-root/Tvashtra.png "${ICONS_DIR}/tvashtra.png"
    elif [ -f squashfs-root/usr/share/icons/hicolor/256x256/apps/tvashtra.png ]; then
        cp squashfs-root/usr/share/icons/hicolor/256x256/apps/tvashtra.png "${ICONS_DIR}/tvashtra.png"
    fi
    popd >/dev/null
    info "icon: ${ICONS_DIR}/tvashtra.png"

    cat > "${DESKTOP_FILE}" <<EOF
[Desktop Entry]
Type=Application
Name=Tvashtra
GenericName=LLM CAD
Comment=Desktop-first, LLM-driven CAD product
Exec=${APPIMAGE_PATH} %F
Icon=tvashtra
Terminal=false
Categories=Development;Engineering;Graphics;3DGraphics;
Keywords=cad;3d;model;llm;ai;geometry;mechanical;
StartupNotify=true
StartupWMClass=Tvashtra
EOF
    info "desktop entry: ${DESKTOP_FILE}"

    # Refresh the desktop database + icon cache so the Activities
    # search picks up Tvashtra immediately instead of after a relog.
    if command -v update-desktop-database &>/dev/null; then
        update-desktop-database "${APPS_DIR}" 2>/dev/null || true
    fi
    if command -v gtk-update-icon-cache &>/dev/null; then
        gtk-update-icon-cache -q -t "${HOME}/.local/share/icons/hicolor" 2>/dev/null || true
    fi
    info "Activities search refreshed"
}

ensure_path() {
    # ~/.local/bin is on PATH by default on most modern distros via
    # `~/.profile` (Debian/Ubuntu) or `~/.bash_profile`/`~/.zprofile`
    # (Fedora etc.). Surface a hint if it isn't, so the user can also
    # launch from a terminal.
    case ":${PATH}:" in
        *":${INSTALL_DIR}:"*) info "${INSTALL_DIR} is on PATH";;
        *) warn "${INSTALL_DIR} is NOT on PATH — terminal launch needs full path. Activities search still works."
           printf "    Add to your shell profile: ${BOLD}export PATH=\"\$HOME/.local/bin:\$PATH\"${NC}\n";;
    esac
}

# ─── Final message ────────────────────────────────────────────────────
show_done() {
    echo
    printf "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    printf "  ${GREEN}${BOLD}Tvashtra v${VERSION} ready.${NC}  ${DIM}त्वष्टृ${NC}\n"
    printf "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    echo
    echo "  Open the Activities search → type ${BOLD}Tvashtra${NC} → Enter."
    echo
    echo "  ${DIM}First run:${NC}"
    echo "    1. Settings → Providers → paste an Anthropic / OpenAI / Google API key,"
    echo "       OR set ${BOLD}ANTHROPIC_API_KEY${NC} in your environment before launch."
    echo "    2. Type in the Assistant pane: ${YELLOW}M3 nut, 5.5 across flats, 2.4 thick${NC}"
    echo "    3. Watch the model emit sketch → extrude → boolean_diff."
    echo "    4. Click Export to save STL / STEP / OBJ."
    echo
    echo "  ${DIM}Optional — Stress preview needs:${NC} sudo apt install calculix-ccx gmsh"
    echo
    echo "  ${DIM}Uninstall:${NC} rm ${APPIMAGE_PATH} ${DESKTOP_FILE} ${ICONS_DIR}/tvashtra.png"
    echo
}

# ─── Entry ────────────────────────────────────────────────────────────
main() {
    printf "\n${BOLD}Tvashtra installer${NC}  ${DIM}v${VERSION}${NC}\n"
    printf "${DIM}━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

    step "Pre-flight"
    detect_os
    detect_arch
    check_glibc
    check_downloader
    check_disk_space
    info "host: ${OS} / ${ARCH}"

    step "Host runtime libraries"
    check_webkit_gtk

    step "Existing install"
    check_existing

    step "Download + verify"
    install_appimage

    step "Shell PATH"
    ensure_path

    show_done
}

main "$@"
