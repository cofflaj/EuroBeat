class GlidePowerupBehavior extends Sup.Behavior {
  awake() {
    GlidePowerup = this.actor;
  }

  update() {
    if(DetectCollisions(this.actor, PlayerCharacter)) {
      this.actor.spriteRenderer.setOpacity(0);
    }
  }
}
Sup.registerBehavior(GlidePowerupBehavior);
