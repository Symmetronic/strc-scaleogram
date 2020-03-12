import { Component, h, Prop } from '@stencil/core';

import { ColorGradient } from '../color-gradient/color-gradient';

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
    return (!this.colorScale || !this.range)
        ? null
        : (
            <div>
              <div>
                <ColorGradient
                  colorScale={this.colorScale}
                  range={this.range}
                />
              </div>
              <div class='labels'>
                {criticalGradientPoints(this.range).map(criticalPoint => (
                  <div>
                    {niceNumber(criticalPoint)}
                  </div>
                ))}
              </div>
            </div>
          );
  }
}
