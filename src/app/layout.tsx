import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Github, RefreshCw, Menu, Package2 } from "lucide-react";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ThemeToggle";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import UploadDialog from "@/components/dialogs/UploadDialog";
import HotkeysBox from "@/components/HotkeysBox";
import HotkeysButton from "@/components/HotkeysButton";
import GithubButton from "@/components/GithubButton";
import ForefrontLogo from "@/components/ForefrontLogo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Open Source AI dataset filtering tool -- Forefront AI",
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
              <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
                <div className="flex items-center gap-4">
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                  >
                    <ForefrontLogo height={24} width={24} />
                    <span className="sr-only md:not-sr-only">
                      Open Source AI Dataset Tool
                    </span>

                    <Link
                      href="https://forefront.ai"
                      className="text-sm text-muted-foreground hover:underline sr-only md:not-sr-only"
                    >
                      by <span className="text-foreground">Forefront AI</span>
                    </Link>
                  </Link>
                  <nav className="hidden md:flex items-center space-x-4"></nav>
                </div>
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="hidden md:flex h-8 gap-1 text-xs"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                        <span>Start with new dataset</span>
                      </Button>
                    </DialogTrigger>
                    <UploadDialog />
                  </Dialog>
                  <HotkeysButton />
                  <GithubButton />
                  <ModeToggle />
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 shrink-0 md:hidden"
                      >
                        <Menu className="h-4 w-4" />
                        <span className="sr-only">Toggle navigation menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <nav className="grid gap-4 text-md font-medium">
                        <ForefrontLogo height={24} width={24} />
                        <div className="flex flex-col gap-0">
                          <span className="">Open Source AI Dataset Tool</span>

                          <Link
                            href="https://forefront.ai"
                            className="text-sm text-muted-foreground hover:underline"
                          >
                            by{" "}
                            <span className="text-foreground">
                              Forefront AI
                            </span>
                          </Link>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="mt-4 justify-start"
                            >
                              <RefreshCw className="my-2 h-4 w-4" />
                              Start with new dataset
                            </Button>
                          </DialogTrigger>
                          <UploadDialog />
                        </Dialog>
                      </nav>
                    </SheetContent>
                  </Sheet>
                </div>
              </header>
              <main className="flex-1 overflow-auto cursor-pointer px-4 py-2 bg-muted">
                {children}
              </main>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
