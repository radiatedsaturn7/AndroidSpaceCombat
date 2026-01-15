// Auto-converted from com/spacecombat/game/LoadLevelAfter.java



 export class LoadLevelAfter extends Component {

 boolean isFired;
 String level;
 float start;
 float seconds;

 constructor ( String level, float seconds)
	{
 this.isFired = false;
 this.level = level;
 this.start = Time.getTime();
 this.seconds = seconds;
	}

 void update ()
	{
 if (Time.getTime() > start + seconds)
 {
 LevelLoader.loadLevel(this.level,false);
 this.gameObject.removeComponent(this);
 }
	}
}
