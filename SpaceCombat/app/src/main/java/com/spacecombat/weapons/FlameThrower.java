package com.spacecombat.weapons;

import com.spacecombat.GameObject;
import com.spacecombat.Util;
import com.spacecombat.Vector2;
import com.spacecombat.game.PrefabFactory;

public class FlameThrower extends Weapon {

	private static final String name = "FlameThrower";
	private static final float damage = 5;
	private static final float reloadTime = 0.1f;
	private static final float shotSpeed = 200;
	private static final float life = 1.0f;
	private static final float accuracy = 32;
	private static final int magazineSize = 3;
	private static final float magazineReloadTime = 0f;
	private static final int powerUpType = 2;

	public FlameThrower(final Vector2 direction) {
		super(FlameThrower.name, FlameThrower.damage, FlameThrower.accuracy,				FlameThrower.reloadTime, FlameThrower.magazineSize,
				FlameThrower.magazineReloadTime, FlameThrower.life,
				FlameThrower.shotSpeed, direction, false, powerUpType);
	}
	//
	@Override
	protected boolean fire(final Vector2 position) {
		GameObject.create(PrefabFactory.createShot("flame", position,
				this.shotSpeedVector, this.tags,
				this.baseDamage + (15 * this.powerLevel), 8-this.powerLevel, FlameThrower.life));
/*
		this.shotSpeedVector.y *= .5;
		GameObject.create(PrefabFactory.createShot("flame", position,
				this.shotSpeedVector, this.tags,
				this.baseDamage + (25 * this.powerLevel), 8-this.powerLevel, FlameThrower.life));
		this.shotSpeedVector.y *= 2;

		if (this.powerLevel > 9)
		{
			this.shotSpeedVector.y *= .5;
			final int randX = Util.randomNumber(0, 64)-32;
			this.shotSpeedVector.x += randX; 
			GameObject.create(PrefabFactory.createShot("flame", position,
					this.shotSpeedVector, this.tags,
					this.baseDamage + (25 * this.powerLevel), 8-this.powerLevel, FlameThrower.life));
			this.shotSpeedVector.x -= randX;
			this.shotSpeedVector.y *= 2;				
		}
	
		*/
		return true;
	}

	@Override
	public void powerUp() {

		super.powerUp();

		if (this.powerLevel > 18)
		{
			return;//
		}

		if ((this.powerLevel - 3) % 5 == 0)
		{
			super.reloadTime -= 0.02f; 
		}
		if ((this.powerLevel - 2) % 5 == 0)
		{
			super.magazineReloadTime -= 0.1f; 
		}
		if ((this.powerLevel - 1) % 5 == 0)
		{
			super.shotSpeed += 25.0f;
			super.setShootDirection(this.shotSpeedVector);
		}
		if ((this.powerLevel - 4) % 5 == 0)
		{
			super.magazineSize++;
		}
		if ((this.powerLevel - 0) % 5 == 0)
		{
			super.accuracy -= 5; 
		}
	}
}
