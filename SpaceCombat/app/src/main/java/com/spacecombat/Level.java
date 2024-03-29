package com.spacecombat;

import android.graphics.Rect;

import com.spacecombat.game.SimpleMovement;

public class Level extends Component {
	public int tileHeight;
	public int tileWidth;
	public int mapHeight;
	public int mapWidth;
	public int[][] map;
	public int[] solids;	

	public GraphicAnimation[] wad;

	public int sizeX;
	public int sizeY;

	private GameObject target = null;

	//THIS GOES AWAY
	public void alignBottom ()
	{
		/*
		this.gameObject.transform.position.y = -(this.mapHeight * this.tileHeight - 800);
		this.gameObject.transform.position.x = 0;
		*/
	}

	public void createLevel(final int[] map, final int mapWidth,
			final int mapHeight, final GenericGraphic image,
			final int tileWidth, final int tileHeight) {
		setMap(map, mapWidth, mapHeight);
		setWad(image, tileWidth, tileHeight);
		this.sizeX = mapWidth * tileWidth;
		this.sizeY = mapHeight * tileHeight;
		this.isDrawable=true;
	}

	@Override
	public void draw() {
		final float originalX = this.gameObject.transform.position.x;
		final float originalY = this.gameObject.transform.position.y;
/*
		//System.out.println("DRAWING");
		//System.out.println("SIZE:"+this.tileHeight + " " + this.tileWidth);
		//System.out.println("WAD:"+this.wad.length);
	*/

	GameObject mainCamera = Camera.mainCamera.getGameObject();

		for (int x = 0; x < this.mapWidth; x++) {
			for (int y = 0; y < this.mapHeight; y++) {
				//System.out.println(x + " " + y + " = " + this.map[x][y] + " < " + this.wad.length);
				if (this.gameObject.transform.position.y < mainCamera.transform.position.y - this.tileHeight)
				{
					this.gameObject.transform.position.y += this.tileHeight;
					continue;
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

	public void setMap(final int[] map, final int mapWidth, final int mapHeight) {
		int x = 0;
		int y = 0;
		this.mapWidth = mapWidth;
		this.mapHeight = mapHeight;
		this.map = new int[this.mapWidth][this.mapHeight];

//		//System.out.println("--MAP--");//
		int i = 0;
		for (i = 0; i < map.length; i++) {
			if (i % this.mapWidth == 0 && i != 0) {
	//			//System.out.println("   x=" + x + " y=" + y + " i=" + i);
				y++;
				x = 0;
			}

			if (x < this.map.length && y < this.map[x].length) {
		//		//System.out.print(map[i]);
				this.map[x][y] = map[i];
			}
			x++;
		}
		//System.out.println();
		//System.out.println("   x=" + x + " y=" + y + " i=" + i);
	}

	public void setWad(final GenericGraphic image, final int tileWidth,
			final int tileHeight) {
		final int tiles = (image.getHeight() - 1) / (tileHeight + 1);

/*
		//System.out.println("WAD:" + tiles);
		//System.out.println(image.getName());
		//System.out.println("(" +image.getHeight() +" - 1) / (" + tileHeight + " + 1)");
		//System.out.println((image.getHeight() - 1) + "/" + (tileHeight + 1));
		//System.out.println(tiles);
*/
		
		this.wad = new GraphicAnimation[tiles];

		for (int x = 0; x < this.wad.length; x++) {
			final Animation a = Animation.getNew();
			a.init("idle", x, x, false, 17,
					tileWidth, tileHeight);
			final GraphicAnimation b = new GraphicAnimation(image, a);
			b.setGameObject(this.gameObject);
			this.wad[x] = b;
		}

		this.tileHeight = tileHeight;
		this.tileWidth = tileWidth;
		
//		//System.out.println(this.tileHeight + " " + this.tileWidth);
	}
}