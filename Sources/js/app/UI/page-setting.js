define(['jquery'], function($){
	$(document).on('click','.page-setting,.icon-file-text',function(){
		$('#page-setting-dialog').dialog("open");
	});
	$(document).on('click','.form-setting',function(){
		$('#form-setting-dialog').dialog("open");
	});
	$(document).on('click','.icon-table2',function(){
		$('#form-dialog').dialog("open");
	});
})