// Auto-converted from com/spacecombat/FixedJoint.java


 export class FixedJoint extends Component {
 GameObject attachedTo;
 Vector2 lastPosition;

 constructor ( GameObject thisIsAttachedTo)
	{
 this.attachedTo = thisIsAttachedTo;
 this.lastPosition = new Vector2(this.attachedTo.transform.position.x,this.attachedTo.transform.position.y);
	}

 void onAfterUpdate()
	{
if(null) {
	let return;
 }

 if (!this.attachedTo.transform.position.equals(this.lastPosition))
 {
 xDiff = this.lastPosition.x - this.attachedTo.transform.position.x;
 yDiff = this.lastPosition.y - this.attachedTo.transform.position.y;

 this.gameObject.transform.position.x -= xDiff;
 this.gameObject.transform.position.y -= yDiff;

 this.lastPosition.x = this.attachedTo.transform.position.x;
 this.lastPosition.y = this.attachedTo.transform.position.y;
 }
	}
}
