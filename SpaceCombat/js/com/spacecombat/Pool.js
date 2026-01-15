// Auto-converted from com/spacecombat/Pool.java



 export class Pool {

 pool = null;
 boolean [] used;
 Class<? extends Poolable> poolableType;

 void init ( Class<? extends Poolable> type, int size)
	{
 this.used = new boolean[size];
 this.pool = new Poolable[size];

 this.poolableType = type;
 for (int x = 0; x < size; x++)
 {
 try {
 this.pool[x]=(this.poolableType.newInstance());
 this.used[x] = false;
 this.pool[x].setPoolId(x);
 } catch ( InstantiationException e) {
 throw new RuntimeException(e);
 } catch ( IllegalAccessException e) {
 throw new RuntimeException(e);
 }
 }
 //System.out.println("Pool initialized:"+type.getSimpleName() + " " + this.pool.length);
	}

 void release (Poolable p)
	{
 try
 {
 this.used[p.getPoolId()] = false;
 }
 catch (Exception e)
 {
 throw new RuntimeException("POOL IS CORRUPT:" + poolableType.getSimpleName() + " " + this.pool.length + " thought this existed:" + p.getPoolId());
 }
	}


 lastX = 0;
 Poolable retreive ()
	{
 //loop around the pool so each time we retrieve,
 //we don't hit stuff that is already used
 finish = lastX - 1;
 if (finish < 0)
 {
	finish = this.pool.length;
 }

 for (int x = lastX; x != finish; x++)
 {
 if (x == pool.length)
 {
 x = 0;
 if (x == finish)
 {
 break;
 }
 }

 if (!this.used[x])
 {
 //we hit something, so the next one is probably free
 lastX = x + 1;
 this.used[x] = true;
 this.pool[x].clean();
 return this.pool[x];
 }
 }

 //grow pool
 newUsed = new boolean[this.used.length + this.used.length / 4];
 newPool = new Poolable[newUsed.length];

 for (int x = 0; x < used.length; x++)
 {
 newUsed[x] = used[x];
 newPool[x] = pool[x];
 }

 try
 {
 for (int x = used.length; x < newUsed.length; x++)
 {
 newPool[x]=(this.poolableType.newInstance());
 newUsed[x] = false;
 newPool[x].setPoolId(x);
 }
 } catch ( InstantiationException e) {
 throw new RuntimeException(e);
 } catch ( IllegalAccessException e) {
 throw new RuntimeException(e);
 }

 this.used = newUsed;
 this.pool = newPool;

lastX = used.length;

 return retreive();
	}

 void printPool ()
	{
 used = 0;
 free = 0;
 total = 0;

 for (int x = 0; x < this.pool.length; x++)
 {
 total++;
 if (this.used[x])
 {
 used++;
 }
 else
 {
 free++;
 }
 }

 //System.out.println("POOL:" + used + "/" + total + " ("+free+ "left)");
	}
}
