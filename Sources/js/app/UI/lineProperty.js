define(['jquery','jqueryUI','knockout','app/Stage','app/Util'],function ($,ui,ko,stage,util){
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
			var rotate = this.angle;
			if(this.lineType()==='h'){
				console.log(this.angle);
				if(rotate / 90 === 1 || rotate / 90 === 3){
					console.log('水平变垂直');
					this.lineType('v');
				}
			}else{
				console.log(this.angle);
				if(rotate / 90 === 1 || rotate / 90 === 3){
					console.log('垂直变水平');
					this.lineType('h');
				}
			}

			this.updateCanvas();
		}
	};
	return new a();
});