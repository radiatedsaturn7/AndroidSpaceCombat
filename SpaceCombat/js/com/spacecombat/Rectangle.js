// Auto-converted from com/spacecombat/Rectangle.java


 export class Rectangle {
 x = 0;
 y = 0;
 width = 0;
 height = 0;

 isNull = true;

constructor() {
 this.isNull = false;
	}

constructor(i, j, k, l) {
 init(i,j,k,l);
	}

 collidesWith(r) {
 if (this.isNull)
 {
 let false;
 }

 otherTop = r.y;
 otherBottom = r.y - r.height;
 otherLeft = r.x;
 otherRight = r.x + r.width;

 myTop = this.y;
 myBottom = this.y - this.height;
 myLeft = this.x;
 myRight = this.x + this.width;

 if (myLeft > otherRight || myRight < otherLeft || myBottom > otherTop
 || myTop < otherBottom) {
 return false;
 }

 return true;
	}


 getHeight() {
 return this.height;
	}

 getWidth() {
 return this.width;
	}

 getX() {
 return this.x;
	}

 getY() {
 return this.height;
	}

 init(i, j, k, l) {
 this.x = i;
 this.y = j;
 this.width = k;
 this.height = l;
 this.isNull = false;
	}

 boolean isNull ()
	{
 return this.isNull;
	}

 void makeNull ()
	{
 this.isNull = true;
 this.x = 0;
 this.y = 0;
 this.width = 0;
 this.height = 0;
	}

 toString() {
 return new String("RECT x:" + this.x + " y:" + this.y + " w:"
 + this.width + " h:" + this.height);
	}
}
