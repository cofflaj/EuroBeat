class BossBehavior extends Sup.Behavior {
  
  directionX = -1;
  directionY = 1;
  speed = .1;
  randomnessX = 0;
  randomnessY = 0;
  frame = 0;
  swooping = false;
  health = 50;
  
  die() {
    
      removeFromArray(this.actor, Euros);
      this.actor.destroy();
      Sup.loadScene("Scenes/Scene 8")
    
  }
  
  awake() {
    
    this.actor.arcadeBody2D.setCustomGravityY(0);
    Euros.push(this.actor);
    
  }

  update() {
    
    if(this.health < 1) {
      this.die();
    }
    this.frame++;
    
    if(this.frame%60 == 0){
      this.randomnessX = Math.random();
      this.randomnessY = .3 + Math.random();
    }
    
    if(this.actor.getX() < -8) {
      this.directionX = 1;
    } else if(this.actor.getX() > 8.5) {
      this.directionX = -1;
    }
    
    if(this.actor.getY() < -4) {
      this.directionY = 1 * this.randomnessY;
      this.actor.spriteRenderer.setAnimation("Flying");
      this.swooping = false;
    } else if(this.actor.getY() > 5) {
      this.directionY = -2 * this.randomnessY;
      this.actor.spriteRenderer.setAnimation("Decending");
      this.swooping = true;
    }
    for(var i =0; i < Fires.length; i++){
    if(DetectCollisions(this.actor, Fires[i])) {
      this.health--;
    }
  }
    let velocity = this.actor.arcadeBody2D.getVelocity();
    
    velocity.x = this.speed * this.directionX;
    velocity.y = this.speed * this.directionY;
    
    if(this.swooping){
      velocity.x = velocity.x * ( 8 / (this.actor.getY() + 4.2) ) 
    }
    
    this.actor.arcadeBody2D.setVelocity(velocity);
    
  }
  
}
Sup.registerBehavior(BossBehavior);
