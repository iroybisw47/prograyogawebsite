import type { Metadata } from "next";
import { AudiencePage } from "@/components/audience-page";
import { TRAINERS } from "@/content/audiences";

export const metadata: Metadata = {
  title: "Progra for Personal Trainers: build accountability, keep clients longer",
  description:
    "Progra is an iOS app for personal trainers that turns every workout into visible progress. Start with a free 14-day pilot.",
};

export default function TrainersPage() {
  return <AudiencePage content={TRAINERS} />;
}
