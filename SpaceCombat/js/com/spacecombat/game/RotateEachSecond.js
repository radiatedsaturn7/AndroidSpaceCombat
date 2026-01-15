// Auto-converted from com/spacecombat/game/RotateEachSecond.java



 export class RotateEachSecond extends Component {
 float degreesPerSec;

 constructor (float degreesPerSec)
	{
 this.degreesPerSec = degreesPerSec;
	}

 update() {
 this.gameObject.transform.rotation.x += degreesPerSec * Time.getDeltaTime();
	}
}
