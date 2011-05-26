<div id="h2">
	<h2>Profile</h2>
	<div id="h2-horizontal-rule"></div>
</div>

<div class="content">
    <div class="content-left">
        <h3>Latest Achievements</h3>

        <p>
            <?php echo $total_points; ?> <img src="http://kudoster.com/system/application/views/content/images/coin.png" alt="coin" style="vertical-align: text-top" /> |
            Last achievement acquired on <?php echo date("m/d/Y", strtotime($last_date)); ?>
        </p>
        
        <ul id="sortable" style="list-style: none;">
	        <?php
		        foreach($achievements as $achievement)
		        {
			        echo achievement($achievement->OrganizationName, 
                    				rand(1, 100), 
                    				$achievement->Name, 
                    				$achievement->Description, 
                    				$achievement->Points, 
                    				$achievement->Date);
		        }
	        ?>
        </ul>
        
    </div>
    
    <div class="content-right">
        <h3>Your Groups (<?= $num_groups ?>)</h3>

        <ul style="list-style: none;">
        <?php
            foreach ($groups as $group)
            {
                echo "<li><div class='group'>".anchor('group/view/'.$group->ID, $group->Name)."</div></li>";
            }
        ?>
        </ul>
        <br />
        <?= anchor('group/create', '<div class="plus"></div>Create Group', array('class' => 'create-link')) ?>
    </div>
</div>
