// Auto-converted from com/spacecombat/weapons/MissileLauncher.java



 export class MissileLauncher extends Weapon {

 name = "missileLauncher";
 damage = 50;
 reloadTime = 3.0f;
 shotSpeed = 128;
 life = 5;
 accuracy = 32;
 magazineSize = 3;
 magazineReloadTime = 2;
 powerUpType = 5;

constructor(direction) {
 super(MissileLauncher.name, MissileLauncher.damage, MissileLauncher.accuracy, MissileLauncher.reloadTime,
 MissileLauncher.magazineSize, MissileLauncher.magazineReloadTime, MissileLauncher.life,
 MissileLauncher.shotSpeed, direction, false, powerUpType);
	}

 fire(position) {
 if (this.powerLevel >= 1 && this.powerLevel <= 2|| this.powerLevel >= 6)
 {
 GameObject.create(PrefabFactory.createShot("missile", position,
 this.shotSpeedVector, this.tags,
 this.baseDamage + (10 * (this.powerLevel-1)), this.powerLevel, MissileLauncher.life));
 }
 position.x += 16;
 position.y += 16;

 if (this.powerLevel >= 3)
 {
 GameObject.create(PrefabFactory.createShot("missile", position,
 this.shotSpeedVector, this.tags,
 this.baseDamage + (10 * (this.powerLevel-1)), this.powerLevel, MissileLauncher.life));

 position.x -= 32;
 GameObject.create(PrefabFactory.createShot("missile", position,
 this.shotSpeedVector, this.tags,
 this.baseDamage + (10 * (this.powerLevel-1)), this.powerLevel, MissileLauncher.life));
 }
 return true;
	}
}
