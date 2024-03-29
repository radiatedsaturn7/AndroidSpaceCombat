package com.spacecombat.game;

import com.spacecombat.Camera;
import com.spacecombat.Component;
import com.spacecombat.GameObject;
import com.spacecombat.Time;

public class StopMovementOnCreate extends Component {

	public boolean started = false;
	public StopMovementOnCreate () 
	{
	}

	@Override
	public void  onCreate ()
	{
		if (!started)
		{
			started = true;
		}
		else
		{
			return;
		}
		
		PlayerFollower pf = (PlayerFollower) Camera.mainCamera.gameObject.getComponent(PlayerFollower.class);
		pf.setScrollSpeed(0);
		SimpleMovement sm = (SimpleMovement) Camera.mainCamera.gameObject.getComponent(SimpleMovement.class);
		sm.init(Camera.mainCamera.gameObject.getRigidBody(), 0, 0); 
		PlayerInput.setCameraScrollSpeed(0);
		
		//System.out.println("STOPPING SPEED!");
		//System.out.println("STOPPING SPEED!");
		//System.out.println("STOPPING SPEED!");
	}
}
