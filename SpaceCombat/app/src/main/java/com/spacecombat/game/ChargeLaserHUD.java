package com.spacecombat.game;

import com.spacecombat.Component;
import com.spacecombat.weapons.ChargeLaser;

public class ChargeLaserHUD extends Component {

	private ChargeLaser chargeLaser = null;
	private float lastCharge = 0;
	public ChargeLaserHUD(ChargeLaser cl) {
		chargeLaser = cl;
	}

	public boolean hasPlayedAnimation = false;
	
	public void update ()
	{		
		float charge = chargeLaser.getCharge();
		
		
		if (lastCharge != charge)
		{
			double value = chargeLaser.getChargePercentage();
			value *= 10;
			
			//System.out.println("CHARGE="+value);
			
			int floor = (int) Math.floor(value);
			floor *= 10;
			int percentage = floor;
			gameObject.playAnimation(percentage+"%");
			
			//lastTime = Time.getTime();			
		}
		else if (!hasPlayedAnimation)
		{
			gameObject.playAnimation("0%");
			hasPlayedAnimation = true;
		}

		lastCharge = charge;
	}		

}
