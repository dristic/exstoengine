<?php
	
	require_once('model/AjaxResponse.php');
	require_once('model/File.php');

	$list = array();

	// Define the full path to your folder from root
	$rootDir = $_GET['dir'];
	if($rootDir != '') {
		chdir($rootDir);
	}
    $path = getcwd(); 

    // Open the folder 
    $dir_handle = @opendir($path) or die("Unable to open $path"); 

    // Loop through the files 
    while ($file = readdir($dir_handle)) { 

	    if($file == "." || $file == ".." || $file == "index.php" )
	        continue;
	        
        array_push($list, new File($file, is_dir($file)));
    }

    // Close 
    closedir($dir_handle);
    
    $response = new AjaxResponse();
    $response->data = $list;

    echo json_encode($response);

?>