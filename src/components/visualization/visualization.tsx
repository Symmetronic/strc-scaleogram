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
      width='100%'
    >
      {data.map((row, rowIndex) => {
        const y: number = 100 * rowIndex / data.length;

        return (
          <g>
            {row.map((value, colIndex) => {
              const color: string = colorScale(value);
              const colWidth: number = 100 / row.length;
              const x: number = 100 * colIndex / row.length;
              
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
