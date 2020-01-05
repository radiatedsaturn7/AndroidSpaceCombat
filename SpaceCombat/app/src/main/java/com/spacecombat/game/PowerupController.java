package com.spacecombat.game;

import com.spacecombat.Camera;
import com.spacecombat.Component;
import com.spacecombat.GameObject;
import com.spacecombat.Tags;
import com.spacecombat.Util;
import com.spacecombat.Vector2;
import com.spacecombat.ai.AllyAI;
import com.spacecombat.weapons.FlameThrower;
import com.spacecombat.weapons.Laser;
import com.spacecombat.weapons.MachineGun;
import com.spacecombat.weapons.PulseCannon;
import com.spacecombat.weapons.Weapon;
import com.spacecombat.weapons.WeaponController;

import java.util.LinkedList;
import java.util.List;

public class PowerupController extends Component {
	public WeaponController [] weapons = null;
	public boolean createAlly = false;
	public boolean createAllies = false;
	public boolean createGunShip = false;

	public static List<CreateOnLevelLoad> createOnLevelLoad = new LinkedList<CreateOnLevelLoad>();
    public static List<PowerUpOnLevelLoad> powerUpOnLevelLoad = new LinkedList<PowerUpOnLevelLoad>();
    public static List<SetWeaponOnLevelLoad> setWeaponOnLevelLoad = new LinkedList<SetWeaponOnLevelLoad>();

	private class CreateOnLevelLoad
	{
		public CreateOnLevelLoad(String type, String gun)
		{
			this.type=type;
			this.gun=gun;
            this.power=1;
		}
        public int power;
		public String type;
		public String gun;
	}

    private class PowerUpOnLevelLoad
    {
        public PowerUpOnLevelLoad(int weaponController,int weapon,int toLevel)
        {
            this.weaponController = weaponController;
            this.weapon = weapon;
            this.toLevel = toLevel;
        }

        public int toLevel;
        public int weaponController;
        public int weapon;
    }

    private class SetWeaponOnLevelLoad
    {
        public SetWeaponOnLevelLoad(int weaponController,int weapon)
        {
            this.weaponController = weaponController;
            this.weapon = weapon;
        }

        public int weaponController;
        public int weapon;
    }
	
	public PowerupController (final WeaponController [] weapons) {
		if (weapons == null) {
			throw new RuntimeException("can't have null weapons");
		}
		this.weapons = weapons;
	}
	
	private final static int powerUpTag = Tags.powerup;
	@Override
	public void collide(final GameObject whatIHit) {
		if (whatIHit.hasTag(powerUpTag)) {			
			final PowerUp powerUp = (PowerUp) whatIHit.getComponent(PowerUp.class);

			if (powerUp.isUsed)
			{
				return;
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

	@Override
	public void onLevelLoaded () {
        for (CreateOnLevelLoad coll : createOnLevelLoad) {
            GameObject go = GameObject.create(PrefabFactory.createAlly(coll.type, new Vector2(200, Camera.screenSize.y + Camera.mainCamera.gameObject.transform.position.y), coll.type, 5, coll.gun));
            for (int x = 1; x < coll.power; x++) {
                Weapon w = (Weapon) go.getComponent(Laser.class);
                if (w == null) w = (Weapon) go.getComponent(MachineGun.class);
                if (w == null) w = (Weapon) go.getComponent(FlameThrower.class);
                if (w == null) w = (Weapon) go.getComponent(PulseCannon.class);

                //System.out.println(w.getPowerUpType() + " " + w.getPowerLevel());
                if (w != null) {
                    w.powerUp();
                }
            }
        }

        for (PowerUpOnLevelLoad pu : powerUpOnLevelLoad) {
            for (int x = 0; x < this.weapons.length; x++) {
                for (int y = 0; y < weapons[x].weapons.length; y++) {
                    if (x == pu.weaponController && y == pu.weapon) {
                        for (int z = 0; z < pu.toLevel; z++) {
                            this.weapons[x].weapons[y].setPowerLevel(pu.toLevel);
                        }
                    }
                }
            }
        }

        for (SetWeaponOnLevelLoad sw : setWeaponOnLevelLoad) {
            this.weapons[sw.weaponController].selectedWeapon = sw.weapon;
        }
    }

	public void update ()
	{
		if (createAlly) {
            List<GameObject> gos = new LinkedList<GameObject>();
            gos = GameObject.findAllByTags(Tags.allyShip, Tags.shot, gos);
            int numOfAllies = gos.size();
            //System.out.println("NumberOfAllies----"+numOfAllies);
            if (numOfAllies > AllyAI.maxAllies) {
                for (GameObject go : gos) {
                    Weapon w = (Weapon) go.getComponent(Laser.class);
                    if (w == null) w = (Weapon) go.getComponent(MachineGun.class);
                    if (w == null) w = (Weapon) go.getComponent(FlameThrower.class);
                    if (w == null) w = (Weapon) go.getComponent(PulseCannon.class);

                    //System.out.println(w.getPowerUpType() + " " + w.getPowerLevel());
                    if (w != null) {
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
                int type = Util.randomNumber(0, 5);
                int gun = Util.randomNumber(0, 3);

                String sType = "pariah";
                String sGun = "laser";

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

                createOnLevelLoad.add(new CreateOnLevelLoad(sType, sGun));

                //System.out.println("Creating:" + sType + " " + sGun);

                GameObject.create(PrefabFactory.createAlly(sType, new Vector2(200, 1000 + Camera.mainCamera.gameObject.transform.position.y), sType, 5, sGun));
                createAlly = false;
            }
        }
		if (createAllies)
		{
			for (int x = 0; x < 6; x++)
			{
				//System.out.println("creating support!");
				int type = Util.randomNumber(0, 5);
				int gun = Util.randomNumber(4, 5);
				int script = Util.randomNumber(7,9);
				
				int xOffset = Util.randomNumber(0,400)-200;
				int yOffset = Util.randomNumber(0,400);
				
				String sType = "pariah";
				String sGun = "laser";
				
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
			int xOffset = Util.randomNumber(0,400)-200;
			GameObject.create(PrefabFactory.createEscort("Escort", new Vector2(200+xOffset/2,1000+Camera.mainCamera.gameObject.transform.position.y)));
			//System.out.println("GunshipCreated");
			createGunShip = false;
		}
	}
}
