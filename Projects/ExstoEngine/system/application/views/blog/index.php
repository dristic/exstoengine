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
		echo 	"<p>Total entries: $rowCount</p>".
				"<p>$error</p>";
		
		if ($user->group_id == 1)
		{
			echo "<p>".anchor('Blog/NewEntry/', 'New Blog Entry')."</p>";
		}
		else
		{
			echo "<p><strong>You do not have permission to create new blog entries.</strong></p>";
		}
		
		if ($rowCount > 0)
		{			
			
			foreach($query->result() as $row)
			{
				$rowUser = $this->db->get_where('User', array('id' => $row->author_id), 1)->result();
				echo 	"<h3>$row->title</h3>".
						"<p>By ". $rowUser[0]->username ." on ".$row->date."</p>".
						"<p>$row->body</p>".
						"<p>".anchor('Blog/Comments/'.$row->id,'Comments')."</p>".
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