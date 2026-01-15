// Auto-converted from com/spacecombat/weapons/ChargeLaser.java



 export class ChargeLaser extends Weapon {

 name = "laser";
 damage = 100;
 reloadTime = .1f;
 shotSpeed = 256;
 life = 5;
 accuracy = 0;
 magazineSize = 3;
 magazineReloadTime = .01f;
 powerUpType = 6;
 baseChargeTime = 2.0f;

 chargeRate = 1;
 float lastShot;

constructor(direction) {
 super(ChargeLaser.name, ChargeLaser.damage, ChargeLaser.accuracy, ChargeLaser.reloadTime,
 ChargeLaser.magazineSize, ChargeLaser.magazineReloadTime, ChargeLaser.life,
 ChargeLaser.shotSpeed, direction, false, powerUpType);
	}

 fire(position) {
 let fired = false;
 let charge = getCharge();

 let tempPowerLevel = powerLevel;
 let isOdd = false;
 if (Math.abs(powerLevel) % 2 == 1)
 {
	let tempPowerLevel = powerLevel - 1;
	let isOdd = true;
 }

 tempPowerLevel /= 2;
 position.x -= 32 * tempPowerLevel;
 if (!isOdd)
 position.x += 16;

 workingPowerLevel = getMaxCharge();
 adding = false;
 firstAdd = true;

 //System.out.println("CHARGE SHOT");

 for (int x = 0; x < powerLevel; x++)
 {
 if (adding)
 {
 if (!isOdd && firstAdd)
 {
 //this makes it zero next time around
 workingPowerLevel = -1;
 firstAdd = false;
 }
 workingPowerLevel++;
 }
 else
 {
 workingPowerLevel--;
 if (workingPowerLevel == 0)
 {
 adding = true;
 }
 }

 //System.out.println(workingPowerLevel);
 if (charge >= baseChargeTime + workingPowerLevel)
 {
 fired = true;
 GameObject.create(PrefabFactory.createShot("chargeLaser", position,
 this.shotSpeedVector, this.tags,
 this.baseDamage + (10 * (this.powerLevel-1)), this.powerLevel, ChargeLaser.life));

 }
 position.x += 32;
 }
lastShot = Time.getTime();
 return fired;
	}

 void powerUp()
	{
 super.powerUp();
 //this.chargeRate += .1;
	}

 float getCharge ()
	{
 charge = 0;
 time = Time.getTime() - lastShot;
charge = chargeRate * time;
 return charge;
	}

 int getMaxCharge ()
	{
 isOdd = false;
 if (Math.abs(powerLevel) % 2 == 1)
 {
	isOdd = true;
 }

 workingPowerLevel = (int) Math.floor(((float)powerLevel)/2.0f);
if(isOdd) {
 workingPowerLevel += 1;
 }
 return workingPowerLevel;
	}

 float getChargePercentage()
	{
 percentage = 0.0f;
percentage = getCharge() / (((float) baseChargeTime) + ((float)getMaxCharge())-1);

 //System.out.println("CHARGE PERCENTAGE:");
 //System.out.println(percentage + " = " + getCharge() + " / (" + baseChargeTime + " + " + getMaxCharge() + ")");

 if (percentage > 1)
	percentage = 1;
 return percentage;
	}
}
