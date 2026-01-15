// Auto-converted from com/spacecombat/weapons/WeaponHandler.java



 export class WeaponHandler extends Component {
 Weapon w;

constructor(w) {
 this.w = w;
	}

 update() {
 if (this.w != null && this.w.canShoot()) {
 this.w.shoot();
 }
	}
}
