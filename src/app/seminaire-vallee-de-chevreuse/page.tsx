import { getGeoLandingPage } from "@/data/geo-landing-pages";
import { GeoLandingPage } from "@/components/geo/GeoLandingPage";
import { VenuesByDepartment } from "@/components/geo/VenuesByDepartment";
import { resolveBlogPosts } from "@/lib/resolve-blog-posts";
import { GuidesSection, ObservatoireSection } from "@/components/lieux";

export { metadata } from "./metadata";

export default function Page() {
  const data = getGeoLandingPage("seminaire-vallee-de-chevreuse")!;
  return (
    <>
      <GeoLandingPage data={data} linkedBlogPosts={resolveBlogPosts(data.blogLinks)} />
      <VenuesByDepartment departments={["78"]} title={"Lieux de séminaire dans les Yvelines et la vallée de Chevreuse"} />
      {/* Observatoire des 188 devis — la donnée propriétaire est ce qui
          fait citer une page par les moteurs de réponse (sondes du 06/09). */}
      <ObservatoireSection departementCode="78" background="white" />

      {/* Maillage vers le blog — voir lib/maillage-blog.ts */}
      <GuidesSection chemin="/seminaire-vallee-de-chevreuse" background="gray" />
    </>
  );
}
