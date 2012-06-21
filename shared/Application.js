"use import";
  //use the SDK import system
  //this must be the first line in the file
  
  //import the GC namespace
  import GC;
  import .World as World;
  
  exports = Class(GC.Application, function() {
  
      this._settings = {
          logsEnabled: window.DEV_MODE,
          noTimestep: false,
          showFPS: window.DEV_MODE,
          alwaysRepaint: true
      };
  
      this.initUI = function() {
          //do stuff
      }
  
      this.launchUI = function() {
          //create the container view for the Game
          //pass the root view as an option to be the parent
          this.world = new World({parent: this.view, width: this.width, height: this.height});
      }
  });