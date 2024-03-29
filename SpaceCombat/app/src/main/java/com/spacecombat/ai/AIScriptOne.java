package com.spacecombat.ai;

import com.spacecombat.RigidBody;
import com.spacecombat.Vector2;

public class AIScriptOne extends AIScript {
	private boolean isReverse = false;

	private RigidBody rigidBody;
	private final Vector2 accel = new Vector2(2, 2);
	private final Vector2 maxSpeed = new Vector2(32, 32);
	private Vector2 startPos = new Vector2(0, 0);
	private final int maxWidth = 50;

	public AIScriptOne(final boolean isReverse) {
		this.isReverse = isReverse;
	}

	@Override
	public void onCreate() {
		this.rigidBody = this.gameObject.getRigidBody();
		this.startPos = new Vector2(this.gameObject.transform.position);

		if (this.isReverse) {
			this.rigidBody.speed.x = -this.rigidBody.speed.x;
		}
	}

	@Override
	public void update() {
		if (this.rigidBody == null) {
			return;
		}

		if (this.rigidBody.speed.y < this.maxSpeed.y) {
			this.rigidBody.speed.y += this.accel.y;
		}
		if (!this.isReverse
				&& this.gameObject.transform.position.x < this.startPos.x
				+ this.maxWidth) {
			if (this.rigidBody.speed.x < this.maxSpeed.x) {
				this.rigidBody.speed.x += this.accel.x;
			}
		} else if (this.gameObject.transform.position.x > this.startPos.x
				- this.maxWidth) {
			this.isReverse = true;
			if (this.rigidBody.speed.x > -this.maxSpeed.x) {
				this.rigidBody.speed.x -= this.accel.x;
			}
		} else {
			this.isReverse = false;
		}
	}
}
