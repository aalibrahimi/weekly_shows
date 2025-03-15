import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Navbar } from "@/MyComponents/navbar";
import { Footer } from "@/MyComponents/Footer";
import { NextIntlClientProvider, Locale, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getLangDir } from "rtl-detect";

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Checks if the language is RTL ( right to left ) or not
  const direction = getLangDir(locale);

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1 w-full">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
