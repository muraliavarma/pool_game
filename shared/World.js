"use import";

import timestep.ui.UIView as UIView;
import timestep.View as View;
import timestep.TextView as TextView;
import timestep.device;

exports = Class(UIView, function(supr) {
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

		this.isBlueClicked = false;
    }

    this.buildView = function() {
		this.redRect = new UIView({
			parent: this,
			opacity: 0.5,
			backgroundColor: "#882222",
			x: 150,
			y: 300,
			width: 20,
			height: 20,
			zIndex: 9999
		});

		this.redRect.onInputMove = bind(this,function() {
			this.camera.x += 1;
		});

		this.blueRect = new UIView({
			parent: this,
			opacity: 0.5,
			backgroundColor: "#222288",
			x: 180,
			y: 300,
			width: 20,
			height: 20,
			zIndex: 9999
		});

		this.blueRect.onInputStart = bind(this,function() {
			this.isBlueClicked = true;

		});

		this.blueRect.onInputOut = bind(this,function() {
			this.isBlueClicked = false;
		});

    }

    this.render = function() {
    	if(this.isBlueClicked){
  	    	//for(var i=0; i < this.world.vertices.length; i++){
			//	this.world.vertices[i].z += 1;
			//};
			this.camera.ry += 0.01;
			this.camera.z = 400 - Math.cos(this.camera.ry) * 400;
			this.camera.x = Math.sin(this.camera.ry) * 400;
		}
  		this.ctx.fillStyle = "#0000FF";
		var camera = this.camera;
    	for(var i=0; i < this.world.vertices.length; i++){
			var vertex = this.world.vertices[i];
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

			this.ctx.fillRect(posX-size/2, posY-size/2, size, size);
		}
    }
});