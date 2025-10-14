import fs from "fs";
import path from "path";

export interface MarkdownDoc {
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  order: number;
}

// Define the markdown docs structure
const markdownDocsConfig: Omit<MarkdownDoc, "content">[] = [
  {
    slug: "setup",
    title: "Setup Guide",
    excerpt: "Complete development environment setup for Répéter",
    category: "Development",
    order: 1,
  },
  {
    slug: "deployment",
    title: "Deployment Guide",
    excerpt: "Production deployment instructions and configuration",
    category: "Development",
    order: 2,
  },
  {
    slug: "features",
    title: "Features Overview",
    excerpt: "Complete guide to all app features and capabilities",
    category: "Documentation",
    order: 3,
  },
  {
    slug: "supabase-setup",
    title: "Supabase Setup",
    excerpt: "Database and authentication setup guide",
    category: "Development",
    order: 4,
  },
  {
    slug: "index",
    title: "Documentation Index",
    excerpt: "Quick navigation to all documentation",
    category: "Documentation",
    order: 5,
  },
];

export function getAllMarkdownDocSlugs(): string[] {
  return markdownDocsConfig.map((doc) => doc.slug);
}

export function getMarkdownDoc(slug: string): MarkdownDoc | null {
  const config = markdownDocsConfig.find((doc) => doc.slug === slug);
  if (!config) return null;

  try {
    const docsPath = path.join(process.cwd(), "docs", `${slug}.md`);
    const content = fs.readFileSync(docsPath, "utf8");

    // Extract excerpt from content if not provided
    const excerpt = config.excerpt || extractExcerpt(content);

    return {
      ...config,
      content,
      excerpt,
    };
  } catch (error) {
    console.error(`Error reading markdown file for slug ${slug}:`, error);
    return null;
  }
}

export function getMarkdownDocsByCategory(): Record<string, MarkdownDoc[]> {
  const docsByCategory: Record<string, MarkdownDoc[]> = {};

  markdownDocsConfig.forEach((config) => {
    try {
      const docsPath = path.join(process.cwd(), "docs", `${config.slug}.md`);
      const content = fs.readFileSync(docsPath, "utf8");

      const doc: MarkdownDoc = {
        ...config,
        content,
        excerpt: config.excerpt || extractExcerpt(content),
      };

      if (!docsByCategory[config.category]) {
        docsByCategory[config.category] = [];
      }
      docsByCategory[config.category].push(doc);
    } catch (error) {
      console.error(`Error reading markdown file for ${config.slug}:`, error);
    }
  });

  // Sort docs within each category by order
  Object.keys(docsByCategory).forEach((category) => {
    docsByCategory[category].sort((a, b) => a.order - b.order);
  });

  return docsByCategory;
}

function extractExcerpt(content: string): string {
  // Extract first paragraph or first few lines as excerpt
  const lines = content.split("\n").filter((line) => line.trim());

  // Find the first paragraph (after title)
  let excerpt = "";
  let foundContent = false;

  for (const line of lines) {
    if (line.startsWith("# ") && !foundContent) {
      // Skip the main title
      continue;
    }

    if (line.trim() && !line.startsWith("#")) {
      excerpt = line.trim();
      foundContent = true;
      break;
    }
  }

  // Limit excerpt length
  if (excerpt.length > 150) {
    excerpt = excerpt.substring(0, 147) + "...";
  }

  return excerpt || "Documentation for Répéter";
}
