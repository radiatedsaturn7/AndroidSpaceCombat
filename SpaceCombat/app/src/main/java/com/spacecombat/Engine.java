package com.spacecombat;

import java.util.List;

import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;

import com.spacecombat.ai.AllyAI;
import com.spacecombat.game.HealthController;
import com.spacecombat.game.LevelLoader;
import com.spacecombat.weapons.ChargeLaser;
import com.spacecombat.weapons.FlameThrower;
import com.spacecombat.weapons.Laser;
import com.spacecombat.weapons.LockingLaser;
import com.spacecombat.weapons.MachineGun;
import com.spacecombat.weapons.MissileLauncher;
import com.spacecombat.weapons.PulseCannon;
import com.spacecombat.weapons.Weapon;

public class Engine implements ClickListener {
	
	public boolean created = false;
	private String startingLevel = "level1";
	//private String startingLevel = "level12";
	private boolean ready = false;
	private static boolean isInvincibility = false;

	// this is da master list of all components0
	// private int fps = 60;
	// private int sleepTime; //calculated
  
	private class DrawLoop extends Thread {
		@Override
		public void run() {			
			while (true) {
				//System.out.println("DRAW Loop!");
				
				drawLoop();
			}  
		}
	}

	private class UpdateLoop extends Thread {
		@Override
		public void run() {
			while (true) {
				//System.out.println("UPDATE");
				 updateLoop();
			}
		}
	}	

	private class CollisionLoop extends Thread {
		@Override
		public void run() {
			while (true) {
				//System.out.println("COLLIDE");
				collisionLoop();
			}
		}
	}

	private final boolean useInputStep = false;
	private boolean canRun = true;

	private final boolean useMultithreadedDrawLoop = false;
	private final boolean runDrawLoop = true;
	private final boolean useGuiFrameRate = true;
	private final int drawFrameRate = 32;

	private final boolean useMultithreadedCollisionLoop = true;
	private final boolean useCollisionFrameRate = true;
	private final int collisionFrameRate = 6;
	
	private final boolean useMultithreadedGameLoop = true;
	private final boolean runGameLoop = true;	
	private final boolean useGameFrameRate = true;
	private final int updateFrameRate = 32;

	private final boolean guiPrintFrameRate = true;
	private final boolean collisionPrintFrameRate = true;
	private final boolean updatePrintFrameRate = true;

	private float guiLastTimeCheck = 0;
	private float collisionLastTimeCheck = 0;
	private float updateLastTimeCheck = 0;

	private int guiFrames = 0;
	private int collisionFrames = 0;
	private int updateFrames = 0;
	
	private final Object lock = new Object();

	private static FinishListener finishListener = null;

	/** The Activity Context ( NEW ) */

	List<GameObject> gameObjects = GameObject.getAllGameObjects();

	/**
	 * * Instance the Cube object and set the Activity Context handed over
	 */
	public Engine(FinishListener f) {
		finishListener = f;
	}

	public void start()
	{
		if (this.useMultithreadedDrawLoop) {
			final Thread drawLoop = new DrawLoop();
			//System.out.println("Drawing Started");
			drawLoop.start();
		}

		if (this.useMultithreadedGameLoop) {
			final Thread gameLoop = new UpdateLoop();
			gameLoop.start();
		}

		if (this.useMultithreadedCollisionLoop) {
			final Thread collisionLoop = new CollisionLoop();
			collisionLoop.start();
		}

		Input.subscribeListener(this);
	}
	
	public static void exit()
	{		
		finishListener.onExit();
	}
	
	public void createGameObjects(SharedPreferences preferences) {		
		synchronized (this.lock)
		{
			GameObject.clear();
			Input.clear();
			AllyAI.clear();
			Input.subscribeListener(this);
			
			String levelToLoad = preferences.getString("lastLevel", startingLevel);
			
			
			//System.out.println("LOADING:"+levelToLoad);
			
			LevelLoader.loadLevel(levelToLoad,true);
			
			ready = true;
			
			GameObject player = GameObject.findByName("player");
			if (player != null)
			{
				Weapon cl = (Weapon) player.getComponent(ChargeLaser.class);
				Weapon ft = (Weapon) player.getComponent(FlameThrower.class);		
				Weapon l = (Weapon) player.getComponent(Laser.class);
				Weapon ll = (Weapon) player.getComponent(LockingLaser.class);		
				Weapon mg = (Weapon) player.getComponent(MachineGun.class);
				Weapon ml = (Weapon) player.getComponent(MissileLauncher.class);
				Weapon pc = (Weapon) player.getComponent(PulseCannon.class);		

				cl.setPowerLevel(preferences.getInt("chargeLaser", cl.getPowerLevel()));
				ft.setPowerLevel(preferences.getInt("flameThrower", ft.getPowerLevel()));
				l.setPowerLevel(preferences.getInt("laser", l.getPowerLevel()));
				ll.setPowerLevel(preferences.getInt("lockingLaser", ll.getPowerLevel()));
				mg.setPowerLevel(preferences.getInt("machineGun", mg.getPowerLevel()));
				ml.setPowerLevel(preferences.getInt("missileLauncher", ml.getPowerLevel()));
				pc.setPowerLevel(preferences.getInt("pulseCannon", pc.getPowerLevel()));

				HealthController hc = (HealthController) player.getComponent(HealthController.class);
				hc.setHealth(preferences.getInt("health", hc.getHealth()));
				hc.setMaxHealth(preferences.getInt("maxHealth", hc.getMaxHealth()));
			}
		}
	}

	/**
	 * Here we do our drawing
	 */
	public void drawLoop() {
		if (this.useGuiFrameRate) {
			try {
				Thread.sleep(1000 / this.drawFrameRate);
			} catch (final InterruptedException e) {
				e.printStackTrace();
			}
		}

		if (this.guiPrintFrameRate) {
			if (this.guiLastTimeCheck == 0) {
				this.guiLastTimeCheck = Time.getTime();
			}

			this.guiFrames++;
			if (Time.getTime() - this.guiLastTimeCheck > 1) {
				System.out.println("FPS:" + this.guiFrames + "| Objects:" + this.gameObjects.size());
				this.guiFrames = 0;
				this.guiLastTimeCheck = Time.getTime();
			}
		}

		if (!this.runDrawLoop) {
			return;
		}

		int x = 0; 
		//System.out.println("Waiting To Draw");
		synchronized (this.lock) {
			//System.out.println("Draw");
			int size = this.gameObjects.size();
			for (x = 0; x < size; x++) {
				this.gameObjects.get(x).draw();
				this.gameObjects.get(x).onGUI();
			}
			//GUI.draw();
		}
	}

	@Override
	public void onClick(final float x, final float y) 
	{
		this.canRun = true; 
	}

	public void checkCollision(GameObject xGameObject,int start)
	{
		//skip objects not on the screen for collision
		if (xGameObject.transform.position.y < Camera.mainCamera.gameObject.transform.position.y - 128)
		{
			return;
		}
		if (xGameObject.transform.position.y > Camera.mainCamera.gameObject.transform.position.y + 864)
		{
			return;
		}
		if (xGameObject.getRigidBody() == null
				|| xGameObject.getRigidBody().getCollider() == null) {
			return;
		}

		GameObject yGameObject1 = null;
		for (int y = start; y < this.gameObjects.size(); y++) {
			yGameObject1 = this.gameObjects.get(y);

			if (yGameObject1.getRigidBody() == null
					|| yGameObject1.getRigidBody().getCollider() == null) {
				continue;
			}

			final boolean collision = xGameObject
					.getRigidBody()
					.getCollider()
					.collidesWith(
							yGameObject1.getRigidBody().getCollider());

			if (collision) {
				xGameObject.collide(yGameObject1);
				yGameObject1.collide(xGameObject);
			}
		}
	}

	public void collisionLoop() {
		if (!ready)
		{
			return;
		}
		
		GameObject xGameObject1 = null;
		synchronized (this.lock) {
			for (int x = 0; x < this.gameObjects.size(); x++) {				
				xGameObject1 = this.gameObjects.get(x);
				checkCollision(xGameObject1,x+1);
			}
		}

		if (this.collisionPrintFrameRate) {
			if (this.collisionLastTimeCheck == 0) {
				this.collisionLastTimeCheck = Time.getTime();
			}

			this.collisionFrames++;
			if (Time.getTime() - this.collisionLastTimeCheck > 1) {
				System.out.println("CPS:" + this.collisionFrames);
				this.collisionFrames = 0;
				this.collisionLastTimeCheck = Time.getTime();
			}
		}
		
		if (this.useMultithreadedCollisionLoop && this.useCollisionFrameRate) {
			try {
				Thread.currentThread();
				Thread.sleep(1000 / this.collisionFrameRate);
			} catch (final InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	public void updateLoop() 
	{		
		System.out.println("UPDATE");
		Input.update();
		if (this.useInputStep)
		{
			if (!this.canRun) {
				return;
			}			
			this.canRun = false;
		}
		Time.tick();

		if (!this.runGameLoop) {
			return;
		}


		GameObject xGameObject1 = null;
		synchronized (this.lock) {			
			for (int x = 0; x < this.gameObjects.size(); x++) {
				xGameObject1 = this.gameObjects.get(x);

				xGameObject1.update();

				if (!useMultithreadedCollisionLoop)
				{
					checkCollision(xGameObject1,x+1);
				}
			}	
		}

		synchronized (this.lock)
			{
				for (int x = 0; x < this.gameObjects.size(); x++) {
					xGameObject1 = this.gameObjects.get(x);
					xGameObject1.onAfterUpdate();
				}
				
				
			}


			int size = this.gameObjects.size();

			synchronized (this.lock) {
				for (int x = 0; x < size; x++) {
					if (this.gameObjects.get(x).isDestroyed()) {
						this.gameObjects.get(x).release();
						this.gameObjects.remove(x);
						x--;
						size = this.gameObjects.size();
					}
				}
			}

			if (this.updatePrintFrameRate) {
				if (this.updateLastTimeCheck == 0) {
					this.updateLastTimeCheck = Time.getTime();
				}

				this.updateFrames++;
				if (Time.getTime() - this.updateLastTimeCheck > 1) {
					System.out.println("UPS:" + this.updateFrames);
					this.updateFrames = 0;
					this.updateLastTimeCheck = Time.getTime();
				}
			}

			if (this.useMultithreadedGameLoop && this.useGameFrameRate) {
				try {
					Thread.currentThread();
					Thread.sleep(1000 / this.updateFrameRate);
				} catch (final InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}

	
	public void toBackground(Editor editor) {
		ready = false;
		/*
		GameObject player = GameObject.findByName("player");
		
		if (player != null)
		{
			Weapon cl = (Weapon) player.getComponent(ChargeLaser.class);
			Weapon ft = (Weapon) player.getComponent(FlameThrower.class);		
			Weapon l = (Weapon) player.getComponent(Laser.class);
			Weapon ll = (Weapon) player.getComponent(LockingLaser.class);		
			Weapon mg = (Weapon) player.getComponent(MachineGun.class);
			Weapon ml = (Weapon) player.getComponent(MissileLauncher.class);
			Weapon pc = (Weapon) player.getComponent(PulseCannon.class);		

			editor.putInt("chargeLaser", cl.getPowerLevel());
			editor.putInt("flameThrower", ft.getPowerLevel());
			editor.putInt("laser", l.getPowerLevel());
			editor.putInt("lockingLaser", ll.getPowerLevel());
			editor.putInt("machineGun", mg.getPowerLevel());
			editor.putInt("missileLauncher", ml.getPowerLevel());
			editor.putInt("pulseCannon", pc.getPowerLevel());

			HealthController hc = (HealthController) player.getComponent(HealthController.class);
			editor.putInt("health", hc.getHealth());
			editor.putInt("maxHealth", hc.getMaxHealth());
		}
		
		editor.putString("lastLevel", LevelLoader.getLastLevelLoaded());
		*/
		Time.pause();
		
		List<GameObject> gos = GameObject.getAllGameObjects();
		for (int x = 0; x < gos.size(); x++)
		{
			Audio a = (Audio)gos.get(x).getComponent(Audio.class);
			if (a != null)
			{
				a.pause();
			}
		}
		
	}

	public void fromBackground(SharedPreferences preferences) {
		ready = true;
		/*
		List<GameObject> gos = GameObject.getAllGameObjects();
		for (int x = 0; x < gos.size(); x++)
		{
			Audio a = (Audio)gos.get(x).getComponent(Audio.class);
			if (a != null)
			{
				a.play();
			}
		}
		 */
		Time.unPause();
	}

	public static boolean isInvincible() {
		return isInvincibility;
	}
}

