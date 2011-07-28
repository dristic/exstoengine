<html>
<head>
<title><?=$title?></title>
</head>
<body>
<?php
	if($canView)
	{
		echo 	"<h1>$blogEntry->title</h1>".
				"<h3>By ". $blogEntry->username ." on ". $blogEntry->date ."</h3>".
				"<p>".$blogEntry->body."</p>".
				"<p>".anchor('blog','Back to Blog')."</p>";
		
		echo 	"<h2>$heading</h2>".
				"<p>Total Comments: $commentCount</p>";
	
		if ($commentCount > 0)
		{
			foreach($comments as $comment)
			{
				echo 	"<p>By ".$comment->username." on ".$comment->date."</p>".
						"<p>$comment->body</p>".
						"<hr>";
			}
		}	
	}
	else 
	{
		echo "<h1>$error</h1>";
	}
	
	if($canComment)
	{
		$attributes = array(
			'submit' => true
		);
		
		$hiddenFields = array(
			'author_id' => $this->ion_auth->get_user()->id,
			'entry_id'  => $this->uri->segment(3),
			'date'		=> date("Y-m-d H:i:s", now())
		);
		
		
		echo '<h1> Submit a comment: </h1>'.
			 form_open('blog/comment_insert', $attributes, $hiddenFields).
			 form_label('<br>Body:<br>', 'body').
			 form_textarea('body','').'<br>'.
			 '<p><input type="submit" value="Submit Comment"/></p>';
	}
	else 
	{
		echo "<p><strong>You do not have permission to post comments.</strong></p>";
	}

	echo "<p>".anchor('blog','Back to Blog')."</p>";
?>



</body>
</html>