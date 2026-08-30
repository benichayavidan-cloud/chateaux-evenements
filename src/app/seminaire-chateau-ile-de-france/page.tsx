import { getGeoLandingPage } from "@/data/geo-landing-pages";
import { GeoLandingPage } from "@/components/geo/GeoLandingPage";
import { VenuesByDepartment } from "@/components/geo/VenuesByDepartment";
import { resolveBlogPosts } from "@/lib/resolve-blog-posts";

export { metadata } from "./metadata";

export default function Page() {
  const data = getGeoLandingPage("seminaire-chateau-ile-de-france")!;
  return (
    <>
      <GeoLandingPage data={data} linkedBlogPosts={resolveBlogPosts(data.blogLinks)} />
      <VenuesByDepartment departments={["78","77","91","95","92"]} title={"Tous nos lieux de séminaire en Île-de-France"} />
    </>
  );
}
