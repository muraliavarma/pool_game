"use import";
  
  import timestep.View as View;
  import timestep.TextView as TextView;
  
  exports = Class(View, function(supr) {
      //class contructor
      this.init = function() {
          supr(this, "init", arguments);
  
          //create a TextView with this View as the parent
          var text = new TextView({
              text: "Hello World!",
              parent: this
          });
      }
  });