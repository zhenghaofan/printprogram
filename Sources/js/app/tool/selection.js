define(['jquery','app/Stage'],function ($,stage){
	var selection = function (){
		var self = this;
		self.name = "selection";
		self.stage = stage;
		self.ui = self.stage.ui;


		self.isActive = false;
		self.selected = [];
		self.draging = false;

		self.selectObj = function (f){
			var doc = self.stage.curDoc();
			if(doc){
				doc.selectObject(f);
				self.ui.onmousedown();
			}
		};
		self.onmousedown = function (e){
			var doc = self.stage.curDoc();
			if(doc){
				doc.getObjectsInPoint();
			}
			if(!self.ui.onmousedown()){
				self.selectObj(e.ctrlKey);
			}
		};
		self.active = function (){
			$(self.stage.cvs).on("mousedown",self.onmousedown);
		};
		self.deactive = function (){
			$(self.stage.cvs).off("mousedown",self.onmousedown);
		};
	};
	return selection;

});