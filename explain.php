<?php include("struct_top.php");?>

<div id="navigation">
<div><h1 id="panel_right_command_explain" class="panel_right_button_menu_activ">explain</h1></div>
<!--<div><a href="#" id="panel_right_command_show_processlist" class="panel_right_button_menu_coming">show processlist <span style="font-size:8pt;">(coming soon...)</span></a></div>
<div><a href="#" id="panel_right_command_show_slave_status" class="panel_right_button_menu_coming">show slave status <span style="font-size:8pt;">(coming soon...)</span></a></div>-->
<div id="clear-both"></div>
</div>
<div id="command-shell">

</div>	
<div id="panel-central">
	<div id="legend_header">
		<div class="main_box_title">
		<h1 style="float:left;">Definitions</h1> : <span class=""></span>
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
	<div id="meta">
		<div id="links">
			<div class="main_box_title">Links</div>
			<div id="link_list"></div>
		</div>
		<div id="slides" style="margin-left:10px;">
			<div class="main_box_title">Slides</div>
			<div id="slide_list"></div>
		</div>
		
		<div id="clear-both"></div>
		
		<div id="comments">
			<div class="main_box_title">Comments</div>
			<div id="disqus_thread"></div>
		</div>
	</div>
</div>
<?php include("struct_rightpanel.php"); ?>
<?php include("struct_bottom.php"); ?>

<!-- Dialog Box for New Link-->
<div id="dialog-form" title="Propose a link">
    <form>
    <fieldset>
        <label for="title">Link Title</label>
        <input type="text" name="title" id="title" class="text ui-widget-content ui-corner-all" />
        <label for="href">Href</label>
        <input type="text" name="href" id="href" class="text ui-widget-content ui-corner-all" />
        <label for="email">Email</label>
        <input type="text" name="email" id="email" value="" class="text ui-widget-content ui-corner-all" />
    </fieldset>
    </form>
</div>

<!-- Dialog Box for New Link-->
<div id="dialog-form_slide" title="Propose a Slide">
    <form>
    <fieldset>
        <label for="title_slide">Slide Title</label>
        <input type="text" name="title_slide" id="title_slide" class="text ui-widget-content ui-corner-all" />
        <label for="href_slide">Href</label>
        <input type="text" name="href_slide" id="href_slide" class="text ui-widget-content ui-corner-all" />
        <label for="email_slide">Email</label>
        <input type="text" name="email_slide" id="email_slide" value="" class="text ui-widget-content ui-corner-all" />
    </fieldset>
    </form>
</div>

<!-- Dialog Box for New Link-->
<div id="dialog-form_book" title="Propose a Book">
    <form>
    <fieldset>
        <label for="title_book">Book Title</label>
        <input type="text" name="title_book" id="title_book" class="text ui-widget-content ui-corner-all" />
        <label for="email_book">Email</label>
        <input type="text" name="email_book" id="email_book" value="" class="text ui-widget-content ui-corner-all" />
    </fieldset>
    </form>
</div>

<!-- Dialog Box for Integrate-->
<div id="dialog-form_integrate" title="Integrate">
   <center>
    <textarea rows="12" cols="45" style="resize: none;" disabled  >
	<a href="http://www.myxplain.net"><img src="http://myxplain.net/includes/imgs/integrate/myxplain_235_423.png" alt="MyXplain" /></a>
	</textarea>
   </center>
</div>

<div id="dialog-modal" title="Propose Something">
    <p>Thanks for your contribution!</p>
</div>

<?php echo "
<script type='text/javascript'>
LoadPage('explain', '".$_GET['subpage']."');
</script>
"?>
