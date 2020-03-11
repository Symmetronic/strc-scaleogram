import { FunctionalComponent, h } from '@stencil/core';

import {
  ColorScale,
  Range,
} from '../../utils/utils';

// TODO: Check if more or less gradient steps perform better.
/**
 * Number of steps in the gradient
 */
const GRADIENT_STEPS: number = 100;

// TODO: Check if size is neccessary!
/**
 * Size of the SVG in relative measures.
 */
const SIZE: [number, number] = [100, 100];

/**
 * Properties of the color gradient.
 */
interface ColorGradientProps {

  /**
   * Color scale.
   */
  colorScale: ColorScale;

  /**
   * Data range of the color gradient.
   */
  range: Range;
}

/**
 * Color gradient visualization.
 * @param props Properties of the color gradient.
 */
export const ColorGradient: FunctionalComponent<ColorGradientProps> = ({
  colorScale,
  range,
}) => {
  const max: number = Math.max(...range);
  const min: number = Math.min(...range);

  return (
    // TODO: Check for unneccessary attributes (e.g. SIZE)
    <svg
      preserveAspectRatio='none'
      viewBox={'0 0 ' + SIZE.join(' ')}
    >
      <defs>
        <linearGradient
          gradientTransform='rotate(90)'
          id='gradient'
        >
          {Array.apply(null, {length: (GRADIENT_STEPS + 1)}).map((_, index) => {
            // TODO: Fix if scale does not cross zero
            // TODO: Check if min and max color value are included due to GRADIENT_STEPS
            const color: string = colorScale((index < (GRADIENT_STEPS / 2))
              ? ((GRADIENT_STEPS / 2) - index) / (GRADIENT_STEPS / 2) * max
              : (index - (GRADIENT_STEPS / 2)) / (GRADIENT_STEPS / 2) * min
          );
            const offset: number = index / (GRADIENT_STEPS) * 100;

            return (
              <stop
                offset={offset + '%'}
                stop-color={color}
              />
            );
          })}
        </linearGradient>
      </defs>

      <rect
        fill="url(#gradient)"
        height='100%'
        width='100%'
      />
    </svg>
  );
}
