// Auto-converted from com/spacecombat/game/DifficultyButton.java




 export class DifficultyButton extends Component
{
 difficulty = EASY;

 EASY = 1;
 MEDIUM = 2;
 HARD = 3;

 constructor(int difficulty)
	{
 this.difficulty = difficulty;
	}

 void update()
	{
 if (Input.xPos > this.gameObject.transform.position.x && Input.xPos < this.gameObject.transform.position.x + 100)
 {
 if (Input.yPos > this.gameObject.transform.position.y && Input.yPos < this.gameObject.transform.position.y + 32)
 {
 this.gameObject.destroyAfter(0.1f);
 if (difficulty == EASY)
 {
 PrefabFactory.setDifficulty(PrefabFactory.EASY);
 }
 if (difficulty == MEDIUM)
 {
 PrefabFactory.setDifficulty(PrefabFactory.MEDIUM);
 }
 if (difficulty == HARD)
 {
 PrefabFactory.setDifficulty(PrefabFactory.HARD);
 }
 LevelLoader.loadLevel("level1",true);
 }
 }
	}
}
