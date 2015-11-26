define(['jquery','app/Stage','object/Line','app/Util'],function ($,stage,line,util){
	var addline = function (parent){
		var self = this;
		self.parent = parent;
		self.name = "addline";
		self.newLine = null;
		//mouse position
		self.x = 0;
		self.y = 0;

		self.onmousedown = function (){
			var doc = stage.curDoc();
			if(doc){
				util.Event.dispatch("beforeAddLine",this);
				self.x = stage.mouseX();
				self.y = stage.mouseY();
				self.newLine = doc.addLine();
				self.newLine.offsetX(self.x);
				self.newLine.offsetY(self.y);
				$(document).on("mousemove",self.onmousemove);
				$(document).one("mouseup",self.onmouseup);
			}
		};
		self.onmousemove = function (){
			var line = self.newLine;
			var d_x = Math.abs(self.x - stage.mouseX());
			var d_y = Math.abs(self.y - stage.mouseY());
			if(d_x < d_y){
				line.lineType("v");
				line.offsetX(self.x);
				line.offsetY(Math.min(self.y,stage.mouseY()));
				line.lineLength(d_y);
			}else {
				line.lineType("h");
				line.offsetX(Math.min(self.x,stage.mouseX()));
				line.offsetY(self.y);
				line.lineLength(d_x);
			}
			self.newLine.updateCanvas();
		};
		self.onmouseup = function (){
			$(document).off("mousemove",self.onmousemove);
			stage.updateCanvas();
			util.Event.dispatch("afterAddLine",this);
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

	return addline;
});