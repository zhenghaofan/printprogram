define(["jquery","vue"],function(e,t){var n=function(){this.vm=null,this.init(),this.initVm()};return n.prototype={init:function(){var t=this;e(document).on("contextmenu","#text li",function(t){t.preventDefault(),e("#text").siblings(".rightmenu.menu").show().position({my:"left top",of:t})}),e(document).on("click","#textAttr",function(){e("#wenbenshuxing").dialog("open")}),e(function(){e("#slider").slider({min:0,max:270,range:"min",value:0,step:90,slide:function(e,n){t.degree=n.value}})})},initVm:function(){var e=this;this.vm=new t({el:"#wenbenshuxing"})}},new n});