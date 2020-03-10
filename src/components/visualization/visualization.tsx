import { FunctionalComponent, h } from '@stencil/core';

import { ColorScale } from '../../utils/utils';

/**
 * Size of the SVG in relative measures.
 */
const SIZE: [number, number] = [100, 100];

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
  const rowHeight: number = SIZE[1] / data.length;

  return (
    <svg
      preserveAspectRatio='none'
      viewBox={'0 0 ' + SIZE.join(' ')}
    >
      {data.map((row, rowIndex) => {
        const y: number = rowIndex * rowHeight;

        return (
          <g>
            {row.map((value, colIndex) => {
              const color: string = colorScale(value);
              const colWidth: number = SIZE[0] / row.length;
              const x: number = colIndex * colWidth;
              
              return (
                <rect
                  fill={color}
                  height={rowHeight}
                  width={colWidth}
                  x={x}
                  y={y}
                />
              )
            })}
          </g>
        );
      })}
    </svg>
  );
}
