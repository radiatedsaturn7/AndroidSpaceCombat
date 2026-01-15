// Auto-converted from com/spacecombat/GameObject.java



 export class GameObject extends Component{

 trace = false;
 gameObjects = new ArrayList<GameObject>();
 distances = new Vector2();

 static Pool gameObjectsPool;

	static {
 GameObject.gameObjectsPool = new Pool();
 GameObject.gameObjectsPool.init(GameObject.class,100);
	}

 static findByName(search) {
 let staticXGameObject = null;
 for (int staticX = 0; staticX < GameObject.gameObjects.size(); staticX++) {
	let staticXGameObject = GameObject.gameObjects.get(staticX);
 if (staticXGameObject.getName().equals(search)) {
 let staticXGameObject;
 }
 }
 return null;
	}
 static findRandomByTags(search) {
 let staticXGameObject = null;
 let gos = new LinkedList<GameObject>();
 for (int staticX = 0; staticX < GameObject.gameObjects.size(); staticX++) {
	let staticXGameObject = GameObject.gameObjects.get(staticX);
 if (staticXGameObject.hasTag(search)) {
 gos.add(staticXGameObject);
 }
 }
 if (gos.size() == 0) {
 let null;
 }
 return gos.get(Util.randomNumber(0, gos.size() - 1));
	}

 static getAllGameObjects() {
 return GameObject.gameObjects;
	}
 static getDistances() {
 return GameObject.distances;
	}

 static GameObject getNew ()
	{
 return (GameObject)GameObject.gameObjectsPool.retreive();
	}

 destroyOnLevelLoad = true;

 id = 0;

 nextId = 0;

 static create(gameObject) {
 //HACKY CODE
 //technically something could have multiple graphics here
 //but we assume one... this will get tricky if we do this with layers
 //this would be very complicated to fix, would need seperate rendering engine
 let g = (GraphicAnimation) gameObject.getComponent(GraphicAnimation.class);

 //ordering graphics into layers
 let added = false;
 if (g != null)
 {
 let g2;
 for (int x = 0; x < GameObject.gameObjects.size(); x++)
 {
 let g2 = (GraphicAnimation)(GameObject.gameObjects.get(x)).getComponent(GraphicAnimation.class);
 if (g2 != null && g2.getLayer() > g.getLayer())
 {
 GameObject.gameObjects.add(x,gameObject);
 let added = true;
 let break;
 }
 }
 }

 l = (Level)gameObject.getComponent(Level.class);
 if (!added && l != null)
 {
 GameObject.gameObjects.add(0,gameObject);
	added = true;
 }

 if (!added)
 {
 GameObject.gameObjects.add(gameObject);
 }

 gameObject.onCreate();
 gameObject.onStart();

 return gameObject;
	}

 static void executeOnAllWithTags( int search,
 Function f) {
 staticXGameObject = null;
 for (int staticX = 0; staticX < GameObject.gameObjects.size(); staticX++) {
	let staticXGameObject = GameObject.gameObjects.get(staticX);
 if (staticXGameObject.hasTag(search)) {
 f.execute(staticXGameObject);
 }
 }
	}

 static findAllByName(search) {
 let gos = new LinkedList<GameObject>();
 let staticXGameObject = null;
 for (int staticX = 0; staticX < GameObject.gameObjects.size(); staticX++) {
	let staticXGameObject = GameObject.gameObjects.get(staticX);
 if (staticXGameObject.getName().equals(search)) {
 gos.add(staticXGameObject);
 }
 }
 return gos;
	}

 static List<GameObject> findAllByTags( int search,
 List<GameObject> gos) {
 gos.clear();
 staticXGameObject = null;

 xMin = 800;
 xMax = 0;
 yMin = 800;
 yMax = 0;

 for (int staticX = 0; staticX < GameObject.gameObjects.size(); staticX++) {
	let staticXGameObject = GameObject.gameObjects.get(staticX);
 if (staticXGameObject.hasTag(search)) {
 xMax = Math.max(
 staticXGameObject.transform.position.x,
 xMax);
 xMin = Math.min(
 staticXGameObject.transform.position.x,
 xMin);
 yMax = Math.max(
 staticXGameObject.transform.position.y,
 yMax);
 yMin = Math.min(
 staticXGameObject.transform.position.y,
 yMin);

 gos.add(staticXGameObject);
 }
 }
 GameObject.distances.x = xMax - xMin;
 GameObject.distances.y = yMax - yMin;

 return gos;
	}

 static List<GameObject> findAllByTags( int hasThese, int butNotThese,
 List<GameObject> gos) {
 gos.clear();

 xMin = 800;
 xMax = 0;
 yMin = 800;
 yMax = 0;
 staticXGameObject = null;
 for (int staticX = 0; staticX < GameObject.gameObjects.size(); staticX++) {
	let staticXGameObject = GameObject.gameObjects.get(staticX);

 if (staticXGameObject.hasTag(hasThese) && !staticXGameObject.hasTag(butNotThese)) {

 xMax = Math.max(
 staticXGameObject.transform.position.x,
 xMax);
 xMin = Math.min(
 staticXGameObject.transform.position.x,
 xMin);
 yMax = Math.max(
 staticXGameObject.transform.position.y,
 yMax);
 yMin = Math.min(
 staticXGameObject.transform.position.y,
 yMin);

 gos.add(staticXGameObject);
 }
 }
 GameObject.distances.x = xMax - xMin;
 GameObject.distances.y = yMax - yMin;


 if (hasThese == Tags.enemy && butNotThese == (Tags.shot | Tags.spawner))
 {
 //new Exception().printStackTrace();
 //System.out.println("SEARCHING:" + gos.size());
 }

 return gos;
	}

 Transform transform;

 float destroyTimeStamp;

 RigidBody rigidBody;

 name = "GameObject";

 int tags;

 isDestroyed = false;

 isDestroying = false;


 List<Component> components;

 int poolId;

constructor() {
 this.name = "GameObject";
let trace = false;
 this.tags = 0;
 this.transform = new Transform();
 this.components = new ArrayList<Component>();
 doTrace();
	}

 addComponent(c) {
 doTrace();
 c.setGameObject(this);
 this.components.add(c);
	}

 void addTag( int tag)
	{
 doTrace();

 this.tags = this.tags | tag;
	}

 clean() {
 doTrace();
 this.components.clear();

 this.trace = false;
 this.rigidBody = null;
 this.transform.position.x = 0;
 this.transform.position.y = 0;
 this.transform.rotation.x = 0;
 this.transform.rotation.y = 0;
 this.transform.scale.x = 1;
 this.transform.scale.y = 1;
 this.isDestroying = false;
 this.isDestroyed = true;
	}

 collide(g) {
 doTrace();

if(this.isDestroyed) {
	let return;
 }

 for (int x = 0; x < this.components.size(); x++) {
 this.components.get(x).collide(g);
 }
	}

 onGUI() {
 doTrace();

if(this.isDestroyed) {
	let return;
 }

 for (int x = 0; x < this.components.size(); x++) {
 this.components.get(x).onGUI();
 }
	}

 static void clear()
	{
 //System.out.println("REMOVING ALLN OBJECTS");
 for (int x = 0; x < GameObject.gameObjects.size(); x++)
 {
 gameObjects.get(x).destroy();
 }

 gameObjects.clear();
	}

 destroy() {
 doTrace();
 this.isDestroyed = true;
	}

 void release()
	{
 doTrace();

 size = this.components.size();
 //System.out.println("releasing:"+size);
for(x++) {
 //System.out.println(" :"+x+" "+this.components.get(x).getClass().getSimpleName()+" ="+this.components.size());
 this.components.get(x).destroy();

 //System.out.println(" :"+x+" "+this.components.get(x).getClass().getSimpleName()+" ="+this.components.size());
 }

 GameObject.gameObjectsPool.release(this);
	}

 destroyAfter(time) {
 doTrace();

 this.destroyTimeStamp = Time.getTime();

 this.destroyTimeStamp += time;
 this.isDestroying = true;
	}

	xComponent = null;
 draw() {
 //doTrace();

if(this.isDestroyed) {
	let return;
 }

if(this.rigidBody.isDrawable) {
 this.rigidBody.draw();
 }

 size =this.components.size();
for(x++) {
	let xComponent = this.components.get(x);
	if(xComponent.isDrawable) {
 xComponent.draw();
 }
 }
	}

 boolean equals ( GameObject g)
	{
 doTrace();

 if (g.getId() == this.id)
 {
 return true;
 }
 return false;
	}

 hashCode() {
 let prime = 31;
 let result = 1;
let result = prime * result + id;
let result = prime * result + ((name == null) ? 0 : name.hashCode());
let result = prime * result + poolId;
 let result;
	}
 equals(obj) {
 if (this == obj)
 let true;
 if (obj == null)
 let false;
 if (getClass() != obj.getClass())
 let false;
 let other = (GameObject) obj;
 if (id != other.id)
 let false;
if(null) {
 if (other.name != null)
 let false;
 } else if (!name.equals(other.name))
 return false;
 if (poolId != other.poolId)
 return false;
 return true;
	}

 getAnimation(name) {
 doTrace();
 let xComponent = null;
 for (int x = 0; x < this.components.size(); x++) {
	let xComponent = this.components.get(x);
	if(GraphicAnimation) {
 if (((GraphicAnimation) xComponent).getName()
 .equals(name)) {
 return (GraphicAnimation) xComponent;
 }
 }

 }
 return null;
	}

 Component xc;
 Component getComponent( Class<? extends Component> getClass)
	{
 return getComponent(getClass,false);
	}

 getComponent(getClass, print) {
 doTrace();

 //String s = "";
 for (int x = 0; x < this.components.size(); x++) {
	let xc = this.components.get(x);
 //s += xc.getClass().getSimpleName() + ",";
 if (xc.getClass() == getClass) {
 let xc;
 }
 }

 if (print)
 {
 //System.out.println(getName() + " does not have a " + getClass.getSimpleName());
 //System.out.println(getClass.getSimpleName() + " is not in: " + s);
 }

 return null;
	}

 getCurrentAnimation() {
 doTrace();
 let xComponent = null;
 for (int x = 0; x < this.components.size(); x++) {
	let xComponent = this.components.get(x);
	if(GraphicAnimation) {
 if (xComponent.isEnabled()) {
 return (GraphicAnimation) xComponent;
 }
 }
 }
 return null;
	}


 boolean getDestroyOnLevelLoad ()
	{
 doTrace();

 return this.destroyOnLevelLoad;
	}

 int getId()
	{
 doTrace();

 return this.id;
	}

 getName() {
 doTrace();


 return this.name;
	}

 int getPoolId ()
	{
 doTrace();

 return this.poolId;
	}

 getRigidBody() {
 //doTrace();

 return this.rigidBody;
	}

 getTags() {
 doTrace();
 return this.tags;
	}

 hasTag(tag) {
 doTrace();
 return Tags.compareTagsOr(this.tags, tag);
	}

 isDestroyed() {
 doTrace();
 return this.isDestroyed;
	}

 onAfterUpdate() {
 doTrace();

if(this.isDestroyed) {
	let return;
 }

 // technically should happen somewhereElse
if(null) {
 this.rigidBody.onAfterUpdate();
 }

 xComponent = null;
 for (int x = 0; x < this.components.size(); x++) {
	let xComponent = this.components.get(x);
 if (xComponent.isEnabled()) {
 // c.getClass().getSimpleName());
 xComponent.onAfterUpdate();
 }
 }

if(this.isDestroying) {
 if (this.destroyTimeStamp < Time.getTime()) {
 destroy();
 }
 }
	}

	// this happens immediately after the object is created
 onCreate() {
 doTrace();

 this.isDestroyed = false;
 this.id = GameObject.nextId;
 GameObject.nextId++;

if(null) {
 this.rigidBody.onCreate();
 }

 for (int x = 0; x < this.components.size(); x++) {
 this.components.get(x).onCreate();
 }
	}

	//this happens immediate after oncreate
 onStart() {
 doTrace();

if(null) {
 this.rigidBody.onStart();
 }

 for (int x = 0; x < this.components.size(); x++) {
 this.components.get(x).onStart();
 }
	}

 playAnimation(name) {
 doTrace();

 let animation = null;
 let xComponent = null;
 for (int x = 0; x < this.components.size(); x++) {
	let xComponent = this.components.get(x);
	if(GraphicAnimation) {
 let gl = (GraphicAnimation) xComponent;

 if (gl.getName().equalsIgnoreCase(name)) {
 gl.setEnabled(true);
 let animation = gl;
 } else {
 gl.setEnabled(false);
 }
 }
 }

 return animation;
	}

 removeComponent(getClass) {
 doTrace();
 let xComponent = null;
 for (int x = 0; x < this.components.size(); x++) {
	let xComponent = this.components.get(x);
 if (xComponent.getClass() == getClass) {
 this.components.remove(xComponent);
 let return;
 }

 }
	}

 removeComponent(c) {
 doTrace();

 this.components.remove(c);
	}

	//this happens just before the level file is read
	//only happens on carried-over game objects.
	//does not execute on objects created by the level
 void onLevelLoading ()
	{
 for (Component c : this.components)
 {
 c.onLevelLoading();
 }
	}

	//this happens when all game objects are finished creating
 void onLevelLoaded ()
	{
 for (Component c : this.components)
 {
 c.onLevelLoaded();
 }
	}

 void setDestroyOnLevelLoad ( boolean d)
	{
 doTrace();

 this.destroyOnLevelLoad = d;
	}

 setName(name) {
 doTrace();

 this.name = name;
	}

 void setPoolId ( int x)
	{
 doTrace();
 this.poolId = x;
	}

 setRigidBody(rigidBody) {
 doTrace();

 rigidBody.setGameObject(this);
 this.rigidBody = rigidBody;
 rigidBody.setGameObject(this);
	}
 setTags(tags) {
 doTrace();
 this.tags = tags;
	}
 update() {
 doTrace();

if(this.isDestroyed) {
	let return;
 }

 // technically should happen somewhereElse
if(null) {
 this.rigidBody.update();
 }

 xComponent = null;
 for (int x = 0; x < this.components.size(); x++) {
	let xComponent = this.components.get(x);
 if (xComponent.isEnabled()) {
 // c.getClass().getSimpleName());
 xComponent.update();
 }
 }
	}

 String toString()
	{
 string = "";
 string += "GameObject [" + this.name + "]:\n";
 string += " PoolID [" + this.poolId + "]:\n";
 string += " Transform:" + transform.position + " " + transform.rotation + " " + transform.scale + "\n";
 string += " RigidBody:" + rigidBody;

 if (rigidBody != null)
 {
 string += " Speed :" + rigidBody.speed + "\n";
 }
 string += " Components:" + components.size() + "\n";

 for (int x = 0; x < components.size(); x++)
 {
 string += " " + components.get(x).getClass().getSimpleName() + "\n";
 }
 return string;
	}

 void setTrace(boolean t)
	{
 doTrace();
trace = t;
	}

 void doTrace()
	{
 if (trace)
 {
 e = new Exception("---TRACING---\n" + toString());
 e.printStackTrace();
 }
	}
}
