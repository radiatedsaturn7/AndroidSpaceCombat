package com.spacecombat.game;


import com.spacecombat.Component;
import com.spacecombat.GameObject;
import com.spacecombat.Input;
import com.spacecombat.Tags;
import com.spacecombat.Time;
import com.spacecombat.Util;

public class DifficultyButton extends Component
{
	public int difficulty = EASY;

	public static int EASY = 1;
	public static int MEDIUM = 2;
	public static int HARD = 3;

	public DifficultyButton(int difficulty)
	{
		this.difficulty = difficulty;
	}

	public void update()
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
