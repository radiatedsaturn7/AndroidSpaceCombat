package com.spacecombat.ai;

import com.spacecombat.BoxCollider;
import com.spacecombat.Camera;
import com.spacecombat.Collider;
import com.spacecombat.Component;
import com.spacecombat.GameObject;
import com.spacecombat.Time;
import com.spacecombat.game.HealthController;
import com.spacecombat.game.LevelLoader;
import com.spacecombat.game.PlayerInput;

public class AIPlayerEndLevel extends Component {
	
	private PlayerInput playerInput = null;
	private HealthController hc = null;
	private BoxCollider c;
	private float moveSpeed = -100;
	private float totalTime = 0;
	private String nextLevel = "";
	
	public AIPlayerEndLevel (PlayerInput pi, HealthController hc, BoxCollider boxCollider, String nextLevel)
	{
		this.playerInput = pi;
		this.hc = hc;
		this.nextLevel = nextLevel;
		this.c = boxCollider;
		playerInput.setEnabled(false);
	}
	
	public void update ()
	{
		if (gameObject.transform.position.y + c.size.y > Camera.mainCamera.gameObject.transform.position.y)
		{
			//System.out.println("POSITION:"+gameObject.transform.position.y + " / " + Camera.mainCamera.gameObject.transform.position.y);
			gameObject.getRigidBody().speed.y = moveSpeed;
			//player is invincible while he can't control ship
			hc.setHealth(hc.getMaxHealth());
			totalTime += Time.getDeltaTime();
		}
		else
		{
			gameObject.transform.position.y = 800;
			gameObject.removeComponent(this);
			LevelLoader.loadLevel(nextLevel, false);
			gameObject.addComponent(new AIPlayerStartLevel(playerInput,hc));
		}
	}
}
