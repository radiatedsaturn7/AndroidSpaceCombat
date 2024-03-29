package com.spacecombat;

public abstract class GenericText {
	public abstract void create(String text, String font, int color);
	public abstract void setText(String text);
	public abstract void setFont(String font);
	public abstract void setColor(int color);

	public abstract void draw(float offsetx, float offsety, int rotx, int roty, float scalex, float scaley);
	public abstract int getHeight();
	public abstract int getWidth();
}
