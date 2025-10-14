import { AuthHeader } from "@/components/AuthHeader";
import { AppFooter } from "@/components/AppFooter";
import {
  getMarkdownDoc,
  getAllMarkdownDocSlugs,
  getMarkdownDocsByCategory,
} from "@/lib/markdown-docs";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateStaticParams() {
  const slugs = getAllMarkdownDocSlugs();

  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function MarkdownDocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getMarkdownDoc(slug);

  if (!doc) {
    notFound();
  }

  const docsByCategory = getMarkdownDocsByCategory();

  return (
    <div className="min-h-screen bg-[#5BA3E8] flex flex-col">
      <AuthHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Navigation */}
              <aside className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-4 sticky top-4">
                  <Link
                    href="/docs/markdown"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 text-sm font-medium transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    All Docs
                  </Link>

                  <nav className="space-y-4">
                    {Object.entries(docsByCategory).map(
                      ([category, categoryDocs]) => (
                        <div key={category}>
                          <h3 className="text-sm font-semibold text-gray-900 mb-2">
                            {category}
                          </h3>
                          <ul className="space-y-2">
                            {categoryDocs.map((categoryDoc) => (
                              <li key={categoryDoc.slug}>
                                <Link
                                  href={`/docs/markdown/${categoryDoc.slug}`}
                                  className={`block text-sm transition-colors ${
                                    doc.slug === categoryDoc.slug
                                      ? "text-blue-600 font-medium"
                                      : "text-gray-600 hover:text-blue-600"
                                  }`}
                                >
                                  {categoryDoc.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    )}
                  </nav>

                  <div className="mt-8 pt-4 border-t border-gray-200">
                    <Link
                      href="/docs"
                      className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      User Guides
                    </Link>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <article className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
                  <header className="mb-8">
                    <div className="text-sm text-blue-600 font-medium mb-2">
                      {doc.category}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                      {doc.title}
                    </h1>
                    {doc.excerpt && (
                      <p className="text-lg text-gray-600">{doc.excerpt}</p>
                    )}
                  </header>

                  <div
                    className="prose prose-lg max-w-none
                      prose-headings:font-semibold 
                      prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8
                      prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                      prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                      prose-h4:text-lg prose-h4:mt-4 prose-h4:mb-2
                      prose-p:mb-4 prose-p:leading-relaxed
                      prose-ul:my-4 prose-ul:ml-6
                      prose-ol:my-4 prose-ol:ml-6
                      prose-li:mb-2
                      prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                      prose-strong:font-semibold prose-strong:text-gray-900
                      prose-code:text-sm prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                      prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                      prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic
                      prose-table:border-collapse prose-table:border prose-table:border-gray-300
                      prose-th:border prose-th:border-gray-300 prose-th:bg-gray-50 prose-th:px-4 prose-th:py-2
                      prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-2"
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {doc.content}
                    </ReactMarkdown>
                  </div>

                  {/* Navigation Footer */}
                  <footer className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <Link
                        href="/docs/markdown"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                        Back to Documentation
                      </Link>
                      <Link
                        href="/docs"
                        className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        User Guides
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </footer>
                </div>
              </article>
            </div>
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
