"use import";

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
			depth: 350,
			width: 200,
			height: 200,
			offsetX: 100,
			offsetY: 100
		};
    }

    this.buildView = function() {
		var redRect = new View({
			parent: this,
			opacity: 0.5,
			backgroundColor: "#882222",
			width: 200,
			height: 200,
			zIndex: 2
		});
    }

    this.render = function() {
    	this.ctx.fillStyle = "#0000FF";
    	for(var i=0; i < this.world.vertices.length; i++){
			var vertex = this.world.vertices[i];
			this.world.vertices[i].z += 1;
			var scale = this.camera.depth / vertex.z;
			var posX = scale * vertex.x + this.camera.offsetX;
			var posY = scale * vertex.y + this.camera.offsetY;
			var size = scale * 10;

			this.ctx.fillRect(posX-size/2, posY-size/2, size, size);
		}
    }
});