import type { Metadata } from "next";
import CompaniesContent from "./CompaniesContent";

export const metadata: Metadata = {
  title: "For Companies | Different",
  description:
    "Packages and methodology for web3 and AI companies. Campaigns run from audience architecture to brand lift evidence, end-to-end.",
};

export default function CompaniesPage() {
  return <CompaniesContent />;
}
