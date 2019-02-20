class TextBehavior extends Sup.Behavior {
  awake() {
    TextBoxes.push(this.actor);
  }

  update() {
    
  }
}
Sup.registerBehavior(TextBehavior);
