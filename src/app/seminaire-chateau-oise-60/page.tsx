import { getGeoLandingPage } from "@/data/geo-landing-pages";
import { GeoLandingPage } from "@/components/geo/GeoLandingPage";
import { VenuesByDepartment } from "@/components/geo/VenuesByDepartment";
import { resolveBlogPosts } from "@/lib/resolve-blog-posts";
import { GuidesSection, ObservatoireSection } from "@/components/lieux";

export { metadata } from "./metadata";

export default function Page() {
  const data = getGeoLandingPage("seminaire-chateau-oise-60")!;
  return (
    <>
      <GeoLandingPage data={data} linkedBlogPosts={resolveBlogPosts(data.blogLinks)} />
      <VenuesByDepartment departments={["60"]} title={"Tous nos lieux de séminaire dans l'Oise (60)"} />
      {/* Observatoire des 188 devis — la donnée propriétaire est ce qui
          fait citer une page par les moteurs de réponse (sondes du 06/09). */}
      <ObservatoireSection departementCode="60" background="white" />

      {/* Maillage vers le blog — voir lib/maillage-blog.ts */}
      <GuidesSection chemin="/seminaire-chateau-oise-60" background="gray" />
    </>
  );
}
