import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes"
import { Toaster } from "sonner";
import MoleculeCanvas from "@/components/molecule-canvas";

export const metadata = {
  title: "SensAi",
  description: "Gen your future with sinsay",
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
    shortcut: '/logo.png'
  }
};

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }) {
  return (
    <>
      <ClerkProvider appearance={{
        baseTheme: dark
      }}>
        <html lang="en" suppressHydrationWarning >
          <body className={`${inter.className}`} >
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <div className="grid-background">
                <MoleculeCanvas />
              </div>
              {/* header */}
              <Header />
              <main className="min-h-screen">{children}</main>
              <Toaster richColors />
              {/* footer */}
              <footer className="bg-muted/50 mt-20 py-12 ">
                <div className="container mx-auto px-4 text-center text-gray-200">
                  <div>Made with 💕 by 5ANi0</div>
                </div>
              </footer>
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}
