<?php
	
	require_once('model/AjaxResponse.php');
	require_once('model/File.php');

	$list = array();

	// Change to a different root directory if needed
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
    
    // Format response
    $response = new AjaxResponse();
    $response->data = $list;

   	// JSON encode and send
    echo json_encode($response);

?>