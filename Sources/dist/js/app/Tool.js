define(["knockout","app/Util","app/tool/selection","app/tool/addLine","app/tool/addRect","app/tool/addText","app/tool/addFixWidthText","app/tool/addImage"],function(e,t,n,r,i,s,o,u){var a=function(){var a=this;a.curTool=e.observable(),a.tools={},a.init=function(){a.tools.selection=new n(a),a.tools.addline=new r(a),a.tools.addrect=new i(a),a.tools.addtext=new s(a),a.tools.addfixwidthtext=new o(a),a.tools.addimage=new u(a),a.setDefaultTool()},a.setDefaultTool=function(){a.changeTool("selection")},a.changeTool=function(e){t._isString(e)&&a.tools.hasOwnProperty(e)&&(a.curTool()&&a.curTool().deactive(),a.tools[e].active(),a.curTool(a.tools[e]))}};return new a});