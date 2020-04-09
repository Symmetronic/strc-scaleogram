import { FunctionalComponent, h } from '@stencil/core';

import {
  ColorScale,
  criticalGradientPoints,
  interpolation,
  Range,
} from '../../utils/utils';

/**
 * Number of steps in the gradient
 */
const GRADIENT_STEPS: number = 100;

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
  const criticalPoints: number[] = criticalGradientPoints(range);
  const interpolate: (i: number) => number = interpolation(criticalPoints);

  return (
    <svg
      height='100%'
      width='100%'
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          gradientTransform='rotate(90)'
          id='gradient'
        >
          {Array.apply(null, {length: (GRADIENT_STEPS)}).map((_, index) => {
            const percentage: number = index / (GRADIENT_STEPS - 1);
            const value: number = interpolate(percentage);
            const color: string = colorScale(value);
            const offset: number = 100 * percentage;

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
