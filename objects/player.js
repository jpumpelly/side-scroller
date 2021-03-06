var Player;

(function () {
    var isJumpStarted;

    Player = function (game) {
        var sprite
          , isMoving
          , cursors
          , direction
          , velocity
          , utils = Utilities
          , spriteStr = 'dude';
          
        this.preload = function () {
            game.load.spritesheet(spriteStr, 'assets/dude.png', 32, 48);
        }

        this.create = function () {
            this.sprite = sprite = game.add.sprite(32, game.world.height - 150, spriteStr);

            game.physics.enable(sprite, Phaser.Physics.ARCADE);

            sprite.body.collideWorldBounds = true;

            sprite.animations.add('left', [0, 1, 2, 3], 10, true);
            sprite.animations.add('right', [5, 6, 7, 8], 10, true);

            game.camera.follow(sprite);
            //cursors = game.input.keyboard.createCursorKeys();
          var wasd = function () {
            var retval = {};
            
            retval.up = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            retval.down = game.input.keyboard.addKey(Phaser.Keyboard.S);
            retval.left = game.input.keyboard.addKey(Phaser.Keyboard.A);
            retval.right = game.input.keyboard.addKey(Phaser.Keyboard.D);
            
            return retval;
          }
          
          cursors = wasd();
        };

        this.update = function () {
            if (isMoving) {
                direction = sprite.body.velocity.x > 0 ? 5 : 0;
            }

            velocity = sprite.body.velocity.x;
            sprite.body.velocity.x = 0;

            if (cursors.left.isDown) {
                sprite.body.velocity.x = -150;
                sprite.animations.play('left');
                isMoving = true;
            } else if (cursors.right.isDown) {
                sprite.body.velocity.x = 150;
                sprite.animations.play('right');
                isMoving = true;
            } else {
                if (!sprite.body.touching.down) {
                    sprite.body.velocity.x = utils.reduceValue(velocity, 0.99, 1);
                } else {
                    sprite.animations.stop();
                    sprite.frame = direction;
                    isMoving = false;
                }
            }

            if (cursors.up.isDown && !isJumpStarted) {
                if (sprite.body.touching.down) {
                    startJump(sprite);
                }
            }

            if (!cursors.up.isDown) {
                if (isJumpStarted) sprite.body.velocity.y = utils.reduceValue(sprite.body.velocity.y, 0.3333, 1);
                isJumpStarted = false;
            }

            if (!sprite.body.touching.down) {
                sprite.frame = direction + 1;
            }
        };
    };

    function startJump (player) {
        player.body.velocity.y = -425;
        isJumpStarted = true;
    }
})();
