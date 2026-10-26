import type { Metadata } from "next";
import { AudiencePage } from "@/components/audience-page";
import { STUDIOS } from "@/content/audiences";

export const metadata: Metadata = {
  title: "Progra for Studios: build accountability, increase retention",
  description:
    "Progra is an iOS app for yoga studios that helps members track their progress inside and outside of class. Start with a free 14-day pilot.",
};

export default function StudiosPage() {
  return <AudiencePage content={STUDIOS} />;
}
