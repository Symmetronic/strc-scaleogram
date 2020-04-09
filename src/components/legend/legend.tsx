import { Component, h, Prop } from '@stencil/core';

import {
  ColorScale,
  criticalGradientPoints,
  niceNumber,
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

    return (!this.colorScale || !this.range)
        ? null
        : (
            <div>
              <div>
                <strc-scaleogram-color-gradient
                  colorScale={this.colorScale}
                  range={this.range}
                />
              </div>
              {(criticalPoints.length <= 1)
                ? null
                : <div class='labels'>
                    {criticalPoints.map(criticalPoint => (
                      <div>
                        {niceNumber(criticalPoint)}
                      </div>
                    ))}
                  </div>
              }
            </div>
          );
  }
}
