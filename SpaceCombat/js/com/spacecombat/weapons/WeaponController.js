// Auto-converted from com/spacecombat/weapons/WeaponController.java



 export class WeaponController extends Component{
 Weapon [] weapons;
 selectedWeapon = 0;

 nextWeaponSelect = 0.0f;
 weaponSelectTime = 1.0f;


 constructor ( int x, Weapon [] weapons)
	{
 this.selectedWeapon = x;
 this.weapons = weapons;
 Input.subscribeListener(this);
	}

 void destroy ()
	{
 Input.unsubscribeListener(this);
	}

 Weapon getSelectedWeapon()
	{
 return this.weapons[this.selectedWeapon];
	}

 void onClick( float x, float y)
	{
 /*
 if (Time.getTime() < this.nextWeaponSelect)
 {
 return;
 }

 if (y > 700)
 {
 this.nextWeaponSelect = this.weaponSelectTime + Time.getTime();

 this.selectedWeapon++;
 if (this.selectedWeapon >= this.weapons.length)
 {
 this.selectedWeapon = 0;
 }

 for (int z = 0; z < this.weapons.length; z++)
 {
 this.weapons[z].setEnabled(false);
 }

 this.weapons[this.selectedWeapon].setEnabled(true);
 }
 */
	}
}
