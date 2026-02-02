import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { getBlogPostBySlug, getSmartRelatedPosts } from "@/data/blog-posts";
import { ArticleClientLogic } from "./ArticleClientLogic";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogArticlePage({ params }: Props) {
  // Server-side: Récupération de l'article
  const { slug } = await params;
  const article = getBlogPostBySlug(slug);

  if (!article) {
    notFound();
  }

  // Articles similaires avec Topic Clustering (calculés côté serveur)
  const relatedPosts = getSmartRelatedPosts(article, 3);

  return (
    <div className="brakt-blog min-h-screen bg-white w-full">
      {/* Composant Client pour la logique interactive */}
      <ArticleClientLogic article={article}>
        {/* Related Articles (Server-rendered) */}
        {relatedPosts.length > 0 && (
          <section className="w-full bg-gradient-to-b from-gray-50 to-white flex justify-center" style={{ padding: '12px 0' }}>
            <div className="max-w-7xl flex flex-col items-center gap-8 sm:gap-10 md:gap-12" style={{ padding: '0 20px' }}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light italic text-gray-900 text-center px-4">
                À Lire Aussi
              </h2>
              <div className="grid !grid-cols-1 sm:!grid-cols-2 md:!grid-cols-3 gap-5 sm:gap-6 md:gap-8 w-full mx-auto">
                {relatedPosts.map((post) => (
                  <article key={post.id} className="post-outer">
                    {/* Image */}
                    <div className="post-thumb">
                      <Link href={`/blog/${post.slug}`}>
                        <Image
                          src={post.image}
                          alt={post.imageAlt}
                          fill
                          className="object-cover"
                          style={{ objectPosition: 'center' }}
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </Link>
                    </div>

                    {/* Content */}
                    <div className="post-info">
                      {/* Category */}
                      <div className="post-labels">
                        <Link href={`/blog?category=${post.category}`}>
                          {post.category === "organisation" && "Organisation"}
                          {post.category === "lieux" && "Lieux & Géographie"}
                          {post.category === "team-building" && "Team Building"}
                        </Link>
                      </div>

                      {/* Title */}
                      <h3 className="post-title">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>

                      {/* Excerpt */}
                      <div className="post-snippet">
                        {post.excerpt}
                      </div>

                      {/* Meta */}
                      <div className="post-meta">
                        <div className="post-meta-item">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{post.readingTime} min</span>
                        </div>
                      </div>

                      {/* Read More Button */}
                      <div className="read-more">
                        <Link href={`/blog/${post.slug}`}>
                          <span>Lire l'article</span>
                          <ArrowRight className="w-4 h-4 inline-block ml-2 align-middle" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Final (Server-rendered) */}
        <section className="w-full bg-gradient-to-br from-amber-50 to-orange-50 flex justify-center" style={{ padding: '60px 20px' }}>
          <div className="max-w-4xl px-6 sm:px-8 md:px-12 text-center space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light italic text-gray-900 px-4">
              Prêt à Passer à l'Action ?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto px-4">
              Transformez ces insights en un séminaire d'exception pour vos équipes.
            </p>
            <Link
              href="/devis"
              style={{ padding: '16px 40px' }}
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-l from-amber-600 to-[#d4af37] text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl text-base shadow-lg"
            >
              <span>Obtenir mon Devis Gratuit</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-xs sm:text-sm text-gray-600 px-4 font-medium">
              ✓ Réponse sous 24h • ✓ Sans engagement • ✓ Conseils personnalisés
            </p>
          </div>
        </section>
      </ArticleClientLogic>
    </div>
  );
}
