import { getGeoLandingPage } from "@/data/geo-landing-pages";
import { GeoLandingPage } from "@/components/geo/GeoLandingPage";
import { VenuesByDepartment } from "@/components/geo/VenuesByDepartment";
import { resolveBlogPosts } from "@/lib/resolve-blog-posts";
import { GuidesSection } from "@/components/lieux";

export { metadata } from "./metadata";

export default function Page() {
  const data = getGeoLandingPage("seminaire-chateau-chantilly")!;
  return (
    <>
      <GeoLandingPage data={data} linkedBlogPosts={resolveBlogPosts(data.blogLinks)} />
      <VenuesByDepartment departments={["60"]} title={"Lieux de séminaire à Chantilly et dans l’Oise"} />
      {/* Maillage vers le blog — voir lib/maillage-blog.ts */}
      <GuidesSection chemin="/seminaire-chateau-chantilly" background="gray" />
    </>
  );
}
