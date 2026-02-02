import { metadata as merciMetadata } from "./metadata";

export const metadata = merciMetadata;

export default function MerciLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
