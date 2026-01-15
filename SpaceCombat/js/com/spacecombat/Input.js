// Auto-converted from com/spacecombat/Input.java



 export class Input {

 static float xPos;
 static float yPos;
 isMouseDown = false;

 static List<ClickListener> listeners;

 static fireOnClick() {
if(null) {
	let return;
 }

 for (int x = 0; x < Input.listeners.size(); x++) {
 Input.listeners.get(x).onClick(Input.xPos, Input.yPos);
 }
	}

 static void clear ()
	{
 listeners.clear();
	}
 static void setClickDown	( boolean b)
	{
 Input.isMouseDown = b;
	}

 static setX(x) {
 Input.xPos = x;
	}

 static setY(y) {
 Input.yPos = y;
	}

 static subscribeListener(l) {
if(null) {
 Input.listeners = new ArrayList<ClickListener>();
 }
 Input.listeners.add(l);
	}

 static void update ()
	{
 if (Input.isMouseDown)
 {
 Input.fireOnClick();
 }
	}

 static unsubscribeListener(l) {
 Input.listeners.remove(l);
	}
}
