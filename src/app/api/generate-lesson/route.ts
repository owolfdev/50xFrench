import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Mark this route as dynamic to prevent static generation
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // Check if API key exists
    if (!process.env.OPENAI_API_KEY) {
      console.error("❌ OPENAI_API_KEY not found in environment variables");
      return NextResponse.json(
        { 
          error: "OpenAI API key not configured",
          details: "Please add OPENAI_API_KEY to your environment variables"
        },
        { status: 500 }
      );
    }

    // Initialize OpenAI client here to avoid build-time issues
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { prompt, difficulty = "beginner" } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required and must be a string" },
        { status: 400 }
      );
    }

    const systemPrompt = `You are a French language teacher creating comprehensive drilling lessons. 

Create a lesson that teaches: "${prompt}"

The lesson should:
1. Start with VERY SHORT, simple phrases (2-4 words)
2. Progressively build to LONGER, more complex sentences (15-25 words)
3. Use REPETITION to drill the target word/verb/pattern
4. Show the same structure with slight variations
5. Include at least 15-20 lines of progressive content
6. Be entirely in French with English translations
7. Target ${difficulty} level learners

Return ONLY a JSON object with this exact structure:
{
  "title": "Lesson title in French",
  "topic": "main topic (e.g., avoir, aller, definite articles)",
  "difficulty": "${difficulty}",
  "content": [
    {
      "french": "Je vais.",
      "english": "I go."
    },
    {
      "french": "Tu vas.",
      "english": "You go."
    },
    {
      "french": "Je vais à Paris.",
      "english": "I go to Paris."
    },
    {
      "french": "Aujourd'hui, je vais au marché pour acheter des légumes frais.",
      "english": "Today, I go to the market to buy fresh vegetables."
    }
  ]
}

IMPORTANT: 
- Start simple, build complexity gradually
- Use repetition of the target concept
- Each line should have both French and English
- Aim for 15-20+ lines minimum
- Progress from 2-3 words to 15-25 words per line
- Make it comprehensive and drill-focused`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Create a comprehensive drilling lesson about: ${prompt}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 3000,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from OpenAI");
    }

    // Parse the JSON response
    let lesson;
    try {
      lesson = JSON.parse(content);
    } catch {
      console.error("Failed to parse OpenAI response:", content);
      throw new Error("Invalid JSON response from AI");
    }

    // Validate and transform the lesson
    const lessonId = `lesson-${Date.now()}`;
    const validatedLesson = {
      id: lessonId,
      title: lesson.title || `Lesson: ${prompt}`,
      topic: lesson.topic || prompt.toLowerCase(),
      difficulty: lesson.difficulty || difficulty,
      content: lesson.content || [],
      created_at: new Date().toISOString(),
      is_generated: true,
    };

    // Ensure content has the right structure
    if (!Array.isArray(validatedLesson.content)) {
      throw new Error("Lesson content must be an array");
    }

    validatedLesson.content = validatedLesson.content.map(
      (line: { french?: string; english?: string }) => ({
        french: line.french || "",
        english: line.english || "",
      })
    );

    return NextResponse.json({
      lesson: validatedLesson,
    });
  } catch (error) {
    console.error("Error generating lesson:", error);
    return NextResponse.json(
      {
        error: "Failed to generate lesson",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
