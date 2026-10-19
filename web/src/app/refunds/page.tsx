import type { Metadata } from "next";
import { Refunds } from "@/components/Legal";

export const metadata: Metadata = { title: "refunds · make me cool" };

export default function Page() {
  return <Refunds />;
}
