// Auto-converted from com/spacecombat/ai/AIPlayerStartLevel.java



 export class AIPlayerStartLevel extends Component {

 playerInput = null;
 hc = null;
 moveTime = 6;
 moveSpeed = -100;
 totalTime = 0;
 delayTime = 10;
 startTimes = 0;
 started = false;

 constructor (PlayerInput pi, HealthController hc)
	{
 this.playerInput = pi;
 this.hc = hc;
	}

 void update ()
	{
 if (!started)
 {
 playerInput.setEnabled(false);
 //do this so the player ends up where we want
 gameObject.transform.position.y -= moveSpeed * moveTime;

	started = true;
 }

 if (startTimes == 0)
 {
 totalTime += Time.getDeltaTime();
 if (totalTime > delayTime)
 {
 totalTime = 0;
 startTimes++;
 }
 }

 if (startTimes >= 1 && totalTime < moveTime)
 {
 gameObject.getRigidBody().speed.y = moveSpeed;
 //player is invincible while he can't control ship
 hc.setHealth(hc.getMaxHealth());
 totalTime += Time.getDeltaTime();
 }
 else if (startTimes >= 1 && totalTime >= moveTime)
 {
 gameObject.getRigidBody().speed.y = 0;
 playerInput.setEnabled(true);
 gameObject.removeComponent(this);
 }
	}
}
