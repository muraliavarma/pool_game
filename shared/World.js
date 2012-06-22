"use import";

import timestep.ui.UIView as UIView;
import timestep.View as View;
import timestep.TextView as TextView;
import timestep.device;

exports = Class(View, function(supr) {
    //class contructor
    this.init = function() {
        supr(this, "init", arguments);

        this.canvas = GC.app.getCanvas();
        this.ctx = this.canvas.getContext('2d');

        this.world = {
            vertices:[
	            {x:100, y:100, z: 500},
	            {x:-100, y:100, z: 500},
	            {x:-100, y:-100, z: 500},
	            {x:100, y:-100, z: 500},
	            {x:100, y:100, z: 300},
	            {x:-100, y:100, z: 300},
	            {x:-100, y:-100, z: 300},
	            {x:100, y:-100, z: 300}
        ]};

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

    this.buildView = function() {
		this.redRect = new UIView({
			parent: this,
			opacity: 0.5,
			backgroundColor: "#882222",
			x: 300,
			y: 300,
			width: 20,
			height: 20
		});

		this.redRect.onInputSelect = function() {
			this.camera.x += 1;
		}

    }

    this.render = function() {
    	this.ctx.fillStyle = "#0000FF";
    	for(var i=0; i < this.world.vertices.length; i++){
    		var camera = this.camera;
			var vertex = this.world.vertices[i];
			this.world.vertices[i].z += 1;
			var dx = vertex.x - camera.x;
			var dy = vertex.y - camera.y;
			var dz = vertex.z - camera.z;
			
			var d1x = Math.cos(camera.ry)*dx + Math.sin(camera.ry)*dz;
			var d1y = dy;
			var d1z = Math.cos(camera.ry)*dz - Math.sin(camera.ry)*dx;
			if(dz > 0){
				var scale = camera.depth / dz;
				var posX = scale * dx + camera.offsetX;
				var posY = scale * dy + camera.offsetY;
				var size = scale * 10;
			}

			this.ctx.fillRect(posX-size/2, posY-size/2, size, size);
		}
    }
});