package com.spacecombat;

public class Tags {
	
	public static boolean compareTagsAnd (int value, int compareValue)
	{
		return (value & compareValue) == compareValue;
	}
	
	public static boolean compareTagsOr (int value, int compareValue)
	{
		return (value & compareValue) > 0;
	}
	
	public int createTag (int ... values)
	{
		int temp = 0;
		for (int x = 0; x < values.length; x++)
		{
			temp = temp | values[x];
		}
		return temp;
	}
	
	public static void printAllTags()
	{
		String s = "";
		s += "Player     :" + Integer.toBinaryString(player);
		s += "\n";
		s += "Enemy      :" + Integer.toBinaryString(enemy);
		s += "\n";
		s += "Shot       :" + Integer.toBinaryString(shot);
		s += "\n";
		s += "PowerUp    :" + Integer.toBinaryString(powerup);
		s += "\n";
		s += "Node       :" + Integer.toBinaryString(node);
		s += "\n";
		s += "TopOfScreen:" + Integer.toBinaryString(topOfScreen);
		s += "\n";
		s += "Dying      :" + Integer.toBinaryString(dying);
		s += "\n";
		s += "Camera     :" + Integer.toBinaryString(camera);
		s += "\n";
		s += "Ally       :" + Integer.toBinaryString(ally);
		s += "\n";
		s += "Level      :" + Integer.toBinaryString(level);
		s += "\n";
		s += "Spawner    :" + Integer.toBinaryString(spawner);
		s += "\n";
		s += "HUD    :" + Integer.toBinaryString(hud);
		s += "\n";
		//System.out.println(s);
		
	}
	public static String tagToString (int tag)
	{
		return Integer.toBinaryString(tag);
	}
	
	public static final int player = 1 << 0;
	public static final int enemy = 1 << 1;
	public static final int shot = 1 << 2;
	public static final int powerup = 1 << 3;
	public static final int node = 1 << 4;
	public static final int topOfScreen = 1 << 5;
	public static final int dying = 1 << 6;
	public static final int camera = 1 << 7;
	public static final int ally = 1 << 8;
	public static final int level = 1 << 9;
	public static final int spawner = 1 << 10;
	public static final int hud = 1 << 11;
	public static final int allyShip = 1 << 12;
}
