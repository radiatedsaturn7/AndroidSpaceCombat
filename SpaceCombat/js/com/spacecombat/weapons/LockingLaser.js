// Auto-converted from com/spacecombat/weapons/LockingLaser.java



 export class LockingLaser extends Weapon
{
 name = "lockinglaser";
 damage = 33;
 reloadTime = .05f;
 magazineReloadTime = 1;
 shotSpeed = 256;
 life = 5;
 accuracy = 0;
 magazineSize = 1;
 powerUpType = 4;

constructor(direction) {
 super(LockingLaser.name, LockingLaser.damage, LockingLaser.accuracy, LockingLaser.reloadTime, LockingLaser.magazineSize,
 LockingLaser.magazineReloadTime, LockingLaser.life, LockingLaser.shotSpeed, direction, false, powerUpType);
	}

 fire(position) {
 GameObject.create(PrefabFactory.createShot("lockingLaser", position,
 this.shotSpeedVector, this.tags,
 this.baseDamage, this.powerLevel, LockingLaser.life));
 let true;
	}

 powerUp() {
 super.powerUp();

 super.magazineSize = this.powerLevel-1;
	}
}
