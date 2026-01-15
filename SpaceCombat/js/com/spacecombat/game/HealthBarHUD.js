// Auto-converted from com/spacecombat/game/HealthBarHUD.java



 export class HealthBarHUD extends Component
{
 HealthController healthController;

 lastHealth = 0;
 maxHealth = 0;
	/*
 timeToPlay = 0.5f;
 lastTime = 0.0f;
 createGameOver = false;
	*/
 constructor (HealthController healthController)
	{
 this.healthController = healthController;
maxHealth = healthController.maxHealth;
lastHealth = maxHealth;
	}


 hasPlayedAnimation = false;
 void update ()
	{
 health = healthController.health;

 if (lastHealth != health && (health < lastHealth || health == maxHealth))
 {
 value = ((float)health) / ((float)maxHealth);
 value *= 10;
 floor = (int) Math.floor(value);
 floor *= 10;
 percentage = floor;
 gameObject.playAnimation(percentage+"%");

 //lastTime = Time.getTime();
 }
 else if (!hasPlayedAnimation)
 {
 gameObject.playAnimation("100%");
	hasPlayedAnimation = true;
 }

lastHealth = healthController.health;
	}
}
