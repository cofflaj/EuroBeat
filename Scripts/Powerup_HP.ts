class HPHatBehavior extends Sup.Behavior {
  awake() {
    HPHats.push(this.actor);
  }

  update() {
    
  }
}
Sup.registerBehavior(HPHatBehavior);
