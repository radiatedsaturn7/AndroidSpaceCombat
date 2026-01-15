// Auto-converted from com/spacecombat/TextAnimation.java


 export class TextAnimation extends Component
{
 GenericText text;
 constructor ( GenericText text)
	{
 this.text = text;
	}

 void setText (String s)
	{
 text.setText(s);
	}

 void draw ()
	{
 this.text.draw(
 (int) (this.gameObject.transform.position.x-Camera.mainCamera.gameObject.transform.position.x),
 (int) (this.gameObject.transform.position.y-Camera.mainCamera.gameObject.transform.position.y),
 (int) this.gameObject.transform.rotation.x,
 (int) this.gameObject.transform.rotation.y,
 (int) this.gameObject.transform.scale.x,
 (int) this.gameObject.transform.scale.y);
	}
}
