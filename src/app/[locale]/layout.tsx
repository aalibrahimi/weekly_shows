import { ThemeProvider } from "next-themes";
import { Navbar } from "@/MyComponents/navbar";
import { Footer } from "@/MyComponents/Footer";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getLangDir } from "rtl-detect";

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Checks if the language is RTL (right to left) or not
  const direction = getLangDir(locale);

  return (
    // Override HTML attributes from the parent layout
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body >
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1 w-full bg-black/10">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}