class CoffinBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    if(Math.abs(this.actor.getX() - PlayerPositionX) < 2 && (Math.abs(this.actor.getY() - PlayerPositionY) < 1)){
      TextBoxes[0].setZ(1);
      if(Sup.Input.wasKeyJustPressed("RETURN")){
        if(PlayerEuroes > -1){
          this.actor.spriteRenderer.setAnimation("Open", false);
          HidePowerup.setX(this.actor.getX());
          HidePowerup.setY(this.actor.getY()+2);
        }
      }
    } else{
      TextBoxes[0].setZ(-11);
    }
  }
}
Sup.registerBehavior(CoffinBehavior);
