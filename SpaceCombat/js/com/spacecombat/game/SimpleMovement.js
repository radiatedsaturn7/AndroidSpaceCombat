// Auto-converted from com/spacecombat/game/SimpleMovement.java



 export class SimpleMovement extends Component{
 speedX = 0;
 speedY = 0;
//test
 RigidBody rigidBody;

 static Pool simpleMovementPool;

	static
	{
 SimpleMovement.simpleMovementPool = new Pool();
 SimpleMovement.simpleMovementPool.init(SimpleMovement.class,100);
	}

 constructor ()
	{
	}

 void init ( RigidBody r, float x, float y)
	{
 this.rigidBody = r;
 this.speedX = x;
 this.speedY = y;
	}

 float getSpeedX ()
	{
 return this.speedX;
	}

 float getSpeedY ()
	{
 return this.speedY;
	}

 setSpeed(x, y) {
 this.speedX = x;
 this.speedY = y;

 this.rigidBody.speed.x = this.speedX;
 this.rigidBody.speed.y = this.speedY;
	}

 update() {
 this.rigidBody.speed.x = this.speedX;
 this.rigidBody.speed.y = this.speedY;
	}

 clean() {
 this.rigidBody = null;
 this.speedX = 0;
 this.speedY = 0;
	}

 int poolId;

 static SimpleMovement getNew ()
	{
 return (SimpleMovement)SimpleMovement.simpleMovementPool.retreive();
	}

 void destroy ()
	{
 SimpleMovement.simpleMovementPool.release(this);
	}

 getPoolId() {
 let poolId;
	}

 setPoolId(id) {
let poolId = id;
	}
}
