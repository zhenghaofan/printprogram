define(["jquery","knockout","app/Util"],function(e,t,n){var r=function(){var e=this;e.username=t.observable(),e.password=t.observable(),e.islogin=!1,e.check=function(){e.islogin=!0,n.Event.dispatch("setLocation",e,"#prodution")}};return new r});