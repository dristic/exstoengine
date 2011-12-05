echo off


echo "Running LOC metrics on ExstoEngine source code"


cloc.exe ../examples/preloaderTest/ --out="output_metrics_platformer.txt" --by-file-by-lang
