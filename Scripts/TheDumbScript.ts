class TheDumbScriptBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    if(Sup.Input.wasKeyJustPressed("SPACE")) {
      Sup.loadScene("Scenes/Ending");
    }
  }
}
Sup.registerBehavior(TheDumbScriptBehavior);
