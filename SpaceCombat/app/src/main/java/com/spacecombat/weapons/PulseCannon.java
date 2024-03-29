package com.spacecombat.weapons;

import com.spacecombat.Camera;
import com.spacecombat.GameObject;
import com.spacecombat.Util;
import com.spacecombat.Vector2;
import com.spacecombat.game.PrefabFactory;

public class PulseCannon extends Weapon {

	private static final String name = "PulseCannon";
	private static final float damage = 45;
	private static final float reloadTime = 2.0f;
	private static final float shotSpeed = 0;
	private static final float life = .25f;
	private static final float accuracy = 0;
	private static final int magazineSize = 0;
	private static final float magazineReloadTime = 1;
	private static final int powerUpType = 3;

	private static final Vector2 spinny = new Vector2(0,-2048);

	public PulseCannon(final Vector2 direction) {
		super(PulseCannon.name, PulseCannon.damage, PulseCannon.accuracy,
				PulseCannon.reloadTime, PulseCannon.magazineSize,
				PulseCannon.magazineReloadTime, PulseCannon.life,
				PulseCannon.shotSpeed, direction, false, powerUpType);
	}

	@Override
	protected boolean fire(final Vector2 position) {
		int draw = 4;
		int draw2 = 4;
		int count = 0;

		this.shotSpeedVector.x = 0;
		this.shotSpeedVector.y = -32;

		final float originalPositionY = position.y;
		for (float y = this.gameObject.transform.position.y; y > Camera.mainCamera.gameObject.transform.position.y + 0; y-=32)
		{
			if (this.powerLevel > 2 * count && count >= 1 && draw > 0)
			{
				draw--;
			}
//
			count++;

			position.y -= 32;

			GameObject.create(PrefabFactory.createShot("pulse", position,
					this.shotSpeedVector, this.tags,
					this.baseDamage + (25 * (this.powerLevel-1)), draw, PulseCannon.life));

		}

		position.y = originalPositionY;
		int otherCount = 0;

		if (this.powerLevel > 9)
		{
			final int nextPowerLevel = this.powerLevel - 9;
			int yTemp = Util.randomNumber(0, 1)*180;

			for (float y = this.gameObject.transform.position.y; y > 0; y-=32)
			{
				yTemp += 16;

				if (nextPowerLevel > 2 * otherCount && otherCount >= 1 && draw2 > 0)
				{
					draw2--;
				}
				otherCount++;

				final int randX = (int)((Math.sin(Math.toRadians(yTemp)))*16.0f);

				position.x += randX;				
				GameObject.create(PrefabFactory.createShot("pulse", position,
						PulseCannon.spinny, this.tags,
						this.baseDamage + (25 * (nextPowerLevel-1)), draw2, PulseCannon.life));
				position.x -= randX;
				position.y -= 32;
			}
		}
		return true;
	}
}
