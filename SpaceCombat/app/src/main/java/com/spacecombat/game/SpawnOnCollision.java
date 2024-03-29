package com.spacecombat.game;

import com.spacecombat.Component;
import com.spacecombat.GameObject;
import com.spacecombat.Tags;

public class SpawnOnCollision extends Component {

	private final GameObject go;
	private boolean isFired = false;

	public SpawnOnCollision (final GameObject go) 
	{
		this.go = go;
		this.isFired = false;
	}

	@Override
	public void  collide (final GameObject whatIHit)
	{
		if (whatIHit.getName().equals("TopOfScreen"))
		{
			if (this.isFired)
			{
				return;
			}
			this.isFired = true;

			//System.out.println("FIRING:"+go.getName() + " " + Tags.tagToString(this.go.getTags()));
			GameObject.create(this.go);			
			this.gameObject.destroy();
		}
	}
}
