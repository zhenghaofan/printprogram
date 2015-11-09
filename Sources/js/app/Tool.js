define([
	'knockout',
	'app/Util',
	'app/tool/selection',
	'app/tool/addLine',
	'app/tool/addRect',
	'app/tool/addText',
	'app/tool/addFixWidthText',
	'app/tool/addImage',
	'app/tool/addCode'
],function (ko,util,selection,addline,addrect,addtext,addfixwidthtext,addimage,addcode){
	var tool = function (){
		var self =this;
		self.curTool = ko.observable();
		self.tools = {};

		self.init = function (){
			self.tools["selection"] = new selection(self);
			self.tools["addline"] = new addline(self);
			self.tools["addrect"] = new addrect(self);
			self.tools["addtext"] = new addtext(self);
			self.tools["addfixwidthtext"] = new addfixwidthtext(self);
			self.tools["addimage"] = new addimage(self);
			self.tools["addcode"] = new addcode(self);
			self.setDefaultTool();
		};
		self.setDefaultTool = function (){
			self.changeTool("selection");
		};
		self.changeTool = function (tool,flag){
			if(util._isString(tool) && self.tools.hasOwnProperty(tool)){
							console.log(tool);

				if(self.curTool()) self.curTool().deactive();
				self.tools[tool].active(flag);
				self.curTool(self.tools[tool]);
			}
		};

	};
	return new tool;
});