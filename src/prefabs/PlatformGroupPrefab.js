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
    this.group.get(90, 150);
    /* END-USER-CTR-CODE */
  }

  /* START-USER-CODE */
  /* @type {Phaser.GameObjects.Group} */
  group;
  // Write your code here.

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
