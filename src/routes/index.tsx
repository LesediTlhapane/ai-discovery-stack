/* eslint-disable prettier/prettier */

import { createFileRoute } from "@tanstack/react-router";
import { AIDiscoveryApp } from "@/components/AIDiscoveryApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Discovery Channel — eSTUDY South Africa" },
      {
        name: "description",
        content:
          "Curated directory of 50+ enterprise AI tools across 6 core business functions. Powered by eSTUDY South Africa.",
      },
      { property: "og:title", content: "AI Discovery Channel — eSTUDY South Africa" },
      {
        property: "og:description",
        content:
          "Discover, compare and build your AI automation stack with 50+ curated enterprise tools.",
      },
    ],
  }),
  component: AIDiscoveryApp,
});
