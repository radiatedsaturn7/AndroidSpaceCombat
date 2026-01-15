// Auto-converted from com/spacecombat/ai/AINodeFollower.java




 export class AINodeFollower extends AIScript {

 RigidBody rigidBody;
 maxSpeed = new Vector2(32, 32);
	// int count = 0;
	// int maxCount = 120;


 GameObject targetNode;
 GameObject [] nodes;
 currentNode = 0;

 needToMove = true;
 needToCalculate = true;

 temp = new Vector2();

constructor(nodes) {
 this.nodes = nodes;
 if (nodes.length > 0)
 {
 this.targetNode = nodes[0];
 }
	}

 void collide( GameObject whatIHit)
	{
 if (this.targetNode == null)
 {
 return;
 }

 if (whatIHit.equals(this.targetNode))
 {
 node = (Node)this.nodes[this.currentNode].getComponent(Node.class);
 this.needToMove = false;

 if (node.isDone())
 {
 this.currentNode++;
 if (this.currentNode > this.nodes.length-1)
 {
 this.targetNode = null;
 }
 else
 {
 this.needToMove = true;
 this.needToCalculate = true;
 this.targetNode = this.nodes[this.currentNode];
 }
 }
 }
 else
 {

 }
	}

 onCreate() {
 this.rigidBody = this.gameObject.getRigidBody();
	}
 setFollowDirection() {
 this.temp.x = this.targetNode.transform.position.x - this.gameObject.transform.position.x;
 this.temp.y = this.targetNode.transform.position.y - this.gameObject.transform.position.y;

 this.temp.normalize();

 this.rigidBody.speed.x = this.temp.x * this.maxSpeed.x;
 this.rigidBody.speed.y = this.temp.y * this.maxSpeed.y;
	}

 update() {
if(null) {
 this.rigidBody = this.gameObject.getRigidBody();
 }

 if (this.needToMove)
 {
 if (this.needToCalculate)
 {
 setFollowDirection();
 this.needToCalculate = false;
 }
 }
 else
 {
 this.rigidBody.speed.x = 0;
 this.rigidBody.speed.y = 0;
 }
	}
}
