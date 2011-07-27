<html>
<head>
<title><?=$title?></title>
</head>
<body>
<h1><?=$title?></h1>
<h3><?=$heading?></h3>
<?php 
	if ($this->ion_auth->logged_in())
	{
		
		echo "<p>".anchor('Blog','Back to Blog')."</p>";
		
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
			form_submit('submit', 'Submit Entry');
	}
	else
	{
		echo "<p><strong>You must login before posting comments.</strong></p>";
	}
?>



</body>
</html>