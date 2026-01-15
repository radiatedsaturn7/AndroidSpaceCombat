// Auto-converted from com/spacecombat/ai/AIPlayerEndLevel.java



 export class AIPlayerEndLevel extends Component {

 playerInput = null;
 hc = null;
 BoxCollider c;
 moveSpeed = -100;
 totalTime = 0;
 nextLevel = "";

 constructor (PlayerInput pi, HealthController hc, BoxCollider boxCollider, String nextLevel)
	{
 this.playerInput = pi;
 this.hc = hc;
 this.nextLevel = nextLevel;
 this.c = boxCollider;
 playerInput.setEnabled(false);
	}

 void update ()
	{
 if (gameObject.transform.position.y + c.size.y > Camera.mainCamera.gameObject.transform.position.y)
 {
 //System.out.println("POSITION:"+gameObject.transform.position.y + " / " + Camera.mainCamera.gameObject.transform.position.y);
 gameObject.getRigidBody().speed.y = moveSpeed;
 //player is invincible while he can't control ship
 hc.setHealth(hc.getMaxHealth());
 totalTime += Time.getDeltaTime();
 }
 else
 {
 gameObject.transform.position.y = 800;
 gameObject.removeComponent(this);
 LevelLoader.loadLevel(nextLevel, false);
 gameObject.addComponent(new AIPlayerStartLevel(playerInput,hc));
 }
	}
}
