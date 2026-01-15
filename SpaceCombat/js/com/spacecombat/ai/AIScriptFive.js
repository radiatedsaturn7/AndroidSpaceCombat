// Auto-converted from com/spacecombat/ai/AIScriptFive.java



 export class AIScriptFive extends AIScript {

 RigidBody rigidBody;

 accel = new Vector2(2, 2);
 maxSpeed = new Vector2(32, 32);
 GameObject target;

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
 this.gameObject.transform.position.x = this.target.transform.position.x;
 }

if(this.maxSpeed.y) {
 this.rigidBody.speed.y += this.accel.y;
 }
	}
}
