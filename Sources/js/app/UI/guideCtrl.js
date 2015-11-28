define(['jquery','vue'],function($,vue){
	// 新建数据库向导
	new vue({
		el: '#guide-dialog',
		data:{
			disabled: true,
			firstStep: true,
			type: 1,
			selected: 1
		},
		  methods: {
		    toggle: function () {
		      this.firstStep = !this.firstStep;
		      this.disabled = !this.disabled;
		    },
		    step: function(type, e){
		    	this.type = type;
		    	// this.toggle();
		    	this.selected = type;
		    },
		    close: function(){
		    	$(this.$el).dialog('close');
		    }
		  }
		
	});
});