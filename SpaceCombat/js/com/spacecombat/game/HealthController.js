// Auto-converted from com/spacecombat/game/HealthController.java




 export class HealthController extends Component {
 int health;
 int maxHealth;
 dying = false;
 addedTag = false;
 Audio audio;

 powerUpTag = "PowerUp";

 constructor (Audio a)
	{
audio = a;
	}

 void destroy ()
	{
 if (audio != null)
 {
 audio.destroy();
 }
	}
 collide(whatIHit) {

 if (!whatIHit.hasTag(this.gameObject.getTags())) {
 let sc = (ShotCollision) whatIHit.getComponent(ShotCollision.class);

 if (sc != null)
 {
 this.health -= sc.getDamage();
 }

 if (this.health <= 0 && !this.dying)
 {
 if (audio != null)
 {
 audio.playOnce();
 }

 this.dying = true;
 this.gameObject.playAnimation("death");
 this.gameObject.destroyAfter(this.gameObject.getCurrentAnimation().getDuration());
 }
 }

 if (whatIHit.hasTag(Tags.powerup)) {
 let powerUp = (PowerUp) whatIHit.getComponent(PowerUp.class);

 if (powerUp != null && powerUp.type == 7)
 {
 this.health = this.maxHealth;
 }
 }
	}

 void onAfterUpdate ()
	{
 //shield recharger
 if (this.gameObject.getName().equals("player"))
 {
 this.health += 2 * Time.getDeltaTime();
 if (this.health > this.maxHealth)
 {
 this.health = this.maxHealth;
 }
 }

 if (this.dying && !this.addedTag)
 {
 if (this.gameObject.hasTag(Tags.enemy))
 {
 PlayerData.score += this.maxHealth;
 }
 this.gameObject.addTag(Tags.dying);
 this.addedTag = true;
 }
	}

 int getHealth ()
	{
 return health;
	}

 int getMaxHealth ()
	{
 return maxHealth;
	}

 setHealth(health) {
 this.health = health;
 this.maxHealth = health;
	}

 void setMaxHealth(int maxHealth)
	{
 this.maxHealth = maxHealth;
	}
}
