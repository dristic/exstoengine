<div class='mainInfo'>

    <div class="form-header">Create a Group</div>
	<p>Enter information below to create a new group.</p>

	<div id="infoMessage"><?php echo $message; echo $captcha;?></div>

    <?php echo form_open("group/create");?>
        <div class="form-field">
            <div class="form-label">Name</div>
            <div class="form-input">
                <?php echo form_input($name);?>
            </div>
        </div>

        <div class="form-field">
            <div class="form-label">&nbsp;</div>
            <div class="form-input">
                 <script type="text/javascript">
                     var RecaptchaOptions = {
                        theme : 'white'
                     };
                 </script>
                <?php
                  require_once('lib/recaptchalib.php');
                  $publickey = "6LfbXcESAAAAANDp4uEWjtSShDlzjU4qM86iocoi"; // you got this from the signup page
                  echo recaptcha_get_html($publickey);
                ?>
            </div>
        </div>

        <div class="form-field">
            <div class="form-label">&nbsp;</div>
            <div class="form-input">
                <?php echo form_submit('submit', 'Create');?>
            </div>
        </div>
    <?php echo form_close();?>

</div>