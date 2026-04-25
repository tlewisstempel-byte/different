import type { Metadata } from "next";
import CreatorsContent from "./CreatorsContent";

export const metadata: Metadata = {
  title: "For Creators | Different",
  description:
    "Apply to join Different's creator network. We work with tech-native influencers for web3 and AI campaigns.",
};

export default function CreatorsPage() {
  return <CreatorsContent />;
}
