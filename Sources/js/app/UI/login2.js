define(['jquery','knockout','app/Util'],function ($,ko,util){
	var login = function (){
		var self = this;
		self.username = ko.observable();
		self.password = ko.observable();
		self.islogin = false;
		self.check = function (){
			if(true){
				self.islogin = true;
				util.Event.dispatch("setLocation",self,"#disign");
			}
		};

	};
	return new login;
});