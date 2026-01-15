// Auto-converted from com/spacecombat/ai/AIScriptOne.java



 export class AIScriptOne extends AIScript {
 isReverse = false;

 RigidBody rigidBody;
 accel = new Vector2(2, 2);
 maxSpeed = new Vector2(32, 32);
 startPos = new Vector2(0, 0);
 maxWidth = 50;

constructor(isReverse) {
 this.isReverse = isReverse;
	}

 onCreate() {
 this.rigidBody = this.gameObject.getRigidBody();
 this.startPos = new Vector2(this.gameObject.transform.position);

if(this.isReverse) {
 this.rigidBody.speed.x = -this.rigidBody.speed.x;
 }
	}

 update() {
if(null) {
	let return;
 }

if(this.maxSpeed.y) {
 this.rigidBody.speed.y += this.accel.y;
 }
 if (!this.isReverse
 && this.gameObject.transform.position.x < this.startPos.x
 + this.maxWidth) {
	if(this.maxSpeed.x) {
 this.rigidBody.speed.x += this.accel.x;
 }
 } else if (this.gameObject.transform.position.x > this.startPos.x
 - this.maxWidth) {
 this.isReverse = true;
	if(-this.maxSpeed.x) {
 this.rigidBody.speed.x -= this.accel.x;
 }
 } else {
 this.isReverse = false;
 }
	}
}
