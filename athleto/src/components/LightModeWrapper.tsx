import { ThemeProvider } from "@/components/theme-provider";
import React from "react";

export default function LightModeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light">
      <div className="light">{children}</div>
    </ThemeProvider>
  );
}
