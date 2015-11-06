define(['jquery','vue'],function($,vue){

	var Barcode = function(){
		this.vm = null;
		this.degree = 0;
		this.init();
		this.initVm();
	};

	Barcode.prototype = {
		init: function(){
			var self = this;
			$(document).on('contextmenu','#barcode li',function(e){
				e.preventDefault();
				$('#barcode').siblings('.rightmenu.menu').show().position({
						my: "left top",
						of: e
					});
			});

			$(document).on('click','#barAttr',function () {
				$('#tiaomashuxing').dialog('open');
			});	

			
		},

		initVm: function(){
			var self = this;
			this.vm = new vue({
				el:"#tiaomashuxing1",
				data:{
					barFormName: '新条码',
					barX: '200',
					barY: '200',
					barWidth: '300',
					barHeight: '400',
					print: true,
					lock: true,
				},
				methods: {
					barSubmit: function(e){
						// console.log(self.degree);
						e.preventDefault();						
						// console.log(this.$el);
						console.log(this.$data.print);
						console.log(this.$data.lock);
					}
				}
			});
			// this.vm.$watch(self.degree, function(){
			// 	this.vm.$data.degree = self.degree;
			// });
		}


	}

	return new Barcode;
});