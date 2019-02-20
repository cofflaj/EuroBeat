class JumpPowerupBehavior extends Sup.Behavior {
  
  jumplvl = 2;
  
  awake() {
    JumpPowerup1 = this.actor;
  }

  update() {
    if(DetectCollisions(this.actor, PlayerCharacter)){
      this.actor.spriteRenderer.setOpacity(0);
    }
  }
}
Sup.registerBehavior(JumpPowerupBehavior);
