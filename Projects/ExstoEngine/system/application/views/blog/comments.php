<html>
<head>
<title><?=$title?></title>
</head>
<body>
<h1><?=$title?></h1>
<h3><?=$heading?></h3>

<p> Total comments: <?=$rowCount?></p>
<p><?=$error?></p>
<?php 
	if ($rowCount > 0)
	{
		foreach($query->result() as $row)
		{
			echo 	"<p>By $row->author_id on $row->date</p>".
					"<p>$row->body</p>".
					"<hr>";
		}
	}	
	echo "<p>".anchor('Blog','Back to Blog')."</p>";

	if ($this->ion_auth->logged_in())
	{
		echo '<h1> Submit a comment: </h1>'.
			 '<p><textarea name="body" rows="10"></textarea></p>'.
			 '<p><input type="submit" value="Submit Comment"/></p>';
		form_open('blog/comment_insert');
		form_hidden('author_id',$this->ion_auth->get_user());
		form_hidden('entry_id', $this->uri->segment(3));
		form_hidden('date', date("Y-m-d H:i:s", now()));
	}
	else
	{
		echo "<p><strong>You must login before posting comments.</strong></p>";
	}
?>



</body>
</html>