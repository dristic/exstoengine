echo off


echo "Running LOC metrics on ExstoEngine source code"


cloc.exe ../lib/exstoengine/examples/platformer/ --out="output_metrics_platformer.txt" --by-file-by-lang
