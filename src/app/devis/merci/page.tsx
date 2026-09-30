import MerciContent from "./MerciContent";

// Plus de <Suspense> : la page ne lit plus `?ref=` (useSearchParams), son
// contenu part donc entier dans le HTML servi.
export default function MerciPage() {
  return <MerciContent />;
}
