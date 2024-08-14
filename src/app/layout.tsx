import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { RefreshCw } from "lucide-react";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ThemeToggle";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UploadDialog from "@/components/dialogs/UploadDialog";
import HotkeysBox from "@/components/HotkeysBox";
import HotkeysButton from "@/components/HotkeysButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Free AI dataset filtering tool -- Forefront AI",
  description:
    "Quickly filter your AI dataset with this free tool by Forefront AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <HotkeysBox />
            <div className="flex min-h-screen w-full flex-col">
              <div className="flex flex-col h-screen">
                <header className="z-30 flex py-3 justify-between items-center gap-4 border-b bg-background px-4 sm:px-6">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-2 items-center items-end">
                      <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        Free AI dataset filtering tool
                      </h1>
                      <div className="text-muted-foreground">
                        by{" "}
                        <Link
                          className="text-foreground font-medium"
                          href="https://forefront.ai"
                        >
                          Forefront AI
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 gap-1 text-sm"
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only">
                            Start with new dataset
                          </span>
                        </Button>
                      </DialogTrigger>
                      <UploadDialog />
                    </Dialog>

                    <HotkeysButton />
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
