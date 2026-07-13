import type { Metadata } from "next";
import GeneratePage from "@/components/GeneratePage";

export const metadata: Metadata = {
  title: "Generate Custom Instruction | Orxis",
  description:
    "Create your perfect AI custom instruction with our interactive 4-step wizard. Select a persona, define tasks, set the tone, and add rules.",
};

export default function Generate() {
  return <GeneratePage />;
}
