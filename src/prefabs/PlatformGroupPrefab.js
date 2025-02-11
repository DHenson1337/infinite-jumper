// You can write more code here

import PlatformPrefab from "./PlatformPrefab.js";

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */

/* END-USER-IMPORTS */

export default class PlatformGroupPrefab extends Phaser.GameObjects.Layer {
  constructor(scene) {
    super(scene);

    this.blendMode = Phaser.BlendModes.SKIP_CHECK;

    /* START-USER-CTR-CODE */
    // Write your code here.
    this.group = scene.add.group({
      classType: PlatformPrefab,
    });

    // Returns first elligible game object, creates one if not avilable
    this.group.get(120, 0);

    for (let i = 1; i < 5; i++) {
      const x = Phaser.Math.Between(10, 200); //X range for new platform
      const y = -140 * i;
      this.group.get(x, y);
    }
    // Max distance platforms can be away from player view before respawn (logic elsewhere)
    this.maxPlatformDistance = scene.scale.height * 3;
    this.bottomMostPlatformYPosition = 0;
    /* END-USER-CTR-CODE */
  }

  /* START-USER-CODE */
  /**  @type {Phaser.GameObjects.Group} */
  group;
  /**  @type {Phaser.GameObjects.Group} */
  maxPlatformDistance;
  /**  @type {Phaser.GameObjects.Group} */
  bottomMostPlatformYPosition;
  // Write your code here.

  update() {
    //Camera current position
    const scrollY = this.scene.cameras.main.scrollY;
    const children = this.group.getChildren();
    const childrenToMove = [];
    this.bottomMostPlatformYPosition = children[0].y;

    // Moves platforms outside of camera's max distance to the top
    children.forEach((child) => {
      if (child.y >= scrollY + this.maxPlatformDistance) {
        childrenToMove.push(child);
      }
      // Sets bottom most Y platform value
      if (child.y > this.bottomMostPlatformYPosition) {
        this.bottomMostPlatformYPosition = child.y;
      }
    });

    //Distance to spawn each game object away from starting position
    let childrenToMoveYOffset = 0;
    childrenToMove.forEach((child) => {
      child.x = Phaser.Math.Between(10, 200);
      childrenToMoveYOffset += Phaser.Math.Between(10, 40);
      child.y = scrollY - childrenToMoveYOffset;
    });
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
