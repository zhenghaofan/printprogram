define(['jquery','vue'],function($,vue){

	var Rect = function(){
		this.vm = null;
		this.init();
		// this.initVm();
	};

	Rect.prototype = {
		init: function(){
			var self = this;
			$(document).on('contextmenu','#rect li',function(e){
				e.preventDefault();
				$('#rect').children('.rightmenu.menu').show().position({
						my: "left top",
						of: e
					});
			});

			$(document).on('click','#rectAttr',function () {
				$('#juxingshuxing').dialog('open');
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

	return new Rect;
});