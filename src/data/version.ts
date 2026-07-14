/**
 * The methodology's version stamp, rendered in the site footer.
 *
 * Single source of truth for the on-site version. A release bumps this,
 * CITATION.cff, and package.json together, with a dated CHANGELOG.md entry;
 * the bump rules (what counts as major vs. minor) live in GOVERNANCE.md.
 */

export const METHODOLOGY_VERSION = "1.1";

/** Shown next to the version so readers can judge content currency. */
export const CONTENT_LAST_REVIEWED = "July 2026";
