"use import";

import timestep.ui.UIView as UIView;
import ..tools.utils as utils;

exports = Class(UIView, function(supr) {

	this.init = function() {
		supr(this, "init", arguments);

		this._ctx = GC.app.getCanvas().getContext('2d');

		this._halfTableWidth = 100;
		this._halfTableLength = 200;

		this._legHeight = 75;
		this._legInset = 20;
		this._legRadius = 5;

		this._rimHeight = 5;
		this._rimWidth = 3;

		this.tableTop = [
			{x: this._halfTableWidth, y: 0, z: this._halfTableLength},		//top right
			{x: this._halfTableWidth, y: 0, z: -this._halfTableLength},		//bottom right
			{x: -this._halfTableWidth, y: 0, z: -this._halfTableLength},	//bottom left
			{x: -this._halfTableWidth, y: 0, z: this._halfTableLength}		//top left
		];

		this._buildRims();

		GC.app.camera.subscribe('AngleChanged', this, '_zSort');

	}

	this.buildView = function() {
		supr(this, "buildView", arguments);		
	}

	this._buildRims = function() {
		this.rims = [];
		var tt = this.tableTop;
		for(var i = 0; i < tt.length; i++) {
			var rim = [];
			var nextI = (i + 1) % tt.length;
			var xOffset = 0;
			var zOffset = 0;
			if(tt[i].x === tt[nextI].x){
				xOffset = this._rimWidth * (tt[i].z > tt[nextI].z ? 1 : -1);
			}
			else{
				zOffset = this._rimWidth * (tt[i].x > tt[nextI].x ? -1 : 1);
			}
			var rimTop = [
				{x: tt[i].x, y: -this._rimHeight, z: tt[i].z},
				{x: tt[i].x + xOffset, y: -this._rimHeight, z: tt[i].z + zOffset},
				{x: tt[nextI].x + xOffset, y: -this._rimHeight, z: tt[nextI].z + zOffset},
				{x: tt[nextI].x, y: -this._rimHeight, z: tt[nextI].z}
			];
			rim.push(rimTop);
			this.rims.push(rim);
		}
	}

	this.render = function() {
		this.tableTop2d = [];
		for(var i = 0; i < this.tableTop.length; i++){
			this.tableTop2d.push(GC.app.camera.toCanvas(this.tableTop[i]));
		}

		this._renderLegs();
		this._renderTableTop();
		this._renderRims();
	}

	this._renderLegs = function() {
		var ctx = this._ctx;
		ctx.fillStyle = "#CC8833";
		for(var i = 0; i < this.tableTop2d.length; i++){
			var vertex = this.tableTop2d[i];
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

	this._renderTableTop = function() {
		utils.fillPoly({
			ctx: this._ctx,
			vertices: this.tableTop2d,
			color: "#228822"
		});
	}

	this._renderRims = function() {
		for(var i = 0; i < this.rims.length; i++) {
			var rim = this.rims[i];
			for(var j = 0; j < rim.length; j++) {
				var rimSection = rim[j];
				var rimSection2d = [];
				for(var k = 0; k < rimSection.length; k++) {
					rimSection2d.push(GC.app.camera.toCanvas(rimSection[k]));
				}
				utils.fillPoly({
					ctx: this._ctx,
					vertices: rimSection2d,
					color: "#CC8833"
				});
			}
		}
	}

	this._zSort = function() {
		//this is called whenever the camera angle is changed
	}

});