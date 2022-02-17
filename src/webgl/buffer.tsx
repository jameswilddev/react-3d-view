import { Gl } from "./constants";
import type { Context } from "./context";
import { Resource } from "./resource";

/**
 * A WebGL buffer, for either vertices or indices.
 */
export abstract class Buffer extends Resource<null | WebGLBuffer> {
  /**
   * Creates a new WebGL buffer, for either vertices or indices.
   * @param context The context under which the buffer will be created.
   * @param target The binding target of the buffer to create.
   */
  constructor(
    context: Context,
    private readonly target: Gl.ArrayBuffer | Gl.ElementArrayBuffer
  ) {
    super(context);
  }

  protected createInstance(gl: WebGLRenderingContext): WebGLBuffer | null {
    const data = this.generateData();

    if (data.byteLength === 0) {
      throw new Error(`Buffers cannot be empty.`);
    }

    const buffer = gl.createBuffer();

    gl.bindBuffer(this.target, buffer);
    gl.bufferData(this.target, data, Gl.StaticDraw);

    return buffer;
  }

  protected deleteInstance(
    gl: WebGLRenderingContext,
    instance: WebGLBuffer | null
  ): void {
    gl.bindBuffer(this.target, null);
    gl.deleteBuffer(instance);
  }

  /**
   * Implement to define the contents of the buffer.  This may be called multiple times if the context is lost and then recovered.  Cannot be empty.
   */
  protected abstract generateData(): BufferSource;
}
