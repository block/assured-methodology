// Get the base URL from Astro config
const baseUrl = import.meta.env.BASE_URL;

// Check if the href is in the current path
export function isActivePage(href: string, currentPath: string): boolean {
  return currentPath.startsWith(getUrlRelativeToBase(href));
}

/**
 * Adjusts the URL to prepend the Astro Base URL
 * @param url
 * @returns
 */
export function getUrlRelativeToBase(url: string): string {
  // Don't prepend baseUrl for special URL types.
  // javascript: is deliberately not on this list; nothing on the site uses
  // it, and passing it through unmodified would hand any future caller an
  // XSS primitive.
  if (
    url.startsWith("#") ||
    url.startsWith("http:") ||
    url.startsWith("https:") ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:")
  ) {
    return url;
  }

  // Remove trailing slash from baseUrl if it exists
  const normalizedBaseUrl = baseUrl.endsWith("/")
    ? baseUrl.slice(0, -1)
    : baseUrl;

  // Remove leading slash from url if it exists, then add exactly one
  const cleanUrl = url.startsWith("/") ? url.slice(1) : url;
  return `${normalizedBaseUrl}/${cleanUrl}`;
}
