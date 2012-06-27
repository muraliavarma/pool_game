exports.fillPoly = function(opts) {
	var ctx = opts.ctx;
	var vertices = opts.vertices;
	var color = opts.color;
	ctx.beginPath();
	for(var i = 0; i < vertices.length; i++){
		var vertex = vertices[i];
		if(i == 0){
			ctx.moveTo(vertex.x, vertex.y);
		}
		else{
			ctx.lineTo(vertex.x, vertex.y);
		}
	}
	ctx.closePath();
	ctx.fillStyle = color;
	ctx.fill();
}