// Auto-converted from com/spacecombat/game/FaceOppositeSpeedDirection.java



 export class FaceOppositeSpeedDirection extends Component {
 RigidBody rigidBody;

 constructor ( RigidBody r)
	{
 this.rigidBody = r;
	}

 update() {
 this.gameObject.transform.rotation.x = rigidBody.speed.getAngle() + 180;
 //System.out.println("ROT:"+this.gameObject.transform.rotation.x);
	}
}
