import { Component, h, Prop } from '@stencil/core';

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
 * Color gradient visualization.
 */
@Component({
  tag: 'strc-scaleogram-color-gradient',
  styleUrl: 'color-gradient.scss',
  shadow: true,
})
export class ColorGradient {

  /**
   * Color scale.
   */
  @Prop() colorScale: ColorScale;

  /**
   * Data range of the color gradient.
   */
  @Prop() range: Range;

  /**
   * Renders the color gradient visualization.
   */
  render() {
    const criticalPoints: number[] = criticalGradientPoints(this.range);
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
              const color: string = this.colorScale(value);
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
}
