// Auto-converted from com/spacecombat/weapons/MachineGun.java



 export class MachineGun extends Weapon {

 name = "MachineGun";
 damage = 20;
 reloadTime = 0.2f;
 shotSpeed = 256;
 life = 5;
 accuracy = 40;
 magazineSize = 5;
 magazineReloadTime = 1;
 powerUpType = 1;

constructor(direction) {
 super(MachineGun.name, MachineGun.damage, MachineGun.accuracy,
 MachineGun.reloadTime, MachineGun.magazineSize,
 MachineGun.magazineReloadTime, MachineGun.life,
 MachineGun.shotSpeed, direction, false, powerUpType);
	}

 fire(position) {

 GameObject.create(PrefabFactory.createShot("bullet", position,
 this.shotSpeedVector, this.tags,
 this.baseDamage + (7.5f * (this.powerLevel-1)), this.powerLevel, MachineGun.life));
/*
 if (this.powerLevel > 5)
 {
 let nextPowerLevel = this.powerLevel - 5;
 this.shotSpeedVector.x -= 20;
 GameObject.create(PrefabFactory.createShot("bullet", position,
 this.shotSpeedVector, this.tags,
 this.baseDamage + (7.5f * (nextPowerLevel-1)), nextPowerLevel, MachineGun.life));
 this.shotSpeedVector.x += 40;
 GameObject.create(PrefabFactory.createShot("bullet", position,
 this.shotSpeedVector, this.tags,
 this.baseDamage + (7.5f * (nextPowerLevel-1)), nextPowerLevel, MachineGun.life));
 this.shotSpeedVector.x -= 20;
 }

 if (this.powerLevel > 9)
 {
 nextPowerLevel = this.powerLevel - 9;
 this.shotSpeedVector.x -= 60;
 GameObject.create(PrefabFactory.createShot("bullet", position,
 this.shotSpeedVector, this.tags,
 this.baseDamage + (7.5f * (nextPowerLevel-1)), nextPowerLevel, MachineGun.life));
 this.shotSpeedVector.x += 120;
 GameObject.create(PrefabFactory.createShot("bullet", position,
 this.shotSpeedVector, this.tags,
 this.baseDamage + (7.5f * (nextPowerLevel-1)), nextPowerLevel, MachineGun.life));
 this.shotSpeedVector.x -= 60;
 }
 */
 return true;
	}
}
