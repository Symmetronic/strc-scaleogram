import { FunctionalComponent, h } from '@stencil/core';

import { ColorGradient } from '../color-gradient/color-gradient';

import {
  ColorScale,
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
  const max: number = Math.max(...range);
  const min: number = Math.min(...range);

  return (
    // TODO: Check for unneccessary SVG attributes
    <svg
      height='100%'
      width='100%'
    >
      <svg
        x='1.5em'
        width='1.5em'
      >
        <ColorGradient
          colorScale={colorScale}
          range={range}
        />
      </svg>
      <svg
        x='3.3em'
      >
        <text
          dy='1em'
          font-size='0.8em'
          y='0'
        >
          {/* TODO: Use helper for displaying number in nice format */}
          +{(Math.round(max) < 1000)
            ? Math.round(max)
            : Math.round(max).toExponential(2)
          }
        </text>
        <text
          dy='0.5em'
          font-size='0.8em'
          y='50%'
        >
          0
        </text>
        <text
          dy='0'
          font-size='0.8em'
          y='100%'
        >
          {/* TODO: Use helper for displaying number in nice format */}
          −{(Math.round(min) > -1000)
            ? Math.abs(Math.round(min))
            : Math.abs(Math.round(min)).toExponential(2)
          }
        </text>
      </svg>
    </svg>
  );
}
