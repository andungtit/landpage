import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/assets/favicon-32.png" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
        <link
          rel="preload"
          href="/assets/oneplan/neue-montreal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="preload" href="/assets/oneplan/01-home.webp" as="image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
