define(['jquery','knockout','app/Stage','object/Line','app/Util'],function ($,ko,stage,line,util){
	var addline = function (parent){
		var self = this;
		self.parent = parent;
		self.name = "addline";
		self.newLine = null;
		self.locked = ko.observable(false);
		//mouse position
		self.x = 0;
		self.y = 0;

		self.onmousedown = function (){
			var doc = stage.curDoc();
			if(doc){
				util.Event.dispatch("beforeAddLine",this);
				self.x = stage.mouseX();//canvas中的坐标,直线起点
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
			var ishReverse = self.x - stage.mouseX();
			var isvReverse = self.y - stage.mouseY();
			var d_x = Math.abs(ishReverse);
			var d_y = Math.abs(isvReverse);
			if(d_x < d_y){
				if(isvReverse > 0){
					line.reverse(true);
				}
				line.lineType("v");
				line.offsetX(self.x);//起点
				line.offsetY(Math.min(self.y,stage.mouseY()));//起点y与最终y的最小值
				line.lineLength(d_y);
			}else {
				if(ishReverse > 0){
					line.reverse(true);
				}
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
		// self.lock = function(){
		// 	util.Event.addEventListener('lock',function(){
		// 		$(stage.cvs).off('mousemove',self.onmousemove);
		// 	});
		// };
	};

	return addline;
});