// Auto-converted from com/spacecombat/game/PowerUp.java




 export class PowerUp extends Component
{
 nextChange = 0.0f;
 changeTime = 2.0f;
 canChange = true;

 isUsed =false;

 movementTime = 2.0f;
 nextMovementChange = 0.0f;

 type = -1;
 minType = 0;
 maxTypes = 7; //0 based

 SimpleMovement sm;

 destroyMe = false;

 constructor ( SimpleMovement sm, int type, boolean canChange)
	{
 //System.out.println("TYPE:"+type);

 if (type < 0)
 {
 this.type = Util.randomNumber(0, maxTypes);
 //System.out.println("max:"+maxTypes);
 //System.out.println("TYPE:"+this.type);
 }
 else
 {
 this.type = type;
 }

 if (type == 8)
 {
 this.minType = 8;
 this.maxTypes = 8;
	canChange = false;
 }
 if (type == 9)
 {
 this.minType = 9;
 this.maxTypes = 9;
	canChange = false;
 }
 if (type == 10)
 {
 this.minType = 10;
 this.maxTypes = 10;
	canChange = false;
 }

 if (type == 11)
 {
 this.minType = 0;
 this.maxTypes = 3;
 this.type = Util.randomNumber(this.minType, maxTypes);
 }
 if (type == 12)
 {
 this.minType = 4;
 this.maxTypes = 5;
 this.type = Util.randomNumber(this.minType, maxTypes);
 }
 if (type == 13)
 {
 this.minType = 0;
 this.maxTypes = 6;
 this.type = Util.randomNumber(this.minType, maxTypes);
 }


 //System.out.println("TYPE:"+this.type);

 this.sm = sm;
 this.canChange = canChange;

 if (Util.randomNumber(0, 1) == 1)
 {
 sm.setSpeed(-sm.getSpeedX(), sm.getSpeedY());
 }
	}

 void change ()
	{
 this.nextChange = Time.getTime() + this.changeTime;
 this.type++;

 if (this.type > this.maxTypes)
 {
 this.type = this.minType;
 }

 if (this.type == 0)
 {
 this.gameObject.playAnimation("Laser");
 }
 if (this.type == 1)
 {
 this.gameObject.playAnimation("MachineGun");
 }
 if (this.type == 2)
 {
 this.gameObject.playAnimation("FlameThrower");
 }
 if (this.type == 3)
 {
 this.gameObject.playAnimation("PulseCannon");
 }
 if (this.type == 4)
 {
 this.gameObject.playAnimation("LockingLaser");
 }
 if (this.type == 5)
 {
 this.gameObject.playAnimation("MissileLauncher");
 }
 if (this.type == 6)
 {
 this.gameObject.playAnimation("ChargeLaser");
 }
 if (this.type == 7)
 {
 this.gameObject.playAnimation("Health");
 }
 if (this.type == 8)
 {
 this.gameObject.playAnimation("Ally");
 }
 if (this.type == 9)
 {
 this.gameObject.playAnimation("Support");
 }
 if (this.type == 10)
 {
 this.gameObject.playAnimation("GunShip");
 }
	}

 void collide ( GameObject whatIHit)
	{
 if (whatIHit.hasTag(Tags.player) && !whatIHit.hasTag(Tags.shot))
 {
 this.destroyMe = true;
 }
	}

 int getType ()
	{
 return this.type;
	}

 void setType (int type)
	{
 if (type < 0)
 {
 this.type = Util.randomNumber(0, maxTypes);
 //System.out.println("max:"+maxTypes);
 //System.out.println("TYPE:"+this.type);
 }
 else
 {
 this.type = type;
 }

 this.type--;
 change();

	}

 void onAfterUpdate ()
	{
 if (this.destroyMe)
 {
 this.gameObject.destroy();
 }
	}

 void update ()
	{
 if (this.canChange && Time.getTime() > this.nextChange)
 {
 change();
 }

 if (Time.getTime() > this.nextMovementChange)
 {
 this.nextMovementChange = Time.getTime() + this.movementTime;

 this.sm.setSpeed(-this.sm.getSpeedX(), this.sm.getSpeedY());
 }
	}
}
