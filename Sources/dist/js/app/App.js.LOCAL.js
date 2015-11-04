define(["jquery","jqueryUI","knockout","sammy","app/Stage","app/database","app/Util","app/Tool","app/History","app/Lang","app/UI/barcode","app/UI/objectsAlign","app/UI/lineProperty","app/UI/codeProperty","app/UI/imageProperty","app/UI/rectProperty","app/UI/textProperty","app/UI/stageRightmenu","app/UI/page-setting"],function(e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y){var b=function(){this.idCounter=0,this.state=n.observable("edit"),this.stage=i,this.tool=u,this.database=s,this.history=a,this.lang=f,this.router=null,this.objectsalign=c,this.lineproperty=h,this.codeproperty=h,this.imageproperty=h,this.rectproperty=h,this.textproperty=h,this.stagerightmenu=g,this._init()};return b.prototype={_init:function(){this.tool.init();var t=this;e("#menubar,#toolbar").on("mouseleave",function(){e(document).click()}),e("#menu>li ul,.menu").menu(),e(document).delegate(".node>li>span","click",function(){e(this).parent().toggleClass("open")}),e(".tabs").tabs(),e("#dialogs>div").each(function(){var t=e(this);t.dialog({width:t.data("width"),autoOpen:t.data("visibility"),resizable:!1,modal:!0})}),e(document).on("click",function(){e(".rightmenu").hide()}),e("#database").delegate(">.content>.node>li","contextmenu",function(t){e(document).click(),t.button==2&&(t.preventDefault(),e(".rightmenu",this).show().position({my:"left top",of:t}))}),t._setRouter(),e(function(){e("#page-initial").dialog("open")})},_setRouter:function(){var e=this;e.router=r(function(){this.get("/",function(){e.router.setLocation("/edit")}),this.get("/login",function(){e.state("login")}),this.get("/new",function(){e.state("new")}),this.get("/edit/:id",function(){e.state("edit")})}),e.router.run()},getStage:function(){return this.stage}},window.app=new b,window.app});