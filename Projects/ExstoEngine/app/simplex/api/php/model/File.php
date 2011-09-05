<?php 

class File {
	public $name;
	public $isDir;
	
	function File($name, $isDir) {
		$this->name = $name;
		$this->isDir = $isDir;
	}
}

?>