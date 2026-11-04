#!/bin/sh
# Builds both resume PDFs. Site copy (no phone) -> public/, personal copy (with phone) -> ~/Desktop.
set -e
cd "$(dirname "$0")"
mkdir -p build
tectonic -X compile --outdir build resume.tex
tectonic -X compile --outdir build resume-phone.tex
cp build/resume.pdf ../public/Pushpam-Raj-Satyarthi-Resume.pdf
cp build/resume-phone.pdf "$HOME/Desktop/Pushpam-Raj-Satyarthi-Resume-2026.pdf"
# Guard: the site copy must never contain the phone number (read from the local-only resume-phone.tex).
PHONE_TAIL=$(sed -n 's/.*phonenumber{\(.*\)}.*/\1/p' resume-phone.tex | tr -cd '0-9' | tail -c 6)
PHONE_TAIL="$PHONE_TAIL" swift -e 'import Foundation; import PDFKit; let tail = ProcessInfo.processInfo.environment["PHONE_TAIL"] ?? ""; let t = PDFDocument(url: URL(fileURLWithPath: "../public/Pushpam-Raj-Satyarthi-Resume.pdf"))!.string?.filter(\.isNumber) ?? ""; if !tail.isEmpty && t.contains(tail) { print("site resume contains the phone number"); exit(1) }; print("site resume: no phone ✓")'
