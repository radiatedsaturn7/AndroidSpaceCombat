package com.spacecombat.game;

import com.spacecombat.Camera;
import com.spacecombat.Component;
import com.spacecombat.Engine;
import com.spacecombat.GUI;
import com.spacecombat.GameObject;
import com.spacecombat.GraphicAnimation;
import com.spacecombat.TextAnimation;
import com.spacecombat.Time;
import com.spacecombat.Vector2;

public class HealthBarHUD extends Component 
{
	private HealthController healthController;
	
	private float lastHealth = 0;
	private int maxHealth = 0;
	/*	
  	private float timeToPlay = 0.5f;
	private float lastTime = 0.0f;
	private boolean createGameOver = false;
	*/
	public HealthBarHUD (HealthController healthController)
	{		
		this.healthController = healthController;
		maxHealth = healthController.maxHealth;
		lastHealth = maxHealth;
	}
	
	
	public boolean hasPlayedAnimation = false;
	public void update ()
	{		
		int health = healthController.health;
		
		if (lastHealth != health && (health < lastHealth || health == maxHealth))
		{
			double value = ((float)health) / ((float)maxHealth);
			value *= 10;
			int floor = (int) Math.floor(value);
			floor *= 10;
			int percentage = floor;
			gameObject.playAnimation(percentage+"%");
			
			//lastTime = Time.getTime();			
		}
		else if (!hasPlayedAnimation)
		{
			gameObject.playAnimation("100%");
			hasPlayedAnimation = true;
		}

		lastHealth = healthController.health;
	}		
}
