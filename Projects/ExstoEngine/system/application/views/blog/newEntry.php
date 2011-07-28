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
		
		echo "<p>".anchor('blog','Back to Blog')."</p>";
		
		if($user->group_id == 1)
		{
			$attributes = array(
				'submit' => true
			);
			
			$hiddenFields = array(
				'author_id' => $this->ion_auth->get_user()->id,
				'date'		=> date("Y-m-d H:i:s", now())
			);
			
			
			echo '<h1> Submit a blog entry: </h1>'.
				form_open('blog/entry_insert', $attributes, $hiddenFields).
				form_label('Title:','title').
				form_input('title','').
				form_label('<br>Body:<br>', 'body').
				form_textarea('body','').'<br>'.
				form_label('Tag: ', 'tag_id').
				form_dropdown('tag_id', $tagList).
				 '<p><input type="submit" value="Submit Comment"/></p>';
		}
		else 
		{
			echo "<p><strong>How did you get here? You're not allowed to make new posts...</strong></p>";	
		}
	}
	else
	{
		echo "<p><strong>How did you get here? You're not allowed to make new posts...</strong></p>";
	}
?>



</body>
</html>