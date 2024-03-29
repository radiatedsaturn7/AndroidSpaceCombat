package com.spacecombat.weapons;

import com.spacecombat.Component;
import com.spacecombat.game.HealthController;

public class GunShipWeaponController extends Component {
	private final Weapon [] w;

	public GunShipWeaponController(final Weapon [] w) {
		this.w = w;
	}

	@Override
	public void update() {
		for (int x = 0; x < w.length; x++)
		{
			if (this.w[x] != null && this.w[x].canShoot()) {
				this.w[x].shoot();
			}
		}
	}
}
