define(['jquery','vue'],function($,vue){

	var Image = function(){
		this.vm = null;
		this.init();
		// this.initVm();
	};

	Image.prototype = {
		init: function(){
			var self = this;
			$(document).on('contextmenu','#image li',function(e){
				e.preventDefault();
				$('#image').children('.rightmenu.menu').show().position({
						my: "left top",
						of: e
					});
			});

			$(document).on('click','#imageAttr',function () {
				$('#tupianshuxing').dialog('open');
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

	return new Image;
});