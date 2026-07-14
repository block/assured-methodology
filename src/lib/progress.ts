/**
 * Chapter-quiz completion, shared between Quiz.astro (writer) and
 * PuzzleProgress.astro (reader).
 *
 * Completion persists in localStorage so ticks survive across visits.
 * Every successful write also dispatches QUIZ_PROGRESS_EVENT on window so
 * a progress strip on the same page as a quiz updates without a reload.
 */

export type QuizProgress = Record<string, { correct: number; total: number }>;

const QUIZ_STORAGE_KEY = "assured-quiz-progress";

/** Fired on window after every successful progress write. */
export const QUIZ_PROGRESS_EVENT = "quiz-progress:change";

export function readQuizProgress(): QuizProgress {
  try {
    const parsed = JSON.parse(localStorage.getItem(QUIZ_STORAGE_KEY) ?? "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed
      : {};
  } catch {
    return {};
  }
}

export function writeQuizProgress(progress: QuizProgress): void {
  try {
    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(progress));
    window.dispatchEvent(new CustomEvent(QUIZ_PROGRESS_EVENT));
  } catch {
    // Storage unavailable (private mode, quota): the quiz still works,
    // completion just isn't remembered.
  }
}
