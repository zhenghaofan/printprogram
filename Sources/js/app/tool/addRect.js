define(['jquery','app/Stage','app/Util'],function ($,stage,util){
	var addrect = function (parent){
		var self = this;
		self.parent = parent;
		self.name = "addrect"
		self.newRect = null;
		//mouse position
		self.x = 0;
		self.y = 0;

		self.onmousedown = function (){
			var doc = stage.curDoc();
			if(doc){
				util.Event.dispatch("beforeAddRect",this);
				self.x = stage.mouseX();
				self.y = stage.mouseY();
				self.newRect = doc.addRect();
				self.newRect.offsetX(self.x);
				self.newRect.offsetY(self.y);
				$(document).on("mousemove",self.onmousemove);
				$(document).one("mouseup",self.onmouseup);
			}
		};
		self.onmousemove = function (){
			var rect = self.newRect;
			var info = {
				UI_LEFT_TOP_X : Math.min(self.x,stage.mouseX()),
				UI_LEFT_TOP_Y : Math.min(self.y,stage.mouseY()),
				UI_RIGHT_BOTTOM_X : Math.max(self.x,stage.mouseX()),
				UI_RIGHT_BOTTOM_Y : Math.max(self.y,stage.mouseY())
			};
			rect.UI_INFO(info);
			self.newRect.updateCanvas();
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

	return addrect;
});