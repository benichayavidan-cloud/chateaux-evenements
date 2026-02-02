import { Suspense } from "react";
import MerciContent from "./MerciContent";

export default function MerciPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#FFFFFF" }} />}>
      <MerciContent />
    </Suspense>
  );
}
