class TitleScreenScriptBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    if(Sup.Input.isKeyDown("UP")||Sup.Input.isKeyDown("RIGHT")||Sup.Input.isKeyDown("LEFT")||Sup.Input.isKeyDown("DOWN")) {
      Sup.loadScene("Scenes/Tutorial");
    }
  }
}
Sup.registerBehavior(TitleScreenScriptBehavior);
