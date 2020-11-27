class Wire extends Phaser.GameObjects.Sprite {

  static KEY = 'breadboard_connector';

  constructor(scene) {
      var mouse = scene.input.activePointer;

      super(scene, mouse.worldX, mouse.worldY, Wire.KEY, 1);

      scene.add.existing(this);

      this.angle = 90

  }

  preUpdate(time, delta) {
    var mouse = this.scene.input.activePointer;
    this.x = mouse.worldX;
    this.y = mouse.worldY;
  }
}
