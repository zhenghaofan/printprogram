define(['knockout','mapping'],function (ko,map){
	var image = function (parent,data){
		var self = this;
		self.cvs = document.createElement("canvas");
		self.ctx = self.cvs.getContext("2d");
		self.parent = parent;

		self.id = null;
		self.name = ko.observable("图片");
		self.type = "image";
		self.zIndex = ko.observable(0);
		self.offsetX = ko.observable(20);
		self.offsetY = ko.observable(20);
		self.angle = ko.observable(0);
		self.ratio = ko.observable(1);
      self.selected   = ko.observable(false);
		self.width = ko.observable(400);
		self.height = ko.observable(300);
		self.loaded = ko.observable(false);
		self.dataURL = ko.observable();
		self.image = null;
		self.getImagecache = ko.computed(function (){
			var img = new Image();
			img.onload = function (){
				self.loaded(true);
				self.image = img;
				self.width(img.width);
				self.height(img.height);
				self.updateCanvas();
			};
			var data = self.dataURL();
			if(data) 
			img.src = data;
			return true;
		});



		//ui info
		self.UI_INFO = ko.computed({
			read: function (){
				return {
					UI_LEFT_TOP_X : self.offsetX(),
					UI_LEFT_TOP_Y : self.offsetY(),
					UI_RIGHT_BOTTOM_X : self.offsetX() + self.width(),
					UI_RIGHT_BOTTOM_Y : self.offsetY() + self.height()
				}
			},
			write: function (info){
				self.offsetX(info.UI_LEFT_TOP_X);
				self.offsetY(info.UI_LEFT_TOP_Y);
				self.width(info.UI_RIGHT_BOTTOM_X - info.UI_LEFT_TOP_X);
				self.height(info.UI_RIGHT_BOTTOM_Y - info.UI_LEFT_TOP_Y);
			},
			owner: self
		});

		self.init = function (){
			data = data || {};
			var mapRule = {
				ignore: ["cvs","ctx","parent","loaded","image","getImagecache","UI_INFO"],
				include: ["id","name","type","zIndex","offsetX","offsetY","angle","ratio","width","height","dataURL"]
			};
			if(data){
				map.fromJS(data,mapRule,self);
			}
			//self.addAutoUpdateEvent();
			self.redraw();
			//
			console.log(map.toJS(self));
			// self.eventWithoutRedraw.subscribe(function (){
			// 	self.updateCanvas();
			// });
		};
		self.updateCanvas = function (){
			self.redraw();
			if (self.parent) {
				self.parent.updateCanvas();
			};
		};
		self.resizeCanvas = function (x,y){
			self.cvs.width = x;
			self.cvs.height = y;
			self.cvs.style.width = x + "px";
			self.cvs.style.height = x + "px";
		};
		self.redraw = function (){
			self.resizeCanvas(self.width(),self.height());
			//self.ctx.translate(0.5,0.5);
			// self.ctx.clearRect(0,0,self.canvasWidth(),self.canvasHeight());
			// self.ctx.save();
	        // this.ctx.restore();
	        //console.log("redraw");
	        if(self.loaded() && self.image){
		        self.ctx.drawImage(self.image,0,0,self.width(),self.height());
	        }else {
		        self.ctx.textBaseline = "top";
	        	self.ctx.fillText("图片加载中...",0,0);
	        }
			return self.cvs;
		};
		// self.cache = ko.computed(function (){
		// 	self.resizeCanvas(self.canvasWidth(),self.canvasHeight());
		// 	//self.ctx.translate(0.5,0.5);
		// 	self.ctx.clearRect(0,0,self.canvasWidth(),self.canvasHeight());
		// 	self.ctx.save();
		// 	self.ctx.beginPath();
		// 	self.ctx.lineWidth= self.lineWidth();
		// 	self.ctx.strokeStyle=self.lineColor();
		// 	self.ctx.rect(self.halfLineWidth(),self.halfLineWidth(),self.width(),self.height());
		// 	self.ctx.stroke();
	 //        this.ctx.restore();
	 //        console.log("redraw");
		// 	return self.cvs;
		// },self);
		self.isInPoint = function (x,y){
			x = x || window.app.stage.mouseX();
			y = y || window.app.stage.mouseY();
			return self.offsetX() <= x && x <= (self.offsetX() + self.width()) && self.offsetY() <= y && y <= (self.offsetY() + self.height());
		};
		self.init();
	};
	return image;
});