/**
 * Lesson Types and Utilities
 * Manages French lessons with progressive complexity
 */

export interface LessonLine {
  french: string;
  english: string;
}

export interface Lesson {
  id: string;
  title: string;
  topic: string; // e.g., "avoir", "aller", "definite articles"
  difficulty: "beginner" | "intermediate" | "advanced";
  content: LessonLine[];
  created_at: string;
  is_generated?: boolean; // true if AI-generated
}

const LESSONS_STORAGE_KEY = "repeter-lessons";

/**
 * Get all lessons from localStorage
 */
export function getLocalLessons(): Lesson[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(LESSONS_STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error("Error reading lessons from localStorage:", error);
    return [];
  }
}

/**
 * Save a new lesson to localStorage
 */
export function saveLesson(lesson: Lesson): void {
  if (typeof window === "undefined") return;

  try {
    const lessons = getLocalLessons();
    // Check if lesson already exists (by id)
    const existingIndex = lessons.findIndex((l) => l.id === lesson.id);

    if (existingIndex >= 0) {
      // Update existing lesson
      lessons[existingIndex] = lesson;
    } else {
      // Add new lesson
      lessons.push(lesson);
    }

    localStorage.setItem(LESSONS_STORAGE_KEY, JSON.stringify(lessons));
  } catch (error) {
    console.error("Error saving lesson to localStorage:", error);
    throw error;
  }
}

/**
 * Delete a lesson from localStorage
 */
export function deleteLesson(lessonId: string): void {
  if (typeof window === "undefined") return;

  try {
    const lessons = getLocalLessons();
    const filtered = lessons.filter((l) => l.id !== lessonId);
    localStorage.setItem(LESSONS_STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error("Error deleting lesson from localStorage:", error);
    throw error;
  }
}

/**
 * Get a single lesson by ID
 */
export function getLessonById(lessonId: string): Lesson | null {
  const lessons = getLocalLessons();
  return lessons.find((l) => l.id === lessonId) || null;
}

/**
 * Generate full French text from lesson content (for TTS)
 */
export function getLessonFullText(lesson: Lesson): string {
  return lesson.content.map((line) => line.french).join(" ");
}

/**
 * Get lesson count by difficulty
 */
export function getLessonCountByDifficulty(
  difficulty: "beginner" | "intermediate" | "advanced"
): number {
  const lessons = getLocalLessons();
  return lessons.filter((l) => l.difficulty === difficulty).length;
}
