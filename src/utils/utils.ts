import chroma from 'chroma-js';
import _ from 'lodash'

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
  return _.flow(
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
    
    return _.cond([
      [v => v === 0, () => 0],
      [v => v > 0, (v: number) => v / max],
      [v => v < 0, (v: number) => -1 * v / min]
    ])(value);
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
  // TODO: Implement more efficiently with only 1 loop
  return _.flatten(values).reduce((range, value) => {
    return [
      (range[0] === undefined) ? value : Math.min(value, range[0]),
      (range[1] === undefined) ? value : Math.max(value, range[1]),
    ]
  }, [undefined, undefined]);
}
