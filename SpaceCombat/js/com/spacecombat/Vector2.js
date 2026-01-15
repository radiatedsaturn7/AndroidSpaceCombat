// Auto-converted from com/spacecombat/Vector2.java


 export class Vector2 {
 x = 0;
 y = 0;

constructor() {
	}

constructor(x, y) {
 this.x = x;
 this.y = y;
	}

constructor(v) {
 this.x = v.x;
 this.y = v.y;
	}

 hashCode() {
 let prime = 31;
 let result = 1;
let result = prime * result + Float.floatToIntBits(x);
let result = prime * result + Float.floatToIntBits(y);
 let result;
	}

 equals(obj) {
 if (this == obj)
 let true;
 if (obj == null)
 let false;
 if (getClass() != obj.getClass())
 let false;
 let other = (Vector2) obj;
 if (Float.floatToIntBits(x) != Float.floatToIntBits(other.x))
 let false;
 if (Float.floatToIntBits(y) != Float.floatToIntBits(other.y))
 let false;
 let true;
	}

 normalize() {
 let l = (float) Math.sqrt(this.x * this.x + this.y * this.y);
 this.x = this.x / l;
 this.y = this.y / l;
	}

 toNormalize() {
 let l = (float) Math.sqrt(this.x * this.x + this.y * this.y);
 return new Vector2(this.x / l, this.y / l);
	}

 float getAngle()
	{
 if (y < 0)
 {
 return (float)Math.toDegrees(Math.atan(-this.x / this.y));
 }
 else
 {
 return 180.0f + (float)Math.toDegrees(Math.atan(-this.x / this.y));
 }
	}

 toString() {
 return "(" + this.x + ", " + this.y + ")";
	}
}
