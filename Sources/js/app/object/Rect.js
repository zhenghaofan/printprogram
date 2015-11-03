define(['knockout','mapping'],function (ko,map){
	var rect = function (parent,data){
		var self = this;
		self.cvs = document.createElement("canvas");
		self.ctx = self.cvs.getContext("2d");
		self.parent = parent;

		self.id = null;
		self.name = ko.observable("矩形");
		self.type = "rect";
		self.zIndex = ko.observable(0);
		self.offsetX = ko.observable(20);
		self.offsetY = ko.observable(20);
		self.angle = ko.observable(0);
		self.ratio = ko.observable(1);
      self.selected   = ko.observable(false);
		self.width = ko.observable(400);
		self.height = ko.observable(300);
		self.lineWidth = ko.observable(2);
		self.lineColor = ko.observable("#000000");

		self.eventWithoutRedraw = ko.computed(function (){
			return self.offsetX() + self.offsetY() + self.angle();
		});


		self.halfLineWidth = ko.computed(function (){
			return self.lineWidth() / 2;
		});

		self.canvasWidth = ko.computed(function (){
			return self.width() + self.lineWidth();
		});
		self.canvasHeight = ko.computed(function (){
			return self.height() + self.lineWidth();
		});

		self.autoUpdateEvent = null;
		//ui info
		self.UI_INFO = ko.computed({
			read: function (){
				return {
					UI_LEFT_TOP_X : self.offsetX(),
					UI_LEFT_TOP_Y : self.offsetY(),
					UI_RIGHT_BOTTOM_X : self.offsetX() + self.width() + self.lineWidth(),
					UI_RIGHT_BOTTOM_Y : self.offsetY() + self.height() + self.lineWidth()
				}
			},
			write: function (info){
				self.offsetX(info.UI_LEFT_TOP_X);
				self.offsetY(info.UI_LEFT_TOP_Y);
				self.width(info.UI_RIGHT_BOTTOM_X - info.UI_LEFT_TOP_X - self.lineWidth());
				self.height(info.UI_RIGHT_BOTTOM_Y - info.UI_LEFT_TOP_Y - self.lineWidth());
			},
			owner: self
		});
		// self.UI_LEFT_TOP_X = ko.computed({
		// 	read: function (){
		// 		return self.offsetX();
		// 	},
		// 	write : function (x){
		// 		self.offsetX(x);
		// 	},
		// 	owner : self
		// });
		// self.UI_LEFT_TOP_Y = ko.computed({
		// 	read: function (){
		// 		return self.offsetY();
		// 	},
		// 	write : function (y){
		// 		self.offsetY(y);
		// 	},
		// 	owner : self
		// });
		// self.UI_RIGHT_BOTTOM_X = ko.computed({
		// 	read: function (){
		// 		return self.offsetX() + self.width() + self.lineWidth();
		// 	},
		// 	write : function (x){
		// 		self.width(x - self.lineWidth() - self.offsetX());
		// 	},
		// 	owner : self
		// });
		// self.UI_RIGHT_BOTTOM_Y = ko.computed({
		// 	read: function (){
		// 		return self.offsetY() + self.height() + self.lineWidth();
		// 	},
		// 	write : function (y){
		// 		self.height(y - self.lineWidth() - self.offsetY());
		// 	},
		// 	owner : self
		// });


		self.init = function (){
			data = data || {};
			var mapRule = {
				include: ["id","name","type","zIndex","offsetX","offsetY","angle","ratio","width","height","lineWidth","lineColor"]
			};
			if(data){
				map.fromJS(data,mapRule,self);
			}
			//self.addAutoUpdateEvent();
			self.redraw();
			//
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
			self.resizeCanvas(self.canvasWidth(),self.canvasHeight());
			//self.ctx.translate(0.5,0.5);
			// self.ctx.clearRect(0,0,self.canvasWidth(),self.canvasHeight());
			// self.ctx.save();
			self.ctx.beginPath();
			self.ctx.lineWidth= self.lineWidth();
			self.ctx.strokeStyle=self.lineColor();
			self.ctx.rect(self.halfLineWidth(),self.halfLineWidth(),self.width(),self.height());
			self.ctx.stroke();
	        // this.ctx.restore();
	        //console.log("redraw");
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
			return self.offsetX() <= x && x <= (self.offsetX() + self.width() + self.lineWidth()) && self.offsetY() <= y && y <= (self.offsetY() + self.height() + self.lineWidth());
		};
		self.addAutoUpdateEvent = function (){
			if(self.autoUpdateEvent){
				self.autoUpdateEvent = self.cache.subscribe(function (){
					self.updateCanvas();
				});
			}
		};
		self.removeAutoUpdateEvent = function (){
			console.log("rem");
			if(self.autoUpdateEvent){
				self.autoUpdateEvent = self.autoUpdateEvent.dispose();
			}
		};
		self.init();
	};
	return rect;
});