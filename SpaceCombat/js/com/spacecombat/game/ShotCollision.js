// Auto-converted from com/spacecombat/game/ShotCollision.java




 export class ShotCollision extends Component {
 damage = 1;


 collide(whatIHit) {

 if (whatIHit.getName().equalsIgnoreCase("topOfScreen") || whatIHit.hasTag(Tags.topOfScreen | Tags.shot | Tags.node |Tags.powerup | Tags.dying))
 {
	let return;
 }

 if (!(whatIHit.hasTag(this.gameObject.getTags()))) {
 this.gameObject.destroy();
 }
	}

 getDamage() {
 return this.damage;
	}

 setDamage(damage) {
 this.damage = damage;
	}
}
