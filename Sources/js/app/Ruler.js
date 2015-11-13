define(['jquery','knockout','app/Util'],function ($,ko,util){
	var ruler = function (){
			this.h              = document.getElementById("h-ruler-canvas");
			this.hctx           = this.h.getContext("2d");
			this.v              = document.getElementById("v-ruler-canvas");
			this.vctx           = this.v.getContext("2d");
			this.c              = $("#cvs-container")
			this.minH           = ko.observable(0);
			this.minV           = ko.observable(0);
			this.docW           = ko.observable(0);
			this.docH           = ko.observable(0);
			this.offsetX        = ko.observable(0);
			this.offsetY        = ko.observable(0);
			this.ratio          = ko.observable(1);
			
			this.hWidth         = ko.computed(function (){
				var w               = Math.max(this.docW(),this.minH()) + 100;
				this.h.width        = w;
				this.h.style.width  = w + "px";
				this.h.height       = this.rulerWidth;
				this.h.style.height = this.rulerWidth + "px";
				return w;
			},this);
			this.vHeight        = ko.computed(function (){
				var h               = Math.max(this.docH(),this.minV()) + 100;
				this.v.height       = h;
				this.v.style.height = h + "px";
				this.v.width        = this.rulerWidth;
				this.v.style.width  = this.rulerWidth + "px";
				
				return h;
			},this);
			this.rulerWidth     = 28;
			
			this.mm1            = 5;
			this.mm5            = 10;
			this.mm10           = 20;

			this.resizeTimeout = null;

		this.init();
	};
	ruler.prototype = {
		init : function (){
			var self = this;
			var timeoutFuc = function (){
					self.update();
			};
			$(function (){
				setTimeout(timeoutFuc,500);//fix bug
			});
			$("#cvs-container").on("scroll",function (){
				self.setOffset();
			});
			$(window).on("resize",function (){
				clearTimeout(this.resizeTimeout);
				this.resizeTimeout = setTimeout(timeoutFuc,500);
			});

		},
		draw : function (){
			var i = 0,
				x = 0,
				y = 0,
				mm = util.getDPI()[0]/25.4;//


			this.hctx.clearRect(0,0,this.hWidth(),this.rulerWidth);
			this.hctx.beginPath();
			this.hctx.lineWidth = 1;
			this.hctx.strokeStyle = "#000000";
			this.hctx.font = "10px";
			this.hctx.moveTo(0,this.rulerWidth);
			this.hctx.lineTo(this.hWidth(),this.rulerWidth);
			for(;x <= this.hWidth();x = x+mm*this.ratio(),i++){
				this.hctx.moveTo(x,this.rulerWidth);
				this.hctx.lineTo(x,this.rulerWidth-this.getMMHeight(i));
				if(i % 10 === 0){
					this.hctx.fillText(i+"",x + 2,16);
				}
			}
			this.hctx.stroke();

			this.vctx.clearRect(0,0,this.rulerWidth,this.vHeight());
			this.vctx.beginPath();
			this.vctx.lineWidth = 1;
			this.vctx.strokeStyle = "#000000";
			this.vctx.font = "5px";
			this.vctx.moveTo(this.rulerWidth,0);
			this.vctx.lineTo(this.rulerWidth,this.vHeight());
			i = 0;
			for(;y <= this.vHeight();y = y+mm*this.ratio(),i++){
				this.vctx.moveTo(this.rulerWidth,y);
				this.vctx.lineTo(this.rulerWidth-this.getMMHeight(i),y);
				if(i % 10 === 0){
					this.vctx.fillText(i+"",5,y + 10);
				}
			}
			this.vctx.stroke();


		},
		setRatio : function (r){
			this.ratio(r);
		},
		setDocSize : function (w,h){
			this.docW(w);
			this.docH(h);
		},
		setMinSize : function (h,v){
			var h = h || $("#h-ruler").width();
			var v = v || $("#v-ruler").height();
			this.minH(h);
			this.minV(v);
		},
		setOffset : function (){
			this.offsetX(this.c.scrollLeft());
			this.offsetY(this.c.scrollTop());
			this.h.style.left = "-" + this.offsetX() + "px";
			this.v.style.top = "-" + this.offsetY() + "px";
		},
		update : function (w,h,r){
			var w = w || this.docW();
			var h = h || this.docH();
			var r = r || this.ratio();
			this.setDocSize(w,h);
			this.setMinSize();
			this.setOffset();
			this.setRatio(r);
			this.draw();
		},
		getMMHeight : function (x){
			if(x%10 === 0)return this.mm10;
			if(x%5 === 0)return this.mm5;
			return this.mm1;
		}
	};
	return new ruler;
});