define(["jquery","jqueryUI","knockout","app/Router","app/Stage","app/Database","app/Util","app/Tool","app/History","app/Lang","app/UI/barcode","app/UI/objectsAlign","app/UI/lineProperty","app/UI/codeProperty","app/UI/imageProperty","app/UI/rectProperty","app/UI/textProperty","app/UI/stageRightmenu","app/UI/page-setting","app/UI/login2","app/UI/login1"],function(e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w){var E=function(){this.idCounter=0,this.state=n.observable("edit"),this.stage=i,this.tool=u,this.database=s,this.history=a,this.lang=f,this.router=router,this.objectsalign=c,this.lineproperty=h,this.codeproperty=h,this.imageproperty=h,this.rectproperty=h,this.textproperty=h,this.login2=b,this.login1=w,this.stagerightmenu=g,this._init()};return E.prototype={_init:function(){this.tool.init();var t=this;e("#menubar,#toolbar").on("mouseleave",function(){e(document).click()}),e("#menu>li ul,.menu").menu(),e(document).delegate(".node>li>span","click",function(){e(this).parent().toggleClass("open")}),e(".tabs").tabs(),e("#dialogs>div").each(function(){var t=e(this);t.dialog({width:t.data("width"),autoOpen:t.data("visibility"),resizable:!1,modal:!0})}),e(document).on("click",function(){e(".rightmenu").hide()}),e("#database").delegate(">.content>.node>li","contextmenu",function(t){e(document).click(),t.button==2&&(t.preventDefault(),e(".rightmenu",this).show().position({my:"left top",of:t}))})},getStage:function(){return this.stage}},window.app=new E,window.app});