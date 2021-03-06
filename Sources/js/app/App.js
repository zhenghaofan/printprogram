 define([
 	'jquery',
 	'jqueryUI',
 	'knockout',
 	'app/Router',
 	'app/Stage',
 	'app/Database',
 	'app/Util',
 	'app/Tool',
 	'app/History',
 	'app/Lang',
 	'app/UI/barcode',
 	'app/UI/objectsAlign',
 	'app/UI/lineProperty',
 	'app/UI/codeProperty',
 	'app/UI/imageProperty',
 	'app/UI/rectProperty',
 	'app/UI/textProperty',
 	'app/UI/stageRightmenu',
 	'app/UI/page-setting',
 	'app/UI/login2',
 	'app/UI/login1',
 	'app/UI/Menu',
 	'app/UI/guideCtrl',
 	'app/UI/form-setting',
 	'app/UI/text',
 	'app/UI/image',
 	'app/UI/rect',
 	'app/UI/line',
 	'app/UI/textGuide',
 	'app/UI/codeGuide'
],function ($,ui,ko,router,stage,database,util,tool,history,lang,barcode,objectsalign,lineproperty,codeproperty,imageproperty,rectproperty,textproperty,stagerightmenu,pageSet,login2,login1,menu,gc,formSet,text,image,rect,line,textguide,codeguide){
 	
 	var App = function (){
		this.stage = 		stage;
		this.tool = tool;
		this.database    = database;
		this.history = history;
		this.lang = lang;
		this.router      = router;
		//UI
		this.objectsalign = objectsalign;
		this.lineproperty = lineproperty;
		this.codeproperty = codeproperty;
		this.imageproperty = imageproperty;
		this.rectproperty = rectproperty;
		this.textproperty = textproperty;

		this.textguide = textguide;
		this.codeguide = codeguide;

		this.menu = menu;
		this.login2 = login2;
		this.login1 = login1;
		this.stagerightmenu = stagerightmenu;
		this._init();
	};
	App.prototype = {
		_init : function (){
			
			this.tool.init();
			var self = this;
	    	$("#menubar,#toolbar").on("mouseleave",function (){
	    		$(document).click();
	    	});
			$('#menu>li ul,.menu').menu();
			$(document).delegate(".node>li>span","click",function (){
				$(this).parent().toggleClass("open");
			});
			$(".tabs").tabs();

			//弹出窗
			$("#dialogs>div").each(function (){
				var tar = $(this);
				tar.dialog({
					width: tar.data("width"),
					autoOpen: tar.data("visibility"),
					resizable: false,
					modal: true
				});
			});

			//右键菜单
			//  if (window.Event)document.captureEvents(Event.MOUSEUP); 
			// document.oncontextmenu = function (){
			// 	event.cancelBubble = true 
			// 	event.returnValue = false; 
			// 	return false;
 		// 	};
			// document.onmousedown = function (e){
			// 	if (window.Event){ 
			// 		if (e.which == 2 || e.which == 3) 
			// 		return false; 
			// 	} 
			// 	else if (event.button == 2 || event.button == 3){ 
			// 		event.cancelBubble = true 
			// 		event.returnValue = false; 
			// 		return false; 
			// 	} 
			// };
			$(document).on("click",function (){
				$(".rightmenu").hide();
			});
			$("#database").delegate(">.content>.node>li>span","contextmenu",function (e){
				$(document).click();
				if(e.button == 2) {
					e.preventDefault();

					$(this).siblings(".rightmenu.menu").show().position({
						my: "left top",
						of: e
					});
				}
			});

			$(function(){
				$('.slider').slider({
				  	min: 0,
				  	max: 270,
				  	range: "min",
				  	value: 0,
				  	step: 90,
				  	slide: function( event, ui ) {

				  		// $(this).find('#degree').val(ui.value);	
				  		// console.log($('#degree').val());		  		
				  		// self.degree = ui.value;
					}
					
				});	
			});	
			// if(document.location.hash="#disign"){
			// 	$('#page-initial').dialog("open");
			// }

		},
		getStage : function (){
			return this.stage;
		}

	};
	window.app = new App;
	return window.app;
 });
