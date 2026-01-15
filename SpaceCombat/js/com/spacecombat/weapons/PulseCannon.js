// Auto-converted from com/spacecombat/weapons/PulseCannon.java



 export class PulseCannon extends Weapon {

 name = "PulseCannon";
 damage = 45;
 reloadTime = 2.0f;
 shotSpeed = 0;
 life = .25f;
 accuracy = 0;
 magazineSize = 0;
 magazineReloadTime = 1;
 powerUpType = 3;

 spinny = new Vector2(0,-2048);

constructor(direction) {
 super(PulseCannon.name, PulseCannon.damage, PulseCannon.accuracy,
 PulseCannon.reloadTime, PulseCannon.magazineSize,
 PulseCannon.magazineReloadTime, PulseCannon.life,
 PulseCannon.shotSpeed, direction, false, powerUpType);
	}

 fire(position) {
 let draw = 4;
 let draw2 = 4;
 let count = 0;

 this.shotSpeedVector.x = 0;
 this.shotSpeedVector.y = -32;

 let originalPositionY = position.y;
 for (float y = this.gameObject.transform.position.y; y > Camera.mainCamera.gameObject.transform.position.y + 0; y-=32)
 {
 if (this.powerLevel > 2 * count && count >= 1 && draw > 0)
 {
 draw--;
 }
//
 count++;

 position.y -= 32;

 GameObject.create(PrefabFactory.createShot("pulse", position,
 this.shotSpeedVector, this.tags,
 this.baseDamage + (25 * (this.powerLevel-1)), draw, PulseCannon.life));

 }

 position.y = originalPositionY;
 otherCount = 0;

 if (this.powerLevel > 9)
 {
 nextPowerLevel = this.powerLevel - 9;
 yTemp = Util.randomNumber(0, 1)*180;

 for (float y = this.gameObject.transform.position.y; y > 0; y-=32)
 {
 yTemp += 16;

 if (nextPowerLevel > 2 * otherCount && otherCount >= 1 && draw2 > 0)
 {
 draw2--;
 }
 otherCount++;

 randX = (int)((Math.sin(Math.toRadians(yTemp)))*16.0f);

 position.x += randX;
 GameObject.create(PrefabFactory.createShot("pulse", position,
 PulseCannon.spinny, this.tags,
 this.baseDamage + (25 * (nextPowerLevel-1)), draw2, PulseCannon.life));
 position.x -= randX;
 position.y -= 32;
 }
 }
 return true;
	}
}
