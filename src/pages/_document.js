import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang='en-US'>
      <Head>
        <meta name='viewport' content='width=device-width,initial-scale=1'/>
        <meta name='fragment' content='!'/>
        <meta name='mobile-web-app-capable' content='yes'/>
        <link rel='shortcut icon' type='image/png' href='/images/shortcut-icon.png'/>
        <link rel='apple-touch-icon' sizes='196x196' type='image/png' href='/images/mobile-app-icon.png'/>
      </Head>
        <Head>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
