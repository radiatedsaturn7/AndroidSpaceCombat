// Auto-converted from com/spacecombat/game/HomingMovement.java




 export class HomingMovement extends Component {
 speed = 0;
 targets = 0;
 ignoreTargets = Tags.powerup | Tags.shot;
 RigidBody rigidBody;
 target = null;
 gos = null;

 temp = new Vector2();
 accel = 8;

 foundOne = false;

 constructor ( int tags, RigidBody r, float speed)
	{
 this.targets = tags;
 this.rigidBody = r;
 this.speed = speed;

 this.rigidBody.speed.y = speed;
 this.rigidBody.speed.x = 0;
 this.foundOne = false;
	}

 calculateTrajectory() {

 if (this.target == null || this.target.isDestroyed())
 {
	let return;
 }

 this.temp.x = (this.target.transform.position.x - this.gameObject.transform.position.x);
 this.temp.y = (this.target.transform.position.y - this.gameObject.transform.position.y);

 this.temp.normalize();

 this.temp.x = this.temp.x * -this.speed;
 this.temp.y = this.temp.y * -this.speed;

 if (this.rigidBody.speed.x < temp.x-accel)
 {
 this.rigidBody.speed.x+=accel;
 }
 else if (this.rigidBody.speed.x > temp.x+accel)
 {
 this.rigidBody.speed.x-=accel;
 }
 else
 {
 this.rigidBody.speed.x = temp.x;
 }

 if (this.rigidBody.speed.y < temp.y-accel)
 {
 this.rigidBody.speed.y+=accel;
 }
 else if (this.rigidBody.speed.y > temp.y+accel)
 {
 this.rigidBody.speed.y-=accel;
 }
 else
 {
 this.rigidBody.speed.y = temp.y;
 }
	}

 void search()
	{
 if (this.gos == null)
 {//
 this.gos = new LinkedList<GameObject>();
 }
 this.gos = GameObject.findAllByTags(this.targets, this.ignoreTargets, this.gos);

 if (this.gos == null || this.gos.size() == 0) {
 this.target = null;
	let return;
 }

 x = Util.randomNumber(0, this.gos.size() - 1);

 this.target = this.gos.get(x);
 this.foundOne = true;
	}

 setSpeed(speed) {
 this.speed = speed;
	}

 update() {

 if (!this.foundOne && (this.target == null || this.target.isDestroyed()))
 {
 search();
 }
 calculateTrajectory();
	}
}
