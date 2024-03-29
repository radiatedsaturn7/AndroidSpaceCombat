package com.spacecombat.game;

import java.io.IOException;
import java.io.InputStream;
import java.util.LinkedList;
import java.util.List;

import android.content.Context;

import com.spacecombat.BoxCollider;
import com.spacecombat.Camera;
import com.spacecombat.Collider;
import com.spacecombat.GameObject;
import com.spacecombat.R;
import com.spacecombat.RigidBody;
import com.spacecombat.Tags;
import com.spacecombat.Time;
import com.spacecombat.Util;
import com.spacecombat.Vector2;

public class LevelLoader {

	public final static float scrollSpeed = -20;
	private static Context context;
	public static InputStream getLevel (final String name)
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

	private static String lastLevelLoaded = "";
	public static String getLastLevelLoaded ()
	{
		return lastLevelLoaded;
	}

	public static void loadLevel (final String name, final boolean clearAll) 
	{ 
		Time.pause();
		int x = 0;
		String [] lines = null;
		try
		{
			lastLevelLoaded = name;
			final List<GameObject> gos = GameObject.getAllGameObjects();

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

			List<GameObject> gos2 = new LinkedList<GameObject>(GameObject.getAllGameObjects());

			for (final GameObject o : gos2)
			{
				o.onLevelLoading();
			}

			//System.out.println("-START-");
			//for (final GameObject o : GameObject.getAllGameObjects())
			//{
				//System.out.println(o.getName());
			//}
			//System.out.println("------");


			final InputStream is = LevelLoader.getLevel(name);
			final java.io.InputStreamReader br = new java.io.InputStreamReader(is);

			final StringBuffer sb = new StringBuffer();


			GameObject level = null;
			while (true)
			{
				int ascii;
				
				try {
					ascii = br.read();
				} catch (final IOException e) {
					try {
						br.close();
					} catch (final IOException e1) {
						throw new RuntimeException(e1);
					}
					throw new RuntimeException(e);
				}

				if (ascii == -1)
				{
					break;
				}

				final char letter = (char)ascii;
				sb.append(letter);
			}

			final String file = sb.toString();
			lines = file.split("\\n");

			boolean ignoring = false;

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
					final String wadName = lines[x].trim();
					x++;
					final String smapWidth = lines[x].trim();
					x++;
					final String smapHeight = lines[x].trim();

					final int mapWidth = Integer.parseInt(smapWidth);
					final int mapHeight = Integer.parseInt(smapHeight);
					final int [] map = new int[mapWidth*mapHeight];

					for (int y = 0; y < mapHeight; y++)
					{
						x++;
						final String [] parts = lines[x].split(",");
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
					String enemyName = lines[x];
					String[] parts = lines[x].split(",");
					int time = Integer.parseInt(parts[0].substring("create_enemy(".length()).trim());
					int ship = Integer.parseInt(parts[1].trim());
					int script = Integer.parseInt(parts[2].trim());
					boolean sway = parts[3].trim().equals("yes");
					int L = Integer.parseInt(parts[4].trim());
					int R = Integer.parseInt(parts[5].trim());
					boolean special = parts[6].substring(parts[6].indexOf(")")).trim().equals("yes");

					time *= 1;

					int spawnX = 64;
					int spawnY = 4048 - time;
					int enemyX = 64;
					int enemyY = 4048 - time - 32;

					int tile = 24;
					script++;

					boolean isReversed = sway;
					int scriptType = 0;
					int enemyType = ship;

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
					final GameObject objectToCreate = PrefabFactory.createEnemy(enemyName, new Vector2(enemyX,enemyY), enemyType, scriptType, isReversed);
					//System.out.println("CREATED ENEMY");
					final GameObject spawner = PrefabFactory.createSpawner(spawnX, spawnY, objectToCreate);
					//System.out.println("CREATED SPAWNER");
					GameObject.create(spawner);
					//System.out.println("DONE");
				}
				
				if (x < lines.length && lines[x].startsWith("createMainMenu"))
				{
					final GameObject objectToCreate = PrefabFactory.createMainMenu();
					objectToCreate.setDestroyOnLevelLoad(true);
					GameObject.create(objectToCreate);
				}

				if (x < lines.length && lines[x].startsWith("createDifficultyButton"))
				{
					x++;
					final String difficulty = lines[x].trim();
					x++;
					final String sPosX = lines[x].trim();
					x++;
					final String sPosY = lines[x].trim();

					final int posX = Integer.parseInt(sPosX);
					final int posY = Integer.parseInt(sPosY);

					level = PrefabFactory.createDifficultyButton(difficulty, posX, posY);
					GameObject.create(level);

					System.out.println("Created Button" + difficulty);
				}


				if (x < lines.length && lines[x].startsWith("createGraphic"))
				{
					x++;
					final String image = lines[x].trim();
					x++;
					final String sPosX = lines[x].trim();
					x++;
					final String sPosY = lines[x].trim();
					x++;
					final String sWidth = lines[x].trim();
					x++;
					final String sHeight = lines[x].trim();

					final int posX = Integer.parseInt(sPosX);
					final int posY = Integer.parseInt(sPosY);
					final int width = Integer.parseInt(sWidth);
					final int height = Integer.parseInt(sHeight);

					GameObject imageo = PrefabFactory.createGenericGraphic(image, posX, posY, width, height);
					GameObject.create(imageo);
				}

				if (x < lines.length && lines[x].startsWith("createEnemy"))
				{
					x++;
					final String sspawnX = lines[x].trim();
					final int spawnX = Integer.parseInt(sspawnX);
					x++;
					final String sspawnY = lines[x].trim();
					final int spawnY = Integer.parseInt(sspawnY);
					x++;
					final String senemyX = lines[x].trim();
					final int enemyX = Integer.parseInt(senemyX);
					x++;
					final String senemyY = lines[x].trim();
					final int enemyY = Integer.parseInt(senemyY);
					x++;
					final String senemyType = lines[x].trim();
					final int enemyType = Integer.parseInt(senemyType);
					x++;
					final String sscriptType = lines[x].trim();
					final int scriptType = Integer.parseInt(sscriptType);
					x++;
					final String sisReversed = lines[x].trim();
					final boolean isReversed = Boolean.parseBoolean(sisReversed);

					//System.out.println("CREATED ENEMY:" + new Vector2(enemyX,enemyY) + " " + enemyType + " " + scriptType + " " + isReversed);

					final GameObject objectToCreate = PrefabFactory.createEnemy("enemy", new Vector2(enemyX,enemyY), enemyType, scriptType, isReversed);
					final GameObject spawner = PrefabFactory.createSpawner(spawnX, spawnY, objectToCreate);

					GameObject.create(spawner);
				}

				
				if (x < lines.length && lines[x].startsWith("createBoss"))
				{
					x++;
					final String sspawnX = lines[x].trim();
					final int spawnX = Integer.parseInt(sspawnX);
					x++;
					final String sspawnY = lines[x].trim();
					final int spawnY = Integer.parseInt(sspawnY);
					x++;
					final String senemyX = lines[x].trim();
					final int enemyX = Integer.parseInt(senemyX);
					x++;
					final String senemyY = lines[x].trim();
					final int enemyY = Integer.parseInt(senemyY);
					x++;
					final String senemyType = lines[x].trim();
					final int bossType = Integer.parseInt(senemyType);
					x++;
					final String nextLevel = lines[x].trim();
					x++;

					//System.out.println("CREATED BOSS:" + new Vector2(enemyX,enemyY) + " " + bossType + " " + nextLevel);

					final GameObject objectToCreate = PrefabFactory.createBoss("boss", new Vector2(enemyX,enemyY), bossType, nextLevel);
					final GameObject spawner = PrefabFactory.createSpawner(spawnX, spawnY, objectToCreate);
					
					//System.out.println("DONE!");

					GameObject.create(spawner);
				}

				if (x < lines.length && lines[x].startsWith("createPowerUp"))
				{
					x++;
					final int spawnX = Integer.parseInt(lines[x].trim());
					x++;
					final int spawnY = Integer.parseInt(lines[x].trim());
					x++;
					final int powerupX = Integer.parseInt(lines[x].trim());
					x++;
					final int powerupY = Integer.parseInt(lines[x].trim());
					x++;
					final int powerupType = Integer.parseInt(lines[x].trim());
					x++;
					final boolean canChange = Boolean.parseBoolean(lines[x].trim());

					//System.out.println("CREATED POWER UP:" + new Vector2(powerupX,powerupY) + " " + powerupType + " " + " " + canChange);

					final GameObject objectToCreate = PrefabFactory.createPowerUp(new Vector2(powerupX,powerupY), powerupType, canChange);
					final GameObject spawner = PrefabFactory.createSpawner(spawnX, spawnY, objectToCreate);

					GameObject.create(spawner);
				}
				//
				if (x < lines.length && lines[x].startsWith("createAlly"))
				{
					x++;
					final int spawnX = Integer.parseInt(lines[x].trim());
					x++;
					final int spawnY = Integer.parseInt(lines[x].trim());
					x++;
					final int allyX = Integer.parseInt(lines[x].trim());
					x++;
					final int allyY = Integer.parseInt(lines[x].trim());
					x++;
					final int script = Integer.parseInt(lines[x].trim());
					x++;
					final String allyType = lines[x].trim();
					x++;
					final String weapon = lines[x].trim();

					//System.out.println("CREATED ALLY:" + new Vector2(allyX,allyY) + " " + allyType + " " + " " + weapon);

					final GameObject objectToCreate = PrefabFactory.createAlly("Ally - " + allyType, new Vector2(allyX, allyY), allyType, script, weapon);
					final GameObject spawner = PrefabFactory.createSpawner(spawnX, spawnY, objectToCreate);

					GameObject.create(spawner);
				}

				if (x < lines.length && lines[x].startsWith("createCursor"))
				{
					GameObject cam = PrefabFactory.createMenuCamera("Cursor", new Vector2(0,0));
					cam.setDestroyOnLevelLoad(false);
					GameObject.create(cam);
				}

				if (x < lines.length && lines[x].startsWith("createPlayer"))
				{
					x++;
					final int spawnX = Integer.parseInt(lines[x].trim());
					x++;
					final int spawnY = Integer.parseInt(lines[x].trim());
					x++;
					final int playerX = Integer.parseInt(lines[x].trim());
					x++;
					final int playerY = Integer.parseInt(lines[x].trim());
					x++;
					final String playerType = lines[x].trim();

					//System.out.println("CREATED PLAYER:" + new Vector2(playerX,playerY) + " " + playerType + " ");

					//IF PLAYER ALREADY EXISTS, JUST MOVE HIM TO LOCATION!
					GameObject alreadyExists = GameObject.findByName("player");
					GameObject alreadyExistsCam = GameObject.findByName("Camera");
					if (alreadyExists == null)
					{
						final GameObject objectToCreate = PrefabFactory.createPlayer("player", new Vector2(playerX,playerY), playerType);
						objectToCreate.setDestroyOnLevelLoad(false);
						final GameObject spawner = PrefabFactory.createSpawner(spawnX, spawnY, objectToCreate);

						GameObject.create(spawner);

						GameObject top = PrefabFactory.createTopOfScreen();
						GameObject.create(top);

						GameObject cam = PrefabFactory.createCamera("Camera", new Vector2(spawnX,spawnY));
						cam.setDestroyOnLevelLoad(false);
						GameObject hud = PrefabFactory.createHUD(cam,objectToCreate);
						GameObject.create(hud);
						GameObject hbh = PrefabFactory.createHUDHealthBar(cam,(HealthController)objectToCreate.getComponent(HealthController.class));
						GameObject cbh = PrefabFactory.createHUDChargeBar(cam, objectToCreate);
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
						PlayerFollower pf = (PlayerFollower) Camera.mainCamera.gameObject.getComponent(PlayerFollower.class);
						pf.setScrollSpeed(scrollSpeed);
					}
				}

				if (x < lines.length && lines[x].startsWith("loadLevelOnCollision"))
				{
					x++;
					final String nextLevel = lines[x].trim();
					x++;
					final int spawnX = Integer.parseInt(lines[x].trim());
					x++;
					final int spawnY = Integer.parseInt(lines[x].trim());

					final LoadLevelOnCollision lloc = new LoadLevelOnCollision(nextLevel);
					//final FixedJoint fj = new FixedJoint(level);

					final GameObject spawner = GameObject.getNew();
					final RigidBody r = new RigidBody();
					final Collider c = new BoxCollider(new Vector2(800,32));
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
			} catch (final IOException e) {
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

		List<GameObject> gos2 = new LinkedList<GameObject>(GameObject.getAllGameObjects());
		for (final GameObject o : gos2)
		{
			o.onLevelLoaded();
		}

		//System.out.println("LEVEL LOADED!!!");
	}

	public static void setContext (final Context c)
	{
		LevelLoader.context = c;
	}
}
