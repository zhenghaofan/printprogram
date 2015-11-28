define(['jquery','jqueryUI','knockout','app/Stage','app/Util'],function ($,ui,ko,stage,util){
	// 矩形属性
	var a = function (){
		var self = this;
		self.target = $("#juxingshuxing");
		self.rect = ko.observable();
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
		},
		whenClickConfirm: function(){
			var rotate = this.angle;
			if(rotate / 90 === 1 || rotate / 90 === 3){
					console.log('水平变垂直');
					var width = this.width();
					this.width(this.height());
					this.height(width);
				}
			this.updateCanvas();
		}
	};
	return new a();
});