import './[locale]/globals.css'

export const metadata = {
  title: 'Website Template',
  description: 'CodeWithAli\'s Website Template',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  )
}