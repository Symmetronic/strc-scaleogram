import { Component, h, Prop } from '@stencil/core';

import { ColorScale } from '../../utils/utils';

/**
 * Scaleogram visualization.
 */
@Component({
  tag: 'strc-scaleogram-visualization',
  styleUrl: 'visualization.scss',
  shadow: true,
})
export class Visualization {

  /**
   * Color scale.
   */
  @Prop() colorScale: ColorScale;

  /**
   * Data of the scaleogram visualization.
   */
  @Prop() data: number[][];

  /**
   * Renders the scaleogram visualization.
   */
  render() {
    const rowHeight: number = 100 / this.data.length;

    return (
      <svg
        height='100%'
        shape-rendering='crispEdges'
        width='100%'
        xmlns="http://www.w3.org/2000/svg"
      >
        {this.data.map((row, rowIndex) => {
          const colWidth: number = 100 / row.length;
          const y: number = rowIndex * rowHeight;

          return (
            <g>
              {row.map((value, colIndex) => {
                const color: string = this.colorScale(value);
                const x: number = colIndex * colWidth;
                
                return (
                  <rect
                    fill={color}
                    height={rowHeight + '%'}
                    width={colWidth + '%'}
                    x={x + '%'}
                    y={y + '%'}
                  />
                )
              })}
            </g>
          );
        })}
      </svg>
    );
  }
}
