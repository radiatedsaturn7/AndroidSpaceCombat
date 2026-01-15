// Auto-converted from com/spacecombat/CanvasText.java



 export class CanvasText extends GenericText
{
 String text;
 int color;
 Typeface font;
 static Canvas canvas;
 static Paint paint;

 static setCanvas(canvas) {
 CanvasText.canvas = canvas;
	}

 static setPaint(paint) {
 CanvasText.paint = paint;
	}

 create(text, font, color) {
 this.text = text;
 this.font = Typeface.create(font, 0);
 this.color = color;
	}

 void setText ( String text)
	{
 this.text = text;
	}

 void setFont ( String font)
	{
 this.font = Typeface.create(font, 0);
	}

 void setColor ( int color)
	{
 this.color = color;
	}

 draw(offsetx, offsety, rotx, roty, scalex, scaley) {
 //System.out.println("DRAWING:" + text + " AT (" + offsetx + "," + offsety + ")");
 //CanvasText.paint.setTypeface(this.font);
 //CanvasText.paint.setColor(this.color);
 //CanvasText.paint.setStrokeWidth(2);

 let temp = CanvasText.paint.getTextSize();
 //CanvasText.paint.setTextSize(temp*2*scalex);
 CanvasText.canvas.drawText(text, offsetx, offsety, paint);
 //CanvasText.paint.setTextSize(temp);

 //System.out.println(offsetx +","+ offsety+":"+text);
	}

 getHeight() {
 let 0;
	}

 getWidth() {
 let 0;
	}

}
