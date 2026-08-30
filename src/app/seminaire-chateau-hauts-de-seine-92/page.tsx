import { getGeoLandingPage } from "@/data/geo-landing-pages";
import { GeoLandingPage } from "@/components/geo/GeoLandingPage";
import { resolveBlogPosts } from "@/lib/resolve-blog-posts";

export { metadata } from "./metadata";

export default function Page() {
  const data = getGeoLandingPage("seminaire-chateau-hauts-de-seine-92")!;
  return <GeoLandingPage data={data} linkedBlogPosts={resolveBlogPosts(data.blogLinks)} />;
}
