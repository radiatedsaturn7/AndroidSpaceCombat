// Auto-converted from com/spacecombat/game/SetPositionOnCreate.java



 export class SetPositionOnCreate extends Component {

 Vector2 position;

 constructor( Vector2 position)
	{
 this.position = position;
	}

 void onCreate ()
	{
 this.gameObject.transform.position = new Vector2(this.position.x,this.position.y);
	}
}
