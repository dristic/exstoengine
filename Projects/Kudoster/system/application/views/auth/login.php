<div class='mainInfo'>

    <?php echo form_open("auth/login");?>
        <div class="form-header">
                Login
        </div>
        Please login with your email address and password below.
        
        <div id="infoMessage"><?php echo $message; ?></div>
        
        <div class="form-field">
                <div class="form-label">Email</div>
                <div class="form-input">
                        <?php echo form_input($email);?>
                </div>
        </div>
        <div class="form-field">
                <div class="form-label">Password</div>
                <div class="form-input">
                        <?php echo form_input($password);?>
                </div>
        </div>
        <div class="form-field">
                <div class="form-label">Remember Me?</div>
                <div class="form-input">
                        <?php echo form_checkbox('remember', '1', FALSE);?>
                </div>
        </div>
        <div class="form-field">
                <div class="form-label">&nbsp;</div>
                <div class="form-input">
                        <?php echo form_submit('submit', 'Login');?>
                </div>
        </div>
    <?php echo form_close();?>
</div>
