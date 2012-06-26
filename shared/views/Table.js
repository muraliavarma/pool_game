"use import";

import timestep.ui.UIView as UIView;

exports = Class(UIView, function(supr) {
    //class contructor
    this.init = function() {
        supr(this, "init", arguments);

        this.canvas = GC.app.getCanvas();
        this.ctx = this.canvas.getContext('2d');

        this.vertices = [
    		{x:100, y:100, z: 500},
            {x:-100, y:100, z: 500},
            {x:-100, y:-100, z: 500},
            {x:100, y:-100, z: 500},
            {x:100, y:100, z: 300},
            {x:-100, y:100, z: 300},
            {x:-100, y:-100, z: 300},
            {x:100, y:-100, z: 300}
        ];
    }

    this.buildView = function() {
		supr(this, "buildView", arguments);		
    }

    this.render = function() {
    	this.ctx.fillStyle = "#00FF00";
    	for(var i = 0; i < this.vertices.length; i++){
    		var vertex = GC.app.camera.toCanvas(this.vertices[i]);
    		this.ctx.fillRect(vertex.x, vertex.y, vertex.s, vertex.s);
    	}
    }

});