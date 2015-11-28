define(['knockout','app/Stage','app/Util'],function (ko,stage,util){
	var history = function (){
		this.doc = ko.observable(null);
		this.stage = stage;

		this.init();
	};
	history.prototype = {
		init: function (){
			this.doc(this.stage.curDoc());
			util.Event.addEventListener("changDoc",this.changDoc,this);
			util.Event.addEventListener("undo",this.undo,this);
			util.Event.addEventListener("redo",this.redo,this);
			this.listener();
		},
		changDoc: function (event,doc){
			this.doc(doc);
			if(doc && !doc._history){
				doc._history = [];
				doc._history.push(doc.getData());
				doc._historyIndex = doc._history.length - 1;
			}

		},
		redo: function (){
			var doc = this.doc();
			if(doc && doc._historyIndex < (doc._history.length - 1)){
				var index = ++doc._historyIndex;
				doc.loadData(doc._history[index]);
				this.stage.updateCanvas();
			}
		},
		undo: function (){
			var doc = this.doc();
			if(doc && doc._historyIndex > 0){
				var index = --doc._historyIndex;
				doc.loadData(doc._history[index]);
				this.stage.updateCanvas();
			}
		},
		pushHistory: function (){
			var doc = this.doc();
			if(doc){
				doc._history.splice(doc._historyIndex + 1,doc._history.length - doc._historyIndex - 1,doc.getData());
				if(doc._history.length > 20) doc._history.shift();
				doc._historyIndex = doc._history.length - 1;
			}
		},
		listener: function (){
			util.Event.addEventListener("pushHistory",this.pushHistory,this);
			util.Event.addEventListener("afterAddLine",this.pushHistory,this);
			util.Event.addEventListener("afterAddRect",this.pushHistory,this);
		}
	};
	return new history();
});