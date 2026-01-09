#!/bin/bash

set -euo pipefail

BIB="bib-refs.bib"
TMP="bib-refs.html"
OUT="pubs-list.html"

echo "▶ Checking prerequisites..."

command -v bibtex2html >/dev/null 2>&1 || {
  echo "✖ bibtex2html not found. Please install it first."
  exit 1
}

[ -f "$BIB" ] || {
  echo "✖ $BIB not found in current directory."
  exit 1
}

echo "▶ Running bibtex2html..."

bibtex2html -nodoc -noheader -linebreak -d -dl "$BIB"

[ -f "$TMP" ] || {
  echo "✖ Expected output file $TMP was not created."
  exit 1
}

echo "▶ Extracting publication list..."

sed -n '/<dl>/,/<\/dl>/p' "$TMP" > "$OUT"

rm "$TMP"

echo "✔ Done. Publication list written to $OUT"

# Unfortunately after this u must adapt the file and copy to html
