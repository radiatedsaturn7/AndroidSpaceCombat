package com.spacecombat;

import android.graphics.Rect;

import java.util.LinkedList;
import java.util.List;

import com.spacecombat.game.PrefabFactory;

public class GUI {
	
	private static List<GameObject> guiElements = new LinkedList<GameObject>();	
	
	public static boolean drawImage (GenericGraphic g, int x, int y, float width, float height)
	{
		GameObject temp = GameObject.getNew();
		temp.transform.position.x = x + Camera.mainCamera.gameObject.transform.position.x; 
		temp.transform.position.y = y + Camera.mainCamera.gameObject.transform.position.y; 
		Animation a = new Animation();
		a.init("Idle", 0, 0, false,
				1, 32, 32);
		GraphicAnimation ga = new GraphicAnimation(g,a);
		temp.addComponent(ga);		
		add(temp);
		
		if (Input.xPos >= x && Input.xPos <= x + width)
		{
			if (Input.yPos >= x && Input.yPos <= y + height)
			{
				return true;
			}
		}
		return false;
	}
	

	private static GenericText genericText = new CanvasText();
	public static void setDrawColor (int r, int g, int b)
	{
		int color = 0;
		r = r << 8 * 2;
		g = g << 8 * 1;
		b = b << 8 * 0;
		color = r | g | b;
		genericText.setColor(color);
	}
	
	public static boolean drawText (String text, float x, float y, float width, float height)
	{
		genericText.setText(text);

		float newX = x * Camera.mainCamera.getGameObject().transform.scale.x;
		float newY = y * Camera.mainCamera.getGameObject().transform.scale.y;
		float newWidth = width * Camera.mainCamera.getGameObject().transform.scale.x;
		float newHeight = height * Camera.mainCamera.getGameObject().transform.scale.y;

		genericText.draw(newX, newY, 0, 0, Camera.mainCamera.getGameObject().transform.scale.x, Camera.mainCamera.getGameObject().transform.scale.y);

		if (Input.xPos >= newX-5 && Input.xPos <= newX + newWidth)
		{
			if (Input.yPos >= newY-5 && Input.yPos <= newY + newHeight)
			{
				return true;
			}
		}
		return false;
	} 
	
	public static void add(GameObject go)
	{
		go.onCreate();
		go.onStart();
		guiElements.add(go);
	}
		
	public static void draw()
	{
		/*
		for (int x = 0; x < guiElements.size(); x++)
		{
			TextAnimation ta = (TextAnimation)guiElements.get(x).getComponent(TextAnimation.class);			
			guiElements.get(x).draw();
		}

		for (int x = 0; x < guiElements.size(); x++)
		{
			guiElements.get(x).destroy();			
		}
		guiElements.clear();
		*/
	}
}
