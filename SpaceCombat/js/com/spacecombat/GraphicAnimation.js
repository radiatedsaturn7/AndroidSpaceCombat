// Auto-converted from com/spacecombat/GraphicAnimation.java


 export class GraphicAnimation extends Component {
 GenericGraphic graphic;
 Animation animation;
 lastDraw = 0;

 constructor( GenericGraphic graphic,
 Animation animation) {
 this.graphic = graphic;
 this.animation = animation;
 setEnabled(false);
isDrawable = true;
	}

 draw() {

if(null) {
	let return;
 }

 if (Camera.mainCamera == null)
 {
 //System.out.println("Can't Draw, No Camera To Draw On!");
 return;
 }

 //this.graphic.draw(this.animation.getX(), this.animation.getY(),
 this.graphic.draw(1, (1 + (this.animation.height * this.animation.currentFrame) + this.animation.currentFrame),
 this.animation.width, this.animation.height,
 (int) (this.gameObject.transform.position.x-Camera.mainCamera.gameObject.transform.position.x),
 (int) (this.gameObject.transform.position.y-Camera.mainCamera.gameObject.transform.position.y),
 (int) (this.gameObject.transform.rotation.x-Camera.mainCamera.gameObject.transform.rotation.x),
 (int) (this.gameObject.transform.rotation.y-Camera.mainCamera.gameObject.transform.rotation.y),
 (int) this.gameObject.transform.scale.x,
 (int) this.gameObject.transform.scale.y);

if(this.animation.hasMoreThanOneFrame) {
 if (Time.getTime() - this.lastDraw > (1.0 / this.animation.getFps())) {
 this.lastDraw = Time.getTime();
 this.animation.nextFrame();
 }
 }
	}

 getDuration() {

 return (1.0f / this.animation.getFps())
 * (this.animation.getEndFrame() - this.animation
 .getStartFrame());
	}

 int getLayer()
	{
 return this.graphic.getLayer();
	}

 getName() {
 return this.animation.getName();
	}

 isDone() {
 return this.animation.isDone();
	}//

 play() {
 setEnabled(true);
	}

 void destroy()
	{
 animation.destroy();
	}
}
