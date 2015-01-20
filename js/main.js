var preload;
var stage;

function guestId(name, colour, dir) {
  return "guest_" + name + "_" + colour + "_" + dir;
}

function initStage() {
  stage = new createjs.Stage("canvas");
  
  var bg = new createjs.Bitmap( preload.getResult("bg") );
  stage.addChild(bg);
  
  var guest = new createjs.Bitmap(preload.getResult(guestId("1", "red", "up")));
  stage.addChild(guest);
  
  stage.update(); 
}

function loadAssets(onComplete) {
  // preload queue
  preload = new createjs.LoadQueue(true);
  
  var manifest = new Array();
  
  var basePath = "data/";
  
  // Add the background
  manifest.push({
    id: "bg",
    src: basePath + "bg.png"
  });
  
  // Add the guests
  var guest_names = ["1","2","3","4","5","6"];
  var guest_colours = ["blue", "red"];
  var guest_dirs = ["up", "down", "left", "right"];
  
  guest_names.forEach(function(name) {
    guest_colours.forEach(function(colour) {
      guest_dirs.forEach(function(dir) {
        var guest = guestId(name, colour, dir);
        manifest.push({
          id: guest,
          src: basePath + guest + ".png"
        });
      });
    });
  });
  
  preload.loadManifest(manifest);  
  preload.on("complete", onComplete);
  preload.load();
}

function init() {
  loadAssets(function() {
    initStage();
  });
}