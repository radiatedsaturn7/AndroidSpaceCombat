package com.spacecombat;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Point;
import android.graphics.Rect;
import android.os.Bundle;
import android.view.Display;
import android.view.MotionEvent;
import android.view.View;

import com.spacecombat.game.LevelLoader;
import com.spacecombat.game.PrefabFactory;

public class Run extends Activity implements FinishListener {
	public static Engine e = null;
	public static Paint paint = null;
	public static boolean created = false;

	public int scale = 1;
	
	private class DemoView extends View implements View.OnTouchListener {

		public DemoView(final Context context) {			
			super(context);			
			paint = new Paint();
			PrefabFactory.setContext(context);
			LevelLoader.setContext(context);
			CanvasGraphic.setPaint(paint);
			CanvasText.setPaint(paint);
			if (!created)
			{
				e = new Engine((FinishListener)context);
				e.start();
				e.createGameObjects(preferences);
			}

			Display display = getWindowManager().getDefaultDisplay();
			Point size = new Point();

			Camera.screenSize.x = display.getWidth();
			Camera.screenSize.y = display.getHeight();
			Camera.scale.x = display.getWidth() / 400;
			Camera.scale.y = Camera.scale.x;

			created = true;
		}

		Paint p = new Paint();
		@Override
		protected void onDraw(final Canvas canvas) {

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

		@Override
		public boolean onTouch(final View v, final MotionEvent event) {

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
	SharedPreferences preferences = null;
	
	@Override
	public void onCreate(final Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		preferences = this.getSharedPreferences(getPackageName(), MODE_PRIVATE);		
		this.demoview = new DemoView(this);
		this.demoview.setOnTouchListener(this.demoview);
		setContentView(this.demoview);
	}

	@Override
	public void onResume ()
	{		
		super.onResume();
		//System.out.println("---RESUMING---");
		//load previous state		
		e.fromBackground(preferences);
	}

	@Override
	public void onPause ()
	{
		super.onPause();
		//System.out.println("---PAUSING---");
		//save previous state
		e.toBackground(preferences.edit());
	}

	public void onExit ()
	{
		this.finish();
	}
}
