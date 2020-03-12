import { FunctionalComponent, h } from '@stencil/core';

import {
  ColorScale,
  criticalGradientPoints,
  Range,
} from '../../utils/utils';

// TODO: Check if more or less gradient steps perform better.
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
  const max: number = Math.max(...range);
  const min: number = Math.min(...range);

  const criticalPoints: number[] = criticalGradientPoints(range);

  return (
    <svg>
      <defs>
        <linearGradient
          gradientTransform='rotate(90)'
          id='gradient'
        >
          {Array.apply(null, {length: (GRADIENT_STEPS)}).map((_, index) => {

            const percentage: number = index / (GRADIENT_STEPS - 1);
            
            // TODO: Unify different cases!
            // TODO: Fix if scale does not cross zero
            const domainValue: number = 1 - 2 * percentage;
            const color: string = (criticalPoints.length === 2)
              ? (criticalPoints[0] === 0)
                ? colorScale(min * -1 * (domainValue - 1))
                : colorScale(max * domainValue)
              : (criticalPoints.length === 3)
                ? (percentage < 0.5)
                  ? colorScale(max * domainValue)
                  : colorScale(min * -1 * domainValue)
                : '';

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
