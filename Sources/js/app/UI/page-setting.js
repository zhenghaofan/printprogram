define(['jquery'], function($){
	$(document).on('click','.page-setting,.icon-file-text',function(){
		$('#page-setting-dialog').dialog("open");
	});

})