import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Dinesh S | AI & Generative AI Engineer Portfolio",
  description: "Portfolio of Dinesh S, B.Tech Artificial Intelligence & Data Science student and Generative AI Engineer specializing in ML, deep learning, AI Agents, and robust software systems.",
  keywords: ["Dinesh S", "AI Engineer", "Generative AI Engineer", "Machine Learning", "Coimbatore", "India", "Next.js Portfolio", "React", "AI Developer"],
  authors: [{ name: "Dinesh S", url: "https://github.com/Dinesh2k06" }],
  creator: "Dinesh S",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/Dinesh2k06",
    title: "Dinesh S | AI & Generative AI Engineer",
    description: "Building intelligent AI solutions that solve real-world problems.",
    siteName: "Dinesh S Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dinesh S | AI & Generative AI Engineer",
    description: "Building intelligent AI solutions that solve real-world problems.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`} suppressHydrationWarning>
      <head>
        {/* Anti-flash theme script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground antialiased selection:bg-rose-500/20 selection:text-[#F43F5E]">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
