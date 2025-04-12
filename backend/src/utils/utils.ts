export function extractSchema(
  jsonLd: Record<string, unknown> | Record<string, unknown>[] | null,
  name: string,
) {
  if (!jsonLd) return null;

  if (Array.isArray(jsonLd)) {
    return (
      jsonLd.find(
        (item): item is Record<string, unknown> =>
          isObject(item) &&
          ((typeof item['@type'] === 'string' && item['@type'] === name) ||
            (Array.isArray(item['@type']) && item['@type'].includes(name))),
      ) ?? null
    );
  }

  if (isObject(jsonLd)) {
    if (Array.isArray(jsonLd['@graph'])) {
      return (
        jsonLd['@graph'].find(
          (item): item is Record<string, unknown> =>
            isObject(item) &&
            ((typeof item['@type'] === 'string' && item['@type'] === name) ||
              (Array.isArray(item['@type']) && item['@type'].includes(name))),
        ) ?? null
      );
    }

    if (
      (typeof jsonLd['@type'] === 'string' && jsonLd['@type'] === name) ||
      (Array.isArray(jsonLd['@type']) && jsonLd['@type'].includes(name))
    ) {
      return jsonLd;
    }
  }

  return null;
}

export function parseISO8601Duration(duration: string): string {
  if (duration === undefined || duration === '') {
    return '';
  }
  const match = duration.match(
    /P(?:([\d]+)D)?T?(?:([\d]+)H)?(?:([\d]+)M)?(?:([\d]+)S)?/,
  );

  if (!match) return duration;

  const [, days, hours, minutes, seconds] = match;
  const parts = [
    days ? `${days} day${days !== '1' ? 's' : ''}` : '',
    hours ? `${hours} hour${hours !== '1' ? 's' : ''}` : '',
    minutes ? `${minutes} minute${minutes !== '1' ? 's' : ''}` : '',
    seconds ? `${seconds} second${seconds !== '1' ? 's' : ''}` : '',
  ].filter(Boolean);

  return parts.join(', ');
}

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
