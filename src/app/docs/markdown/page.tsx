import { AuthHeader } from "@/components/AuthHeader";
import { AppFooter } from "@/components/AppFooter";
import { getMarkdownDocsByCategory } from "@/lib/markdown-docs";
import Link from "next/link";

export default function MarkdownDocsPage() {
  const docsByCategory = getMarkdownDocsByCategory();

  return (
    <div className="min-h-screen bg-[#5BA3E8] flex flex-col">
      <AuthHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Technical Documentation
              </h1>
              <p className="text-lg text-white/90 mb-6">
                Complete guides for setup, deployment, and development
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  href="/docs"
                  className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-2"
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
                  User Guides
                </Link>
                <Link
                  href="/docs/markdown"
                  className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-white/90 transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Technical Docs
                </Link>
              </div>
            </div>

            {Object.entries(docsByCategory).map(([category, categoryDocs]) => (
              <section key={category} className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryDocs.map((doc) => (
                    <Link
                      key={doc.slug}
                      href={`/docs/markdown/${doc.slug}`}
                      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-semibold text-gray-900 flex-1">
                          {doc.title}
                        </h3>
                        <svg
                          className="w-5 h-5 text-blue-600 ml-2"
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
                      </div>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {doc.excerpt}
                      </p>
                      <div className="flex items-center text-blue-600 font-medium text-sm">
                        Read guide
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
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}

            {/* Quick Links Section */}
            <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Quick Links
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  href="/docs/markdown/setup"
                  className="bg-white/20 text-white p-4 rounded-lg hover:bg-white/30 transition-colors text-center"
                >
                  <div className="font-medium">🚀 Setup</div>
                  <div className="text-sm opacity-90">Get started</div>
                </Link>
                <Link
                  href="/docs/markdown/deployment"
                  className="bg-white/20 text-white p-4 rounded-lg hover:bg-white/30 transition-colors text-center"
                >
                  <div className="font-medium">🚀 Deploy</div>
                  <div className="text-sm opacity-90">Go live</div>
                </Link>
                <Link
                  href="/docs/markdown/features"
                  className="bg-white/20 text-white p-4 rounded-lg hover:bg-white/30 transition-colors text-center"
                >
                  <div className="font-medium">📚 Features</div>
                  <div className="text-sm opacity-90">Learn more</div>
                </Link>
                <Link
                  href="/docs"
                  className="bg-white/20 text-white p-4 rounded-lg hover:bg-white/30 transition-colors text-center"
                >
                  <div className="font-medium">👤 User Guides</div>
                  <div className="text-sm opacity-90">For users</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
