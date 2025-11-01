// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" data-scroll-behavior="smooth">
        <Head>

          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <h1 className="visually-hidden">GreenKart - Shop Plants Online</h1>
          <section>
            <Main />
          </section>
          <NextScript />
        </body>
      </Html>
    );
  }
}
