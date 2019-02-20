class JumpPowerup2Behavior extends Sup.Behavior {
  
  jumplvl = 3;
  awake() {
    JumpPowerup2 = this.actor;
  }

  update() {
    if(DetectCollisions(this.actor, PlayerCharacter)){
      this.actor.spriteRenderer.setOpacity(0);
    }
  }
}
Sup.registerBehavior(JumpPowerup2Behavior);
