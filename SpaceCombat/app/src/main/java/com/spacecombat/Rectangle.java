package com.spacecombat;

public class Rectangle {
	public int x = 0;
	public int y = 0;
	public int width= 0;
	public int height = 0;

	private boolean isNull = true;

	public Rectangle() {
		this.isNull = false;
	}

	public Rectangle(final int i, final int j, final int k, final int l) {
		init(i,j,k,l);
	}

	public boolean collidesWith(final Rectangle r) {
		if (this.isNull)
		{
			return false;
		}

		final int otherTop = r.y;
		final int otherBottom = r.y - r.height;
		final int otherLeft = r.x;
		final int otherRight = r.x + r.width;

		final int myTop = this.y;
		final int myBottom = this.y - this.height;
		final int myLeft = this.x;
		final int myRight = this.x + this.width;

		if (myLeft > otherRight || myRight < otherLeft || myBottom > otherTop
				|| myTop < otherBottom) {
			return false;
		}

		return true;
	}


	public int getHeight() {
		return this.height;
	}

	public int getWidth() {
		return this.width;
	}

	public int getX() {
		return this.x;
	}

	public int getY() {
		return this.height;
	}

	public void init (final int i, final int j, final int k, final int l) {
		this.x = i;
		this.y = j;
		this.width = k;
		this.height = l;
		this.isNull = false;
	}

	public boolean isNull ()
	{
		return this.isNull;
	}

	public void makeNull ()
	{
		this.isNull = true;
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
	}

	@Override
	public String toString() {
		return new String("RECT x:" + this.x + " y:" + this.y + " w:"
				+ this.width + " h:" + this.height);
	}
}
