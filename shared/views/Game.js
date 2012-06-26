"use import";

import timestep.ui.UIView as UIView;
import timestep.TextView as TextView;
import .Table as Table;

exports = Class(UIView, function(supr) {
    //class contructor
    this.init = function() {
        supr(this, "init", arguments);

    }

    this.buildView = function() {
        this.table = new Table({parent: this, width: this.width, height: this.height, tag: 'table'});
    }
});