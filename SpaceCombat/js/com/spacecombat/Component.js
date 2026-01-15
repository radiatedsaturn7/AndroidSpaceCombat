// Auto-converted from com/spacecombat/Component.java


 export class Component {
 gameObject = null;
 isEnabled = true;
 isDrawable = false;

 GameObject getGameObject ()
	{
 return gameObject;
	}

 collide(g) {
	}

 destroy() {
 /*
if(null) {
 this.gameObject.removeComponent(this);
 }
 */
	}

 draw() {
	}

 onGUI() {
	}

 isEnabled() {
 return this.isEnabled;
	}

 onAfterUpdate() {
	}

 onCreate() {
	}

 onStart() {
	}

 onLevelLoading() {
	}

 onLevelLoaded() {
	}

 setEnabled(enabled) {
 this.isEnabled = enabled;
	}

 setGameObject(o) {
 this.gameObject = o;
	}

 update() {
	}
}
