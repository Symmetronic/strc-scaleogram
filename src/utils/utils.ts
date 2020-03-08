import chroma from 'chroma-js';
import flow from 'lodash.flow';

/**
 * Type of a scale function.
 */
export type Scale = (value: number) => string;

/**
 * Creates a normalization function for normalizing between -1 and 1.
 * @param  range Array containing minimum and maximum values.
 * @return       Normalization function for normalizing between -1 and 1.
 */
export function normalization(
  range: [number, number]
): (value: number) => number {
  // TODO: Check for both min and max values lower or higher than zero
  const max: number = Math.max(...range);
  const min: number = Math.min(...range);
  return (value: number) => (value > 0) ? value / max : -1 * value / min;
}

/**
 * Creates a color scale.
 * @param  range Array containing minimum and maximum values.
 * @param  scale Range of the color scale,
 * @return       Color scale.
 */
export function scale(
  range: [number, number],
  scale: any = 'RdBu',
): (value: number) => string {
  return flow(
    normalization(range),
    chroma.scale(scale).domain([-1, 1]),
    color => color.hex(),
  );
}
