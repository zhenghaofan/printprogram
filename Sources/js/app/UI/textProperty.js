define(['jquery','jqueryUI','knockout','app/Stage','app/Util'],function ($,ui,ko,stage,util){
	//文本属性
	var a = function (){
		this.target = $("#wenbenshuxing");
		this.text = ko.observable();
		this.init();
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
			util.Event.addEventListener("showTextProperty",this.open,this);
			util.Event.addEventListener("hideTextProperty",this.close,this);

		},
		open: function (e,obj){
			this.text(obj);
			if(this.text()){
				this.target.dialog("open");
			}
		},
		close: function (){
			this.target.dialog("close");
		},
		whenClickConfirm: function(){
			// if(this.lineType()==='h'){
			// 	// console.log(this.angle);
			// 	if(rotate / 90 === 1 || rotate / 90 === 3){
			// 		console.log('水平变垂直');
			// 		this.lineType('v');
			// 	}
			// }else{
			// 	// console.log(this.angle);
			// 	if(rotate / 90 === 1 || rotate / 90 === 3){
			// 		console.log('垂直变水平');
			// 		this.lineType('h');
			// 	}
			// }
			var rotate = this.angle;
			// if(rotate / 90 === 1 || rotate / 90 === 3){
			// 		console.log('水平变垂直');
			// 		var width = this.width();
			// 		this.width(this.lineHeight());
			// 		this.lineHeight(width);
			// 	}
			this.updateCanvas();
		}
	};
	return new a();
});