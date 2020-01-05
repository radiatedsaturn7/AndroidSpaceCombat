package com.spacecombat;

public class Component {
	public GameObject gameObject = null;
	public boolean isEnabled = true;
	public boolean isDrawable = false;
	
	public GameObject getGameObject ()
	{
		return gameObject;
	}

	public void collide(final GameObject g) {
	}

	public void destroy() {
		/*
		if (this.gameObject != null) {
			this.gameObject.removeComponent(this);
		}
		*/
	}

	public void draw() {
	}
	
	public void onGUI() {
	}

	public boolean isEnabled() {
		return this.isEnabled;
	}

	public void onAfterUpdate() {
	}

	public void onCreate() {
	}

	public void onStart() {
	}

	public void onLevelLoading () {
	}

	public void onLevelLoaded () {
	}

	public void setEnabled(final boolean enabled) {
		this.isEnabled = enabled;
	}

	public void setGameObject(final GameObject o) {
		this.gameObject = o;
	}

	public void update() {
	}
}
