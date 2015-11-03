define(["knockout","mapping","app/Util","object/text","object/code","object/image","object/line","object/rect"],function(e,t,n,r,i,s,o,u){var a=0,f=function(n,f){var l=this;l.parent=n,l.cvs=n.cvs,l.ctx=n.ctx,l.id=a++,l.name=e.observable("document "+(l.id+1)),l.width=e.observable(1800),l.height=e.observable(800),l.angle=e.observable(0),l.ratio=e.observable(1),l.zIndexCounter=e.observable(0),l.backgroudcolor=e.observable("#ffffff"),l.textCounter=0,l.codeCounter=0,l.imageCounter=0,l.lineCounter=0,l.rectCounter=0,l.text=e.observableArray(),l.code=e.observableArray(),l.image=e.observableArray(),l.line=e.observableArray(),l.rect=e.observableArray(),l.curText=e.observable(),l.curCode=e.observable(),l.curImage=e.observable(),l.curLine=e.observable(),l.curRect=e.observable(),l.objects=e.computed(function(){return l.text().concat(l.code(),l.image(),l.line(),l.rect())}),l.sortByIndex=e.computed(function(){return l.objects().sort(function(e,t){return e.zIndex()==t.zIndex()?0:e.zIndex()>t.zIndex()?-1:1})}),l.selectedObjects=e.computed(function(){return l.objects().filter(function(e){return e.selected()==1})}),l.objectsInPoint=[],l.focusObject=e.observable(),l.scrollLeft=0,l.scrollRight=0,l.init=function(){l.loadData(f)},l.loadData=function(n){n=n||{};var a={include:["id","name","width","height","angle","ratio","zIndexCounter","backgroudcolor","textCounter","codeCounter","imageCounter","lineCounter","rectCounter","text","code","image","line","rect"],text:{key:function(t){return e.utils.unwrapObservable(t.id)},create:function(e){var t=e.data.zIndex;return t&&l.zIndexCounter(Math.max(t,l.zIndexCounter())),new r(l,e.data)}},code:{key:function(t){return e.utils.unwrapObservable(t.id)},create:function(e){var t=e.data.zIndex;return t&&l.zIndexCounter(Math.max(t,l.zIndexCounter())),new i(l,e.data)}},image:{key:function(t){return e.utils.unwrapObservable(t.id)},create:function(e){var t=e.data.zIndex;return t&&l.zIndexCounter(Math.max(t,l.zIndexCounter())),new s(l,e.data)}},line:{key:function(t){return e.utils.unwrapObservable(t.id)},create:function(e){var t=e.data.zIndex;return t&&l.zIndexCounter(Math.max(t,l.zIndexCounter())),new o(l,e.data)}},rect:{key:function(t){return e.utils.unwrapObservable(t.id)},create:function(e){var t=e.data.zIndex;return t&&l.zIndexCounter(Math.max(t,l.zIndexCounter())),new u(l,e.data)}}};n&&t.fromJS(n,a,l)},l.getData=function(){return t.toJS(l)},l.updateCanvas=function(){console.log("aa"),l.parent&&l.parent.updateCanvas()},l.removeObject=function(e){l.objects.remove(e)},l.redraw=function(){var e=l.sortByIndex();l.ctx.fillStyle=l.backgroudcolor(),l.ctx.lineWidth=3,l.ctx.strokeStyle="#144DD4",l.ctx.fillRect(0,0,l.width(),l.height());for(var t=e.length-1;t>=0;t--){var n=e[t];if(n.selected()){var r=n.UI_INFO();l.ctx.beginPath(),l.ctx.rect(r.UI_LEFT_TOP_X,r.UI_LEFT_TOP_Y,r.UI_RIGHT_BOTTOM_X-r.UI_LEFT_TOP_X,r.UI_RIGHT_BOTTOM_Y-r.UI_LEFT_TOP_Y),l.ctx.stroke()}l.ctx.drawImage(n.cvs,n.offsetX(),n.offsetY())}},l.addText=function(e){e=e||{};var t=new r(l,e);return t.id=l.textCounter++,t.name("文本 "+(t.id+1)),t.zIndex(l.zIndexCounter()),l.zIndexCounter(l.zIndexCounter()+1),l.text.push(t),t},l.addCode=function(e){e=e||{};var t=new i(l,e);return t.id=l.codeCounter++,t.name("条码 "+(t.id+1)),t.zIndex(l.zIndexCounter()),l.zIndexCounter(l.zIndexCounter()+1),l.code.push(t),t},l.addImage=function(e){e=e||{};var t=new s(l,e);return t.id=l.imageCounter++,t.name("图片 "+(t.id+1)),t.zIndex(l.zIndexCounter()),l.zIndexCounter(l.zIndexCounter()+1),l.image.push(t),t},l.addLine=function(e){e=e||{};var t=new o(l,e);return t.id=l.lineCounter++,t.name("直线 "+(t.id+1)),t.zIndex(l.zIndexCounter()),l.zIndexCounter(l.zIndexCounter()+1),l.line.push(t),t},l.addRect=function(e){e=e||{};var t=new u(l,e);return t.id=l.rectCounter++,t.name("矩形 "+(t.id+1)),t.zIndex(l.zIndexCounter()),l.zIndexCounter(l.zIndexCounter()+1),l.rect.push(t),t},l.resizeCanvas=function(e,t){l.cvs.width=e,l.cvs.height=t,l.cvs.style.width=e+"px",l.cvs.style.height=e+"px"},l.getCanvas=function(){return l.cvs},l.getObjectsInPoint=function(e,t){e=e||l.parent.mouseX()||0,t=t||l.parent.mouseY()||0;var n=l.sortByIndex(),r=[];for(var i=0;i<n.length;i++)n[i].isInPoint(e,t)&&r.push(n[i]);l.objectsInPoint=r},l.clearSelectedObjects=function(){var e=l.selectedObjects();for(var t=0;t<e.length;t++){var n=e[t];n.selected(!1)}},l.selectObject=function(e){l.getObjectsInPoint();var t=l.objectsInPoint[0];l.focusObject(t);if(e&&t){t.selected(!0),l.parent.updateCanvas();return}if(t){l.clearSelectedObjects(),t.selected(!0),l.parent.updateCanvas();return}l.clearSelectedObjects(),l.parent.updateCanvas()},l.init()};return f});