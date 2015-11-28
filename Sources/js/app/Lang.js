define(['knockout'],function (ko){
	var lang = function (){
		var self = this;
		self.lang = {
			zh : {
				"file": "文件",
				"new": "新建",
				"open": "打开",
				"close": "关闭",
				"closeall": "关闭所有",
				"save": "保存",
				"saveas": "另存为",
				"export": "导出",
				"toanimagefile": "导出为图片",
				"pagesetup": "页面设置",
				"selectprinter": "选择打印机",
				"printersetup": "打印机设置",
				"print": "打印",
				"properties": "属性",
				"exit": "退出",
				"edit": "编辑",
				"undo": "撤销",
				"redo": "重做",
				"cut": "剪切",
				"copy": "复制",
				"paste": "粘贴",
				"rotatepageright90": "向右旋转90度",
				"rotatepageleft90": "向左旋转90度",
				"selectall": "全选",
				"view": "View",
				"mode": "Mode",
				"form": "Form",
				"zoom": "Zoom",
				"percent100": "100%",
				"zoomout": "Zoom -",
				"zoomin": "Zoom +",
				"widthdocument": "Width document",
				"wholedocument": "Whole document",
				"orientation": "Orientation",
				"zero": "0",
				"ninety": "90",
				"onehundredandeighty": "180",
				"twohundredandseventy": "270",
				"formcustomization": "Form Customization",
				"toolbars": "Toolbars"
			},
			en : {
				"file": "File",
				"new": "New",
				"open": "Open",
				"close": "Close",
				"closeall": "Close All",
				"save": "Save",
				"saveas": "Save As",
				"export": "Export",
				"toanimagefile": "to an image file",
				"pagesetup": "Page setup",
				"selectprinter": "Select printer",
				"printersetup": "Printer setup",
				"print": "Print",
				"properties": "Properties",
				"exit": "Exit",
				"edit": "Edit",
				"undo": "Undo",
				"redo": "Redo",
				"cut": "Cut",
				"copy": "Copy",
				"paste": "Paste",
				"rotatepageright90": "Rotate page right 90",
				"rotatepageleft90": "Rotate page left 90",
				"selectall": "Select All",
				"view": "View",
				"mode": "Mode",
				"form": "Form",
				"zoom": "Zoom",
				"percent100": "100%",
				"zoomout": "Zoom -",
				"zoomin": "Zoom +",
				"widthdocument": "Width document",
				"wholedocument": "Whole document",
				"orientation": "Orientation",
				"zero": "0",
				"ninety": "90",
				"onehundredandeighty": "180",
				"twohundredandseventy": "270",
				"formcustomization": "Form Customization",
				"toolbars": "Toolbars"

			}

		};
		self.current = ko.observable("zh");
		self.curLang = ko.computed(function (){
			return self.lang[self.current()];
		});
		self.switchLang = function (){
			self.current(self.current() === "zh" ? "en" : "zh");
		};
	};
	return new lang();
});