echo off


echo "Running LOC metrics on ExstoEngine source code"


cloc.exe ../../game/ --out="output_metrics_shooter_demo.txt" --by-file-by-lang
