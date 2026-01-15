// Auto-converted from com/spacecombat/ai/AIBoss3.java



 export class AIBoss3 extends AIScript {
 isReverse = false;

 RigidBody rigidBody;
 accel = new Vector2(2, 2);
 maxSpeed = new Vector2(30, 15);
 startPos = new Vector2(0, 0);
 nextSpawnTime = 5;
 lastSpawnTime = 0;
 maxWidth = 200;

 HealthController hc;

constructor(hc) {
 this.hc = hc;
	}

 onCreate() {
 this.rigidBody = this.gameObject.getRigidBody();
 this.startPos = new Vector2(this.gameObject.transform.position);
 this.rigidBody.speed.x = maxSpeed.x;
 this.rigidBody.speed.y = maxSpeed.y;
	}

 leftRight = false;
 update() {

if(null) {
	let return;
 }

 if (Time.getTime() > lastSpawnTime + nextSpawnTime)
 {
	lastSpawnTime = Time.getTime();
 v1 = null;
 v2 = null;

 ship = 2;
 percentage = ((float)(hc.health)) / ((float)(hc.maxHealth));

 if (percentage < .40)
 {
 ship = 5;
 nextSpawnTime = 6;
 }

	leftRight = !leftRight;
	v1 = new Vector2(gameObject.transform.position.x,gameObject.transform.position.y-32);
	v2 = new Vector2(gameObject.transform.position.x+208-32,gameObject.transform.position.y-32);

 if (leftRight)
 {
 //GameObject.create(PrefabFactory.createEnemy("enemy", v1, ship, 6, leftRight));
 }

 if (!leftRight)
 {
 //GameObject.create(PrefabFactory.createEnemy("enemy", v2, ship, 6, leftRight));
 }
 }

 if (this.gameObject.transform.position.y > Camera.mainCamera.gameObject.transform.position.y)
 {
 this.rigidBody.speed.y = 0;
 }
 else
 {
 this.rigidBody.speed.y = maxSpeed.y;
 }

if(this.maxWidth) {
	if(this.maxSpeed.x) {
 this.rigidBody.speed.x += this.accel.x;
 }
 } else if (this.gameObject.transform.position.x > this.startPos.x - this.maxWidth) {
 this.isReverse = true;
	if(-this.maxSpeed.x) {
 this.rigidBody.speed.x -= this.accel.x;
 }
 } else {
 this.isReverse = false;
 }
	}
}
