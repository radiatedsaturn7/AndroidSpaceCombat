// Auto-converted from com/spacecombat/game/StopMovementOnCreate.java



 export class StopMovementOnCreate extends Component {

 started = false;
 constructor ()
	{
	}

 void onCreate ()
	{
 if (!started)
 {
	started = true;
 }
 else
 {
 return;
 }

 pf = (PlayerFollower) Camera.mainCamera.gameObject.getComponent(PlayerFollower.class);
 pf.setScrollSpeed(0);
 sm = (SimpleMovement) Camera.mainCamera.gameObject.getComponent(SimpleMovement.class);
 sm.init(Camera.mainCamera.gameObject.getRigidBody(), 0, 0);
 PlayerInput.setCameraScrollSpeed(0);

 //System.out.println("STOPPING SPEED!");
 //System.out.println("STOPPING SPEED!");
 //System.out.println("STOPPING SPEED!");
	}
}
