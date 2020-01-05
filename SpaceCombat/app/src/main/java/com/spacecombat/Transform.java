package com.spacecombat;

public class Transform {
	public Vector2 position;
	public Vector2 rotation;
	public Vector2 scale;

	public Transform() {
		this.position = new Vector2(0, 0);
		this.rotation = new Vector2(0, 0);
		this.scale = new Vector2(1, 1);
	}
}