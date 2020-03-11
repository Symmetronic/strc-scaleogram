import chroma from 'chroma-js';
import flow from 'lodash.flow'

/**
 * Type of a color scale function.
 */
export type ColorScale = (value: number) => string;

/**
 * 1-dimensional interval between two numbers.
 */
export type Range = [number, number];

/**
 * Creates a color scale.
 * @param  range Array containing minimum and maximum values.
 * @param  scale Range of the color scale,
 * @return       Color scale.
 */
export function colorScale(
  range: Range,
  scale: any = 'RdBu',
): (value: number) => string {
  return flow(
    normalization(range),
    chroma.scale(scale).domain([-1, 1]),
    (color: any) => color.hex(),
  );
}

/**
 * Creates a normalization function for normalizing between -1 and 1.
 * @param  range Array containing minimum and maximum values.
 * @return       Normalization function for normalizing between -1 and 1.
 */
export function normalization(
  range: [number, number]
): (value: number) => number {
  const max: number = Math.max(...range);
  const min: number = Math.min(...range);
  return (value: number) => {
    if (value > max || value < min) {
      throw new Error(
        'Value ' + value + ' lies out of bounds [' + min + ', ' + max + ']'
      );
    }
    
    return (value === 0)
      ? 0
      : (value > 0)
        ? value / max
        : -1 * value / min;
  };
}

/**
 * Determines the minimum and maximum value for an array of arrays of numbers.
 * @param values Array of arrays of numbers.
 * @return 
 */
export function range(
  values: number[][]
): Range {
  let max: number;
  let min: number;
  values.forEach(row => {
    const rowMax: number = Math.max(...row);
    const rowMin: number = Math.min(...row);
    max = (max === undefined) ? rowMax : Math.max(max, rowMax);
    min = (min === undefined) ? rowMin : Math.min(min, rowMin);
  });
  return [min, max];
}
