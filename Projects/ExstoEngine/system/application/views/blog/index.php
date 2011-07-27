<html>
<head>
<title><?=$title?></title>
</head>
<body>
<h1><?=$title?></h1>
<h2><?=$heading?></h2>
<?php
	if ($this->ion_auth->logged_in())
	{
		echo 	"<p>Total entries: $rowCount</p>".
				"<p>$error</p>".
				"<p>".anchor('Blog/NewEntry/', 'New Blog Entry')."</p>";
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
		echo "<p><strong>You must login before posting comments.</strong></p>";
	}
?>
</body>
</html>