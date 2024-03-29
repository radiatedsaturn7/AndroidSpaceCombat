package com.spacecombat.weapons;

import com.spacecombat.GameObject;
import com.spacecombat.Vector2;
import com.spacecombat.game.PrefabFactory;

public class MissileLauncher extends Weapon {
	
	private static final String name = "missileLauncher";
	private static final float damage = 50;
	private static final float reloadTime = 3.0f;
	private static final float shotSpeed = 128;
	private static final float life = 5;
	private static final float accuracy = 32;
	private static final int magazineSize = 3;
	private static final float magazineReloadTime = 2;
	private static final int powerUpType = 5;
	
	public MissileLauncher(final Vector2 direction) {
		super(MissileLauncher.name, MissileLauncher.damage, MissileLauncher.accuracy, MissileLauncher.reloadTime,
				MissileLauncher.magazineSize, MissileLauncher.magazineReloadTime, MissileLauncher.life,
				MissileLauncher.shotSpeed, direction, false, powerUpType);
	}

	@Override
	protected boolean fire(final Vector2 position) {
		if (this.powerLevel >= 1 && this.powerLevel <= 2|| this.powerLevel >= 6)
		{
			GameObject.create(PrefabFactory.createShot("missile", position,
				this.shotSpeedVector, this.tags,
				this.baseDamage + (10 * (this.powerLevel-1)), this.powerLevel, MissileLauncher.life));
		}
		position.x += 16;
		position.y += 16;
		
		if (this.powerLevel >= 3)
		{
			GameObject.create(PrefabFactory.createShot("missile", position,
				this.shotSpeedVector, this.tags,
				this.baseDamage + (10 * (this.powerLevel-1)), this.powerLevel, MissileLauncher.life));
		
			position.x -= 32;
			GameObject.create(PrefabFactory.createShot("missile", position,
				this.shotSpeedVector, this.tags,
				this.baseDamage + (10 * (this.powerLevel-1)), this.powerLevel, MissileLauncher.life));
		}
		return true;
	}
}
