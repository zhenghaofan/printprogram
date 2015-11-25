define([
	'knockout',
	'mapping',
	'app/Transform',
	'app/Util',
	'object/text',
	'object/code',
	'object/image',
	'object/line',
	'object/rect'
],function (ko,map,transform,util,text,code,image,line,rect){
	var idCounter = 0;
	var doc = function (parent,data){
		var self            = this;
		// self.matrix = new transform;

		self.parent         = parent;
		self.cvs            = parent.cvs;
		self.ctx            = parent.ctx;
		
		self.id             = idCounter++;
		self.name           = ko.observable('document ' + (self.id+1));
		self.width          = ko.observable(1200);
		self.height         = ko.observable(800);
		self.angle          = ko.observable(0);
		self.ratio          = ko.observable(1);
		self.zIndexCounter  = ko.observable(0);
		self.backgroudcolor = ko.observable("#ffffff");
		self.textCounter    = 0;
		self.codeCounter    = 0;
		self.imageCounter   = 0;
		self.lineCounter    = 0;
		self.rectCounter    = 0;
		self.text           = ko.observableArray();
		self.code           = ko.observableArray();
		self.image          = ko.observableArray();
		self.line           = ko.observableArray();
		self.rect           = ko.observableArray();
		self.curText           = ko.observable();
		self.curCode           = ko.observable();
		self.curImage          = ko.observable();
		self.curLine           = ko.observable();
		self.curRect           = ko.observable();

		self.objects = ko.computed(function (){
			return self.text().concat(self.code(),self.image(),self.line(),self.rect())
		});

		//zindex 值大的在数组左边
		self.sortByIndex   = ko.computed(function (){
			return self.objects().sort(function (left,right){
				return left.zIndex() == right.zIndex() ? 0 : (left.zIndex() > right.zIndex() ? -1 : 1);
			});
		});
		self.selectedObjects = ko.computed(function (){
			return self.objects().filter(function (obj){
				return obj.selected() == true;
			});
		});
		self.objectsInPoint = [];
		self.focusObject = ko.observable();
		//记录文档滚动位置，在显示文档时恢复
		self.scrollLeft = 0;
		self.scrollRight = 0;
		//counter
		
		// self.computMatrix = ko.computed(function (){
		// 	self.matrix.scale(self.ratio(),self.ratio());
		// 	self.matrix.rotate(self.angle());
		// });

		self.init = function (){
			self.loadData(data);
			//self.resizeCanvas(self.canvasWidth(),self.canvasHeight());
		};
		self.loadData = function (d){
			d = d || {};
			var mapRule = {
				include: ["id","name","width","height","angle","ratio","zIndexCounter","backgroudcolor","textCounter","codeCounter","imageCounter","lineCounter","rectCounter","text","code","image","line","rect"],
				text: {
					key: function (data){
						return ko.utils.unwrapObservable(data.id);
					},
					create: function (options){
						var i = options.data.zIndex;
						if(i) self.zIndexCounter(Math.max(i,self.zIndexCounter()));
						return new text(self,options.data);
					}
				},
				code: {
					key: function (data){
						return ko.utils.unwrapObservable(data.id);
					},
					create: function (options){
						var i = options.data.zIndex;
						if(i) self.zIndexCounter(Math.max(i,self.zIndexCounter()));
						return new code(self,options.data);
					}
				},
				image: {
					key: function (data){
						return ko.utils.unwrapObservable(data.id);
					},
					create: function (options){
						var i = options.data.zIndex;
						if(i) self.zIndexCounter(Math.max(i,self.zIndexCounter()));
						return new image(self,options.data);
					}
				},
				line: {
					key: function (data){
						return ko.utils.unwrapObservable(data.id);
					},
					create: function (options){
						var i = options.data.zIndex;
						if(i) self.zIndexCounter(Math.max(i,self.zIndexCounter()));
						return new line(self,options.data);
					}
				},
				rect: {
					key: function (data){
						return ko.utils.unwrapObservable(data.id);
					},
					create: function (options){
						var i = options.data.zIndex;
						if(i) self.zIndexCounter(Math.max(i,self.zIndexCounter()));
						return new rect(self,options.data);
					}
				},
			};
			if (d) {
				map.fromJS(d,mapRule,self);
			};
		};
		self.getData = function (){
			return map.toJS(self);
		};
		self.updateCanvas = function (){
			//self.redraw();
			//self.draw();

			if (self.parent) {
				self.parent.updateCanvas();
			};
		};
		self.removeObject = function (obj){
			self.objects.remove(obj);
		};
		self.redraw = function (){
			var objects = self.sortByIndex();
			// self.resizeCanvas(self.canvasWidth(),self.canvasHeight());
			//self.ctx.clearRect(0,0,self.canvasWidth(),self.canvasHeight());
			//self.ctx.scale(0.5,0.5);
			//self.ctx.rotate(20);
			self.ctx.fillStyle = self.backgroudcolor();
			self.ctx.lineWidth = 1;
			self.ctx.strokeStyle = "#144DD4";
			self.ctx.shadowColor = "#080F35";
			self.ctx.fillRect(0,0,self.width(),self.height());
			 // console.log(objects);
			for(var i = objects.length - 1; i >= 0 ; i--){
				var obj = objects[i];
				//var c = obj.cache();
				// console.log(c.toDataURL("image/png"));
				//self.ctx.putImageData(c,0,0);
				self.ctx.save();
				if(obj.selected()){
					//var info = obj.UI_INFO();
					//self.ctx.save();
					//self.ctx.beginPath();
					//self.ctx.shadowColor = "#0E2067";
					self.ctx.shadowBlur = 10;
					self.ctx.shadowOffsetX = 1;
					self.ctx.shadowOffsetY = 1;
					//self.ctx.rect(info.UI_LEFT_TOP_X,info.UI_LEFT_TOP_Y,info.UI_RIGHT_BOTTOM_X - info.UI_LEFT_TOP_X,info.UI_RIGHT_BOTTOM_Y - info.UI_LEFT_TOP_Y);
					//self.ctx.stroke();
					//self.ctx.restore();
				}
				self.ctx.drawImage(obj.cvs,obj.offsetX(),obj.offsetY());
				self.ctx.restore();
			}
		};
		self.addText = function (d){
			d = d || {};
			var node = new text(self,d);
			node.id = self.textCounter++;
			node.name("文本 " + (node.id + 1));
			node.zIndex(self.zIndexCounter());
			self.zIndexCounter(self.zIndexCounter() + 1);
			self.text.push(node);
			//self.updateCanvas();
			return node;
		};
		self.addCode = function (d){
			d = d || {};
			var node = new code(self,d);
			node.id = self.codeCounter++;
			node.name("条码 " + (node.id + 1));
			node.zIndex(self.zIndexCounter());
			self.zIndexCounter(self.zIndexCounter() + 1);
			self.code.push(node);
			return node;
		};
		self.addImage = function (d){
			d = d || {};
			var node = new image(self,d);
			node.id = self.imageCounter++;
			node.name("图片 " + (node.id + 1));
			node.zIndex(self.zIndexCounter());
			self.zIndexCounter(self.zIndexCounter() + 1);
			self.image.push(node);
			return node;
		};
		self.addLine = function (d){
			d = d || {};
			var node = new line(self,d);
			node.id = self.lineCounter++;
			node.name("直线 " + (node.id + 1));
			node.zIndex(self.zIndexCounter());
			self.zIndexCounter(self.zIndexCounter() + 1);
			self.line.push(node);
			return node;
		};
		self.addRect = function (d){
			d = d || {};
			var node = new rect(self,d);
			node.id = self.rectCounter++;
			node.name("矩形 " + (node.id + 1));
			node.zIndex(self.zIndexCounter());
			self.zIndexCounter(self.zIndexCounter() + 1);
			self.rect.push(node);
			return node;
		};

		self.resizeCanvas = function (x,y){
			self.cvs.width = x;
			self.cvs.height = y;
			self.cvs.style.width = x + "px";
			self.cvs.style.height = x + "px";
		};
		self.getCanvas = function (){
			return self.cvs;
		};
		self.getObjectsInPoint = function (x,y){
			x = x || self.parent.mouseX() || 0;
			y = y || self.parent.mouseY() || 0;
			var objects = self.sortByIndex();
			var arr = [];
			for(var i = 0 ; i < objects.length ; i++){
				if(objects[i].isInPoint(x,y)){
					arr.push(objects[i]);
				};
			}
			self.objectsInPoint = arr;

			
		};
		self.clearSelectedObjects = function (){
			var objects = self.selectedObjects();
			for(var i = 0 ; i < objects.length ; i ++ ){
				var obj = objects[i];
				obj.selected(false);
			}
		};
		self.selectObject = function (f){
			self.getObjectsInPoint();
			var obj = self.objectsInPoint[0];
			self.focusObject(obj);


			if(f && obj){
				obj.selected(true);
				self.parent.updateCanvas();
				return;
			}else if(obj) {
				self.clearSelectedObjects();
				obj.selected(true);
				self.parent.updateCanvas();
				return;
			}
			self.clearSelectedObjects();
			self.parent.updateCanvas();
		};
		self.selectall = function (){
			var objects = self.objects();
			for(var i = 0 ; i < objects.length ; i++ ){
				var obj = objects[i];
				obj.selected(true);
			}
			self.parent.updateCanvas();
		};
		self.init();
	};
	return doc;
});