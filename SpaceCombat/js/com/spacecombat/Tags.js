// Auto-converted from com/spacecombat/Tags.java


 export class Tags {

 static boolean compareTagsAnd (int value, int compareValue)
	{
 return (value & compareValue) == compareValue;
	}

 static boolean compareTagsOr (int value, int compareValue)
	{
 return (value & compareValue) > 0;
	}

 int createTag (int ... values)
	{
 temp = 0;
 for (int x = 0; x < values.length; x++)
 {
	temp = temp | values[x];
 }
 return temp;
	}

 static void printAllTags()
	{
 s = "";
 s += "Player :" + Integer.toBinaryString(player);
 s += "\n";
 s += "Enemy :" + Integer.toBinaryString(enemy);
 s += "\n";
 s += "Shot :" + Integer.toBinaryString(shot);
 s += "\n";
 s += "PowerUp :" + Integer.toBinaryString(powerup);
 s += "\n";
 s += "Node :" + Integer.toBinaryString(node);
 s += "\n";
 s += "TopOfScreen:" + Integer.toBinaryString(topOfScreen);
 s += "\n";
 s += "Dying :" + Integer.toBinaryString(dying);
 s += "\n";
 s += "Camera :" + Integer.toBinaryString(camera);
 s += "\n";
 s += "Ally :" + Integer.toBinaryString(ally);
 s += "\n";
 s += "Level :" + Integer.toBinaryString(level);
 s += "\n";
 s += "Spawner :" + Integer.toBinaryString(spawner);
 s += "\n";
 s += "HUD :" + Integer.toBinaryString(hud);
 s += "\n";
 //System.out.println(s);

	}
 static String tagToString (int tag)
	{
 return Integer.toBinaryString(tag);
	}

 player = 1 << 0;
 enemy = 1 << 1;
 shot = 1 << 2;
 powerup = 1 << 3;
 node = 1 << 4;
 topOfScreen = 1 << 5;
 dying = 1 << 6;
 camera = 1 << 7;
 ally = 1 << 8;
 level = 1 << 9;
 spawner = 1 << 10;
 hud = 1 << 11;
 allyShip = 1 << 12;
}
