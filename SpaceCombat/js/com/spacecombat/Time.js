// Auto-converted from com/spacecombat/Time.java


 export class Time {
 currentTime = 0;
 deltaTime = 0;
 lastTime = 0;
 isPaused = true;

 static getDeltaTime() {
 return Time.deltaTime;
	}

 static getTime() {
 return Time.currentTime;
	}

 static tick() {
 Time.currentTime = System.nanoTime() / 1000000000.0f;
 if (isPaused)
 {
 Time.lastTime = Time.currentTime;
 }

 Time.deltaTime = Time.currentTime - Time.lastTime;
 Time.lastTime = Time.currentTime;
	}

 static void pause ()
	{
isPaused = true;
	}

 static void unPause ()
	{
isPaused = false;
	}
}
