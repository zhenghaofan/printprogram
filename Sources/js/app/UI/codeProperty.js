define(['jquery','jqueryUI','knockout','app/Stage','app/Util'],function ($,ui,ko,stage,util){
	// 条码属性
	var a = function (){
		this.target = $("#tiaomashuxing");
		this.code = ko.observable();
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
			util.Event.addEventListener("showCodeProperty",this.open,this);
			util.Event.addEventListener("hideCodeProperty",this.close,this);

		},
		open: function (e,obj){
			this.code(obj);
			if(this.code()){
				this.target.dialog("open");
			}
		},
		close: function (){
			this.target.dialog("close");
		}
	};
	return new a();
});