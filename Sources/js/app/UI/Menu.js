define(['app/Stage','lib/canvas2image'],function (stage,canvas2image){
	return {
		selectall: function (){
			var doc = stage.curDoc();
			if(doc){
				doc.selectall();
			}
		},
		tojpg: function (){
			var doc = stage.curDoc();
			if(doc){
				canvas2image.saveAsJPEG(stage.cvs,doc.width(),doc.height());
			}
		},
		topng: function (){
			var doc = stage.curDoc();
			if(doc){
				canvas2image.saveAsPNG(stage.cvs,doc.width(),doc.height());
			}
		},
		tobmp: function (){
			var doc = stage.curDoc();
			if(doc){
				canvas2image.saveAsBMP(stage.cvs,doc.width(),doc.height());
			}
		}
	};
});