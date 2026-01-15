// Auto-converted from com/spacecombat/game/SpawnOnCollision.java



 export class SpawnOnCollision extends Component {

 GameObject go;
 isFired = false;

 constructor ( GameObject go)
	{
 this.go = go;
 this.isFired = false;
	}

 void collide ( GameObject whatIHit)
	{
 if (whatIHit.getName().equals("TopOfScreen"))
 {
 if (this.isFired)
 {
 return;
 }
 this.isFired = true;

 //System.out.println("FIRING:"+go.getName() + " " + Tags.tagToString(this.go.getTags()));
 GameObject.create(this.go);
 this.gameObject.destroy();
 }
	}
}
