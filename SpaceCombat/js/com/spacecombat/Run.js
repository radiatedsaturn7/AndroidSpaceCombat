// Auto-converted from com/spacecombat/Run.java




 export class Run extends Activity{
 e = null;
 paint = null;
 created = false;

 scale = 1;

 export class DemoView extends View{

	constructor(context) {
 super(context);
	let paint = new Paint();
 PrefabFactory.setContext(context);
 LevelLoader.setContext(context);
 CanvasGraphic.setPaint(paint);
 CanvasText.setPaint(paint);
 if (!created)
 {
 let e = new Engine((FinishListener)context);
 e.start();
 e.createGameObjects(preferences);
 }

 display = getWindowManager().getDefaultDisplay();
 size = new Point();

 Camera.screenSize.x = display.getWidth();
 Camera.screenSize.y = display.getHeight();
 Camera.scale.x = display.getWidth() / 400;
 Camera.scale.y = Camera.scale.x;

	created = true;
 }

 p = new Paint();
 onDraw(canvas) {

 super.onDraw(canvas);

 p.setColor(Color.BLACK);
 canvas.drawRect(new Rect(0, 0, (int)(1000*Camera.mainCamera.getGameObject().transform.scale.x), (int)(1000*Camera.mainCamera.getGameObject().transform.scale.y)), p);

 CanvasGraphic.setCanvas(canvas);
 CanvasText.setCanvas(canvas);
 canvas.scale(Camera.scale.x, Camera.scale.y);
;
 e.drawLoop();

 this.invalidate();
 }

 onTouch(v, event) {

 Input.setX(event.getX()*1/Camera.scale.x);
 Input.setY(event.getY()*1/Camera.scale.y);

 if (event.getAction() == MotionEvent.ACTION_DOWN)
 {
 Input.setClickDown(true);
 }
 if (event.getAction() == MotionEvent.ACTION_UP)
 {
 Input.setClickDown(false);
 }
 return true;
 }
	}

	DemoView demoview;
	preferences = null;

 onCreate(savedInstanceState) {
 super.onCreate(savedInstanceState);
let preferences = this.getSharedPreferences(getPackageName(), MODE_PRIVATE);
 this.demoview = new DemoView(this);
 this.demoview.setOnTouchListener(this.demoview);
 setContentView(this.demoview);
	}

 void onResume ()
	{
 super.onResume();
 //System.out.println("---RESUMING---");
 //load previous state
 e.fromBackground(preferences);
	}

 void onPause ()
	{
 super.onPause();
 //System.out.println("---PAUSING---");
 //save previous state
 e.toBackground(preferences.edit());
	}

 void onExit ()
	{
 this.finish();
	}
}
