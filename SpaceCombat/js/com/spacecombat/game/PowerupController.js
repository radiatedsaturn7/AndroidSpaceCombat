// Auto-converted from com/spacecombat/game/PowerupController.java




 export class PowerupController extends Component {
 weapons = null;
 createAlly = false;
 createAllies = false;
 createGunShip = false;

 createOnLevelLoad = new LinkedList<CreateOnLevelLoad>();
 powerUpOnLevelLoad = new LinkedList<PowerUpOnLevelLoad>();
 setWeaponOnLevelLoad = new LinkedList<SetWeaponOnLevelLoad>();

 export class CreateOnLevelLoad
	{
 constructor(String type, String gun)
 {
 this.type=type;
 this.gun=gun;
 this.power=1;
 }
 int power;
 String type;
 String gun;
	}

 export class PowerUpOnLevelLoad
 {
 constructor(int weaponController,int weapon,int toLevel)
 {
 this.weaponController = weaponController;
 this.weapon = weapon;
 this.toLevel = toLevel;
 }

 int toLevel;
 int weaponController;
 int weapon;
 }

 export class SetWeaponOnLevelLoad
 {
 constructor(int weaponController,int weapon)
 {
 this.weaponController = weaponController;
 this.weapon = weapon;
 }

 int weaponController;
 int weapon;
 }

PowerupController(weapons) {
if(null) {
 throw new RuntimeException("can't have null weapons");
 }
 this.weapons = weapons;
	}

 powerUpTag = Tags.powerup;
 collide(whatIHit) {
 if (whatIHit.hasTag(powerUpTag)) {
 let powerUp = (PowerUp) whatIHit.getComponent(PowerUp.class);

 if (powerUp.isUsed)
 {
 let return;
 }
 powerUp.isUsed=true;

 if (weapons == null)
 {
 return;
 }

 powerUpOnLevelLoad.clear();
 for (int x = 0; x < this.weapons.length; x++)
 {
 if (powerUp == null || this.weapons == null || this.weapons[x] == null)
 {
 continue;
 }

 for (int y = 0; y < weapons[x].weapons.length; y++)
 {
 if (powerUp.type == this.weapons[x].weapons[y].getPowerUpType())
 {
 this.weapons[x].selectedWeapon = y;
 this.weapons[x].getSelectedWeapon().powerUp();
 setWeaponOnLevelLoad.add(new SetWeaponOnLevelLoad(x, y));
 }
 powerUpOnLevelLoad.add(new PowerUpOnLevelLoad(x,y,this.weapons[x].weapons[y].getPowerLevel()));
 }
 }

 if (powerUp != null)
 {
 if (powerUp.type == 8)
 {
 createAlly = true;
 }
 if (powerUp.type == 9)
 {
 createAllies = true;
 }
 if (powerUp.type == 10)
 {
 createGunShip = true;
 }
 }
 }
	}

 onLevelLoaded() {
 for(createOnLevelLoad) {
 let go = GameObject.create(PrefabFactory.createAlly(coll.type, new Vector2(200, Camera.screenSize.y + Camera.mainCamera.gameObject.transform.position.y), coll.type, 5, coll.gun));
 for(x++) {
 let w = (Weapon) go.getComponent(Laser.class);
 if (w == null) w = (Weapon) go.getComponent(MachineGun.class);
 if (w == null) w = (Weapon) go.getComponent(FlameThrower.class);
 if (w == null) w = (Weapon) go.getComponent(PulseCannon.class);

 //System.out.println(w.getPowerUpType() + " " + w.getPowerLevel());
 if(null) {
 w.powerUp();
 }
 }
 }

 for(powerUpOnLevelLoad) {
 for(x++) {
 for(y++) {
 if(pu.weapon) {
 for(z++) {
 this.weapons[x].weapons[y].setPowerLevel(pu.toLevel);
 }
 }
 }
 }
 }

 for(setWeaponOnLevelLoad) {
 this.weapons[sw.weaponController].selectedWeapon = sw.weapon;
 }
 }

 void update ()
	{
if(createAlly) {
 let gos = new LinkedList<GameObject>();
 let gos = GameObject.findAllByTags(Tags.allyShip, Tags.shot, gos);
 let numOfAllies = gos.size();
 //System.out.println("NumberOfAllies----"+numOfAllies);
 if(AllyAI.maxAllies) {
 for(gos) {
 let w = (Weapon) go.getComponent(Laser.class);
 if (w == null) w = (Weapon) go.getComponent(MachineGun.class);
 if (w == null) w = (Weapon) go.getComponent(FlameThrower.class);
 if (w == null) w = (Weapon) go.getComponent(PulseCannon.class);

 //System.out.println(w.getPowerUpType() + " " + w.getPowerLevel());
 if(null) {
 w.powerUp();
 }
 }
 for (CreateOnLevelLoad cl : createOnLevelLoad)
 {
 cl.power++;
 }
 createAlly = false;
 } else if (numOfAllies <= AllyAI.maxAllies) {
 //System.out.println("creating ally!");
 let type = Util.randomNumber(0, 5);
 let gun = Util.randomNumber(0, 3);

 let sType = "pariah";
 let sGun = "laser";

 if (type == 0)
 let sType = "calumniator";
 if (type == 1)
 let sType = "exemplar";
 if (type == 2)
 let sType = "paladin";
 if (type == 3)
 let sType = "pariah";
 if (type == 4)
 let sType = "sentinel";
 if (type == 5)
 let sType = "renegade";

 if (gun == 0)
 let sGun = "laser";
 if (gun == 1)
 let sGun = "machinegun";
 if (gun == 2)
 let sGun = "flamethrower";
 if (gun == 3)
 let sGun = "pulsecannon";

 createOnLevelLoad.add(new CreateOnLevelLoad(sType, sGun));

 //System.out.println("Creating:" + sType + " " + sGun);

 GameObject.create(PrefabFactory.createAlly(sType, new Vector2(200, 1000 + Camera.mainCamera.gameObject.transform.position.y), sType, 5, sGun));
 let createAlly = false;
 }
 }
 if (createAllies)
 {
 for (int x = 0; x < 6; x++)
 {
 //System.out.println("creating support!");
 type = Util.randomNumber(0, 5);
 gun = Util.randomNumber(4, 5);
 script = Util.randomNumber(7,9);

 xOffset = Util.randomNumber(0,400)-200;
 yOffset = Util.randomNumber(0,400);

 sType = "pariah";
 sGun = "laser";

 if (type == 0)
 sType = "calumniator";
 if (type == 1)
 sType = "exemplar";
 if (type == 2)
 sType = "paladin";
 if (type == 3)
 sType = "pariah";
 if (type == 4)
 sType = "sentinel";
 if (type == 5)
 sType = "renegade";

 if (gun == 0)
 sGun = "laser";
 if (gun == 1)
 sGun = "machinegun";
 if (gun == 2)
 sGun = "flamethrower";
 if (gun == 3)
 sGun = "pulsecannon";
 if (gun == 4)
 sGun = "lockinglaser";
 if (gun == 5)
 sGun = "missilelauncher";

 //System.out.println("Cre=ating:"+sType+" "+sGun);
 GameObject.create(PrefabFactory.createAlly(sType, new Vector2(200+xOffset,1000+Camera.mainCamera.gameObject.transform.position.y+yOffset), sType, script, sGun));
 }
	createAllies = false;
 }
 if (createGunShip)
 {
 xOffset = Util.randomNumber(0,400)-200;
 GameObject.create(PrefabFactory.createEscort("Escort", new Vector2(200+xOffset/2,1000+Camera.mainCamera.gameObject.transform.position.y)));
 //System.out.println("GunshipCreated");
	createGunShip = false;
 }
	}
}
