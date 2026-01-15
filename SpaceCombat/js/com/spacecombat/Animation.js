// Auto-converted from com/spacecombat/Animation.java



 export class Animation{

 static Pool animationPool;

 String name;
 int startFrame;
 int endFrame;
 boolean loop;
 int fps;
 int width;
 int height;
 int currentFrame;

 hasMoreThanOneFrame = true;
 boolean isDone;
 frameIncrement = 1;

 static Animation getNew ()
	{
 return (Animation)animationPool.retreive();
	}

constructor() {
 this.name = "NO_ANIMATION_LOADED";
 this.startFrame = 0;
 this.endFrame = 1;
 this.loop = true;
 this.fps = 17;
 this.width = 32;
 this.height = 32;
 this.isDone = false;
 this.frameIncrement = 1;
	}

constructor(a) {
 this.name = a.name;
 this.startFrame = a.startFrame;
 this.endFrame = a.endFrame;
 this.loop = a.loop;
 this.fps = a.fps;
 this.width = a.width;
 this.height = a.height;
 this.currentFrame = a.currentFrame;
 this.isDone = a.isDone;
 this.frameIncrement = a.frameIncrement;
	}

 void init (String name, int start, int end,
 boolean loop, int fps, int width, int height) {
 this.name = name;
 this.startFrame = start;
 this.endFrame = end;
 this.loop = loop;
 this.fps = fps;
 this.width = width;
 this.height = height;
 this.isDone = false;
 this.frameIncrement = 1;
 this.currentFrame = this.startFrame;
if(this.startFrame==this.endFrame) {
	let hasMoreThanOneFrame =false;
 }
	}

 framesLeft() {
 return this.endFrame - this.currentFrame;
	}

 getEndFrame() {
 return this.endFrame;
	}

 getFps() {
 return this.fps;
	}

 getHeight() {
 return this.height;
	}

 getName() {
 return this.name;
	}

 getStartFrame() {
 return this.startFrame;
	}

 getWidth() {
 return this.width;
	}

 getX() {
 let 1;
	}

 getY() {
 return (1 + (this.height * this.currentFrame) + this.currentFrame);
	}

 isDone() {
 return this.isDone;
	}

 nextFrame() {
if(!this.isDone) {
 this.currentFrame += this.frameIncrement;
 } else {
 return;
 }

if(this.endFrame) {
 this.currentFrame = this.startFrame;
 } else if (!this.loop && this.currentFrame >= this.endFrame) {
 this.currentFrame = this.endFrame;
 this.isDone = true;
 }
	}

 restart() {
 this.currentFrame = this.startFrame;
	}

 setFrameIncrement(x) {
 this.frameIncrement = x;
	}

 clean() {
 this.name = "NO_ANIMATION_LOADED";
 this.startFrame = 0;
 this.endFrame = 1;
 this.loop = true;
 this.fps = 17;
 this.width = 32;
 this.height = 32;
 this.isDone = false;
 this.frameIncrement = 1;
	}

 int poolId;
 getPoolId() {
 let poolId;
	}

 setPoolId(id) {
let poolId = id;
	}
	//
 void destroy ()
	{
 Animation.animationPool.release(this);
	}

	static
	{
animationPool = new Pool();
 animationPool.init(Animation.class, 100);
	}
}
