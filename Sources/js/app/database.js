define(['knockout','jquery','DBObj/date','DBObj/attr','DBObj/tablelookup'],function (ko,$,date,Attr,tablelookup){
	var database = function (){
		var self = this;
		self.date = ko.observableArray();
		self.whenprinted = ko.observableArray();
		self.tablelookup = ko.observableArray();
		// self.attr = ko.observable();

		self.init = function (){
			self.addDate();
			self.initForm();
			// self.addWhenprinted();
			self.addTablelookup();
		};
		self.addDate = function (){
			self.date.push(new date);
		};
		self.initForm = function(){
			$(document).on('click','#addFormAttr',function(){
				var name = $('#formname').val();
				self.addAttr(name);
			});
			$(document).on('contextmenu','#formattr li',function(e){
				e.preventDefault();
				$(this).siblings('.rightmenu.menu').show().position({
						my: "left top",
						of: e
					});
			});
		};
		self.addAttr = function (name){
			var attr = new Attr();
			attr.name = name;
			self.whenprinted.push(attr);
			$("#biaodanshuru").dialog('close');
		};
		self.addTablelookup = function (){
			self.tablelookup.push(new tablelookup);
		};
		self.showAdddate = function (){
			$("#riqi").dialog( "open" );
		};
		self.showFormAttr = function(){
			console.log(this);
		}
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