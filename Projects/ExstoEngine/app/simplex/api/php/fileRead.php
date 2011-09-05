<?php

	require_once('model/AjaxResponse.php');
	require_once('model/File.php');
	
	$rootDir = $_POST['dir'];
	if($rootDir != "") {
		chdir($rootDir);
	}

	$file = fopen($_POST['file'], "r") or exit("Unable to open file!");
	//Output a line of the file until the end is reached
	while(!feof($file)) {
		echo fgets($file). "\n";
	}
	
	fclose($file);
	
?>