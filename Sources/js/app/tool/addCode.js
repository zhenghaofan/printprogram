define(['jquery','app/Stage','app/Util','app/UI/codeGuide'],function ($,stage,util,guide){
	var a = function (parent){
		var self = this;
		self.parent = parent;
		self.name = "addcode"
		self.newCode = null;
		//mouse position
		self.x = 0;
		self.y = 0;

		self.withGuide = false;

		self.onmousedown = function (){
			var doc = stage.curDoc();
			if(doc){
				util.Event.dispatch("beforeAddCode",this);
				self.x = stage.mouseX();
				self.y = stage.mouseY();
				self.newCode = doc.addCode();
				self.newCode.offsetX(self.x);
				self.newCode.offsetY(self.y);
				stage.updateCanvas();
				if(self.withGuide) guide.show();
				self.setDefaultTool();
				util.Event.dispatch("afterAddCode",this);

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

	return a;
});