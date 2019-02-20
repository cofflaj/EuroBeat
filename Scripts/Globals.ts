let Euros:Sup.Actor[] = [];
let Fires:Sup.Actor[] = [];
let HPHats:Sup.Actor[] = [];
let PlayerCharacter:Sup.Actor;
let PlayerHealth = 10;
let PlayerEuroes = 0;
let PlayerNumberOfJumps = 1;
let PlayerHasCoinSmash = false;
let PlayerHasShield = false;
let PlayerHasGlide = false;
let HidePowerup:Sup.Actor;
let GlidePowerup:Sup.Actor;
let JumpPowerup1:Sup.Actor;
let JumpPowerup2:Sup.Actor;
let CoinPickup:Sup.Actor;
let TextBoxes:Sup.Actor[] = [];
let Stage = 0;

function DetectCollisions(obj1:Sup.Actor, obj2:Sup.Actor) {
  if(obj1.getX()+obj1.arcadeBody2D.getSize().width/2 > obj2.getX()-obj2.arcadeBody2D.getSize().width/2){
    if(obj1.getX()-obj1.arcadeBody2D.getSize().width/2 < obj2.getX()+obj2.arcadeBody2D.getSize().width/2) {
      if(obj1.getY()+obj1.arcadeBody2D.getSize().height/2 > obj2.getY()-obj2.arcadeBody2D.getSize().height/2) {
        if(obj1.getY()-obj1.arcadeBody2D.getSize().height/2 < obj2.getY()+obj2.arcadeBody2D.getSize().height/2) {
          return true;
        }
      }
    }
  }
}

function removeFromArray(actor:Sup.Actor, array:Array<Sup.Actor>) {
  var actorIndex;
  for(var i = 0; i<array.length; i++) {
    if(array[i] == actor){
      actorIndex = i;
      break;
    }
  }
  array = array.splice(actorIndex, 1);
}

function LoadStage(x:number) {
  
  switch(x) {
    case 1:
      LoadStageOne();
      break;
    case 2:
      LoadStageTwo();
      break;
    case 3:
      LoadStageThree();
      break;
    case 4:
      LoadStageFour();
      break;
    case 5:
      LoadStageFive();
      break;
    case 6:
      LoadStageSix();
      break;
    case 7:
      LoadStageSeven();
      break;
    default:
      Sup.loadScene("Scenes/Tutorial");
          }
  
}