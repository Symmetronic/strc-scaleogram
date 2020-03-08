import chroma from 'chroma-js';
import _ from 'lodash'

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
): [number, number] {
  return _.flatten(values).reduce((range, value) => {
    return [
      (range[0] === undefined) ? value : Math.min(value, range[0]),
      (range[1] === undefined) ? value : Math.max(value, range[1]),
    ]
  }, [undefined, undefined]);
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
  return _.flow(
    normalization(range),
    chroma.scale(scale).domain([-1, 1]),
    color => color.hex(),
  );
}
