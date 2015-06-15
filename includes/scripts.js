// JavaScript Document
$(document).ready(function(){             
	$("#legend").hide();
		
	//Load Menu
	$( "#panel_right_command_explain").button();
	$( "#panel_right_command_show_processlist").button({disabled:true});
	$( "#panel_right_command_show_slave_status").button({disabled:true});
	
	
	
	$( "#whats_new_on_mysqlplus").button();
	$( "#myxplain_twitter_timeline").button();
	
	//Json Data
	jsonfile_explain = 'data/explain.json';
	jsonfile_processlist = 'data/processlist.json';
	var jsonfile_slides = 'data/slides.json';
	var jsonfile_favlinks = 'data/favlinks.json';
	var jsonfile_books = 'data/books.json';
	var jsonfile_links = 'data/links.json';
	
	nbOfFavLinks = 6;
	nbOfLinks = 8;
	nbOfSlides = 8;
	nbOfBooks = 4;
	
	charLimit = 25;
	
	data_explain_dir = null;
	data_processlist_dir = null;
	
	var slides;
	//Featured Slides
	GetSlides(jsonfile_slides, function(slides){
		
	});
	
	var favlinks;
	//Favorite Links
	GetFavLinks(jsonfile_favlinks, function(favlinks){
		
	});
	
	var links;
	//Links
	GetLinks(jsonfile_links,function(links){
		
	});
	
	var books;
	//Books
	GetBooks(jsonfile_books, function(books){
		$(".book").mouseover(function(){
			var img = $(this).attr("src");
			img = img.replace(".jpg",'');
			$(this).attr('src' , img + '_hover.jpg');
		});
		$(".book").mouseout(function(){
			var img = $(this).attr("src");
			$(this).attr('src' , img.replace("_hover",''));
		});
	});
	
	//Load Proposing Boxes
	LoadUploadLinkBox();
	LoadUploadSlideBox();
	LoadUploadBookBox();
	LoadIntegrateBox();
	
	
	$("#dialog-modal").hide();
	
	$( "#propose_link_").button();
	$( "#propose_slide").button();
	$( "#propose_book").button();
	$( "#propose_donate").button();
	$( "#propose_integrate").button();
	
	//Load qTip Style
	$.fn.qtip.styles.mystyleLeft = {
		name: 'cream',
		textAlign: 'center',
		border: {
			width: 7,
			radius: 5
		},
		'font-size':'12pt',
		'font-family':'calibri',
		tip : 'topRight'
	};
	
	//Langage
	$("#lang_en").css("background-image", "url('includes/imgs/us.png')");
	
	var langFr = $("#lang_fr").css("background-image");
	var langEn = $("#lang_en").css("background-image");
	
	isNotFr = langFr.match(/_b/i) ;
	isNotEn = langEn.match(/_b/i) ;
	lang = null;
	if(isNotFr){
		data_explain_dir = './data/definitions/explain/';
		data_processlist_dir = './data/definitions/processlist/';
	}else{
		data_explain_dir = './data/definitions/fr_explain/';
		data_processlist_dir = './data/definitions/fr_processlist/';
	}
	
	$("#lang_en").click(function(){
		$("#lang_en").css("background-image", "url('includes/imgs/us.png')");
		$("#lang_fr").css("background-image", "url('includes/imgs/fr_b.jpg')");
		data_explain_dir = './data/definitions/explain/';
		data_processlist_dir = './data/definitions/processlist/';
		var title = $("#legend_title_name").html();
		$("#legend").empty();
		$("#legend").slideDown(100, function() {
			$(this).append("<div id='legend_title'><span id='legend_title_name'>"+title.toUpperCase()+"</span><a href='http://dev.mysql.com/doc/refman/5.5/en/explain-output.html#explain_" + title.replace("title_",'') + "' target='_blank' style='float:right;margin-top:-11px'><img src='includes/imgs/logo-mysql.gif' width='50' border='0'  alt='Official MySQL Documentation' title='Official MySQL Documentation'/></a></div>");
			$.get(data_explain_dir+title+'.html', function(data) {
				$("#legend").append(data);
				$(".tag").button();
			});
		});
	});
	
	$("#lang_fr").click(function(){
		$("#lang_fr").css("background-image", "url('includes/imgs/fr.png')");
		$("#lang_en").css("background-image", "url('includes/imgs/us_b.jpg')");
		data_explain_dir = './data/definitions/fr_explain/';
		data_processlist_dir = './data/definitions/processlist/';
		var title = $("#legend_title_name").html();
		$("#legend").empty();
		$("#legend").slideDown(100, function() {
			$(this).append("<div id='legend_title'><span id='legend_title_name'>"+title.toUpperCase()+"</span><a href='http://dev.mysql.com/doc/refman/5.5/en/explain-output.html#explain_" + title.replace("title_",'') + "' target='_blank' style='float:right;margin-top:-11px'><img src='includes/imgs/logo-mysql.gif' width='50' border='0'  alt='Official MySQL Documentation' title='Official MySQL Documentation'/></a></div>");
			$.get(data_explain_dir+title+'.html', function(data) {
				$("#legend").append(data);
				$(".tag").button();
			});
		});
	});
	
	//End Langage
	
	
	//Disqus
	$('#disqus_thread').disqus({
		domain:"myxplain"
	});
	
});

function LoadPage(page, title){
	if(!title){title = 'id';}
	//Load Explain Plan
	if(page == "explain"){
		//LoadFirstExplainPlan(jsonfile_explain);
		LoadExplainPlan('data/'+page+'.json',title);
	}
	
	//Load Process List
	if(page == "processlist"){
		LoadProcessList('data/'+page+'.json',title);
	}
}

function GetRandomFile(repository_file, filetype, title){
	$.getJSON('./'+repository_file, function(json) {
			$.each(json, function(key, repository){
				if(filetype == "command_explain"){
					var randomnumber=Math.floor(Math.random() * repository.command_explain.length);
					var file = repository.command_explain[randomnumber];
					$("#command-shell").append('<div id="reload" onclick="LoadExplainPlan(\''+'data/' + file + '\', \''+ title +'\')"></div>');
				}
			});
	});
}


function LoadExplainPlan(jsonfile_explain, title){
	
	$("#command-shell").empty();
	$("#command-shell").append("<div id='command-shell-tip'><img src='includes/imgs/tip_column.png' /></div>");
	//Explain Plan
	var cellsSize = [];
	var divcommandshell;
	GetStructureDimensions(jsonfile_explain, function(cellsSize){
		GetExplainPlan(jsonfile_explain, cellsSize,function(divcommandshell){
			
			//Open first tab when page is loaded: ID
			$("#legend").empty();
			$("#legend").slideDown(100, function() {
				$(this).append("<div id='legend_title'><span id='legend_title_name'>"+title.toUpperCase()+"</span><a href='http://dev.mysql.com/doc/refman/5.5/en/explain-output.html#explain_"+title+"' target='_blank' style='float:right;margin-top:-11px'><img src='includes/imgs/logo-mysql.gif' width='50' border='0' alt='Official MySQL Documentation' title='Official MySQL Documentation'/></a></div>");
				$.get(data_explain_dir+title+'.html', function(data) {
					$("#legend").append(data);
					$(".tag").button();
				});
				$("#title_" + title).css({color : '#4fcfdd'});
			});
			
			//Open legend tab
			$("span.result_title").click( function(){
				$("span.result_title").css({color : '#ffffff'});
				$(this).css({color : '#4fcfdd'});
				$(this).addClass('result_title_');
				var title = $(this).attr('id');
				title = $(this).html();
				$("#legend").empty();
				$("#legend").slideDown(100, function() {
					$(this).append("<div id='legend_title'><span id='legend_title_name'>"+title.toUpperCase()+"</span><a href='http://dev.mysql.com/doc/refman/5.5/en/explain-output.html#explain_" + title.replace("title_",'') + "' target='_blank' style='float:right;margin-top:-11px'><img src='includes/imgs/logo-mysql.gif' width='50' border='0'  alt='Official MySQL Documentation' title='Official MySQL Documentation'/></a></div>");
					$.get(data_explain_dir+title+'.html', function(data) {
						$("#legend").append(data);
						$(".tag").button();
					});
				});
			});
		});
	});
	GetRandomFile('data/repository.json', 'command_explain', title);
}


function LoadFirstProcessList(jsonfile_processlist, title){
	$("#command-shell").empty();
	$("#command-shell").append("<div id='command-shell-tip'><img src='includes/imgs/tp_column.png' /></div>");
	//Explain Plan
	var cellsSize = [];
	var divcommandshell;
	GetStructureDimensions(jsonfile_processlist, function(cellsSize){
		GetProcessList(jsonfile_processlist, cellsSize,function(divcommandshell){
			
			//Open first tab when page is loaded: ID
			$("#legend").empty();
			$("#legend").slideDown(100, function() {
				$(this).append("<div id='legend_title'><span id='legend_title_name'>"+title.toUpperCase()+"</span><a href='http://dev.mysql.com/doc/refman/5.5/en/explain-output.html#explain_"+title+"' target='_blank' style='float:right;margin-top:-11px'><img src='includes/imgs/logo-mysql.gif' width='50' border='0' alt='Official MySQL Documentation' title='Official MySQL Documentation'/></a></div>");
				$.get(data_processlist_dir+title+'.html', function(data) {
					$("#legend").append(data);
					$(".tag").button();
				});
				$("#title_"+title).css({color : '#4fcfdd'});
			});
			
			//Open legend tab
			$("span.result_title").click( function(){
				$("span.result_title").css({color : '#ffffff'});
				$(this).css({color : '#4fcfdd'});
				$(this).addClass('result_title_');
				var title = $(this).attr('id');
				title = $(this).html();
				$("#legend").empty();
				$("#legend").slideDown(100, function() {
					$(this).append("<div id='legend_title'><span id='legend_title_name'>"+title.toUpperCase()+"</span><a href='http://dev.mysql.com/doc/refman/5.5/en/explain-output.html#explain_" + title.replace("title_",'') + "' target='_blank' style='float:right;margin-top:-11px'><img src='includes/imgs/logo-mysql.gif' width='50' border='0'  alt='Official MySQL Documentation' title='Official MySQL Documentation'/></a></div>");
					$.get(data_processlist_dir+title+'.html', function(data) {
						$("#legend").append(data);
						$(".tag").button();
					});
				});
				
			});
		});
	});
	$("#command-shell").append('<div id="reload" onclick="LoadFirstProcessList(\''+'data/processlist.json'+'\');"></div>');
}


function LoadDefinition(column){
	$("span.result_title").css({color : '#ffffff'});
	//$(this).css({color : '#4fcfdd'});
	//$(this).addClass('result_title_');
	$("#legend").empty();
	$("#legend").slideDown(100, function() {
		$(this).append("<span id='legend_title_name'>"+column.toUpperCase()+"</span><a href='http://dev.mysql.com/doc/refman/5.5/en/explain-output.html#explain_" + column.replace("title_",'') + "' target='_blank' style='float:right;margin-top:-11px'><img src='includes/imgs/logo-mysql.gif' width='50' border='0'  alt='Official MySQL Documentation' title='Official MySQL Documentation'/></a></div>");
$.get(data_explain_dir+column+'.html', function(data) {
	$("#legend").append(data);
	$(".tag").button();
});
	});
}


function GetProcessList(inputfile, cellsSize, callback) {
	$.getJSON('./'+inputfile, function(json) {
	$("#command-shell").append("mysql > ");
	$("#command-shell").append(json.mysqlcommand.command);
	$("#command-shell").append("<br/><br/>");
	
	var info = 0;
	
	//First Line
	$.each(cellsSize, function(i, value){
		$("#command-shell").append("+");
		for(var o = 0 ; o < value + 2 ; o++){$("#command-shell").append("-");}
	});
	$("#command-shell").append("+");
	
	$("#command-shell").append("<br/>");
	
	//Header
	var p = 0;
	$.each(json.mysqlcommand.results[0], function(key, value){
		$("#command-shell").append("| ");
		if(key == "info"){info = p;}
		$("#command-shell").append("<a id='title_"+key+".html' href='processlist-"+key+".html' class='result_title'>"+key+"</a>");
		$("#command-shell").append(" ");
		for(var o = 0 ; o < (cellsSize[p] - key.length) ; o++){$("#command-shell").append("&#160;");}
		p = p + 1;
	});
	p = 0;
	$("#command-shell").append("| ");
	$("#command-shell").append("<br/>");
	
	//Last Line			
	$.each(json.mysqlcommand.results, function(i, result){
		//Line
		$.each(cellsSize, function(i, value){
			$("#command-shell").append("+");
			for(var o = 0 ; o < value + 2 ; o++){$("#command-shell").append("-");}
		});
		$("#command-shell").append("+");
		$("#command-shell").append("<br/>");
		
		var p = 0;
		$.each(result, function(key, value){
			$("#command-shell").append("| ");
			if(info == p && value.length > charLimit){
				value = value.substring(0, value.indexOf(value.substring(charLimit)));
				value = value + '...';
			}
			$("#command-shell").append(value + "&#160;");
			for(var o = 0 ; o < (cellsSize[p] - value.length) ; o++){$("#command-shell").append("&#160;");}
			p = p + 1;
		});
		$("#command-shell").append("|");
		$("#command-shell").append("<br/>");
		p = 0;
		
	});
	
	//Last Line
	$.each(cellsSize, function(i, value){
	$("#command-shell").append("+");
	for(var o = 0 ; o < value + 2 ; o++){$("#command-shell").append("-");}
	});
	$("#command-shell").append("+");
	$("#command-shell").append("<br/>");
	
	//Duration
	$("#command-shell").append("<br/>");
	$("#command-shell").append(json.mysqlcommand.results.length);
	$("#command-shell").append(" row in set ");
	$("#command-shell").append("("+ json.mysqlcommand.duration +" sec)");
	
	callback($("#command-shell"));
	});
}

function GetExplainPlan(inputfile, cellsSize, callback) {
	$.getJSON('./'+inputfile, function(json) {
	$("#command-shell").append("mysql > ");
	$("#command-shell").append(json.mysqlcommand.command);
	$("#command-shell").append("<br/><br/>");
	
	var info = 0;
	
	//First Line
	$.each(cellsSize, function(i, value){
		$("#command-shell").append("+");
		for(var o = 0 ; o < value + 2 ; o++){$("#command-shell").append("-");}
	});
	$("#command-shell").append("+");
	
	$("#command-shell").append("<br/>");
	
	//Header
	var p = 0;
	$.each(json.mysqlcommand.results[0], function(key, value){
		$("#command-shell").append("| ");
		if(key == "extra"){extra = p;}
		$("#command-shell").append("<a id='title_"+key+"' href='explain-"+key+".html' class='result_title'>"+key+"</a>");
		$("#command-shell").append(" ");
		for(var o = 0 ; o < (cellsSize[p] - key.length) ; o++){$("#command-shell").append("&#160;");}
		p = p + 1;
	});
	p = 0;
	$("#command-shell").append("| ");
	$("#command-shell").append("<br/>");
	
	//Last Line			
	$.each(json.mysqlcommand.results, function(i, result){
		//Line
		$.each(cellsSize, function(i, value){
			$("#command-shell").append("+");
			for(var o = 0 ; o < value + 2 ; o++){$("#command-shell").append("-");}
		});
		$("#command-shell").append("+");
		$("#command-shell").append("<br/>");
		
		var p = 0;
		$.each(result, function(key, value){
			$("#command-shell").append("| ");
			if(extra == p && value.length > charLimit){
				value = value.substring(0, value.indexOf(value.substring(charLimit)));
				value = value + '...';
			}
			$("#command-shell").append(value + "&#160;");
			for(var o = 0 ; o < (cellsSize[p] - value.length) ; o++){$("#command-shell").append("&#160;");}
			p = p + 1;
		});
		$("#command-shell").append("|");
		$("#command-shell").append("<br/>");
		p = 0;
		
	});
	
	//Last Line
	$.each(cellsSize, function(i, value){
	$("#command-shell").append("+");
	for(var o = 0 ; o < value + 2 ; o++){$("#command-shell").append("-");}
	});
	$("#command-shell").append("+");
	$("#command-shell").append("<br/>");
	
	//Duration
	$("#command-shell").append("<br/>");
	$("#command-shell").append(json.mysqlcommand.results.length);
	$("#command-shell").append(" row in set ");
	$("#command-shell").append("("+ json.mysqlcommand.duration +" sec)");
	
	callback($("#command-shell"));
	});
}

var GetStructureDimensions = function(inputfile, callback) {
	$.getJSON('./' + inputfile, function(json) {
var contentSize = [];
var titleSize = [];
//Initialization
$.each(json.mysqlcommand.results[0], function(key, value) {
	titleSize.push(key.length);
	contentSize.push(0);
});

$.each(json.mysqlcommand.results, function(i, result) {
	var j = 0;
	$.each(result, function(key, value) {
		if(contentSize[j] < value.length){
			if(value.substring(0,1) == '&'){
				contentSize[j] = value.length - 8;
			}else{
				contentSize[j] = value.length;
			}
			if(key == "info" && contentSize[j] > charLimit){
				contentSize[j] = charLimit + 3;
			}
			if(key == "extra" && contentSize[j] > charLimit){
				contentSize[j] = charLimit + 3;
			}
		}
		j++;
	});
	j = 0;
});

$.each(contentSize, function(i, value){
	if(contentSize[i] < titleSize[i]){
		contentSize[i] = titleSize[i];
	}
});

callback(contentSize);
	});
};

var GetSlides = function(inputfile, callback) {
	$.getJSON('./' + inputfile, function(json) {
	
	if(window.location.pathname == "/"){
		page = "explain";
	}else{
		var re = /(\w*)-/g;
		var result = re.exec(window.location.pathname);
		page = RegExp.$1;
	}
	

// randomize that array
var slides = json.slides.slide.sort(function() {
	return Math.round( Math.random() ) - 0.5;
});

var v = 1;

//Initialization
$.each(slides, function(i, slide) {
	if(v <= nbOfSlides){
		if(slide.page == page){
			$("#slide_list").append('<a href="'+slide.link+'" id="slide_'+i+'" class="meta_button" target="_blank">'+slide.title+'</a>');
			$( "#slide_"+i ).button();
		}
	}
	v++;
});
callback($("#slides"));
	});
};

var GetLinks = function(inputfile, callback) {
	$.getJSON('./' + inputfile, function(json) {
	
	if(window.location.pathname == "/"){
		page = "explain";
	}else{
		var re = /(\w*)-/g;
		var result = re.exec(window.location.pathname);
		page = RegExp.$1;
	}
	
// randomize that array
var links = json.links.link.sort(function() {
	return Math.round( Math.random() ) - 0.5;
});

var v = 1;

//Initialization
$.each(links, function(i, link) {
	if(v <= nbOfLinks){
		if(link.page == page){
			$("#link_list").append('<a href="'+link.link+'" id="link_'+i+'" class="meta_button" target="_blank">'+link.title+'</a>');
			$( "#link_"+i ).button();
		}
	}
	v++;
});
callback($("#links"));
	});
};


var GetFavLinks = function(inputfile, callback) {
	$.getJSON('./' + inputfile, function(json) {
// randomize that array
var favlinks = json.favlinks.favlink.sort(function() {
	return Math.round( Math.random() ) - 0.5;
});

var v = 1;

//Initialization
$.each(favlinks, function(i, link) {
	if(v <= nbOfFavLinks){
		$("#favlinks").append('<a href="'+link.link+'" id="fav_link_'+i+'" alt="" class="panel_right_button" target="_blank">'+link.title+'</a>');
		$( "#fav_link_"+i ).button();
	}
	v++;
});
callback($("#favlinks"));
	});
};

var GetBooks = function(inputfile, callback) {
	$.getJSON('./' + inputfile, function(json) {
		var books = json.books.book.sort(function() {
			return Math.round( Math.random() ) - 0.5;
		});
		$("#books").append("<table id='books_table'>");
		var v = 1;
		var j = 0;
		//Initialization
		$.each(books, function(i, book) {
				if(books[j]){
					if(v <= nbOfBooks){
						$("#books_table").append('<tr id="book_tr_'+j+'">');
						$("#book_tr_"+j).append('<td id="book_td_'+j+'" class="book_td">');
						$("#book_td_"+j).append('<a href="'+books[j].link+'" id="book_'+books[j].id+'" alt="" target="_blank"><img src="./data/book_covers/book_'+books[j].id+'.jpg" class="book" title="'+books[j].title+'" border="0"/></a>');
						$("#book_tr_"+j).append('</td>');
						$("#book_tr_"+j).append('<td style="width:10px;"></td>');
					}
					v++;
					if(books[j+1]){
						if(v <= nbOfBooks){
							cover_id = books[j + 1].id;
							$("#book_tr_"+j).append('<td id="book_td_'+(j+1)+'" class="book_td">');
							$("#book_td_"+(j+1)).append('<a href="'+books[j+1].link+'" id="book_'+j+'" alt="" target="_blank"><img src="./data/book_covers/book_'+cover_id+'.jpg" class="book" title="'+books[j+1].title+'" border="0"/></a>');
							$("#book_tr_"+j).append('</td>');
							$("#books_table").append('</tr>');
							$("#books_table").append('<tr style="height:10px;"></tr>');
						}
						v++;
					}
				}
				j = j + 2;
		});
		
		$("#books").append("</table>");
	
		callback($("#books"));
	});
};


var LoadUploadLinkBox = function(){
	$( "#propose_link_" )
            .click(function() {
                $( "#dialog-form" ).dialog( "open" );
            });
	
        var title = $( "#title" ),
            href = $( "#href" ),
            email = $( "#email" ),
            allFields = $( [] ).add( title ).add( href ).add( email ),
            tips = $( ".validateTips" );
 
        function updateTips( t ) {
            tips
                .text( t )
                .addClass( "ui-state-highlight" );
            setTimeout(function() {
                tips.removeClass( "ui-state-highlight", 1500 );
            }, 500 );
        }
 
        function checkLength( o, n, min, max ) {
            if ( o.val().length > max || o.val().length < min ) {
                o.addClass( "ui-state-error" );
                updateTips( "Length of " + n + " must be between " +
                    min + " and " + max + "." );
                return false;
            } else {
                return true;
            }
        }
 
        function checkRegexp( o, regexp, n ) {
            if ( !( regexp.test( o.val() ) ) ) {
                o.addClass( "ui-state-error" );
                updateTips( n );
                return false;
            } else {
                return true;
            }
        }
 
        $( "#dialog-form" ).dialog({
            autoOpen: false,
            height: 300,
            width: 350,
            modal: true,
            buttons: {
                "Send": function() {
                    var bValid = true;
                    allFields.removeClass( "ui-state-error" );
 
                    bValid = bValid && checkLength( title, "title", 3, 256 );
                    bValid = bValid && checkLength( href, "href", 6, 512 );
                    bValid = bValid && checkLength( email, "email", 5, 128 );
 
                    // From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
                    bValid = bValid && checkRegexp( email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. ui@jquery.com" );
 
                    if ( bValid ) {
						$.ajax({
							type: "POST",
							url: "includes/upload_link.php",
							data: {
								title: title.val(),
								href: href.val(),
								email: email.val()
							},
							success: function(html)
							{
							$(function() {
								$( "#dialog-modal" ).dialog({
									height: 140,
									modal: true
								});
								setTimeout(
								function() 
								{
									$( "#dialog-modal" ).dialog("close");
								}, 2000);
							});	
							}
						});
                        $( this ).dialog( "close" );
                    }
                },
                Cancel: function() {
                    $( this ).dialog( "close" );
                }
            },
            close: function() {
                allFields.val( "" ).removeClass( "ui-state-error" );
            }
      });	
};

var LoadUploadSlideBox = function(){
	$( "#propose_slide" )
            .click(function() {
                $( "#dialog-form_slide" ).dialog( "open" );
            });
	
        var title = $( "#title_slide" ),
            href = $( "#href_slide" ),
            email = $( "#email_slide" ),
            allFields = $( [] ).add( title ).add( href ).add( email ),
            tips = $( ".validateTips" );
 
        function updateTips( t ) {
            tips
                .text( t )
                .addClass( "ui-state-highlight" );
            setTimeout(function() {
                tips.removeClass( "ui-state-highlight", 1500 );
            }, 500 );
        }
 
        function checkLength( o, n, min, max ) {
            if ( o.val().length > max || o.val().length < min ) {
                o.addClass( "ui-state-error" );
                updateTips( "Length of " + n + " must be between " +
                    min + " and " + max + "." );
                return false;
            } else {
                return true;
            }
        }
 
        function checkRegexp( o, regexp, n ) {
            if ( !( regexp.test( o.val() ) ) ) {
                o.addClass( "ui-state-error" );
                updateTips( n );
                return false;
            } else {
                return true;
            }
        }
 
        $( "#dialog-form_slide" ).dialog({
            autoOpen: false,
            height: 300,
            width: 350,
            modal: true,
            buttons: {
                "Send": function() {
                    var bValid = true;
                    allFields.removeClass( "ui-state-error" );
 
                    bValid = bValid && checkLength( title, "title_slide", 3, 256 );
                    bValid = bValid && checkLength( href, "href_slide", 6, 512 );
                    bValid = bValid && checkLength( email, "email_slide", 5, 128 );
 
                    // From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
                    bValid = bValid && checkRegexp( email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. ui@jquery.com" );
 
                    if ( bValid ) {
						$.ajax({
							type: "POST",
							url: "includes/upload_slide.php",
							data: {
								title: title.val(),
								href: href.val(),
								email: email.val()
							},
							success: function(html)
							{
							$(function() {
								$( "#dialog-modal" ).dialog({
									height: 140,
									modal: true
								});
								setTimeout(
								function() 
								{
									$( "#dialog-modal" ).dialog("close");
								}, 2000);
							});	
							}
						});
                        $( this ).dialog( "close" );
                    }
                },
                Cancel: function() {
                    $( this ).dialog( "close" );
                }
            },
            close: function() {
                allFields.val( "" ).removeClass( "ui-state-error" );
            }
      
      
      
      });	
};


var LoadUploadBookBox = function(){
	$( "#propose_book" )
            .click(function() {
                $( "#dialog-form_book" ).dialog( "open" );
            });
	
        var title = $( "#title_book" ),
            email = $( "#email_book" ),
            allFields = $( [] ).add( title ).add( email ),
            tips = $( ".validateTips" );
 
        function updateTips( t ) {
            tips
                .text( t )
                .addClass( "ui-state-highlight" );
            setTimeout(function() {
                tips.removeClass( "ui-state-highlight", 1500 );
            }, 500 );
        }
 
        function checkLength( o, n, min, max ) {
            if ( o.val().length > max || o.val().length < min ) {
                o.addClass( "ui-state-error" );
                updateTips( "Length of " + n + " must be between " +
                    min + " and " + max + "." );
                return false;
            } else {
                return true;
            }
        }
 
        function checkRegexp( o, regexp, n ) {
            if ( !( regexp.test( o.val() ) ) ) {
                o.addClass( "ui-state-error" );
                updateTips( n );
                return false;
            } else {
                return true;
            }
        }
 
        $( "#dialog-form_book" ).dialog({
            autoOpen: false,
            height: 300,
            width: 350,
            modal: true,
            buttons: {
                "Send": function() {
                    var bValid = true;
                    allFields.removeClass( "ui-state-error" );
 
                    bValid = bValid && checkLength( title, "title_book", 3, 256 );
                    bValid = bValid && checkLength( email, "email_book", 5, 128 );
 
                    // From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
                    bValid = bValid && checkRegexp( email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. ui@jquery.com" );
 
                    if ( bValid ) {
						$.ajax({
							type: "POST",
							url: "includes/upload_book.php",
							data: {
								title: title.val(),
								email: email.val()
							},
							success: function(html)
							{
							$(function() {
								$( "#dialog-modal" ).dialog({
									height: 140,
									modal: true
								});
								setTimeout(
								function() 
								{
									$( "#dialog-modal" ).dialog("close");
								}, 2000);
							});	
							}
						});
                        $( this ).dialog( "close" );
                    }
                },
                Cancel: function() {
                    $( this ).dialog( "close" );
                }
            },
            close: function() {
                allFields.val( "" ).removeClass( "ui-state-error" );
            }      
      });	
};

var LoadIntegrateBox = function(){
	$( "#propose_integrate" )
            .click(function() {
                $( "#dialog-form_integrate" ).dialog( "open" );
            });
    $( "#dialog-form_integrate" ).dialog({
            autoOpen: false,
            height: 300,
            width: 350,
            modal: true,
            buttons: {
                Ok: function() {
                    $( this ).dialog( "close" );
                }
            }
      });
};
