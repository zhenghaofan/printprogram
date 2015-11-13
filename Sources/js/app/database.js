define(['knockout','jquery','DBObj/date','DBObj/attr','DBObj/tablelookup'],function (ko,$,_date,Attr,tablelookup){
	var database = function (){
		var self = this;
		self.op = true;
		self.dates = ko.observableArray();
		self.forms = ko.observableArray();
		self.tablelookup = ko.observableArray();
		// self.attr = ko.observable();

		self.init = function (){
			self.initDate();
			self.initForm();
			self.initFormFind();
		};
		self.initDate = function(){
			$(document).on('click','#closeDate',function(){
				$('#riqi').dialog('close');
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
		self.opDate = function(){
			var datename = $('#datename').val();
			if(self.op){
				self.addDate(datename);
			}else{
				self.updateDate(datename);
			}
		}
		self.updateDate = function(){

			// console.log(self.dates);
			$('#riqi').dialog('close');

		}
		self.initForm = function(){
			$(document).on('click','#addFormAttr',function(){
				var attrname = $('#formname').val();
				self.addAttr(attrname);
			});
			$(document).on('click','#closeForm',function(){
				$('#biaodanshuru').dialog('close');
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

		self.initFormFind = function(){
			$(document).on('click','#addFormFind',function(){
				var ffname = $('#formFindName').val();
				self.addFormFind(ffname);
			});
			$(document).on('click','#closeFormFind',function(){
				$('#biaochazhao').dialog('close');
			});
			$(document).on('contextmenu','#formFindAttr li',function(e){
				$('#formFindAttr>ul').menu();
				e.preventDefault();
				$('#formFindAttr').children('.rightmenu.menu').show().position({
						my: "left top",
						of: e
					});
			});
		};

		self.addDate = function (datename){
			var date = new _date();
			date.datename = datename; 
			self.dates.push(date);
			$('#riqi').dialog('close');
		};
		self.addAttr = function (attrname){
			var attr = new Attr();
			attr.attrname = attrname;
			self.forms.push(attr);
			$("#biaodanshuru").dialog('close');
		};
		self.addFormFind = function (ffname){
			var formfind = new tablelookup();
			formfind.formFindName = ffname;
			self.tablelookup.push(formfind);
			$('#biaochazhao').dialog('close');
		};
		self.showAddDate = function (){
			self.op = true;
			$("#riqi").dialog( "open" );
		};
		self.showAddForm = function (){
			$("#biaodanshuru").dialog("open");
		};
		self.showAddtablelookup = function (){
			$("#biaochazhao").dialog("open");
		};
		self.showDateAttr = function(m){
			// console.log(m);
			self.op = false;
			$('#datename').val(m.datename);
			$('#riqi').dialog('open');
		}
		self.showFormAttr = function(m){
			$('#formname').val(m.attrname);
			$('#biaodanshuru').dialog('open');
		}
		self.showFormFind = function(m){
			$('#formFindName').val(m.formFindName);
			$('#biaochazhao').dialog('open');
		}
		self.init();

	};
	return new database;
});