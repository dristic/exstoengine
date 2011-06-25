<div class='mainInfo'>

    <div class="form-header">Keys</div>
	
	<table>
		<tr>
			<th>Key</th>
			<th>Created On</th>
			<th>Delete</th>
		</tr>
    <?php 
    	foreach($keys as $key)
    	{
    		echo "<tr>".
    				"<td>$key->Key</td>".
    				"<td>$key->CreatedOn</td>".
    				"<td>".anchor('admin/delete_key/'.$key->Id, 'Delete')."</td>".
    				"</tr>";
    	}
    ?>
    </table>
    
    <?= anchor('admin/generate_key', 'Create') ?>

</div>