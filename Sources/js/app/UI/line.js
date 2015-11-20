define(['jquery','vue'],function($,vue){

	var Line = function(){
		this.vm = null;
		this.init();
		// this.initVm();
	};

	Line.prototype = {
		init: function(){
			var self = this;
			$(document).on('contextmenu','#line li',function(e){
				e.preventDefault();
				$('#line').children('.rightmenu.menu').show().position({
						my: "left top",
						of: e
					});
			});

			$(document).on('click','#lineAttr',function () {
				$('#zhixianshuxing').dialog('open');
			});	

			
		},

		initVm: function(){
			var self = this;
			this.vm = new vue({
				el:"#wenbenshuxing",
			});
			// this.vm.$watch(self.degree, function(){
			// 	this.vm.$data.degree = self.degree;
			// });
		}


	}

	return new Line;
});