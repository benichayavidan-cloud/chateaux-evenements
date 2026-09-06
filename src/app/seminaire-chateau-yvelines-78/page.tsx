import { getGeoLandingPage } from "@/data/geo-landing-pages";
import { GeoLandingPage } from "@/components/geo/GeoLandingPage";
import { VenuesByDepartment } from "@/components/geo/VenuesByDepartment";
import { resolveBlogPosts } from "@/lib/resolve-blog-posts";
import { GuidesSection } from "@/components/lieux";

export { metadata } from "./metadata";

export default function Page() {
  const data = getGeoLandingPage("seminaire-chateau-yvelines-78")!;
  return (
    <>
      <GeoLandingPage data={data} linkedBlogPosts={resolveBlogPosts(data.blogLinks)} />
      <VenuesByDepartment departments={["78"]} title={"Tous nos lieux de séminaire dans les Yvelines (78)"} />
      {/* Maillage vers le blog — voir lib/maillage-blog.ts */}
      <GuidesSection chemin="/seminaire-chateau-yvelines-78" background="gray" />
    </>
  );
}
