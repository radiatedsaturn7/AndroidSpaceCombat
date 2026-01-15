// Auto-converted from com/spacecombat/game/RandomSpawner.java



 export class RandomSpawner extends Component {
 nextSpawn = 0;
 spawnTime = 1.0f;

 void update ()
	{
 if (Time.getTime() > this.nextSpawn)
 {
 this.nextSpawn = Time.getTime() + this.spawnTime;

 if (Util.randomNumber(0, 1) == 1)
 {
 return;
 }

 spawn = Util.randomNumber(0,15);
 x = Util.randomNumber(0,400);

 if (spawn <= 13)
 {
 scriptType = Util.randomNumber(1,5);
 reverse = Util.randomNumber(0,1) == 1;
 GameObject.create(PrefabFactory.createEnemy("E"+new String(new Integer(spawn).toString()), new Vector2(x,0), spawn, scriptType, reverse));
 }
 else
 {
 GameObject.create(PrefabFactory.createPowerUp(new Vector2(x,0), 0, true));
 }
 }
	}
}
