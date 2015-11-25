define(['jquery','jqueryUI','knockout','app/Stage','app/Util'],function ($,ui,ko,stage,util){
	var a = function (){
		var self = this;
		self.target = $("#zhixianshuxing");
		self.line = ko.observable();
		self.whenClickConfirm = function (){
			var line = self.line();
			if(line){
				line.updateCanvas();
			}
		};
		self.init();
	};
	a.prototype = {
		init: function (){
			// var w = this.target.data("width"),
			// 	s = this.target.data("visibility");
			// this.target.dialog({
			// 	width: w,
			// 	autoOpen: s,
			// 	resizable: false
			// });
			util.Event.addEventListener("showLineProperty",this.open,this);
			util.Event.addEventListener("hideLineProperty",this.close,this);
		},
		open: function (e,obj){
			this.line(obj);
			if(this.line()){
				this.target.dialog("open");
			}
		},
		close: function (){
			this.target.dialog("close");
		}
	};
	return new a();
});