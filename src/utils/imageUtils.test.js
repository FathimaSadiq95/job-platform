import { normalizeImageUrl } from './imageUtils';
import API_URL from '../api';

describe('normalizeImageUrl', () => {
  test('returns empty for browser fakepath values', () => {
    expect(normalizeImageUrl('C:\\fakepath\\images.jpg')).toBe('');
  });

  test('builds backend URL for uploaded server paths', () => {
    expect(normalizeImageUrl('/uploads/abc.jpg')).toBe(`${API_URL}/uploads/abc.jpg`);
  });
});
