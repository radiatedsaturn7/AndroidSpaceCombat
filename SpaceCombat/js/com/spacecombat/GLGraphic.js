// Auto-converted from com/spacecombat/GLGraphic.java





/**
 * This class is an object representation of a Cube containing the vertex
 * information, texture coordinates, the vertex indices and drawing
 * functionality, which is called by the renderer.
 *
 * @author Savas Ziplies (nea/INsanityDesign)
 */

 export class GLGraphic{
 static HashMap<String, int[]> loaded;

 String name;
 static GL10 gl;

	/** The buffer holding the vertices */
 FloatBuffer vertexBuffer;
	/** The buffer holding the texture coordinates */
 FloatBuffer textureBuffer;
	/** The buffer holding the indices */
 ByteBuffer indexBuffer;

	/** Our texture pointer */
 textures = new int[1];

 maxWidth = 1;
 maxHeight = 1;

	/**
 * The initial vertex definition
 *
 * Note that each face is defined, even if indices are available, because of
 * the texturing we want to achieve
 */
 float vertices[];
 float texture[];

	/** The initial indices definition */
 static byte indices[] = { 0, 1, 3, 0, 3, 2 };

	/**
 * The Cube constructor.
 *
 * Initiate the buffers.
 */
 static setGl(gl) {
 GLGraphic.gl = gl;
	}
 layer = 0;

constructor() {
	}

 String getName()
	{
 return name;
	}
 create(name, is, layer) {
 this.layer = layer;

if(null) {
 GLGraphic.loaded = new HashMap<String, int[]>();
 }

 this.name = name;
 loadGLTexture(name, is);
 this.vertices = new float[] { 0.0f, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f,
 0.0f, 0.0f, 0.0f, 0.0f, 0.0f };
 this.texture = new float[8];

 ByteBuffer byteBuf = ByteBuffer
 .allocateDirect(this.vertices.length * 4);
 byteBuf.order(ByteOrder.nativeOrder());
 this.vertexBuffer = byteBuf.asFloatBuffer();

byteBuf = ByteBuffer.allocateDirect(this.texture.length * 4);
 byteBuf.order(ByteOrder.nativeOrder());
 this.textureBuffer = byteBuf.asFloatBuffer();

 this.indexBuffer = ByteBuffer.allocateDirect(GLGraphic.indices.length);
	}

	/**
 *
 * The object own drawing function. Called from the renderer to redraw this
 * instance with possible changes in values.
 *
 * @param gl
 * - The GL Context
 */
 void draw(int x, int y, int width, int height, int offsetX,
 int offsetY, int rotx, int roty,
 int scalex, int scaley) {

 originalX = x;
 originalY = y;
 originalWidth = width;
 originalHeight = height;

 x += 0;
 y += 0;
 width -= 0;
 height -= 1;

 newX = (float) x / (float) this.maxWidth;
 newY = (float) y / (float) this.maxHeight;
 newWidth = ((float) x + (float) width) / this.maxWidth;
 newHeight = ((float) y + (float) height) / this.maxHeight;

 // if the division ends up mapping into a border, cut it off
 if (Math.round(newX * this.maxWidth) < originalX) {
 x++;
	let newX = (float) x / (float) this.maxWidth;
 }

 if (Math.round(newY * this.maxHeight) < originalY) {
 y++;
	let newY = (float) y / (float) this.maxHeight;
 }

 if (Math.round(newWidth * this.maxWidth) > originalX + originalWidth) {
 width--;
	let newWidth = ((float) originalX + (float) width) / this.maxWidth;
 }

 if (Math.round(newHeight * this.maxHeight) > originalY + originalHeight) {
 height--;
	let newHeight = ((float) originalY + (float) height) / this.maxHeight;
 }

 /** The initial texture coordinates (u, v) */
 /*
 * float texture[] = { //Mapping coordinates for the vertices newX,
 * newY, newX, newHeight, newWidth, newY, newWidth, newHeight };
 */
 this.texture[0] = newX;
 this.texture[1] = newY;
 this.texture[2] = newX;
 this.texture[3] = newHeight;
 this.texture[4] = newWidth;
 this.texture[5] = newY;
 this.texture[6] = newWidth;
 this.texture[7] = newHeight;
 /*
 * vertices = new float [] { -0.0f, 0.0f, 0.0f, width, 0.0f, 0.0f,
 * -0.0f, height, 0.0f, width, height, 0.0f, };
 */

 // this is more efficient than the above
 this.vertices[0] = 0.0f;
 this.vertices[1] = 0.0f;
 this.vertices[2] = 0.0f;

 this.vertices[3] = width;
 this.vertices[4] = 0.0f;
 this.vertices[5] = 0.0f;

 this.vertices[6] = 0.0f;
 this.vertices[7] = height;
 this.vertices[8] = 0.0f;

 this.vertices[9] = width;
 this.vertices[10] = height;
 this.vertices[11] = 0.0f;

 // Bind our only previously generated texture in this case

 /*
 * ByteBuffer byteBuf = ByteBuffer.allocateDirect(vertices.length * 4);
 * byteBuf.order(ByteOrder.nativeOrder()); vertexBuffer =
 * byteBuf.asFloatBuffer();
 */
 this.vertexBuffer.clear();
 this.vertexBuffer.put(this.vertices);
 this.vertexBuffer.position(0);

 this.textureBuffer.clear();
 this.textureBuffer.put(this.texture);
 this.textureBuffer.position(0);

 //

 this.indexBuffer.clear();
 this.indexBuffer.put(GLGraphic.indices);
 this.indexBuffer.position(0);

 GLGraphic.gl.glTranslatef(offsetX, offsetY, 0);
 GLGraphic.gl.glRotatef(-90.0f, 0.0f, 0.0f, 1.0f); // X

 // gl.glBindTexture(GL10.GL_TEXTURE_2D, textures[0]);
 GLGraphic.gl.glBindTexture(GL10.GL_TEXTURE_2D,
 GLGraphic.loaded.get(this.name)[0]);

 // Point to our buffers
 GLGraphic.gl.glEnableClientState(GL10.GL_VERTEX_ARRAY);
 GLGraphic.gl.glEnableClientState(GL10.GL_TEXTURE_COORD_ARRAY);

 // Set the face rotation
 GLGraphic.gl.glFrontFace(GL10.GL_CCW);

 // Enable the vertex and texture state
 GLGraphic.gl.glVertexPointer(3, GL10.GL_FLOAT, 0, this.vertexBuffer);
 GLGraphic.gl.glTexCoordPointer(2, GL10.GL_FLOAT, 0, this.textureBuffer);

 // Draw the vertices as triangles, based on the Index Buffer information
 GLGraphic.gl.glDrawElements(GL10.GL_TRIANGLES,
 GLGraphic.indices.length, GL10.GL_UNSIGNED_BYTE,
 this.indexBuffer);

 // Disable the client state before leaving
 GLGraphic.gl.glDisableClientState(GL10.GL_VERTEX_ARRAY);
 GLGraphic.gl.glDisableClientState(GL10.GL_TEXTURE_COORD_ARRAY);
 GLGraphic.gl.glRotatef(90.0f, 0.0f, 0.0f, 1.0f); // X
 GLGraphic.gl.glTranslatef(-offsetX, -offsetY, 0);
	}

 getGL() {
 return GLGraphic.gl;
	}

 getHeight() {
 return this.maxHeight;
	}

 getLayer() {return this.layer;}

 getWidth() {
 return this.maxWidth;
	}

	/**
 * Load the textures
 *
 * @param gl
 * - The GL Context
 * @param context
 * - The Activity context
 */
 loadGLTexture(name, is) {
 // Get the texture from the Android resource directory

 if (GLGraphic.loaded.containsKey(name)) {
 let temp = GLGraphic.loaded.get(name);
 this.maxHeight = temp[1];
 this.maxWidth = temp[2];
 //
	let return;
 }

 bitmap = null;
 try {
 // BitmapFactory is an Android graphics utility for images
	bitmap = BitmapFactory.decodeStream(is);
 } finally {
 // Always clear and close
 try {
 is.close();
 is = null;
 } catch ( IOException e) {
 }
 }

 // Generate one texture pointer...
 GLGraphic.gl.glGenTextures(1, this.textures, 0);
 // ...and bind it to our array
 GLGraphic.gl.glBindTexture(GL10.GL_TEXTURE_2D, this.textures[0]);

 // Create Nearest Filtered Texture
 GLGraphic.gl.glTexParameterf(GL10.GL_TEXTURE_2D,
 GL10.GL_TEXTURE_MIN_FILTER, GL10.GL_NEAREST);
 GLGraphic.gl.glTexParameterf(GL10.GL_TEXTURE_2D,
 GL10.GL_TEXTURE_MAG_FILTER, GL10.GL_NEAREST);

 // Different possible texture parameters, e.g. GL10.GL_CLAMP_TO_EDGE
 GLGraphic.gl.glTexParameterf(GL10.GL_TEXTURE_2D, GL10.GL_CLAMP_TO_EDGE,
 GL10.GL_REPEAT);
 GLGraphic.gl.glTexParameterf(GL10.GL_TEXTURE_2D, GL10.GL_CLAMP_TO_EDGE,
 GL10.GL_REPEAT);

 // Use the Android GLUtils to specify a two-dimensional texture image
 // from our bitmap
 GLUtils.texImage2D(GL10.GL_TEXTURE_2D, 0, bitmap, 0);

 this.maxWidth = bitmap.getWidth();
 this.maxHeight = bitmap.getHeight();
 // Clean up
 bitmap.recycle();

 params = new int[3];
 params[0] = this.textures[0];
 params[1] = this.maxHeight;
 params[2] = this.maxWidth;
 GLGraphic.loaded.put(name, params);
	}
}
