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
			echo 	"<h3>$row->title</h3>".
					"<p>By $row->author on $row->date</p>".
					"<p>$row->body</p>".
					"<p>".anchor('Blog/Comments/'.$row->id,'Comments')."</p>".
					"<hr>";
		}
	}
?>
</body>
</html>