import type { Metadata } from "next";
import { Terms } from "@/components/Legal";

export const metadata: Metadata = { title: "terms · make me cool" };

export default function Page() {
  return <Terms />;
}
