var config = {
       type: Phaser.AUTO,
       width: 600,
       height: 400,
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
      Breadboard.preload(this);
   }

   function create () {
     this.cameras.main.setBackgroundColor('#000000')

     console.log("here")

     new Breadboard(this);
   }
   function update() {

   }
