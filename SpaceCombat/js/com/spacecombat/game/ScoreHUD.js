// Auto-converted from com/spacecombat/game/ScoreHUD.java



 export class ScoreHUD extends Component
{
 nextUpdate = 1000;
 updateIncrement = 2500;
 updateIncrementIncrement = 1.1f;
 createPowerup = false;
 HealthController healthController;
 lastScore = 0;

 constructor (HealthController hc)
	{
 this.healthController = hc;
lastScore = 0;
	}

	display = "000000";
 void onGUI ()
	{
 if (PlayerData.score >= nextUpdate)
 {
 updateIncrement *= updateIncrementIncrement;
 nextUpdate += updateIncrement;
	createPowerup = true;
 }

 if (lastScore != PlayerData.score)
 {
 if (PlayerData.score < 10)
 display = "000000"+PlayerData.score;
 else if (PlayerData.score < 100)
 display = "00000"+PlayerData.score;
 else if (PlayerData.score < 1000)
 display = "0000"+PlayerData.score;
 else if (PlayerData.score < 10000)
 display = "000"+PlayerData.score;
 else if (PlayerData.score < 100000)
 display = "00"+PlayerData.score;
 else if (PlayerData.score < 1000000)
 display = "0"+PlayerData.score;
 else
 {
 display = "" + PlayerData.score;
 }
 }
 GUI.drawText(display, HUDConstants.scoreBoard.x, HUDConstants.scoreBoard.y, 100, 100);

lastScore = PlayerData.score;
	}

 void onAfterUpdate ()
	{
 if (healthController.health <= 0)
 {
 PlayerData.setScore(0);
 }

 if (createPowerup)
 {
 //GameObject.create(PrefabFactory.createPowerUp(new Vector2(Camera.mainCamera.gameObject.transform.position.x + 200, Camera.mainCamera.gameObject.transform.position.y), -1, true));
 }
createPowerup = false;
	}
}
