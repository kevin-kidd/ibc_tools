import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;400&display=swap" rel="stylesheet" />
            </Head>
            <Main />
            <NextScript />
        </Html>
    )
}