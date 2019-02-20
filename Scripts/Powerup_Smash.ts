class SmashPowerupBehavior extends Sup.Behavior {
  awake() {
    CoinPickup = this.actor;
  }

  update() {   
    if(DetectCollisions(this.actor, PlayerCharacter)) {
      this.actor.spriteRenderer.setOpacity(0);
    }
  }
}
Sup.registerBehavior(SmashPowerupBehavior);
