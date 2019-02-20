class HPScriptBehavior extends Sup.Behavior {
  
  awake() {
    
  }

  update() {
    
    
    if(PlayerHealth < 1) {
      this.actor.destroy();
    }
    this.actor.spriteRenderer.setAnimation(PlayerHealth.toString());
    
  }
  
}

Sup.registerBehavior(HPScriptBehavior);
