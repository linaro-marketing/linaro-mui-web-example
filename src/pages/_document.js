import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import createCache from "@emotion/cache";
import createEmotionServer from "@emotion/server/create-instance";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // Emotion setup
    let cache = createCache({ key: "css", prepend: true });
    const { extractCriticalToChunks } = createEmotionServer(cache);
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) =>
          function EnhanceApp(props) {
            return <App emotionCache={cache} {...props} />;
          },
      });

    const initialProps = await Document.getInitialProps(ctx);
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(" ")}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));

    // Get the lang prop
    const lang = ctx.query.lang;
    // Render app and page and get the context of the page with collected side effects.

    return {
      ...initialProps,
      lang,
      // Styles fragment is rendered after the app and page rendering finish
      emotionStyleTags,
    };
  }
  render() {
    const { lang } = this.props;
    // eslint-disable
    return (
      <Html lang={lang}>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap"
            rel="stylesheet"
          />
          {this.props.emotionStyleTags}
        </Head>
        <body>
          <script src="/no-flash.js" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
    // eslint-enable
  }
}

export default MyDocument;
