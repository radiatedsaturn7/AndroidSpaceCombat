// Auto-converted from com/spacecombat/weapons/FlameThrower.java



 export class FlameThrower extends Weapon {

 name = "FlameThrower";
 damage = 5;
 reloadTime = 0.1f;
 shotSpeed = 200;
 life = 1.0f;
 accuracy = 32;
 magazineSize = 3;
 magazineReloadTime = 0f;
 powerUpType = 2;

constructor(direction) {
 super(FlameThrower.name, FlameThrower.damage, FlameThrower.accuracy, FlameThrower.reloadTime, FlameThrower.magazineSize,
 FlameThrower.magazineReloadTime, FlameThrower.life,
 FlameThrower.shotSpeed, direction, false, powerUpType);
	}
	//
 fire(position) {
 GameObject.create(PrefabFactory.createShot("flame", position,
 this.shotSpeedVector, this.tags,
 this.baseDamage + (15 * this.powerLevel), 8-this.powerLevel, FlameThrower.life));
/*
 this.shotSpeedVector.y *= .5;
 GameObject.create(PrefabFactory.createShot("flame", position,
 this.shotSpeedVector, this.tags,
 this.baseDamage + (25 * this.powerLevel), 8-this.powerLevel, FlameThrower.life));
 this.shotSpeedVector.y *= 2;

 if (this.powerLevel > 9)
 {
 this.shotSpeedVector.y *= .5;
 let randX = Util.randomNumber(0, 64)-32;
 this.shotSpeedVector.x += randX;
 GameObject.create(PrefabFactory.createShot("flame", position,
 this.shotSpeedVector, this.tags,
 this.baseDamage + (25 * this.powerLevel), 8-this.powerLevel, FlameThrower.life));
 this.shotSpeedVector.x -= randX;
 this.shotSpeedVector.y *= 2;
 }

 */
 return true;
	}

 powerUp() {

 super.powerUp();

 if (this.powerLevel > 18)
 {
 return;//
 }

 if ((this.powerLevel - 3) % 5 == 0)
 {
 super.reloadTime -= 0.02f;
 }
 if ((this.powerLevel - 2) % 5 == 0)
 {
 super.magazineReloadTime -= 0.1f;
 }
 if ((this.powerLevel - 1) % 5 == 0)
 {
 super.shotSpeed += 25.0f;
 super.setShootDirection(this.shotSpeedVector);
 }
 if ((this.powerLevel - 4) % 5 == 0)
 {
 super.magazineSize++;
 }
 if ((this.powerLevel - 0) % 5 == 0)
 {
 super.accuracy -= 5;
 }
	}
}
