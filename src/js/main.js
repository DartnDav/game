var game = (function() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  var player = {
    x: 0,
    y: 475,
    h: 25,
    w: 25,
    fill: "#fff"
  };

  return {
    player: function() {
      ctx.fillStyle = player.fill;

      //1. Define how many pixels the player
      // should move each frame (i.e. speed)
      ctx.clearRect(player.x - 1, player.y - 1, player.w + 2, player.h + 2);

      ctx.fillRect(player.x++, player.y, player.w, player.h);
    },

    //2. Create an animation frame
    //3. Redraw the player every time a frame is executed
    animate: function() {
      this.player();
      window.requestAnimationFrame(this.animate.bind(this));
    },

    init: function() {
      canvas.height = 600;
      canvas.width = 800;

      this.animate();
    }
  };
})();

game.init();
