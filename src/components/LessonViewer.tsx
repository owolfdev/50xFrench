"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Volume2, Eye, EyeOff, Loader2, Square, Repeat } from "lucide-react";
import { Lesson, updateLessonSettings } from "@/lib/lessons";

interface LessonViewerProps {
  lesson: Lesson;
}

export default function LessonViewer({ lesson }: LessonViewerProps) {
  const [showTranslations, setShowTranslations] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(
    null
  );

  // Initialize from lesson.settings immediately to avoid flash of wrong state
  const [isLooping, setIsLooping] = useState(() => {
    const initial = lesson.settings?.isLooping ?? true;
    console.log("🎬 Initial isLooping:", initial);
    return initial;
  });

  const [enabledPhrases, setEnabledPhrases] = useState<boolean[]>(() => {
    if (
      lesson.settings?.enabledPhrases &&
      lesson.settings.enabledPhrases.length === lesson.content.length
    ) {
      console.log(
        "🎬 Initial load with SAVED settings:",
        lesson.settings.enabledPhrases
      );
      return lesson.settings.enabledPhrases;
    }
    console.log("🎬 Initial load with DEFAULT settings (all enabled)");
    return new Array(lesson.content.length).fill(true);
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shouldStopRef = useRef(false);
  const lastLessonIdRef = useRef<string | null>(null);
  const isInitialLoadRef = useRef(true);

  // Update state when switching to a different lesson
  useEffect(() => {
    // Only update if the lesson actually changed
    if (lastLessonIdRef.current === lesson.id) {
      console.log("⏭️ Same lesson, skipping state update");
      return;
    }

    console.log("🔄 LessonViewer: Switching to different lesson", {
      lessonId: lesson.id,
      lastLessonId: lastLessonIdRef.current,
      hasSettings: !!lesson.settings,
      settingsData: lesson.settings,
    });

    lastLessonIdRef.current = lesson.id;
    isInitialLoadRef.current = true; // Reset flag when switching lessons

    if (
      lesson.settings?.enabledPhrases &&
      lesson.settings.enabledPhrases.length === lesson.content.length
    ) {
      console.log(
        "✅ Applying saved settings:",
        lesson.settings.enabledPhrases
      );
      setEnabledPhrases(lesson.settings.enabledPhrases);
      setIsLooping(lesson.settings.isLooping ?? true);
    } else {
      console.log("📝 Using default settings (all enabled)");
      const defaultEnabled = new Array(lesson.content.length).fill(true);
      setEnabledPhrases(defaultEnabled);
      setIsLooping(true);
    }
  }, [lesson.id, lesson.settings, lesson.content.length]); // Watch lesson ID, settings, and content length

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

  const handlePlayLesson = async () => {
    if (isLoading || isPlaying) return;

    // Create audio element in direct response to user click (for mobile compatibility)
    const audio = new Audio();
    audioRef.current = audio;

    setIsPlaying(true);
    shouldStopRef.current = false;

    try {
      while (true) {
        // Play each enabled line sequentially with pauses
        for (let i = 0; i < lesson.content.length; i++) {
          // Check if we should stop
          if (shouldStopRef.current) {
            return;
          }

          // Skip disabled phrases
          if (!enabledPhrases[i]) {
            continue;
          }

          const line = lesson.content[i];
          setCurrentPlayingIndex(i);
          setIsLoading(true);

          // Generate audio for this line with slower speaking rate
          const response = await fetch("/api/text-to-speech", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: line.french,
              speakingRate: 0.55, // Much slower for lessons (0.55 = 45% slower than normal)
            }),
          });

          if (!response.ok) {
            throw new Error(`TTS request failed: ${response.status}`);
          }

          const blob = await response.blob();
          const url = URL.createObjectURL(blob);

          setIsLoading(false);

          // Play the audio and wait for it to finish
          await new Promise<void>((resolve, reject) => {
            // Reuse the same audio element (created in user gesture context)
            if (!audioRef.current) {
              reject(new Error("Audio element not available"));
              return;
            }

            const currentAudio = audioRef.current;
            currentAudio.src = url;

            currentAudio.onended = () => {
              URL.revokeObjectURL(url);
              resolve();
            };

            currentAudio.onerror = () => {
              URL.revokeObjectURL(url);
              reject(new Error("Failed to play audio"));
            };

            // Load and play
            currentAudio.load();
            currentAudio.play().catch((err) => {
              console.error("Play error:", err);
              reject(err);
            });
          });

          // Check again before pause
          if (shouldStopRef.current) {
            return;
          }

          // Pause between phrases (2.5 seconds)
          await new Promise((resolve) => setTimeout(resolve, 2500));
        }

        // If not looping, exit after one cycle
        if (!isLooping) {
          break;
        }

        // Small pause before looping (3 seconds)
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Check if we should stop before looping
        if (shouldStopRef.current) {
          return;
        }
      }
    } catch (error) {
      console.error("TTS error:", error);
      
      // More helpful error message for mobile users
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      if (errorMsg.includes("user agent") || errorMsg.includes("denied permission")) {
        alert(
          "Audio playback blocked. On mobile:\n\n" +
          "1. Make sure you're using HTTPS\n" +
          "2. Allow audio in your browser settings\n" +
          "3. Try tapping the Play button again\n\n" +
          "Error: " + errorMsg
        );
      } else {
        alert(`Failed to generate audio: ${errorMsg}`);
      }
    } finally {
      setIsPlaying(false);
      setIsLoading(false);
      setCurrentPlayingIndex(null);
      audioRef.current = null;
    }
  };

  const handleStopLesson = () => {
    shouldStopRef.current = true;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
    setIsLoading(false);
    setCurrentPlayingIndex(null);
  };

  // Sync settings to localStorage whenever they change (but not on initial load)
  useEffect(() => {
    // Skip auto-save on initial mount/load
    if (isInitialLoadRef.current) {
      console.log("🚫 Skipping auto-save on initial load");
      isInitialLoadRef.current = false;
      return;
    }

    if (enabledPhrases.length > 0) {
      console.log("💾 Auto-saving settings to localStorage:", {
        lessonId: lesson.id,
        enabledPhrases,
        isLooping,
      });
      updateLessonSettings(lesson.id, {
        enabledPhrases,
        isLooping,
      });
    }
  }, [enabledPhrases, isLooping, lesson.id]);

  const togglePhrase = (index: number) => {
    console.log("☑️ Toggling phrase:", index);
    const newEnabled = [...enabledPhrases];
    newEnabled[index] = !newEnabled[index];
    setEnabledPhrases(newEnabled);
  };

  const toggleAllPhrases = (enabled: boolean) => {
    console.log("☑️ Toggle all phrases:", enabled);
    const newEnabled = new Array(lesson.content.length).fill(enabled);
    setEnabledPhrases(newEnabled);
  };

  const toggleLooping = () => {
    console.log("🔁 Toggling looping");
    const newLooping = !isLooping;
    setIsLooping(newLooping);
  };

  const enabledCount = enabledPhrases.filter(Boolean).length;

  return (
    <Card className="shadow-xl border-0">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <CardTitle className="text-2xl md:text-3xl text-[#5BA3E8]">
              {lesson.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={getDifficultyColor(lesson.difficulty)}
              >
                {lesson.difficulty}
              </Badge>
              {lesson.is_generated && (
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-700 border-purple-200"
                >
                  AI Generated
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 pt-4">
          {!isPlaying ? (
            <Button
              onClick={handlePlayLesson}
              disabled={isLoading || enabledCount === 0}
              className="flex items-center gap-2 bg-[#5BA3E8] hover:bg-[#5BA3E8]/90"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
              Play {enabledCount > 0 && `(${enabledCount})`}
            </Button>
          ) : (
            <Button
              onClick={handleStopLesson}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
            >
              <Square className="w-4 h-4" />
              Stop
            </Button>
          )}

          <Button
            variant="outline"
            onClick={toggleLooping}
            className={`flex items-center gap-2 ${
              isLooping ? "bg-purple-50 border-purple-300 text-purple-700" : ""
            }`}
            disabled={isPlaying}
          >
            <Repeat className="w-4 h-4" />
            {isLooping ? "Looping" : "Play Once"}
          </Button>

          <Button
            variant="outline"
            onClick={() => setShowTranslations(!showTranslations)}
            className="flex items-center gap-2"
          >
            {showTranslations ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
            {showTranslations ? "Hide" : "Show"} Translations
          </Button>

          <div className="flex gap-2 md:ml-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleAllPhrases(true)}
              disabled={isPlaying}
              className="text-xs"
            >
              Select All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleAllPhrases(false)}
              disabled={isPlaying}
              className="text-xs"
            >
              Deselect All
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Lesson content */}
        <div className="space-y-3">
          {lesson.content.map((line, index) => {
            const isCurrentlyPlaying = currentPlayingIndex === index;
            const isEnabled = enabledPhrases[index];
            return (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all ${
                  isCurrentlyPlaying
                    ? "bg-[#5BA3E8]/20 border-[#5BA3E8] shadow-lg scale-[1.02]"
                    : isEnabled
                    ? "bg-[#5BA3E8]/5 border-[#5BA3E8]/20 hover:bg-[#5BA3E8]/10"
                    : "bg-gray-100 border-gray-300 opacity-60"
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={isEnabled ?? true}
                    onChange={() => togglePhrase(index)}
                    disabled={isPlaying}
                    className="mt-1.5 w-4 h-4 text-[#5BA3E8] border-gray-300 rounded focus:ring-[#5BA3E8] cursor-pointer"
                  />

                  <div className="flex-1">
                    {/* French text - always visible */}
                    <p
                      className={`text-lg md:text-xl font-medium mb-1 ${
                        isCurrentlyPlaying
                          ? "text-[#5BA3E8] font-semibold"
                          : isEnabled
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {isCurrentlyPlaying && (
                        <Volume2 className="w-4 h-4 inline mr-2 animate-pulse" />
                      )}
                      {line.french}
                    </p>

                    {/* English translation - toggleable */}
                    {showTranslations && (
                      <p className="text-base md:text-lg text-muted-foreground italic pl-4 border-l-2 border-[#5BA3E8]/30 animate-in fade-in slide-in-from-left-2">
                        → {line.english}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lesson stats */}
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            {lesson.content.length} lines • {enabledCount} selected • Topic:{" "}
            {lesson.topic}
            {isLooping && (
              <span className="ml-2 text-purple-600 font-medium">
                🔁 Looping enabled
              </span>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
