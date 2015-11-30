define(['jquery','jqueryUI','knockout','mapping','app/Extender'],function ($,ui,ko,map,extender){
	var MIN_LINE_WIDTH = 10;
	var line = function (parent,data){
		var self = this;
		self.cvs = document.createElement("canvas");
		self.ctx = self.cvs.getContext("2d");
		self.id = null;
		self.parent = parent;
		self.name = ko.observable("线条");
		self.type = "line";
		self.zIndex = ko.observable(0);
		self.offsetX = ko.observable(50).extend({numeric: {precision: 0,defaultValue: 50}});
		self.offsetY = ko.observable(50).extend({numeric: {precision: 0,defaultValue: 50}});
		self.angle = ko.observable(0);
		self.reverse = ko.observable(false);
		self.ratio = ko.observable(1);//比例
      	self.selected   = ko.observable(false);
		self.lineType = ko.observable("h");
		self.lineLength = ko.observable(200).extend({numeric: {precision: 0,defaultValue: 200}});
		self.lineWidth = ko.observable(2).extend({numeric: {precision: 0,defaultValue: 2}});
		self.lineColor = ko.observable("#000000");
		self.locked = ko.observable(false);
		self.typewithdirect = ko.computed({
			read: function(){
				if(self.lineType() === 'h' && !self.reverse()) return 'ph';
				if(self.lineType() === 'h' && self.reverse()) return 'nh';
				if(self.lineType() === 'v' && !self.reverse()) return 'pv';
				if(self.lineType() === 'v' && self.reverse()) return 'nv';
			}
		});

		//自动计算canvas大小
		self.canvasWidth = ko.computed({
			// return self.lineType() == "h" ? self.lineLength() : self.lineWidth();
			read: function (){
				if(self.typewithdirect() === 'ph' && self.angle() === 0 || 
				self.typewithdirect() === 'nh' && self.angle() === 180 || 
				self.typewithdirect() === 'pv' && self.angle() === 270 || 
				self.typewithdirect() === 'nv' && self.angle() === 90 ){ //正横
					return self.lineLength();
				}else if(self.typewithdirect() === 'ph' && self.angle() === 90 || 
				self.typewithdirect() === 'nh' && self.angle() === 270 || 
				self.typewithdirect() === 'pv' && self.angle() === 0 || 
				self.typewithdirect() === 'nv' && self.angle() === 180 ){ //正竖

					return self.lineWidth();

				}else if(self.typewithdirect() === 'ph' && self.angle() === 180 || 
				self.typewithdirect() === 'nh' && self.angle() === 0 || 
				self.typewithdirect() === 'pv' && self.angle() === 90 || 
				self.typewithdirect() === 'nv' && self.angle() === 270 ){ //负横
					return self.lineLength();

				}else if(self.typewithdirect() === 'ph' && self.angle() === 270 || 
				self.typewithdirect() === 'nh' && self.angle() === 90 || 
				self.typewithdirect() === 'pv' && self.angle() === 180 || 
				self.typewithdirect() === 'nv' && self.angle() === 0 ){ //负竖
					return self.lineWidth();

				}
			
			}
		}
		);
		self.canvasHeight = ko.computed({
			// return self.lineType() === "h" ? self.lineWidth() : self.lineLength();
			read: function (){
				if(self.typewithdirect() === 'ph' && self.angle() === 0 || 
				self.typewithdirect() === 'nh' && self.angle() === 180 || 
				self.typewithdirect() === 'pv' && self.angle() === 270 || 
				self.typewithdirect() === 'nv' && self.angle() === 90 ){ //正横
					return self.lineWidth();
				}else if(self.typewithdirect() === 'ph' && self.angle() === 90 || 
				self.typewithdirect() === 'nh' && self.angle() === 270 || 
				self.typewithdirect() === 'pv' && self.angle() === 0 || 
				self.typewithdirect() === 'nv' && self.angle() === 180 ){ //正竖

					return self.lineLength();

				}else if(self.typewithdirect() === 'ph' && self.angle() === 180 || 
				self.typewithdirect() === 'nh' && self.angle() === 0 || 
				self.typewithdirect() === 'pv' && self.angle() === 90 || 
				self.typewithdirect() === 'nv' && self.angle() === 270 ){ //负横
					return self.lineWidth();

				}else if(self.typewithdirect() === 'ph' && self.angle() === 270 || 
				self.typewithdirect() === 'nh' && self.angle() === 90 || 
				self.typewithdirect() === 'pv' && self.angle() === 180 || 
				self.typewithdirect() === 'nv' && self.angle() === 0 ){ //负竖
					return self.lineLength();

				}
			
			}
		});

		//ui info

		self.UI_INFO = ko.computed({
			read: function (){
				if(self.typewithdirect() === 'ph' && self.angle() === 0 || 
				self.typewithdirect() === 'nh' && self.angle() === 180 || 
				self.typewithdirect() === 'pv' && self.angle() === 270 || 
				self.typewithdirect() === 'nv' && self.angle() === 90 ){ //正横
					if(self.lineWidth() >= MIN_LINE_WIDTH){
							return {
								UI_LEFT_TOP_X : self.offsetX(),
								UI_LEFT_TOP_Y : self.offsetY(),
								UI_RIGHT_BOTTOM_X : self.offsetX() + self.lineLength(),
								UI_RIGHT_BOTTOM_Y : self.offsetY() + self.lineWidth(),
								UI_TYPE : "horizontal"
							};

						}else {
							return {
								UI_LEFT_TOP_X : self.offsetX(),
								UI_LEFT_TOP_Y : self.offsetY() - (MIN_LINE_WIDTH - self.lineWidth()) / 2,
								UI_RIGHT_BOTTOM_X : self.offsetX() + self.lineLength(),
								UI_RIGHT_BOTTOM_Y : self.offsetY() + self.lineWidth() + (MIN_LINE_WIDTH - self.lineWidth()) /2,
								UI_TYPE : "horizontal"
							};
						}
				}else if(self.typewithdirect() === 'ph' && self.angle() === 90 || 
				self.typewithdirect() === 'nh' && self.angle() === 270 || 
				self.typewithdirect() === 'pv' && self.angle() === 0 || 
				self.typewithdirect() === 'nv' && self.angle() === 180 ){ //正竖

					if(self.lineWidth() >= MIN_LINE_WIDTH){
						return {
							UI_LEFT_TOP_X : self.offsetX(),
							UI_LEFT_TOP_Y : self.offsetY(),
							UI_RIGHT_BOTTOM_X : self.offsetX() + self.lineWidth(),
							UI_RIGHT_BOTTOM_Y : self.offsetY() + self.lineLength(),
							UI_TYPE : "vertical"
						};
					}else {
						return {
							UI_LEFT_TOP_X : self.offsetX() - (MIN_LINE_WIDTH - self.lineWidth()) / 2,
							UI_LEFT_TOP_Y : self.offsetY(),
							UI_RIGHT_BOTTOM_X : self.offsetX() + self.lineWidth() + (MIN_LINE_WIDTH - self.lineWidth()) / 2,
							UI_RIGHT_BOTTOM_Y : self.offsetY() + self.lineLength(),
							UI_TYPE : "vertical"
						};
					}

				}else if(self.typewithdirect() === 'ph' && self.angle() === 180 || 
				self.typewithdirect() === 'nh' && self.angle() === 0 || 
				self.typewithdirect() === 'pv' && self.angle() === 90 || 
				self.typewithdirect() === 'nv' && self.angle() === 270 ){ //负横
					if(self.lineWidth() >= MIN_LINE_WIDTH){
						return {
								UI_LEFT_TOP_X : self.offsetX(),
								UI_LEFT_TOP_Y : self.offsetY(),
								UI_RIGHT_BOTTOM_X : self.offsetX() - self.lineLength(),
								UI_RIGHT_BOTTOM_Y : self.offsetY() + self.lineWidth(),
								UI_TYPE : "horizontal"
							};

						}else {
							return {
								UI_LEFT_TOP_X : self.offsetX(),
								UI_LEFT_TOP_Y : self.offsetY() - (MIN_LINE_WIDTH - self.lineWidth()) / 2,
								UI_RIGHT_BOTTOM_X : self.offsetX() - self.lineLength(),
								UI_RIGHT_BOTTOM_Y : self.offsetY() + self.lineWidth() + (MIN_LINE_WIDTH - self.lineWidth()) /2,
								UI_TYPE : "horizontal"
						};
					}

				}else if(self.typewithdirect() === 'ph' && self.angle() === 270 || 
				self.typewithdirect() === 'nh' && self.angle() === 90 || 
				self.typewithdirect() === 'pv' && self.angle() === 180 || 
				self.typewithdirect() === 'nv' && self.angle() === 0 ){ //负竖
					if(self.lineWidth() >= MIN_LINE_WIDTH){
						return {
							UI_LEFT_TOP_X : self.offsetX(),
							UI_LEFT_TOP_Y : self.offsetY(),
							UI_RIGHT_BOTTOM_X : self.offsetX() + self.lineWidth(),
							UI_RIGHT_BOTTOM_Y : self.offsetY() - self.lineLength(),
							UI_TYPE : "vertical"
						};
					}else {
						return {
							UI_LEFT_TOP_X : self.offsetX() - (MIN_LINE_WIDTH - self.lineWidth()) / 2,
							UI_LEFT_TOP_Y : self.offsetY(),
							UI_RIGHT_BOTTOM_X : self.offsetX() + self.lineWidth() + (MIN_LINE_WIDTH - self.lineWidth()) / 2,
							UI_RIGHT_BOTTOM_Y : self.offsetY() - self.lineLength(),
							UI_TYPE : "vertical"
						};
					}

				}
			},
			write: function (info){
				if(self.typewithdirect() === 'ph' && self.angle() === 0 || 
				self.typewithdirect() === 'nh' && self.angle() === 180 || 
				self.typewithdirect() === 'pv' && self.angle() === 270 || 
				self.typewithdirect() === 'nv' && self.angle() === 90 ){//正横
					if(self.lineWidth() >= MIN_LINE_WIDTH){
						self.offsetX(info.UI_LEFT_TOP_X);
						self.offsetY(info.UI_LEFT_TOP_Y);
						self.lineLength(info.UI_RIGHT_BOTTOM_X - info.UI_LEFT_TOP_X);
					}else {
						self.offsetX(info.UI_LEFT_TOP_X);
						self.offsetY(info.UI_LEFT_TOP_Y + (MIN_LINE_WIDTH - self.lineWidth()) / 2);
						self.lineLength(info.UI_RIGHT_BOTTOM_X - info.UI_LEFT_TOP_X);
					}

				}else if(self.typewithdirect() === 'ph' && self.angle() === 90 || 
				self.typewithdirect() === 'nh' && self.angle() === 270 || 
				self.typewithdirect() === 'pv' && self.angle() === 0 || 
				self.typewithdirect() === 'nv' && self.angle() === 180 ){ //正竖

					if(self.lineWidth() >= MIN_LINE_WIDTH){
						self.offsetX(info.UI_LEFT_TOP_X);
						self.offsetY(info.UI_LEFT_TOP_Y);
						self.lineLength(info.UI_RIGHT_BOTTOM_Y - info.UI_LEFT_TOP_Y);
					}else {
						self.offsetX(info.UI_LEFT_TOP_X + (MIN_LINE_WIDTH - self.lineWidth()) / 2);
						self.offsetY(info.UI_LEFT_TOP_Y);
						self.lineLength(info.UI_RIGHT_BOTTOM_Y - info.UI_LEFT_TOP_Y);
					}

				}else if(self.typewithdirect() === 'ph' && self.angle() === 90 || 
				self.typewithdirect() === 'nh' && self.angle() === 270 || 
				self.typewithdirect() === 'pv' && self.angle() === 0 || 
				self.typewithdirect() === 'nv' && self.angle() === 180 ){ //负横

					if(self.lineWidth() >= MIN_LINE_WIDTH){
						self.offsetX(info.UI_LEFT_TOP_X);
						self.offsetY(info.UI_LEFT_TOP_Y);
						// self.lineLength(info.UI_RIGHT_BOTTOM_X - info.UI_LEFT_TOP_X);
						self.lineLength(info.UI_LEFT_TOP_X - info.UI_RIGHT_BOTTOM_X);
					}else {
						self.offsetX(info.UI_LEFT_TOP_X);
						self.offsetY(info.UI_LEFT_TOP_Y + (MIN_LINE_WIDTH - self.lineWidth()) / 2);
						// self.lineLength(info.UI_RIGHT_BOTTOM_X - info.UI_LEFT_TOP_X);
						self.lineLength(info.UI_LEFT_TOP_X - info.UI_RIGHT_BOTTOM_X );
					}

				}else if(self.typewithdirect() === 'ph' && self.angle() === 90 || 
				self.typewithdirect() === 'nh' && self.angle() === 270 || 
				self.typewithdirect() === 'pv' && self.angle() === 0 || 
				self.typewithdirect() === 'nv' && self.angle() === 180 ){ //负竖

					if(self.lineWidth() >= MIN_LINE_WIDTH){
						self.offsetX(info.UI_LEFT_TOP_X);
						self.offsetY(info.UI_LEFT_TOP_Y);
						// self.lineLength(info.UI_RIGHT_BOTTOM_Y - info.UI_LEFT_TOP_Y);
						self.lineLength(info.UI_LEFT_TOP_Y - info.UI_RIGHT_BOTTOM_Y );
					}else {
						self.offsetX(info.UI_LEFT_TOP_X + (MIN_LINE_WIDTH - self.lineWidth()) / 2);
						self.offsetY(info.UI_LEFT_TOP_Y);
						// self.lineLength(info.UI_RIGHT_BOTTOM_Y - info.UI_LEFT_TOP_Y);
						self.lineLength(info.UI_LEFT_TOP_Y - info.UI_RIGHT_BOTTOM_Y);
					}
				}
			},
			owner: self
		});

		self.init = function (){
			data = data || {};
			var mapRule = {
				include: ["id","name","type","zIndex","offsetX","offsetY","angle","ratio","lineType","lineLength","lineWidth","lineColor"]
			};
			if(data){
				map.fromJS(data,mapRule,self);
			}
			self.redraw();

			// self.cache.subscribe(function (){
			// 	self.updateCanvas();
			// });
		};
		// self.lock = function(){
		// 	$(self.cvs).off("mousemove");
		// };
		self.setLineType = function(type){
			self.lineType = ko.observable(type);
		};
		self.updateCanvas = function (){
			self.redraw();
			if (self.parent) {
				self.parent.updateCanvas();
			}
		};
		self.resizeCanvas = function (x,y){
			self.cvs.width = x;
			self.cvs.height = y;
			self.cvs.style.width = x + "px";
			self.cvs.style.height = x + "px";
		};
		self.redraw = function (){
			// console.log('canvasWidth:'+self.canvasWidth());
			// console.log('canvasHeight:'+self.canvasHeight());
			// console.log(self.cvs);
			self.resizeCanvas(self.canvasWidth(),self.canvasHeight());
			//self.ctx.translate(0.5,0.5);
			//self.ctx.clearRect(0,0,self.canvasWidth(),self.canvasHeight());
			//
			
			self.ctx.beginPath();
			self.ctx.lineWidth = self.lineWidth();
			self.ctx.strokeStyle = self.lineColor();
			// if(self.lineType() === "h"){
			// 	self.ctx.moveTo(0,self.lineWidth() / 2);
			// 	self.ctx.lineTo(self.lineLength(),self.lineWidth() / 2);
			// }else if (self.lineType() === "v"){
			// 	self.ctx.moveTo(self.lineWidth() / 2,0);
			// 	self.ctx.lineTo(self.lineWidth() / 2,self.lineLength());
			// }


			if(self.typewithdirect() === 'ph' && self.angle() === 0 || 
				self.typewithdirect() === 'nh' && self.angle() === 180 || 
				self.typewithdirect() === 'pv' && self.angle() === 270 || 
				self.typewithdirect() === 'nv' && self.angle() === 90 ){ //正横

					self.ctx.moveTo(0,self.lineWidth() / 2);
					self.ctx.lineTo(self.lineLength(),self.lineWidth() / 2);

				}else if(self.typewithdirect() === 'ph' && self.angle() === 90 || 
				self.typewithdirect() === 'nh' && self.angle() === 270 || 
				self.typewithdirect() === 'pv' && self.angle() === 0 || 
				self.typewithdirect() === 'nv' && self.angle() === 180 ){ //正竖

					self.ctx.moveTo(self.lineWidth() / 2,0);
					self.ctx.lineTo(self.lineWidth() / 2,self.lineLength());

				}else if(self.typewithdirect() === 'ph' && self.angle() === 180 || 
				self.typewithdirect() === 'nh' && self.angle() === 0 || 
				self.typewithdirect() === 'pv' && self.angle() === 90 || 
				self.typewithdirect() === 'nv' && self.angle() === 270 ){ //负横

					self.ctx.moveTo(0,self.lineWidth() / 2);
					self.ctx.lineTo(-self.lineLength(),self.lineWidth() / 2);

				}else if(self.typewithdirect() === 'ph' && self.angle() === 270 || 
				self.typewithdirect() === 'nh' && self.angle() === 90 || 
				self.typewithdirect() === 'pv' && self.angle() === 180 || 
				self.typewithdirect() === 'nv' && self.angle() === 0 ){ //负竖

					self.ctx.moveTo(self.lineWidth() / 2,0);
					self.ctx.lineTo(self.lineWidth() / 2,-self.lineLength());

				}

			self.ctx.stroke();
			return self.cvs;
		};
		// self.cache = ko.computed(function (){
		// 	self.resizeCanvas(self.canvasWidth(),self.canvasHeight());
		// 	//self.ctx.translate(0.5,0.5);
		// 	//self.ctx.clearRect(0,0,self.canvasWidth(),self.canvasHeight());
		// 	//

		// 	self.ctx.beginPath();
		// 	self.ctx.lineWidth= self.lineWidth();
		// 	self.ctx.strokeStyle=self.lineColor();
		// 	if(self.lineType() == "h"){
		// 		self.ctx.moveTo(0,self.lineWidth() / 2);
		// 		self.ctx.lineTo(self.lineLength(),self.lineWidth() / 2);
		// 	}else if (self.lineType() == "v"){
		// 		self.ctx.moveTo(self.lineWidth() / 2,0);
		// 		self.ctx.lineTo(self.lineWidth() / 2,self.lineLength());
		// 	}
		// 	self.ctx.stroke();
		// 	//self.ctx.fill();
		// 	// console.log(self.cvs.toDataURL("image/png"));
		// 	//为linewidth 提供矩形检测路径
		// 	if(self.lineWidth() < 5 ){
		// 		//self.ctx.rect(self.x1(),self.y1(),self);
		// 	}
		// 	return self.cvs;
		// },self);
		self.isInPoint = function (x,y){
			x = x || window.app.stage.mouseX();
			y = y || window.app.stage.mouseY();
			// console.log('isInPoint');
			if(self.lineType() == "h"){
				if(self.lineWidth() >= MIN_LINE_WIDTH){
					return self.offsetX() <= x && x <= (self.offsetX() + self.lineLength()) && self.offsetY() <= y && y <= (self.offsetY() + self.lineWidth());
				}else{
					return self.offsetX() <= x && x <= (self.offsetX() + self.lineLength()) && (self.offsetY() - (MIN_LINE_WIDTH - self.lineWidth()) / 2) <= y && y <= (self.offsetY() + self.lineWidth() + (MIN_LINE_WIDTH - self.lineWidth()) / 2);
				}
			}else if(self.lineType() == "v"){
				if(self.lineWidth() >= MIN_LINE_WIDTH){
					return self.offsetX() <= x && x <= (self.offsetX() + self.lineWidth()) && self.offsetY() <= y && y <= (self.offsetY() + self.lineLength());
				}else{
					return (self.offsetX() - (MIN_LINE_WIDTH - self.lineWidth()) / 2) <= x && x <= (self.offsetX() + self.lineWidth() + (MIN_LINE_WIDTH - self.lineWidth()) / 2) && self.offsetY() <= y && y <= (self.offsetY() + self.lineLength());
				}
			}
		};
		
		ko.bindingHandlers.slide = {

		    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
		    	$(element).slider({
				  	min: 0,
				  	max: 270,
				  	range: "min",
				  	step: 90
				  	});
		    	ko.utils.registerEventHandler(element,'slidechange',function(){
		    		var observable = valueAccessor();
		    		observable($(element).slider('value'));
		    	});
		    },
		    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
		    	var value = ko.utils.unwrapObservable(valueAccessor());
		    	$(element).slider('value',value);
		        
		    }
		};

		ko.bindingHandlers.spinner = {

		    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
		    	$(element).spinner({step:0.01});
		    	// ko.utils.registerEventHandler(element,'change',function(){
		    	// 	var observable = valueAccessor();
		    	// 	console.log(observable());
		    	// 	observable($(element).spinner('value'));
		    	// });
		    },
		    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
		    	// var value = ko.utils.unwrapObservable(valueAccessor());
		    	// console.log(value);
		    	// $(element).spinner('value',value);
		        
		    }
		};
		self.init();
	};
	return line;
});