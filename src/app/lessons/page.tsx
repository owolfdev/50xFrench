"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, BookOpen, Trash2, Loader2 } from "lucide-react";
import LessonViewer from "@/components/LessonViewer";
import LessonGenerator from "@/components/LessonGenerator";
import { AuthHeader } from "@/components/AuthHeader";
import { AppFooter } from "@/components/AppFooter";
import {
  getLocalLessons,
  saveLesson,
  deleteLesson,
  cleanupOrphanedSettings,
  type Lesson,
} from "@/lib/lessons";

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showGenerator, setShowGenerator] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    lessonId: string;
    lessonTitle: string;
  }>({ show: false, lessonId: "", lessonTitle: "" });

  // Load lessons from localStorage - always load fresh on mount
  useEffect(() => {
    const loadFreshLessons = () => {
      const loadedLessons = getLocalLessons();
      setLessons(loadedLessons);
      setIsLoading(false);

      // Clean up any orphaned settings from old storage format
      cleanupOrphanedSettings();

      // Auto-select first lesson if available
      if (loadedLessons.length > 0) {
        const savedLessonId = localStorage.getItem("selected-lesson-id");
        if (savedLessonId) {
          const savedLesson = loadedLessons.find((l) => l.id === savedLessonId);
          if (savedLesson) {
            setSelectedLesson(savedLesson);
            return;
          }
        }
        setSelectedLesson(loadedLessons[0]);
      }
    };

    loadFreshLessons();
  }, []);

  const handleLessonGenerated = (lesson: Lesson) => {
    // Save to localStorage
    saveLesson(lesson);

    // Update state
    setLessons([lesson, ...lessons]);
    setSelectedLesson(lesson);
    setShowGenerator(false);
  };

  const handleDeleteLesson = (lessonId: string) => {
    deleteLesson(lessonId);

    // Update state
    const updatedLessons = lessons.filter((l) => l.id !== lessonId);
    setLessons(updatedLessons);

    // If we deleted the selected lesson, select another or null
    if (selectedLesson?.id === lessonId) {
      setSelectedLesson(updatedLessons[0] || null);
    }

    setDeleteConfirm({ show: false, lessonId: "", lessonTitle: "" });
  };

  // Not needed anymore - settings auto-save via useEffect in LessonViewer

  const handleSelectLesson = (lesson: Lesson) => {
    // Always get fresh data from localStorage when selecting
    const freshLessons = getLocalLessons();
    const freshLesson = freshLessons.find((l) => l.id === lesson.id);

    if (freshLesson) {
      setSelectedLesson(freshLesson);
      // Save selected lesson ID for persistence
      if (typeof window !== "undefined") {
        localStorage.setItem("selected-lesson-id", freshLesson.id);
      }
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-700 border-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#5BA3E8] flex flex-col">
        <AuthHeader />
        <main className="flex-1">
          <div className="max-w-6xl mx-auto p-4 md:p-8">
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-white" />
            </div>
          </div>
        </main>
        <AppFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#5BA3E8] flex flex-col">
      <AuthHeader />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                <BookOpen className="text-white" />
                French Lessons
              </h1>
              <p className="text-white/80 mt-2">
                Comprehensive drilling lessons that build progressively in
                complexity
              </p>
            </div>
            <Button
              onClick={() => setShowGenerator(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Generate Lesson</span>
              <span className="md:hidden">New</span>
            </Button>
          </div>

          {lessons.length === 0 ? (
            /* Empty state */
            <Card className="p-8 md:p-12 text-center">
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <BookOpen className="w-16 h-16 text-muted-foreground/50" />
                </div>
                <h2 className="text-2xl font-semibold text-muted-foreground">
                  No Lessons Yet
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Create your first lesson using AI! Generate comprehensive
                  drilling lessons for any French topic you want to master.
                </p>
                <Button
                  onClick={() => setShowGenerator(true)}
                  className="bg-purple-600 hover:bg-purple-700"
                  size="lg"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Your First Lesson
                </Button>
              </CardContent>
            </Card>
          ) : (
            /* Lessons display */
            <div className="grid md:grid-cols-3 gap-6">
              {/* Lesson List - Left sidebar */}
              <div className="md:col-span-1 space-y-3">
                <h2 className="text-lg font-semibold text-white">
                  Available Lessons ({lessons.length})
                </h2>
                <div className="space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto">
                  {lessons.map((lesson) => (
                    <Card
                      key={lesson.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedLesson?.id === lesson.id
                          ? "border-[#5BA3E8] border-2 bg-[#5BA3E8]/5"
                          : "border-border"
                      }`}
                      onClick={() => handleSelectLesson(lesson)}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-medium text-sm line-clamp-2">
                              {lesson.title}
                            </h3>
                            {lesson.is_generated && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeleteConfirm({
                                    show: true,
                                    lessonId: lesson.id,
                                    lessonTitle: lesson.title,
                                  });
                                }}
                                className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={`text-xs ${getDifficultyColor(
                                lesson.difficulty
                              )}`}
                            >
                              {lesson.difficulty}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {lesson.content.length} lines
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Lesson Viewer - Main content */}
              <div className="md:col-span-2">
                {selectedLesson ? (
                  <LessonViewer
                    key={selectedLesson.id}
                    lesson={selectedLesson}
                  />
                ) : (
                  <Card className="p-8 text-center">
                    <CardContent className="space-y-4">
                      <BookOpen className="w-12 h-12 text-muted-foreground/50 mx-auto" />
                      <p className="text-muted-foreground">
                        Select a lesson to begin
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* Lesson Generator Modal */}
          {showGenerator && (
            <LessonGenerator
              onLessonGenerated={handleLessonGenerated}
              onClose={() => setShowGenerator(false)}
            />
          )}

          {/* Delete Confirmation Modal */}
          {deleteConfirm.show && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <Card className="w-full max-w-md">
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-red-600">
                      <Trash2 className="h-5 w-5" />
                      Delete Lesson
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      This action cannot be undone. The lesson will be
                      permanently removed from your browser&apos;s storage.
                    </p>
                  </div>

                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm font-medium text-red-800">
                      Delete: &quot;{deleteConfirm.lessonTitle}&quot;
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleDeleteLesson(deleteConfirm.lessonId)}
                      variant="destructive"
                      className="flex-1"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setDeleteConfirm({
                          show: false,
                          lessonId: "",
                          lessonTitle: "",
                        })
                      }
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
