define(['app/Stage'],function (stage){
	return {
		left: function (){
			var doc = stage.curDoc(),
				selected = doc.selectedObjects(),
				focus = doc.focusObject();
			if(selected.length > 1 && focus){
				for(var i = 0 ; i < selected.length ; i++){
					var obj = selected[i];
					obj.offsetX(focus.offsetX());
				}
			}else if(focus){
				focus.offsetX(0);
			}
			stage.updateCanvas();
		},
		right: function (){
			var doc = stage.curDoc(),
				selected = doc.selectedObjects(),
				focus = doc.focusObject();
			if(selected.length > 1 && focus){
				for(var i = 0 ; i < selected.length ; i++){
					var obj = selected[i],
						finfo = focus.UI_INFO(),
						oinfo = obj.UI_INFO(),
						offset = finfo.UI_RIGHT_BOTTOM_X - oinfo.UI_RIGHT_BOTTOM_X;
					obj.offsetX(obj.offsetX() + offset);
				}
			}else if(focus){
				var info = focus.UI_INFO(),
					offset = doc.width() - info.UI_RIGHT_BOTTOM_X;
				focus.offsetX(focus.offsetX() + offset);
			}
			stage.updateCanvas();
		},
		top: function (){

		},
		bottom: function (){

		},
		center: function (){

		},
		middle: function (){

		},
		centerInDoc: function (){

		},
		middleInDoc: function (){

		},
		setSameWidth: function (){

		},
		setSameHeight: function (){

		},
		setSameSize: function (){

		},
		horizontalDivider: function (){

		},
		verticalDivider: function (){

		}

	}
});