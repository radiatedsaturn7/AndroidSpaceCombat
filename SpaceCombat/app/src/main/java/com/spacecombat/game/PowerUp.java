package com.spacecombat.game;


import com.spacecombat.Component;
import com.spacecombat.GameObject;
import com.spacecombat.Tags;
import com.spacecombat.Time;
import com.spacecombat.Util;

public class PowerUp extends Component  
{
	public float nextChange = 0.0f;
	public float changeTime = 2.0f;
	public boolean canChange = true;

	public boolean isUsed =false;

	public float movementTime = 2.0f;
	public float nextMovementChange = 0.0f;

	public int type = -1;
	public int minType = 0;
	public int maxTypes = 7; //0 based

	public SimpleMovement sm;

	public boolean destroyMe = false;

	public PowerUp (final SimpleMovement sm, int type, boolean canChange)
	{
		//System.out.println("TYPE:"+type);
		
		if (type < 0)
		{			
			this.type = Util.randomNumber(0, maxTypes);
			//System.out.println("max:"+maxTypes);
			//System.out.println("TYPE:"+this.type);
		}
		else
		{
			this.type = type;
		}
		
		if (type == 8)
		{
			this.minType = 8;
			this.maxTypes = 8;
			canChange = false;
		}
		if (type == 9)
		{
			this.minType = 9;
			this.maxTypes = 9;
			canChange = false;
		}
		if (type == 10)
		{
			this.minType = 10;
			this.maxTypes = 10;
			canChange = false;
		}
		
		if (type == 11)
		{
			this.minType = 0;
			this.maxTypes = 3;
			this.type = Util.randomNumber(this.minType, maxTypes);
		}
		if (type == 12)
		{
			this.minType = 4;
			this.maxTypes = 5;
			this.type = Util.randomNumber(this.minType, maxTypes);
		}
		if (type == 13)
		{
			this.minType = 0;
			this.maxTypes = 6;
			this.type = Util.randomNumber(this.minType, maxTypes);
		}


		//System.out.println("TYPE:"+this.type);
		
		this.sm = sm;		
		this.canChange = canChange;
		
		if (Util.randomNumber(0, 1) == 1)
		{
			sm.setSpeed(-sm.getSpeedX(), sm.getSpeedY());
		}
	}

	public void change ()
	{
		this.nextChange = Time.getTime() + this.changeTime;		
		this.type++;

		if (this.type > this.maxTypes)
		{
			this.type = this.minType;
		}

		if (this.type == 0)
		{
			this.gameObject.playAnimation("Laser");
		}
		if (this.type == 1)
		{
			this.gameObject.playAnimation("MachineGun");
		}
		if (this.type == 2)
		{
			this.gameObject.playAnimation("FlameThrower");
		}
		if (this.type == 3)
		{
			this.gameObject.playAnimation("PulseCannon");
		}
		if (this.type == 4)
		{
			this.gameObject.playAnimation("LockingLaser");
		}
		if (this.type == 5)
		{
			this.gameObject.playAnimation("MissileLauncher");
		}
		if (this.type == 6)
		{
			this.gameObject.playAnimation("ChargeLaser");
		}
		if (this.type == 7)
		{
			this.gameObject.playAnimation("Health");
		}
		if (this.type == 8)
		{
			this.gameObject.playAnimation("Ally");
		}
		if (this.type == 9)
		{
			this.gameObject.playAnimation("Support");
		}
		if (this.type == 10)
		{
			this.gameObject.playAnimation("GunShip");
		}
	}

	@Override
	public void collide (final GameObject whatIHit)
	{
		if (whatIHit.hasTag(Tags.player) && !whatIHit.hasTag(Tags.shot))
		{
			this.destroyMe = true;
		}
	}

	public int getType ()
	{
		return this.type;
	}
	
	public void setType (int type)
	{
		if (type < 0)
		{			
			this.type = Util.randomNumber(0, maxTypes);
			//System.out.println("max:"+maxTypes);
			//System.out.println("TYPE:"+this.type);
		}
		else
		{
			this.type = type;
		}

		this.type--;
		change();
		
	}

	@Override
	public void onAfterUpdate ()
	{
		if (this.destroyMe)
		{
			this.gameObject.destroy();
		}
	}

	@Override
	public void update ()
	{
		if (this.canChange && Time.getTime() > this.nextChange)
		{
			change();
		}

		if (Time.getTime() > this.nextMovementChange)
		{
			this.nextMovementChange = Time.getTime() + this.movementTime;

			this.sm.setSpeed(-this.sm.getSpeedX(), this.sm.getSpeedY());
		}
	}
}
