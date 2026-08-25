/**
 * Pagination du blog — module neutre (importable côté serveur ET client).
 */

import { blogPosts } from "@/data/blog-posts";

export const POSTS_PER_PAGE = 36;

export function getBlogTotalPages(): number {
  return Math.ceil(blogPosts.length / POSTS_PER_PAGE);
}
