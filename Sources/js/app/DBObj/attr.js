define(['knockout'],function (ko){

	var attr = function (){

		this.name = ko.observable() ;
	};

	return attr;
});