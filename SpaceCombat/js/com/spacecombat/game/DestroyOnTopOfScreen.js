// Auto-converted from com/spacecombat/game/DestroyOnTopOfScreen.java



 export class DestroyOnTopOfScreen extends Component {

 height = 0;

 constructor()
	{
 this.height = 32;
	}

 constructor(float height)
	{
 this.height = height;
	}
 update() {
if(32) {
 this.gameObject.destroy();
 }
	}
}
