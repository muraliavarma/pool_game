"use import";

import timestep.View as View;
import timestep.TextView as TextView;

exports = Class(View, function(supr) {

	this.ROTATE_ANGLE = 0.025;
	this.ROTATE_RADIUS = 750;
	this.CAMERA_HEIGHT = -200;

	this.init = function() {
		supr(this, "init", arguments);
		this.camera = {
        	x: 0,
        	y: this.CAMERA_HEIGHT,
        	z: -this.ROTATE_RADIUS,
        	rx: 0,
        	ry: 0,
        	rz: 0,
			depth: 750,
			offsetX: 160,
			offsetY: 0
		};

		this.subscribe('turnRight', this, '_turnRight');
		this.subscribe('turnLeft', this, '_turnLeft');
	}

	this.tick = function() {
		if(this.isTurnRight){
			this.camera.ry += this.ROTATE_ANGLE;
			this.camera.z = -Math.cos(this.camera.ry) * this.ROTATE_RADIUS;
			this.camera.x = Math.sin(this.camera.ry) * this.ROTATE_RADIUS;
		}
		else if(this.isTurnLeft){
			this.camera.ry -= this.ROTATE_ANGLE;
			this.camera.z = -Math.cos(this.camera.ry) * this.ROTATE_RADIUS;
			this.camera.x = Math.sin(this.camera.ry) * this.ROTATE_RADIUS;
		}
	}

	this.toCanvas = function(vertex) {
		var camera = this.camera;
		var dx = vertex.x - camera.x;
		var dy = vertex.y - camera.y;
		var dz = vertex.z - camera.z;
		
		var d1x = Math.cos(camera.ry)*dx + Math.sin(camera.ry)*dz;
		var d1y = dy;
		var d1z = Math.cos(camera.ry)*dz - Math.sin(camera.ry)*dx;
		if(d1z > 0){
			var scale = camera.depth / d1z;
			var posX = scale * d1x + camera.offsetX;
			var posY = scale * d1y + camera.offsetY;
			var size = scale * 10;
		}

		return {x: posX - size/2, y: posY - size/2, s: size};
	}

	this._turnRight = function(isTurn) {
		this.isTurnRight = isTurn;
	}

	this._turnLeft = function(isTurn) {
		this.isTurnLeft = isTurn;
	}

});