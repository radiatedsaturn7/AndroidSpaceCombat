package com.spacecombat.weapons;

import com.spacecombat.GameObject;
import com.spacecombat.Vector2;
import com.spacecombat.game.PrefabFactory;

public class MachineGun extends Weapon {

	private static final String name = "MachineGun";
	private static final float damage = 20;
	private static final float reloadTime = 0.2f;
	private static final float shotSpeed = 256;
	private static final float life = 5;
	private static final float accuracy = 40;
	private static final int magazineSize = 5;
	private static final float magazineReloadTime = 1;
	private static final int powerUpType = 1;

	public MachineGun(final Vector2 direction) {
		super(MachineGun.name, MachineGun.damage, MachineGun.accuracy,
				MachineGun.reloadTime, MachineGun.magazineSize,
				MachineGun.magazineReloadTime, MachineGun.life,
				MachineGun.shotSpeed, direction, false, powerUpType);
	}

	@Override
	protected boolean fire(final Vector2 position) {

		GameObject.create(PrefabFactory.createShot("bullet", position,
				this.shotSpeedVector, this.tags,
				this.baseDamage + (7.5f * (this.powerLevel-1)), this.powerLevel, MachineGun.life));
/*
		if (this.powerLevel > 5)
		{
			final int nextPowerLevel = this.powerLevel - 5;
			this.shotSpeedVector.x -= 20;		
			GameObject.create(PrefabFactory.createShot("bullet", position,
					this.shotSpeedVector, this.tags,
					this.baseDamage + (7.5f * (nextPowerLevel-1)), nextPowerLevel, MachineGun.life));
			this.shotSpeedVector.x += 40;
			GameObject.create(PrefabFactory.createShot("bullet", position,
					this.shotSpeedVector, this.tags,
					this.baseDamage + (7.5f * (nextPowerLevel-1)), nextPowerLevel, MachineGun.life));
			this.shotSpeedVector.x -= 20;
		}

		if (this.powerLevel > 9)
		{
			final int nextPowerLevel = this.powerLevel - 9;
			this.shotSpeedVector.x -= 60;
			GameObject.create(PrefabFactory.createShot("bullet", position,
					this.shotSpeedVector, this.tags,
					this.baseDamage + (7.5f * (nextPowerLevel-1)), nextPowerLevel, MachineGun.life));
			this.shotSpeedVector.x += 120;
			GameObject.create(PrefabFactory.createShot("bullet", position,
					this.shotSpeedVector, this.tags,
					this.baseDamage + (7.5f * (nextPowerLevel-1)), nextPowerLevel, MachineGun.life));
			this.shotSpeedVector.x -= 60;
		}
		*/
		return true;
	}
}
