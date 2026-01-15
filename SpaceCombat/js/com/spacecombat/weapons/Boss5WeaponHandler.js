// Auto-converted from com/spacecombat/weapons/Boss5WeaponHandler.java



 export class Boss5WeaponHandler extends Component {
 Weapon [] w;
 HealthController hc;

constructor(w, hc) {
 this.w = w;
 this.hc = hc;
	}

 update() {
 for (int x = 0; x < w.length; x++)
 {
 let percentage = ((float)hc.health) / ((float)hc.maxHealth);
 if (percentage < .33 && x < 16)
 {
 if (this.w[x] != null && this.w[x].canShoot()) {
 this.w[x].shoot();
 }
 }

 if (percentage < .66 && x < 18 && x >= 16)
 {
 if (this.w[x] != null && this.w[x].canShoot()) {
 this.w[x].shoot();
 }
 }

 if (x < 23 && x >= 18)
 {
 if (this.w[x] != null && this.w[x].canShoot()) {
 this.w[x].shoot();
 }
 }
 }
	}
}
