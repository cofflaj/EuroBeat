class UIBehaviour extends Sup.Behavior {
  awake() {
    
  }

  update() {
    this.actor.setX(PlayerPositionX - 8.5);
  }
}
Sup.registerBehavior(UIBehaviour);
