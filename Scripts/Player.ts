let PlayerPositionX = 0;
let PlayerPositionY = 0;
Sup.ArcadePhysics2D.setGravity(0, -0.02);

class PlayerBehaviour extends Sup.Behavior {
  speed = 0.15;
  jumpSpeed = 0.32;
  height = 1.7;
  width = .7;
  feet = .4;
  Yoffset = -0.65;
  maxJumps = 1;
  jumps = 0;
  invincibleFramesRemaining = 0;
  justHitCounter = 0;
  healthLostThisFrame = 0;
  twoEuroDamage = 1;
  deathTimer = 240;
  notDead = true;
  canGlide = false;
  canSmash = false;
  canHide = false;

  solidBodies: Sup.ArcadePhysics2D.Body[] = [];
  platformBodies: Sup.ArcadePhysics2D.Body[] = [];

  die() {
    this.actor.destroy();
    Sup.loadScene("Scenes/Game Over");
  }
  
  awake() {
    PlayerCharacter = this.actor;
    let solidActors = Sup.getActor("Solids").getChildren();
    for (let solidActor of solidActors) this.solidBodies.push(solidActor.arcadeBody2D);
    let platformActors = Sup.getActor("Platforms").getChildren();
    for (let platformActor of platformActors) this.platformBodies.push(platformActor.arcadeBody2D);
    this.canHide = PlayerHasShield;
    this.canSmash = PlayerHasCoinSmash;
    this.canGlide = PlayerHasGlide
    this.maxJumps = PlayerNumberOfJumps;
    this.jumps = this.maxJumps;
  }

  update() {
    
    if(Stage == 0) {
    if(!this.canHide&&DetectCollisions(this.actor, HidePowerup)) {
      this.canHide = true;
      PlayerHasShield = true;
    } }
    
    if(Stage == 2) {
      if(!this.canGlide&&DetectCollisions(this.actor, GlidePowerup)) {
      this.canGlide = true;
      PlayerHasGlide = true;
    } }
    
    if(Stage == 4) {
    if(!this.canSmash&&DetectCollisions(this.actor, CoinPickup)) {
      this.canSmash = true;
      PlayerHasCoinSmash = true;
    } }
    
    if(Stage == 3){
    if(PlayerNumberOfJumps < 3 && DetectCollisions(this.actor, JumpPowerup1)) {
      PlayerNumberOfJumps = 2;
      this.maxJumps = 2;
    } }
    
    if(Stage == 5) {
    if(PlayerNumberOfJumps < 4 && DetectCollisions(this.actor, JumpPowerup2)) {
      PlayerNumberOfJumps = 3;
      this.maxJumps = 3;
    } }
    
    if(this.deathTimer === 240){
    PlayerPositionX = this.actor.getX();
    PlayerPositionY = this.actor.getY();
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this.solidBodies);
    let touchSolids = this.actor.arcadeBody2D.getTouches().bottom;
    let velocity = this.actor.arcadeBody2D.getVelocity();

    let touchPlatforms = false;
    if (velocity.y < 0) {
      let position = this.actor.getLocalPosition();
      this.actor.arcadeBody2D.setSize(this.width, this.feet);
      this.actor.arcadeBody2D.setOffset({ x: 0, y: this.Yoffset });
      this.actor.arcadeBody2D.warpPosition(position);

      for (let platformBody of this.platformBodies) {
        Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, platformBody);
        if (this.actor.arcadeBody2D.getTouches().bottom) {
          touchPlatforms = true;
          velocity.y = 0;
          break;
        }
      }

      position = this.actor.getLocalPosition();
      this.actor.arcadeBody2D.setSize(this.width, this.height);
      this.actor.arcadeBody2D.setOffset({ x: 0, y: 0 });
      this.actor.arcadeBody2D.warpPosition(position);
    }
    if (Sup.Input.isKeyDown("LEFT") && this.justHitCounter < 1) {
      velocity.x = -this.speed;
      this.actor.spriteRenderer.setHorizontalFlip(true);
    } else if (Sup.Input.isKeyDown("RIGHT") && this.justHitCounter < 1) {
      velocity.x = this.speed;
      this.actor.spriteRenderer.setHorizontalFlip(false);
    } else if (this.justHitCounter < 1) velocity.x = 0;

    let touchBottom = touchSolids || touchPlatforms;
    if(touchBottom) {
      this.jumps = this.maxJumps;
    }
    if (touchBottom || this.jumps > 0) {
      if ((Sup.Input.wasKeyJustPressed("UP")) && !Sup.Input.isKeyDown("DOWN")) {
        velocity.y = this.jumpSpeed;
        this.jumps--;
        this.actor.spriteRenderer.setAnimation("Jump", false);
      } else {
        if (velocity.x === 0 && !Sup.Input.isKeyDown("DOWN") && velocity.y === 0) this.actor.spriteRenderer.setAnimation("Stopped");
        else if(!Sup.Input.isKeyDown("DOWN") && velocity.y === 0) {
          this.actor.spriteRenderer.setAnimation("Walking");
        }
      }
    } 
    if (velocity.y < 0 && this.justHitCounter < 1 && !Sup.Input.isKeyDown("DOWN")) this.actor.spriteRenderer.setAnimation("Fall", false);
    
    if (!touchBottom && Sup.Input.isKeyDown("SPACE")&&this.canGlide){
      this.actor.spriteRenderer.setAnimation("Glide");
      velocity.y = -0.025;
    }
    
    // We set the animation to the hide animation and stop the charecter.
    if (Sup.Input.wasKeyJustPressed("DOWN")&&this.canHide){
      this.actor.spriteRenderer.setAnimation("Hide", false);
      velocity.x = 0;
    }
    if (Sup.Input.isKeyDown("DOWN") && this.justHitCounter < 1&&this.canHide){
      velocity.x = 0;
    }
    if(this.invincibleFramesRemaining > 0) {
      this.invincibleFramesRemaining--;
      this.actor.spriteRenderer.setOpacity(.5);
    }
    if(this.justHitCounter > 0){
      this.justHitCounter--;
    }
    if(this.invincibleFramesRemaining < 1){
      this.actor.spriteRenderer.setOpacity(1);
      for(var i = 0; i < Euros.length; i++) {
        if(DetectCollisions(this.actor, Euros[i])) { // added && !Sup.Input.isKeyDown("DOWN") clause, so enemys will bounce back if hitting a hiding player
          if(Sup.Input.isKeyDown("DOWN")){
            velocity.y = 0.2;
            if(this.actor.getX() - Euros[i].getX() >= 0){
              velocity.x = 0.2;
            } else{
              velocity.x = -0.2;
            }
            this.justHitCounter = 20;
          }
          else{
            Sup.Audio.playSound("Sounds/Oof");
            velocity.y = 0.1;
            if(this.actor.getX() - Euros[i].getX() >= 0){
              velocity.x = 0.1;
            } else{
              velocity.x = -0.1;
            }
            this.justHitCounter = 10;
            if(this.healthLostThisFrame < this.twoEuroDamage){
              this.healthLostThisFrame = this.twoEuroDamage;
            }
            this.invincibleFramesRemaining = 60;
          }
        }
      }
    }
    
    
    for(var i = 0; i < Fires.length; i++){
      if(DetectCollisions(this.actor, Fires[i])) {
        PlayerHealth = 0;
      }
    }
    
    for(var i = 0; i < HPHats.length; i++){
      if(DetectCollisions(this.actor, HPHats[i])) {
        PlayerHealth += 5;
        var hat = HPHats[i];
        removeFromArray(HPHats[i],HPHats);
        hat.destroy();
      }
    }
    
    PlayerHealth -= this.healthLostThisFrame;
    if(PlayerHealth<0)PlayerHealth = 0;
    this.healthLostThisFrame = 0;
    this.actor.arcadeBody2D.setVelocity(velocity);
    }
    if(PlayerHealth < 1) {
      if(this.notDead){
        this.actor.spriteRenderer.setSprite("Sprites/Mah Dude fallin over");
        this.actor.arcadeBody2D.setCustomGravityY(0);
        this.actor.spriteRenderer.setAnimation("Dying", false);
        this.notDead = false;
        this.actor.arcadeBody2D.warpPosition(new Sup.Math.Vector2(this.actor.getX(), this.actor.getY()+1));
      }
      this.deathTimer--;
      this.actor.arcadeBody2D.setVelocityX(0);
      this.actor.arcadeBody2D.setVelocityY(0);
      if(this.deathTimer < 1){
        this.die();
      }
    }
    if(PlayerHealth > 10) PlayerHealth = 10;
  }
}
Sup.registerBehavior(PlayerBehaviour);