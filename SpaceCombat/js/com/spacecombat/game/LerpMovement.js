// Auto-converted from com/spacecombat/game/LerpMovement.java




 export class LerpMovement extends Component {
 speed = 0;
 targets = 0;
 ignoreTargets = Tags.powerup | Tags.shot;
 RigidBody rigidBody;
 target = null;
 gos = null;


 temp = new Vector2();

 constructor ( int tags, RigidBody r, float speed)
	{
 this.targets = tags;
 this.rigidBody = r;
 this.speed = speed;
	}

 calculateTrajectory() {
 if (this.target == null)
 {
 this.rigidBody.speed.y = this.speed;
 this.rigidBody.speed.x = 0;
	let return;
 }

 this.temp.x = (this.target.transform.position.x - this.gameObject.transform.position.x);
 this.temp.y = (this.target.transform.position.y - this.gameObject.transform.position.y);

 this.temp.normalize();

 this.rigidBody.speed.x = this.temp.x * -this.speed;
 this.rigidBody.speed.y = this.temp.y * -this.speed;
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
	}

 setSpeed(speed) {
 this.speed = speed;
	}

 update() {

 if (this.target == null || this.target.isDestroyed())
 {
 search();
 }
 calculateTrajectory();
	}
}
