 define([
 	'jquery',
 	'knockout',
 	'mapping',
 	'app/Ruler',
 	'app/Doc',
 	'app/UIController',
 	'app/Util'
],function ($,ko,map,ruler,doc,ui,util){
 	
 	var Stage = function (){
		var self          = this;
		self.cvs          = document.getElementById("cvs");
		self.ctx          = self.cvs.getContext("2d");
		//属性
		self.docCounter   = 0;
		//鼠标相对canvas坐标 
		self.mouseX       = ko.observable(0);
		self.mouseY       = ko.observable(0);
		
		self.canvasWidth  = ko.observable(0);
		self.canvasHeight = ko.observable(0);
		
		self.curDocIndex  = ko.observable(0);
		self.docs         = ko.observableArray();
		self.curDoc       = ko.computed(function (){
			return self.docs()[self.curDocIndex()];
		},self);
		
		self.ruler        = ruler;
		self.ui           = new ui(self);

  
	    //方法
	    self.init = function (){
	    	self.resizeCanvas(self.canvasWidth(),self.canvasHeight());
	    	self.cvs.addEventListener("mousemove",self.updateMouseXY);

	    };
	    self.loadData = function (data){
			var mapRule = {
				include: ["docCounter","docs"],
				docs: {
					key: function (data){
						return ko.utils.unwrapObservable(data.id);
					},
					create: function (options){
						return new doc(self,options.data);
					}
				}
			};
			if (data) {
				map.fromJS(data,mapRule,self);
				self.selectLastDoc();
				self.updateCanvas();
			};
	    };
	    self.getData = function (){
	    	return map.toJS(self);
	    };
		self.setCurDoc = function (doc){
			self.curDocIndex(self.docs.indexOf(doc));
			util.Event.dispatch("changeDoc",self,self.curDoc());
			self.updateCanvas();
			self.updateRuler();
		};
		self.removeDoc = function (doc){
			self.docs.remove(doc);
			self.selectLastDoc();
		};
		self.selectLastDoc = function (){
			var l = self.docs().length - 1;
			l = l < 0 ? 0 : l;
			self.curDocIndex(l);
			util.Event.dispatch("changeDoc",self,self.curDoc());
			self.updateCanvas();
			self.updateRuler();
		};
		self.updateMouseXY = function (evt){
			var rect = self.cvs.getBoundingClientRect();
			self.mouseX(Math.round(evt.clientX - rect.left * (self.cvs.width / rect.width)));
			self.mouseY(Math.round(evt.clientY - rect.top * (self.cvs.height / rect.height)));
		};
		self.resizeCanvas = function (w,h){
			self.canvasWidth(w);
			self.canvasHeight(h);
			self.cvs.width = w;
			self.cvs.height = h;
			self.cvs.style.width = w + "px";
			self.cvs.style.height = h + "px";
		};
		self.addDoc = function (data){
			self.docs.push(new doc(self,data));
			self.selectLastDoc();
			return self;
		};
		self.updateCanvas = function (){
			self.redraw();
		};
		self.updateRuler = function (){
			var doc = self.curDoc();
			if(doc){
				self.ruler.update(doc.width(),doc.height(),doc.ratio());
			}else {
				self.ruler.update(0,0,1);
			}
		};
		self.redraw = function (){
			var doc = self.curDoc();
			if(doc){
				self.resizeCanvas(doc.width(),doc.height());
				doc.redraw();
				//self.ctx.drawImage(c,0,0);
				self.updateUI();

			}else {
				self.resizeCanvas(0,0);
			}
		};
		self.updateUI = function (){
			var doc = self.curDoc();
			if(doc && doc.focusObject()){
				self.ui.update(doc.width(),doc.height(),doc.focusObject());
				self.ui.redraw();
			}else {
				self.ui.hide();
			}
		};
		//TODO 记录doc的滚动位置
		self.set_doc_scroll_offset = function (left,right){

		};

		self.getDoc = function (){
			return self.curDoc();
		};
	    self.init();

	};
	return new Stage;
 });
