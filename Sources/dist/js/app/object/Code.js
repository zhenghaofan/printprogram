define(["knockout","mapping","lib/barcode"],function(e,t,n){var r=function(r,i){var s=this;s.cvs=document.createElement("canvas"),s.ctx=s.cvs.getContext("2d"),s.parent=r,s.id=null,s.name=e.observable("条形码"),s.type="code",s.zIndex=e.observable(0),s.offsetX=e.observable(20),s.offsetY=e.observable(20),s.angle=e.observable(0),s.ratio=e.observable(1),s.selected=e.observable(!1),s.code=e.observable("6901285991219"),s.codeType=e.observable("ean13"),s.digit=e.observable(),s.hri="",s.barWidth=e.observable(2),s.barHeight=e.observable(88),s.moduleSize=e.observable(2),s.bgColor=e.observable("#FFFFFF"),s.color=e.observable("#000000"),s.crc=!0,s.showHRI=e.observable(!1),s.b2d=e.observable(!1),s.rowsCount=e.observable(),s.colsCount=e.observable(),s.getDigit=e.computed(function(){switch(s.codeType()){case"std25":case"int25":s.digit(n.i25.getDigit(s.code(),s.crc,s.codeType())),s.rowsCount(s.digit().getRowsCount()),s.colsCount(s.digit().getColsCount());break;case"ean8":case"ean13":s.digit(n.ean.getDigit(s.code(),s.codeType())),s.rowsCount(s.digit().getRowsCount()),s.colsCount(s.digit().getColsCount());break;case"upc":s.digit(n.upc.getDigit(s.code())),s.rowsCount(s.digit().getRowsCount()),s.colsCount(s.digit().getColsCount());break;case"code11":s.digit(n.code11.getDigit(s.code())),s.rowsCount(s.digit().getRowsCount()),s.colsCount(s.digit().getColsCount());break;case"code39":s.digit(n.code39.getDigit(s.code())),s.rowsCount(s.digit().getRowsCount()),s.colsCount(s.digit().getColsCount());break;case"code93":s.digit(n.code93.getDigit(s.code(),s.crc)),s.rowsCount(s.digit().getRowsCount()),s.colsCount(s.digit().getColsCount());break;case"code128":s.digit(n.code128.getDigit(s.code())),s.rowsCount(s.digit().getRowsCount()),s.colsCount(s.digit().getColsCount());break;case"codabar":s.digit(n.codabar.getDigit(s.code())),s.rowsCount(s.digit().getRowsCount()),s.colsCount(s.digit().getColsCount());break;case"msi":s.digit(n.msi.getDigit(s.code(),s.crc)),s.rowsCount(s.digit().getRowsCount()),s.colsCount(s.digit().getColsCount());break;case"pdf417":s.digit(n.pdf417.getDigit(s.code())),s.rowsCount(s.digit().getRowsCount()),s.colsCount(s.digit().getColsCount()),s.b2d(!0);break;case"qrcode":s.digit(n.qrcode.getDigit(s.code(),20,"H")),s.rowsCount(s.digit().getModuleCount()),s.colsCount(s.digit().getModuleCount()),s.b2d(!0)}}),s.canvasWidth=e.computed(function(){return s.colsCount()*s.barWidth()}),s.canvasHeight=e.computed(function(){return s.b2d()?s.rowsCount()*s.barWidth():s.rowsCount()*s.barHeight()}),s.autoUpdateEvent=null,s.UI_INFO=e.computed({read:function(){return{UI_LEFT_TOP_X:s.offsetX(),UI_LEFT_TOP_Y:s.offsetY(),UI_RIGHT_BOTTOM_X:s.offsetX()+s.canvasWidth(),UI_RIGHT_BOTTOM_Y:s.offsetY()+s.canvasHeight()}},write:function(e){s.offsetX(e.UI_LEFT_TOP_X),s.offsetY(e.UI_LEFT_TOP_Y),s.barWidth((e.UI_RIGHT_BOTTOM_X-e.UI_LEFT_TOP_X)/s.colsCount()),s.barHeight(e.UI_RIGHT_BOTTOM_Y-e.UI_LEFT_TOP_Y)},owner:s}),s.init=function(){i=i||{};var e={include:["id","name","type","zIndex","offsetX","offsetY","angle","ratio","width","height","lineWidth","lineColor"]};i&&t.fromJS(i,e,s),s.redraw()},s.updateCanvas=function(){s.redraw(),s.parent&&s.parent.updateCanvas()},s.resizeCanvas=function(e,t){s.cvs.width=e,s.cvs.height=t,s.cvs.style.width=e+"px",s.cvs.style.height=e+"px"},s.redraw=function(){s.resizeCanvas(s.canvasWidth(),s.canvasHeight());var e=s.ctx,t=s.digit(),n=s.barWidth(),r=s.b2d()?s.barWidth():s.barHeight();e.fillStyle=s.bgColor(),e.fillRect(0,0,s.canvasWidth(),s.canvasHeight()),e.fillStyle=s.color();for(var i=0;i<s.rowsCount();i++){var o=0,u=t.isDark(i,0);for(var a=0;a<s.colsCount();a++)u==t.isDark(i,a)?o++:(u&&e.fillRect((a-o)*n,i*r,n*o,r),u=t.isDark(i,a),o=1);o>0&&u&&e.fillRect((s.colsCount()-o)*n,i*r,n*o,r)}return s.cvs},s.isInPoint=function(e,t){return e=e||window.app.stage.mouseX(),t=t||window.app.stage.mouseY(),s.offsetX()<=e&&e<=s.offsetX()+s.canvasWidth()&&s.offsetY()<=t&&t<=s.offsetY()+s.canvasHeight()},s.init()};return r});