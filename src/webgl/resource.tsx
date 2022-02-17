import type { Context } from "./context";

/**
 * A WebGL resource.
 * @template TInstance The information created when the resource is instantiated.
 */
export abstract class Resource<TInstance> {
  private disposed = false;
  private instance: null | TInstance = null;
  private timesContextResourcedWhenInstanceCreated = 0;

  /**
   * Creates a new WebGL resource.
   * @param context The context under which the resource will be created.
   */
  constructor(protected readonly context: Context) {}

  /**
   * Permanently destroys the WebGL resource, freeing its resources and preventing its further use.
   */
  dispose(): void {
    this.throwIfDisposed();

    this.disposed = true;

    if (
      this.instance !== null &&
      this.timesContextResourcedWhenInstanceCreated ===
        this.context._timesContextRestored
    ) {
      this.deleteInstance(this.context._gl, this.instance);
      this.instance = null;
    }
  }

  /**
   * Throws an error if this resource has been disposed.
   * @throws When this resource has been disposed.
   */
  throwIfDisposed(): void {
    if (this.disposed) {
      throw new Error(`Unable to interact with a disposed resource.`);
    }
  }

  /**
   * Throws an error if this resource is not of a given context.
   * @param resource The resource against which to check this resource.
   * @throws When this resource is not of the given context.
   */
  throwIfFromAnotherContext(resource: Resource<unknown>): void {
    this.throwIfDisposed();

    if (this.context !== resource.context) {
      throw new Error(`Unable to interact with resources from other contexts.`);
    }
  }

  /**
   * Call to get the current instance, creating it if it has not been created before, and recreating it if context loss has been recovered from.
   * @returns The current instance, if any, otherwise, null (e.g. if context loss has occurred).
   */
  protected getInstance(): null | TInstance {
    this.throwIfDisposed();

    if (
      this.instance === null ||
      this.timesContextResourcedWhenInstanceCreated !==
        this.context._timesContextRestored
    ) {
      if (this.context._gl.isContextLost()) {
        this.instance = null;

        return null;
      } else {
        this.timesContextResourcedWhenInstanceCreated =
          this.context._timesContextRestored;

        this.instance = this.createInstance(this.context._gl);

        return this.instance;
      }
    } else {
      return this.instance;
    }
  }

  /**
   * Creates a new instance of this resource.  Will normally be called before the first use.  May be called again following recovery of a lost context.
   * @param gl The WebGL rendering context to use to create the instance of this resource.
   */
  protected abstract createInstance(gl: WebGLRenderingContext): TInstance;

  /**
   * Deletes a previously created instance of this resource.  Will normally be called during disposal.
   * @param gl The WebGL rendering context to use to delete the instance of this resource.
   * @param instance The instance of this resource to delete.
   */
  protected abstract deleteInstance(
    gl: WebGLRenderingContext,
    instance: TInstance
  ): void;
}
