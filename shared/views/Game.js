"use import";

import timestep.ui.UIView as UIView;
import .Table as Table;
import .HUD as HUD;

exports = Class(UIView, function(supr) {
	//class contructor
	this.init = function() {
		supr(this, "init", arguments);
	}

	this.buildView = function() {
		this.table = new Table({
			parent: this,
			width: this.width,
			height: this.height,
			tag: 'table'
		});

		this.hud = new HUD({
			parent: this,
			width: this.width,
			height: this.height,
			tag: 'hud'
		});
	}
});