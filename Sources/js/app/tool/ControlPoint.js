define(function (){
	var ControlPoint = function (x,y){
		this.x = x || 0;
		this.y = y || 0;
	};
	ControlPoint.prototype = {
		init : function (){

		},
		draw : function (ratio){
	        ratio = ratio || 1;
	        var self = this;
	        self.ctx.beginPath();
	        self.ctx.rect(this.x - this.CONTROL_POINT_WIDTH / 2,this.y - this.CONTROL_POINT_WIDTH / 2 ,this.CONTROL_POINT_WIDTH,this.CONTROL_POINT_WIDTH);
	        //self.ctx.arc(this.x*ratio, this.y*ratio, this.CONTROL_POINT_RADIUS, 0, 2*Math.PI, false);
		},
		print : function (ratio){
	        this.draw(ratio);
	        this.ctx.save();
	        this.ctx.strokeStyle = this.CONTROL_POINT_BORDER_COLOR;
	        this.ctx.fillStyle = this.CONTROL_POINT_COLOR;
	        this.ctx.stroke();
	        this.ctx.fill();
	        this.ctx.restore();
		},
		isInPoint : function (x,y){
			x = x || window.app.stage.mouseX() || 0;
			y = y || window.app.stage.mouseY() || 0;
	        var self = this;
	        self.draw();
	        if(self.ctx.isPointInPath(x, y)) {
	            return true;
	        }
	        return false;
		}

	};
	ControlPoint.prototype.CONTROL_POINT_COLOR = "#ffffff";
	ControlPoint.prototype.CONTROL_POINT_BORDER_COLOR = "#ff0000";
	ControlPoint.prototype.CONTROL_POINT_WIDTH = 7;

	return ControlPoint;
});