import {
  normalization,
} from './utils';

describe('Scaleogram', () => {
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
});
