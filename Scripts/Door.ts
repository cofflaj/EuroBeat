class DoorBehaviour extends Sup.Behavior {
  
  stage = 0;
  
  awake() {
    
  }

  update() {
    if(DetectCollisions(PlayerCharacter, this.actor)) {
      //Stage++;
      LoadStage(this.stage)
    }
  }
}
Sup.registerBehavior(DoorBehaviour);
