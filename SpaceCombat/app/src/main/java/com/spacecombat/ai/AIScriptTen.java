package com.spacecombat.ai;

import com.spacecombat.Camera;
import com.spacecombat.RigidBody;
import com.spacecombat.Time;
import com.spacecombat.Vector2;

public class AIScriptTen extends AIScript {

	private RigidBody rigidBody;
	private final Vector2 maxSpeed = new Vector2(32, -32);
	// private int count = 0;
	// private int maxCount = 120;
	private boolean isReverse = false;

	private final Vector2 maxPosition = new Vector2(480 - 32, 400);

	public AIScriptTen(final boolean isReverse) {
		this.isReverse = isReverse;
		fired = false;
	}

	private boolean fired = false;
	
	@Override	
	public void onCreate() {
		this.rigidBody = this.gameObject.getRigidBody();
		fired = false;
	}

	@Override
	public void update() {
		if (this.rigidBody == null) {
			this.rigidBody = this.gameObject.getRigidBody();
		}
		
		doTargetSpeed();

		if (!this.isReverse) {
			if (this.gameObject.transform.position.y > this.maxPosition.y + Camera.mainCamera.gameObject.transform.position.y && !fired) {
				if (this.rigidBody.speed.x != 0) {
					this.targetSpeed.x = 0;
				}
				if (this.rigidBody.speed.y != this.maxSpeed.y && !fired) {
					this.targetSpeed.y = this.maxSpeed.y;
				}
			} else if (this.gameObject.transform.position.x < this.maxPosition.x) {
				if (this.rigidBody.speed.x != this.maxSpeed.x) {
					this.targetSpeed.x = this.maxSpeed.x;
				}
				if (this.rigidBody.speed.y != 0 && !fired) {
					this.targetSpeed.y = 0;
					fired = true;
				}
			} else {
				if (this.rigidBody.speed.x != 0) {
					this.targetSpeed.x = 0;
				}
				if (this.rigidBody.speed.y != this.maxSpeed.y) {
					this.targetSpeed.y = this.maxSpeed.y;
				}
			}
		} else if (this.isReverse) {
			if (this.gameObject.transform.position.y > this.maxPosition.y + Camera.mainCamera.gameObject.transform.position.y && !fired) {
				if (this.rigidBody.speed.x != 0) {
					this.targetSpeed.x = 0;
				}
				if (this.rigidBody.speed.y != this.maxSpeed.y && !fired) {
					this.targetSpeed.y = this.maxSpeed.y;
				}
			} else if (this.gameObject.transform.position.x > 0) {
				if (this.rigidBody.speed.x != -this.maxSpeed.x) {
					this.targetSpeed.x = -this.maxSpeed.x;
				}
				if (this.rigidBody.speed.y != 0 && !fired) {
					this.targetSpeed.y = 0;
					fired = true;
				}
			} else {
				if (this.rigidBody.speed.x != 0) {
					this.targetSpeed.x = 0;
				}
				if (this.rigidBody.speed.y != this.maxSpeed.y) {
					this.targetSpeed.y = this.maxSpeed.y;
				}
			}
		}
	}
	
	private Vector2 targetSpeed = new Vector2(0,0);
	private Vector2 accel = new Vector2(32,32);
	
	private void doTargetSpeed ()
	{
		if (this.rigidBody.speed.x < targetSpeed.x)
		{
			this.rigidBody.speed.x += accel.x * Time.getDeltaTime();
		}
		if (this.rigidBody.speed.x > targetSpeed.x)
		{			
			this.rigidBody.speed.x -= accel.x * Time.getDeltaTime();
		}
		if (this.rigidBody.speed.y < targetSpeed.y)
		{			
			this.rigidBody.speed.y += accel.y * Time.getDeltaTime();
		}
		if (this.rigidBody.speed.y > targetSpeed.y)
		{			
			this.rigidBody.speed.y -= accel.y * Time.getDeltaTime();
		}
	}
}
