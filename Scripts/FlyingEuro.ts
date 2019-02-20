class FlyingEuroBehaviour extends Sup.Behavior {
  
  speed = .02;
  currentSpeed =.05;
  decending = true;
  alwaysFollow = false;
  
  
  die() {
    
      removeFromArray(this.actor, Euros);
      this.actor.destroy();    
  }
  
  
  awake() {
    Euros.push(this.actor);
    this.actor.arcadeBody2D.setCustomGravityY(0);
    this.speed = this.speed * (1 + Math.random()/2)
  }

  update() {
    
    
    for(var i = 0; i < Fires.length; i++){
      if(DetectCollisions(this.actor, Fires[i])) {
        PlayerEuroes++;
        this.die();
      }
    }
    
    let velocity = this.actor.arcadeBody2D.getVelocity();
    
    
    if(Math.abs(this.actor.getX() - PlayerPositionX) < 11 || this.alwaysFollow){
      if(this.actor.getY() > PlayerPositionY + 0){
        velocity.y = -this.speed * 2;
        this.decending = true;
      }
      else if(this.actor.getY() < PlayerPositionY - 1) {
        velocity.y = this.speed;
        this.decending = false;
      }
      else {
        velocity.y = 0;
        this.decending = true;
      }
      
      if(this.decending) {
        this.currentSpeed = this.speed * 4;
        this.actor.spriteRenderer.setAnimation("Decending");
      }
      else {
        this.currentSpeed = this.speed;
        this.actor.spriteRenderer.setAnimation("Flying");
           }
      
      if(this.actor.getX() > PlayerPositionX + .5){
        velocity.x = -this.currentSpeed;
      }
      else if(this.actor.getX() < PlayerPositionX - .5) {
        velocity.x = this.currentSpeed;
      }
      else {
        velocity.x = 0;
        //this.actor.spriteRenderer.setAnimation("Idle");
      }
    }
    
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}
Sup.registerBehavior(FlyingEuroBehaviour);
