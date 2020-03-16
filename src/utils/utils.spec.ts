import {
  colorScale,
  criticalGradientPoints,
  interpolation,
  niceNumber,
  normalization,
  range,
} from './utils';

describe('Scaleogram', () => {
  describe('colorScale', () => {
    it('throws an error when setting an invalid scale', () => {
      expect(() => {
        const s = colorScale([7, 9], 'invalid scale');
        s(8);
      }).toThrowError();

      expect(() => {
        const s = colorScale([-3, 4], {});
        s(1);
      }).toThrowError();
    });

    it('allows to specify scales in hexadecimal form', () => {
      const min: string = '#7f3b08';
      const center: string = '#f7f7f7';
      const max: string = '#2d004b';
      const s = colorScale([-2, 1], [min, center, max]);
      expect(s(-2)).toEqual(min);
      expect(s(0)).toEqual(center);
      expect(s(1)).toEqual(max);
    });

    it('allows to use scales from ColorBrewer', () => {
      const s = colorScale([-6, 3], 'RdBu');
      expect(() => {
        s(-6);
        s(0);
        s(3);
      }).not.toThrowError();
    });

    it('can invert scales', () => {
      const min: string = '#e66101';
      const center: string = '#f7f7f7';
      const max: string = '#5e3c99';
      const s = colorScale([-7, 8], [min, center, max], true);
      expect(s(-7)).toEqual(max);
      expect(s(0)).toEqual(center);
      expect(s(8)).toEqual(min);
    });
  });

  describe('criticalGradientPoints', () => {
    it('always contains zero', () => {
      expect(criticalGradientPoints([1, 5])).toContain(0);
      expect(criticalGradientPoints([-6, -3])).toContain(0);
      expect(criticalGradientPoints([-2, 7])).toContain(0);
      expect(criticalGradientPoints([0, 0])).toContain(0);
    });

    it('only adds the maximum if it has a value larger than zero', () => {
      expect(criticalGradientPoints([-7, -2])).not.toContain(-2);
    });

    it('only adds the minimum if it has a value less than zero', () => {
      expect(criticalGradientPoints([3, 6])).not.toContain(3);
    });

    it('returns critical points in order from highest to lowest', () => {
      expect(criticalGradientPoints([-4, 7])).toEqual([7, 0, -4]);
    });

    it('cares not about the order of the range', () => {
      const min: number = -7;
      const max: number = 3;
      const cP1: number[] = criticalGradientPoints([min, max]);
      const cP2: number[] = criticalGradientPoints([max, min]);
      expect(cP1).toEqual([max, 0, min]);
      expect(cP2).toEqual([max, 0, min]);
    });
  });

  describe('interpolation', () => {
    it('throws an error when passing an empty array', () => {
      expect(() => {
        interpolation([]);
      }).toThrowError();
    });

    it('works for single values', () => {
      /* Zero. */
      const v1: number = 0;
      const i1 = interpolation([v1]);
      for (let percentage: number = 0; percentage <= 1; percentage += 0.1) {
        expect(i1(percentage)).toBe(v1);
      }

      /* Positive values. */
      const v2: number = 4.31;
      const i2 = interpolation([v2]);
      for (let percentage: number = 0; percentage <= 1; percentage += 0.1) {
        expect(i2(percentage)).toBe(v2);
      }

      /* Negative values. */
      const v3: number = -91.7;
      const i3 = interpolation([v3]);
      for (let percentage: number = 0; percentage <= 1; percentage += 0.1) {
        expect(i3(percentage)).toBe(v3);
      }
    });

    it('returns exact values of input array', () => {
      const i = interpolation([3, 4, -5]);
      expect(i(0)).toBe(3);
      expect(i(0.5)).toBe(4);
      expect(i(1)).toBe(-5);
    });

    it('interpolates values for a given percentage', () => {
      const i = interpolation([-7, -9]);
      expect(i(0.5)).toBe(-8);
    });

    it('clamps to the boundary', () => {
      const i = interpolation([147, -294.31, 12.3]);

      /* Lower boundary. */
      expect(i(-0.1)).toBe(147);

      /* Upper boundary. */
      expect(i(5)).toBe(12.3);
    });
  });

  describe('niceNumber', () => {
    it('returns zero without further formatting', () => {
      expect(niceNumber(0)).toEqual('0');
    });

    it('shows 2 decimals', () => {
      expect(niceNumber(3.14159)).toEqual('+3.14');
      expect(niceNumber(3)).toEqual('+3.00');
      expect(niceNumber(313)).toEqual('+3.13e+2');
    });

    it('replaces the minus sign', () => {
      expect(niceNumber(-42.0)).toEqual('−4.20e+1');
      expect(niceNumber(-0.1)).toEqual('−1.00e−1');
    });

    it('converts numbers to scientific notation', () => {
      expect(niceNumber(10)).toEqual('+1.00e+1');
      expect(niceNumber(0.1)).toEqual('+1.00e−1');
      expect(niceNumber(-10)).toEqual('−1.00e+1');
      expect(niceNumber(-0.1)).toEqual('−1.00e−1');
    });
  });

  describe('normalization', () => {
    it('throws an error, if a value is not contained in the range', () => {
      const normalize = normalization([-8, 9]);
      expect(() => {
        normalize(-9);
      }).toThrowError();
      expect(() => {
        normalize(10);
      }).toThrowError();
    });

    it('does not care for the order of the range', () => {
      const min: number = -3;
      const max: number = 5;

      const normalize = normalization([min, max]);
      expect(normalize(5)).toBe(1);
      expect(normalize(-3)).toBe(-1);

      const invNormalize = normalization([max, min]);
      expect(invNormalize(5)).toBe(1);
      expect(invNormalize(-3)).toBe(-1);
    });

    it('maps zero to zero', () => {
      const normalize = normalization([-2, 9]);
      expect(normalize(0)).toBe(0);
    });

    it('automatically extends ranges to zero', () => {
      const n1 = normalization([2, 5]);
      expect(n1(0)).toBe(0);

      const n2 = normalization([-6, -1]);
      expect(n2(0)).toBe(0);
    });

    it('normalizes values between -1 and 1', () => {
      const n1 = normalization([3, 5]);
      expect(n1(3)).toBe(0.6);
      expect(n1(5)).toBe(1);

      const n2 = normalization([-10, -3]);
      expect(n2(-10)).toBe(-1);
      expect(n2(-3)).toBe(-0.3);

      const n3 = normalization([-7, 3]);
      expect(n3(-7)).toBe(-1);
      expect(n3(3)).toBe(1);
      expect(n3(0)).toBe(0);
    });
  });

  describe('range', () => {
    it('determines the minimum and maximum value for arrays of arrays of numbers', () => {
      expect(range([[-13], [9, 42], [2, -4], [30]])).toEqual([-13, 42]);
    });
  });
});
