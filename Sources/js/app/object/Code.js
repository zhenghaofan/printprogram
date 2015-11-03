define(['knockout','mapping','lib/barcode'],function (ko,map,barcode){
  var code = function (parent,data){
      var self        = this;
      self.cvs        = document.createElement("canvas");
      self.ctx        = self.cvs.getContext("2d");
      self.parent     = parent;
      
      self.id         = null;
      self.name       = ko.observable("条形码");
      self.type       = "code";
      self.zIndex     = ko.observable(0);
      self.offsetX    = ko.observable(20);
      self.offsetY    = ko.observable(20);
      self.angle      = ko.observable(0);
      self.ratio      = ko.observable(1);
      self.selected   = ko.observable(false);
      //data
      self.code       = ko.observable("6901285991219");
      self.codeType   = ko.observable("ean13");
      self.digit      = ko.observable();
      self.hri        = "";
      //setting
      self.barWidth   = ko.observable(2);
      self.barHeight  = ko.observable(88);
      self.moduleSize = ko.observable(2);
      self.bgColor    = ko.observable("#FFFFFF");
      self.color      = ko.observable("#000000");
      self.crc        = true;
      self.showHRI    = ko.observable(false);
      self.b2d        = ko.observable(false);
      // barHeight: 50,
      // moduleSize: 5,
      // showHRI: true,
      // addQuietZone: true,
      // marginHRI: 5,
      // bgColor: "#FFFFFF",
      // color: "#000000",
      // fontSize: 10,
      // posX: 0,
      // posY: 0
      self.rowsCount  = ko.observable();
      self.colsCount  = ko.observable();

    self.getDigit = ko.computed(function (){
      switch(self.codeType()){
        case "std25":
        case "int25":
          self.digit(barcode.i25.getDigit(self.code(), self.crc, self.codeType()));
          self.rowsCount(self.digit().getRowsCount());
          self.colsCount(self.digit().getColsCount());
          // self.hri = barcode.i25.compute(self.code(), self.crc, self.codeType());
        break;
        case "ean8":
        case "ean13":
          self.digit(barcode.ean.getDigit(self.code(), self.codeType()));
          self.rowsCount(self.digit().getRowsCount());
          self.colsCount(self.digit().getColsCount());
          // self.hri = barcode.ean.compute(self.code(), self.codeType());
        break;
        case "upc":
          self.digit(barcode.upc.getDigit(self.code()));
          self.rowsCount(self.digit().getRowsCount());
          self.colsCount(self.digit().getColsCount());
          // self.hri = barcode.upc.compute(self.code());
        break;
        case "code11":
          self.digit(barcode.code11.getDigit(self.code()));
          self.rowsCount(self.digit().getRowsCount());
          self.colsCount(self.digit().getColsCount());
          // self.hri = code;
        break;
        case "code39":
          self.digit(barcode.code39.getDigit(self.code()));
          self.rowsCount(self.digit().getRowsCount());
          self.colsCount(self.digit().getColsCount());
          // self.hri = code;
        break;
        case "code93":
          self.digit(barcode.code93.getDigit(self.code(), self.crc));
          self.rowsCount(self.digit().getRowsCount());
          self.colsCount(self.digit().getColsCount());
          // self.hri = code;
        break;
        case "code128":
          self.digit(barcode.code128.getDigit(self.code()));
          self.rowsCount(self.digit().getRowsCount());
          self.colsCount(self.digit().getColsCount());
          // self.hri = code;
        break;
        case "codabar":
          self.digit(barcode.codabar.getDigit(self.code()));
          self.rowsCount(self.digit().getRowsCount());
          self.colsCount(self.digit().getColsCount());
          // self.hri = code;
        break;
        case "msi":
          self.digit(barcode.msi.getDigit(self.code(), self.crc));
          self.rowsCount(self.digit().getRowsCount());
          self.colsCount(self.digit().getColsCount());
          // self.hri = barcode.msi.compute(code, self.crc);
        break;
        case "pdf417":
          self.digit(barcode.pdf417.getDigit(self.code()));
          self.rowsCount(self.digit().getRowsCount());
          self.colsCount(self.digit().getColsCount());
          self.b2d(true);
          // self.hri = barcode.msi.compute(code, self.crc);
        break;
        case "qrcode":
          self.digit(barcode.qrcode.getDigit(self.code(),20,"H"));
          self.rowsCount(self.digit().getModuleCount());
          self.colsCount(self.digit().getModuleCount());
          self.b2d(true);
          // self.hri = barcode.msi.compute(code, self.crc);
        break;
        // case "datamatrix":   
        //   self.digit = barcode.datamatrix.getDigit(code, rect);
        //   self.hri = code;
        //   b2d = true;
        // break; 
      }
    });

    self.canvasWidth = ko.computed(function (){
      return self.colsCount() * self.barWidth();
    });
    self.canvasHeight = ko.computed(function (){
      return self.b2d() ? self.rowsCount() * self.barWidth() : self.rowsCount() * self.barHeight();
    });

    self.autoUpdateEvent = null;
    //ui info
    self.UI_INFO = ko.computed({
      read: function (){
        return {
          UI_LEFT_TOP_X : self.offsetX(),
          UI_LEFT_TOP_Y : self.offsetY(),
          UI_RIGHT_BOTTOM_X : self.offsetX() + self.canvasWidth(),
          UI_RIGHT_BOTTOM_Y : self.offsetY() + self.canvasHeight()
        }
      },
      write: function (info){
        self.offsetX(info.UI_LEFT_TOP_X);
        self.offsetY(info.UI_LEFT_TOP_Y);
        self.barWidth(((info.UI_RIGHT_BOTTOM_X - info.UI_LEFT_TOP_X) / self.colsCount()));
        self.barHeight(info.UI_RIGHT_BOTTOM_Y - info.UI_LEFT_TOP_Y);
      },
      owner: self
    });


    self.init = function (){
      data = data || {};
      var mapRule = {
        include: ["id","name","type","zIndex","offsetX","offsetY","angle","ratio","width","height","lineWidth","lineColor"]
      };
      if(data){
        map.fromJS(data,mapRule,self);
      }
      //self.addAutoUpdateEvent();
      self.redraw();
      //
      // self.eventWithoutRedraw.subscribe(function (){
      //  self.updateCanvas();
      // });
    };
    self.updateCanvas = function (){
      self.redraw();
      if (self.parent) {
        self.parent.updateCanvas();
      };
    };
    self.resizeCanvas = function (x,y){
      self.cvs.width = x;
      self.cvs.height = y;
      self.cvs.style.width = x + "px";
      self.cvs.style.height = x + "px";
    };
    self.redraw = function (){
      self.resizeCanvas(self.canvasWidth(),self.canvasHeight());
      var ctx = self.ctx;
      var digit = self.digit();
      var mw = self.barWidth();
      var mh = self.b2d() ? self.barWidth() : self.barHeight();
      ctx.fillStyle = self.bgColor();
      ctx.fillRect (0, 0, self.canvasWidth(), self.canvasHeight());
      
      ctx.fillStyle = self.color();
      for(var y=0; y<self.rowsCount(); y++){
        var len = 0;
        var current = digit.isDark(y,0);
        for(var x=0; x<self.colsCount(); x++){
          if (current == digit.isDark(y,x)) {
            len++;
          } else {
            if (current){
              ctx.fillRect ((x - len) * mw, y * mh, mw * len, mh);
            }
            current = digit.isDark(y,x);
            len=1;
          }
        }
        if ( (len > 0) && (current) ){
          ctx.fillRect ((self.colsCount() - len) * mw, y * mh, mw * len, mh);
        }
      }
      return self.cvs;
    };
    // self.cache = ko.computed(function (){
    //  self.resizeCanvas(self.canvasWidth(),self.canvasHeight());
    //  //self.ctx.translate(0.5,0.5);
    //  self.ctx.clearRect(0,0,self.canvasWidth(),self.canvasHeight());
    //  self.ctx.save();
    //  self.ctx.beginPath();
    //  self.ctx.lineWidth= self.lineWidth();
    //  self.ctx.strokeStyle=self.lineColor();
    //  self.ctx.rect(self.halfLineWidth(),self.halfLineWidth(),self.width(),self.height());
    //  self.ctx.stroke();
   //        this.ctx.restore();
   //        console.log("redraw");
    //  return self.cvs;
    // },self);
    self.isInPoint = function (x,y){
      x = x || window.app.stage.mouseX();
      y = y || window.app.stage.mouseY();
      return self.offsetX() <= x && x <= (self.offsetX() + self.canvasWidth()) && self.offsetY() <= y && y <= (self.offsetY() + self.canvasHeight());
    };
    self.init();
  };
  return code;
});