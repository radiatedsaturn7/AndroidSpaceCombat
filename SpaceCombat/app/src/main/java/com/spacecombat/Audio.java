package com.spacecombat;

import android.content.Context;
import android.media.MediaPlayer;

public class Audio extends Component 
{
	private MediaPlayer mediaPlayer;
	private String name;
	private boolean audioDisabled = false;
	public Audio (MediaPlayer mp, String n)
	{
		if (mp == null)
		{
			throw new RuntimeException("MP can't be null!");
		}
		mediaPlayer = mp;
		name = n;
	}
	
	public void play()
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
	
	public void playOnce()
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
	
	public void pause()
	{
		mediaPlayer.pause();
	}
	
	public void stop()
	{
		mediaPlayer.pause();
		mediaPlayer.seekTo(0);
	}
	
	public void destroy()
	{
		if (mediaPlayer != null)
		{
			mediaPlayer.release();
			mediaPlayer = null;
		}
	}
}
