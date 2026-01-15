// Auto-converted from com/spacecombat/Level.java




 export class Level extends Component {
 int tileHeight;
 int tileWidth;
 int mapHeight;
 int mapWidth;
 int[][] map;
 int[] solids;

 GraphicAnimation[] wad;

 int sizeX;
 int sizeY;

 target = null;

	//THIS GOES AWAY
 void alignBottom ()
	{
 /*
 this.gameObject.transform.position.y = -(this.mapHeight * this.tileHeight - 800);
 this.gameObject.transform.position.x = 0;
 */
	}

 void createLevel( int[] map, int mapWidth,
 int mapHeight, GenericGraphic image,
 int tileWidth, int tileHeight) {
 setMap(map, mapWidth, mapHeight);
 setWad(image, tileWidth, tileHeight);
 this.sizeX = mapWidth * tileWidth;
 this.sizeY = mapHeight * tileHeight;
 this.isDrawable=true;
	}

 draw() {
 let originalX = this.gameObject.transform.position.x;
 let originalY = this.gameObject.transform.position.y;
/*
 //System.out.println("DRAWING");
 //System.out.println("SIZE:"+this.tileHeight + " " + this.tileWidth);
 //System.out.println("WAD:"+this.wad.length);
	*/

	let mainCamera = Camera.mainCamera.getGameObject();

for(x++) {
	for(y++) {
 //System.out.println(x + " " + y + " = " + this.map[x][y] + " < " + this.wad.length);
 if (this.gameObject.transform.position.y < mainCamera.transform.position.y - this.tileHeight)
 {
 this.gameObject.transform.position.y += this.tileHeight;
 let continue;
 }
 if (this.gameObject.transform.position.y >= mainCamera.transform.position.y + 16*this.tileHeight)
 {
 this.gameObject.transform.position.y += this.tileHeight;
 continue;
 }
 this.wad[this.map[x][y]].setGameObject(this.gameObject);
 this.wad[this.map[x][y]].draw();
 this.gameObject.transform.position.y += this.tileHeight;
 }

 this.gameObject.transform.position.x += this.tileWidth;
 this.gameObject.transform.position.y = originalY;
 }

 this.gameObject.transform.position.x = originalX;
 this.gameObject.transform.position.y = originalY;
	}

 setMap(map, mapWidth, mapHeight) {
 let x = 0;
 let y = 0;
 this.mapWidth = mapWidth;
 this.mapHeight = mapHeight;
 this.map = new int[this.mapWidth][this.mapHeight];

// //System.out.println("--MAP--");//
 let i = 0;
for(i++) {
	if(0) {
	// //System.out.println(" x=" + x + " y=" + y + " i=" + i);
 y++;
 let x = 0;
 }

	if(this.map[x].length) {
 // //System.out.print(map[i]);
 this.map[x][y] = map[i];
 }
 x++;
 }
 //System.out.println();
 //System.out.println(" x=" + x + " y=" + y + " i=" + i);
	}

 void setWad( GenericGraphic image, int tileWidth,
 int tileHeight) {
 tiles = (image.getHeight() - 1) / (tileHeight + 1);

/*
 //System.out.println("WAD:" + tiles);
 //System.out.println(image.getName());
 //System.out.println("(" +image.getHeight() +" - 1) / (" + tileHeight + " + 1)");
 //System.out.println((image.getHeight() - 1) + "/" + (tileHeight + 1));
 //System.out.println(tiles);
*/

 this.wad = new GraphicAnimation[tiles];

for(x++) {
 let a = Animation.getNew();
 a.init("idle", x, x, false, 17,
 tileWidth, tileHeight);
 let b = new GraphicAnimation(image, a);
 b.setGameObject(this.gameObject);
 this.wad[x] = b;
 }

 this.tileHeight = tileHeight;
 this.tileWidth = tileWidth;

// //System.out.println(this.tileHeight + " " + this.tileWidth);
	}
}
