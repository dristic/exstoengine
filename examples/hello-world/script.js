ex.ready(function () {
  var options = {
    rendering: {
      width: 400,
      height: 400,
      frameRate: 30,
      bgColor: '#000',
      context: ex.display.rendering.Renderer.CANVAS2D,
      params: {
        canvas: document.getElementById('mycanvas')
      }
    },
    debug: {
      enabled: true,
      type: ex.Debug.BROWSER,
      level: ex.util.Logger.LEVEL.ALL
    }
  };
  
  var engine = new ex.Engine(options);
      world = engine.addWorld('MyWorld'),
      text = new ex.display.Text('Hello world!', new ex.Vector(10, 30)),
      pos = 0;
  
  world.addObject(text);
  
  setInterval(function () {
    pos += 0.05;
    text.position.x = (Math.sin(pos) * 100) + 150;
    text.position.y = (Math.cos(pos) * 100) + 150;
  }, (1 / 60) * 1000);
});