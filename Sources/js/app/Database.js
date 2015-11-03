define(['knockout','jquery','DBObj/date','DBObj/whenprinted','DBObj/tablelookup'],function (ko,$,date,whenprinted,tablelookup){
	var database = function (){
		var self = this;
		self.date = ko.observableArray();
		self.whenprinted = ko.observableArray();
		self.tablelookup = ko.observableArray();

		self.init = function (){
			self.addDate()
			self.addWhenprinted();
			self.addTablelookup();
		};
		self.addDate = function (){
			self.date.push(new date);
		};
		self.addWhenprinted = function (){
			self.whenprinted.push(new whenprinted);
		};
		self.addTablelookup = function (){
			self.tablelookup.push(new tablelookup);
		};
		self.showAdddate = function (){
			$("#riqi").dialog( "open" );
		};
		self.showAddwhenprinted = function (){
			$("#biaodanshuru").dialog("open");
		};
		self.showAddtablelookup = function (){
			$("#biaochazhao").dialog("open");
		};
		self.init();

	};
	return new database;
});