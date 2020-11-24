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

     createBreadboard(this, BREADBOARD_NUM_SECTIONS, 0, 300);
   }
   function update() {

   }

   function createBreadboard(scene, num_sections, base_x, base_y) {
     for(var x = 0; x < num_sections; x++) {
       var x_loc = base_x;
       var y_loc = base_y - y * ();

       //need to figure out how distance would work in this case?
       createBreadboardRow(scene, BREADBOARD_ROW_LENGTH, x_loc, y_loc)
     }
   }

   function createBreadboardSection(scene, num_rows, base_x, base_y) {

      for(var x = 0; x < num_rows; x++) {
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
