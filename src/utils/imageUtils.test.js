import { normalizeImageUrl } from './imageUtils';

describe('normalizeImageUrl', () => {
  test('returns empty for browser fakepath values', () => {
    expect(normalizeImageUrl('C:\\fakepath\\images.jpg')).toBe('');
  });

  test('builds backend URL for uploaded server paths', () => {
    expect(normalizeImageUrl('/uploads/abc.jpg')).toBe('http://localhost:4000/uploads/abc.jpg');
  });
});
