import { FunctionalComponent, h } from '@stencil/core';

import {
  ColorScale,
  Range,
} from '../../utils/utils';

/**
 * Number of steps in the gradient
 */
const GRADIENT_STEPS: number = 20;

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
    <svg
      preserveAspectRatio='none'
      viewBox={'0 0 ' + SIZE.join(' ')}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          gradientTransform='rotate(90)'
          id='myGradient'
        >
          {Array.apply(null, {length: (GRADIENT_STEPS)}).map((_, index) => {
            // TODO: Fix if scale does not cross zero
            const color: string = colorScale((index < (GRADIENT_STEPS / 2))
              ? ((GRADIENT_STEPS / 2) - index) / (GRADIENT_STEPS / 2) * max
              : (index - (GRADIENT_STEPS / 2)) / (GRADIENT_STEPS / 2) * min
          );
            const offset: number = index / (GRADIENT_STEPS - 1) * 100;

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
        fill="url(#myGradient)"
        height='100%'
        width='100%'
        x='0'
        y='0'
      />
    </svg>
  );
}