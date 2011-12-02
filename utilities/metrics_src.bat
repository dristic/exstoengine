echo off
echo "Running LOC metrics on ExstoEngine source code"

cloc.exe ../lib/exstoengine/src --out="output_metrics_src.txt" --by-file-by-lang
