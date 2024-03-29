package com.spacecombat.ai;

import java.util.LinkedList;
import java.util.List;

import com.spacecombat.BoxCollider;
import com.spacecombat.GameObject;
import com.spacecombat.Rectangle;
import com.spacecombat.RigidBody;
import com.spacecombat.Tags;
import com.spacecombat.Time;
import com.spacecombat.Util;
import com.spacecombat.Vector2;
import com.spacecombat.game.HealthController;
import com.spacecombat.weapons.Weapon;

public class AllyAI extends AIScript {
	public static int numOfPlayers = 1;
	//public static int numOfAllies = 1;
	public int id = 1;	
	public Vector2 distances = new Vector2();

	// set this to the ally ID i am, so I can target different enemies

	public int formationID;
	public int spacing;
	public int give;
	public int formation;
	public int roamFormation;
	public boolean tempLine = false;	
	public int side;
	public GameObject followPlayer;

	public Rectangle screen = new Rectangle();
	public Rectangle followRectangle = new Rectangle();
	public Rectangle dodgeRectangle = new Rectangle();
	public Rectangle boundingBox = new Rectangle();
	private Rectangle sBoundingBox = new Rectangle();

	public BoxCollider boxCollider;
	public float nextFormationTime;
	public float formationHoldTime = 1;
	public boolean headUnit;
	private RigidBody rigidBody;
	private Vector2 maxSpeed;
	private Vector2 accel;

	private List<GameObject> gos;
	private GameObject enemy = null;
	private float searchTime;
	private float nextSearch;
	private int enemyCount = 0;

	public int playerTag = Tags.player;
	private final int targets = Tags.enemy;

	private final Rectangle Top = new Rectangle();
	private final Rectangle Bottom = new Rectangle();
	private final Rectangle Left = new Rectangle();
	private final Rectangle Right = new Rectangle();
	private final Weapon weapon;

	public static int ids = 1;

	// You actually can support as many allies as in freeIds,
	//but lets limit to 4... we will implement upgrades for
	//allies if you get more than one ally powerup
	public static final int maxAllies = 4;
	private static int [] freeIds = {1,2,3,4,5,6,7,8};
	private static int [] usedIds = new int[freeIds.length];

	public static void clear()
	{
		freeIds = new int [] {1,2,3,4,5,6,7,8};
		usedIds = new int[freeIds.length];
	}
	public static int getId()
	{
		for (int x = 0; x < freeIds.length; x++)
		{
			if (freeIds[x] > 0)
			{				
				usedIds[x] = freeIds[x];
				int tempId = freeIds[x];
				freeIds[x] = -1;
				return tempId;
			}
		}
		
		return ids;
	}
	
	public void destroy()
	{
		//System.out.println("ON BEFORE DESTROY");
		for (int x = 0; x < usedIds.length; x++)
		{
			if (usedIds[x] == this.id)
			{
				freeIds[x] = this.id;
				usedIds[x] = -1;
				this.id = -1;
				return;
			}
		}
	}
	
	public AllyAI(final String allyType, final Weapon w) {
		this.id = getId();
		//System.out.println("ALLY ID:" + this.id);
		this.gos = new LinkedList<GameObject>();
		AllyAI.ids++;
		this.weapon = w;	
	}

	public boolean canChangeFormation() {

		if (Time.getTime() > this.nextFormationTime) {
			return true;
		}
		return false;
	}

	public boolean canSearch() {
		if (Time.getTime() >= this.nextSearch) {
			return true;
		}
		return false;
	}

	public boolean canShoot() {
		for (int x = 0; x < GameObject.getAllGameObjects().size(); x++) {
			final GameObject s = GameObject.getAllGameObjects().get(x);
			this.sBoundingBox = getBoundingBox(s, this.sBoundingBox);

			if (this.sBoundingBox.isNull()) {
				continue;
			}

			if (this.sBoundingBox.x + this.sBoundingBox.width > this.boundingBox.x
					&& this.sBoundingBox.x < this.boundingBox.x
					+ this.boundingBox.width
					&& this.sBoundingBox.y < this.boundingBox.y
					&& !(s.hasTag(this.gameObject.getTags()))
					&& (s.hasTag(Tags.enemy))) {
				return true;
			}
		}
		return false;
	}

	public boolean checkDodge() {
		if (this.dodgeRectangle.isNull() || this.boundingBox.isNull()) {
			return false;
		}

		this.dodgeRectangle.x = this.boundingBox.x
				- (this.boundingBox.width * 2);
		this.dodgeRectangle.width = this.boundingBox.width * 5;
		this.dodgeRectangle.y = this.boundingBox.y
				+ (this.boundingBox.height * 2);
		this.dodgeRectangle.height = this.boundingBox.height * 5;

		for (int x = 0; x < GameObject.getAllGameObjects().size(); x++) {
			final GameObject s = GameObject.getAllGameObjects().get(x);
			this.sBoundingBox = getBoundingBox(s, this.sBoundingBox);

			if (s == null || this.sBoundingBox.isNull()) {
				continue;
			}

			if (this.sBoundingBox.collidesWith(this.dodgeRectangle)
					&& !(s.hasTag(this.gameObject.getTags()))
					&& !(s.hasTag(Tags.powerup))) {
				return true;
			}
		}
		return false;
	}

	public void column() {

		int neg = 1;
		int fix = AllyAI.numOfPlayers;

		if (fix == 0) {
			fix = 1;
		}

		if (Math.abs(this.side) % 2 == 1) {
			neg = -1; // switch the side the ally appears on
		}

		if (this.boundingBox.x < this.followRectangle.x + neg
				* this.followRectangle.width * .25
				+ (neg * this.spacing - this.give)) {
			if (this.rigidBody.speed.x < this.maxSpeed.x) {
				this.rigidBody.speed.x+=this.accel.x;
			}
		} else if (this.boundingBox.x > this.followRectangle.x + neg
				* this.followRectangle.width * .25
				+ (neg * this.spacing + this.give)) {
			if (this.rigidBody.speed.x > -this.maxSpeed.x) {
				this.rigidBody.speed.x-=this.accel.x;
			}
		} else {
			if (this.rigidBody.speed.x < 0) {
				this.rigidBody.speed.x+=this.accel.x;
			}
			if (this.rigidBody.speed.x > 0) {
				this.rigidBody.speed.x-=this.accel.x;
			}
		}

		if (this.boundingBox.y < this.followRectangle.y
				+ this.followRectangle.height * .5
				+ (this.spacing * this.id - this.give)) {
			if (this.rigidBody.speed.y < this.maxSpeed.y) {
				this.rigidBody.speed.y+=this.accel.y;
			}

		} else if (this.boundingBox.y > this.followRectangle.y
				+ this.followRectangle.height * .5
				+ (this.spacing * this.id + this.give)) {
			if (this.rigidBody.speed.y > -this.maxSpeed.y) {
				this.rigidBody.speed.y-=this.accel.y;
			}
		} else {
			if (this.rigidBody.speed.y < 0) {
				this.rigidBody.speed.y+=this.accel.y;
			}
			if (this.rigidBody.speed.y > 0) {
				this.rigidBody.speed.y-=this.accel.y;
			}
		}
	}

	public void cover() {
		if (this.boundingBox.x < this.followRectangle.x
				- (this.spacing * this.formationID) - this.give
				- (this.boundingBox.width / 2)) {
			if (this.rigidBody.speed.x < this.maxSpeed.x) {
				this.rigidBody.speed.x+=this.accel.x;
			}

		} else if (this.boundingBox.x > this.followRectangle.x
				+ this.followRectangle.width
				+ (this.spacing * this.formationID) + this.give
				- (this.boundingBox.width / 2)) {
			if (this.rigidBody.speed.x > -this.maxSpeed.x) {
				this.rigidBody.speed.x-=this.accel.x;
			}
		} else {
			if (this.rigidBody.speed.x < 0) {
				this.rigidBody.speed.x+=this.accel.x;
			}
			if (this.rigidBody.speed.x > 0) {
				this.rigidBody.speed.x-=this.accel.x;
			}
		}
		if (this.boundingBox.y < this.followRectangle.y - this.spacing
				* this.formationID - this.give - (this.boundingBox.height / 2)) {
			if (this.rigidBody.speed.y < this.maxSpeed.y) {
				this.rigidBody.speed.y+=this.accel.y;
			}

		} else if (this.boundingBox.y > this.followRectangle.y
				+ this.followRectangle.height + this.spacing * this.formationID
				+ this.give - (this.boundingBox.height / 2)) {
			if (this.rigidBody.speed.y > -this.maxSpeed.y) {
				this.rigidBody.speed.y-=this.accel.y;
			}
		} else {
			if (this.rigidBody.speed.y < 0) {
				this.rigidBody.speed.y+=this.accel.y;
			}
			if (this.rigidBody.speed.y > 0) {
				this.rigidBody.speed.y-=this.accel.y;
			}
		}
	}

	public void dodge() {
		final int searchHeight = 512;

		this.Top.x = this.boundingBox.x - (this.boundingBox.width * 2);
		this.Top.y = this.boundingBox.y + searchHeight;
		this.Top.width = this.boundingBox.width * 5;
		this.Top.height = searchHeight;

		this.Bottom.x = this.boundingBox.x - (this.boundingBox.width * 2);
		this.Bottom.y = this.boundingBox.y - this.boundingBox.height;
		this.Bottom.width = this.boundingBox.width * 5;
		this.Bottom.height = searchHeight / 4;

		this.Left.x = this.boundingBox.x - (this.boundingBox.width * 2);
		this.Left.y = this.boundingBox.y + searchHeight;
		this.Left.width = (this.boundingBox.width * 2);
		this.Left.height = searchHeight + this.boundingBox.height
				+ searchHeight / 4;

		this.Right.x = this.boundingBox.x + (this.boundingBox.width * 2);
		this.Right.y = this.boundingBox.y + searchHeight;
		this.Right.width = this.boundingBox.width * 2;
		this.Right.height = searchHeight + this.boundingBox.height
				+ searchHeight / 4;
		//
		// get all the game objects

		for (int x = 0; x < GameObject.getAllGameObjects().size(); x++) {
			final GameObject s = GameObject.getAllGameObjects().get(x);
			this.sBoundingBox = getBoundingBox(s, this.sBoundingBox);
			if (s == null || this.sBoundingBox.isNull()) {
				continue;
			}

			if (!(s.hasTag(this.gameObject.getTags()))
					&& !(s.hasTag(Tags.powerup))) {
				if (this.sBoundingBox.collidesWith(this.Top)
						|| this.sBoundingBox.collidesWith(this.Bottom)) {
					if (this.sBoundingBox.collidesWith(this.Top)) {
						if (this.rigidBody.speed.y > -(2 * this.maxSpeed.y)) {
							this.rigidBody.speed.y-=this.accel.y;
						}
					} else if (this.sBoundingBox.collidesWith(this.Bottom)) {
						if (this.rigidBody.speed.y < this.maxSpeed.y) {
							this.rigidBody.speed.y+=this.accel.y;
						}
					}
					if (this.sBoundingBox.collidesWith(this.Right)) {
						if (this.rigidBody.speed.x > -this.maxSpeed.x) {
							this.rigidBody.speed.x-=this.accel.x;
						}
					} else if (this.sBoundingBox.collidesWith(this.Left)) {
						if (this.rigidBody.speed.x < this.maxSpeed.x) {
							this.rigidBody.speed.x+=this.accel.x;
						}
					}
					break;
				} else if (this.sBoundingBox.collidesWith(this.Right)
						&& !(s.hasTag(Tags.powerup))) {
					if (this.rigidBody.speed.x > -this.maxSpeed.x) {
						this.rigidBody.speed.x-=this.accel.x;
					}
					break;
				} else if (this.sBoundingBox.collidesWith(this.Left)
						&& !(s.hasTag(Tags.powerup))) {
					if (this.rigidBody.speed.x < this.maxSpeed.x) {
						this.rigidBody.speed.x+=this.accel.x;
					}
					break;
				}
			}
		}
	}

	@Override
	public void draw() {

		if (this.rigidBody.speed.y > 0) { 
			if (this.rigidBody.speed.x > 0) {
				this.gameObject.playAnimation("DOWNRIGHT");
			} else if (this.rigidBody.speed.x < 0) {
				this.gameObject.playAnimation("DOWNLEFT");
			} else {
				this.gameObject.playAnimation("DOWN");
			} 
		} else if (this.rigidBody.speed.y < 0) {
			if (this.rigidBody.speed.x > 0) {
				this.gameObject.playAnimation("UPRIGHT");
			} else if (this.rigidBody.speed.x < 0) {
				this.gameObject.playAnimation("UPLEFT");
			} else {
				this.gameObject.playAnimation("UP");
			} 
		} else if (this.rigidBody.speed.x > 0) {
			this.gameObject.playAnimation("RIGHT");
		} else if (this.rigidBody.speed.x < 0) {
			this.gameObject.playAnimation("LEFT");
		} else {
			this.gameObject.playAnimation("IDLE");
		}
	}

	public Rectangle getBoundingBox (final GameObject s, final Rectangle r) {
		if (s == null) {
			r.makeNull();
			return r;
		}

		if (s.getRigidBody() == null) {
			r.makeNull();
			return r;
		}

		if (!(s.getRigidBody().getCollider() instanceof BoxCollider)) {
			r.makeNull();
			return r;
		}

		if (r.isNull()) {

			r.init(0,0,0,0);
		}

		r.x = (int) s.transform.position.x;
		r.y = (int) s.transform.position.y;

		r.width = (int) ((BoxCollider) s.getRigidBody().getCollider()).size.x;
		r.height = (int) ((BoxCollider) s.getRigidBody().getCollider()).size.y;

		return r;
	}

	public void line () {
		int neg = 1;
		int fix = AllyAI.numOfPlayers;

		if (fix == 0) {
			fix = 1;
		}
		if (Math.abs(this.side) % 2 == 1) {
			neg = -1; // switch the side the ally appears on
		}
		if (this.boundingBox.x < this.followRectangle.x + neg
				* this.followRectangle.width
				+ (neg * this.spacing * this.formationID / fix - this.give)) {
			if (this.rigidBody.speed.x < this.maxSpeed.x) {
				this.rigidBody.speed.x+=this.accel.x;
			}

		} else if (this.boundingBox.x > this.followRectangle.x + neg
				* this.followRectangle.width
				+ (neg * this.spacing * this.formationID / fix + this.give)) {
			if (this.rigidBody.speed.x > -this.maxSpeed.x) {
				this.rigidBody.speed.x-=this.accel.x;
			}
		} else {
			if (this.rigidBody.speed.x < 0) {
				this.rigidBody.speed.x+=this.accel.x;
			}
			if (this.rigidBody.speed.x > 0) {
				this.rigidBody.speed.x-=this.accel.x;
			}
		}
		if (this.boundingBox.y < this.followRectangle.y - this.give) {
			if (this.rigidBody.speed.y < this.maxSpeed.y) {
				this.rigidBody.speed.y+=this.accel.y;
			}
		} else if (this.boundingBox.y > this.followRectangle.y + this.give) {
			if (this.rigidBody.speed.y > -this.maxSpeed.y) {
				this.rigidBody.speed.y-=this.accel.y;
			}
		} else {
			if (this.rigidBody.speed.y < 0) {
				this.rigidBody.speed.y+=this.accel.y;
			}
			if (this.rigidBody.speed.y > 0) {
				this.rigidBody.speed.y-=this.accel.y;
			}
		}
	}

	@Override
	public void onCreate() {
		this.spacing = 38;
		this.give = 5;
		this.dodgeRectangle = new Rectangle();
		this.boundingBox = new Rectangle();
		if (formation < 6)
		{
			this.formationID = 0;
		}
		
		this.followPlayer = GameObject.findByName("player");
		this.followRectangle = getBoundingBox(this.followPlayer,
				this.followRectangle);
		
		this.nextFormationTime = 0;
		this.formationHoldTime = 1;
		this.searchTime = 1;
		this.nextSearch = 0;
		this.tempLine = true;

		this.headUnit = false;
		this.sBoundingBox = new Rectangle();
		this.boxCollider = (BoxCollider) this.gameObject.getRigidBody()
				.getCollider();
		this.rigidBody = this.gameObject.getRigidBody();
		this.screen = new Rectangle(0, 0, 480, 800);

		// this makes it so 1 = 1, 2 = 1, 3 = 2, 4 = 2
		// do this so we can adjust the side and height the ally appears on
		// otherwise it would be staggered
		this.formationID = Math.round((this.id * 0.5f) + .01f) - 1;
	}

	public void roam () {
		if (canSearch()) {
			search();
		}

		int playersHealth = 0;

		if (this.followPlayer != null) {
			final HealthController hc = (HealthController) this.followPlayer
					.getComponent(HealthController.class);

			if (hc != null) {
				playersHealth = hc.health;

				// the player is hurt
				if (AllyAI.numOfPlayers != 0 && playersHealth < 20
						&& playersHealth > 0) {
					// switch to a cover formation
					this.roamFormation = 4;
					return;
				}
			}
		}

		// if I did not find anything, don't move
		if (this.enemy == null && this.headUnit) {
			this.enemyCount = 0;

			if (this.rigidBody.speed.x < 0) {
				this.rigidBody.speed.x++;
			}
			if (this.rigidBody.speed.x > 0) {
				this.rigidBody.speed.x--;
			}
			if (this.rigidBody.speed.y < 0) {
				this.rigidBody.speed.y++;
			}
			if (this.rigidBody.speed.y > 0) {
				this.rigidBody.speed.y--;
			}

			return;
		}

		if (canChangeFormation()) {
			this.nextFormationTime = Time.getTime() + this.formationHoldTime;
			this.followRectangle = getBoundingBox(this.followPlayer,
					this.followRectangle);


			if (this.distances.x >= 200 && this.distances.y >= 500 && this.enemyCount >= 5) {
				this.tempLine = true;
				this.roamFormation = 5;
			} else if (this.distances.x >= 200 && this.distances.y >= 200 && this.enemyCount >= 3) {				
				this.roamFormation = 1;
			} else if (this.distances.x >= 200 && this.distances.y >= 0) {
				this.tempLine = false;
				this.roamFormation = 2;
			} else if (this.distances.x >= 0 && this.distances.y >= 200) {
				this.roamFormation = 3;

			} else {
				this.tempLine = true;
				this.roamFormation = 5;
			}
		}
		else if (this.tempLine && this.roamFormation == 2) 
		{						
			if (this.enemy != null) {
				this.tempLine = true;
				this.roamFormation = 5;
			}
		}
		else if (this.roamFormation == 5)
		{
			if (this.enemy == null) {
				this.roamFormation = 2;
				this.tempLine = true;
			}
		}

		if (this.roamFormation != 5) {
			return;
		}

		this.sBoundingBox = getBoundingBox(this.enemy, this.sBoundingBox);

		if (this.sBoundingBox.isNull()) {
			this.roamFormation = 2;
			this.tempLine = true;
			return;
		}

		if (this.boundingBox.x < this.sBoundingBox.x - this.give) {
			if (this.rigidBody.speed.x < this.maxSpeed.x) {
				this.rigidBody.speed.x+=this.accel.x;
			}
		} else if (this.boundingBox.x > this.sBoundingBox.x + this.give) {
			if (this.rigidBody.speed.x > -this.maxSpeed.x) {
				this.rigidBody.speed.x-=this.accel.x;
			}
		} else {
			if (this.rigidBody.speed.x < 0) {
				this.rigidBody.speed.x+=this.accel.x;
			}
			if (this.rigidBody.speed.x > 0) {
				this.rigidBody.speed.x-=this.accel.x;
			}
		}

		if (this.boundingBox.y < this.sBoundingBox.y + 256 - this.give) {
			if (this.rigidBody.speed.y < this.maxSpeed.y) {
				this.rigidBody.speed.y+=this.accel.y;
			}

		} else if (this.boundingBox.y > this.sBoundingBox.y + 256 + this.give) {
			if (this.rigidBody.speed.y > -this.maxSpeed.y) {
				this.rigidBody.speed.y-=this.accel.y;
			}
		} else {
			if (this.rigidBody.speed.y < 0) {
				this.rigidBody.speed.y+=this.accel.y;
			}
			if (this.rigidBody.speed.y > 0) {
				this.rigidBody.speed.y-=this.accel.y;
			}
		}

	}

	private int nonTargets = Tags.shot | Tags.spawner;
	
	public void search() {
		this.nextSearch = Time.getTime() + this.searchTime;

		this.gos = GameObject.findAllByTags(this.targets, this.nonTargets, this.gos);
		//System.out.println("SEARCHING:-->" + gos.size());
		
		this.enemyCount = this.gos.size();
		this.distances = GameObject.getDistances();
		
		
		if (this.gos.size() > 0) {
			this.enemy = this.gos.get(Util.randomNumber(0, this.gos.size() - 1));

			if (this.enemy.hasTag(Tags.shot))
			{
				//System.out.println("FOUND BAD::"+this.enemy.getName() + " " + this.gos.size() + " " + Tags.tagToString(this.enemy.getTags()));
				for (int x = 0; x < this.gos.size(); x++)
				{
					this.enemy = this.gos.get(x);
					if (!(this.enemy.hasTag(Tags.shot)))					
					{
						break;
					}

					//System.out.println("FOUND BAD::"+this.enemy.getName() + " " + Tags.tagToString(this.enemy.getTags()));
				}
			}
				
			if ((this.enemy.hasTag(Tags.shot)))
			{
				//System.out.println("FOUND::NOTHING");
				this.enemy = null;
			}
			
			if (!(this.enemy == null))
			{
				//System.out.println("FOUND::"+this.enemy.getName() + " " + Tags.tagToString(this.enemy.getTags()));
			}
		} else {
			//System.out.println("FOUND::NOTHING");
			this.enemy = null;
		}
	}

	public void setAccel(final Vector2 v)
	{
		this.accel = v;
	}

	public void setSpeed(final Vector2 v)
	{
		this.maxSpeed = v;
	}

	public void shoot() {

		if (this.weapon.canShoot()) {
			this.weapon.shoot();
		}
	}

	@Override
	public void update() {
		if (this.gameObject == null) {
			return;			
		} else if (this.boxCollider == null) {
			this.boxCollider = (BoxCollider) this.gameObject.getRigidBody()
					.getCollider();
			if (this.boxCollider == null) {
				return;
			}
		}

		if (this.boundingBox.isNull()) {
			this.boundingBox.init(0,0,0,0);
		}

		this.boundingBox.x = (int) this.gameObject.transform.position.x;
		this.boundingBox.y = (int) this.gameObject.transform.position.y;
		this.boundingBox.width = (int) this.boxCollider.size.x;
		this.boundingBox.height = (int) this.boxCollider.size.y;

		if (this.followPlayer == null || this.followRectangle.isNull()) {
			this.gos = GameObject.findAllByTags(this.playerTag, this.gos);
			AllyAI.numOfPlayers = this.gos.size();

			if (AllyAI.numOfPlayers > 0 && this.gos != null) {
				this.followPlayer = this.gos.get(this.id % AllyAI.numOfPlayers);
				this.followRectangle = getBoundingBox(this.followPlayer,
						this.followRectangle);
			} else {
				this.followPlayer = null;
				this.followRectangle.makeNull();
				this.tempLine = true;
				this.formation = 5;
				this.roamFormation = 5;
			}
		}


		if (AllyAI.numOfPlayers != 0) {
			this.side = (this.id / AllyAI.numOfPlayers);
		}

		if (this.headUnit) {
			this.tempLine = true;
			this.formation = 5;
			this.roamFormation = 5;
		}

		if (canShoot()) {
			shoot();
		}
		
		if (this.formation == 7)
		{
			shoot();
			this.gameObject.getRigidBody().speed.y = -this.maxSpeed.y*2;
			return;
		}
		if (this.formation == 8)
		{
			shoot();
			this.gameObject.getRigidBody().speed.x = -this.maxSpeed.x/2;
			this.gameObject.getRigidBody().speed.y = -this.maxSpeed.y*2;
			return;
		}
		if (this.formation == 9)
		{
			shoot();
			this.gameObject.getRigidBody().speed.x = this.maxSpeed.x/2;
			this.gameObject.getRigidBody().speed.y = -this.maxSpeed.y*2;
			return;
		}
		
		if (this.formation == 6)
		{
			if (checkDodge()) {
				dodge();
				return;
			}	
			return;
		}
		
		if (this.formation == 5) {
			roam();
		}

		this.followRectangle = getBoundingBox(this.followPlayer,
				this.followRectangle);

		if (!this.followRectangle.isNull() && !this.headUnit) {
			if (this.formation == 1 || this.roamFormation == 1) {
				wedge();
			}
			if (this.formation == 2 || this.roamFormation == 2) {
				line();
			}
			if (this.formation == 3 || this.roamFormation == 3) {
				column();
			}
			if (this.formation == 4 || this.roamFormation == 4) {
				cover();
			}
		}
	}

	public void wedge() {
		int neg = 1;
		int fix = AllyAI.numOfPlayers;

		if (fix == 0) {
			fix = 1;
		}
		
		

		if (Math.abs(this.side) % 2 == 1) {
			neg = -1; // switch the side the ally appears on
		}

		if (this.boundingBox.x < this.followRectangle.x + neg
				* this.followRectangle.width
				+ (neg * this.spacing * this.formationID / fix - this.give)) {
			if (this.rigidBody.speed.x < this.maxSpeed.x) {
				this.rigidBody.speed.x+=this.accel.x;
			}
		} else if (this.boundingBox.x > this.followRectangle.x + neg
				* this.followRectangle.width
				+ (neg * this.spacing * this.formationID / fix + this.give)) {
			if (this.rigidBody.speed.x > -this.maxSpeed.x) {
				this.rigidBody.speed.x-=this.accel.x;
			}
		} else {
			if (this.rigidBody.speed.x < 0) {
				this.rigidBody.speed.x+=this.accel.x;
			}
			if (this.rigidBody.speed.x > 0) {
				this.rigidBody.speed.x-=this.accel.x;
			}
		}

		if (this.boundingBox.y < this.followRectangle.y
				+ this.followRectangle.height
				+ (this.spacing * this.formationID / fix - this.give)) {
			if (this.rigidBody.speed.y < this.maxSpeed.y) {
				this.rigidBody.speed.y+=this.accel.y;
			}

		} else if (this.boundingBox.y > this.followRectangle.y
				+ this.followRectangle.height
				+ (this.spacing * this.formationID / fix + this.give)) {
			if (this.rigidBody.speed.y > -this.maxSpeed.y) {
				this.rigidBody.speed.y-=this.accel.y;
			}
		} else {
			if (this.rigidBody.speed.y < 0) {
				this.rigidBody.speed.y+=this.accel.y;
			}
			if (this.rigidBody.speed.y > 0) {
				this.rigidBody.speed.y-=this.accel.y;
			}
		}
	}
	public void setFormation(int allyScript) {
		this.roamFormation = allyScript;
		this.formation = allyScript;
	}
}
