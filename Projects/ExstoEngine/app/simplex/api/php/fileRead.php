<?php

	require_once('model/AjaxResponse.php');
	require_once('model/File.php');
	
	// Change to a different root directory if needed
	$rootDir = $_POST['dir'];
	if($rootDir != "") {
		chdir($rootDir);
	}
	
	// Open the file
	$file = fopen($_POST['file'], "r") or exit("Unable to open file!");
	
	// Output a line of the file until the end is reached
	while(!feof($file)) {
		echo fgets($file). "\n";
	}
	
	// Close the file
	fclose($file);
	
?>