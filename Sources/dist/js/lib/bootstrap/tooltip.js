/* ========================================================================
 * Bootstrap: tooltip.js v3.3.4
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

define(["jquery"],function(e){+function(e){"use strict";function n(n){return this.each(function(){var r=e(this),i=r.data("bs.tooltip"),s=typeof n=="object"&&n;if(!i&&/destroy|hide/.test(n))return;i||r.data("bs.tooltip",i=new t(this,s)),typeof n=="string"&&i[n]()})}var t=function(e,t){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.init("tooltip",e,t)};t.VERSION="3.3.4",t.TRANSITION_DURATION=150,t.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},t.prototype.init=function(t,n,r){this.enabled=!0,this.type=t,this.$element=e(n),this.options=this.getOptions(r),this.$viewport=this.options.viewport&&e(this.options.viewport.selector||this.options.viewport);if(this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");var i=this.options.trigger.split(" ");for(var s=i.length;s--;){var o=i[s];if(o=="click")this.$element.on("click."+this.type,this.options.selector,e.proxy(this.toggle,this));else if(o!="manual"){var u=o=="hover"?"mouseenter":"focusin",a=o=="hover"?"mouseleave":"focusout";this.$element.on(u+"."+this.type,this.options.selector,e.proxy(this.enter,this)),this.$element.on(a+"."+this.type,this.options.selector,e.proxy(this.leave,this))}}this.options.selector?this._options=e.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},t.prototype.getDefaults=function(){return t.DEFAULTS},t.prototype.getOptions=function(t){return t=e.extend({},this.getDefaults(),this.$element.data(),t),t.delay&&typeof t.delay=="number"&&(t.delay={show:t.delay,hide:t.delay}),t},t.prototype.getDelegateOptions=function(){var t={},n=this.getDefaults();return this._options&&e.each(this._options,function(e,r){n[e]!=r&&(t[e]=r)}),t},t.prototype.enter=function(t){var n=t instanceof this.constructor?t:e(t.currentTarget).data("bs."+this.type);if(n&&n.$tip&&n.$tip.is(":visible")){n.hoverState="in";return}n||(n=new this.constructor(t.currentTarget,this.getDelegateOptions()),e(t.currentTarget).data("bs."+this.type,n)),clearTimeout(n.timeout),n.hoverState="in";if(!n.options.delay||!n.options.delay.show)return n.show();n.timeout=setTimeout(function(){n.hoverState=="in"&&n.show()},n.options.delay.show)},t.prototype.leave=function(t){var n=t instanceof this.constructor?t:e(t.currentTarget).data("bs."+this.type);n||(n=new this.constructor(t.currentTarget,this.getDelegateOptions()),e(t.currentTarget).data("bs."+this.type,n)),clearTimeout(n.timeout),n.hoverState="out";if(!n.options.delay||!n.options.delay.hide)return n.hide();n.timeout=setTimeout(function(){n.hoverState=="out"&&n.hide()},n.options.delay.hide)},t.prototype.show=function(){var n=e.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(n);var r=e.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(n.isDefaultPrevented()||!r)return;var i=this,s=this.tip(),o=this.getUID(this.type);this.setContent(),s.attr("id",o),this.$element.attr("aria-describedby",o),this.options.animation&&s.addClass("fade");var u=typeof this.options.placement=="function"?this.options.placement.call(this,s[0],this.$element[0]):this.options.placement,a=/\s?auto?\s?/i,f=a.test(u);f&&(u=u.replace(a,"")||"top"),s.detach().css({top:0,left:0,display:"block"}).addClass(u).data("bs."+this.type,this),this.options.container?s.appendTo(this.options.container):s.insertAfter(this.$element);var l=this.getPosition(),c=s[0].offsetWidth,h=s[0].offsetHeight;if(f){var p=u,d=this.options.container?e(this.options.container):this.$element.parent(),v=this.getPosition(d);u=u=="bottom"&&l.bottom+h>v.bottom?"top":u=="top"&&l.top-h<v.top?"bottom":u=="right"&&l.right+c>v.width?"left":u=="left"&&l.left-c<v.left?"right":u,s.removeClass(p).addClass(u)}var m=this.getCalculatedOffset(u,l,c,h);this.applyPlacement(m,u);var g=function(){var e=i.hoverState;i.$element.trigger("shown.bs."+i.type),i.hoverState=null,e=="out"&&i.leave(i)};e.support.transition&&this.$tip.hasClass("fade")?s.one("bsTransitionEnd",g).emulateTransitionEnd(t.TRANSITION_DURATION):g()}},t.prototype.applyPlacement=function(t,n){var r=this.tip(),i=r[0].offsetWidth,s=r[0].offsetHeight,o=parseInt(r.css("margin-top"),10),u=parseInt(r.css("margin-left"),10);isNaN(o)&&(o=0),isNaN(u)&&(u=0),t.top=t.top+o,t.left=t.left+u,e.offset.setOffset(r[0],e.extend({using:function(e){r.css({top:Math.round(e.top),left:Math.round(e.left)})}},t),0),r.addClass("in");var a=r[0].offsetWidth,f=r[0].offsetHeight;n=="top"&&f!=s&&(t.top=t.top+s-f);var l=this.getViewportAdjustedDelta(n,t,a,f);l.left?t.left+=l.left:t.top+=l.top;var c=/top|bottom/.test(n),h=c?l.left*2-i+a:l.top*2-s+f,p=c?"offsetWidth":"offsetHeight";r.offset(t),this.replaceArrow(h,r[0][p],c)},t.prototype.replaceArrow=function(e,t,n){this.arrow().css(n?"left":"top",50*(1-e/t)+"%").css(n?"top":"left","")},t.prototype.setContent=function(){var e=this.tip(),t=this.getTitle();e.find(".tooltip-inner")[this.options.html?"html":"text"](t),e.removeClass("fade in top bottom left right")},t.prototype.hide=function(n){function o(){r.hoverState!="in"&&i.detach(),r.$element.removeAttr("aria-describedby").trigger("hidden.bs."+r.type),n&&n()}var r=this,i=e(this.$tip),s=e.Event("hide.bs."+this.type);this.$element.trigger(s);if(s.isDefaultPrevented())return;return i.removeClass("in"),e.support.transition&&i.hasClass("fade")?i.one("bsTransitionEnd",o).emulateTransitionEnd(t.TRANSITION_DURATION):o(),this.hoverState=null,this},t.prototype.fixTitle=function(){var e=this.$element;(e.attr("title")||typeof e.attr("data-original-title")!="string")&&e.attr("data-original-title",e.attr("title")||"").attr("title","")},t.prototype.hasContent=function(){return this.getTitle()},t.prototype.getPosition=function(t){t=t||this.$element;var n=t[0],r=n.tagName=="BODY",i=n.getBoundingClientRect();i.width==null&&(i=e.extend({},i,{width:i.right-i.left,height:i.bottom-i.top}));var s=r?{top:0,left:0}:t.offset(),o={scroll:r?document.documentElement.scrollTop||document.body.scrollTop:t.scrollTop()},u=r?{width:e(window).width(),height:e(window).height()}:null;return e.extend({},i,o,u,s)},t.prototype.getCalculatedOffset=function(e,t,n,r){return e=="bottom"?{top:t.top+t.height,left:t.left+t.width/2-n/2}:e=="top"?{top:t.top-r,left:t.left+t.width/2-n/2}:e=="left"?{top:t.top+t.height/2-r/2,left:t.left-n}:{top:t.top+t.height/2-r/2,left:t.left+t.width}},t.prototype.getViewportAdjustedDelta=function(e,t,n,r){var i={top:0,left:0};if(!this.$viewport)return i;var s=this.options.viewport&&this.options.viewport.padding||0,o=this.getPosition(this.$viewport);if(/right|left/.test(e)){var u=t.top-s-o.scroll,a=t.top+s-o.scroll+r;u<o.top?i.top=o.top-u:a>o.top+o.height&&(i.top=o.top+o.height-a)}else{var f=t.left-s,l=t.left+s+n;f<o.left?i.left=o.left-f:l>o.width&&(i.left=o.left+o.width-l)}return i},t.prototype.getTitle=function(){var e,t=this.$element,n=this.options;return e=t.attr("data-original-title")||(typeof n.title=="function"?n.title.call(t[0]):n.title),e},t.prototype.getUID=function(e){do e+=~~(Math.random()*1e6);while(document.getElementById(e));return e},t.prototype.tip=function(){return this.$tip=this.$tip||e(this.options.template)},t.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},t.prototype.enable=function(){this.enabled=!0},t.prototype.disable=function(){this.enabled=!1},t.prototype.toggleEnabled=function(){this.enabled=!this.enabled},t.prototype.toggle=function(t){var n=this;t&&(n=e(t.currentTarget).data("bs."+this.type),n||(n=new this.constructor(t.currentTarget,this.getDelegateOptions()),e(t.currentTarget).data("bs."+this.type,n))),n.tip().hasClass("in")?n.leave(n):n.enter(n)},t.prototype.destroy=function(){var e=this;clearTimeout(this.timeout),this.hide(function(){e.$element.off("."+e.type).removeData("bs."+e.type)})};var r=e.fn.tooltip;e.fn.tooltip=n,e.fn.tooltip.Constructor=t,e.fn.tooltip.noConflict=function(){return e.fn.tooltip=r,this}}(e)});