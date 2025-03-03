// You can write more code here

/* START OF COMPILED CODE */

import BackgroundPrefab from "../prefabs/BackgroundPrefab.js";
import ForegroundPrefab from "../prefabs/ForegroundPrefab.js";
import WallPrefab from "../prefabs/WallPrefab.js";
import PlayerPrefab from "../prefabs/PlayerPrefab.js";
import PlatformGroupPrefab from "../prefabs/PlatformGroupPrefab.js";
import OnAwakeActionScript from "../scriptnodes/utils/OnAwakeActionScript.js";
import FadeEffectCameraActionScript from "../scriptnodes/camera/FadeEffectCameraActionScript.js";
import LaunchSceneActionScript from "../scriptnodes/scene/LaunchSceneActionScript.js";
import TimeEventActionScript from "../scriptnodes/timer/TimeEventActionScript.js";
import StartSceneActionScript from "../scriptnodes/scene/StartSceneActionScript.js";
import StopSceneActionScript from "../scriptnodes/scene/StopSceneActionScript.js";
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
		const leftKeyboard_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

		// rightKeyboard_key
		const rightKeyboard_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

		// levelLayer
		const levelLayer = this.add.layer();
		levelLayer.blendMode = Phaser.BlendModes.SKIP_CHECK;

		// backgroundPrefab
		const backgroundPrefab = new BackgroundPrefab(this, 0, 0);
		levelLayer.add(backgroundPrefab);

		// foregroundPrefab
		const foregroundPrefab = new ForegroundPrefab(this, 0, 0);
		levelLayer.add(foregroundPrefab);

		// leftWallTileSprite
		const leftWallTileSprite = new WallPrefab(this, 0, 0);
		levelLayer.add(leftWallTileSprite);

		// rightWallTileSprite
		const rightWallTileSprite = new WallPrefab(this, 208, 0);
		rightWallTileSprite.flipX = true;
		rightWallTileSprite.flipY = false;
		levelLayer.add(rightWallTileSprite);

		// playerLayer
		const playerLayer = this.add.layer();
		playerLayer.blendMode = Phaser.BlendModes.SKIP_CHECK;

		// player
		const player = new PlayerPrefab(this, 120, -84);
		playerLayer.add(player);

		// platformGroupPrefab
		const platformGroupPrefab = new PlatformGroupPrefab(this);
		this.add.existing(platformGroupPrefab);

		// onAwakeActionScript
		const onAwakeActionScript = new OnAwakeActionScript(this);

		// fadeEffectCameraActionScript_1
		const fadeEffectCameraActionScript_1 = new FadeEffectCameraActionScript(onAwakeActionScript);

		// launchSceneActionScript
		const launchSceneActionScript = new LaunchSceneActionScript(fadeEffectCameraActionScript_1);

		// timeEventActionScriptForSceneTransition
		const timeEventActionScriptForSceneTransition = new TimeEventActionScript(this);

		// fadeEffectCameraActionScript
		const fadeEffectCameraActionScript = new FadeEffectCameraActionScript(timeEventActionScriptForSceneTransition);

		// startSceneActionScript
		const startSceneActionScript = new StartSceneActionScript(fadeEffectCameraActionScript);

		// stopSceneActionScript
		const stopSceneActionScript = new StopSceneActionScript(timeEventActionScriptForSceneTransition);

		// lists
		const movingLevelTileSprites = [rightWallTileSprite, leftWallTileSprite, foregroundPrefab];
		const walls = [leftWallTileSprite, rightWallTileSprite];

		// playerWithPlatformsCollider
		this.physics.add.collider(player, platformGroupPrefab.group);

		// playerWithWallsCollider
		this.physics.add.collider(player, walls);

		// rightWallTileSprite (prefab fields)
		rightWallTileSprite.tileOffsetY = -120;

		// fadeEffectCameraActionScript_1 (prefab fields)
		fadeEffectCameraActionScript_1.duration = 500;
		fadeEffectCameraActionScript_1.fadeEvent = "camerafadeincomplete";

		// launchSceneActionScript (prefab fields)
		launchSceneActionScript.sceneKey = "UI";

		// fadeEffectCameraActionScript (prefab fields)
		fadeEffectCameraActionScript.duration = 500;
		fadeEffectCameraActionScript.fadeEvent = "camerafadeoutcomplete";

		// startSceneActionScript (prefab fields)
		startSceneActionScript.sceneKey = "GameOver";

		// stopSceneActionScript (prefab fields)
		stopSceneActionScript.sceneKey = "UI";

		this.player = player;
		this.platformGroupPrefab = platformGroupPrefab;
		this.timeEventActionScriptForSceneTransition = timeEventActionScriptForSceneTransition;
		this.leftKeyboard_key = leftKeyboard_key;
		this.rightKeyboard_key = rightKeyboard_key;
		this.movingLevelTileSprites = movingLevelTileSprites;
		this.walls = walls;

		this.events.emit("scene-awake");
	}

	/** @type {PlayerPrefab} */
	player;
	/** @type {PlatformGroupPrefab} */
	platformGroupPrefab;
	/** @type {TimeEventActionScript} */
	timeEventActionScriptForSceneTransition;
	/** @type {Phaser.Input.Keyboard.Key} */
	leftKeyboard_key;
	/** @type {Phaser.Input.Keyboard.Key} */
	rightKeyboard_key;
	/** @type {Array<WallPrefab|ForegroundPrefab>} */
	movingLevelTileSprites;
	/** @type {WallPrefab[]} */
	walls;

	/* START-USER-CODE */
  firstJumpMade = false; //Prevents movement b4 first jump
  isGameOver = false;
  currentScore = 0; //Starting Score
  maxHeight = 0;
  startingMaxHeight = 0;
  level = 0; //starting difficulty
  // Write more your code here

  create() {
    this.editorCreate();

    // Camera to follow player
    this.cameras.main.startFollow(this.player, false, 0.1, 1, 0.1);

    //Camera DeadZone
    this.cameras.main.setDeadzone(this.scale.width);

    //first jump action
    this.firstJumpMade = false;

    // Game Over state
    this.isGameOver = false;

    //Initial Score
    this.currentScore = 0;

    //Score Tracker
    this.maxHeight = 0;
    this.startingMaxHeight = 0;

    //Difficulty level
    this.level = 0;
  }

  update() {
    //The Players current Y position
    const distance = Math.floor(Math.abs(this.player.body.bottom));

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
        this.startingMaxHeight = distance; // Value for startingMaxHeight
      }
    }
    // Player Left Direction movement
    if (
      this.leftKeyboard_key.isDown &&
      !isTouchingDown &&
      this.firstJumpMade &&
      !this.isGameOver
    ) {
      this.player.setVelocityX(-150);
      this.player.setFlipX(true); //Flips Player to face opposite direction

      // Player right Direction Movement
    } else if (
      this.rightKeyboard_key.isDown &&
      !isTouchingDown &&
      this.firstJumpMade &&
      !this.isGameOver
    ) {
      this.player.setVelocityX(150);
      this.player.setFlipX(false); // Reverts/ normal player direction

      // Return to neutral velocity
    } else {
      this.player.setVelocityX(0);
    }

    // Tile Sprite repeat code animation (so the walls don't look static)
    this.movingLevelTileSprites.forEach((tileSprite) => {
      tileSprite.tilePositionY =
        this.player.y * 0.2 + (tileSprite.tileOffsetY || 0);
    });

    // The walls body (for hit collison)
    this.walls.forEach((tileSprite) => {
      if (tileSprite.flipX) {
        tileSprite.body.setOffset(16, this.cameras.main.worldView.y);
      } else {
        tileSprite.body.setOffset(0, this.cameras.main.worldView.y);
      }
    });

    // Checks if game is over
    if (this.isGameOver) {
      this.player.setVelocityY(135); //Slows down the players fall on gameover
      return;
    }

    // Score Tracker
    if (distance > this.maxHeight && this.firstJumpMade) {
      this.maxHeight = distance;
      this.currentScore = Math.floor(
        (this.maxHeight - this.startingMaxHeight) / 10
      );
      this.scene.get("UI").updateScoreText(this.currentScore);

      //  Difficulty Setter
      if (this.level === 0 && this.currentScore > 200) {
        this.platformGroupPrefab.enableMovingPlatforms = true;
      }
    }

    if (
      this.player.y >
      this.platformGroupPrefab.bottomMostPlatformYPosition + 50
    ) {
      this.isGameOver = true;
      this.player.play("playerHurt");
      this.player.setVelocityY(135); //Slows down the players fall on gameover

      // Special effets for the players death
      const wipeFx = this.player.postFX.addWipe(0.1, 0, 1); //Slowly wipes the player on gameover
      this.tweens.add({
        targets: wipeFx,
        progress: 1,
        duration: 2500,
        onComplete: () => {
          this.player.body.enable = false;
          this.registry.set("score", this.currentScore);
          this.timeEventActionScriptForSceneTransition.execute();

          // Have Scripts for these actions now
          // this.scene.stop("UI"); //Stops UI Scene from showing when game over occurs
          // this.scene.start("GameOver");
          console.log("Game Over💔");
        },
      });
    }

    this.platformGroupPrefab.update();
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
