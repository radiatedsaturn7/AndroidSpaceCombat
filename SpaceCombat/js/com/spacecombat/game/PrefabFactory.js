// Auto-converted from com/spacecombat/game/PrefabFactory.java





 export class PrefabFactory {
 useOpenGl = false;
 defaultFps = 17;

 enemyTargets = Tags.player | Tags.ally;
 playerTargets = Tags.enemy;
 nodeTag = Tags.node;

 shootDown = new Vector2(0, 200);
 shootDownLeft = new Vector2(-8, 8);
 shootDownRight = new Vector2(8, 8);
 shootLeft = new Vector2(-8, 0);
 shootRight = new Vector2(8, 0);
 shootUpLeft = new Vector2(-8, -8);
 shootUpRight = new Vector2(8, -8);
 shootUp = new Vector2(0, -8);


 HARD = 0;
 MEDIUM = 1;
 EASY = 2;
 difficulty = HARD;

 static Context context;

 phaserCollider = null;

 spawner = 0;

 static GameObject createEscort( String name, Vector2 position)
	{
 //System.out.println("Creating Gunship");
 o = GameObject.getNew();


 GenericGraphic graphic = PrefabFactory.createGraphic("escort",
 PrefabFactory.getImage("escort"),1);

 rigidBody = new RigidBody();
 collider = new BoxCollider(new Vector2(64, 300));
 collider.setIgnoreTags(Tags.player | Tags.topOfScreen | Tags.ally);
 rigidBody.setCollider(collider);


 o.setName(name);
 o.setTags(Tags.ally);
 o.transform.position.x = position.x;
 o.transform.position.y = position.y;
 o.setRigidBody(rigidBody);

 animation = Animation.getNew();
 animation.init("up", 0, 2, true,
 PrefabFactory.defaultFps, 64, 300);

 glIdle = new GraphicAnimation(graphic, animation);
 glIdle.play();
 o.addComponent(glIdle);

 o.setRigidBody(rigidBody);

 //System.out.println("Adding Weapons");
 Weapon w[] = new Weapon[4];

 w[0] = new MissileLauncher(PrefabFactory.shootUp);
 w[0].setPowerLevel(3);
 w[0].setOffset(16, 0);

 w[1] = new LockingLaser(PrefabFactory.shootUp);
 w[1].setPowerLevel(3);
 w[1].setOffset(16,64);

 w[2] = new MissileLauncher(PrefabFactory.shootUp);
 w[2].setPowerLevel(3);
 w[2].setOffset(16,128);

 w[3] = new LockingLaser(PrefabFactory.shootUp);
 w[3].setPowerLevel(3);
 w[3].setOffset(16,256);
 o.addComponent(w[0]);
 o.addComponent(w[1]);
 o.addComponent(w[2]);
 o.addComponent(w[3]);

 //System.out.println("Added Weapons");

 lwh = new LockingWeaponHandler(w[1],PrefabFactory.playerTargets,false);
 o.addComponent(lwh);

 lwh2 = new LockingWeaponHandler(w[3],PrefabFactory.playerTargets,false);
 o.addComponent(lwh2);

 o.addComponent(new DestroyOnTopOfScreen(330));

 s = new SimpleMovement();
 s.init(rigidBody, 0, -100);
 o.addComponent(s);

 gswc = new GunShipWeaponController(w);
 o.addComponent(gswc);

 return o;
	}

 static GameObject createAlly( String name,
 Vector2 position, String allyType, int allyScript, String weapon) {
 // Load the texture for the cube once during Surface creation
 GenericGraphic graphic = PrefabFactory.createGraphic(allyType,
 PrefabFactory.getImage(allyType),1);

 idle = Animation.getNew();
 idle.init("idle", 0, 5, true,
 PrefabFactory.defaultFps, 32, 32);
 idle.setFrameIncrement(2);
 death = Animation.getNew();
 death.init("death", 0, 1, true,
 PrefabFactory.defaultFps, 32, 32);

 left = Animation.getNew();
 left.init("left", 3, 3, true,
 PrefabFactory.defaultFps, 32, 32);

 upleft = Animation.getNew();
 upleft.init("upleft", 8, 8, true,
 PrefabFactory.defaultFps, 32, 32);

 up = Animation.getNew();
 up.init("up", 0, 0, true,
 PrefabFactory.defaultFps, 32, 32);

 upright = Animation.getNew();
 upright.init("upright", 6, 6, true,
 PrefabFactory.defaultFps, 32, 32);

 right = Animation.getNew();
 right.init("right", 1, 1, true,
 PrefabFactory.defaultFps, 32, 32);

 downright = Animation.getNew();
 downright.init("downright", 5, 5, true,
 PrefabFactory.defaultFps, 32, 32);

 down = Animation.getNew();
 down.init("down", 2, 2, true,
 PrefabFactory.defaultFps, 32, 32);

 downleft = Animation.getNew();
 downleft.init("downleft", 7, 7, true,
 PrefabFactory.defaultFps, 32, 32);


 glIdle = new GraphicAnimation(graphic, idle);
 glDeath = new GraphicAnimation(graphic, death);
 glLeft = new GraphicAnimation(graphic, left);
 glUpLeft = new GraphicAnimation(graphic, upleft);
 glUp = new GraphicAnimation(graphic, up);
 glUpRight = new GraphicAnimation(graphic, upright);
 glRight = new GraphicAnimation(graphic, right);
 glDownRight = new GraphicAnimation(graphic, downright);
 glDown = new GraphicAnimation(graphic, down);
 glDownLeft = new GraphicAnimation(graphic, downleft);

 glIdle.play();



 rigidBody = new RigidBody();
 collider = new BoxCollider(new Vector2(32, 32));
 collider.setIgnoreTags(Tags.player | Tags.topOfScreen | Tags.ally);

 rigidBody.setCollider(collider);

 o = GameObject.getNew();
 // GameObject o = new GameObject();
 o.setName(name);
 o.setTags(Tags.ally | Tags.allyShip);
 o.transform.position.x = position.x;
 o.transform.position.y = position.y;
 o.setRigidBody(rigidBody);
 o.setDestroyOnLevelLoad(true);

 w = null;
 if (weapon.equals("laser")) {
	let w = new Laser(PrefabFactory.shootUp);
 }
 if (weapon.equals("machin" +
 "egun")) {
	w = new MachineGun(PrefabFactory.shootUp);
 }
 if (weapon.equals("flamethrower")) {
	let w = new FlameThrower(PrefabFactory.shootUp);
 }
 if (weapon.equals("pulsecannon")) {
	let w = new PulseCannon(PrefabFactory.shootUp);
 }
 if (weapon.equals("missilelauncher")) {

	let w = new MissileLauncher(PrefabFactory.shootUp);
 w.setPowerLevel(3);
 }
 if (weapon.equals("lockinglaser")) {
	let w = new LockingLaser(PrefabFactory.shootUp);
 w.setPowerLevel(3);
 let lwh = new LockingWeaponHandler(w,PrefabFactory.playerTargets,false);
 o.addComponent(lwh);
 }

 ai = new AllyAI(allyType,w);
 o.addComponent(ai);
 o.addComponent(w);

 hc = new HealthController(new Audio(PrefabFactory.createAudio("explosion"),"explosion"));

 if (allyType.equals("calumniator"))
 {
 ai.setSpeed(new Vector2(110, 110));
 ai.setAccel(new Vector2(20,20));
 hc.setHealth(120);
 }
 else if (allyType.equals("exemplar"))
 {
 ai.setSpeed(new Vector2(110, 110));
 ai.setAccel(new Vector2(20,20));
 hc.setHealth(120);
 }
 else if (allyType.equals("hunter"))
 {
 ai.setSpeed(new Vector2(110, 110));
 ai.setAccel(new Vector2(20,20));
 hc.setHealth(120);
 }
 else if (allyType.equals("paladin"))
 {
 ai.setSpeed(new Vector2(110, 110));
 ai.setAccel(new Vector2(20,20));
 hc.setHealth(120);
 }
 else if (allyType.equals("pariah"))
 {
 ai.setSpeed(new Vector2(110, 110));
 ai.setAccel(new Vector2(20,20));
 hc.setHealth(120);
 }
 else if (allyType.equals("renegade"))
 {
 ai.setSpeed(new Vector2(110, 110));
 ai.setAccel(new Vector2(20,20));
 hc.setHealth(120);
 }
 else if (allyType.equals("sentinel"))
 {
 ai.setSpeed(new Vector2(110, 110));
 ai.setAccel(new Vector2(20,20));
 hc.setHealth(120);
 }
 else
 {
 ai.setSpeed(new Vector2(110, 110));
 ai.setAccel(new Vector2(20,20));
 hc.setHealth(120);
 }

 //o.addComponent(hc);

 o.addComponent(glIdle);
 o.addComponent(glDeath);
 o.addComponent(glLeft);
 o.addComponent(glUpLeft);
 o.addComponent(glUp);
 o.addComponent(glUpRight);
 o.addComponent(glRight);
 o.addComponent(glDownRight);
 o.addComponent(glDown);
 o.addComponent(glDownLeft);

 ai.setFormation(allyScript);

 if (allyScript == 6)
 {
 o.addComponent(new DestroyOnOutOfBounds());
 }
 else if (allyScript >= 7)
 {
 o.addComponent(new DestroyOnTopOfScreen());
 }

 return o;
	}

 static void setDifficulty(int difficulty)
	{
 PrefabFactory.difficulty = difficulty;
	}

 static GameObject createEnemy( String name,
 Vector2 position, int enemyType, int scriptType,
 boolean reverse) {
 // Load the texture for the cube once during Surface creation
 GenericGraphic graphic = PrefabFactory.createGraphic("enemy",
 PrefabFactory.getImage("enemy"),8);

 startFrame = (enemyType - 1) * 8 + 6;
 endFrame = startFrame + 1;
 idle = Animation.getNew();
 idle.init("idle", startFrame, endFrame,
 true, PrefabFactory.defaultFps, 32, 32);
 death = Animation.getNew();
 death.init("death", startFrame - 6,
 startFrame-1, false, PrefabFactory.defaultFps, 32, 32);

 glIdle = new GraphicAnimation(graphic, idle);
 glDeath = new GraphicAnimation(graphic, death);
 glIdle.play();

 rigidBody = new RigidBody();
 collider = new BoxCollider(new Vector2(32, 32));
 collider.setIgnoreTags(PrefabFactory.playerTargets );
 rigidBody.setCollider(collider);

 o = GameObject.getNew();

 // GameObject o = new GameObject();
 o.setName(name);
 o.setTags(Tags.enemy);
 o.transform.position.x = position.x;
 o.transform.position.y = position.y;
 o.setRigidBody(rigidBody);

 ai = null;
if(1) {
	let ai = new AIScriptOne(reverse);
 } else if (scriptType == 2) {
	ai = new AIScriptTwo(reverse);
 } else if (scriptType == 3) {
	let ai = new AIScriptThree(reverse);
 } else if (scriptType == 4) {
	ai = new AIScriptFour(PrefabFactory.enemyTargets);
 } else if (scriptType == 5) {
	let ai = new AIScriptFive(PrefabFactory.enemyTargets);
 } else if (scriptType == 6) {
	ai = new AIScriptSix(reverse);
 } else if (scriptType == 7) {
 GameObject [] nodes = {
 GameObject.getNew(),
 GameObject.getNew(),
 GameObject.getNew(),
 GameObject.getNew(),
 GameObject.getNew(),
 GameObject.getNew(),
 };
 nodes[0] = GameObject.create(PrefabFactory.createNode(new Vector2(0,-32),0.0f));
 nodes[1] = GameObject.create(PrefabFactory.createNode(new Vector2(0,800-32),0.0f));
 nodes[2] = GameObject.create(PrefabFactory.createNode(new Vector2(400,800-32),0.0f));
 nodes[3] = GameObject.create(PrefabFactory.createNode(new Vector2(400,0),0.0f));
 nodes[4] = GameObject.create(PrefabFactory.createNode(new Vector2(0,0),0.0f));
 nodes[5] = GameObject.create(PrefabFactory.createNode(new Vector2(0,900),0.0f));
	ai = new AINodeFollower(nodes);
 } else if (scriptType == 8) {
 GameObject [] nodes = {
 GameObject.getNew(),
 GameObject.getNew(),
 GameObject.getNew(),
 GameObject.getNew(),
 GameObject.getNew(),
 GameObject.getNew(),
 };
 nodes[0] = GameObject.create(PrefabFactory.createNode(new Vector2(400,-32),0.0f));
 nodes[1] = GameObject.create(PrefabFactory.createNode(new Vector2(400,800-32),0.0f));
 nodes[2] = GameObject.create(PrefabFactory.createNode(new Vector2(0,800-32),0.0f));
 nodes[3] = GameObject.create(PrefabFactory.createNode(new Vector2(0,0),0.0f));
 nodes[4] = GameObject.create(PrefabFactory.createNode(new Vector2(400,0),0.0f));
 nodes[5] = GameObject.create(PrefabFactory.createNode(new Vector2(400,900),0.0f));
	ai = new AINodeFollower(nodes);
 } else if (scriptType == 9) {
 GameObject [] nodes = {
 GameObject.getNew(),
 GameObject.getNew(),
 GameObject.getNew(),
 GameObject.getNew(),
 GameObject.getNew(),
 GameObject.getNew(),
 };
 nodes[0] = GameObject.create(PrefabFactory.createNode(new Vector2(0,-32),0.0f));
 nodes[1] = GameObject.create(PrefabFactory.createNode(new Vector2(200,400-32),0.0f));
 nodes[2] = GameObject.create(PrefabFactory.createNode(new Vector2(200,100-32),0.0f));
 nodes[3] = GameObject.create(PrefabFactory.createNode(new Vector2(300,100),0.0f));
 nodes[4] = GameObject.create(PrefabFactory.createNode(new Vector2(300,900),0.0f));
	ai = new AINodeFollower(nodes);
 } else if (scriptType == 10) {
 GameObject [] nodes = {
 GameObject.getNew(),
 GameObject.getNew(),
 GameObject.getNew(),
 GameObject.getNew(),
 GameObject.getNew(),
 GameObject.getNew(),
 };
 nodes[0] = GameObject.create(PrefabFactory.createNode(new Vector2(400,-32),0.0f));
 nodes[1] = GameObject.create(PrefabFactory.createNode(new Vector2(200,400-32),0.0f));
 nodes[2] = GameObject.create(PrefabFactory.createNode(new Vector2(200,100-32),0.0f));
 nodes[3] = GameObject.create(PrefabFactory.createNode(new Vector2(100,100),0.0f));
 nodes[4] = GameObject.create(PrefabFactory.createNode(new Vector2(100,900),0.0f));
	ai = new AINodeFollower(nodes);
 }
 if(11) {
	let ai = new AIScriptEight(reverse);
 //System.out.println("EIGHT");
 } else if (scriptType == 12) {
 //System.out.println("NINE");
	ai = new AIScriptNine(reverse);
 } else if (scriptType == 13) {
 //System.out.println("TEN");
	let ai = new AIScriptTen(reverse);
 }
 else {
	ai = new AIScript();
 }

 hc = new HealthController(new Audio(PrefabFactory.createAudio("explosion"),"explosion"));
 hc.setHealth(100);

 difficultyOffset = 0;
 if (PrefabFactory.difficulty == PrefabFactory.EASY)
 {
	difficultyOffset = 2f;
 }
 else if (PrefabFactory.difficulty == PrefabFactory.MEDIUM)
 {
	difficultyOffset = 1f;
 }

if(1) {
 let w = new Phaser(PrefabFactory.shootDown, 3 + difficultyOffset);
 let wh = new WeaponHandler(w);
 hc.setHealth(100);

 o.addComponent(w);
 o.addComponent(wh);
 }
if(2) {
 let w = new Phaser(PrefabFactory.shootDown, 2 + difficultyOffset);
 let wh = new WeaponHandler(w);
 hc.setHealth(100);

 o.addComponent(w);
 o.addComponent(wh);
 }
if(3) {
 let w = new Phaser(PrefabFactory.shootDown, 3 + difficultyOffset);
 hc.setHealth(150);

 o.addComponent(w);

 if (PrefabFactory.difficulty == PrefabFactory.HARD)
 {
 LockingWeaponHandler wh = new LockingWeaponHandler(w,
 PrefabFactory.enemyTargets,true);
 o.addComponent(wh);
 }
 else
 {
 wh = new WeaponHandler(w);
 o.addComponent(wh);
 }

 // GameObject powerup = PrefabFactory.createPowerUp(o.transform.position, 0, true);
 //o.addComponent(new SpawnOnDestroy(powerup));
 }
if(4) {
 let w = new Phaser(PrefabFactory.shootDown, 2 + difficultyOffset);
 LockingWeaponHandler wh = new LockingWeaponHandler(w,
 PrefabFactory.enemyTargets,true);
 hc.setHealth(150);

 o.addComponent(w);
 o.addComponent(wh);
 }
if(6) {
 hc.setHealth(200);

 if (PrefabFactory.difficulty != PrefabFactory.EASY)
 {
 let w = new Phaser(PrefabFactory.shootLeft, 3 + difficultyOffset);
 let wh = new WeaponHandler(w);
 o.addComponent(w);
 o.addComponent(wh);
 }

 w2 = new Phaser(PrefabFactory.shootDownLeft, 3 + difficultyOffset);
 wh2 = new WeaponHandler(w2);
 o.addComponent(w2);
 o.addComponent(wh2);

	if(5) {
 let w3 = new Phaser(PrefabFactory.shootDown, 3 + difficultyOffset);
 let wh3 = new WeaponHandler(w3);
 o.addComponent(w3);
 o.addComponent(wh3);
 }
	if(6) {
 let w3 = new Phaser(PrefabFactory.shootDown, 3 + difficultyOffset);
 o.addComponent(w3);

 if (PrefabFactory.difficulty == PrefabFactory.HARD)
 {
 LockingWeaponHandler wh3 = new LockingWeaponHandler(w3,
 PrefabFactory.enemyTargets,true);
 o.addComponent(wh3);
 }
 }

 w4 = new Phaser(PrefabFactory.shootDownRight, 3 + difficultyOffset);
 wh4 = new WeaponHandler(w4);
 o.addComponent(w4);
 o.addComponent(wh4);

 if (PrefabFactory.difficulty != PrefabFactory.EASY)
 {
 w5 = new Phaser(PrefabFactory.shootRight, 3 + difficultyOffset);
 wh5 = new WeaponHandler(w5);
 o.addComponent(w5);
 o.addComponent(wh5);
 }
 }
if(8) {
 hc.setHealth(250);

 let w3 = null;
	if(PrefabFactory.HARD) {
 let w3 = new Phaser(PrefabFactory.shootDown, 0.3f + difficultyOffset, 8, 5);
 } else {
 w3 = new Phaser(PrefabFactory.shootDown, 0.3f + difficultyOffset, 14, 5);
 }
 o.addComponent(w3);

 if ((PrefabFactory.difficulty == PrefabFactory.MEDIUM || PrefabFactory.difficulty == PrefabFactory.HARD) && enemyType == 8)
 {
 LockingWeaponHandler wh3 = new LockingWeaponHandler(w3,
 PrefabFactory.enemyTargets,true);
 o.addComponent(wh3);
 }
 else if (PrefabFactory.difficulty == PrefabFactory.HARD && enemyType == 7)
 {
 LockingWeaponHandler wh3 = new LockingWeaponHandler(w3,
 PrefabFactory.enemyTargets,true);
 o.addComponent(wh3);
 }
 }
if(10) {
 hc.setHealth(250);

 let speed = 4.0f + difficultyOffset;
	if(10) {
 let speed = 3.0f + difficultyOffset;
 }
 w = new Phaser(PrefabFactory.shootUpLeft, speed);
 wh = new WeaponHandler(w);
 o.addComponent(w);
 o.addComponent(wh);

 w2 = new Phaser(PrefabFactory.shootUpRight, speed);
 wh2 = new WeaponHandler(w2);
 o.addComponent(w2);
 o.addComponent(wh2);

 w3 = new Phaser(PrefabFactory.shootDownLeft, speed);
 wh3 = new WeaponHandler(w3);
 o.addComponent(w3);
 o.addComponent(wh3);

 w4 = new Phaser(PrefabFactory.shootDownRight, speed);
 wh4 = new WeaponHandler(w4);
 o.addComponent(w4);
 o.addComponent(wh4);

 w5 = new Phaser(PrefabFactory.shootDown, 3 + difficultyOffset);
 o.addComponent(w5);

 if (PrefabFactory.difficulty == PrefabFactory.HARD)
 {
 LockingWeaponHandler wh5 = new LockingWeaponHandler(w5,
 PrefabFactory.enemyTargets,true);
 o.addComponent(wh5);
 }
 else
 {
 wh5 = new WeaponHandler(w5);
 o.addComponent(wh5);
 }
 }
if(12) {
 hc.setHealth(100);

 let w = null;
	if(11) {
 let w = new Phaser(PrefabFactory.shootDown, 3 + difficultyOffset);
 }
	if(12) {
 let w = new Phaser(PrefabFactory.shootDown, 2 + difficultyOffset);
 }
 LockingWeaponHandler wh = new LockingWeaponHandler(w,
 PrefabFactory.enemyTargets,true);

 o.addComponent(w);
 o.addComponent(wh);
 }
if(13) {
 let w = new Phaser(PrefabFactory.shootDown, 3 + difficultyOffset);
 LockingWeaponHandler wh = new LockingWeaponHandler(w,
 PrefabFactory.enemyTargets,true);

 o.addComponent(w);

 if (PrefabFactory.difficulty == PrefabFactory.HARD)
 {
 o.addComponent(wh);
 }
 else
 {
 wh2 = new WeaponHandler(w);
 o.addComponent(wh2);
 }

 hc.setHealth(50);
 }

 if (Util.randomNumber(0, 3) == 1)
 {
 explosion1 = PrefabFactory.createExplosion(o.transform.position);
 o.addComponent(new SpawnOnDestroy(explosion1));

 explosion2 = PrefabFactory.createExplosion(o.transform.position);
 o.addComponent(new SpawnOnDestroy(explosion2));

 explosion3 = PrefabFactory.createExplosion(o.transform.position);
 o.addComponent(new SpawnOnDestroy(explosion3));
 }

 fosd = new FaceOppositeSpeedDirection(rigidBody);
 o.addComponent(fosd);

 o.addComponent(new DestroyOnOutOfBounds());
 o.addComponent(glIdle);
 o.addComponent(glDeath);
 o.addComponent(ai);
 o.addComponent(hc);

 return o;
	}

 static createExplosion(position) {
 let o = GameObject.getNew();
 //GameObject o = new GameObject();
 o.setName("Explosion");

 let graphic = PrefabFactory.createGraphic("explosion", PrefabFactory.getImage("explosion"),1);
 let explosion = Animation.getNew();
 explosion.init("explode", 0, 8, false,
 PrefabFactory.defaultFps, 47, 42);

 let glLeft = new GraphicAnimation(graphic, explosion);
 o.addComponent(glLeft);

 let r = new RigidBody();

 let sm = SimpleMovement.getNew();
 sm.init(r,Util.randomNumber(0,64)-32,Util.randomNumber(0, 64)-32);

 let spoc = new SetPositionOnCreate(position);

 o.addComponent(r);
 o.addComponent(sm);
 o.addComponent(spoc);
 o.addComponent(new DestroyOnCreate(1));

 o.playAnimation("explode");
 let o;
	}

 static GenericGraphic createGraphic( String name,
 InputStream is, int layer) {
 temp = new CanvasGraphic();
 temp.create(name, is, layer);
 return temp;
	}

 static GameObject createLevel( String name, int[] map, int mapWidth,
 int mapHeight, String wadName) {

 //System.out.println("WADNAME:"+wadName);
 graphic = PrefabFactory.createGraphic(wadName, PrefabFactory.getImage(wadName),0);
 l = new Level();
 //System.out.println("WADNAME2:"+graphic.getName());
 //System.out.println("SIZE:"+graphic.getHeight());

 l.createLevel(map, mapWidth, mapHeight, graphic, 64, 64);

 o = GameObject.getNew();
 //GameObject o = new GameObject();
 o.setName(name);
 o.setTags(Tags.level);
 o.addComponent(l);
 o.transform.position.x = 0;
 o.transform.position.y = 0;
 l.alignBottom();

 audio = new Audio(PrefabFactory.createAudio("music_level"+Util.randomNumber(1, 5)),"music");
 o.addComponent(audio);
 audio.play();

 rigidBody = new RigidBody();
 o.setRigidBody(rigidBody);

 return o;
	}

 static createAudio(audioName) {

 if (audioName.equalsIgnoreCase("music_level1"))
 {
 return MediaPlayer.create(context, R.raw.music_level1);
 }
 if (audioName.equalsIgnoreCase("music_level2"))
 {
 return MediaPlayer.create(context, R.raw.music_level2);
 }
 if (audioName.equalsIgnoreCase("music_level3"))
 {
 return MediaPlayer.create(context, R.raw.music_level3);
 }
 if (audioName.equalsIgnoreCase("music_level4"))
 {
 return MediaPlayer.create(context, R.raw.music_level4);
 }
 if (audioName.equalsIgnoreCase("music_level5"))
 {
 return MediaPlayer.create(context, R.raw.music_level5);
 }

 if (audioName.equalsIgnoreCase("flamethrower"))
 {
 return MediaPlayer.create(context, R.raw.flamethrower);
 }
 if (audioName.equalsIgnoreCase("laser"))
 {
 return MediaPlayer.create(context, R.raw.laser);
 }
 if (audioName.equalsIgnoreCase("machinegun"))
 {
 return MediaPlayer.create(context, R.raw.machinegun);
 }
 if (audioName.equalsIgnoreCase("missilelauncher"))
 {
 return MediaPlayer.create(context, R.raw.missilelauncher);
 }
 if (audioName.equalsIgnoreCase("chargelaser"))
 {
 return MediaPlayer.create(context, R.raw.chargelaser);
 }
 if (audioName.equalsIgnoreCase("pulselaser"))
 {
 return MediaPlayer.create(context, R.raw.pulselaser);
 }
 if (audioName.equalsIgnoreCase("explosion"))
 {
 return MediaPlayer.create(context, R.raw.explosion);
 }

 //System.out.println(audioName);

 return null;
	}

 static GameObject createNode( Vector2 position, float time)
	{
 g = GameObject.getNew();
 //GameObject g = new GameObject();

 rigidBody = new RigidBody();
 collider = new BoxCollider(new Vector2(32, 32));
 collider.setIgnoreTags(Tags.player | Tags.ally | Tags.shot | Tags.spawner);
 g.setTags(PrefabFactory.nodeTag);

 rigidBody.setCollider(collider);

 g.setRigidBody(rigidBody);

 g.setName("Node");
 g.addComponent(new Node());
 g.transform.position.x = position.x;
 g.transform.position.y = position.y;
 return g;
	}

 static GameObject createCamera( String name, Vector2 position)
	{
 o = GameObject.getNew();
 o.setName(name);
 o.setTags(Tags.player | Tags.ally | Tags.camera);

 rigidBody = new RigidBody();
 o.setRigidBody(rigidBody);

 //this is the camera we will be using
 c = new Camera();
 Camera.setMainCamera(c);
 o.addComponent(c);

 PlayerInput.setCameraScrollSpeed(LevelLoader.scrollSpeed);
 sm = SimpleMovement.getNew();
 sm.init(rigidBody, 0, LevelLoader.scrollSpeed);
 o.addComponent(sm);

 //PositionEchoer pe = new PositionEchoer();
 //o.addComponent(pe);

 moveIfLessThan = 80;
 moveIfGreaterThan = 380;
 maxRightMove = 128;
 maxLeftMove = 0;

 pf = new PlayerFollower(GameObject.findByName("player"), sm, maxLeftMove, maxRightMove, moveIfLessThan, moveIfGreaterThan, LevelLoader.scrollSpeed);
 o.addComponent(pf);

 go2 = GameObject.findByName("TopOfScreen");

 o.transform.position.x = position.x;
 o.transform.position.y = position.y;
 go2.transform.position.x = position.x;
 go2.transform.position.y = position.y;

 f = new FixedJoint(Camera.mainCamera.gameObject);
 go2.addComponent(f);


 return o;
	}


 static GameObject createMenuCamera( String name, Vector2 position)
	{
 o = GameObject.getNew();
 o.setName(name);
 o.setTags(Tags.player | Tags.ally | Tags.camera);

 rigidBody = new RigidBody();
 o.setRigidBody(rigidBody);

 //this is the camera we will be using
 c = new Camera();
 Camera.setMainCamera(c);

 audio = new Audio(PrefabFactory.createAudio("music_level1"),"music");
 o.addComponent(audio);
 audio.play();

 o.addComponent(c);
 o.addComponent(audio);

 return o;
	}

 static GameObject createPlayer( String name,
 Vector2 position, String playerType) {
 o = GameObject.getNew();
 // GameObject o = new GameObject();
 o.setName(name);
 o.setTags(Tags.player | Tags.ally);

 // Load the texture for the cube once during Surface creation
 GenericGraphic graphic = PrefabFactory.createGraphic(playerType,
 PrefabFactory.getImage(playerType),10);
 idle = Animation.getNew();
 idle.init("idle", 0, 5, true,
 PrefabFactory.defaultFps, 32, 32);
 idle.setFrameIncrement(2);

 death = Animation.getNew();
 death.init("death", 0, 1, true,
 PrefabFactory.defaultFps, 32, 32);

 glIdle = new GraphicAnimation(graphic, idle);
 glDeath = new GraphicAnimation(graphic, death);
 glIdle.play();
 o.addComponent(glIdle);
 o.addComponent(glDeath);

 left = Animation.getNew();
 left.init("left", 3, 3, true,
 PrefabFactory.defaultFps, 32, 32);
 upleft = Animation.getNew();
 upleft.init("upleft", 8, 8, true,
 PrefabFactory.defaultFps, 32, 32);
 up = Animation.getNew();
 up.init("up", 0, 0, true,
 PrefabFactory.defaultFps, 32, 32);
 upright = Animation.getNew();
 upright.init("upright", 6, 6, true,
 PrefabFactory.defaultFps, 32, 32);
 right = Animation.getNew();
 right.init("right", 1, 1, true,
 PrefabFactory.defaultFps, 32, 32);
 downright = Animation.getNew();
 downright.init("downright", 5, 5, true,
 PrefabFactory.defaultFps, 32, 32);
 down = Animation.getNew();
 down.init("down", 2, 2, true,
 PrefabFactory.defaultFps, 32, 32);
 downleft = Animation.getNew();
 downleft.init("downleft", 7, 7, true,
 PrefabFactory.defaultFps, 32, 32);

 glLeft = new GraphicAnimation(graphic, left);
 glUpLeft = new GraphicAnimation(graphic, upleft);
 glUp = new GraphicAnimation(graphic, up);
 glUpRight = new GraphicAnimation(graphic, upright);
 glRight = new GraphicAnimation(graphic, right);
 glDownRight = new GraphicAnimation(graphic, downright);
 glDown = new GraphicAnimation(graphic, down);
 glDownLeft = new GraphicAnimation(graphic, downleft);

 o.addComponent(glLeft);
 o.addComponent(glUpLeft);
 o.addComponent(glUp);
 o.addComponent(glUpRight);
 o.addComponent(glRight);
 o.addComponent(glDownRight);
 o.addComponent(glDown);
 o.addComponent(glDownLeft);

 rigidBody = new RigidBody();
 o.setRigidBody(rigidBody);

 collider = new BoxCollider(new Vector2(32, 32));
 collider.setIgnoreTags(Tags.player | Tags.ally | Tags.topOfScreen);
 rigidBody.setCollider(collider);

 hc = new HealthController(new Audio(PrefabFactory.createAudio("explosion"),"explosion"));;
 hc.setHealth(101);
 if (com.spacecombat.Engine.isInvincible())
 {
 hc.setHealth(100000);
 }
 o.addComponent(hc);


 weapons = new Weapon[4];
 weapons[0] = new Laser(PrefabFactory.shootUp);
 weapons[0].setUseMagazine(false);
 weapons[0].addAudio(new Audio(PrefabFactory.createAudio("laser"),"laser"));
 o.addComponent(weapons[0]);


 weapons[1] = new MachineGun(PrefabFactory.shootUp);
 weapons[1].setUseMagazine(false);
 weapons[1].addAudio(new Audio(PrefabFactory.createAudio("machinegun"),"machinegun"));
 o.addComponent(weapons[1]);

 weapons[2] = new FlameThrower(PrefabFactory.shootUp);
 weapons[2].setUseMagazine(false);
 weapons[2].addAudio(new Audio(PrefabFactory.createAudio("flamethrower"),"flamethrower"));
 o.addComponent(weapons[2]);

 weapons[3] = new PulseCannon(PrefabFactory.shootUp);
 weapons[3].setUseMagazine(false);
 weapons[3].addAudio(new Audio(PrefabFactory.createAudio("pulselaser"),"pulselaser"));
 o.addComponent(weapons[3]);


 secondaryWeapons = new Weapon[2];

 secondaryWeapons[0] = new LockingLaser(PrefabFactory.shootUp);
 secondaryWeapons[0].setPowerLevel(0);
 o.addComponent(secondaryWeapons[0]);
 secondaryWeapons[0].addAudio(new Audio(PrefabFactory.createAudio("machinegun"),"machinegun"));
 lwh = new LockingWeaponHandler(secondaryWeapons[0],PrefabFactory.playerTargets,false);
 o.addComponent(lwh);


 //Weapon [] terciaryWeapons = new Weapon[1];

 secondaryWeapons[1] = new MissileLauncher(PrefabFactory.shootUp);
 secondaryWeapons[1].setUseMagazine(false);
 secondaryWeapons[1].setPowerLevel(0);
 secondaryWeapons[1].addAudio(new Audio(PrefabFactory.createAudio("missilelauncher"),"machinegun"));
 o.addComponent(secondaryWeapons[1]);


 chargeWeapons = new Weapon[1];
 chargeWeapons[0] = new ChargeLaser(PrefabFactory.shootUp);
 o.addComponent(chargeWeapons[0]);
 chargeWeapons[0].addAudio(new Audio(PrefabFactory.createAudio("chargelaser"),"chargelaser"));

 //RotateEachSecond res = new RotateEachSecond(45);
 //o.addComponent(res);

 wc = new WeaponController[3];
 wc[0] = new WeaponController(0,weapons);
 wc[1] = new WeaponController(0,secondaryWeapons);
 wc[2] = new WeaponController(0,chargeWeapons);

 pc = new PowerupController(wc);
 o.addComponent(pc);
 o.addComponent(wc[0]);
 o.addComponent(wc[1]);
 o.addComponent(wc[2]);

 playerInput = new PlayerInput(wc,collider);
 o.addComponent(playerInput);

 o.transform.position.x = position.x;
 o.transform.position.y = position.y;

 GameObject.create(PrefabFactory.createHUDHealthShield(o,hc));
 o.addComponent(new AIPlayerStartLevel(playerInput,hc));


 explosion1 = PrefabFactory.createExplosion(o.transform.position);
 o.addComponent(new SpawnOnDestroy(explosion1));

 explosion2 = PrefabFactory.createExplosion(o.transform.position);
 o.addComponent(new SpawnOnDestroy(explosion2));

 explosion3 = PrefabFactory.createExplosion(o.transform.position);
 o.addComponent(new SpawnOnDestroy(explosion3));

 return o;
	}

 static GameObject createHUDChargeBar(GameObject camera, GameObject player)
	{
 GenericGraphic graphic = PrefabFactory.createGraphic("chargebar",
 PrefabFactory.getImage("chargebar"),11);

 go = GameObject.getNew();
 go.setTags(Tags.hud | Tags.player | Tags.ally);
 go.setDestroyOnLevelLoad(false);

 cl = (ChargeLaser)player.getComponent(ChargeLaser.class);

 clh = new ChargeLaserHUD(cl);
 go.addComponent(clh);

 go.transform.position.x = camera.transform.position.x + HUDConstants.chargeBar.x;
 go.transform.position.y = camera.transform.position.y + HUDConstants.chargeBar.y;

 sizeX = 26;
 sizeY = 52;

 gl100 = new Animation();
 gl100.init("0%", 10, 10, false,
 PrefabFactory.defaultFps, sizeX, sizeY);

 gl90 = new Animation();
 gl90.init("10%", 9, 9, false,
 PrefabFactory.defaultFps, sizeX, sizeY);

 gl80 = new Animation();
 gl80.init("20%", 8, 8, false,
 PrefabFactory.defaultFps, sizeX, sizeY);

 gl70 = new Animation();
 gl70.init("30%", 7, 7, false,
 PrefabFactory.defaultFps, sizeX, sizeY);

 gl60 = new Animation();
 gl60.init("40%", 6, 6, false,
 PrefabFactory.defaultFps, sizeX, sizeY);

 gl50 = new Animation();
 gl50.init("50%", 5, 5, false,
 PrefabFactory.defaultFps, sizeX, sizeY);

 gl40 = new Animation();
 gl40.init("60%", 4, 4, false,
 PrefabFactory.defaultFps, sizeX, sizeY);

 gl30 = new Animation();
 gl30.init("70%", 3, 3, false,
 PrefabFactory.defaultFps, sizeX, sizeY);

 gl20 = new Animation();
 gl20.init("80%",2, 2, false,
 PrefabFactory.defaultFps, sizeX, sizeY);

 gl10 = new Animation();
 gl10.init("90%", 1, 1, true,
 PrefabFactory.defaultFps, sizeX, sizeY);

 gl0 = new Animation();
 gl0.init("100%", 0, 0, false,
 PrefabFactory.defaultFps, sizeX, sizeY);

 ga100 = new GraphicAnimation(graphic, gl100);
 ga90 = new GraphicAnimation(graphic, gl90);
 ga80 = new GraphicAnimation(graphic, gl80);
 ga70 = new GraphicAnimation(graphic, gl70);
 ga60 = new GraphicAnimation(graphic, gl60);
 ga50 = new GraphicAnimation(graphic, gl50);
 ga40 = new GraphicAnimation(graphic, gl40);
 ga30 = new GraphicAnimation(graphic, gl30);
 ga20 = new GraphicAnimation(graphic, gl20);
 ga10 = new GraphicAnimation(graphic, gl10);
 ga0 = new GraphicAnimation(graphic, gl0);

 go.addComponent(ga100);
 go.addComponent(ga90);
 go.addComponent(ga80);
 go.addComponent(ga70);
 go.addComponent(ga60);
 go.addComponent(ga50);
 go.addComponent(ga40);
 go.addComponent(ga30);
 go.addComponent(ga20);
 go.addComponent(ga10);
 go.addComponent(ga0);

 f = new FixedJoint(camera);
 go.addComponent(f);
 return go;
	}

 static GameObject createMainMenu ()
	{
 go = GameObject.getNew();
 mmhud = new MainMenuHUD();
 go.addComponent(mmhud);

 c = new Camera();
 Camera.setMainCamera(c);
 go.addComponent(c);

 return go;
	}

 static GameObject createHUDHealthShield(GameObject g, HealthController hc)
	{
 GenericGraphic graphic = PrefabFactory.createGraphic("shield",
 PrefabFactory.getImage("shield"),11);

 go = GameObject.getNew();
 go.setTags(Tags.hud | Tags.player | Tags.ally);
 go.setDestroyOnLevelLoad(false);

 go.transform.position.x = g.transform.position.x + 5;
 go.transform.position.y = g.transform.position.y + 5;

 r = new RigidBody();
 collider = new BoxCollider(new Vector2(32, 32));
 collider.setIgnoreTags(Tags.player | Tags.ally | Tags.topOfScreen);
 r.setCollider(collider);
 go.setRigidBody(r);

 gl100 = new Animation();
 gl100.init("100%", 0, 1, false,
 PrefabFactory.defaultFps, 32, 32);

 gl90 = new Animation();
 gl90.init("90%", 1, 2, false,
 PrefabFactory.defaultFps, 32, 32);

 gl80 = new Animation();
 gl80.init("80%", 2, 3, false,
 PrefabFactory.defaultFps, 32, 32);

 gl70 = new Animation();
 gl70.init("70%", 3, 4, false,
 PrefabFactory.defaultFps, 32, 32);

 gl60 = new Animation();
 gl60.init("60%", 4, 5, false,
 PrefabFactory.defaultFps, 32, 32);

 gl50 = new Animation();
 gl50.init("50%", 5, 6, false,
 PrefabFactory.defaultFps, 32, 32);

 gl40 = new Animation();
 gl40.init("40%", 6, 7, false,
 PrefabFactory.defaultFps, 32, 32);

 gl30 = new Animation();
 gl30.init("30%", 7, 8, false,
 PrefabFactory.defaultFps, 32, 32);

 gl20 = new Animation();
 gl20.init("20%",8, 9, false,
 PrefabFactory.defaultFps, 32, 32);

 gl10 = new Animation();
 gl10.init("10%", 9, 10, false,
 PrefabFactory.defaultFps, 32, 32);

 gl0 = new Animation();
 gl0.init("0%", 10, 10, false,
 PrefabFactory.defaultFps, 32, 32);

 glRestored = new Animation();
 gl0.init("Restored", 10, 10, false,
 PrefabFactory.defaultFps, 32, 32);

 ga100 = new GraphicAnimation(graphic, gl100);
 ga90 = new GraphicAnimation(graphic, gl90);
 ga80 = new GraphicAnimation(graphic, gl80);
 ga70 = new GraphicAnimation(graphic, gl70);
 ga60 = new GraphicAnimation(graphic, gl60);
 ga50 = new GraphicAnimation(graphic, gl50);
 ga40 = new GraphicAnimation(graphic, gl40);
 ga30 = new GraphicAnimation(graphic, gl30);
 ga20 = new GraphicAnimation(graphic, gl20);
 ga10 = new GraphicAnimation(graphic, gl10);
 ga0 = new GraphicAnimation(graphic, gl0);
 gaRestored = new GraphicAnimation(graphic, glRestored);

 go.addComponent(ga100);
 go.addComponent(ga90);
 go.addComponent(ga80);
 go.addComponent(ga70);
 go.addComponent(ga60);
 go.addComponent(ga50);
 go.addComponent(ga40);
 go.addComponent(ga30);
 go.addComponent(ga20);
 go.addComponent(ga10);
 go.addComponent(ga0);
 go.addComponent(gaRestored);

 f = new FixedJoint(g);
 go.addComponent(f);

 hud = new HealthHUD(hc);
 go.addComponent(hud);

 return go;
	}

 static GameObject createHUDHealthBar(GameObject g, HealthController hc)
	{
 GenericGraphic graphic = PrefabFactory.createGraphic("shieldbar",
 PrefabFactory.getImage("shieldbar"),11);

 go = GameObject.getNew();
 go.setTags(Tags.hud | Tags.player | Tags.ally);
 go.setDestroyOnLevelLoad(false);

 go.transform.position.x = g.transform.position.x + HUDConstants.shieldBar.x;
 go.transform.position.y = g.transform.position.y + HUDConstants.shieldBar.y;

 r = new RigidBody();

 /*
 collider = new BoxCollider(new Vector2(32, 32));
 collider.setIgnoreTags(Tags.player | Tags.ally | Tags.topOfScreen | Tags.enemy);
 r.setCollider(collider);ll
 */

 go.setRigidBody(r);

 gl100 = new Animation();
 gl100.init("0%", 0, 0, false,
 PrefabFactory.defaultFps, 32, 32);

 gl90 = new Animation();
 gl90.init("10%", 1, 1, false,
 PrefabFactory.defaultFps, 32, 32);

 gl80 = new Animation();
 gl80.init("20%", 2, 2, false,
 PrefabFactory.defaultFps, 32, 32);

 gl70 = new Animation();
 gl70.init("30%", 3, 3, false,
 PrefabFactory.defaultFps, 32, 32);

 gl60 = new Animation();
 gl60.init("40%", 4, 4, false,
 PrefabFactory.defaultFps, 32, 32);

 gl50 = new Animation();
 gl50.init("50%", 5, 5, false,
 PrefabFactory.defaultFps, 32, 32);

 gl40 = new Animation();
 gl40.init("60%", 6, 6, false,
 PrefabFactory.defaultFps, 32, 32);

 gl30 = new Animation();
 gl30.init("70%", 7, 7, false,
 PrefabFactory.defaultFps, 32, 32);

 gl20 = new Animation();
 gl20.init("80%",8, 8, false,
 PrefabFactory.defaultFps, 32, 32);

 gl10 = new Animation();
 gl10.init("90%", 9, 9, true,
 PrefabFactory.defaultFps, 32, 32);

 gl0 = new Animation();
 gl0.init("100%", 10, 10, false,
 PrefabFactory.defaultFps, 32, 32);

 ga100 = new GraphicAnimation(graphic, gl100);
 ga90 = new GraphicAnimation(graphic, gl90);
 ga80 = new GraphicAnimation(graphic, gl80);
 ga70 = new GraphicAnimation(graphic, gl70);
 ga60 = new GraphicAnimation(graphic, gl60);
 ga50 = new GraphicAnimation(graphic, gl50);
 ga40 = new GraphicAnimation(graphic, gl40);
 ga30 = new GraphicAnimation(graphic, gl30);
 ga20 = new GraphicAnimation(graphic, gl20);
 ga10 = new GraphicAnimation(graphic, gl10);
 ga0 = new GraphicAnimation(graphic, gl0);

 go.addComponent(ga100);
 go.addComponent(ga90);
 go.addComponent(ga80);
 go.addComponent(ga70);
 go.addComponent(ga60);
 go.addComponent(ga50);
 go.addComponent(ga40);
 go.addComponent(ga30);
 go.addComponent(ga20);
 go.addComponent(ga10);
 go.addComponent(ga0);

 f = new FixedJoint(g);
 go.addComponent(f);

 hud = new HealthBarHUD(hc);
 go.addComponent(hud);

 return go;
	}

 static createPowerUp(position, type, canChange) {
 // Load the texture for the cube once during Surface creation

 let o = GameObject.getNew();
 //GameObject o = new GameObject();
 o.setName("PowerUp");
 o.setTags(Tags.powerup);
 let graphic = PrefabFactory.createGraphic("powerup", PrefabFactory.getImage("powerup"),9);

 let animation = Animation.getNew();
 animation.init("Laser", 0, 0, true, PrefabFactory.defaultFps,	32, 32);
 let animation2 = Animation.getNew();
 animation2.init("MachineGun", 1, 1, true, PrefabFactory.defaultFps,	32, 32);
 let animation3 = Animation.getNew();
 animation3.init("FlameThrower", 2, 2, true, PrefabFactory.defaultFps,	32, 32);
 let animation4 = Animation.getNew();
 animation4.init("PulseCannon", 3, 3, true, PrefabFactory.defaultFps,	32, 32);
 let animation5 = Animation.getNew();

 let animation9 = Animation.getNew();
 animation9.init("Ally", 5, 5, true, PrefabFactory.defaultFps,	32, 32);
 let animation10 = Animation.getNew();
 animation10.init("Support", 8, 8, true, PrefabFactory.defaultFps,	32, 32);
 let animation11 = Animation.getNew();
 animation11.init("GunShip", 10, 10, true, PrefabFactory.defaultFps,	32, 32);

 animation5.init("LockingLaser", 6, 6, true, PrefabFactory.defaultFps,	32, 32);
 let animation6 = Animation.getNew();
 animation6.init("MissileLauncher", 7, 7, true, PrefabFactory.defaultFps,	32, 32);

 let animation7 = Animation.getNew();
 animation7.init("ChargeLaser", 9, 9, true, PrefabFactory.defaultFps,	32, 32);

 let animation8 = Animation.getNew();
 animation8.init("Health", 4, 4, true, PrefabFactory.defaultFps,	32, 32);

 let glIdle = new GraphicAnimation(graphic, animation);
 let glIdle2 = new GraphicAnimation(graphic, animation2);
 let glIdle3 = new GraphicAnimation(graphic, animation3);
 let glIdle4 = new GraphicAnimation(graphic, animation4);
 let glIdle5 = new GraphicAnimation(graphic, animation5);
 let glIdle6 = new GraphicAnimation(graphic, animation6);
 let glIdle7 = new GraphicAnimation(graphic, animation7);
 let glIdle8 = new GraphicAnimation(graphic, animation8);
 let glIdle9 = new GraphicAnimation(graphic, animation9);
 let glIdle10 = new GraphicAnimation(graphic, animation10);
 let glIdle11 = new GraphicAnimation(graphic, animation11);

 o.addComponent(glIdle);
 o.addComponent(glIdle2);
 o.addComponent(glIdle3);
 o.addComponent(glIdle4);
 o.addComponent(glIdle5);
 o.addComponent(glIdle6);
 o.addComponent(glIdle7);
 o.addComponent(glIdle8);
 o.addComponent(glIdle9);
 o.addComponent(glIdle10);
 o.addComponent(glIdle11);

 glIdle2.setEnabled(false);
 glIdle3.setEnabled(false);
 glIdle4.setEnabled(false);
 glIdle5.setEnabled(false);
 glIdle6.setEnabled(false);
 glIdle7.setEnabled(false);
 glIdle8.setEnabled(false);
 glIdle9.setEnabled(false);
 glIdle10.setEnabled(false);
 glIdle11.setEnabled(false);
 glIdle.play();

 let collider = new BoxCollider(new Vector2(32, 32));
 collider.setIgnoreTags(Tags.powerup);

 let rigidBody = new RigidBody();
 rigidBody.setCollider(collider);
 o.setRigidBody(rigidBody);

 let sm = SimpleMovement.getNew();
 sm.init(rigidBody, 0, 32);

 sm.setSpeed(0,32);
 o.addComponent(sm);

 let spoc = new SetPositionOnCreate(position);
 //System.out.println("TYPE:"+type);
 let p = new PowerUp(sm, type, canChange);
 o.addComponent(p);
 p.setType(type);
 o.addComponent(spoc);
 o.addComponent(new DestroyOnOutOfBounds());

 let o;
	}
 static GameObject createRandomLevel ()
	{
 o = GameObject.getNew();
 //GameObject o = new GameObject();
 o.addComponent(new RandomSpawner());
 return o;
	}

 v32by32 = new Vector2(32, 32);

 static GameObject createShot( String name,
 Vector2 position, Vector2 speed, int tags,
 float damage, int power, float life) {
 // Load the texture for the cube once during Surface creation

 GenericGraphic graphic = PrefabFactory.createGraphic(name,
 PrefabFactory.getImage(name),9);

 animation = Animation.getNew();
 collider = null;


 if (name.equals("phaser")) {
 animation.init("idle", 0, 6, true, PrefabFactory.defaultFps, 32, 32);;
 }
 else if (name.equals("pulse") || name.equals("hell"))
 {
 if (power < 0)
 {
 animation.init("idle", 0, 4, false,PrefabFactory.defaultFps, 32, 32);
 }
 else
 {
 animation.init("idle", power, 4, false,PrefabFactory.defaultFps, 32, 32);
 }
 }
 else if (name.equals("flame"))
 {
 if (power < 0)
 {
 animation.init("idle", 0, 8, false,PrefabFactory.defaultFps/8, 32, 32);
 }
 else
 {
 animation.init("idle", power, 8, false,PrefabFactory.defaultFps/8, 32, 32);
 }
 }
 else if (name.equals("missile"))
 {
 animation.init("idle", 0, 2, true, PrefabFactory.defaultFps,32, 32);
 }
 else if (name.equals("chargeLaser"))
 {
 animation.init("idle", 0, 2, true, PrefabFactory.defaultFps,32, 32);
 }
 else {
 if (power <= 9)
 {
 animation.init("idle", power, power, true, PrefabFactory.defaultFps,32, 32);
 }
 else
 {
 animation.init("idle", 9, 9, true, PrefabFactory.defaultFps,32, 32);
 }
 }

collider = new BoxCollider(v32by32);
 collider.setIgnoreTags(tags);

 glIdle = new GraphicAnimation(graphic, animation);
 glIdle.play();

 sc = new ShotCollision();
 sc.setDamage(damage);

 rigidBody = new RigidBody();
 rigidBody.setCollider(collider);

 o = GameObject.getNew();

 newTags = tags | Tags.shot;
 o.setName(name);
 o.setTags(newTags);
 o.transform.position.x = position.x;
 o.transform.position.y = position.y;
 o.setRigidBody(rigidBody);
 o.addComponent(sc);

 if (!name.equals("missile"))
 {
 basicShotMovement = SimpleMovement.getNew();
 basicShotMovement.init(rigidBody, speed.x, speed.y);
 o.addComponent(basicShotMovement);
 }
 else
 {
 basicShotMovement = new HomingMovement(PrefabFactory.playerTargets, rigidBody, speed.y);
 o.addComponent(basicShotMovement);
 }

 if (name.equals("missile") || name.equals("lockingLaser"))
 {
 fsd = new FaceSpeedDirection(rigidBody);
 o.addComponent(fsd);
 }

 o.addComponent(glIdle);

 o.addComponent(new DestroyOnOutOfBounds());
 o.destroyAfter(life);

 return o;
	}


 static GameObject createHUD (GameObject camera, GameObject player)
	{
 go = GameObject.getNew();
 go.setTags(Tags.hud | Tags.player | Tags.ally);
 rigidBody = new RigidBody();
 go.setRigidBody(rigidBody);

 c = (HealthController)player.getComponent(HealthController.class);
 sh = new ScoreHUD(c);
 go.addComponent(sh);

 graphic = PrefabFactory.createGraphic("hud1", PrefabFactory.getImage("hud1"),11);

 idle = new Animation();
 idle.init("idle", 0, 0, false, PrefabFactory.defaultFps, 98, 32);

 ga100 = new GraphicAnimation(graphic, idle);


 fj = new FixedJoint(camera);
 go.addComponent(fj);
 go.addComponent(ga100);
 go.playAnimation("idle");

 go.transform.position.x = camera.transform.position.x + HUDConstants.hud.x;
 go.transform.position.y = camera.transform.position.y + HUDConstants.hud.y;

 return go;
	}

 static GameObject createSpawner ( float spawnX, float spawnY, GameObject objectToCreate)
	{
 spawner = GameObject.getNew();
 //GameObject spawner = new GameObject();
 rigidBody = new RigidBody();
 c = new BoxCollider(new Vector2(800,32));
 rigidBody.setCollider(c);

 spawner.setTags(Tags.spawner);
 c.setIgnoreTags(Tags.spawner | Tags.shot | Tags.player | Tags.enemy | Tags.powerup);

 spawner.setRigidBody(rigidBody);
 spawner.addComponent(new SpawnOnCollision(objectToCreate));

 /*
 s = SimpleMovement.getNew();
 s.init(rigidBody, 0, 10.0f);
 spawner.addComponent(s);
 */

 PrefabFactory.spawner++;
 spawner.setName("spawner " + PrefabFactory.spawner + " " + objectToCreate.getName());

 spawner.transform.position.x = spawnX;
 spawner.transform.position.y = spawnY;

 return spawner;
	}

 static GameObject createDifficultyButton (String difficulty, int x, int y)
	{
 go = GameObject.getNew();
 go.setTags(Tags.hud);
 rigidBody = new RigidBody();

 rigidBody.setCollider(new BoxCollider(new Vector2(100,32)));
 go.setRigidBody(rigidBody);

 graphic = PrefabFactory.createGraphic("diff"+difficulty, PrefabFactory.getImage("difficulty"),32);

 dc = null;
 idle = new Animation();

 if (difficulty.equals("easy")) {
 idle.init("idle", 0, 0, false, PrefabFactory.defaultFps, 98, 32);
	let dc = new DifficultyButton(DifficultyButton.EASY);
 }
 else if (difficulty.equals("normal") || difficulty.equals("medium")) {
 idle.init("idle", 1, 1, false, PrefabFactory.defaultFps, 98, 32);
	let dc = new DifficultyButton(DifficultyButton.MEDIUM);
 }
 else if (difficulty.equals("hard")) {
 idle.init("idle", 2, 2, false, PrefabFactory.defaultFps, 98, 32);
	let dc = new DifficultyButton(DifficultyButton.HARD);
 }
 else {
 throw new RuntimeException("Difficulty Not Found:" + difficulty);
 }

 ga100 = new GraphicAnimation(graphic, idle);

 go.addComponent(ga100);
 go.playAnimation("idle");
 go.addComponent(dc);

 go.transform.position.x = x;
 go.transform.position.y = y;
 go.setDestroyOnLevelLoad(true);
 return go;
	}

 static GameObject createGenericGraphic (String image, int posx, int posy, int width, int height)
	{
 go = GameObject.getNew();
 go.setTags(Tags.hud);
 rigidBody = new RigidBody();
 rigidBody.setCollider(new BoxCollider(new Vector2(100,32)));
 go.setRigidBody(rigidBody);

 graphic = PrefabFactory.createGraphic(image, PrefabFactory.getImage(image),30);

 idle = new Animation();
 idle.init("idle", 0, 0, false, PrefabFactory.defaultFps, width, height);
 ga100 = new GraphicAnimation(graphic, idle);

 go.addComponent(ga100);
 go.playAnimation("idle");

 go.transform.position.x = posx;
 go.transform.position.y = posy;
 go.setDestroyOnLevelLoad(true);
 return go;
	}

 static GameObject createTopOfScreen ()
	{
 go = GameObject.getNew();
 //GameObject go = new GameObject();
 go.setName("TopOfScreen");

 go.transform.position.x = 0;
 go.transform.position.y = 0;

 r = new RigidBody();
 c = new BoxCollider(new Vector2(800,32));
 //go.setTags(Tags.topOfScreen);
 //c.setIgnoreTags(Tags.shot);
 r.setCollider(c);
 go.setRigidBody(r);

 //PositionEchoer pe = new PositionEchoer();
 //go.addComponent(pe);


 return go;
	}

	//consider changing to a hashmap!
 static InputStream elaser;
 static InputStream laser;
 static InputStream enemy;
 static getImage(name) {
 if (name.equals("calumniator")) {
 return PrefabFactory.context.getResources().openRawResource(
 + R.drawable.pcalumniator);
 }
 else if (name.equals("exemplar")) {
 return PrefabFactory.context.getResources().openRawResource(
 + R.drawable.pexemplar);
 }
 else if (name.equals("escort")) {
 return PrefabFactory.context.getResources().openRawResource(
 + R.drawable.escort);
 }
 else if (name.equals("hunter")) {
 return PrefabFactory.context.getResources().openRawResource(
 + R.drawable.phunter);

 }
 else if (name.equals("paladin")) {
 return PrefabFactory.context.getResources().openRawResource(
 + R.drawable.ppaladin);
 }
 else if (name.equals("pariah")) {
 return PrefabFactory.context.getResources().openRawResource(
 + R.drawable.ppariah);
 }
 else if (name.equals("sentinel")) {
 return PrefabFactory.context.getResources().openRawResource(
 + R.drawable.psentinel);
 }
 else if (name.equals("renegade")) {
 return PrefabFactory.context.getResources().openRawResource(
 + R.drawable.prenegade);
 }
 else if (name.equals("chargebar")) {
 return PrefabFactory.context.getResources().openRawResource(
 + R.drawable.chargebar);
 }
 else if (name.equals("laser")) {
 let laser;
 }
 else if (name.equals("bullet")) {
 return PrefabFactory.context.getResources().openRawResource(
 + R.drawable.hmgun);
 }
 else if (name.equals("lockingLaser")) {
 return PrefabFactory.context.getResources().openRawResource(
 + R.drawable.hlockinglaser);
 }
 else if (name.equals("chargeLaser")) {
 return PrefabFactory.context.getResources().openRawResource(
 + R.drawable.hchargelaser);
 }
 else if (name.equals("flame")) {
 return PrefabFactory.context.getResources().openRawResource(
 + R.drawable.hflame);
 }
 else if (name.equals("pulse")) {
 return PrefabFactory.context.getResources().openRawResource(
 + R.drawable.hpulse);
 }
 else if (name.equals("hud1")) {
 return PrefabFactory.context.getResources().openRawResource(
 + R.drawable.hud1);
 }
 else if (name.equals("phaser")) {
 let elaser;
 }
 else if (name.equals("enemy")) {
 let enemy;
 }
 else if (name.equals("powerup")) {
 return PrefabFactory.context.getResources().openRawResource(
 + R.drawable.powerup);
 }
 else if (name.equals("level4")) {
 return PrefabFactory.context.getResources().openRawResource(+ R.drawable.level4);
 }
 else if (name.equals("level1")) {
 return PrefabFactory.context.getResources().openRawResource(+ R.drawable.level1);
 }
 else if (name.equals("level2")) {
 return PrefabFactory.context.getResources().openRawResource(+ R.drawable.level2);
 }
 else if (name.equals("level3")) {
 return PrefabFactory.context.getResources().openRawResource(+ R.drawable.level3);
 }
 else if (name.equals("level5")) {
 return PrefabFactory.context.getResources().openRawResource(+ R.drawable.level5);
 }
 else if (name.equals("level6")) {
 return PrefabFactory.context.getResources().openRawResource(+ R.drawable.level6);
 }
 else if (name.equals("level7")) {
 return PrefabFactory.context.getResources().openRawResource(+ R.drawable.level7);
 }
 else if (name.equals("level8")) {
 return PrefabFactory.context.getResources().openRawResource(+ R.drawable.level8);
 }
 else if (name.equals("level9")) {
 return PrefabFactory.context.getResources().openRawResource(+ R.drawable.level9);
 }
 else if (name.equals("level10")) {
 return PrefabFactory.context.getResources().openRawResource(+ R.drawable.level10);
 }
 else if (name.equals("level11")) {
 return PrefabFactory.context.getResources().openRawResource(+ R.drawable.level11);
 }
 else if (name.equals("level12")) {
 return PrefabFactory.context.getResources().openRawResource(+ R.drawable.level12);
 }
 else if (name.equals("explosion")) {
 return PrefabFactory.context.getResources().openRawResource(
 + R.drawable.exp1);
 }
 else if (name.equals("missile"))
 {
 return PrefabFactory.context.getResources().openRawResource(+ R.drawable.hmissile);
 }
 else if (name.equals("shield")) {
 return PrefabFactory.context.getResources().openRawResource(
 + R.drawable.shield);
 }
 else if (name.equals("shieldbar")) {
 return PrefabFactory.context.getResources().openRawResource(
 + R.drawable.shieldbar);
 }
 else if (name.equals("boss2")) {
 return PrefabFactory.context.getResources().openRawResource(
 + R.drawable.boss2);
 }
 else if (name.equals("boss3")) {
 return PrefabFactory.context.getResources().openRawResource(
 + R.drawable.boss3);
 }
 else if (name.equals("boss4")) {
 return PrefabFactory.context.getResources().openRawResource(
 + R.drawable.boss4);
 }
 else if (name.equals("boss5")) {
 return PrefabFactory.context.getResources().openRawResource(
 + R.drawable.boss5);
 }
 else if (name.equals("difficulty")) {
 return PrefabFactory.context.getResources().openRawResource(
 + R.drawable.difficulty);
 }
 else if (name.equals("splash")) {
 return PrefabFactory.context.getResources().openRawResource(
 + R.drawable.splash);
 }

 throw new RuntimeException("image "+name+" not found!");
	}


 static setContext(c) {
 PrefabFactory.context = c;
 init();
	}

 static void init ()
	{
laser = PrefabFactory.context.getResources().openRawResource(+ R.drawable.hlaser);
elaser = PrefabFactory.context.getResources().openRawResource(+ R.drawable.helaser);
enemy = PrefabFactory.context.getResources().openRawResource(+ R.drawable.enemy);
	}

 static createBoss(name, position, bossType, nextLevel) {
 /*
 let pl = GameObject.findByName("player");
 pl.addComponent(new LoadLevelAfter(nextLevel, 300));
 */
 if (bossType == 2)
 {
 return createBoss2(name,position,bossType,nextLevel);
 }
 if (bossType == 3)
 {
 return createBoss3(name,position,bossType,nextLevel);
 }
 if (bossType == 4)
 {
 return createBoss4(name,position,bossType,nextLevel);
 }
 if (bossType == 5)
 {
 return createBoss5(name,position,bossType,nextLevel);
 }

 return createBoss3(name,position,bossType,nextLevel);
	}

 static createBoss2(name, position, bossType, nextLevel) {
 // Load the texture for the cube once during Surface creation
 GenericGraphic graphic = PrefabFactory.createGraphic("boss2",
 PrefabFactory.getImage("boss2"),8);

 let startFrame = 0;
 let endFrame = 2;

 let idle = Animation.getNew();
 idle.init("idle", startFrame, endFrame,
 true, PrefabFactory.defaultFps, 208, 98);

 let death = Animation.getNew();
 death.init("death", 0,
 2, false, PrefabFactory.defaultFps, 208, 98);

 let glIdle = new GraphicAnimation(graphic, idle);
 let glDeath = new GraphicAnimation(graphic, death);
 glIdle.play();

 let rigidBody = new RigidBody();
 let collider = new BoxCollider(new Vector2(208, 98));
 collider.setIgnoreTags( PrefabFactory.playerTargets );
 rigidBody.setCollider(collider);

 let o = GameObject.getNew();
 // GameObject o = new GameObject();
 o.setName("boss2");
 o.setTags(Tags.enemy);
 o.transform.position.x = position.x;
 o.transform.position.y = position.y;
 o.setRigidBody(rigidBody);


/*
 GameObject [] nodes = {
 GameObject.getNew(),
 GameObject.getNew(),
 GameObject.getNew(),
 GameObject.getNew(),
 GameObject.getNew(),
 GameObject.getNew(),
 };
 /*
 nodes[0] = GameObject.create(PrefabFactory.createNode(new Vector2(0,-32),0.0f));
 nodes[1] = GameObject.create(PrefabFactory.createNode(new Vector2(0,800-32),0.0f));
 nodes[2] = GameObject.create(PrefabFactory.createNode(new Vector2(400,800-32),0.0f));
 nodes[3] = GameObject.create(PrefabFactory.createNode(new Vector2(400,0),0.0f));
 nodes[4] = GameObject.create(PrefabFactory.createNode(new Vector2(0,0),0.0f));
 nodes[5] = GameObject.create(PrefabFactory.createNode(new Vector2(0,900),0.0f));
	ai = new AINodeFollower(nodes);*/

 hc = new HealthController(new Audio(PrefabFactory.createAudio("explosion"),"explosion"));
 hc.setHealth(5000);

 ai = new AIBoss2(hc);

 weapons = new Weapon[8];

 weapons[0] = new Phaser(PrefabFactory.shootLeft, 3);
 o.addComponent(weapons[0]);
 weapons[0].setOffset(86, 82);

 weapons[1] = new Phaser(PrefabFactory.shootDownLeft, 3);
 o.addComponent(weapons[1]);
 weapons[1].setOffset(86, 82);

 weapons[2] = new Phaser(PrefabFactory.shootDownRight, 3);
 o.addComponent(weapons[2]);
 weapons[2].setOffset(86, 82);

 weapons[3] = new Phaser(PrefabFactory.shootRight, 3);
 o.addComponent(weapons[3]);
 weapons[3].setOffset(86, 82);

 weapons[4] = new Phaser(PrefabFactory.shootDown, 3);
 o.addComponent(weapons[4]);
 weapons[4].setOffset(32-18, 80);

 weapons[5] = new Phaser(PrefabFactory.shootDown, 3);
 o.addComponent(weapons[5]);
 weapons[5].setOffset(146+18, 80);

 weapons[6] = new Phaser(PrefabFactory.shootDown, 0.3f, 8, 5);
 wh4 = new LockingWeaponHandler(weapons[6],PrefabFactory.enemyTargets,false);
 weapons[6].setOffset(32, 80);
 o.addComponent(weapons[6]);
 o.addComponent(wh4);

 weapons[7] = new Phaser(PrefabFactory.shootDown, 0.3f, 8, 5);
 wh5 = new LockingWeaponHandler(weapons[7],PrefabFactory.enemyTargets,false);
 weapons[7].setShots(100);
 weapons[7].setOffset(146, 80);
 o.addComponent(weapons[7]);
 o.addComponent(wh5);

 bwh = new Boss2WeaponHandler(weapons,hc);
 o.addComponent(bwh);

 explosion1 = PrefabFactory.createExplosion(o.transform.position);
 o.addComponent(new SpawnOnDestroy(explosion1));

 explosion2 = PrefabFactory.createExplosion(o.transform.position);
 o.addComponent(new SpawnOnDestroy(explosion2));

 explosion3 = PrefabFactory.createExplosion(o.transform.position);
 o.addComponent(new SpawnOnDestroy(explosion3));

 llod = new LoadLevelOnDestroy(nextLevel);
 o.addComponent(llod);
 //o.addComponent(new DestroyOnOutOfBounds());
 o.addComponent(glIdle);
 o.addComponent(glDeath);
 o.addComponent(ai);
 o.addComponent(hc);
 o.addComponent(new StopMovementOnCreate());

 //System.out.println("boss2");

 return o;
	}

 static createBoss3(name, position, bossType, nextLevel) {
 // Load the texture for the cube once during Surface creation
 GenericGraphic graphic = PrefabFactory.createGraphic("boss3",
 PrefabFactory.getImage("boss3"),8);

 let startFrame = 0;
 let endFrame = 2;

 let idle = Animation.getNew();
 idle.init("idle", startFrame, endFrame,
 true, PrefabFactory.defaultFps, 230, 140);

 let death = Animation.getNew();
 death.init("death", 0,
 2, false, PrefabFactory.defaultFps, 230, 140);

 let glIdle = new GraphicAnimation(graphic, idle);
 let glDeath = new GraphicAnimation(graphic, death);
 glIdle.play();

 let rigidBody = new RigidBody();
 let collider = new BoxCollider(new Vector2(230, 138));
 collider.setIgnoreTags(PrefabFactory.playerTargets);
 rigidBody.setCollider(collider);

 let o = GameObject.getNew();
 // GameObject o = new GameObject();

 o.setName("boss3");
 o.setTags(Tags.enemy);
 o.transform.position.x = position.x;
 o.transform.position.y = position.y;
 o.setRigidBody(rigidBody);

/*
 GameObject [] nodes = {
 GameObject.getNew(),
 GameObject.getNew(),
 GameObject.getNew(),
 GameObject.getNew(),
 GameObject.getNew(),
 GameObject.getNew(),
 };
 /*
 nodes[0] = GameObject.create(PrefabFactory.createNode(new Vector2(0,-32),0.0f));
 nodes[1] = GameObject.create(PrefabFactory.createNode(new Vector2(0,800-32),0.0f));
 nodes[2] = GameObject.create(PrefabFactory.createNode(new Vector2(400,800-32),0.0f));
 nodes[3] = GameObject.create(PrefabFactory.createNode(new Vector2(400,0),0.0f));
 nodes[4] = GameObject.create(PrefabFactory.createNode(new Vector2(0,0),0.0f));
 nodes[5] = GameObject.create(PrefabFactory.createNode(new Vector2(0,900),0.0f));
	ai = new AINodeFollower(nodes);
*/

 hc = new HealthController(new Audio(PrefabFactory.createAudio("explosion"),"explosion"));
 hc.setHealth(5000);

 ai = new AIBoss3(hc);

 weapons = new Weapon[8];

 weapons[0] = new Phaser(PrefabFactory.shootDown, 1.5f, 8 ,5);
 o.addComponent(weapons[0]);
 weapons[0].setOffset(117-16, 139-16);
 weapons[0].setShotDelay(0.0f);

 weapons[1] = new Phaser(PrefabFactory.shootDown, 1.5f, 8, 5);
 o.addComponent(weapons[1]);
 weapons[1].setOffset(98-16, 139-16);
 weapons[1].setShotDelay(0.5f);

 weapons[2] = new Phaser(PrefabFactory.shootDown, 1.5f, 8, 5);
 o.addComponent(weapons[2]);
 weapons[2].setOffset(137-16, 139-16);
 weapons[2].setShotDelay(1.0f);


 weapons[3] = new Phaser(PrefabFactory.shootDown, 3);
 o.addComponent(weapons[3]);
 weapons[3].setOffset(75-16, 116-16);

 weapons[4] = new Phaser(PrefabFactory.shootDown, 3);
 o.addComponent(weapons[4]);
 weapons[4].setOffset(160-16, 116-16);

 weapons[5] = new Phaser(PrefabFactory.shootDown, 3);
 weapons[5].setOffset(117-16, 139-16);
 weapons[5].setShotDelay(Time.getTime()+1);
 wh7 = new LockingWeaponHandler(weapons[5],PrefabFactory.enemyTargets,false);
 o.addComponent(weapons[5]);
 o.addComponent(wh7);

 weapons[6] = new Phaser(PrefabFactory.shootDown, 0.3f, 8, 5);
 wh4 = new LockingWeaponHandler(weapons[6],PrefabFactory.enemyTargets,false);
 weapons[6].setOffset(1-16, 122-16);
 o.addComponent(weapons[6]);
 o.addComponent(wh4);

 weapons[7] = new Phaser(PrefabFactory.shootDown, 0.3f, 8, 5);
 wh5 = new LockingWeaponHandler(weapons[7],PrefabFactory.enemyTargets,false);
 weapons[7].setShots(100);
 weapons[7].setOffset(233-16, 122-16);
 o.addComponent(weapons[7]);
 o.addComponent(wh5);

 bwh = new Boss3WeaponHandler(weapons,hc);
 o.addComponent(bwh);

 explosion1 = PrefabFactory.createExplosion(o.transform.position);
 o.addComponent(new SpawnOnDestroy(explosion1));

 explosion2 = PrefabFactory.createExplosion(o.transform.position);
 o.addComponent(new SpawnOnDestroy(explosion2));

 explosion3 = PrefabFactory.createExplosion(o.transform.position);
 o.addComponent(new SpawnOnDestroy(explosion3));

 llod = new LoadLevelOnDestroy(nextLevel);
 o.addComponent(llod);
 //o.addComponent(new DestroyOnOutOfBounds());
 o.addComponent(glIdle);
 o.addComponent(glDeath);
 o.addComponent(ai);
 o.addComponent(hc);
 o.addComponent(new StopMovementOnCreate());

 //System.out.println("boss3");

 return o;
	}

 static createBoss4(name, position, bossType, nextLevel) {
 // Load the texture for the cube once during Surface creation
 GenericGraphic graphic = PrefabFactory.createGraphic("boss4",
 PrefabFactory.getImage("boss4"),8);

 let startFrame = 0;
 let endFrame = 2;

 let idle = Animation.getNew();
 idle.init("idle", startFrame, endFrame,
 true, PrefabFactory.defaultFps, 208, 98);

 let death = Animation.getNew();
 death.init("death", 0,
 2, false, PrefabFactory.defaultFps, 208, 98);

 let glIdle = new GraphicAnimation(graphic, idle);
 let glDeath = new GraphicAnimation(graphic, death);
 glIdle.play();

 let rigidBody = new RigidBody();
 let collider = new BoxCollider(new Vector2(208, 98));
 collider.setIgnoreTags(PrefabFactory.playerTargets);
 rigidBody.setCollider(collider);

 let o = GameObject.getNew();
 // GameObject o = new GameObject();

 o.setName("boss4");
 o.setTags(Tags.enemy);
 o.transform.position.x = position.x;
 o.transform.position.y = position.y;
 o.setRigidBody(rigidBody);

 let hc = new HealthController(new Audio(PrefabFactory.createAudio("explosion"),"explosion"));
 hc.setHealth(5000);

 let ai = new AIBoss4(hc);

 let weapons = new Weapon[12];

 weapons[0] = new Phaser(PrefabFactory.shootDown, 6);
 weapons[0].setOffset(18-16, 75-16);
 weapons[0].setShotDelay(0.0f);
 let wh0 = new LockingWeaponHandler(weapons[0],PrefabFactory.enemyTargets,false);
 o.addComponent(weapons[0]);
 o.addComponent(wh0);

 weapons[1] = new Phaser(PrefabFactory.shootDown, 6);
 weapons[1].setOffset(42-16, 83-16);
 weapons[1].setShotDelay(0.5f);
 let wh1 = new LockingWeaponHandler(weapons[1],PrefabFactory.enemyTargets,false);
 o.addComponent(weapons[1]);
 o.addComponent(wh1);

 weapons[2] = new Phaser(PrefabFactory.shootDown, 6);
 weapons[2].setOffset(73-16, 96-16);
 weapons[2].setShotDelay(1.0f);
 let wh2 = new LockingWeaponHandler(weapons[2],PrefabFactory.enemyTargets,false);
 o.addComponent(weapons[2]);
 o.addComponent(wh2);

 weapons[3] = new Phaser(PrefabFactory.shootDown, 6);
 weapons[3].setOffset(136-16, 96-16);
 weapons[3].setShotDelay(1.5f);
 let wh3 = new LockingWeaponHandler(weapons[3],PrefabFactory.enemyTargets,false);
 o.addComponent(weapons[3]);
 o.addComponent(wh3);

 weapons[4] = new Phaser(PrefabFactory.shootDown, 6);
 weapons[4].setOffset(166-16, 81-16);
 weapons[4].setShotDelay(2.0f);
 let wh4 = new LockingWeaponHandler(weapons[4],PrefabFactory.enemyTargets,false);
 o.addComponent(weapons[4]);
 o.addComponent(wh4);


 weapons[5] = new Phaser(PrefabFactory.shootDown, 6);
 weapons[5].setOffset(191-16, 75-16);
 weapons[5].setShotDelay(2.5f);
 let wh5 = new LockingWeaponHandler(weapons[5],PrefabFactory.enemyTargets,false);
 o.addComponent(weapons[5]);
 o.addComponent(wh5);

 weapons[6] = new Phaser(PrefabFactory.shootLeft, 3);
 o.addComponent(weapons[6]);
 weapons[6].setOffset(105-16, 86-16);

 weapons[7] = new Phaser(PrefabFactory.shootDownLeft, 3);
 o.addComponent(weapons[7]);
 weapons[7].setOffset(105-16, 86-16);

 weapons[8] = new Phaser(PrefabFactory.shootDownRight, 3);
 o.addComponent(weapons[8]);
 weapons[8].setOffset(105-16, 86-16);

 weapons[9] = new Phaser(PrefabFactory.shootRight, 3);
 o.addComponent(weapons[9]);
 weapons[9].setOffset(105-16, 86-16);

 weapons[10] = new Phaser(PrefabFactory.shootDown, 3);
 o.addComponent(weapons[10]);
 weapons[10].setOffset(105-16, 86-16);

 weapons[11] = new Phaser(PrefabFactory.shootDown, 0.3f, 8, 5);
 let wh11 = new LockingWeaponHandler(weapons[11],PrefabFactory.enemyTargets,false);
 weapons[11].setOffset(105-16, 63-16);
 o.addComponent(weapons[11]);
 o.addComponent(wh11);



 let bwh = new Boss4WeaponHandler(weapons,hc);
 o.addComponent(bwh);

 let explosion1 = PrefabFactory.createExplosion(o.transform.position);
 o.addComponent(new SpawnOnDestroy(explosion1));

 let explosion2 = PrefabFactory.createExplosion(o.transform.position);
 o.addComponent(new SpawnOnDestroy(explosion2));

 let explosion3 = PrefabFactory.createExplosion(o.transform.position);
 o.addComponent(new SpawnOnDestroy(explosion3));

 let llod = new LoadLevelOnDestroy(nextLevel);
 o.addComponent(llod);
 //o.addComponent(new DestroyOnOutOfBounds());
 o.addComponent(glIdle);
 o.addComponent(glDeath);
 o.addComponent(ai);
 o.addComponent(hc);
 o.addComponent(new StopMovementOnCreate());

 //System.out.println("boss4");

 let o;
	}


 static createBoss5(name, position, bossType, nextLevel) {
 // Load the texture for the cube once during Surface creation
 GenericGraphic graphic = PrefabFactory.createGraphic("boss5",
 PrefabFactory.getImage("boss5"),8);

 let startFrame = 0;
 let endFrame = 2;

 let idle = Animation.getNew();
 idle.init("idle", startFrame, endFrame,
 true, PrefabFactory.defaultFps, 478, 298);

 let death = Animation.getNew();
 death.init("death", 0,
 2, false, PrefabFactory.defaultFps, 478, 298);

 let glIdle = new GraphicAnimation(graphic, idle);
 let glDeath = new GraphicAnimation(graphic, death);
 glIdle.play();

 let rigidBody = new RigidBody();
 let collider = new BoxCollider(new Vector2(478, 200));
 collider.setIgnoreTags(PrefabFactory.playerTargets);
 rigidBody.setCollider(collider);

 let o = GameObject.getNew();
 // GameObject o = new GameObject();

 o.setName("boss5");
 o.setTags(Tags.enemy);
 o.transform.position.x = position.x;
 o.transform.position.y = position.y;
 o.setRigidBody(rigidBody);

 let hc = new HealthController(new Audio(PrefabFactory.createAudio("explosion"),"explosion"));
 hc.setHealth(5000);

 let ai = new AIBoss5(hc);

 let weapons = new Weapon[23];

 weapons[0] = new Phaser(PrefabFactory.shootLeft, 6);
 weapons[0].setOffset(82, 183);
 weapons[0].setShotDelay(0.0f);
 o.addComponent(weapons[0]);

 weapons[1] = new Phaser(PrefabFactory.shootDownLeft, 6);
 weapons[1].setOffset(82, 183);
 weapons[1].setShotDelay(0.2f);
 o.addComponent(weapons[1]);

 weapons[2] = new Phaser(PrefabFactory.shootDown, 6);
 weapons[2].setOffset(82, 183);
 weapons[2].setShotDelay(0.4f);
 o.addComponent(weapons[2]);

 weapons[3] = new Phaser(PrefabFactory.shootDownRight, 6);
 weapons[3].setOffset(82, 183);
 weapons[3].setShotDelay(0.6f);
 o.addComponent(weapons[3]);

 weapons[4] = new Phaser(PrefabFactory.shootRight, 6);
 weapons[4].setOffset(82, 183);
 weapons[4].setShotDelay(0.8f);
 o.addComponent(weapons[4]);

 weapons[5] = new Phaser(PrefabFactory.shootDown, 6);
 weapons[5].setOffset(127, 201);
 weapons[5].setShotDelay(2.0f);
 let wh5 = new LockingWeaponHandler(weapons[5],PrefabFactory.enemyTargets,false);
 o.addComponent(weapons[5]);
 o.addComponent(wh5);

 weapons[6] = new Phaser(PrefabFactory.shootDown, 6);
 weapons[6].setOffset(179, 222);
 weapons[6].setShotDelay(2.5f);
 let wh6 = new LockingWeaponHandler(weapons[6],PrefabFactory.enemyTargets,false);
 o.addComponent(weapons[6]);
 o.addComponent(wh6);

 weapons[7] = new Phaser(PrefabFactory.shootDown, 6);
 weapons[7].setOffset(300, 222);
 weapons[7].setShotDelay(3.0f);
 let wh7 = new LockingWeaponHandler(weapons[7],PrefabFactory.enemyTargets,false);
 o.addComponent(weapons[7]);
 o.addComponent(wh7);

 weapons[8] = new Phaser(PrefabFactory.shootDown, 6);
 weapons[8].setOffset(352, 202);
 weapons[8].setShotDelay(3.5f);
 let wh8 = new LockingWeaponHandler(weapons[8],PrefabFactory.enemyTargets,false);
 o.addComponent(weapons[8]);
 o.addComponent(wh8);

 weapons[9] = new Phaser(PrefabFactory.shootLeft, 3);
 o.addComponent(weapons[9]);
 weapons[9].setShotDelay(0.8f);
 weapons[9].setOffset(398, 183);

 weapons[10] = new Phaser(PrefabFactory.shootDownLeft, 3);
 o.addComponent(weapons[10]);
 weapons[10].setShotDelay(0.6f);
 weapons[10].setOffset(398, 183);

 weapons[11] = new Phaser(PrefabFactory.shootDown, 6);
 weapons[11].setOffset(398, 183);
 weapons[11].setShotDelay(0.4f);
 o.addComponent(weapons[11]);

 weapons[12] = new Phaser(PrefabFactory.shootDownRight, 3);
 o.addComponent(weapons[12]);
 weapons[12].setShotDelay(0.2f);
 weapons[12].setOffset(398, 183);

 weapons[13] = new Phaser(PrefabFactory.shootRight, 3);
 o.addComponent(weapons[13]);
 weapons[13].setShotDelay(0.0f);
 weapons[13].setOffset(398, 183);


 weapons[14] = new Phaser(PrefabFactory.shootDown, 0.3f, 8, 5);
 weapons[14].setOffset(51, 154);
 weapons[14].setShotDelay(0.0f);
 let wh14 = new LockingWeaponHandler(weapons[14],PrefabFactory.enemyTargets,false);
 o.addComponent(weapons[14]);
 o.addComponent(wh14);

 weapons[15] = new Phaser(PrefabFactory.shootDown, 0.3f, 8, 5);
 weapons[15].setOffset(428, 154);
 weapons[15].setShotDelay(0.3f*8);
 let wh15 = new LockingWeaponHandler(weapons[15],PrefabFactory.enemyTargets,false);
 o.addComponent(weapons[15]);
 o.addComponent(wh15);

 weapons[16] = new Phaser(PrefabFactory.shootDown, 0.3f, 8, 5);
 weapons[16].setOffset(135-16, 170-16);
 weapons[16].setShotDelay(0.5f);
 let wh16 = new LockingWeaponHandler(weapons[16],PrefabFactory.enemyTargets,false);
 o.addComponent(weapons[16]);
 o.addComponent(wh16);

 weapons[17] = new Phaser(PrefabFactory.shootDown, 0.3f, 8, 5);
 weapons[17].setOffset(345-16, 170-16);
 weapons[17].setShotDelay(1.0f);
 let wh17 = new LockingWeaponHandler(weapons[17],PrefabFactory.enemyTargets,false);
 o.addComponent(weapons[17]);
 o.addComponent(wh17);


 weapons[18] = new Phaser(PrefabFactory.shootLeft, 6);
 weapons[18].setOffset(239-16, 297-16);
 weapons[18].setShotDelay(0.0f);
 o.addComponent(weapons[0]);

 weapons[19] = new Phaser(PrefabFactory.shootDownLeft, 6);
 weapons[19].setOffset(239-16, 297-16);
 weapons[19].setShotDelay(0.2f);
 o.addComponent(weapons[19]);

 weapons[20] = new Phaser(PrefabFactory.shootDown, 6);
 weapons[20].setOffset(239-16, 297-16);
 weapons[20].setShotDelay(0.4f);
 o.addComponent(weapons[20]);

 weapons[21] = new Phaser(PrefabFactory.shootDownRight, 6);
 weapons[21].setOffset(239-16, 297-16);
 weapons[21].setShotDelay(0.2f);
 o.addComponent(weapons[21]);

 weapons[22] = new Phaser(PrefabFactory.shootRight, 6);
 weapons[22].setOffset(239-16, 297-16);
 weapons[22].setShotDelay(0.0f);
 o.addComponent(weapons[22]);



 let bwh = new Boss5WeaponHandler(weapons,hc);
 o.addComponent(bwh);

 let explosion1 = PrefabFactory.createExplosion(o.transform.position);
 o.addComponent(new SpawnOnDestroy(explosion1));

 let explosion2 = PrefabFactory.createExplosion(o.transform.position);
 o.addComponent(new SpawnOnDestroy(explosion2));

 let explosion3 = PrefabFactory.createExplosion(o.transform.position);
 o.addComponent(new SpawnOnDestroy(explosion3));

 let llod = new LoadLevelOnDestroy(nextLevel);
 o.addComponent(llod);
 //o.addComponent(new DestroyOnOutOfBounds());
 o.addComponent(glIdle);
 o.addComponent(glDeath);
 o.addComponent(ai);
 o.addComponent(hc);
 o.addComponent(new StopMovementOnCreate());

 //System.out.println("boss4");

 let o;
	}

}
