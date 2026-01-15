// Auto-converted from com/spacecombat/ai/AIScriptNine.java



 export class AIScriptNine extends AIScript {
 isReverse = false;

 RigidBody rigidBody;
 accel = new Vector2(2, 2);
 maxSpeed = new Vector2(32, -32);

constructor(isReverse) {
 this.isReverse = isReverse;
	}

 onCreate() {
 this.rigidBody = this.gameObject.getRigidBody();

 this.rigidBody.speed.x = this.maxSpeed.x;
 this.rigidBody.speed.y = this.maxSpeed.y;

if(this.isReverse) {
 this.rigidBody.speed.x = -this.rigidBody.speed.x;
 }
	}

 update() {
if(null) {
	let return;
 }

 if (!this.isReverse
 && this.gameObject.transform.position.x < 416) {
	if(this.maxSpeed.x) {
 this.rigidBody.speed.x += this.accel.x;
 }
 } else if (this.gameObject.transform.position.x > 64) {
 this.isReverse = true;
	if(-this.maxSpeed.x) {
 this.rigidBody.speed.x -= this.accel.x;
 }
 } else {
 this.isReverse = false;
 }
	}
}
