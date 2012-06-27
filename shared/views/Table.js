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
		this._rimWidth = 10;

		this._ballRadius = 5;

		this.tableTop = [
			{x: -this._halfTableWidth, y: 0, z: -this._halfTableLength},	//bottom left
			{x: -this._halfTableWidth, y: 0, z: this._halfTableLength},		//top left
			{x: this._halfTableWidth, y: 0, z: this._halfTableLength},		//top right
			{x: this._halfTableWidth, y: 0, z: -this._halfTableLength}		//bottom right
		];

		this.balls = [
			{x: -this._halfTableWidth + 100, y: -this._ballRadius, z: -this._halfTableLength + 10},
			{x: -this._halfTableWidth + 20, y: -this._ballRadius, z: this._halfTableLength - 10}
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
		this._nearestCorner = 0;
		var nearestVal = -1000000;
		for(var i = 0; i < this.tableTop.length; i++){
			var tt2d = GC.app.camera.toCanvas(this.tableTop[i]);
			if(tt2d.y > nearestVal){
				nearestVal = tt2d.y;
				this._nearestCorner = i;
			}
			this.tableTop2d.push(tt2d);
		}

		this._renderLegs();
		this._renderTableTop();
		this._renderFarRims();
		this._renderBalls();
		this._renderNearRims();
	}

	this._renderLegs = function() {
		var ctx = this._ctx;
		ctx.fillStyle = "#995522";
		for(var i = 0; i < this.tableTop2d.length; i++){
			var vertex = this.tableTop2d[i];
			ctx.beginPath();
			var r = this._legRadius * vertex.s;
			var h = this._legHeight * vertex.s;
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

	this._renderRims = function(rimIndices) {
		//if closest corner is 1, far indices will be 2 and 3, near indices will be 0 and 1
		for(var i = 0; i < rimIndices.length; i++) {
			var rim = this.rims[rimIndices[i]];
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

	this._renderFarRims = function() {
		var rimIndices = [];
		var tt = this.tableTop;
		rimIndices.push((this._nearestCorner + 1) % tt.length);
		rimIndices.push((this._nearestCorner + 2) % tt.length);
		this._renderRims(rimIndices);
	}

	this._renderNearRims = function() {
		var rimIndices = [];
		var tt = this.tableTop;
		rimIndices.push(this._nearestCorner);
		rimIndices.push((this._nearestCorner - 1 + tt.length) % tt.length);
		this._renderRims(rimIndices);
	}

	this._renderBalls = function() {
		this.balls2d = [];
		var ctx = this._ctx;
		ctx.fillStyle = "#AA2222";

		for(var i = 0; i < this.balls.length; i++){
			var balls2d = (GC.app.camera.toCanvas(this.balls[i]));
			ctx.beginPath();
			ctx.arc(balls2d.x, balls2d.y, this._ballRadius * balls2d.s, 2 * Math.PI, 0, true);
			ctx.closePath();
			ctx.fill();
		}
	}

	this._zSort = function() {
		//this is called whenever the camera angle is changed
	}

});