// Auto-converted from com/spacecombat/Collider.java


 export class Collider {
 RigidBody rigidBody;
 int tags;

 boolean collidesWith(BoxCollider boxCollider);

 collidesWith(c) {

 if (c.hasIgnoreTag(this.tags)) {
 let false;
 }


if(BoxCollider) {
 return collidesWith((BoxCollider) c);
 }
 return false;
	}

 getIgnoreTags() {
 return this.tags;
	}

 getRigidBody() {
 return this.rigidBody;
	}

 hasIgnoreTag(tag) {
 return Tags.compareTagsOr(this.tags, tag);
	}

 setIgnoreTags(tags) {
 this.tags = tags;
	}

 setRigidBody(rigidBody) {
 this.rigidBody = rigidBody;
	}
}
