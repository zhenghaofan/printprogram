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
			// var rotate = this.angle();
			// if(this.lineType()==='h'){
			// 	// console.log(this.angle);
			// 	switch(rotate){
			// 		case 90:
			// 			this.lineType('v');
			// 			break;
			// 		case 180:
			// 			this.reverse(true);
			// 			break;
			// 		case 270:
			// 			this.lineType('v');
			// 			this.reverse(true);
			// 			break;
			// 		default:
			// 			break;
			// 	}
			// 	// if(rotate / 90 === 1 || rotate / 90 === 3){
			// 	// 	this.lineType('v');
			// 	// }else{
			// 	// 	this.lineType('h');
			// 	// }
			// }else{
			// 	// console.log(this.angle);
			// 	if(rotate / 90 === 1 || rotate / 90 === 3){
			// 		this.lineType('v');
			// 	}else{
			// 		this.lineType('h');
			// 	}
			// }
			
			this.updateCanvas();
		}
	};
	return new a();
});