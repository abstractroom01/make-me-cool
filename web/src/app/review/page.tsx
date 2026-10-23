import type { Metadata } from "next";
import { ReviewLogin } from "@/components/ReviewLogin";

// A hidden sign-in for one review account (for payment-provider checks). Not linked from anywhere and kept out of search.
export const metadata: Metadata = {
  title: "review sign-in · make me cool",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ReviewLogin />;
}
