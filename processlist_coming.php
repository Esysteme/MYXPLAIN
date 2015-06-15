<?php include("struct_top.php");?>

<div id="navigation">
<div><a href="explain.php" id="panel_right_command_explain" class="panel_right_button_menu">explain</a></div>
<div><h1 id="panel_right_command_show_processlist" class="panel_right_button_menu_activ">show processlist</h1></div>
<div><a href="#" id="panel_right_command_show_slave_status" class="panel_right_button_menu_coming">show slave status <span style="font-size:8pt;">(coming soon...)</span></a></div>
<div id="clear-both"></div>
</div>
<div id="command-shell">

</div>	
<div id="panel-central">
	<div id="legend_header">
		<div class="main_box_title">
		<h1 style="float:left;">Definitions</h1>
		<div style="float:right;">
			<div id="lang_en" style="display:none;"></div>
			<div id="lang_fr" style="display:none;"></div>
		</div>
		<div id="clear-both"></div>
		</div>
	</div>
	<div id="legend">
	</div>
	<div style="height:20px"></div>
	<div>
		<div id="links">
		<div class="main_box_title">Links<span id="propose_link">Propose a link!</span></div>
		<div id="link_list"></div>
		</div>
		<div id="comments">
			<div class="main_box_title">Comments</div>
			<div id="disqus_thread"></div>
		</div>
	</div>
</div>
<?php include("struct_rightpanel.php"); ?>
<?php include("struct_bottom.php"); ?>

<!-- Dialog Box for New Link-->
<div id="dialog-form" title="Upload a link">
    <form>
    <fieldset>
        <label for="title">Title</label>
        <input type="text" name="title" id="title" class="text ui-widget-content ui-corner-all" />
        <label for="href">Href</label>
        <input type="text" name="href" id="href" class="text ui-widget-content ui-corner-all" />
        <label for="email">Email</label>
        <input type="text" name="email" id="email" value="" class="text ui-widget-content ui-corner-all" />
    </fieldset>
    </form>
</div>

<div id="dialog-modal" title="Upload New Link">
    <p>Thanks for uploading!</p>
</div>

<?php echo "
<script type='text/javascript'>
LoadPage('processlist', '".$_GET['subpage']."');
</script>
"?>
