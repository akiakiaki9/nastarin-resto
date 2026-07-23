import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Nastarin Restaurant",
    template: "%s | Nastarin Restaurant"
  },
  description: "Ресторан Nastarin в городе Жондор - вкусная еда, уютная атмосфера и отличный сервис. Забронируйте столик или закажите доставку.",
  keywords: "ресторан, Настарин, Жондор, еда, доставка, банкет, кафе, узбекская кухня",
  authors: [{ name: "Akbar Soft" }],
  creator: "Akbar Soft",
  publisher: "Akbar Soft",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "Nastarin Restaurant - Ресторан в Жондоре",
    description: "Ресторан Nastarin в городе Жондор - вкусная еда, уютная атмосфера и отличный сервис.",
    url: "https://nastarin-resto.uz",
    siteName: "Nastarin Restaurant",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Nastarin Restaurant Logo",
      },
    ],
    locale: "ru_UZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nastarin Restaurant - Ресторан в Жондоре",
    description: "Ресторан Nastarin в городе Жондор - вкусная еда, уютная атмосфера и отличный сервис.",
    images: ["/logo.png"],
  },
  verification: {
    google: "ваш-код-верификации-google", // Замените на ваш код
  },
  alternates: {
    canonical: "https://nastarin-resto.uz",
  },
  category: "restaurant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes" />
        <meta name="theme-color" content="#2F3A50" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="manifest" href="/manifest.json" />
        <meta property="og:phone_number" content="+998939614777" />
        <meta name="geo.region" content="UZ" />
        <meta name="geo.placename" content="Zhondor" />
        <meta name="geo.position" content="39.739602;64.198873" />
        <meta name="ICBM" content="39.739602, 64.198873" />
      </head>
      <body>{children}</body>
    </html>
  );
}