// Auto-converted from com/spacecombat/game/LoadLevelOnCollision.java



 export class LoadLevelOnCollision extends Component {

 boolean isFired;
 String level;

 constructor ( String level)
	{
 this.isFired = false;
 this.level = level;
	}

 void collide ( GameObject whatIHit)
	{
 if (whatIHit.getName().equals("TopOfScreen"))
 {
 if (this.isFired)
 {
 return;
 }
 this.isFired = true;

 player = GameObject.findByName("player");
 if (player == null)
 {

 }
 pi = (PlayerInput)player.getComponent(PlayerInput.class);
 hc = (HealthController)player.getComponent(HealthController.class);
 bc = (BoxCollider)player.getRigidBody().getCollider();
 player.addComponent(new AIPlayerEndLevel(pi, hc, bc, level));
 //LevelLoader.loadLevel(this.level,false);
 }
	}
}
