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
 * @param  range  Array containing minimum and maximum values.
 * @param  scale  Range of the color scale,
 * @param  invert True if color scale should be inverted.
 * @return        Color scale.
 */
export function colorScale(
  range: Range,
  scale: any = 'RdBu',
  invert: boolean = false,
): (value: number) => string {
  /* Determine factor for possible inversion. */
  const direction: number = (!invert) ? 1 : -1;

  /* Return color scale. */
  return flow(
    normalization(range),
    chroma.scale(scale).mode('lab').domain([direction * -1, direction * 1]),
    (color: any) => color.hex(),
  );
}

/**
 * Determines critical points for a gradient depending on a range.
 * @param  range Range of the gradient.
 * @return       Array of critical points in the gradient in order from highest to lowest.
 */
export function criticalGradientPoints(
  range: Range,
): number[] {
  /* Determine minimum and maximum. */
  const max: number = Math.max(...range);
  const min: number = Math.min(...range);

  /* Determine critical points. */
  let criticalPoints: number[] = [0];
  if (max > 0) criticalPoints.unshift(max);
  if (min < 0) criticalPoints.push(min);

  /* Return critical points. */
  return criticalPoints;
}

/**
 * Creates an interpolation function for values of an array.  
 * @param  values Array of values to interpolate between.
 * @return        Interpolation function for values of an array.
 */
export function interpolation(
  values: number[],
): (percentage: number) => number {
  /* Check for valid input. */
  if (values.length === 0) {
    throw new Error('Cannot create interpolation function for an empty array.');
  }

  /* Highest index for this data. */
  const xMax: number = values.length - 1;

  /* Return interpolation function. */
  return (percentage: number) => {
    /* Clamp to boundary. */
    if (percentage < 0) return values[0];
    if (percentage > 1) return values[xMax];

    /* Determine attributes. */
    const x: number = percentage * xMax;
    const i: number = Math.floor(x);
    const lambda: number = x - i;

    /* Return interpolation value. */
    return (lambda === 0)
        /* Return exact value. */
        ? values[i]
        /* Return interpolated value. */
        : (1 - lambda) * values[i] + lambda * values[i + 1];
  };
}

/**
 * Returns a nicer readable representation of a number.
 * @param  value Input number.
 * @return       Readable representation.
 */
export function niceNumber(value: number): string {
  let nice: string = (value === 0)
      /* Return zero without decimals. */
      ? '0'
      /* Show two decimals. */
      : value.toExponential(2)
          /* Leave out exponentials if not neccessary. */
          .replace(/e\+0/g, '')
          /* Use correct minus sign. */
          .replace(/-/g, '−');
  /* Add plus sign for positive values. */
  if (value > 0) nice = '+' + nice;

  /* Return nicely formatted string of number. */
  return nice;
}

/**
 * Creates a normalization function for normalizing between -1 and 1.
 * @param  range Array containing minimum and maximum values.
 * @return       Normalization function for normalizing between -1 and 1.
 */
export function normalization(
  range: Range,
): (value: number) => number {
  /* Determine boundary. */
  const max: number = Math.max(0, ...range);
  const min: number = Math.min(0, ...range);

  /* Return normalization function. */
  return (value: number) => {
    /* Check if value lies in boundary. */
    if (value > max || value < min) {
      throw new Error(
        'Value ' + value + ' lies out of bounds [' + min + ', ' + max + ']'
      );
    }
    
    /* Normalize value. */
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
  /* Determine minimum and maximum values. */
  let max: number;
  let min: number;
  values.forEach(row => {
    const rowMax: number = Math.max(...row);
    const rowMin: number = Math.min(...row);
    max = (max === undefined) ? rowMax : Math.max(max, rowMax);
    min = (min === undefined) ? rowMin : Math.min(min, rowMin);
  });

  /* Return range. */
  return [min, max];
}
