package com.spacecombat.game;

import com.spacecombat.Component;
import com.spacecombat.GameObject;
import com.spacecombat.Pool;
import com.spacecombat.Poolable;
import com.spacecombat.RigidBody;

public class SimpleMovement extends Component implements Poolable{
	private float speedX = 0;
	private float speedY = 0;
//test
	private RigidBody rigidBody;
	
	private static Pool simpleMovementPool;
	
	static
	{
		SimpleMovement.simpleMovementPool = new Pool();
		SimpleMovement.simpleMovementPool.init(SimpleMovement.class,100);
	}

	public SimpleMovement ()
	{
	}

	public void init (final RigidBody r, final float x, final float y)
	{
		this.rigidBody = r;
		this.speedX = x;
		this.speedY = y;
	}

	public float getSpeedX ()
	{
		return this.speedX;
	}

	public float getSpeedY ()
	{
		return this.speedY;
	}

	public void setSpeed(final float x, final float y) {
		this.speedX = x;
		this.speedY = y;

		this.rigidBody.speed.x = this.speedX;
		this.rigidBody.speed.y = this.speedY;
	}

	@Override
	public void update() {
		this.rigidBody.speed.x = this.speedX;
		this.rigidBody.speed.y = this.speedY;
	}

	public void clean() {
		this.rigidBody = null;
		this.speedX = 0;
		this.speedY = 0;
	}

	private int poolId;
	
	public static SimpleMovement getNew ()
	{
		return (SimpleMovement)SimpleMovement.simpleMovementPool.retreive();
	}
	
	public void destroy ()
	{
		SimpleMovement.simpleMovementPool.release(this);
	}

	@Override
	public int getPoolId() {
		return poolId;
	}

	@Override
	public void setPoolId(int id) {
		poolId = id;
	}
}
