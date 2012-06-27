"use import";

import timestep.ImageView as ImageView;
import timestep.ui.UIView as UIView;
import timestep.TextView as TextView;

exports = Class(UIView, function(supr) {
    //class contructor
    this.init = function() {
        supr(this, "init", arguments);

    }

    this.buildView = function() {
    	this.bottomHUD = new UIView({
    		parent: this,
    		y: 400,
    		opacity: 0.5,
    		backgroundColor: '#222222'
    	});

        this.turnLeft = new ImageView({
			parent: this.bottomHUD,
			autoSize: true,
			x: 10,
			y: 10,
			image: 'resources/images/leftArrow.png'
		});

        this.turnRight = new ImageView({
			parent: this.bottomHUD,
			autoSize: true,
			x: 50,
			y: 10,
			image: 'resources/images/rightArrow.png'
		});

		this.turnLeft.onInputStart = function() {
			GC.app.camera.publish('TurnLeft', true);
		}

		this.turnLeft.onInputOut = function() {
			GC.app.camera.publish('TurnLeft', false);
		}

		this.turnRight.onInputStart = function() {
			GC.app.camera.publish('TurnRight', true);
		}

		this.turnRight.onInputOut = function() {
			GC.app.camera.publish('TurnRight', false);
		}

    }
});