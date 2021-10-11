import Document, { Head, Html, Main, NextScript } from "next/document";

console.log(process.env.API_KEY, "APIIII");
class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#fff" />
          <script
            async
            defer
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBERa0jlcgpGXzcp-b2w5FdrhwcjAUe-tM&libraries=places"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
