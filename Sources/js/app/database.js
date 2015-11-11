define(['knockout','jquery','DBObj/date','DBObj/attr','DBObj/tablelookup'],function (ko,$,_date,Attr,tablelookup){
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
				console.log(datename);
				self.addDate(datename);
			});
			$(document).on('contextmenu','#dateAttr li',function(e){
				$('#dateAttr>ul').menu();
				e.preventDefault();
				$('#dateAttr').children('.rightmenu.menu').show().position({
						my: "left top",
						of: e
					});
			});
		}
		self.initForm = function(){
			$(document).on('click','#addFormAttr',function(){
				var attrname = $('#formname').val();
				self.addAttr(attrname);
			});
			$(document).on('contextmenu','#formAttr li',function(e){
				$('#formAttr>ul').menu();
				e.preventDefault();
				$('#formAttr').children('.rightmenu.menu').show().position({
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
		self.addDate = function (datename){
			var date = new _date();
			date.datename = datename; 
			self.dates.push(date);
			$('#riqi').dialog('close');
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
		self.showDateAttr = function(){
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