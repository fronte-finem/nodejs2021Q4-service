function isEmpty(data: unknown): boolean {
  if (data === undefined || data === null) return true;
  if (typeof data === 'function') return false;
  if (typeof data === 'string' || Array.isArray(data)) return data.length === 0;
  if (typeof data === 'object') return Object.keys(data).length === 0;
  return false;
}

export function isNotEmpty(data: unknown): boolean {
  return !isEmpty(data);
}
