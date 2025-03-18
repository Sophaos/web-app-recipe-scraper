import { Page } from '@playwright/test';
import { isObject } from './object.utils';

export async function extractJsonLd(page: Page) {
  const jsonLd = await page.evaluate(() => {
    const script = document.querySelector('script[type="application/ld+json"]');
    if (!script || !script.textContent) return null;
    const data = JSON.parse(script.textContent) as Record<string, unknown>;
    return data;
  });

  return jsonLd;
}

export function extractSchema(
  jsonLd: Record<string, unknown> | null,
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
