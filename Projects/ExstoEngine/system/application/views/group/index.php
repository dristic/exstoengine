<h2>Group</h2>

<p>You are currently in <?php echo $num_groups; ?> groups.</p>

<ul>
<?php
    foreach ($groups as $group)
    {
        echo "<li>$group</li>";
    }
?>
</ul>

<a href="http://kudoster.com/index.php/group/create">Create A Group</a>
