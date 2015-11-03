define(['knockout','mapping'],function (ko,map){
	var text = function (parent,data){
		var self = this;
		self.cvs = document.createElement("canvas");
		self.ctx = self.cvs.getContext("2d");
		self.parent = parent;

		self.paddingLeft = 5;
		self.paddingRight = 5;
		self.paddingTop = 5;
		self.paddingBottom = 5;

		self.id = null;
		self.name = ko.observable("文本");
		self.type = "text";
		self.isFixedWidth = ko.observable(false);
		self.zIndex = ko.observable(0);
		self.offsetX = ko.observable(100);
		self.offsetY = ko.observable(100);
		self.angle = ko.observable(0);
		self.ratio = ko.observable(1);
      self.selected   = ko.observable(false);
		self.width = ko.observable(520);
		self.fontFamily = ko.observable("sans-serif");
		self.fontSize = ko.observable(14);

		self.lineSpacing = ko.observable(5);
		self.lineHeight = ko.computed(function (){
			return self.fontSize() + self.lineSpacing();
		});

		self.content = ko.observable("如果 exec() 找到了匹配的文本，则返回一个结果\n数组。否则，返回 null。此数组的第 0 个元素是与正则表达式相匹配的文本，第 1 个元素是与 RegExpObject 的第 1 个子表达式相匹配的文本（如果有的话），第 2 个元素是与 RegExpObject 的第 2 个子表达式相匹配的文本（如果有的话），以此类推。除了数组元素和 length 属性之外，exec() 方法还返回两个属性。");
		self.align = ko.observable("left");//left center right justify
		//style
		self.bold = ko.observable(false);
		self.italic = ko.observable(false);
		self.underline = ko.observable(false);

		self.font = ko.computed(function (){
			var italic = self.italic() ? "italic" : "normal";
			var bold = self.bold() ? "bold " : "normal ";
			return italic + " normal " + bold + self.fontSize() + "px "+ self.fontFamily();
		});

		self.splitContent = ko.computed(function (){
			var ogi = self.content();
			if(self.isFixedWidth() == false){
				self.ctx.font = self.font();
				var lines = ogi.split("\n"),
					maxWidth = 0,
					w;
				for(var i = 0 ; i < lines.length ; i++){
					var line = lines[i];
					w = self.ctx.measureText(line).width;
					maxWidth = Math.max(maxWidth,w);
				}
				self.width(maxWidth);
				return lines;
			}else {
				self.ctx.font = self.font();
				var lines = ogi.split("/n");
				var t = [];
				for(var i = 0;i < lines.length ; i++){
					var line = lines[i];
					if(self.ctx.measureText(line).width <= self.width()){
						t.push(line);
					}else {
						var start = 0,
						    str,
						    x;
						for(x = 1; x <= line.length ; x++){
							str = line.substring(start,x);
							if(self.ctx.measureText(str).width > self.width()){
								t.push(line.substring(start,x - 1));
								start = x-1;
							}
						}
						t.push(line.substring(start,x));
					}
				}
				return t;
			}
		});

		self.height = ko.computed(function (){
			return self.splitContent().length * self.lineHeight() - self.lineSpacing();
		});

		self.canvasWidth = ko.computed(function (){
			return self.width() + self.paddingLeft + self.paddingRight;
		});
		self.canvasHeight = ko.computed(function (){
			return self.height() + self.paddingTop + self.paddingBottom;
		});

		self.autoUpdateEvent = null;
		//ui info
		self.UI_INFO = ko.computed({
			read: function (){
				return {
					UI_LEFT_TOP_X : self.offsetX(),
					UI_LEFT_TOP_Y : self.offsetY(),
					UI_RIGHT_BOTTOM_X : self.offsetX() + self.canvasWidth(),
					UI_RIGHT_BOTTOM_Y : self.offsetY() + self.canvasHeight(),
					UI_TYPE: self.isFixedWidth() ? "horizontal":"none"
				}
			},
			write: function (info){
				self.offsetX(info.UI_LEFT_TOP_X);
				self.offsetY(info.UI_LEFT_TOP_Y);
				self.width(info.UI_RIGHT_BOTTOM_X - info.UI_LEFT_TOP_X - self.paddingLeft - self.paddingRight);
			},
			owner: self
		});

		self.init = function (){
			data = data || {};
			var mapRule = {
				include: ["id","name","type","isFixedWidth","zIndex","offsetX","offsetY","angle","ratio","width","fontFamily","fontSize","lineSpacing","content","align","bold","italic","underline"]
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
			//self.ctx.beginPath();
			//self.ctx.lineWidth= self.lineWidth();
			//self.ctx.strokeStyle=self.lineColor();
			//self.ctx.rect(self.halfLineWidth(),self.halfLineWidth(),self.width(),self.height());
			//self.ctx.stroke();
	        // this.ctx.restore();
	        //console.log("redraw");
	        var ar = self.splitContent(),
	            y = self.paddingTop;

	        self.ctx.font = self.font();
	        self.ctx.textBaseline = "top";
	        for(var i = 0 ; i < ar.length ; i++){
		        self.ctx.fillText(ar[i],self.paddingLeft,y + (self.lineHeight() * i));
	        }
	        //console.log(self.cvs.toDataURL("image/png"));
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
			return self.offsetX() <= x && x <= (self.offsetX() + self.canvasWidth()) && self.offsetY() <= y && y <= (self.offsetY() + self.canvasHeight());
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
	return text;
});