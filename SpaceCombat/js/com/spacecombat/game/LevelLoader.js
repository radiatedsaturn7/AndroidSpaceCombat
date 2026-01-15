// Auto-converted from com/spacecombat/game/LevelLoader.java





 export class LevelLoader {

 scrollSpeed = -20;
 static Context context;
 static InputStream getLevel ( String name)
	{
 //System.out.println("Loading " + name);
 if (name.equalsIgnoreCase("mainmenu"))
 {
 return LevelLoader.context.getResources().openRawResource(R.raw.mainmenu);
 }
 if (name.equalsIgnoreCase("level0"))
 {
 return LevelLoader.context.getResources().openRawResource(R.raw.level0);
 }
 if (name.equalsIgnoreCase("level1"))
 {
 return LevelLoader.context.getResources().openRawResource(R.raw.level1);
 }
 if (name.equalsIgnoreCase("level2"))
 {
 return LevelLoader.context.getResources().openRawResource(R.raw.level2);
 }
 if (name.equalsIgnoreCase("level3"))
 {
 return LevelLoader.context.getResources().openRawResource(R.raw.level3);
 }
 if (name.equalsIgnoreCase("level4"))
 {
 return LevelLoader.context.getResources().openRawResource(R.raw.level4);
 }
 if (name.equalsIgnoreCase("level5"))
 {
 return LevelLoader.context.getResources().openRawResource(R.raw.level5);
 }
 if (name.equalsIgnoreCase("level6"))
 {
 return LevelLoader.context.getResources().openRawResource(R.raw.level6);
 }
 if (name.equalsIgnoreCase("level7"))
 {
 return LevelLoader.context.getResources().openRawResource(R.raw.level7);
 }
 if (name.equalsIgnoreCase("level8"))
 {
 return LevelLoader.context.getResources().openRawResource(R.raw.level8);
 }
 if (name.equalsIgnoreCase("level9"))
 {
 return LevelLoader.context.getResources().openRawResource(R.raw.level9);
 }
 if (name.equalsIgnoreCase("level10"))
 {
 return LevelLoader.context.getResources().openRawResource(R.raw.level10);
 }
 if (name.equalsIgnoreCase("level11"))
 {
 return LevelLoader.context.getResources().openRawResource(R.raw.level11);
 }
 if (name.equalsIgnoreCase("level12"))
 {
 return LevelLoader.context.getResources().openRawResource(R.raw.level12);
 }
 if (name.equalsIgnoreCase("level13"))
 {
 return LevelLoader.context.getResources().openRawResource(R.raw.level13);
 }

 //System.out.println("ERROR, NEED TO UPDATE LevelLoader.java WITH LEVEL NAME:" + name);
 return null;
	}

 lastLevelLoaded = "";
 static String getLastLevelLoaded ()
	{
 return lastLevelLoaded;
	}

 static void loadLevel ( String name, boolean clearAll)
	{
 Time.pause();
 x = 0;
 lines = null;
 try
 {
	lastLevelLoaded = name;
 gos = GameObject.getAllGameObjects();

 for (x = 0; x < gos.size(); x++)
 {
 if (gos.get(x).hasTag(Tags.ally))
 {
 //System.out.println("----=-==-=DESTROY ALLY:" + gos.get(x).getName()+" "+gos.get(x).getDestroyOnLevelLoad());
 }

 if (gos.get(x).getDestroyOnLevelLoad() || clearAll)
 {
 gos.get(x).destroy();
 gos.get(x).release();
 gos.remove(x);
 x--;
 }
 }

 gos2 = new LinkedList<GameObject>(GameObject.getAllGameObjects());

 for ( GameObject o : gos2)
 {
 o.onLevelLoading();
 }

 //System.out.println("-START-");
 //for ( GameObject o : GameObject.getAllGameObjects())
 //{
 //System.out.println(o.getName());
 //}
 //System.out.println("------");


 is = LevelLoader.getLevel(name);
 java.io.InputStreamReader br = new java.io.InputStreamReader(is);

 sb = new StringBuffer();


 level = null;
 while (true)
 {
 int ascii;

 try {
 ascii = br.read();
 } catch ( IOException e) {
 try {
 br.close();
 } catch ( IOException e1) {
 throw new RuntimeException(e1);
 }
 throw new RuntimeException(e);
 }

 if (ascii == -1)
 {
 break;
 }

 letter = (char)ascii;
 sb.append(letter);
 }

 file = sb.toString();
	lines = file.split("\\n");

 ignoring = false;

 for (x = 0; x < lines.length; x++)
 {
 //System.out.println("LINE ["+x+"] " + lines[x]);
 if (ignoring)
 {
 if (lines[x].startsWith("*/"))
 {
 ignoring = false;
 }
 continue;
 }
 if (lines[x].startsWith("//"))
 {
 continue;
 }
 if (lines[x].startsWith("/*"))
 {
 ignoring = true;
 continue;
 }

 if (x < lines.length && lines[x].startsWith("createLevel"))
 {
 x++;
 wadName = lines[x].trim();
 x++;
 smapWidth = lines[x].trim();
 x++;
 smapHeight = lines[x].trim();

 mapWidth = Integer.parseInt(smapWidth);
 mapHeight = Integer.parseInt(smapHeight);
 map = new int[mapWidth*mapHeight];

 for (int y = 0; y < mapHeight; y++)
 {
 x++;
 parts = lines[x].split(",");
 for (int z = 0; z < parts.length && z < mapWidth; z++)
 {
 map[y*mapWidth + z] = Integer.parseInt(parts[z].trim());
 }
 //System.out.println();
 }

 level = PrefabFactory.createLevel("level " + name, map, mapWidth, mapHeight, wadName);
 level.setDestroyOnLevelLoad(true);
 GameObject.create(level);
 }

 //AWESOME!
 //I found my old code, and i'm importing my levels!
 //WOOOT!!!
 if (x < lines.length && lines[x].startsWith("create_enemy("))
 {
 enemyName = lines[x];
 parts = lines[x].split(",");
 time = Integer.parseInt(parts[0].substring("create_enemy(".length()).trim());
 ship = Integer.parseInt(parts[1].trim());
 script = Integer.parseInt(parts[2].trim());
 sway = parts[3].trim().equals("yes");
 L = Integer.parseInt(parts[4].trim());
 R = Integer.parseInt(parts[5].trim());
 special = parts[6].substring(parts[6].indexOf(")")).trim().equals("yes");

 time *= 1;

 spawnX = 64;
 spawnY = 4048 - time;
 enemyX = 64;
 enemyY = 4048 - time - 32;

 tile = 24;
 script++;

 isReversed = sway;
 scriptType = 0;
 enemyType = ship;

 //System.out.println("Script:" + script + " " + scriptType);

 if (script == 1)
 {
 enemyX = Util.randomNumber(5,14)*tile;
 scriptType = 3;
 }
 if (script == 2)
 {
 enemyX = 64;
 //top left, bounces left to right
 scriptType = 6;
 isReversed = false;
 }
 if (script == 3)
 {
 enemyX = 480-32;
 //top right, bounces right to left
 scriptType = 6;
 isReversed = true;
 }
 if (script == 4)
 {
 //hugs left, 1/2 way down, moves to right, hugs right
 enemyX = 64;
 scriptType = 2;
 isReversed = false;
 }
 if (script == 5)
 {
 //hugs right, 1/2 way down, moves to left, hugs left
 enemyX = 480-32;
 scriptType = 2;
 isReversed = true;
 }
 if (script == 6)
 {
 //follows players X position
 enemyX = Util.randomNumber(5,14)*tile;
 scriptType = 5;
 }
 if (script == 7)
 {
 //suicide guy, tries to hit player
 enemyX = Util.randomNumber(5,14)*tile;
 scriptType = 4;
 }
 if (script == 9)
 {
 //script 1, but from bottom to top
 enemyX = Util.randomNumber(5,14)*tile;
 enemyY += 864;
 scriptType = 11;
 }
 if (script == 10)
 {
 //script 2, but from bottom to top
 enemyY += 864;
 enemyX = 64;
 scriptType = 12;
 isReversed = false;
 }
 if (script == 11)
 {
 //script 3, but from bottom to top
 enemyY += 864;
 enemyX = 480-64;
 scriptType = 12;
 isReversed = true;
 }
 if (script == 12)
 {
 //script 4, but from bottom to top
 enemyY += 864;
 enemyX = 64;
 scriptType = 13;
 isReversed = false;
 }
 if (script == 13)
 {
 //script 5, but from bottom to top
 enemyY += 864;
 enemyX = 480-64;
 scriptType = 13;
 isReversed = true;
 }

 //System.out.println("CREATING ENEMY");
 objectToCreate = PrefabFactory.createEnemy(enemyName, new Vector2(enemyX,enemyY), enemyType, scriptType, isReversed);
 //System.out.println("CREATED ENEMY");
 spawner = PrefabFactory.createSpawner(spawnX, spawnY, objectToCreate);
 //System.out.println("CREATED SPAWNER");
 GameObject.create(spawner);
 //System.out.println("DONE");
 }

 if (x < lines.length && lines[x].startsWith("createMainMenu"))
 {
 objectToCreate = PrefabFactory.createMainMenu();
 objectToCreate.setDestroyOnLevelLoad(true);
 GameObject.create(objectToCreate);
 }

 if (x < lines.length && lines[x].startsWith("createDifficultyButton"))
 {
 x++;
 difficulty = lines[x].trim();
 x++;
 sPosX = lines[x].trim();
 x++;
 sPosY = lines[x].trim();

 posX = Integer.parseInt(sPosX);
 posY = Integer.parseInt(sPosY);

 level = PrefabFactory.createDifficultyButton(difficulty, posX, posY);
 GameObject.create(level);

 System.out.println("Created Button" + difficulty);
 }


 if (x < lines.length && lines[x].startsWith("createGraphic"))
 {
 x++;
 image = lines[x].trim();
 x++;
 sPosX = lines[x].trim();
 x++;
 sPosY = lines[x].trim();
 x++;
 sWidth = lines[x].trim();
 x++;
 sHeight = lines[x].trim();

 posX = Integer.parseInt(sPosX);
 posY = Integer.parseInt(sPosY);
 width = Integer.parseInt(sWidth);
 height = Integer.parseInt(sHeight);

 imageo = PrefabFactory.createGenericGraphic(image, posX, posY, width, height);
 GameObject.create(imageo);
 }

 if (x < lines.length && lines[x].startsWith("createEnemy"))
 {
 x++;
 sspawnX = lines[x].trim();
 spawnX = Integer.parseInt(sspawnX);
 x++;
 sspawnY = lines[x].trim();
 spawnY = Integer.parseInt(sspawnY);
 x++;
 senemyX = lines[x].trim();
 enemyX = Integer.parseInt(senemyX);
 x++;
 senemyY = lines[x].trim();
 enemyY = Integer.parseInt(senemyY);
 x++;
 senemyType = lines[x].trim();
 enemyType = Integer.parseInt(senemyType);
 x++;
 sscriptType = lines[x].trim();
 scriptType = Integer.parseInt(sscriptType);
 x++;
 sisReversed = lines[x].trim();
 isReversed = Boolean.parseBoolean(sisReversed);

 //System.out.println("CREATED ENEMY:" + new Vector2(enemyX,enemyY) + " " + enemyType + " " + scriptType + " " + isReversed);

 objectToCreate = PrefabFactory.createEnemy("enemy", new Vector2(enemyX,enemyY), enemyType, scriptType, isReversed);
 spawner = PrefabFactory.createSpawner(spawnX, spawnY, objectToCreate);

 GameObject.create(spawner);
 }


 if (x < lines.length && lines[x].startsWith("createBoss"))
 {
 x++;
 sspawnX = lines[x].trim();
 spawnX = Integer.parseInt(sspawnX);
 x++;
 sspawnY = lines[x].trim();
 spawnY = Integer.parseInt(sspawnY);
 x++;
 senemyX = lines[x].trim();
 enemyX = Integer.parseInt(senemyX);
 x++;
 senemyY = lines[x].trim();
 enemyY = Integer.parseInt(senemyY);
 x++;
 senemyType = lines[x].trim();
 bossType = Integer.parseInt(senemyType);
 x++;
 nextLevel = lines[x].trim();
 x++;

 //System.out.println("CREATED BOSS:" + new Vector2(enemyX,enemyY) + " " + bossType + " " + nextLevel);

 objectToCreate = PrefabFactory.createBoss("boss", new Vector2(enemyX,enemyY), bossType, nextLevel);
 spawner = PrefabFactory.createSpawner(spawnX, spawnY, objectToCreate);

 //System.out.println("DONE!");

 GameObject.create(spawner);
 }

 if (x < lines.length && lines[x].startsWith("createPowerUp"))
 {
 x++;
 spawnX = Integer.parseInt(lines[x].trim());
 x++;
 spawnY = Integer.parseInt(lines[x].trim());
 x++;
 powerupX = Integer.parseInt(lines[x].trim());
 x++;
 powerupY = Integer.parseInt(lines[x].trim());
 x++;
 powerupType = Integer.parseInt(lines[x].trim());
 x++;
 canChange = Boolean.parseBoolean(lines[x].trim());

 //System.out.println("CREATED POWER UP:" + new Vector2(powerupX,powerupY) + " " + powerupType + " " + " " + canChange);

 objectToCreate = PrefabFactory.createPowerUp(new Vector2(powerupX,powerupY), powerupType, canChange);
 spawner = PrefabFactory.createSpawner(spawnX, spawnY, objectToCreate);

 GameObject.create(spawner);
 }
 //
 if (x < lines.length && lines[x].startsWith("createAlly"))
 {
 x++;
 spawnX = Integer.parseInt(lines[x].trim());
 x++;
 spawnY = Integer.parseInt(lines[x].trim());
 x++;
 allyX = Integer.parseInt(lines[x].trim());
 x++;
 allyY = Integer.parseInt(lines[x].trim());
 x++;
 script = Integer.parseInt(lines[x].trim());
 x++;
 allyType = lines[x].trim();
 x++;
 weapon = lines[x].trim();

 //System.out.println("CREATED ALLY:" + new Vector2(allyX,allyY) + " " + allyType + " " + " " + weapon);

 objectToCreate = PrefabFactory.createAlly("Ally - " + allyType, new Vector2(allyX, allyY), allyType, script, weapon);
 spawner = PrefabFactory.createSpawner(spawnX, spawnY, objectToCreate);

 GameObject.create(spawner);
 }

 if (x < lines.length && lines[x].startsWith("createCursor"))
 {
 cam = PrefabFactory.createMenuCamera("Cursor", new Vector2(0,0));
 cam.setDestroyOnLevelLoad(false);
 GameObject.create(cam);
 }

 if (x < lines.length && lines[x].startsWith("createPlayer"))
 {
 x++;
 spawnX = Integer.parseInt(lines[x].trim());
 x++;
 spawnY = Integer.parseInt(lines[x].trim());
 x++;
 playerX = Integer.parseInt(lines[x].trim());
 x++;
 playerY = Integer.parseInt(lines[x].trim());
 x++;
 playerType = lines[x].trim();

 //System.out.println("CREATED PLAYER:" + new Vector2(playerX,playerY) + " " + playerType + " ");

 //IF PLAYER ALREADY EXISTS, JUST MOVE HIM TO LOCATION!
 alreadyExists = GameObject.findByName("player");
 alreadyExistsCam = GameObject.findByName("Camera");
 if (alreadyExists == null)
 {
 objectToCreate = PrefabFactory.createPlayer("player", new Vector2(playerX,playerY), playerType);
 objectToCreate.setDestroyOnLevelLoad(false);
 spawner = PrefabFactory.createSpawner(spawnX, spawnY, objectToCreate);

 GameObject.create(spawner);

 top = PrefabFactory.createTopOfScreen();
 GameObject.create(top);

 cam = PrefabFactory.createCamera("Camera", new Vector2(spawnX,spawnY));
 cam.setDestroyOnLevelLoad(false);
 hud = PrefabFactory.createHUD(cam,objectToCreate);
 GameObject.create(hud);
 hbh = PrefabFactory.createHUDHealthBar(cam,(HealthController)objectToCreate.getComponent(HealthController.class));
 cbh = PrefabFactory.createHUDChargeBar(cam, objectToCreate);
 hbh.setDestroyOnLevelLoad(false);
 cbh.setDestroyOnLevelLoad(false);
 GameObject.create(hbh);
 GameObject.create(cbh);

 hud.setDestroyOnLevelLoad(false);

 top.transform.position.x = cam.transform.position.x;
 top.transform.position.y = cam.transform.position.y;
 top.setDestroyOnLevelLoad(false);

 GameObject.create(cam);
 }
 else
 {
 alreadyExistsCam.transform.position.x = spawnX;
 alreadyExistsCam.transform.position.y = spawnY;
 alreadyExists.transform.position.x = playerX;
 alreadyExists.transform.position.y = playerY;
 PlayerInput.setCameraScrollSpeed(scrollSpeed);
 pf = (PlayerFollower) Camera.mainCamera.gameObject.getComponent(PlayerFollower.class);
 pf.setScrollSpeed(scrollSpeed);
 }
 }

 if (x < lines.length && lines[x].startsWith("loadLevelOnCollision"))
 {
 x++;
 nextLevel = lines[x].trim();
 x++;
 spawnX = Integer.parseInt(lines[x].trim());
 x++;
 spawnY = Integer.parseInt(lines[x].trim());

 lloc = new LoadLevelOnCollision(nextLevel);
 // FixedJoint fj = new FixedJoint(level);

 spawner = GameObject.getNew();
 r = new RigidBody();
 c = new BoxCollider(new Vector2(800,32));
 r.setCollider(c);
 spawner.setRigidBody(r);
 spawner.transform.position.x = spawnX;
 spawner.transform.position.y = spawnY;
 spawner.addComponent(lloc);
 //spawner.addComponent(fj);
 GameObject.create(spawner);
 //System.out.println("CREATED LEVEL LOADER:" + new Vector2(spawnX,spawnY) + " " + nextLevel);
 }
 }

 //System.out.println("-END-");
 //System.out.println("------");

 try {
 br.close();
 } catch ( IOException e) {
 throw new RuntimeException(e);
 }

 }
 catch (Exception e)
 {
 e.printStackTrace();
 if (lines != null && x < lines.length)
 {
 throw new RuntimeException("FAILED AT LINE:" + x + " " + lines[x] + " " + e);
 }
 else
 {
 throw new RuntimeException("FAILED AT LINE:" + x + " " + e);
 }
 }
 Time.unPause();

 gos2 = new LinkedList<GameObject>(GameObject.getAllGameObjects());
 for ( GameObject o : gos2)
 {
 o.onLevelLoaded();
 }

 //System.out.println("LEVEL LOADED!!!");
	}

 static void setContext ( Context c)
	{
 LevelLoader.context = c;
	}
}
