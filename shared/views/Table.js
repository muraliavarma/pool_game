"use import";

import timestep.ui.UIView as UIView;

exports = Class(UIView, function(supr) {

	this.init = function() {
		supr(this, "init", arguments);

		this._ctx = GC.app.getCanvas().getContext('2d');

		this._halfTableWidth = 100;
		this._halfTableLength = 200;

		this._legHeight = 50;
		this._legInset = 20;
		this._legRadius = 5;

		this.tableTop = [
			{x: this._halfTableWidth, y: 0, z: this._halfTableLength},		//top right
			{x: this._halfTableWidth, y: 0, z: -this._halfTableLength},		//bottom right
			{x: -this._halfTableWidth, y: 0, z: -this._halfTableLength},	//bottom left
			{x: -this._halfTableWidth, y: 0, z: this._halfTableLength}		//top left
		];

		GC.app.camera.subscribe('AngleChanged', this, '_zSort');

	}

	this.buildView = function() {
		supr(this, "buildView", arguments);		
	}

	this.render = function() {
		var tableTop2d = [];
		for(var i = 0; i < this.tableTop.length; i++){
			tableTop2d.push(GC.app.camera.toCanvas(this.tableTop[i]));
		}

		this._renderLegs(tableTop2d);

		var ctx = this._ctx;
		ctx.beginPath();
		for(var i = 0; i < tableTop2d.length; i++){
			var vertex = tableTop2d[i];
			if(i == 0){
				ctx.moveTo(vertex.x, vertex.y);
			}
			else{
				ctx.lineTo(vertex.x, vertex.y);
			}
		}
		ctx.closePath();
		ctx.fillStyle = "#22CC22";
		ctx.fill();
	}

	this._renderLegs = function(tableTop2d) {
		var ctx = this._ctx;
		ctx.fillStyle = "#CC8833";
		for(var i = 0; i < tableTop2d.length; i++){
			var vertex = tableTop2d[i];
			ctx.beginPath();
			var r = this._legRadius * vertex.s/10;
			var h = this._legHeight * vertex.s/10;
			ctx.moveTo(vertex.x - r, vertex.y);
			ctx.lineTo(vertex.x + r, vertex.y);
			ctx.lineTo(vertex.x + r, vertex.y + h);
			ctx.lineTo(vertex.x - r, vertex.y + h);
			ctx.closePath();
			ctx.fill();
		}
	}

	this._zSort = function() {
		//this is called whenever the camera angle is changed
	}

});