import { Component, h, Prop } from '@stencil/core';

import { ColorGradient } from '../color-gradient/color-gradient';

import {
  ColorScale,
  criticalGradientPoints,
  Range,
} from '../../utils/utils';

/**
 * Legend for a visualization.
 */
@Component({
  tag: 'strc-scaleogram-legend',
  styleUrl: 'legend.scss',
  shadow: true,
})
export class Legend {

  /**
   * Color scale of the legend.
   */
  @Prop() colorScale: ColorScale;

  /**
   * Range of the legend.
   */
  @Prop() range: Range;
  
  /**
   * Renders the legend.
   */
  render() {
    const criticalPoints: number[] = criticalGradientPoints(this.range);

    return (
      <div>
        <div>
          <ColorGradient
            colorScale={this.colorScale}
            range={this.range}
          />
        </div>
        <div class='labels'>
          {criticalPoints.map(criticalPoint => {
            // TODO: Display number in nicer format (Put to helper function)
            const label: string = Math.round(criticalPoint).toExponential(2);

            return (
              <div>
                {label}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
