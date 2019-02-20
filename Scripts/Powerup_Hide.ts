class HidePowerupBehavior extends Sup.Behavior {
  
  awake() {
    HidePowerup = this.actor;
  }

  update() {
    if(DetectCollisions(this.actor, PlayerCharacter)) {
      this.actor.spriteRenderer.setOpacity(0);
    }
  }
}

Sup.registerBehavior(HidePowerupBehavior);
