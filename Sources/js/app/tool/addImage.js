define(['jquery','app/Stage','app/Util'],function ($,stage,util){
	var addimage = function (parent){
		var self = this;
		self.parent = parent;
		self.name = "addimage"
		self.newImage = null;
		//mouse position
		self.x = 0;
		self.y = 0;

		self.init = function (){
		    document.body.ondragover = function () { return false; };
		    document.body.ondragend = function () { return false; };
		    document.body.ondrop = self.readfile;
		    document.getElementById('readLocalFile').onchange = self.readfile;
		};
		self.addImage = function (data){
			var img = new Image();
			img.onload = function (){
				var doc = stage.curDoc();
				console.log(self.x);
				self.newImage = doc.addImage({dataURL:data,offsetX:self.x,offsetY:self.y});
				//stage.updateCanvas();
			};
			img.onerror = function (){

			};
			img.src = data;
		};
		self.readfile = function (e){
	        e.preventDefault();
	        var file,
	        	reader = new FileReader();
	        if(e.type == "drop"){
		        file = e.dataTransfer.files[0];

	        }else if(e.type == "change"){
	        	file = e.target.files[0];
	        }

	        reader.onload = function (event) {
	            if(file.type.indexOf("image") > -1){
	            	console.log(e);
		        	if(!e.clientX) {
		        		e.clientX = 120;
		        		e.clientY = 230;
		        	}
		        	stage.updateMouseXY(e);
					self.x = stage.mouseX();
					self.y = stage.mouseY();

	                self.addImage(event.target.result);
	            }
	        };
	        reader.readAsDataURL(file);
	         
	        return false;
		};
		self.setDefaultTool = function (){
			self.parent.setDefaultTool();
		};
		self.active = function (){
			console.log("dif");
			document.getElementById('readLocalFile').click();
			self.setDefaultTool();
		};
		self.deactive = function (){
		};
		self.init();
	};

	return addimage;
});