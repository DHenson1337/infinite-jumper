// You can write more code here

/* START OF COMPILED CODE */

import PlatformGroupPrefab from "../prefabs/PlatformGroupPrefab.js";
import PlayerPrefab from "../prefabs/PlayerPrefab.js";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {
  constructor() {
    super("Level");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  /** @returns {void} */
  editorCreate() {
    // leftKeyboard_key
    const leftKeyboard_key = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );

    // rightKeyboard_key
    const rightKeyboard_key = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );

    // platformGroupPrefab
    const platformGroupPrefab = new PlatformGroupPrefab(this);
    this.add.existing(platformGroupPrefab);

    // player
    const player = new PlayerPrefab(this, 87, 64);
    this.add.existing(player);

    // playerWithPlatformsCollider
    this.physics.add.collider(player, platformGroupPrefab.group);

    this.player = player;
    this.leftKeyboard_key = leftKeyboard_key;
    this.rightKeyboard_key = rightKeyboard_key;

    this.events.emit("scene-awake");
  }

  /** @type {PlayerPrefab} */
  player;
  /** @type {Phaser.Input.Keyboard.Key} */
  leftKeyboard_key;
  /** @type {Phaser.Input.Keyboard.Key} */
  rightKeyboard_key;

  /* START-USER-CODE */
  firstJumpMade = false; //Prevents movement b4 first jump
  // Write more your code here

  create() {
    this.editorCreate();

    // Camera to follow player
    this.cameras.main.startFollow(this.player, false, 0.1, 1, 0.1);
    this.firstJumpMade = false;
  }

  update() {
    // Checks collision on the player touching down
    // Player movement & animations

    // Player Collision with the platform
    const isTouchingDown = this.player.body.touching.down;
    if (isTouchingDown) {
      this.player.play("playerJump"); // Plays Player Jump animation.

      // Checks if Jump animation has completed and then plays Spin animation
      this.player.once(
        Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + "playerJump",
        () => {
          this.player.play("playerSpin");
        }
      );
      this.player.setVelocityY(-350);
      if (!this.firstJumpMade) {
        this.firstJumpMade = true;
      }
    }
    // Player Left Direction movement
    if (this.leftKeyboard_key.isDown && !isTouchingDown && this.firstJumpMade) {
      this.player.setVelocityX(-150);
      this.player.setFlipX(true); //Flips Player to face opposite direction

      // Player right Direction Movement
    } else if (
      this.rightKeyboard_key.isDown &&
      !isTouchingDown &&
      this.firstJumpMade
    ) {
      this.player.setVelocityX(150);
      this.player.setFlipX(false); // Reverts/ normal player direction

      // Return to neutral velocity
    } else {
      this.player.setVelocityX(0);
    }
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
