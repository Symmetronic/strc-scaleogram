import { FunctionalComponent, h } from '@stencil/core';

import { ColorGradient } from '../color-gradient/color-gradient';

import {
  ColorScale,
  criticalGradientPoints,
  Range,
} from '../../utils/utils';

/**
 * Properties of the legend.
 */
interface LegendProps {

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
 * Legend for a visualization.
 * @param props Properties of the legend.
 */
export const Legend: FunctionalComponent<LegendProps> = ({
  colorScale,
  range,
}) => {
  const criticalPoints: number[] = criticalGradientPoints(range);

  return (
    // TODO: Check for unneccessary SVG attributes
    <svg
      height='100%'
      width='100%'
    >
      <svg
        x='20%'
        width='20%'
      >
        <ColorGradient
          colorScale={colorScale}
          range={range}
        />
      </svg>
      <svg
        x='40%'
      >
        {criticalPoints.map((criticalPoint, index) => {
          const percentage: number = index / (criticalPoints.length - 1);
          const fontSize: number = 12;
          // TODO: Display number in nicer format (Put to helper function)
          const label: string = Math.round(criticalPoint).toExponential(2);
          const y: number = 100 * percentage;
          const dy: number = fontSize * (1-percentage);

          return (
            <g>
              {/* TODO: Adjust positioning of line, probably with spacing of gradient on top and bottom */}
              <line
                x1='0'
                x2='5%'
                y1={y + '%'}
                y2={y + '%'}
                stroke='black'
              />
              <text
                dx='10%'
                dy={dy + 'px'}
                font-size={fontSize + 'px'}
                y={y + '%'}
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </svg>
  );
}
