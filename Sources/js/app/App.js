 define([
 	'jquery',
 	'jqueryUI',
 	'knockout',
 	'sammy',
 	'app/Stage',
 	'app/database',
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
 	'app/UI/page-setting'
],function ($,ui,ko,sammy,stage,database,util,tool,history,lang,barcode,objectsalign,lineproperty,codeproperty,imageproperty,rectproperty,textproperty,stagerightmenu,pageSet){
 	
 	var App = function (){
		//属性
		this.idCounter   = 0;
		this.state       = ko.observable('edit');
		//鼠标相对canvas坐标 
		this.stage = 		stage;
		this.tool = tool;
		this.database    = database;
		this.history = history;
		this.lang = lang;
		this.router      = null;
		//UI
		this.objectsalign = objectsalign;
		this.lineproperty = lineproperty;
		this.codeproperty = lineproperty;
		this.imageproperty = lineproperty;
		this.rectproperty = lineproperty;
		this.textproperty = lineproperty;

		this.stagerightmenu = stagerightmenu;
		this._init();
	};
	App.prototype = {
		_init : function (){
			
			this.tool.init();
			var self = this;
	    	$("#menubar,#toolbar").on("mouseleave",function (){
	    		$(document).click();
	    	})
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
			$("#database").delegate(">.content>.node>li","contextmenu",function (e){
				$(document).click();
				if(e.button == 2) {
					e.preventDefault();
					$(".rightmenu",this).show().position({
						my: "left top",
						of: e
					});
				}
			});


	    	self._setRouter();

	    	$(function(){
	    		$('#page-initial').dialog('open');
	    	});
		},
		_setRouter : function (){
			var self = this;
			self.router = sammy(function (){
				this.get('/',function (){
					self.router.setLocation('/edit');
				});
				this.get("/login",function (){
					self.state("login");
				});
				this.get('/new',function (){
					
					self.state('new');
				}); 

				this.get('/edit/:id',function (){
					self.state('edit');

					//$.get('/doc',{id:this.params.id},self.data);
				});
			});
			self.router.run();
		},
		getStage : function (){
			return this.stage;
		}
	};
	window.app = new App;
	return window.app;
 });
