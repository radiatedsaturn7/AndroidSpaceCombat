// Auto-converted from com/spacecombat/game/LoadLevelOnDestroy.java



 export class LoadLevelOnDestroy extends Component {

 String level;

 constructor ( String level)
	{
 this.level = level;
	}

	fired = false;
 void destroy ()
	{
 if (!fired)
 {
	fired = true;
 /*
 lloc = new LoadLevelAfter(level,5);
 // FixedJoint fj = new FixedJoint(level);

 spawner = new GameObject();
 r = new RigidBody();
 c = new BoxCollider(new Vector2(800,64));
 r.setCollider(c);
 spawner.setRigidBody(r);
 spawner.transform.position.x = this.gameObject.transform.position.x;
 spawner.transform.position.y = this.gameObject.transform.position.y-32;
 spawner.addComponent(lloc);
 GameObject.create(spawner);
 */
 player = GameObject.findByName("player");
 pi = (PlayerInput)player.getComponent(PlayerInput.class);
 hc = (HealthController)player.getComponent(HealthController.class);
 bc = (BoxCollider)player.getRigidBody().getCollider();
 player.addComponent(new AIPlayerEndLevel(pi, hc, bc, level));
 //LevelLoader.loadLevel(this.level,false);
 }
	}
}
