
class WireMaker {
  constructor(starting) {
    this.starting = starting;
  }

  make(ending) {
    new Wire(this.starting, ending)
  }
}

class Wire extends Phaser.GameObjects.Line {
  constructor(starting, ending) {
      super(starting.scene, 0, 0, 0, 0, 0, 0, 0xFF0000);

      this.starting = starting;
      this.ending = ending;

      this.place();

      this.scene.add.existing(this);
      this.setLineWidth(WIRE_WIDTH);
  }

  place() {
    var deltaX = this.ending.x - this.starting.x;
    var deltaY = this.ending.y - this.starting.y;

    var angle_radians = Math.atan(deltaY / deltaX);
    angle_radians = Math.abs(angle_radians);

    var startingX = this.starting.x;
    var startingY = this.starting.y;

    var endingX = this.ending.x;
    var endingY = this.ending.y;

    var xModifier = (BREADBOARD_POINT_INNER_RADIUS * Math.cos(angle_radians));
    var yModifier = (BREADBOARD_POINT_INNER_RADIUS * Math.sin(angle_radians));

    if(deltaX < 0) {
      startingX -= xModifier;
      endingX += xModifier;
    } else {
      startingX += xModifier;
      endingX -= xModifier;
    }

    if(deltaY < 0) {
      startingY -= yModifier;
      endingY += yModifier;
    } else {
      startingY += yModifier;
      endingY -= yModifier;
    }

    this.setTo(startingX, startingY, endingX, endingY);

    this.starting.off("pointerover")
  }
}
