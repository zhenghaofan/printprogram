define(['jquery','app/Stage','app/Util','app/UI/textGuide'],function ($,stage,util,guide){
	var addtext = function (parent){
		var self = this;
		self.parent = parent;
		self.name = "addtext"
		self.newText = null;
		//mouse position
		self.x = 0;
		self.y = 0;

		self.withGuide = false;

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
				if(self.withGuide) guide.show();
				self.setDefaultTool();
				util.Event.dispatch("afterAddRect",this);

			}
		};
		self.setDefaultTool = function (){
			self.parent.setDefaultTool();
		};
		self.active = function (flag){
			$(stage.cvs).on("mousedown",self.onmousedown);
			self.withGuide = flag == "true" ? true : false;
			console.log(self.withGuide);
		};
		self.deactive = function (){
			$(stage.cvs).off("mousedown",self.onmousedown);
		};
	};

	return addtext;
});