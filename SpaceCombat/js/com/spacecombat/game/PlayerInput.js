// Auto-converted from com/spacecombat/game/PlayerInput.java



 export class PlayerInput extends Component{

	wc = null;
	collider = null;

	changeTime = 0.25f;
	nextChange = 0.0f;
	lastX = 0;
	lastY = 0;
	clicked = false;

constructor(wc, c) {
 Input.subscribeListener(this);
 this.wc = wc;
 this.collider = c;
	}

 void destroy()
	{
 Input.unsubscribeListener(this);
	}

 onClick(x, y) {
 if (!isEnabled())
 {
	let return;
 }

if(null) {
	let return;
 }

 this.lastX = this.gameObject.transform.position.x;
 this.lastY = this.gameObject.transform.position.y;


 this.gameObject.transform.position.x = x;
 this.gameObject.transform.position.y = y;

 if (this.collider != null)
 {
 this.gameObject.transform.position.x -= this.collider.size.x * .5;
 this.gameObject.transform.position.y -= this.collider.size.y * 4;

 if (y > 700)
 {
 tempY = y;
 tempY -= 700;
 max = 100;

 inc = ((float)tempY) / ((float)max);
 this.gameObject.transform.position.y += inc * (((float)(this.collider.size.y)) * 4.0f);

 if (this.gameObject.transform.position.y > 800-32)
 {
 //System.out.println("POS"+this.gameObject.transform.position.y);
 this.gameObject.transform.position.y = 800-32;
 }
 }

 if (this.gameObject.transform.position.y < 0)
 {
 //System.out.println("POS"+this.gameObject.transform.position.y);
 this.gameObject.transform.position.y = 0;
 }

 }

 this.gameObject.transform.position.x += Camera.mainCamera.gameObject.transform.position.x;
 this.gameObject.transform.position.y += Camera.mainCamera.gameObject.transform.position.y;


 for (int d = 0; d < this.wc.length; d++)
 {
 if (this.wc[d].getSelectedWeapon() != null) {
 this.wc[d].getSelectedWeapon().shoot();
 }
 }

clicked = true;
	}

	cameraScrollSpeed = 0;
 static void setCameraScrollSpeed(float s)
	{
cameraScrollSpeed = s;
	}

 void update ()
	{
 if (!clicked)
 {
 this.gameObject.getRigidBody().speed.y = cameraScrollSpeed;
 }
 else
 {
 this.gameObject.getRigidBody().speed.y = 0;
 }

clicked = false;
 if (Time.getTime() <= this.nextChange)
 {
 return;
 }

 if (this.lastY < this.gameObject.transform.position.y)
 {
 this.nextChange = Time.getTime() + this.changeTime;
 if (this.lastX < this.gameObject.transform.position.x)
 {
 this.gameObject.playAnimation("DOWNRIGHT");
 }
 else if (this.lastX > this.gameObject.transform.position.x)
 {
 this.gameObject.playAnimation("DOWNLEFT");
 }
 else
 {
 this.gameObject.playAnimation("DOWN");
 }
 }
 else if (this.lastY > this.gameObject.transform.position.y)
 {
 this.nextChange = Time.getTime() + this.changeTime;
 if (this.lastX < this.gameObject.transform.position.x)
 {
 this.gameObject.playAnimation("UPLEFT");
 }
 else if (this.lastX > this.gameObject.transform.position.x)
 {
 this.gameObject.playAnimation("UPLEFT");
 }
 else
 {
 this.gameObject.playAnimation("UP");
 }
 }
 else
 {
 if (this.lastX < this.gameObject.transform.position.x)
 {
 this.nextChange = Time.getTime() + this.changeTime;
 this.gameObject.playAnimation("RIGHT");
 }
 else if (this.lastX > this.gameObject.transform.position.x)
 {
 this.nextChange = Time.getTime() + this.changeTime;
 this.gameObject.playAnimation("LEFT");
 }
 else
 {
 this.gameObject.playAnimation("IDLE");
 }
 }

 this.lastX = this.gameObject.transform.position.x;
 this.lastY = this.gameObject.transform.position.y;

	}
}
