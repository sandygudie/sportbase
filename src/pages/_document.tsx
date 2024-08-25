import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      
        <meta charSet='UTF-8' />
        <meta
          name='robots'
          content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        />
        <meta property='og:locale' content='en_US' />
        <meta name='author' content='Goodnews Sandy' />
        <meta property='og:image:width' content='920' />
        <meta property='og:image:height' content='470' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          property='og:site_name'
          content='A one shop for all sport needs.'
        />
         <meta
          name='keywords'
          content='Sport Shop, Eccommerce, Online Sport shop, Sport needs, Quality Sport wears'
        />
       <meta
          name="SportBase"
          content=" Quick to deliver your sports needs to your doorstep."
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
       
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
