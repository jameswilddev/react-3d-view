/**
 * Creates and manages a WebGL context.
 */
export class Context {
  /**
   * The WebGL context, if any, otherwise null.  May be experiencing context loss.
   */
  readonly _gl: null | WebGLRenderingContext;

  /**
   * The number of times that the WebGL context has been restored.
   */
  _timesContextRestored = 0;

  /**
   * Creates and manages a WebGL context.
   * @param canvas The canvas for which to create and manage a WebGL context.
   * @param options The options to use when creating the WebGL context.
   * @param onRefresh Executed when a refresh of the display is known to be necessary, e.g. when the context is restored or the element is resized.
   */
  constructor(
    canvas: HTMLCanvasElement,
    options: WebGLContextAttributes,
    onRefresh: () => void
  ) {
    this._gl =
      canvas.getContext(`webgl`, options) ??
      (canvas.getContext(
        `experimental-webgl`,
        options
      ) as null | WebGLRenderingContext);

    if (this._gl !== null) {
      canvas.addEventListener(`webglcontextlost`, (event) => {
        event.preventDefault();
      });

      canvas.addEventListener(`webglcontextrestored`, () => {
        this._timesContextRestored++;
        onRefresh();
      });

      if (typeof ResizeObserver !== `undefined`) {
        const resizeObserver = new ResizeObserver(onRefresh);

        resizeObserver.observe(canvas);
      }
    }
  }
}
