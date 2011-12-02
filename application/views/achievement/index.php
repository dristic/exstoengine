<h2>Achievements</h2>

<p>
    Your current number of points is: <?php echo $total_points; ?>
</p>

<style>
	#sortable { list-style-type: none; margin: 0; padding: 0; width: 60%; }
	#sortable li { margin: 0 3px 3px 3px; padding: 0.4em; padding-left: 1.5em; font-size: 1.4em; height: 18px; }
	#sortable li span { position: absolute; margin-left: -1.3em; }
	</style>
	<script>
	$(function() {
		$( "#sortable" ).sortable();
		$( "#sortable" ).disableSelection();
	});
	</script>


<div class="demo">

<script>
    $(function() {
            $( "#tabs" ).tabs();
    });
</script>

<div id="tabs">
	<ul>
            <?php
                foreach($groups as $group)
                {
                    echo "<li><a href='#tabs-1'>".$group."</a></li>";
                }
            ?>
	</ul>
	<div id="tabs-1">
            <ul id="sortable">
                <?php
                    foreach($achievements as $achievement)
                    {
                        echo "<li class='ui-state-default'><span class='ui-icon ui-icon-arrowthick-2-n-s'></span>".$achievement->Name." - ".$achievement->Points."</li>";
                    }
                ?>
                <li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 1</li>
                <li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 2</li>
                <li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 3</li>
                <li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 4</li>
                <li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 5</li>
                <li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 6</li>
                <li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 7</li>
            </ul>
	</div>
</div>

</div></div>
