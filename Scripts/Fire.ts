class FireBehavior extends Sup.Behavior {
  awake() {
    Fires.push(this.actor);
  }

  update() {
    
  }
}
Sup.registerBehavior(FireBehavior);
