// Auto-converted from com/spacecombat/game/PlayerFollower.java



 export class PlayerFollower extends Component
{
 GameObject target;
 float minWidth;
 float maxWidth;
 float startScrollLeft;
 float startScrollRight;
 float yScroll;
 SimpleMovement simpleMovement;

 constructor (GameObject target, SimpleMovement simpleMovement, float minWidth, float maxWidth, float startScrollLeft, float startScrollRight, float yScroll)
	{
 this.target = target;
 this.maxWidth = maxWidth;
 this.minWidth = minWidth;
 this.startScrollLeft = startScrollLeft;
 this.startScrollRight = startScrollRight;
 this.yScroll = yScroll;
 this.simpleMovement = simpleMovement;
	}

 void update ()
	{
 if (this.target == null || this.target.isDestroyed() || this.gameObject.getRigidBody() == null || simpleMovement == null)
 {
 simpleMovement.setSpeed(0, 0);
 this.target = GameObject.findByName("player");
 return;
 }

 //System.out.println(Camera.mainCamera.gameObject.transform.position.x + " BETWEEN " + maxWidth + " AND " + minWidth);

 if (simpleMovement.gameObject.transform.position.x < minWidth)
 {
 simpleMovement.gameObject.transform.position.x = minWidth;
 }
 if (simpleMovement.gameObject.transform.position.x > maxWidth)
 {
 simpleMovement.gameObject.transform.position.x = maxWidth;
 }

 if (this.target.transform.position.x - Camera.mainCamera.gameObject.transform.position.x > startScrollRight && Camera.mainCamera.gameObject.transform.position.x < maxWidth)
 {
 //System.out.println("MOVE RIGHT");
 simpleMovement.setSpeed(32, yScroll);
 }
 else if (this.target.transform.position.x - Camera.mainCamera.gameObject.transform.position.x < startScrollLeft && Camera.mainCamera.gameObject.transform.position.x > minWidth)
 {
 //System.out.println("CAMERA:"+this.gameObject.transform.rotation);
 //System.out.println("TARGET:"+this.target.transform.rotation);
 simpleMovement.setSpeed(-32, yScroll);
 }
 else
 {
 simpleMovement.setSpeed(0, yScroll);
 }
	}

 setScrollSpeed(i) {
 // TODO Auto-generated method stub
let yScroll = i;

	}
}
