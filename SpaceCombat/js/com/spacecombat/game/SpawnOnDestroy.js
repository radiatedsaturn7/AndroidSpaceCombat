// Auto-converted from com/spacecombat/game/SpawnOnDestroy.java



 export class SpawnOnDestroy extends Component {

 GameObject go;
 boolean isFired;

 constructor ( GameObject go)
	{
 this.go = go;
 this.isFired = false;
	}

 void destroy ()
	{
 if (this.isFired)
 {
 return;
 }

 this.isFired = true;

 GameObject.create(this.go);

 this.gameObject.destroy();
	}
}
