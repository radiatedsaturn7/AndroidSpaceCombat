package com.spacecombat;

import java.util.Random;

public class Util {
	private static Random random;

	static {
		Util.random = new Random();
	}

	public static float randomNumber(final float num1, final float num2) {
		return Util.random.nextFloat() * num2 + num1;
	}

	public static int randomNumber(final int num1, int num2) {
		num2 = num2 + 1;
		int x = Util.random.nextInt();
		if (x <= 0)
		{
			x = -x;
		}
		return (x % (num2 - num1)) + num1;
	}
}
