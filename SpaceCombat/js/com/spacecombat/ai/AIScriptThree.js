// Auto-converted from com/spacecombat/ai/AIScriptThree.java



 export class AIScriptThree extends AIScript {
 RigidBody rigidBody;
 accel = new Vector2(2, 2);
 maxSpeed = new Vector2(32, 32);

constructor(isReverse) {
if(isReverse) {
 this.maxSpeed.y = this.maxSpeed.y * .5f;
 }
	}

 onCreate() {
 this.rigidBody = this.gameObject.getRigidBody();
	}

 update() {
if(null) {
	let return;
 }

if(this.maxSpeed.y) {
 this.rigidBody.speed.y += this.accel.y;
 }
	}
}
