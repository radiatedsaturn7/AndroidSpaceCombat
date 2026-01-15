// Auto-converted from com/spacecombat/game/ChargeLaserHUD.java



 export class ChargeLaserHUD extends Component {

 chargeLaser = null;
 lastCharge = 0;
constructor(cl) {
let chargeLaser = cl;
	}

 hasPlayedAnimation = false;

 void update ()
	{
 charge = chargeLaser.getCharge();


 if (lastCharge != charge)
 {
 value = chargeLaser.getChargePercentage();
 value *= 10;

 //System.out.println("CHARGE="+value);

 floor = (int) Math.floor(value);
 floor *= 10;
 percentage = floor;
 gameObject.playAnimation(percentage+"%");

 //lastTime = Time.getTime();
 }
 else if (!hasPlayedAnimation)
 {
 gameObject.playAnimation("0%");
	hasPlayedAnimation = true;
 }

lastCharge = charge;
	}

}
