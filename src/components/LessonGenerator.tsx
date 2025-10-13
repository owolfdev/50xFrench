"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, X } from "lucide-react";
import type { Lesson } from "@/lib/lessons";

interface LessonGeneratorProps {
  onLessonGenerated: (lesson: Lesson) => void;
  onClose: () => void;
}

export default function LessonGenerator({
  onLessonGenerated,
  onClose,
}: LessonGeneratorProps) {
  const [prompt, setPrompt] = useState("");
  const [difficulty, setDifficulty] = useState<
    "beginner" | "intermediate" | "advanced"
  >("beginner");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a topic for lesson generation");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setProgress(0);
    setTimeRemaining(0);

    // Estimate time (lessons take longer than phrases - 15-25 seconds)
    const estimatedSeconds = 20;
    setTimeRemaining(estimatedSeconds);

    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + Math.random() * 5, 95); // Cap at 95%
        return newProgress;
      });

      setTimeRemaining((prev) => {
        const newTime = Math.max(prev - 1, 0);
        return newTime;
      });
    }, 1000);

    try {
      const response = await fetch("/api/generate-lesson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          difficulty,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ API Error:", errorData);
        throw new Error(
          errorData.details || errorData.error || "Failed to generate lesson"
        );
      }

      const data = await response.json();

      // Complete the progress bar
      clearInterval(progressInterval);
      setProgress(100);
      setTimeRemaining(0);

      // Small delay to show completion
      setTimeout(() => {
        onLessonGenerated(data.lesson);

        // Reset form
        setPrompt("");
        setDifficulty("beginner");
        setProgress(0);
        setTimeRemaining(0);
      }, 500);
    } catch (err) {
      clearInterval(progressInterval);
      setError(err instanceof Error ? err.message : "An error occurred");
      setProgress(0);
      setTimeRemaining(0);
    } finally {
      setIsGenerating(false);
    }
  };

  const examplePrompts = [
    "le verbe avoir au présent",
    "le verbe aller",
    "les articles définis",
    "les verbes réfléchis",
    "le passé composé avec être",
    "les adjectifs possessifs",
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              Generate Custom Lesson
            </CardTitle>
            <CardDescription>
              Create a comprehensive drilling lesson using AI for any French
              topic you want to master
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="prompt">What would you like to learn?</Label>
              <Input
                id="prompt"
                placeholder="e.g., le verbe avoir, les articles définis, le passé composé..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isGenerating}
              />
            </div>

            <div className="space-y-2">
              <Label>Difficulty Level</Label>
              <div className="flex gap-2">
                {(["beginner", "intermediate", "advanced"] as const).map(
                  (level) => (
                    <Button
                      key={level}
                      variant={difficulty === level ? "default" : "outline"}
                      size="sm"
                      onClick={() => setDifficulty(level)}
                      disabled={isGenerating}
                      className={
                        difficulty === level
                          ? "bg-[#5BA3E8] hover:bg-[#5BA3E8]/90"
                          : ""
                      }
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </Button>
                  )
                )}
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            {/* Progress Bar */}
            {isGenerating && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Generating comprehensive lesson...</span>
                  <span>
                    {timeRemaining > 0
                      ? `~${Math.ceil(timeRemaining)}s remaining`
                      : "Almost done..."}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 text-center">
                  {Math.round(progress)}% complete
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Label className="text-sm text-gray-600">Example topics:</Label>
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((example) => (
                  <Badge
                    key={example}
                    variant="secondary"
                    className="cursor-pointer hover:bg-gray-200"
                    onClick={() => setPrompt(example)}
                  >
                    {example}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating lesson...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Lesson
                </>
              )}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>

          <div className="text-xs text-gray-500 space-y-1 bg-blue-50 p-3 rounded-md border border-blue-200">
            <p className="font-semibold text-blue-900">About the lessons:</p>
            <p>• Lessons start simple and progressively build complexity</p>
            <p>
              • They use repetition to drill specific words, verbs, or patterns
            </p>
            <p>
              • Generated lessons are saved to your browser&apos;s local storage
            </p>
            <p>• You can delete them anytime from the lessons page</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
