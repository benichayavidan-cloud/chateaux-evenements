/**
 * INDEX BLOG — Server Component (page 1).
 * La grille est paginée (36 articles/page) : le HTML servi reste léger,
 * les pages suivantes sont crawlables via /blog/page/[n].
 */

import { BlogIndexView } from "./blog-index-view";

export default function BlogPage() {
  return <BlogIndexView page={1} />;
}
