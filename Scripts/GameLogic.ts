class GameLogicBehavior extends Sup.Behavior {
  
  NextStageCondition;
  NextStageCall;
  
  awake() {
    
  }

  update() {
    if(Euros.length < 1) {
      //LoadStageTwo();
    }
  }
}
Sup.registerBehavior(GameLogicBehavior);
