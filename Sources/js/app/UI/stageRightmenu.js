define(['app/Stage','jquery','jqueryUI','knockout','app/Util'],function (stage,$,ui,ko,util){
	// 右键菜单
	var menu = function (){
		this.selectedObject = ko.observableArray();
		this.menu = $("#stageRightmenu");

		this.hasObj = ko.computed(function (){
			return !!this.selectedObject().length;
		},this);
		this.hasObjList = ko.computed(function (){
			return this.selectedObject().length > 1;
		},this);
		this.init();
	};
	menu.prototype = {
		init: function (){
			var self = this;
			$("#cvs").on("contextmenu",function (e){
				$(document).click();
				if(e.button == 2) {
					e.preventDefault();
					self.showMenu(e);
				}
			});
			$(document).on("click",function (){
				self.hideMenu();
			});
		},
		showMenu: function (e){
			var doc = stage.curDoc();
			if(doc){
				this.selectedObject(doc.objectsInPoint || []);
			}
			this.menu.show().position({
				my: "left top",
				of: e
			});
		},
		hideMenu: function (){
			this.menu.hide();
		},
		showProperty: function (){
			var doc = stage.curDoc();
			if(doc){
				var obj;
				if(obj = doc.focusObject()){
					util.Event.dispatch("show" + util.capitalize(obj.type) + "Property",this,obj);
				}
			}
		},
		focusObj: function (obj){
			var doc = stage.curDoc();
			if(doc){
				doc.clearSelectedObjects();
				doc.focusObject(obj);
				obj.selected(true);
				stage.updateCanvas();
			}
		}
	};
	return new menu();
});