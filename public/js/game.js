const BREADBOARD_ROW_LENGTH = 5;
const BREADBOARD_NUM_ROWS = 30;
const BREADBOARD_NUM_SECTIONS = 2;

const BREADBOARD_POINT_SIZE = 32;
const BREADBOARD_POINT_DISTANCE = 15;
const BREADBOARD_ROW_DISTANCE = BREADBOARD_POINT_SIZE + BREADBOARD_POINT_DISTANCE;

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
            'assets/breadboard_points.png',
            { frameWidth: 32, frameHeight: 32 }
        );
   }

   function create () {

     createBreadboardSection(this, BREADBOARD_NUM_ROWS, 0, 300);
   }
   function update() {

   }

   function createBreadboardGroup() {

   }

   function createBreadboardSection(scene, num_rows, base_x, base_y) {

      for(var x = 0; x < num_rows; x++) {
        console.log("here")
        var x_loc = base_x + x * BREADBOARD_ROW_DISTANCE;
        var y_loc = base_y;

        createBreadboardRow(scene, BREADBOARD_ROW_LENGTH, x_loc, y_loc)
      }
   }

   /*
    Base x and base y is the location of the top most point
    */
   function createBreadboardRow(scene, row_length, base_x, base_y) {
     var row = scene.physics.add.staticGroup()

     for (var x = 0; x < row_length; x++) {
       var x_loc = base_x; //x_loc should be the same
       var y_loc = base_y - BREADBOARD_ROW_DISTANCE * x;

       var newPoint = row.create(x_loc, y_loc, 'breadboard_points');
     }
   }
