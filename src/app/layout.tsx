import { ThemeProvider } from "next-themes";
import "./globals.css";
import { ModeToggle } from "@/components/modetoggle";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
       
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
             < ModeToggle />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
