define(['knockout','jquery','DBObj/date','DBObj/attr','DBObj/tablelookup'],function (ko,$,_date,Attr,tablelookup){
	var database = function (){
		var self = this;
		self.op = true;
		// this.dateObj = null;
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

			$("#riqi").dialog({
				width: 510,
				autoOpen: false,
				resizable: false,
				modal: true
			});

			$(document).on('click','#closeDate',function(){
				$('#riqi').dialog('close');
			});

			$(document).on('contextmenu','#dateAttr li',function(e){
				e.preventDefault();
				$(this).children('ul').menu().show().position({
						my: "left top",
						of: e
					});
			});

		}

		self.showAddDate = function (){
			self.op = true;			
			$("#riqi").dialog( "open" );
		};

		self.showDateAttr = function(){
			self.op = false;
			console.log(this);
			// this.datename = 'aa';
			// $('#datename').val(this.datename);
			$('#riqi').dialog('open');
		}

		self.opDate = function(){
			var datename = $('#datename').val();
			if(self.op){
				self.addDate(datename);
			}else{
				self.updateDate(datename);
			}
		}

		self.addDate = function (datename){
			var date = new _date();
			date.datename = datename; 
			self.dates.push(date);
			$('#riqi').dialog('close');
		};

		self.updateDate = function(){

			// console.log(self.dates);
			// console.log(this);
			// this.datename = $('#datename').val();
			// self.dateObj.datename = $('#datename').val();
			$('#riqi').dialog('close');

		}
		
		self.removeDateAttr = function(){
			self.dates.remove(this);
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

		self.addAttr = function (attrname){
			var attr = new Attr();
			attr.attrname = attrname;
			self.forms.push(attr);
			$("#biaodanshuru").dialog('close');
		};

		self.showAddForm = function (){
			$("#biaodanshuru").dialog("open");
		};

		self.showFormAttr = function(m){
			$('#formname').val(m.attrname);
			$('#biaodanshuru').dialog('open');
		}
		self.removeFormAttr = function(){
			self.forms.remove(this);
		}

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

		self.addFormFind = function (ffname){
			var formfind = new tablelookup();
			formfind.formFindName = ffname;
			self.tablelookup.push(formfind);
			$('#biaochazhao').dialog('close');
		};

		self.showAddtablelookup = function (){
			$("#biaochazhao").dialog("open");
		};


		self.showFormFind = function(m){
			$('#formFindName').val(m.formFindName);
			$('#biaochazhao').dialog('open');
		}
		self.removeFormFind = function(){
			self.tablelookup.remove(this);
		}

		self.init();

	};
	return new database;
});