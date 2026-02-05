"use client";

import dynamic from "next/dynamic";

const DevisForm = dynamic(
  () => import("@/components/DevisForm").then(mod => ({ default: mod.DevisForm })),
  {
    ssr: false,
    loading: () => (
      <div style={{ minHeight: "500px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", color: "#6b7c93" }}>
          <div style={{
            width: "40px", height: "40px", border: "3px solid #e5e7eb",
            borderTopColor: "#A37E2C", borderRadius: "50%",
            animation: "spin 1s linear infinite", margin: "0 auto 1rem"
          }} />
          <p>Chargement du formulaire...</p>
        </div>
      </div>
    ),
  }
);

export function DevisFormLazy() {
  return <DevisForm />;
}
