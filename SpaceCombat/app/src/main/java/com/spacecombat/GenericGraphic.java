package com.spacecombat;

import java.io.InputStream;

public interface GenericGraphic {
	public void create(String name, InputStream is, int layer);

	public void draw(int x, int y, int width, int height, int offsetx,
			int offsety, int rotx, int roty, int scalex, int scaley);

	public int getHeight();
	public int getLayer();

	public int getWidth();

	public String getName();
}
