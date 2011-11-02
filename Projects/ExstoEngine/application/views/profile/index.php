<div id="h2">
	<h2>Profile</h2>
	<div id="h2-horizontal-rule"></div>
</div>

<div style="display: table; width: 100%;">
    <div style="height: 100%; width: 65%; display: table-cell; padding-right: 10px; padding-left: 10px; height: 100%;">
        <h3>Latest Achievements</h3>

        <p>
            <?php echo $total_points; ?> <img src="http://kudoster.com/system/application/views/content/images/coin.png" alt="coin" style="vertical-align: text-top" /> |
            Last achievement acquired on <?php echo date("m/d/Y", strtotime($last_date)); ?>
        </p>

        <div id="tabs">
                <div id="tabs-1">
                    <ul id="sortable" style="list-style: none;">
                        <?php
                            foreach($achievements as $achievement)
                            {
                                echo "<li><div class='achievement-group'>".$achievement->OrganizationName."</div>"
                                        ."<div class='achievement'>"
                                        .$achievement->Name
                                        ."<div class='achievement-description'>".$achievement->Description."</div>"
                                        ."<div class='achievement-points'>"
                                        .$achievement->Points." <img src='http://kudoster.com/system/application/views/content/images/coin.png' alt='coin' style='vertical-align: text-top' />"
                                        ." on ".date("m/d/Y", strtotime($achievement->Date))
                                        ."</div>"
                                        ."</div>"
                                        ."</li>";
                            }
                        ?>
                    </ul>
                </div>
        </div>
    </div>
    <div style="height: 100%; width: 25%; display: table-cell; padding: 10px;">
        <h3>Groups (<?php echo $num_groups; ?>)</h3>

        <ul style="list-style: none;">
        <?php
            foreach ($groups as $group)
            {
                echo "<li><div class='group'><a href='http://kudoster.com/index.php/group/view/$group->ID'>$group->Name</a></div></li>";
            }
        ?>
        </ul>
        <br />
        <a href="http://kudoster.com/index.php/group/create" class="create-link"><div class="plus"></div>Create Group</a>
    </div>
</div>
