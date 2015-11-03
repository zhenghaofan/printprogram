define(['jquery','app/Stage','app/Util'],function ($,stage,util){
	var addtext = function (parent){
		var self = this;
		self.parent = parent;
		self.name = "addfixwidthtext"
		self.newText = null;
		//mouse position
		self.x = 0;
		self.y = 0;

		self.onmousedown = function (){
			var doc = stage.curDoc();
			if(doc){
				util.Event.dispatch("beforeAddText",this);
				self.x = stage.mouseX();
				self.y = stage.mouseY();
				self.newText = doc.addText();
				self.newText.isFixedWidth(true);
				self.newText.offsetX(self.x);
				self.newText.offsetY(self.y);
				$(document).on("mousemove",self.onmousemove);
				$(document).one("mouseup",self.onmouseup);
			}
		};
		self.onmousemove = function (){
			var text = self.newText;
			var info = {
				UI_LEFT_TOP_X : Math.min(self.x,stage.mouseX()),
				UI_LEFT_TOP_Y : self.y,
				UI_RIGHT_BOTTOM_X : Math.max(self.x,stage.mouseX()),
				UI_RIGHT_BOTTOM_Y : 0
			};
			text.UI_INFO(info);
			self.newText.updateCanvas();
		};
		self.onmouseup = function (){
			$(document).off("mousemove",self.onmousemove);
			stage.updateCanvas();
			util.Event.dispatch("afterAddRect",this);
			self.setDefaultTool();
		};
		self.setDefaultTool = function (){
			self.parent.setDefaultTool();
		};
		self.active = function (){
			$(stage.cvs).on("mousedown",self.onmousedown);
		};
		self.deactive = function (){
			$(stage.cvs).off("mousedown",self.onmousedown);
		};
	};

	return addtext;
});