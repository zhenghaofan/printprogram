define(["jquery","knockout","app/Util"],function(e,t,n){var r=function(){this.h=document.getElementById("h-ruler-canvas"),this.hctx=this.h.getContext("2d"),this.v=document.getElementById("v-ruler-canvas"),this.vctx=this.v.getContext("2d"),this.c=e("#cvs-container"),this.minH=t.observable(0),this.minV=t.observable(0),this.docW=t.observable(0),this.docH=t.observable(0),this.offsetX=t.observable(0),this.offsetY=t.observable(0),this.ratio=t.observable(1),this.hWidth=t.computed(function(){var e=Math.max(this.docW(),this.minH())+100;return this.h.width=e,this.h.style.width=e+"px",this.h.height=this.rulerWidth,this.h.style.height=this.rulerWidth+"px",e},this),this.vHeight=t.computed(function(){var e=Math.max(this.docH(),this.minV())+100;return this.v.height=e,this.v.style.height=e+"px",this.v.width=this.rulerWidth,this.v.style.width=this.rulerWidth+"px",e},this),this.rulerWidth=28,this.mm1=5,this.mm5=10,this.mm10=20,this.resizeTimeout=null,this.init()};return r.prototype={init:function(){var t=this,n=function(){t.update()};e(function(){setTimeout(n,500)}),e("#cvs-container").on("scroll",function(){t.setOffset()}),e(window).on("resize",function(){clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(n,500)})},draw:function(){var e=0,t=0,r=0,i=n.getDPI()[0]/25.4*2;this.hctx.clearRect(0,0,this.hWidth(),this.rulerWidth),this.hctx.beginPath(),this.hctx.lineWidth=1,this.hctx.strokeStyle="#000000",this.hctx.font="10px",this.hctx.moveTo(0,this.rulerWidth),this.hctx.lineTo(this.hWidth(),this.rulerWidth);for(;t<=this.hWidth();t+=i*this.ratio(),e++)this.hctx.moveTo(t,this.rulerWidth),this.hctx.lineTo(t,this.rulerWidth-this.getMMHeight(e)),e%10===0&&this.hctx.fillText(e+"",t+2,16);this.hctx.stroke(),this.vctx.clearRect(0,0,this.rulerWidth,this.vHeight()),this.vctx.beginPath(),this.vctx.lineWidth=1,this.vctx.strokeStyle="#000000",this.vctx.font="5px",this.vctx.moveTo(this.rulerWidth,0),this.vctx.lineTo(this.rulerWidth,this.vHeight()),e=0;for(;r<=this.vHeight();r+=i*this.ratio(),e++)this.vctx.moveTo(this.rulerWidth,r),this.vctx.lineTo(this.rulerWidth-this.getMMHeight(e),r),e%10===0&&this.vctx.fillText(e+"",5,r+10);this.vctx.stroke()},setRatio:function(e){this.ratio(e)},setDocSize:function(e,t){this.docW(e),this.docH(t)},setMinSize:function(t,n){var t=t||e("#h-ruler").width(),n=n||e("#v-ruler").height();this.minH(t),this.minV(n)},setOffset:function(){this.offsetX(this.c.scrollLeft()),this.offsetY(this.c.scrollTop()),this.h.style.left="-"+this.offsetX()+"px",this.v.style.top="-"+this.offsetY()+"px"},update:function(e,t,n){var e=e||this.docW(),t=t||this.docH(),n=n||this.ratio();this.setDocSize(e,t),this.setMinSize(),this.setOffset(),this.setRatio(n),this.draw()},getMMHeight:function(e){return e%10===0?this.mm10:e%5===0?this.mm5:this.mm1}},new r});