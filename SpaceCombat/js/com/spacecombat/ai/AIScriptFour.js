// Auto-converted from com/spacecombat/ai/AIScriptFour.java



 export class AIScriptFour extends AIScript {

 RigidBody rigidBody;

 accel = new Vector2(2, 2);
 maxSpeed = new Vector2(64, 160);
 GameObject target;

 give = 8;

constructor(targets) {
 this.target = GameObject.findRandomByTags(targets);
	}

 onCreate() {
 this.rigidBody = this.gameObject.getRigidBody();
	}

 update() {
if(null) {
	let return;
 }
if(null) {
 if (this.gameObject.transform.position.x > this.target.transform.position.x
 + this.give) {
 if(-this.maxSpeed.x) {
 this.rigidBody.speed.x -= this.accel.x;
 }
 } else if (this.gameObject.transform.position.x < this.target.transform.position.x
 - this.give) {
 if(this.maxSpeed.x) {
 this.rigidBody.speed.x += this.accel.x;
 }
 } else {
 if(0) {
 this.rigidBody.speed.x += this.accel.x;
 } else if (this.rigidBody.speed.x > 0) {
 this.rigidBody.speed.x -= this.accel.x;
 }
 }
 }

if(this.maxSpeed.y) {
 this.rigidBody.speed.y += this.accel.y;
 }
	}
}
