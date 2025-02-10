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
    // platformGroupPrefab
    const platformGroupPrefab = new PlatformGroupPrefab(this);
    this.add.existing(platformGroupPrefab);

    // player
    const player = new PlayerPrefab(this, 83, 97);
    this.add.existing(player);

    // playerWithPlatformsCollider
    this.physics.add.collider(player, platformGroupPrefab.group);

    this.player = player;

    this.events.emit("scene-awake");
  }

  /** @type {PlayerPrefab} */
  player;

  /* START-USER-CODE */

  // Write more your code here

  create() {
    this.editorCreate();

    // Camera to follow player
    this.cameras.main.startFollow(this.player, false, 0.1, 1, 0.1);
  }

  update() {
    // Checks collision on the player touching down
    const isTouchingDown = this.player.body.touching.down;
    if (isTouchingDown) {
      this.player.setVelocityY(-350);
    }
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
