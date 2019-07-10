var game = (function() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  var player = {
    x: 0,
    y: 475,
    h: 25,
    w: 25,
    fill: "#ff0",
    dir: "right",
    speed: 5
  };

  var spawn = {
    x: 50,
    y: 0,
    h: 10,
    w: 10,
    fill: "",
    speed: 5
  };

  var spawns = {};

  var spawner = null;

  var animation = null;

  var gameOver = false;

  var score = 0;

  var fill = "#" + Math.floor(Math.random() * 16777215).toString(16);

  function launchSpawns() {
    spawner = setInterval(() => {
      //Use psuedo-random strings to name the new spawns
      var text = "";
      var possible = "abcdefghijklmnopqrstuvwxyz";

      for (var i = 0; i < 10; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      spawns[text] = {
        x: Math.floor(Math.random() * canvas.width),
        y: spawn.y,
        h: spawn.h,
        w: spawn.w,
        fill: spawn.fill,
        speed: 5
      };
    }, 400);
  }

  function moveSpawns() {
    if (Object.keys(spawns).length > 0) {
      for (let spawn in spawns) {
        if (spawns[spawn].y <= canvas.height) {
          ctx.fillStyle = spawns[spawn].fill;

          ctx.save();

          ctx.clearRect(
            spawns[spawn].x - 1,
            spawns[spawn].y - spawns[spawn].speed,
            spawns[spawn].w + 2,
            spawns[spawn].h + 2
          );

          ctx.fillRect(
            spawns[spawn].x,
            (spawns[spawn].y = spawns[spawn].y + spawns[spawn].speed),
            spawns[spawn].w,
            spawns[spawn].h
          );

          ctx.restore();

          if (
            player.x < spawns[spawn].x + spawns[spawn].w &&
            spawns[spawn].x > player.x &&
            spawns[spawn].x < player.x + player.w &&
            player.y < spawns[spawn].y + spawns[spawn].h &&
            player.y + player.h > spawns[spawn].y
          ) {
            gameOver = true;
            cancelAnimationFrame(animation);
            clearInterval(spawner);
          }
        } else {
          score = score + 10;
          document.getElementById("score").innerHTML = score;
          delete spawns[spawn];
        }
      }
    }
  }

  function movePlayer() {
    ctx.fillStyle = player.fill;

    if (player.dir === "right") {
      ctx.clearRect(
        player.x - player.speed,
        player.y - 1,
        player.w + 2,
        player.h + 2
      );

      ctx.fillRect(
        (player.x = player.x + player.speed),
        player.y,
        player.w,
        player.h
      );

      if (player.x + player.w >= canvas.width) {
        player.dir = "left";
      }
    } else {
      ctx.clearRect(
        player.x + player.speed,
        player.y - 1,
        player.w + 2,
        player.h + 2
      );

      ctx.fillRect(
        (player.x = player.x - player.speed),
        player.y,
        player.w,
        player.h
      );

      if (player.x <= 0) {
        player.dir = "right";
      }
    }
  }

  function animate() {
    movePlayer();
    moveSpawns();
    if (gameOver === false) {
      animation = window.requestAnimationFrame(animate.bind(animation));
    }
  }

  return {
    /*Set a random color
    randColor: function() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }, */

    // Separate funtions for left and right arrow keys
    leftDirection: function() {
      if (player.dir === "right") {
        player.dir = "left";
      }
    },

    rightDirection: function() {
      if (player.dir === "left") {
        player.dir = "right";
      }
    },

    init: function() {
      canvas.height = 600;
      canvas.width = 800;

      launchSpawns();
      animate();
    }
  };
})();

game.init();

// Changed changeDirection to keydown and separated for left and right arrow keys
window.addEventListener("keydown", function(e) {
  if (37 === e.keyCode) {
    game.leftDirection();
  }

  window.addEventListener("keydown", function(e) {
    if (39 === e.keyCode) {
      game.rightDirection();
    }
  });
});
