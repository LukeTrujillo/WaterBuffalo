const BREADBOARD_ROW_LENGTH = 5;
const BREADBOARD_NUM_ROWS = 30;
const BREADBOARD_NUM_SECTIONS = 2;

const BREADBOARD_POINT_SIZE = 32;
const BREADBOARD_POINT_DISTANCE = 16;
const BREADBOARD_ROW_DISTANCE = (BREADBOARD_POINT_SIZE + BREADBOARD_POINT_DISTANCE);

const BREADBOARD_SECTIONS_SPACE = BREADBOARD_ROW_DISTANCE * 2;
const WIRE_WIDTH = 8;

const BREADBOARD_POINT_INNER_RADIUS = 8;

var breadboard_section = 0;
var breadboard_row = 0
var breadboard_column = 0;

var wiremaker = null;

class BreadboardPoint extends Phaser.GameObjects.Sprite {
  static KEY = 'breadboard_points';

  constructor(scene, x, y, section, row, column) {
    super(scene, x, y, BreadboardPoint.KEY, 0);

    this.section = section;
    this.row = row;
    this.column = column;

    this.setInteractive();

    this.on('pointerdown', this.onPointClick);
    this.on('pointerover', this.onPointerOver);
    this.on('pointerout', this.onPointerOut);

    scene.add.existing(this);
  }

  onPointerOver() {
      this.setFrame(2)
  }
  onPointerOut() {
      this.setFrame(0)
  }

  onPointClick() {
    if(wiremaker == null) {
      wiremaker = new WireMaker(this);
    } else {
      wiremaker.make(this);
      wiremaker = null;
    }

  }

}


function createBreadboard(scene, num_sections, base_x, base_y) {
  breadboard_section = 0;

  for(var x = 0; x < num_sections; x++) {
    breadboard_row = 0;

    var x_loc = base_x + 0.5 * BREADBOARD_POINT_SIZE;
    var y_loc = base_y + 0.5 * BREADBOARD_POINT_SIZE + x * (BREADBOARD_ROW_DISTANCE * BREADBOARD_ROW_LENGTH) + x * BREADBOARD_ROW_DISTANCE;

    //need to figure out how distance would work in this case?
    createBreadboardSection(scene, BREADBOARD_NUM_ROWS, x_loc, y_loc)
    breadboard_section++;
  }
}

function createBreadboardSection(scene, num_rows, base_x, base_y) {

   for(var x = 0; x < num_rows; x++) {
     var x_loc = base_x + x * BREADBOARD_ROW_DISTANCE;
     var y_loc = base_y;

     createBreadboardRow(scene, BREADBOARD_ROW_LENGTH, x_loc, y_loc)
     breadboard_row++;
     breadboard_column = 0;
   }
}

/*
 Base x and base y is the location of the top most point
 */
function createBreadboardRow(scene, row_length, base_x, base_y) {
  var row = scene.physics.add.staticGroup()

  for (var x = 0; x < row_length; x++) {
    var x_loc = base_x; //x_loc should be the same
    var y_loc = base_y + BREADBOARD_ROW_DISTANCE * x;

    var point = new BreadboardPoint(scene, x_loc, y_loc)
    row.add(point)

    if(x + 1 < row_length)
        var point = row.create(x_loc, y_loc + (BREADBOARD_POINT_SIZE - BREADBOARD_POINT_DISTANCE / 2), "breadboard_connector", 0)

    breadboard_column++;
  }
}


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

var config = {
       type: Phaser.AUTO,
       width: 800,
       height: 600,
       physics: {
           default: 'arcade',
           arcade: {
               gravity: { y: 300 },
               debug: false
           }
       },
       scene: {
           preload: preload,
           create: create,
           update: update
       }
   };

   var game = new Phaser.Game(config);

   function preload ()
   {
       this.load.spritesheet('breadboard_points',
            'assets/bread_points_rounded.png',
            { frameWidth: 32, frameHeight: 32 }
        );
        this.load.spritesheet('breadboard_connector',
             'assets/bread_board_connector.png',
             { frameWidth: 8, frameHeight: 16 }
         );
   }

   function create () {
     this.cameras.main.setBackgroundColor('#FFFFFF')
     createBreadboard(this, BREADBOARD_NUM_SECTIONS, 0, 0);
   }
   function update() {

   }
