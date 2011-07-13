<html>
<head>
<title><?=$title?></title>
</head>
<body>
<h1><?=$title?></h1>
<h2><?=$heading?></h2>

<p> Total entries: <?=$rowCount?></p>
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
?>


<h3>Submit a Comment:</h3>
<?=form_open('blog/comment_insert'); ?>
<?=form_hidden('entry_id', $this->uri->segment(3));?>

<p><textarea name="body" rows="10"></textarea></p>
<p><input type="text" name="author_id"/></p>
<p><input type="submit" value="Submit Comment"/></p>

</body>
</html>