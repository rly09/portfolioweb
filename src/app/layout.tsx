import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { IntelligentWorkspaceLayout } from "@/components/layout/IntelligentWorkspaceLayout";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "The Adaptive Development Journal",
  description: "An intelligent, app-like developer workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}>
        <IntelligentWorkspaceLayout>
          {children}
        </IntelligentWorkspaceLayout>
      </body>
    </html>
  );
}
