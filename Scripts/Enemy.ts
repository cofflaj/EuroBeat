class EnemyBehaviour extends Sup.Behavior {
  
  speed = .03;
  deathZoneY = -4;
  plusOrMinus = 0
  frame = 0;
  
  solidBodies: Sup.ArcadePhysics2D.Body[] = [];
  
  die() {
    
      removeFromArray(this.actor, Euros);
      this.actor.destroy();
  
    
  }
  
  awake() {
    this.speed = this.speed * (Math.random() + 1);
    let solidActors = Sup.getActor("Solids").getChildren();
    for (let solidActor of solidActors) this.solidBodies.push(solidActor.arcadeBody2D);
    let platformActors = Sup.getActor("Platforms").getChildren();
    for (let platformActor of platformActors) this.solidBodies.push(platformActor.arcadeBody2D);
    Euros.push(this.actor);
    //this monstrosity sets the ArcadePhysics2D body scale to match the actors scale -- DOES NOT WORK
    //this.actor.arcadeBody2D.setSize(this.actor.arcadeBody2D.getSize().width * this.actor.getLocalScaleX(),this.actor.arcadeBody2D.getSize().height * this.actor.getLocalScaleY());
  }

  update() {
    
    this.frame++;
    if(this.frame%100 == 0) {
      this.plusOrMinus = 5 - (Math.random() * 10)
    }
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this.solidBodies);
    let velocity = this.actor.arcadeBody2D.getVelocity();
    if(Math.abs(this.actor.getX() - PlayerPositionX) < 11){
      if(this.actor.getX() > PlayerPositionX + .5 + this.plusOrMinus){
        velocity.x = -this.speed;
        this.actor.spriteRenderer.setAnimation("Rolling Left");
      }
      else if(this.actor.getX() < PlayerPositionX - .5 + this.plusOrMinus) {
        velocity.x = this.speed;
        this.actor.spriteRenderer.setAnimation("Rolling Right");
      }
      else {
        velocity.x = 0;
        this.actor.spriteRenderer.setAnimation("Idle");
      }
    }
    /*if(this.actor.getY() < this.deathZoneY) {
      PlayerEuroes++;
      this.die();
    }*/
    
    for(var i = 0; i < Fires.length; i++){
      if(DetectCollisions(this.actor, Fires[i])) {
        PlayerEuroes++;
        this.die();
      }
    }
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}
Sup.registerBehavior(EnemyBehaviour);
