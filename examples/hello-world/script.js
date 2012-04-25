ex.ready(function () {
  var options = {
    rendering: {
      width: 400,
      height: 400,
      frameRate: 10,
      bgColor: '#000',
      context: ex.display.rendering.Renderer.CANVAS2D,
      params: {
        canvas: document.getElementById('mycanvas')
      }
    }
  };
  
  var engine = new ex.Engine(options);
  
  var world = engine.addWorld('MyWorld');
  
  world.addObject(new ex.display.Text('Hello world!', new ex.Vector(10, 30)));
});