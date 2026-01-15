// Auto-converted from com/spacecombat/CanvasGraphic.java




 export class CanvasGraphic{

 screen = new Rect(0,0,480,800);
 static Canvas canvas;
 static Paint paint;
 static HashMap<String, Bitmap> loaded;

 static setCanvas(canvas) {
 CanvasGraphic.canvas = canvas;
	}

 static setPaint(paint) {
 CanvasGraphic.paint = paint;
	}

 Rect src;

 Rect dst;

 Bitmap myBitmap;
 int layer;
 name = null;

constructor() {
	}

 String getName()
	{
 return name;
	}

 create(name, is, layer) {
 this.src = new Rect(0, 0, 32, 32);
 this.dst = new Rect(0, 0, 32, 32);
 this.layer = layer;
if(null) {
 CanvasGraphic.loaded = new HashMap<String, Bitmap>();
 }

 if (CanvasGraphic.loaded.containsKey(name)) {
 this.myBitmap = CanvasGraphic.loaded.get(name);
	let return;
 }

 if (is == null)
 {
 throw new RuntimeException("INPUT STREAM IS NULL");
 }

 bitmap = null;
 try {
 // BitmapFactory is an Android graphics utility for images
	bitmap = BitmapFactory.decodeStream(is);
 } finally {
 // Always clear and close
 try {
 is.close();
 is = null;
 } catch ( IOException e) {
 throw new RuntimeException(e);
 }
 }

 if (bitmap == null)
 {
 throw new RuntimeException("GRAPHIC CREATED, IS NULL");
 }

 CanvasGraphic.loaded.put(name, bitmap);
 this.myBitmap = CanvasGraphic.loaded.get(name);

 if (this.myBitmap == null)
 {
 throw new RuntimeException("GRAPHIC CREATED, STILL NULL");
 }
 this.name = name;
	}

 void draw( int x, int y, int width,
 int height, int offsetX, int offsetY,
 int rotx, int roty, int scalex, int scaley) {

 this.dst.set(0, 0, width, height);

 if (!this.dst.intersects(CanvasGraphic.screen.left,CanvasGraphic.screen.top,CanvasGraphic.screen.right,CanvasGraphic.screen.bottom))
 {
 return;
 }

 if (this.myBitmap == null)
 {
 throw new RuntimeException("BITMAP IS NULL");
 }


if(null) {
 // Bitmap bitmap = loaded.get(name);

 // Rect src = new Rect(x,y,x+width,y+height);
 // Rect dst = new Rect(offsetX,offsetY,offsetX+width,offsetY+width);

 // canvas.drawBitmap(bitmap, 100, 100, paint);

 this.src.set(x, y, x + width, y + height);


 if (rotx != 0)
 {
 CanvasGraphic.canvas.save();
 CanvasGraphic.canvas.rotate(rotx,offsetX+width/2,offsetY+height/2);
 CanvasGraphic.canvas.translate(offsetX,offsetY);
 CanvasGraphic.canvas.drawBitmap(this.myBitmap, this.src, this.dst, CanvasGraphic.paint);
 CanvasGraphic.canvas.restore();
 }
 else
 {
 CanvasGraphic.canvas.save();
 CanvasGraphic.canvas.translate(offsetX,offsetY);
 CanvasGraphic.canvas.drawBitmap(this.myBitmap, this.src, this.dst,
 CanvasGraphic.paint);
 CanvasGraphic.canvas.restore();
 }

 } else if (CanvasGraphic.canvas == null) {
 throw new RuntimeException("Canvas is null");
 } else if (CanvasGraphic.paint == null) {
 throw new RuntimeException("paint is null");
 }
	}

 getHeight() {
 return this.myBitmap.getHeight();
	}

 int getLayer ()
	{
 return this.layer;
	}

 getWidth() {
 return this.myBitmap.getWidth();
	}
}
