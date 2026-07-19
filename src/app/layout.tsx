import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI-Powered Internship Matching Platform | E-Cell RIT & MCA",
  description: "Next-generation, government-backed AI internship matching platform for the Ministry of Corporate Affairs, engineered by E-Cell Ramaiah Institute of Technology.",
  keywords: ["AI Internship", "E-Cell RIT", "Ministry of Corporate Affairs", "NextJS", "Internship Matcher", "Radix UI", "Tailwind CSS"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full flex flex-col`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
