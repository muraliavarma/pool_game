"use import";

import timestep.ui.UIView as UIView;
import timestep.TextView as TextView;

exports = Class(UIView, function(supr) {
    //class contructor
    this.init = function() {
        supr(this, "init", arguments);

    }

    this.buildView = function() {
        this.turnRight = new UIView({
			parent: this,
			opacity: 0.5,
			backgroundColor: "#222222",
			bottom: 50,
			right: 50,
			width: 20,
			height: 20,
			zIndex: 9999
		});

    }
});