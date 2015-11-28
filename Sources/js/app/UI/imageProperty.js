define(['jquery','jqueryUI','knockout','app/Stage','app/Util'],function ($,ui,ko,stage,util){
	// 图片属性
	var a = function (){
		this.target = $("#tupianshuxing");
		this.image = ko.observable();
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
			util.Event.addEventListener("showImageProperty",this.open,this);
			util.Event.addEventListener("hideImageProperty",this.close,this);

		},
		open: function (e,obj){
			this.image(obj);
			if(this.image()){
				this.target.dialog("open");
			}
		},
		close: function (){
			this.target.dialog("close");
		}
	};
	return new a();
});