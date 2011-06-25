<div class='mainInfo'>

    <div class="form-header">Sign Up</div>
	<p>Enter your information in the fields below to create a new account.</p>
	
	<div id="infoMessage"><?php echo $message; echo $captcha;?></div>
	
    <?php echo form_open("auth/create_user");?>
        <div class="form-field">
            <div class="form-label">First Name</div>
            <div class="form-input">
                <?php echo form_input($first_name);?>
            </div>
        </div>

        <div class="form-field">
            <div class="form-label">Last Name</div>
            <div class="form-input">
                <?php echo form_input($last_name);?>
            </div>
        </div>

        <div class="form-field">
            <div class="form-label">Company Name</div>
            <div class="form-input">
                <?php echo form_input($company);?>
            </div>
        </div>

        <div class="form-field">
            <div class="form-label">Email</div>
            <div class="form-input">
                <?php echo form_input($email);?>
            </div>
        </div>

        <div class="form-field">
            <div class="form-label">Phone</div>
            <div class="form-input">
                <?php echo form_input($phone1);?>-<?php echo form_input($phone2);?>-<?php echo form_input($phone3);?>
            </div>
        </div>

        <div class="form-field">
            <div class="form-label">Password</div>
            <div class="form-input">
                <?php echo form_input($password);?>
            </div>
        </div>

        <div class="form-field">
            <div class="form-label">Confirm Password</div>
            <div class="form-input">
                <?php echo form_input($password_confirm);?>
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
            <div class="form-label">Registration Key</div>
            <div class="form-input">
                <?php echo form_input($registrationKey);?>
            </div>
        </div>

        <div class="form-field">
            <div class="form-label">&nbsp;</div>
            <div class="form-input">
                <?php echo form_submit('submit', 'Sign Up');?>
            </div>
        </div>
    <?php echo form_close();?>

</div>
