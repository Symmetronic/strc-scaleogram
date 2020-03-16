import { FunctionalComponent, h } from '@stencil/core';

import { ColorScale } from '../../utils/utils';

/**
 * Properties of the scaleogram visualization.
 */
interface VisualizationProps {

  /**
   * Color scale.
   */
  colorScale: ColorScale;

  /**
   * Data of the scaleogram visualization.
   */
  data: number[][];
}

/**
 * Scaleogram visualization.
 * @param props Properties of the scaleogram visualization.
 */
export const Visualization: FunctionalComponent<VisualizationProps> = ({
  colorScale,
  data,
}) => {
  const rowHeight: number = 100 / data.length;

  return (
    <svg
      height='100%'
      shape-rendering='crispEdges'
      width='100%'
    >
      {data.map((row, rowIndex) => {
        const colWidth: number = 100 / row.length;
        const y: number = rowIndex * rowHeight;

        return (
          <g>
            {row.map((value, colIndex) => {
              const color: string = colorScale(value);
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
