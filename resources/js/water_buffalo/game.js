var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload () {
  this.load.image('tes', 'assets/download.jpg')
}

function create () {

}

function update () {

}
