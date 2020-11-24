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
