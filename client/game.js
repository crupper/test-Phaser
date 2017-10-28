var game = new Phaser.Game(16*32, 600, Phaser.AUTO, document.getElementById('modGame'));


var modGame = function(game) {};



modGame.init = function(){
    game.stage.disableVisibilityChange = true;
};

//modGame.preload = function() {
//    game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
//    game.load.spritesheet('tileset', 'assets/map/tilesheet.png',32,32);
//    game.load.image('sprite','assets/sprites/sprite.png'); // this will be the sprite of the players
//};



modGame.prototype = {
  preload: function() {
    game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tileset', 'assets/map/tilesheet.png',32,32);
    game.load.image('sprite','assets/sprites/sprite.png'); // this will be the sprite of the players
  },
  create: function() {
    modGame.playerMap = {};
    var map = game.add.tilemap('map');
    map.addTilesetImage('tilesheet', 'tileset'); // tilesheet is the key of the tileset in map's JSON file
    var layer;
    for(var i = 0; i < map.layers.length; i++) {
        layer = map.createLayer(i);
    }
    layer.inputEnabled = true; // Allows clicking on the map
    Client.askNewPlayer();
    
    layer.events.onInputUp.add(modGame.getCoordinates, this);
  }
}

modGame.addNewPlayer = function(id,x,y){
    modGame.playerMap[id] = game.add.sprite(x,y,'sprite');
};

modGame.removePlayer = function(id){
    modGame.playerMap[id].destroy();
    delete modGame.playerMap[id];
};

modGame.getCoordinates = function(layer,pointer){
    Client.sendClick(pointer.worldX,pointer.worldY);
};

modGame.movePlayer = function(id,x,y){
    var player = modGame.playerMap[id];
    var distance = Phaser.Math.distance(player.x,player.y,x,y);
    var duration = distance*10;
    var tween = game.add.tween(player);
    tween.to({x:x,y:y}, duration);
    tween.start();
};



game.state.add('modGame',modGame);
game.state.start('modGame');