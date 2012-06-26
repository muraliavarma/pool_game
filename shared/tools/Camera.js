import lib.PubSub as PubSub;

exports = Class(PubSub, function(supr){

	this.init = function() {
		this.camera = {
        	x: 0,
        	y: 0,
        	z: 0,
        	rx: 0,
        	ry: 0,
        	rz: 0,
			depth: 350,
			width: 200,
			height: 200,
			offsetX: 100,
			offsetY: 100
		};
	}

	this.toCanvas = function(vertex){
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

});