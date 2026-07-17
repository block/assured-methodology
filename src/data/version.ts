/**
 * The methodology's version stamp, rendered in the site footer.
 *
 * Single source of truth for the on-site version. A release bumps this,
 * CITATION.cff, and package.json together, with a dated CHANGELOG.md entry;
 * the bump rules (what counts as major vs. minor) live in GOVERNANCE.md.
 *
 * Display rule: the footer shows the two-segment methodology edition
 * (MAJOR.MINOR); CITATION.cff and package.json carry the full semver
 * (currently 1.2.0). The two refer to the same release — a patch-level
 * bump changes the semver but not the displayed edition.
 */

export const METHODOLOGY_VERSION = "1.2";

/** Shown next to the version so readers can judge content currency. */
export const CONTENT_LAST_REVIEWED = "July 2026";
