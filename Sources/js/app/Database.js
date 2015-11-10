define(['knockout','jquery','DBObj/date','DBObj/attr','DBObj/tablelookup'],function (ko,$,Date,Attr,tablelookup){
	var database = function (){
		var self = this;
		self.dates = ko.observableArray();
		self.forms = ko.observableArray();
		self.tablelookup = ko.observableArray();
		// self.attr = ko.observable();

		self.init = function (){
			// self.addDate();
			// self.addWhenprinted();
			self.initDate();
			self.initForm();
			self.addTablelookup();
		};
		self.initDate = function(){
			$(document).on('click','#addDateAttr',function(){
				var datename = $('#datename').val();
				self.addDate(datename);
			});
			$(document).on('contextmenu','#dateattr li',function(e){
				e.preventDefault();
				$(this).siblings('.rightmenu.menu').show().position({
						my: "left top",
						of: e
					});
			});
		}
		self.addDate = function (datename){
			var date = new Date();
			date.datename = datename; 
			self.dates.push(date);
			$('#riqi').dialog('close');
		};
		self.initForm = function(){
			$(document).on('click','#addFormAttr',function(){
				var attrname = $('#formname').val();
				self.addAttr(attrname);
			});
			$(document).on('contextmenu','#formattr li',function(e){
				e.preventDefault();
				$(this).siblings('.rightmenu.menu').show().position({
						my: "left top",
						of: e
					});
			});
		};
		self.addAttr = function (attrname){
			var attr = new Attr();
			attr.attrname = attrname;
			self.forms.push(attr);
			$("#biaodanshuru").dialog('close');
		};
		self.addTablelookup = function (){
			self.tablelookup.push(new tablelookup);
		};
		self.showAddDate = function (){
			$("#riqi").dialog( "open" );
		};
		self.showFormAttr = function(){
			console.log(this);
		}
		self.showAddForm = function (){
			$("#biaodanshuru").dialog("open");
		};
		self.showAddtablelookup = function (){
			$("#biaochazhao").dialog("open");
		};
		self.init();

	};
	return new database;
});