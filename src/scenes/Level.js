
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

		// playerPrefab
		const playerPrefab = new PlayerPrefab(this, 83, 97);
		this.add.existing(playerPrefab);

		// playerWithPlatformsCollider
		this.physics.add.collider(playerPrefab, platformGroupPrefab.group);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();


	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
