define(['jquery','vue'],function($,vue){
	// 表单长宽
	var formSet = function(){
		this.ls = this.fw = this.fh = this.vm = null;
		this.initLocalStorage();
		this.initVm();	
		vm.init();	
		// this.clearLs();
	};

	formSet.prototype = {
		initLocalStorage: function(){
			if(window.localStorage){
				this.ls = window.localStorage;
				this.fw = this.ls.getItem('formWidth');
				this.fh = this.ls.getItem('formHeight');
			}else{
				console.log('your browser does not support localstorage');
			}
		},

		initVm: function(){
			var self = this;
			vm = new vue({
				el: '#dialogs',
				data:{
					title:'表单',
					formWidth: (self.fw ? self.fw : 300),
					formHeight: (self.fh ? self.fh : 185)
				},
				  methods: {
				  	init: function(){
						$('#form-dialog').dialog({
							title: this.title, 
							height: this.formHeight,
							width: this.formWidth,
							autoOpen: false
							 });
				  	},
				    save: function(){
				    	this.init();
						self.ls.setItem('formWidth',this.formWidth);
						self.ls.setItem('formHeight',this.formHeight);
						
				    	$('#form-setting-dialog').dialog('close');
				    }
				  }
			
			});
		},
		clearLs: function(){
			this.ls.removeItem('formWidth');
			this.ls.removeItem('formHeight');
		}
	};

	return new formSet();
	// vue.nextTick(function(){
		// formSet.$watch('title',function(){

		// 		// $('#form-dialog').css('width',this.$data.formWidth);
		// });
	// });
});