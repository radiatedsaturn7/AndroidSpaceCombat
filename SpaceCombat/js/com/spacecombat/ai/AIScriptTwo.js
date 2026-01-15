// Auto-converted from com/spacecombat/ai/AIScriptTwo.java



 export class AIScriptTwo extends AIScript {

 RigidBody rigidBody;
 maxSpeed = new Vector2(32, 32);

	// int count = 0;
	// int maxCount = 120;
 isReverse = false;

 maxPosition = new Vector2(480 - 32, 400);

constructor(isReverse) {
 this.isReverse = isReverse;
	}

 onCreate() {
 this.rigidBody = this.gameObject.getRigidBody();
	}

 update() {
if(null) {
 this.rigidBody = this.gameObject.getRigidBody();
 }

 doTargetSpeed();

if(!this.isReverse) {
	if(Camera.mainCamera.gameObject.transform.position.y) {
 if(0) {
 this.targetSpeed.x = 0;
 }
 if(this.maxSpeed.y) {
 this.targetSpeed.y = this.maxSpeed.y;
 }
 } else if (this.gameObject.transform.position.x < this.maxPosition.x) {
 if(this.maxSpeed.x) {
 this.targetSpeed.x = this.maxSpeed.x;
 }
 if(0) {
 this.targetSpeed.y = 0;
 }
 } else {
 if(0) {
 this.targetSpeed.x = 0;
 }
 if(this.maxSpeed.y) {
 this.targetSpeed.y = this.maxSpeed.y;
 }
 }
 } else if (this.isReverse) {
	if(Camera.mainCamera.gameObject.transform.position.y) {
 if(0) {
 this.targetSpeed.x = 0;
 }
 if(this.maxSpeed.y) {
 this.targetSpeed.y = this.maxSpeed.y;
 }
 } else if (this.gameObject.transform.position.x > 0) {
 if(-this.maxSpeed.x) {
 this.targetSpeed.x = -this.maxSpeed.x;
 }
 if(0) {
 this.targetSpeed.y = 0;
 }
 } else {
 if(0) {
 this.targetSpeed.x = 0;
 }
 if(this.maxSpeed.y) {
 this.targetSpeed.y = this.maxSpeed.y;
 }
 }
 }
	}


 targetSpeed = new Vector2(0,0);
 accel = new Vector2(32,32);

 void doTargetSpeed ()
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
