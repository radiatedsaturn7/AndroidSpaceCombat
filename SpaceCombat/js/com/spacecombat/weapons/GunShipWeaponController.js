// Auto-converted from com/spacecombat/weapons/GunShipWeaponController.java



 export class GunShipWeaponController extends Component {
 Weapon [] w;

constructor(w) {
 this.w = w;
	}

 update() {
 for (int x = 0; x < w.length; x++)
 {
 if (this.w[x] != null && this.w[x].canShoot()) {
 this.w[x].shoot();
 }
 }
	}
}
