import { blogPosts } from "@/data/blog-posts";
import type { LinkedBlogPost } from "@/components/geo/GeoLandingPage";

/**
 * Résout les blog posts liés à une page géo côté serveur.
 * Évite d'envoyer les 861KB de blog-posts.ts dans le bundle client.
 */
export function resolveBlogPosts(
  blogLinks: { slug: string; title: string }[]
): LinkedBlogPost[] {
  return blogLinks
    .map((link) => {
      const post = blogPosts.find((p) => p.slug === link.slug);
      if (!post) return null;
      return {
        slug: post.slug,
        title: post.title,
        image: post.image,
        imageAlt: post.imageAlt,
        category: post.category,
        readingTime: post.readingTime,
      };
    })
    .filter(Boolean) as LinkedBlogPost[];
}
