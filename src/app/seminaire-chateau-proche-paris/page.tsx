import { getGeoLandingPage } from "@/data/geo-landing-pages";
import { GeoLandingPage } from "@/components/geo/GeoLandingPage";
import { VenuesByDepartment } from "@/components/geo/VenuesByDepartment";
import { resolveBlogPosts } from "@/lib/resolve-blog-posts";
import { GuidesSection, ObservatoireSection } from "@/components/lieux";

export { metadata } from "./metadata";

export default function Page() {
  const data = getGeoLandingPage("seminaire-chateau-proche-paris")!;
  return (
    <>
      <GeoLandingPage data={data} linkedBlogPosts={resolveBlogPosts(data.blogLinks)} />
      <VenuesByDepartment departments={["78","92","95","91","77","60"]} title={"Lieux de séminaire à moins d’une heure de Paris"} />
      {/* Observatoire des 188 devis — la donnée propriétaire est ce qui
          fait citer une page par les moteurs de réponse (sondes du 06/09). */}
      <ObservatoireSection departementCode={null} background="white" />

      {/* Maillage vers le blog — voir lib/maillage-blog.ts */}
      <GuidesSection chemin="/seminaire-chateau-proche-paris" background="gray" />
    </>
  );
}
