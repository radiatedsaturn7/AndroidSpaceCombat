// Auto-converted from com/spacecombat/RigidBody.java


 export class RigidBody extends Component {
 speed = new Vector2(0, 0);
 collider = null;

 getCollider() {
 return this.collider;
	}

 setCollider(collider) {
 this.collider = collider;
 collider.setRigidBody(this);
	}

 toString() {
 let s = new StringBuffer();
 //
if(null) {
 s.append("RigidBody.position=");
 s.append(this.gameObject.transform.position);
 s.append("\n");
 }

 s.append("RigidBody.speed=");
 s.append(this.speed.toString());
 s.append("\n");
 return s.toString();
	}

 update() {
 this.gameObject.transform.position.x += (this.speed.x * Time
 .getDeltaTime());
 this.gameObject.transform.position.y += (this.speed.y * Time
 .getDeltaTime());
	}
}
