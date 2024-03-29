package com.spacecombat.ai;

import com.spacecombat.Component;
import com.spacecombat.GameObject;
import com.spacecombat.Time;
import com.spacecombat.game.HealthController;
import com.spacecombat.game.PlayerInput;

public class AIPlayerStartLevel extends Component {
	
	private PlayerInput playerInput = null;
	private HealthController hc = null;
	private float moveTime = 6;
	private float moveSpeed = -100;
	private float totalTime = 0;
	private float delayTime = 10; 
	private static int startTimes = 0;
	private boolean started = false;
	
	public AIPlayerStartLevel (PlayerInput pi, HealthController hc)
	{
		this.playerInput = pi;
		this.hc = hc;
	}

	public void update ()
	{
		if (!started)
		{
			playerInput.setEnabled(false);
			//do this so the player ends up where we want
			gameObject.transform.position.y -= moveSpeed * moveTime;

			started = true;
		}
		
		if (startTimes == 0)
		{
			totalTime += Time.getDeltaTime();
			if (totalTime > delayTime)
			{
				totalTime = 0;
				startTimes++;
			}
		}
		
		if (startTimes >= 1 && totalTime < moveTime)
		{
			gameObject.getRigidBody().speed.y = moveSpeed;
			//player is invincible while he can't control ship
			hc.setHealth(hc.getMaxHealth());
			totalTime += Time.getDeltaTime();
		}
		else if (startTimes >= 1 && totalTime >= moveTime)
		{
			gameObject.getRigidBody().speed.y = 0;
			playerInput.setEnabled(true);
			gameObject.removeComponent(this);
		}
	}
}
