// Auto-converted from com/spacecombat/game/DestroyOnCreate.java



 export class DestroyOnCreate extends Component {
 float destroyAfter;
 constructor ( float l)
	{
 this.destroyAfter = l;
	}

 void onCreate ()
	{
 this.gameObject.destroyAfter(this.destroyAfter);
	}
}
