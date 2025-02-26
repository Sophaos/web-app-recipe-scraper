export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function getString(
  obj: Record<string, unknown>,
  key: string,
): string | undefined {
  return typeof obj[key] === 'string' ? obj[key] : undefined;
}

export function getStringArray(
  obj: Record<string, unknown>,
  key: string,
): string[] | undefined {
  return Array.isArray(obj[key]) ? (obj[key] as string[]) : undefined;
}
