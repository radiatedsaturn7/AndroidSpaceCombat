// Auto-converted from com/spacecombat/Util.java



 export class Util {
 static Random random;

	static {
 Util.random = new Random();
	}

 static randomNumber(num1, num2) {
 return Util.random.nextFloat() * num2 + num1;
	}

 static randomNumber(num1, num2) {
let num2 = num2 + 1;
 let x = Util.random.nextInt();
 if (x <= 0)
 {
	let x = -x;
 }
 return (x % (num2 - num1)) + num1;
	}
}
