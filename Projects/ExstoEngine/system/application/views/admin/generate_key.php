<div class='mainInfo'>

    <div class="form-header">Generate Key</div>
	<p>Enter random data in the box and click generate to generate a key.</p>
	
	<div id="infoMessage"><?php echo $message; ?></div>
	
    <?php echo form_open("admin/generate_key");?>
        <div class="form-field">
            <div class="form-label">Random Data</div>
            <div class="form-input">
                <input type="text" name="random_data" value="<?= set_value('random_data') ?>" size="20" />
            </div>
        </div>

        <div class="form-field">
            <div class="form-label">&nbsp;</div>
            <div class="form-input">
                <input type="submit" value="Generate Key" />
            </div>
        </div>
    <?php echo form_close();?>

</div>
