<html>
<head>
<title><?=$title?></title>
</head>
<body>
<?php
	echo "<h1>$title</h1>"."<h2>$heading</h2>";
	echo 	"<p>Total entries: $entryCount</p>".
			"<p>$error</p>";
	
	if ($canPost)
	{
		echo "<p>".anchor('Blog/NewEntry/', 'New Blog Entry')."</p>";
	}
	
	if ($entryCount > 0)
	{	
		$snippetLength = 100;		
		foreach($blogEntries as $entry)
		{
			$snippet = mb_substr($entry->body, 0, $snippetLength);
			if(strlen($snippet) == $snippetLength){
				$snippet = $snippet."...";
			}
			
			echo 	"<h3>$entry->title</h3>".
					"<p>By ". $entry->username ." on ".$entry->date."</p>".
					"<p>Viewable to ". $entry->tagName ."</p>".
					"<p>$snippet</p>".
					"<p>".anchor('Blog/Entry/'.$entry->entryID,'Read More')."</p>".
					"<hr>";
		}
	}
?>
</body>
</html>