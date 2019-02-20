class GameOverRestartBehaviour extends Sup.Behavior {
  awake() {
    
  }

  update() {
    if(Sup.Input.wasKeyJustPressed("SPACE")) {
      Euros = [];
      Fires = [];
      HPHats = [];
      Sup.loadScene("Scenes/Tutorial");
    }
  }
}
Sup.registerBehavior(GameOverRestartBehaviour);
