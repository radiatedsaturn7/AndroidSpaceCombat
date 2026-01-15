// Auto-converted from com/spacecombat/Camera.java


 export class Camera extends Component {
 mainCamera = null;
 screenSize = new Vector2(0,0);
 scale = new Vector2(1,1);

 static void setMainCamera ( Camera c)
	{
 Camera.mainCamera = c;
	}
}
