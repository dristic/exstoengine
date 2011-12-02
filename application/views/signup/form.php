<div class="container_12">
	<div class="grid_4">
		&nbsp;
	</div>
	<div class="grid_4">
		<?= form_open('welcome/signup'); ?>
			<h1>Want More Info?</h1>
			<div id="infoMessage">
				<?php echo $message; ?>
			</div>
			<div class="form-field-first">
				<label for="email">Email address</label>
				<br />
				<input type="email" name="email" value="<?php echo set_value('email'); ?>" />
			</div>
			<div class="form-field">
				<label for="comment">What are you interested in hearing about?</label>
				<br />
				<input type="text" name="comment" value="<?php echo set_value('comment'); ?>" />
			</div>
			    
			<div class="form-field">
				<input type="submit" value="Send" class="right" />
			</div>
		<?= form_close(); ?>
	</div>
	<div class="grid_4">
		&nbsp;
	</div>
</div>