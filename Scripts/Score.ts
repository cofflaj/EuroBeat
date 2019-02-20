class ScoreBehaviour extends Sup.Behavior {
  
  awake() {
    
  }

  update() {
    
    this.actor.textRenderer.setText(PlayerEuroes.toString());
    
  }
}
Sup.registerBehavior(ScoreBehaviour);
