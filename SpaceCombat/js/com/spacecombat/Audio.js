// Auto-converted from com/spacecombat/Audio.java



 export class Audio extends Component
{
 MediaPlayer mediaPlayer;
 String name;
 audioDisabled = false;
 constructor (MediaPlayer mp, String n)
	{
 if (mp == null)
 {
 throw new RuntimeException("MP can't be null!");
 }
mediaPlayer = mp;
name = n;
	}

 void play()
	{
 if (audioDisabled)
 return;
 if (!mediaPlayer.isPlaying())
 {
 mediaPlayer.seekTo(0);
 mediaPlayer.setLooping(true);
 mediaPlayer.start();
 }
	}

 void playOnce()
	{
 if (audioDisabled)
 return;
 if (!mediaPlayer.isPlaying())
 {
 //mediaPlayer.seekTo(0);
 mediaPlayer.setLooping(false);
 mediaPlayer.start();
 }
	}

 void pause()
	{
 mediaPlayer.pause();
	}

 void stop()
	{
 mediaPlayer.pause();
 mediaPlayer.seekTo(0);
	}

 void destroy()
	{
 if (mediaPlayer != null)
 {
 mediaPlayer.release();
	mediaPlayer = null;
 }
	}
}
