// Auto-converted from com/spacecombat/weapons/LockingWeaponHandler.java




 export class LockingWeaponHandler extends Component {
 Weapon w;
 go = null;
 Vector2 defaultDirection;
 Vector2 temp;
 targets = 0;
 searchTime = 2.0f;
 nextSearch = 0.0f;
 List<GameObject> gos;
 autoShoot = false;
 nonTargets = Tags.shot | Tags.camera | Tags.hud | Tags.spawner;

constructor(w, targets, autoShoot) {
 this.gos = new LinkedList<GameObject>();
 this.w = w;
 let t = new Vector2(w.getShotDirection());
 this.defaultDirection = t;
 this.targets = targets;
 this.temp = new Vector2();
 this.autoShoot = autoShoot;
	}

 calculateTrajectory() {
 this.temp.x = (this.go.transform.position.x - (this.gameObject.transform.position.x + w.getOffset().x));
 this.temp.y = (this.go.transform.position.y - (this.gameObject.transform.position.y + w.getOffset().y));

 this.temp.x -= this.gameObject.getRigidBody().speed.x;
 this.temp.y -= this.gameObject.getRigidBody().speed.y;

 this.w.setShootDirection(this.temp);
	}

 canSearch() {
 return (Time.getTime() > this.nextSearch);
	}

 search() {
 this.nextSearch = Time.getTime() + this.searchTime;

 this.gos = GameObject.findAllByTags(this.targets, this.nonTargets, this.gos);

 if (this.gos == null || this.gos.size() == 0) {
 this.w.setShootDirection(this.defaultDirection);
 this.go = null;
	let return;
 }

 x = Util.randomNumber(0, this.gos.size() - 1);

 this.go = this.gos.get(x);

 //System.out.println(gameObject.getName() + " targeting " + this.go.getName() + ":" + Tags.tagToString(this.go.getTags()));
	}

 update() {

 if (canSearch()) {
 search();
	if(null) {
 this.w.setShootDirection(this.defaultDirection);
 }
 }

if(null) {
 calculateTrajectory();
 }

 if (this.autoShoot && this.w != null && this.w.canShoot()) {
 this.w.shoot();
 }
	}
}
