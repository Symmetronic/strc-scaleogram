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
 * Determines critical points for a gradient depending on a range.
 * @param  range Range of the gradient.
 * @return       Array containing critical points in the gradient.
 */
export function criticalGradientPoints(
  range: Range,
): number[] {
  const max: number = Math.max(...range);
  const min: number = Math.min(...range);

  let criticalPoints: number[] = [0];
  if (max > 0) criticalPoints.unshift(max);
  if (min < 0) criticalPoints.push(min);

  return criticalPoints;
}

/**
 * Returns a nicer readable representation of a number.
 * @param  value Input number.
 * @return       Readable representation.
 */
export function niceNumber(value: number): string {
  return (value === 0)
      /* Return zero without decimals. */
      ? '0'
      /* Show two decimals. */
      : value.toExponential(2)
          /* Leave out exponentials if not neccessary. */
          .replace(/e\+0/g, '')
          /* Use correct minus sign. */
          .replace(/-/g, '−');
}

/**
 * Creates a normalization function for normalizing between -1 and 1.
 * @param  range Array containing minimum and maximum values.
 * @return       Normalization function for normalizing between -1 and 1.
 */
export function normalization(
  range: Range,
): (value: number) => number {
  const max: number = Math.max(0, ...range);
  const min: number = Math.min(0, ...range);
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
