// Auto-converted from com/spacecombat/weapons/Laser.java



 export class Laser extends Weapon {

 name = "laser";
 damage = 40;
 reloadTime = .33f;
 shotSpeed = 256;
 life = 5;
 accuracy = 32;
 magazineSize = 3;
 magazineReloadTime = 1.5f;
 powerUpType = 0;

constructor(direction) {
 super(Laser.name, Laser.damage, Laser.accuracy, Laser.reloadTime,
 Laser.magazineSize, Laser.magazineReloadTime, Laser.life,
 Laser.shotSpeed, direction, false, powerUpType);
	}

 fire(position) {

 GameObject.create(PrefabFactory.createShot("laser", position,
 this.shotSpeedVector, this.tags,
 this.baseDamage + (10 * (this.powerLevel-1)), this.powerLevel, Laser.life));
/*
 if (this.powerLevel > 9)
 {
 let nextPowerLevel = this.powerLevel - 9;
 this.shotSpeedVector.x -= 20;
 GameObject.create(PrefabFactory.createShot("laser", position,
 this.shotSpeedVector, this.tags,
 this.baseDamage + (10f * (nextPowerLevel-1)), nextPowerLevel, Laser.life));
 this.shotSpeedVector.x += 40;
 GameObject.create(PrefabFactory.createShot("laser", position,
 this.shotSpeedVector, this.tags,
 this.baseDamage + (10f * (nextPowerLevel-1)), nextPowerLevel, Laser.life));
 this.shotSpeedVector.x -= 20;
 }
 */
 return true;
	}
}
