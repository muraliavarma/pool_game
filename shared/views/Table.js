"use import";

import timestep.ui.UIView as UIView;

exports = Class(UIView, function(supr) {

    this.halfTableWidth = 100;
    this.halfTableLength = 200;

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

        this.tableTop = [
            {x: this.halfTableWidth, y: 0, z: this.halfTableLength},
            {x: this.halfTableWidth, y: 0, z: -this.halfTableLength},
            {x: -this.halfTableWidth, y: 0, z: -this.halfTableLength},
            {x: -this.halfTableWidth, y: 0, z: this.halfTableLength}
        ];
    }

    this.buildView = function() {
		supr(this, "buildView", arguments);		
    }

    this.render = function() {
        this.ctx.beginPath();
    	for(var i = 0; i < this.tableTop.length; i++){
    		var vertex = GC.app.camera.toCanvas(this.tableTop[i]);
            if(i == 0){
	    		this.ctx.moveTo(vertex.x, vertex.y);
	    	}
	    	else{
	    		this.ctx.lineTo(vertex.x, vertex.y);
	    	}
    	}
        this.ctx.closePath();
        this.ctx.fillStyle = "#00FF00";
        this.ctx.fill();
    }

});