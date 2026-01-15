// Auto-converted from com/spacecombat/game/MainMenuHUD.java



 export class MainMenuHUD extends Component
{
 constructor ()
	{
	}

 void onGUI()
	{
 GUI.setDrawColor(255, 0, 0);
 GUI.drawText("Select Difficulty", 220, 400, 20, 20);

 GUI.drawText(Input.xPos +"," + Input.yPos,10,10,50,40);

 if (GUI.drawText("Easy", 220, 420, 20, 20))
 {
 PrefabFactory.setDifficulty(PrefabFactory.EASY);
 LevelLoader.loadLevel("level1",true);
 }
 else if (GUI.drawText("Medium", 220, 480, 20, 20))
 {
 PrefabFactory.setDifficulty(PrefabFactory.MEDIUM);
 LevelLoader.loadLevel("level1",true);
 }
 else if (GUI.drawText("Hard", 220, 520, 20, 20))
 {
 PrefabFactory.setDifficulty(PrefabFactory.HARD);
 LevelLoader.loadLevel("level1",true);
 }
 GUI.setDrawColor(0, 0, 0);
	}
}
