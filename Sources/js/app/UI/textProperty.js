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
		}
	};
	return new a();
});