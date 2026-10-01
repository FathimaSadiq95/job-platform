import API_URL from "../api";
export const normalizeImageUrl = (imagePath) => {
  if (!imagePath || typeof imagePath !== 'string') return '';

  const trimmed = imagePath.trim();
  if (!trimmed) return '';

  if (trimmed.toLowerCase().includes('fakepath') || trimmed.startsWith('C:\\')) {
    return '';
  }

  if (trimmed.startsWith('http')) return trimmed;

  return `${API_URL}/${trimmed.replace(/^\/+/, '')}`;
};
