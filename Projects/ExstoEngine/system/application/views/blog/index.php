<html>
<head>
<title><?=$title?></title>
</head>
<body>
<?php

echo "<h1>$title</h1>"."<h2>$heading</h2>";

	if ($this->ion_auth->logged_in())
	{
		$user = $this->ion_auth->get_user();
		echo 	"<p>Total entries: $entryCount</p>".
				"<p>$error</p>";
		
		if ($user->group_id == 1)
		{
			echo "<p>".anchor('Blog/NewEntry/', 'New Blog Entry')."</p>";
		}
		else
		{
			echo "<p><strong>You do not have permission to create new blog entries.</strong></p>";
		}
		
		if ($entryCount > 0)
		{			
			foreach($blogEntries as $entry)
			{
				echo 	"<h3>$entry->title</h3>".
						"<p>By ". $entry->username ." on ".$entry->date."</p>".
						"<p>$entry->body</p>".
						"<p>".anchor('Blog/Comments/'.$entry->id,'Comments')."</p>".
						"<hr>";
			}
		}
	}
	else
	{
		echo "<p><strong>You must login to view this page.</strong></p>";
	}
?>
</body>
</html>