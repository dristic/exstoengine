import os, os.path, shutil, sys
from array import array

#minify method to create a full minified directory listing
def minify(originDirectory, inputDirectory, inputFiles, outputDirectory, inType = 'js'):
    options = ['',
               '-m packer']
    fileMetrics = []
    
    for file in inputFiles:
        inputFile = '{0}/{1}/{2}'.format(originDirectory, inputDirectory, file)
        #print("Reading {0}.\n".format(inputFile))
        fileHandler = open(inputFile)
        data = fileHandler.read()
        fileHandler.close()
        outputPath = os.path.join(originDirectory, outputDirectory, os.path.split(file)[0]) 
        outputFile = os.path.join(outputPath, os.path.split(file)[1])
        
        if not os.path.exists(outputPath):
            #print("Creating directory {0}.\n".format(outputPath))
            os.makedirs(outputPath)
        if not os.path.exists(outputFile):
            #print("Creating file {0}.\n".format(outputFile))
            open(outputFile, 'w+').close()
                
        options[0] = '-o \"\"{0}\"'.format(outputFile)
        os.system('\"\"C:/Program Files (x86)/SmallSharpTools/Packer for .Net/bin/Packer.exe\" {0[0]} {0[1]} {1}'.format(
            options,
            os.path.join(originDirectory, inputDirectory, file)))
        fileMetrics.append(
            {'name': file,
             'originalSize': os.path.getsize(inputFile),
             'minifiedSize':os.path.getsize(outputFile)})
    totalOriginalSize = 0
    totalMinifiedSize = 0
    print('\n\n______________________________OUTPUT__________________________\n\n');
    for metric in fileMetrics:
        totalOriginalSize += metric['originalSize']
        totalMinifiedSize += metric['minifiedSize']
        print("{0}: \t{1:.3f}kB -> {2:.3f}kB \t{3:.2f}% reduction".format(
            metric['name'],
            metric['originalSize'] / 1024.0,
            metric['minifiedSize'] / 1024.0,
            float(metric['originalSize'] - metric['minifiedSize']) / metric['originalSize'] * 100))

    print("TOTAL________________________________\n\t\t{0:.3f}kB -> {1:.3f}kB \t{2:.2f}% reduction".format(
        totalOriginalSize / 1024.0,
        totalMinifiedSize / 1024.0,
        float(totalOriginalSize - totalMinifiedSize) / totalOriginalSize * 100))
    


print('______________________Minify____________________________\n')

inputDirectory = sys.argv[1]
outputDirectory = sys.argv[2]
inputFiles = []
originalWorkingDirectory = os.getcwd()
print(originalWorkingDirectory)
os.chdir(inputDirectory)
print("Switching directory to {}\n".format(os.getcwd()))

print("Walking input directory \"{}\" and ignoring .svn folders.\n".format(inputDirectory))
for root, subFolders, files in os.walk(os.getcwd()):
    if '.svn' in subFolders:
        subFolders.remove('.svn')
    for file in files:
        inputFiles.append(os.path.join(root[len(os.getcwd())+1:],file))
        print("Found: \"{}\"".format(inputFiles[-1]))

print("\nMoving back to original directory \"{}\"\n".format(originalWorkingDirectory))
os.chdir(originalWorkingDirectory)

print("**************Begin minification**************\n\n")
minify(originalWorkingDirectory, inputDirectory, inputFiles, outputDirectory)

        
