<div id="h2">
	<h2>Group</h2>
	<div id="h2-horizontal-rule"></div>
</div>

<div style="display: table; width: 100%;">
    <div style="height: 100%; border-right: 2px solid #332f29; width: 65%; display: table-cell; padding-right: 10px; height: 100%;">
        <h3>Latest Achievements</h3>

        <ul id="sortable" style="list-style: none;">
            <?php
                foreach($achievements as $achievement)
                {
                    echo "<li><div class='achievement-group'>".$achievement->UserName."</div>"
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
    <div style="height: 100%; width: 25%; display: table-cell; padding: 10px;">
        <h3>Members</h3>

        <ul style="list-style: none;">
        <?php
            foreach ($members as $member)
            {
                echo "<li><div class='group'><a href='http://kudoster.com/index.php/member/view/$member->id'>$member->username</a></div></li>";
            }
        ?>
        </ul>
        <br />
        <a href="http://kudoster.com/index.php/group/invite/<?php echo $group->ID; ?>" class="create-link"><div class="plus"></div>Invite Member</a>
    </div>
</div>