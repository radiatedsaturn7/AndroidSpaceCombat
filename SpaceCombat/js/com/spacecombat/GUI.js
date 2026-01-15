// Auto-converted from com/spacecombat/GUI.java





 export class GUI {

 guiElements = new LinkedList<GameObject>();

 static boolean drawImage (GenericGraphic g, int x, int y, float width, float height)
	{
 temp = GameObject.getNew();
 temp.transform.position.x = x + Camera.mainCamera.gameObject.transform.position.x;
 temp.transform.position.y = y + Camera.mainCamera.gameObject.transform.position.y;
 a = new Animation();
 a.init("Idle", 0, 0, false,
 1, 32, 32);
 ga = new GraphicAnimation(g,a);
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


 genericText = new CanvasText();
 static void setDrawColor (int r, int g, int b)
	{
 color = 0;
r = r << 8 * 2;
g = g << 8 * 1;
b = b << 8 * 0;
color = r | g | b;
 genericText.setColor(color);
	}

 static boolean drawText (String text, float x, float y, float width, float height)
	{
 genericText.setText(text);

 newX = x * Camera.mainCamera.getGameObject().transform.scale.x;
 newY = y * Camera.mainCamera.getGameObject().transform.scale.y;
 newWidth = width * Camera.mainCamera.getGameObject().transform.scale.x;
 newHeight = height * Camera.mainCamera.getGameObject().transform.scale.y;

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

 static void add(GameObject go)
	{
 go.onCreate();
 go.onStart();
 guiElements.add(go);
	}

 static void draw()
	{
 /*
 for (int x = 0; x < guiElements.size(); x++)
 {
 ta = (TextAnimation)guiElements.get(x).getComponent(TextAnimation.class);
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
