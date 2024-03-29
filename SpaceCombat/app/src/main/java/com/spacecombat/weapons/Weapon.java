package com.spacecombat.weapons;

import com.spacecombat.Audio;
import com.spacecombat.Component;
import com.spacecombat.Tags;
import com.spacecombat.Time;
import com.spacecombat.Util;
import com.spacecombat.Vector2;

public abstract class Weapon extends Component {
	protected float baseDamage;
	protected int powerLevel;
	protected int maxPowerLevel;
	protected float reloadTime;
	protected float nextShotTime;
	protected String name;
	protected float shotSpeed;
	protected float life;
	protected Vector2 shotSpeedVector;
	protected float accuracy;
	protected boolean usePhysics = false;
	protected int magazineSize;
	protected int shots;
	protected float magazineReloadTime;
	protected int tags = 0;
	protected boolean useMagazine = true;
	private final Vector2 shotPosition;
	protected int powerUpType = -1;
	private Audio audio;
	private Vector2 offset = new Vector2(0,0);
	private float shotDelay = 0;
	private boolean hasDelayed = false;

	public Weapon(final String name, final float damage, final float accuracy,
			final float reloadTime, final int magazineSize,
			final float magazineReloadTime, final float life,
			final float shotSpeed, final Vector2 shootDirection,
			final boolean usePhysics, final int powerUpType) {
		this.name = name;
		this.baseDamage = damage;
		this.nextShotTime = 0;
		this.powerLevel = 1;
		this.maxPowerLevel = 9;
		this.reloadTime = reloadTime;
		this.accuracy = accuracy;
		this.shotSpeed = shotSpeed;
		this.life = life;
		this.usePhysics = usePhysics;
		this.shots = 0;
		this.magazineSize = magazineSize;
		this.magazineReloadTime = magazineReloadTime;
		this.powerUpType = powerUpType;
		this.shotPosition = new Vector2(0.0f,0.0f);		
		this.shotDelay = 0;
		setShootDirection(shootDirection);
	}
	
	public void onStart()
	{
		this.nextShotTime = Time.getTime() + this.shotDelay;
	}
	
	public void setOffset(int x, int y)
	{
		this.offset.x = x;
		this.offset.y = y;
	}
	
	public Vector2 getOffset()
	{
		return this.offset;
	}
	
	public void setShots(int shots)
	{
		this.shots = shots;
	}
	
	public boolean canShoot() 
	{			
		if (Time.getTime() > this.nextShotTime && powerLevel >= 1) 
			return true;
		return false;
	}
	
	public void setShotDelay(float time)
	{
		this.shotDelay = time;
	}

	protected abstract boolean fire(Vector2 position);

	public Vector2 getShotDirection() {
		return this.shotSpeedVector;
	}

	public void powerUp() {
		this.powerLevel++;
	}

	public void setShootDirection(final Vector2 v) {
		v.normalize();

		if (this.shotSpeedVector == null) {
			this.shotSpeedVector = new Vector2();
		}

		this.shotSpeedVector.x = v.x * this.shotSpeed;
		this.shotSpeedVector.y = v.y * this.shotSpeed;
	}

	public void setUseMagazine (final boolean use)
	{
		this.useMagazine = use;
	}

	public void shoot() {

		if (!canShoot()) {
			return;
		}	

		if (this.gameObject == null)
		{
			return;
		}
		
				
		if (this.tags == 0)
		{
			this.tags = this.gameObject.getTags() | Tags.node | Tags.shot;			
		}

		this.shots++;

		if (this.shots >= this.magazineSize) {
			if (this.useMagazine)
			{
				this.nextShotTime = Time.getTime() + this.magazineReloadTime;
			}
			else
			{
				this.nextShotTime = Time.getTime() + this.reloadTime;
			}
			this.shots = 0;
		} else {
			this.nextShotTime = Time.getTime() + this.reloadTime;
		}

		if (this.usePhysics && this.gameObject.getRigidBody() != null) {
			this.shotSpeedVector.x += this.gameObject.getRigidBody().speed.x;
			this.shotSpeedVector.y += this.gameObject.getRigidBody().speed.y;
		}

		float randomX = Util.randomNumber(0, this.accuracy);
		float randomY = Util.randomNumber(0, this.accuracy);

		final int upDown = Util.randomNumber(0, 1);
		final int leftRight = Util.randomNumber(0, 1);

		if (upDown == 1) {
			randomY = -randomY;
		}
		if (leftRight == 1) {
			randomX = -randomX;
		}

		this.shotSpeedVector.x += randomX;
		this.shotSpeedVector.y += randomY;

		this.shotPosition.x = this.gameObject.transform.position.x;
		this.shotPosition.y = this.gameObject.transform.position.y;
		
		this.shotPosition.x += offset.x;
		this.shotPosition.y += offset.y;
		
		if (fire(this.shotPosition))
		{
			if (audio != null)
			{
				audio.playOnce();
			}			
		}

		this.shotSpeedVector.x -= randomX;
		this.shotSpeedVector.y -= randomY;

		if (this.usePhysics && this.gameObject.getRigidBody() != null) {
			this.shotSpeedVector.x -= this.gameObject.getRigidBody().speed.x;
			this.shotSpeedVector.y -= this.gameObject.getRigidBody().speed.y;
		}
	}
	
	public int getPowerUpType ()
	{
		return powerUpType;
	}
	
	public int getPowerLevel()
	{
		return powerLevel;
	}
	
	public void setPowerLevel (int pl)
	{
		powerLevel = pl;
	}

	public void addAudio(Audio sound) {
		audio = sound;
	}
	
	public void destroy ()
	{
		if (audio != null)
		{
			audio.destroy();
		}
	}		
}
