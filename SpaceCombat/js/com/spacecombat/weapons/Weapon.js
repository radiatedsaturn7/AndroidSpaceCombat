// Auto-converted from com/spacecombat/weapons/Weapon.java



 export class Weapon extends Component {
 float baseDamage;
 int powerLevel;
 int maxPowerLevel;
 float reloadTime;
 float nextShotTime;
 String name;
 float shotSpeed;
 float life;
 Vector2 shotSpeedVector;
 float accuracy;
 usePhysics = false;
 int magazineSize;
 int shots;
 float magazineReloadTime;
 tags = 0;
 useMagazine = true;
 Vector2 shotPosition;
 powerUpType = -1;
 Audio audio;
 offset = new Vector2(0,0);
 shotDelay = 0;
 hasDelayed = false;

 constructor( String name, float damage, float accuracy,
 float reloadTime, int magazineSize,
 float magazineReloadTime, float life,
 float shotSpeed, Vector2 shootDirection,
 boolean usePhysics, int powerUpType) {
 this.name = name;
 this.baseDamage = damage;
 this.nextShotTime = 0;
 this.powerLevel = 1;
 this.maxPowerLevel = 9;
 this.reloadTime = reloadTime;
 this.accuracy = accuracy;
 this.shotSpeed = shotSpeed;
 this.life = life;
 this.usePhysics = usePhysics;
 this.shots = 0;
 this.magazineSize = magazineSize;
 this.magazineReloadTime = magazineReloadTime;
 this.powerUpType = powerUpType;
 this.shotPosition = new Vector2(0.0f,0.0f);
 this.shotDelay = 0;
 setShootDirection(shootDirection);
	}

 void onStart()
	{
 this.nextShotTime = Time.getTime() + this.shotDelay;
	}

 void setOffset(int x, int y)
	{
 this.offset.x = x;
 this.offset.y = y;
	}

 Vector2 getOffset()
	{
 return this.offset;
	}

 void setShots(int shots)
	{
 this.shots = shots;
	}

 boolean canShoot()
	{
 if (Time.getTime() > this.nextShotTime && powerLevel >= 1)
 return true;
 return false;
	}

 void setShotDelay(float time)
	{
 this.shotDelay = time;
	}

 boolean fire(Vector2 position);

 getShotDirection() {
 return this.shotSpeedVector;
	}

 powerUp() {
 this.powerLevel++;
	}

 setShootDirection(v) {
 v.normalize();

if(null) {
 this.shotSpeedVector = new Vector2();
 }

 this.shotSpeedVector.x = v.x * this.shotSpeed;
 this.shotSpeedVector.y = v.y * this.shotSpeed;
	}

 void setUseMagazine ( boolean use)
	{
 this.useMagazine = use;
	}

 shoot() {

 if (!canShoot()) {
	let return;
 }

 if (this.gameObject == null)
 {
 return;
 }


 if (this.tags == 0)
 {
 this.tags = this.gameObject.getTags() | Tags.node | Tags.shot;
 }

 this.shots++;

if(this.magazineSize) {
 if (this.useMagazine)
 {
 this.nextShotTime = Time.getTime() + this.magazineReloadTime;
 }
 else
 {
 this.nextShotTime = Time.getTime() + this.reloadTime;
 }
 this.shots = 0;
 } else {
 this.nextShotTime = Time.getTime() + this.reloadTime;
 }

 if (this.usePhysics && this.gameObject.getRigidBody() != null) {
 this.shotSpeedVector.x += this.gameObject.getRigidBody().speed.x;
 this.shotSpeedVector.y += this.gameObject.getRigidBody().speed.y;
 }

 randomX = Util.randomNumber(0, this.accuracy);
 randomY = Util.randomNumber(0, this.accuracy);

 upDown = Util.randomNumber(0, 1);
 leftRight = Util.randomNumber(0, 1);

if(1) {
	let randomY = -randomY;
 }
if(1) {
	let randomX = -randomX;
 }

 this.shotSpeedVector.x += randomX;
 this.shotSpeedVector.y += randomY;

 this.shotPosition.x = this.gameObject.transform.position.x;
 this.shotPosition.y = this.gameObject.transform.position.y;

 this.shotPosition.x += offset.x;
 this.shotPosition.y += offset.y;

 if (fire(this.shotPosition))
 {
 if (audio != null)
 {
 audio.playOnce();
 }
 }

 this.shotSpeedVector.x -= randomX;
 this.shotSpeedVector.y -= randomY;

 if (this.usePhysics && this.gameObject.getRigidBody() != null) {
 this.shotSpeedVector.x -= this.gameObject.getRigidBody().speed.x;
 this.shotSpeedVector.y -= this.gameObject.getRigidBody().speed.y;
 }
	}

 int getPowerUpType ()
	{
 return powerUpType;
	}

 int getPowerLevel()
	{
 return powerLevel;
	}

 void setPowerLevel (int pl)
	{
powerLevel = pl;
	}

 addAudio(sound) {
let audio = sound;
	}

 void destroy ()
	{
 if (audio != null)
 {
 audio.destroy();
 }
	}
}
