import { attributePrimitiveBytes } from "./attribute-primitive-bytes";
import { attributePrimitiveTypes } from "./attribute-primitive-types";
import type { AttributeSet } from "./attribute-set";
import type { AttributeSetItem } from "./attribute-set-item";
import type { AttributeValue } from "./attribute-value";
import { Buffer } from "./buffer";
import { Gl } from "./constants";
import type { Context } from "./context";
import { shaderPrimitiveArities } from "./shader-primitive-arities";

type Attribute = {
  readonly size: number;
  readonly type:
    | Gl.Byte
    | Gl.Short
    | Gl.UnsignedByte
    | Gl.UnsignedShort
    | Gl.Float;
  readonly normalized: boolean;
  readonly offset: number;
};

/**
 * A buffer of vertex attributes.
 * @template TAttributeSet The attribute set contained within the vertex buffer.
 */
export abstract class VertexBuffer<
  TAttributeSet extends AttributeSet
> extends Buffer {
  readonly _attributes: {
    readonly [key in keyof TAttributeSet]: Attribute;
  };

  readonly _stride: number;

  /**
   * Creates a new buffer of vertex attributes.
   * @param context The context under which the buffer will be created.
   * @param attributeSet The attribute contained within the vertex buffer.
   */
  constructor(context: Context, attributeSet: AttributeSet) {
    super(context, Gl.ArrayBuffer);

    let offset = 0;
    const attributes: { [key in keyof TAttributeSet]?: Attribute } = {};

    const sizes: number[] = [];

    for (const key in attributeSet) {
      const attribute = attributeSet[key] as AttributeSetItem;

      attributes[key as keyof TAttributeSet] = {
        size: shaderPrimitiveArities[attribute.shaderPrimitive],
        type: attributePrimitiveTypes[attribute.attributePrimitive],
        normalized:
          attribute.attributePrimitive === `f32` ? false : attribute.normalized,
        offset,
      };

      const bytes = attributePrimitiveBytes[attribute.attributePrimitive];

      if (!sizes.includes(bytes)) {
        sizes.push(bytes);
      }

      offset += shaderPrimitiveArities[attribute.shaderPrimitive] * bytes;
    }

    this._attributes = attributes as {
      readonly [key in keyof TAttributeSet]: Attribute;
    };

    while (sizes.some((size) => offset % size !== 0)) {
      offset++;
    }

    this._stride = offset;
  }

  protected generateData(): BufferSource {
    const vertices = this.generateVertices();

    const scratch = new ArrayBuffer(4);
    const u8Scratch = new Uint8Array(scratch);
    const s8Scratch = new Int8Array(scratch);
    const u16Scratch = new Uint16Array(scratch);
    const s16Scratch = new Int16Array(scratch);
    const f32Scratch = new Float32Array(scratch);

    const bytes = new Uint8Array(vertices.length * this._stride);

    let progress = 0;

    for (const vertex of vertices) {
      for (const key in this._attributes) {
        const attribute = this._attributes[key];

        const value = vertex[key];

        const adjustedValue = Array.isArray(value) ? value : [value];

        let subProgress = progress + attribute.offset;

        for (const axis of adjustedValue) {
          if (Number.isNaN(axis)) {
            throw new Error(`Vertex attributes cannot contain NaN.`);
          } else if (!Number.isFinite(axis)) {
            throw new Error(
              `Vertex attributes can only contain finite values.`
            );
          } else {
            if (attribute.type !== Gl.Float) {
              if (!Number.isInteger(axis)) {
                throw new Error(
                  `Non-float vertex attributes can only contain integer values.`
                );
              }
            }

            switch (attribute.type) {
              case Gl.UnsignedByte:
                if (axis < 0) {
                  throw new Error(
                    `Unsigned byte vertex attributes cannot contain values less than 0.`
                  );
                } else if (axis > 255) {
                  throw new Error(
                    `Unsigned byte vertex attributes cannot contain values greater than 255.`
                  );
                } else {
                  bytes[subProgress++] = axis;
                }
                break;
              case Gl.Byte:
                if (axis < -128) {
                  throw new Error(
                    `Signed byte vertex attributes cannot contain values less than -128.`
                  );
                } else if (axis > 127) {
                  throw new Error(
                    `Signed byte vertex attributes cannot contain values greater than 127.`
                  );
                } else {
                  s8Scratch[0] = axis;
                  bytes[subProgress++] = u8Scratch[0] as number;
                }
                break;
              case Gl.UnsignedShort:
                if (value < 0) {
                  throw new Error(
                    `Unsigned short vertex attributes cannot contain values less than 0.`
                  );
                } else if (value > 65535) {
                  throw new Error(
                    `Unsigned short vertex attributes cannot contain values greater than 65535.`
                  );
                } else {
                  u16Scratch[0] = axis;
                  bytes[subProgress++] = u8Scratch[0] as number;
                  bytes[subProgress++] = u8Scratch[1] as number;
                }
                break;
              case Gl.Short:
                if (value < -32768) {
                  throw new Error(
                    `Signed short vertex attributes cannot contain values less than -32768.`
                  );
                } else if (value > 32767) {
                  throw new Error(
                    `Signed short vertex attributes cannot contain values greater than 32767.`
                  );
                } else {
                  s16Scratch[0] = axis;
                  bytes[subProgress++] = u8Scratch[0] as number;
                  bytes[subProgress++] = u8Scratch[1] as number;
                }
                break;
              case Gl.Float:
                f32Scratch[0] = axis;
                bytes[subProgress++] = u8Scratch[0] as number;
                bytes[subProgress++] = u8Scratch[1] as number;
                bytes[subProgress++] = u8Scratch[2] as number;
                bytes[subProgress++] = u8Scratch[3] as number;
                break;
            }
          }
        }
      }

      progress += this._stride;
    }

    return bytes;
  }

  /**
   * Provides the attribute values which will be written to the buffer.  Cannot be empty.
   */
  protected abstract generateVertices(): ReadonlyArray<
    AttributeValue<TAttributeSet>
  >;
}
