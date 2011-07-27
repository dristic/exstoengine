<html>
<head>
<title><?=$title?></title>
</head>
<body>
<?php
	if ($this->ion_auth->logged_in())
	{
		$user = $this->ion_auth->get_user();
		
		echo 	"<h1>$blogEntry->title</h1>"."<h2>$heading</h2>";
		echo 	"<p>Total entries: $commentCount</p>".
				"<p>$error</p>";
		
		if ($commentCount > 0)
		{
			foreach($comments as $comment)
			{
				echo 	"<p>By ".$comment->username." on ".$comment->date."</p>".
						"<p>$comment->body</p>".
						"<hr>";
			}
		}	
		echo "<p>".anchor('Blog','Back to Blog')."</p>";

		if($user->group_id == 1 || $user->group_id == 2)
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
	}
	else
	{
		echo "<h1>Comments</h1><p><strong>You must login before viewing comments.</strong></p>";
	}
?>



</body>
</html>