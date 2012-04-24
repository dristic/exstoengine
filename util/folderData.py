#################################
# This file is deprecated as of 4/24/2012
################################# 

import os, os.path, shutil, sys

#minify method on all input files
def minify(inputFiles, outputFile, inType = 'js', tempFile='.temp'):
    temp = open(tempFile, 'w')
    for file in inputFiles:
        fileHandler = open(file)
        data = fileHandler.read() + '\n'
        fileHandler.close()
        temp.write(data)
    temp.close()

    options = [' -o \"{0}\"'.format(outputFile),
               ' -m packer']

    packerCall = '\"\"C:/Program Files (x86)/SmallSharpTools/Packer for .Net/bin/Packer.exe\"'
    packerCall += options[0]
    packerCall += options[1]
    for file in inputFiles:
        packerCall += ' \"{0}\"'.format(file)
    os.system(packerCall)

    originalSize = os.path.getsize(tempFile)
    minifiedSize = os.path.getsize(outputFile)

    print ('{0:.3f} kB --> {1:.3f} kB, {2:.2f}% reduction'.format(
        originalSize / 1024.0,
        minifiedSize / 1024.0,
        float(originalSize - minifiedSize) / originalSize * 100))


#################################################################
#begin minification script                                      #
#                                                               #
#input format:                                                  #
#       "minifyDirectory.py [input directory] [output file]"    #
#################################################################
inputDir = sys.argv[1]
outputFile = sys.argv[2]
inputFiles = []

for root, subFolders, files in os.walk(inputDir):
    if '.svn' in subFolders:
        subFolders.remove('.svn')
    for file in files:
        inputFiles.append(os.path.join(root,file))
minify(inputFiles, outputFile)
