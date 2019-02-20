class CameraBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
      this.actor.setX(PlayerPositionX);
  }
}
Sup.registerBehavior(CameraBehavior);
