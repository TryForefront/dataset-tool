import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Upload, CircleHelp, Settings2 } from "lucide-react";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ThemeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <div className="flex min-h-screen w-full flex-col">
              <div className="flex flex-col h-screen">
                <header className="z-30 flex py-3 justify-between items-center gap-4 border-b bg-background px-4 sm:px-6">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-2 items-center items-end">
                      <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        Free AI dataset filtering tool
                      </h1>
                      <div className="text-gray-700">
                        by{" "}
                        <Link
                          className="text-black font-medium"
                          href="https://forefront.ai"
                        >
                          Forefront AI
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 gap-1 text-sm"
                    >
                      <Upload className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">
                        Upload dataset
                      </span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 gap-1 text-sm"
                    >
                      <CircleHelp className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">Help</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 gap-1 text-sm"
                    >
                      <Settings2 className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">
                        Configure AI
                      </span>
                    </Button>
                    <ModeToggle />
                  </div>
                </header>

                <div className="flex-1 overflow-auto px-4 py-2 bg-muted">
                  {children}
                </div>
              </div>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
