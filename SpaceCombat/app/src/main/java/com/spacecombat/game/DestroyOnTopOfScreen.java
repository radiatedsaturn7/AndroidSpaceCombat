package com.spacecombat.game;

import com.spacecombat.Camera;
import com.spacecombat.Component;

public class DestroyOnTopOfScreen extends Component {
	
	private float height = 0;

	public DestroyOnTopOfScreen()
	{
		this.height = 32;
	}
	
	public DestroyOnTopOfScreen(float height)
	{
		this.height = height;
	}
	public void update() {
		if (this.gameObject.transform.position.y + this.height < Camera.mainCamera.gameObject.transform.position.y + 0 - 32) {
			this.gameObject.destroy();
		}
	}
}
