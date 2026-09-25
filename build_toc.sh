#!/bin/bash
set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"

echo "=== Step 1: Building initial docx ==="
node build_cookbook.js

echo "=== Step 2: Converting to PDF ==="
libreoffice --headless --convert-to pdf "Family Cookbook.docx" --outdir "$DIR" 2>&1

echo "=== Step 3: Extracting PDF text ==="
pdftotext -layout "Family Cookbook.pdf" cookbook_text.txt

echo "=== Step 4: Finding page numbers ==="
node find_pages.js

echo "=== Step 5: Rebuilding docx with real page numbers ==="
node build_cookbook.js

echo "=== Step 6: Generating website ==="
node build_website.js

echo "=== Done! ==="
