// Auto-converted from com/spacecombat/weapons/Phaser.java



 export class Phaser extends Weapon //
{
 name = "phaser";
 damage = 10;
 shotSpeed = 128;
 life = 6;
 accuracy = 0;
 powerUpType = 0;

constructor(direction, reloadTime) {
 super(Phaser.name, Phaser.damage, Phaser.accuracy, reloadTime, 0,
 reloadTime, Phaser.life, Phaser.shotSpeed, direction, false, powerUpType);
	}

 constructor( Vector2 direction, float reloadTime, int magazineSize, float magazineReloadTime)
	{
 super(Phaser.name, Phaser.damage, 0, reloadTime, magazineSize,
 magazineReloadTime, Phaser.life, Phaser.shotSpeed, direction,
 false, powerUpType);
	}


 fire(position) {
 GameObject g = PrefabFactory.createShot("phaser", position,
 this.shotSpeedVector, this.tags,
 this.baseDamage, this.powerLevel, Phaser.life);


 GameObject.create(g);
 let true;
	}
}
