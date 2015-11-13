define(['jquery','jqueryUI'],function ($,ui){
	var g = function (){
		var self = this;
		self.pane = $("#tiaomaxiangdao");
		self.next = function (){
			var len = self.pane.find(".ui-tabs-nav>.ui-state-default").length,
				cur = self.pane.find(".ui-tabs-active").index();
			cur == len - 1 ? self.pane.tabs("instance")._activate(0) : self.pane.tabs("instance")._activate(cur + 1);
		};
		self.last = function (){
			var len = self.pane.find(".ui-tabs-nav>.ui-state-default").length,
				cur = self.pane.find(".ui-tabs-active").index();
			cur == 0 ? self.pane.tabs("instance")._activate(len - 1) : self.pane.tabs("instance")._activate(cur - 1);
		};
		self.init();
	};
	g.prototype = {
		init: function (){
		},
		show: function (){
			this.pane.dialog("open");
		},
		hide: function (){
			this.pane.dialog("close");
		}
	};
	return new g;
});