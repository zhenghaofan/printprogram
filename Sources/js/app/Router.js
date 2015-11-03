define(['sammy','knockout','app/Util','app/UI/login2','app/UI/login1'],function (sammy,ko,util,login2,login1){
	var router = function (){
		this.router = null;
		this.login1 = login1;
		this.login2 = login2;
		this.state = ko.observable("edit");
		this.init();
	};
	router.prototype = {
		init: function (){
			this.setRouter();
			util.Event.addEventListener("setLocation",this.setLocation,this);
		},
		setRouter: function (){
			var self = this;
			self.router = sammy(function (){
				this.get("#login1",function (){
					if (self.login1.islogin) {
						self.router.setLocation('#prodution');
					}else {
						self.state("login1");
					}
				});
				this.get("#login2",function (){
					if (self.login2.islogin) {
						self.router.setLocation('#disign');
					}else {
						self.state("login2");
					}
				});
				this.get('#new',function (){
					
					self.state('new');
				}); 
				this.get('#disign',function (){
					if(!self.login2.islogin){
						self.router.setLocation('#login2');
					}else {
						self.state('disign');
					}
				});
				this.get('#prodution',function (){
					if(!self.login1.islogin){
						self.router.setLocation('#login1');
					}else {
						self.state('prodution');
					}
				});
				this.get('#*',function (){
					self.router.setLocation('#login2');
				});
			});
			self.router.run();
		},
		setLocation: function (e,url){
			console.log(url);
			this.router.setLocation(url);
		},
		checkLogin: function (){
			
		}

	};
	return new router;
});