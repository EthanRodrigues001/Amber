import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Link as Github } from "lucide-react";
import "./globals.css";
import { IconDatabase, IconHome } from "@tabler/icons-react";
import { FloatingNav } from "@/components/ui/floating-navbar";
// import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Amber",
  description:
    "Amber is a premium and secure image storage platform that allows users to upload and store images up to 5MB. Built with Next.js, React.js, TypeScript, Aceternity UI, Shadcn UI, and TailwindCSS, Amber ensures a smooth and efficient user experience. Store your images with confidence using Amber's reliable cloud storage powered by Pinata.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Amber",
    description:
      "Amber is a premium and secure image storage platform that allows users to upload and store images up to 5MB. Built with Next.js, React.js, TypeScript, Aceternity UI, Shadcn UI, and TailwindCSS, Amber ensures a smooth and efficient user experience. Store your images with confidence using Amber's reliable cloud storage powered by Pinata.",
    url: "https://amber.blingo.tech/",
    type: "website",
    images: [
      { url: "/banner.png", width: 1200, height: 630, alt: "Amber Banner" },
    ],
  },
  keywords:
    "Amber, image storage, secure image storage, cloud storage, Next.js, React.js, TypeScript, Aceternity UI, Shadcn UI, TailwindCSS, Pinata, upload images, store images, free image storage",
  authors: [{ name: "Ethan Rodrigues" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Storage",
      link: "/storage",
      icon: (
        <IconDatabase className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <FloatingNav navItems={navItems} />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-zinc-900 text-zinc-400 py-8">
      <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
        <p>© 2024 Amber. Created by Ethan.</p>
        <a
          href="https://github.com/EthanRodrigues001"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:text-zinc-100 transition-colors"
        >
          <Github className="w-5 h-5 mr-2" />
          View on GitHub
        </a>
      </div>
    </footer>
  );
}
