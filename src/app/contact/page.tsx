import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Get in Touch | Different",
  description:
    "Tell us about your campaign. We'll tell you if we're the right fit.",
};

export default function ContactPage() {
  return <ContactContent />;
}
