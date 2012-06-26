"use import";
  //use the SDK import system
  //this must be the first line in the file
  
  //import the GC namespace
  import GC;
  import .views.Game as Game;
  import .tools.Camera as Camera;
  
  exports = Class(GC.Application, function() {
  
      this._settings = {
          logsEnabled: window.DEV_MODE,
          noTimestep: false,
          showFPS: window.DEV_MODE,
          alwaysRepaint: true
      };
  
      this.initUI = function() {
          this.camera = new Camera();
      }
  
      this.launchUI = function() {
          this.game = new Game({parent: this.view, width: this.width, height: this.height, tag: 'game'});

      }
  });