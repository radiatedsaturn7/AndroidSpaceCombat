package com.spacecombat;

public class Camera extends Component {
	public static Camera mainCamera = null;
	public static Vector2 screenSize = new Vector2(0,0);
	public static Vector2 scale = new Vector2(1,1);
		
	public static void setMainCamera (final Camera c)
	{
		Camera.mainCamera = c;
	}
}
