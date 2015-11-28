define(['jquery','jqueryUI','knockout','app/Stage','app/Util'],function ($,ui,ko,stage,util){
	// 矩形属性
	var a = function (){
		var self = this;
		self.target = $("#juxingshuxing");
		self.rect = ko.observable();
		self.whenClickConfirm = function (){
			var rect = self.rect();
			if(rect){
				rect.updateCanvas();
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
			util.Event.addEventListener("showRectProperty",this.open,this);
			util.Event.addEventListener("hideRectProperty",this.close,this);

		},
		open: function (e,obj){
			this.rect(obj);
			if(this.rect()){
				this.target.dialog("open");
			}
		},
		close: function (){
			this.target.dialog("close");
		}
	};
	return new a();
});