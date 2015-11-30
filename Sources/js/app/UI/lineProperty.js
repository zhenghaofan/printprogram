define(['jquery','jqueryUI','knockout','app/Stage','app/Util','app/UIController'],function ($,ui,ko,stage,util,appui){
	// 直线属性
	var a = function (){
		var self = this;
		self.target = $("#zhixianshuxing");
		self.line = ko.observable();
		self.init();
	};
	a.prototype = {
		init: function (){
			util.Event.addEventListener("showLineProperty",this.open,this);
			util.Event.addEventListener("hideLineProperty",this.close,this);
		},
		open: function (e,obj){
			this.line(obj);//会触发whenClickConfirm
			if(this.line()){
				this.target.dialog("open");

			}
		},
		close: function (){
			this.target.dialog("close");
		},
		whenClickConfirm: function(){
			
			this.updateCanvas();
		}
	};
	return new a();
});