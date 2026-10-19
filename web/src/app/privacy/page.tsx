import type { Metadata } from "next";
import { Privacy } from "@/components/Legal";

export const metadata: Metadata = { title: "privacy · make me cool" };

export default function Page() {
  return <Privacy />;
}
