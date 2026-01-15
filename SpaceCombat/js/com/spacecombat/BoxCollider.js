// Auto-converted from com/spacecombat/BoxCollider.java


 export class BoxCollider extends Collider {

 size = new Vector2();

constructor(size) {
 this.size = size;
	}

 collidesWith(boxCollider) {

if(null) {
 throw new RuntimeException(
 "gameObject is null -- can't perform collision");
 }

 if (boxCollider.getRigidBody().gameObject == null) {
 throw new RuntimeException(
 "boxCollider.gameObject is null -- can't perform collision");
 }

 if (this.rigidBody.gameObject.transform.position.x + this.size.x >= boxCollider
 .getRigidBody().gameObject.transform.position.x
 && this.rigidBody.gameObject.transform.position.y + this.size.y >= boxCollider
 .getRigidBody().gameObject.transform.position.y
 && this.rigidBody.gameObject.transform.position.x <= boxCollider
 .getRigidBody().gameObject.transform.position.x
 + boxCollider.size.x
 && this.rigidBody.gameObject.transform.position.y <= boxCollider
 .getRigidBody().gameObject.transform.position.y
 + boxCollider.size.y) {
 return true;
 }

 return false;
	}
}
