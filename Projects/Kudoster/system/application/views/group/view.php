<div id="h2">
	<h2>Group</h2>
	<div id="h2-horizontal-rule"></div>
</div>

<div class="content">
    <div class="content-left">
        <h3>Achievements</h3>
        
        <p>
        	Total awarded points: <?= $total_points; ?> <img src="http://kudoster.com/system/application/views/content/images/coin.png" alt="coin" style="vertical-align: text-top" />
        </p>

        <ul id="sortable" style="list-style: none;">
            <?php
                foreach($achievements as $achievement)
                {
                    echo achievement($achievement->UserName, 
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
        <h3>Members</h3>

        <ul style="list-style: none; max-height: 300px; width: 180px; overflow: auto">
        <?php
            foreach ($members as $member)
            {
                echo "<li><div class='group'><a href='http://kudoster.com/index.php/member/view/$member->id'>$member->username</a></div></li>";
            }
        ?>
        </ul>
        
        <br />
        <?= anchor('group/invite/'.$group->ID, '<div class="plus"></div>Invite Member', array('class' => 'create-link'))?>
        <br />
        <?= anchor('group/edit/'.$group->ID, '<div class="edit"></div>Edit Settings', array('class' => 'create-link'))?>
        <br />
        <?= anchor('group/award/'.$group->ID, '<div class="award"></div>Award Achievement', array('class' => 'create-link'))?>
    </div>
</div>