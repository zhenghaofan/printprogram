define(['jquery','app/Stage','app/Util'],function ($,stage,util){
	var addtext = function (parent){
		var self = this;
		self.parent = parent;
		self.name = "addtext"
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
				self.newText.offsetX(self.x);
				self.newText.offsetY(self.y);
				stage.updateCanvas();
				self.setDefaultTool();
				util.Event.dispatch("afterAddRect",this);

			}
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