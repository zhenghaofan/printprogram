define(['jquery','knockout','app/tool/ControlPoint'],function ($,ko,cp){
	var ui = function (stage){
		var self = this;
		self.stage = stage;
		self.cvs = self.stage.cvs;
		self.ctx = self.stage.ctx;
		cp.prototype.ctx = self.ctx;

		self.e = new cp();//右
		self.s = new cp();//下
		self.w = new cp();//左
		self.n = new cp();//上

		self.nw = new cp();//左上
		self.ne = new cp();//右上
		self.sw = new cp();//左下
		self.se = new cp();//右下

		self.CONTROL_POINT_WIDTH = cp.prototype.CONTROL_POINT_WIDTH;
		self.CONTROL_RECT_LINEWIDTH = 1;
		self.CONTROL_RECT_LINECOLOR = "#144DD4";

		self.target = null;
		//基准位置

		self.UI_LEFT_TOP_X = ko.observable(0);
		self.UI_LEFT_TOP_Y = ko.observable(0);

		self.UI_RIGHT_BOTTOM_X = ko.observable(0);
		self.UI_RIGHT_BOTTOM_Y = ko.observable(0);
		//UI 类型
		self.UI_TYPE = ko.observable("all");

		//计算控制点的位置
		self.x1 = ko.computed(function (){
			return self.UI_LEFT_TOP_X();
		});
		self.x2 = ko.computed(function (){
			return (self.UI_RIGHT_BOTTOM_X() - self.UI_LEFT_TOP_X()) / 2 + self.UI_LEFT_TOP_X();
		});
		self.x3 = ko.computed(function (){
			return self.UI_RIGHT_BOTTOM_X();
		});
		self.y1 = ko.computed(function (){
			return self.UI_LEFT_TOP_Y();
		});
		self.y2 = ko.computed(function(){
			return (self.UI_RIGHT_BOTTOM_Y() - self.UI_LEFT_TOP_Y()) / 2 + self.UI_LEFT_TOP_Y();
		});
		self.y3 = ko.computed(function(){
			return self.UI_RIGHT_BOTTOM_Y();
		});
		//设置控制点位置
		self.setCPPosition = ko.computed(function (){

			self.e.x = self.x3();
			self.e.y = self.y2();

			self.s.x = self.x2();
			self.s.y = self.y3();

			self.w.x = self.x1();
			self.w.y = self.y2();

			self.n.x = self.x2();
			self.n.y = self.y1();

			self.nw.x = self.x1();
			self.nw.y = self.y1();

			self.ne.x = self.x3();
			self.ne.y = self.y1();

			self.sw.x = self.x1();
			self.sw.y = self.y3();

			self.se.x = self.x3();
			self.se.y = self.y3();
		});

		self.$body = $("body"); 
		self.$document = $(document);

		self.init = function (){
			self.addAutoCursor();
			$(self.stage.cvs).on("mousedown",self.removeAutoCursor);
			self.$document.on("mouseup",self.addAutoCursor);
			//$(self.stage.cvs).on("mousedown",self.onmousedown);
		};
		self.resizeCanvas = function (w,h){
			self.cvs.width = w;
			self.cvs.style = w + "px";
			self.cvs.height = h;
			self.cvs.style = h + "px";
		};
		self.redraw = function (){

			self.ctx.beginPath();
			//self.ctx.rect(self.UI_LEFT_TOP_X(),self.UI_LEFT_TOP_Y(),self.UI_RIGHT_BOTTOM_X() - self.UI_LEFT_TOP_X(),self.UI_RIGHT_BOTTOM_Y() - self.UI_LEFT_TOP_Y());
			self.ctx.lineWidth = 1;
			self.ctx.strokeStyle = self.CONTROL_RECT_LINECOLOR;
			self.ctx.save();
			self.ctx.translate(0.5,0.5);
			//参考线
			self.ctx.moveTo(0,self.target.offsetY());
			self.ctx.lineTo(self.stage.canvasWidth(),self.target.offsetY());
			self.ctx.moveTo(self.target.offsetX(),0);
			self.ctx.lineTo(self.target.offsetX(),self.stage.canvasHeight());
			self.ctx.rect(self.UI_LEFT_TOP_X(),self.UI_LEFT_TOP_Y(),self.UI_RIGHT_BOTTOM_X() - self.UI_LEFT_TOP_X(),self.UI_RIGHT_BOTTOM_Y() - self.UI_LEFT_TOP_Y());
			self.ctx.stroke();
			self.ctx.restore();
			//控制点
			if(self.UI_TYPE() == "all"){
				self.e.print();
				self.s.print();
				self.w.print();
				self.n.print();

				self.nw.print();
				self.ne.print();
				self.sw.print();
				self.se.print();
			}else if(self.UI_TYPE() == "horizontal"){
				self.e.print();
				self.w.print();
			}else if(self.UI_TYPE() == "vertical"){
				self.s.print();
				self.n.print();
			}
			return self.cvs;
		};
		self.isInPoint = function (x,y){
			x = x || self.stage.mouseX() || 0;
			y = y || self.stage.mouseY() || 0;
			self.ctx.beginPath();
			self.ctx.rect(self.UI_LEFT_TOP_X(),self.UI_LEFT_TOP_Y(),self.UI_RIGHT_BOTTOM_X() - self.UI_LEFT_TOP_X(),self.UI_RIGHT_BOTTOM_Y() - self.UI_LEFT_TOP_Y());
			return self.ctx.isPointInPath(x,y);
		};
		self.update = function (w,h,obj){
			self.target = obj;
			var info = obj.UI_INFO();
			self.UI_LEFT_TOP_X(info.UI_LEFT_TOP_X);
			self.UI_LEFT_TOP_Y(info.UI_LEFT_TOP_Y);
			self.UI_RIGHT_BOTTOM_X(info.UI_RIGHT_BOTTOM_X);
			self.UI_RIGHT_BOTTOM_Y(info.UI_RIGHT_BOTTOM_Y);
			self.UI_TYPE(info.UI_TYPE || "all");
		};
		self.hide = function (){
			self.UI_LEFT_TOP_X(-1);
			self.UI_LEFT_TOP_Y(-1);
			self.UI_RIGHT_BOTTOM_X(-1);
			self.UI_RIGHT_BOTTOM_Y(-1);

		};
		self.autoCursor = function (){
			if(self.UI_TYPE() == "all"){
				if(self.e.isInPoint()){
					self.$body.css("cursor","e-resize");
					return true;
				}
				if(self.s.isInPoint()){
					self.$body.css("cursor","s-resize");
					return true;
				}
				if(self.w.isInPoint()){
					self.$body.css("cursor","w-resize");
					return true;
				}
				if(self.n.isInPoint()){
					self.$body.css("cursor","n-resize");
					return true;
				}
				if(self.nw.isInPoint()){
					self.$body.css("cursor","nw-resize");
					return true;
				}
				if(self.ne.isInPoint()){
					self.$body.css("cursor","ne-resize");
					return true;
				}
				if(self.sw.isInPoint()){
					self.$body.css("cursor","sw-resize");
					return true;
				}
				if(self.se.isInPoint()){
					self.$body.css("cursor","se-resize");
					return true;
				}
			}else if(self.UI_TYPE() == "horizontal"){
				if(self.e.isInPoint()){
					self.$body.css("cursor","e-resize");
					return true;
				}
				if(self.w.isInPoint()){
					self.$body.css("cursor","w-resize");
					return true;
				}
			}else if(self.UI_TYPE() == "vertical"){
				if(self.s.isInPoint()){
					self.$body.css("cursor","s-resize");
					return true;
				}
				if(self.n.isInPoint()){
					self.$body.css("cursor","n-resize");
					return true;
				}
			}
			// if(self.isInPoint()){
			// 	self.$body.css("cursor","move");
			// }
			self.$body.css("cursor","default");
		};
		self.removeAutoCursor = function (){
			$(self.stage.cvs).off("mousemove",self.autoCursor);
		};
		self.addAutoCursor = function (){
			$(self.stage.cvs).off("mousemove",self.autoCursor);
			$(self.stage.cvs).on("mousemove",self.autoCursor);
		};
		self.onmousedown = function (){
			if(self.UI_TYPE() == "all"){
				if(self.e.isInPoint()){
					// console.log("e");
					self.test_line = self.x1();
					// self.target.removeAutoUpdateEvent();
					self.$document.on("mousemove",self.on_drag_e);
					self.$document.one("mouseup",self.on_end_drag_e);
					self.$body.css("cursor","e-resize");
					return true;
				}
				if(self.s.isInPoint()){
					// console.log("s");
					self.test_line = self.y1();
					// self.target.removeAutoUpdateEvent();
					self.$document.on("mousemove",self.on_drag_s);
					self.$document.one("mouseup",self.on_end_drag_s);
					self.$body.css("cursor","s-resize");
					return true;
				}
				if(self.w.isInPoint()){
					// console.log("w");
					self.test_line = self.x3();
					// self.target.removeAutoUpdateEvent();
					self.$document.on("mousemove",self.on_drag_w);
					self.$document.one("mouseup",self.on_end_drag_w);
					self.$body.css("cursor","w-resize");
					return true;
				}
				if(self.n.isInPoint()){
					// console.log("n");
					self.test_line = self.y3();
					// self.target.removeAutoUpdateEvent();
					self.$document.on("mousemove",self.on_drag_n);
					self.$document.one("mouseup",self.on_end_drag_n);
					self.$body.css("cursor","n-resize");
					return true;
				}
				if(self.nw.isInPoint()){
					// console.log("nw");
					self.test_x = self.x3();
					self.test_y = self.y3();
					self.$document.on("mousemove",self.on_drag_nw);
					self.$document.one("mouseup",self.on_end_drag_nw);
					self.$body.css("cursor","nw-resize");
					return true;
				}
				if(self.ne.isInPoint()){
					// console.log("ne");
					self.test_x = self.x1();
					self.test_y = self.y3();
					self.$document.on("mousemove",self.on_drag_ne);
					self.$document.one("mouseup",self.on_end_drag_ne);
					self.$body.css("cursor","ne-resize");
					return true;
				}
				if(self.sw.isInPoint()){
					// console.log("sw");
					self.test_x = self.x3();
					self.test_y = self.y1();
					self.$document.on("mousemove",self.on_drag_sw);
					self.$document.one("mouseup",self.on_end_drag_sw);
					self.$body.css("cursor","sw-resize");
					return true;
				}
				if(self.se.isInPoint()){
					// console.log("se");
					self.test_x = self.x1();
					self.test_y = self.y1();
					self.$document.on("mousemove",self.on_drag_se);
					self.$document.one("mouseup",self.on_end_drag_se);
					self.$body.css("cursor","se-resize");
					return true;
				}
			}else if(self.UI_TYPE() == "horizontal"){
				if(self.e.isInPoint()){
					// console.log("e");
					self.test_line = self.x1();
					// self.target.removeAutoUpdateEvent();
					self.$document.on("mousemove",self.on_drag_e);
					self.$document.one("mouseup",self.on_end_drag_e);
					self.$body.css("cursor","e-resize");
					return true;
				}
				if(self.w.isInPoint()){
					// console.log("w");
					self.test_line = self.x3();
					// self.target.removeAutoUpdateEvent();
					self.$document.on("mousemove",self.on_drag_w);
					self.$document.one("mouseup",self.on_end_drag_w);
					self.$body.css("cursor","w-resize");
					return true;
				}
			}else if(self.UI_TYPE() == "vertical") {
				if(self.s.isInPoint()){
					// console.log("s");
					self.test_line = self.y1();
					// self.target.removeAutoUpdateEvent();
					self.$document.on("mousemove",self.on_drag_s);
					self.$document.one("mouseup",self.on_end_drag_s);
					self.$body.css("cursor","s-resize");
					return true;
				}
				if(self.n.isInPoint()){
					// console.log("n");
					self.test_line = self.y3();
					// self.target.removeAutoUpdateEvent();
					self.$document.on("mousemove",self.on_drag_n);
					self.$document.one("mouseup",self.on_end_drag_n);
					self.$body.css("cursor","n-resize");
					return true;
				}
			}
			if(self.isInPoint()){
				// console.log("on ui rect");
				self.offset_top_left_x = self.stage.mouseX() - self.UI_LEFT_TOP_X();
				self.offset_top_left_y = self.stage.mouseY() - self.UI_LEFT_TOP_Y();
				self.offset_bottom_right_x = self.stage.mouseX() - self.UI_RIGHT_BOTTOM_X();
				self.offset_bottom_right_y = self.stage.mouseY() - self.UI_RIGHT_BOTTOM_Y();
				// self.target.removeAutoUpdateEvent();
				self.$document.on("mousemove",self.on_drag);
				self.$document.one("mouseup",self.on_end_drag);

				self.$body.css("cursor","move");
				return true;
			}
		};
		self.on_end_drag = function (){
			self.$document.off("mousemove",self.on_drag);
			self.$body.css("cursor","default");
			// self.target.addAutoUpdateEvent();
			//self.target.offsetX(500);
			// self.stage.updateCanvas();
		};
		self.on_drag = function (){
			//直接设置offset
			self.target.offsetX(self.stage.mouseX() - self.offset_top_left_x);
			self.target.offsetY(self.stage.mouseY() - self.offset_top_left_y);
			//标准方式
			// var info = {
			// 	UI_LEFT_TOP_X : self.stage.mouseX() - self.offset_top_left_x,
			// 	UI_LEFT_TOP_Y : self.stage.mouseY() - self.offset_top_left_y,
			// 	UI_RIGHT_BOTTOM_X : self.stage.mouseX() - self.offset_bottom_right_x,
			// 	UI_RIGHT_BOTTOM_Y : self.stage.mouseY() - self.offset_bottom_right_y
			// };
			// //console.log(info);
			// self.target.UI_INFO(info);
			self.stage.updateCanvas();//TODO 此处不必重绘画布，待优化

		};
		self.on_drag_e = function (){
			var info = {
				UI_LEFT_TOP_X : Math.min(self.test_line,self.stage.mouseX()),
				UI_LEFT_TOP_Y : self.y1(),
				UI_RIGHT_BOTTOM_X : Math.max(self.test_line,self.stage.mouseX()),
				UI_RIGHT_BOTTOM_Y : self.y3()
			};
			self.target.UI_INFO(info);
			self.target.updateCanvas();
		};
		self.on_end_drag_e = function (){
			self.$document.off("mousemove",self.on_drag_e);
			self.$body.css("cursor","default");
			// self.target.addAutoUpdateEvent();
		};
		//
		self.on_drag_s = function (){
			var info = {
				UI_LEFT_TOP_X : self.x1(),
				UI_LEFT_TOP_Y : Math.min(self.test_line,self.stage.mouseY()),
				UI_RIGHT_BOTTOM_X : self.x3(),
				UI_RIGHT_BOTTOM_Y : Math.max(self.test_line,self.stage.mouseY())
			};
			self.target.UI_INFO(info);
			self.target.updateCanvas();
		};
		self.on_end_drag_s = function (){
			self.$document.off("mousemove",self.on_drag_s);
			self.$body.css("cursor","default");
			// self.target.addAutoUpdateEvent();
		};
		//
		self.on_drag_w = function (){
			var info = {
				UI_LEFT_TOP_X : Math.min(self.test_line,self.stage.mouseX()),
				UI_LEFT_TOP_Y : self.y1(),
				UI_RIGHT_BOTTOM_X : Math.max(self.test_line,self.stage.mouseX()),
				UI_RIGHT_BOTTOM_Y : self.y3()
			};
			self.target.UI_INFO(info);
			self.target.updateCanvas();
		};
		self.on_end_drag_w = function (){
			self.$document.off("mousemove",self.on_drag_w);
			self.$body.css("cursor","default");
			// self.target.addAutoUpdateEvent();
		};
		//
		self.on_drag_n = function (){
			var info = {
				UI_LEFT_TOP_X : self.x1(),
				UI_LEFT_TOP_Y : Math.min(self.test_line,self.stage.mouseY()),
				UI_RIGHT_BOTTOM_X : self.x3(),
				UI_RIGHT_BOTTOM_Y : Math.max(self.test_line,self.stage.mouseY())
			};
			self.target.UI_INFO(info);
			self.target.updateCanvas();
		};
		self.on_end_drag_n = function (){
			self.$document.off("mousemove",self.on_drag_n);
			self.$body.css("cursor","default");
			// self.target.addAutoUpdateEvent();
		};
		//左上
		self.on_drag_nw = function (){
			var info = {
				UI_LEFT_TOP_X : Math.min(self.test_x,self.stage.mouseX()),
				UI_LEFT_TOP_Y : Math.min(self.test_y,self.stage.mouseY()),
				UI_RIGHT_BOTTOM_X : Math.max(self.test_x,self.stage.mouseX()),
				UI_RIGHT_BOTTOM_Y : Math.max(self.test_y,self.stage.mouseY())
			};
			self.target.UI_INFO(info);
			self.target.updateCanvas();
		};
		self.on_end_drag_nw = function (){
			self.$document.off("mousemove",self.on_drag_nw);
			self.$body.css("cursor","default");
		};
		//
		self.on_drag_ne = function (){
			var info = {
				UI_LEFT_TOP_X : Math.min(self.test_x,self.stage.mouseX()),
				UI_LEFT_TOP_Y : Math.min(self.test_y,self.stage.mouseY()),
				UI_RIGHT_BOTTOM_X : Math.max(self.test_x,self.stage.mouseX()),
				UI_RIGHT_BOTTOM_Y : Math.max(self.test_y,self.stage.mouseY())
			};
			self.target.UI_INFO(info);
			self.target.updateCanvas();
		};
		self.on_end_drag_ne = function (){
			self.$document.off("mousemove",self.on_drag_ne);
			self.$body.css("cursor","default");
		};
		//
		self.on_drag_sw = function (){
			var info = {
				UI_LEFT_TOP_X : Math.min(self.test_x,self.stage.mouseX()),
				UI_LEFT_TOP_Y : Math.min(self.test_y,self.stage.mouseY()),
				UI_RIGHT_BOTTOM_X : Math.max(self.test_x,self.stage.mouseX()),
				UI_RIGHT_BOTTOM_Y : Math.max(self.test_y,self.stage.mouseY())
			};
			self.target.UI_INFO(info);
			self.target.updateCanvas();
		};
		self.on_end_drag_sw = function (){
			self.$document.off("mousemove",self.on_drag_sw);
			self.$body.css("cursor","default");
		};
		//
		self.on_drag_se = function (){
			var info = {
				UI_LEFT_TOP_X : Math.min(self.test_x,self.stage.mouseX()),
				UI_LEFT_TOP_Y : Math.min(self.test_y,self.stage.mouseY()),
				UI_RIGHT_BOTTOM_X : Math.max(self.test_x,self.stage.mouseX()),
				UI_RIGHT_BOTTOM_Y : Math.max(self.test_y,self.stage.mouseY())
			};
			self.target.UI_INFO(info);
			self.target.updateCanvas();
		};
		self.on_end_drag_se = function (){
			self.$document.off("mousemove",self.on_drag_se);
			self.$body.css("cursor","default");
		};
		self.init();
	};

	return ui;
});