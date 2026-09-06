import { getGeoLandingPage } from "@/data/geo-landing-pages";
import { GeoLandingPage } from "@/components/geo/GeoLandingPage";
import { VenuesByDepartment } from "@/components/geo/VenuesByDepartment";
import { resolveBlogPosts } from "@/lib/resolve-blog-posts";
import { GuidesSection } from "@/components/lieux";

export { metadata } from "./metadata";

export default function Page() {
  const data = getGeoLandingPage("seminaire-chateau-proche-paris")!;
  return (
    <>
      <GeoLandingPage data={data} linkedBlogPosts={resolveBlogPosts(data.blogLinks)} />
      <VenuesByDepartment departments={["78","92","95","91","77","60"]} title={"Lieux de séminaire à moins d’une heure de Paris"} />
      {/* Maillage vers le blog — voir lib/maillage-blog.ts */}
      <GuidesSection chemin="/seminaire-chateau-proche-paris" background="gray" />
    </>
  );
}
