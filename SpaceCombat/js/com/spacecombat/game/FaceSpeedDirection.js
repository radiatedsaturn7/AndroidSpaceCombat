// Auto-converted from com/spacecombat/game/FaceSpeedDirection.java



 export class FaceSpeedDirection extends Component {
 RigidBody rigidBody;

 constructor ( RigidBody r)
	{
 this.rigidBody = r;
	}

 update() {
 //System.out.println("RIGID BODY SPEED:" + this.rigidBody.speed + ":" + this.gameObject.transform.rotation.x);
 this.gameObject.transform.rotation.x = rigidBody.speed.getAngle();
 //System.out.println("ROT:"+this.gameObject.transform.rotation.x);
	}
}
