// filepath: /home/ubuntu/Desktop/eurotex/stationsync/src/pages/_app.tsx
import '../app/globals.css';
import type { AppProps } from 'next/app';
import { AlertProvider } from '../context/alertContext';
import Head from 'next/head';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#2E3A46" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <title>Delian Petrov: Innovating Ideas & Solutions</title>
        <meta
          name="description"
          content="I combine the power of Ruby on Rails and React to build dynamic web applications. Discover my work, learn from my experiences, and explore the world of full-stack development."
        />
        <meta property="og:title" content="Delian Petrov: Senior Software Engineer Specialized in Ruby on Rails and React" />
        <meta property="og:description" content="I combine the power of Ruby on Rails and React to build dynamic web applications. Discover my work, learn from my experiences, and explore the world of full-stack development." />
        <meta property="og:image" content="/avatar.jpg" />
        <meta property="og:url" content="https://delianpetrov.com" />
        <meta name="msapplication-TileColor" content="#da532c" />
      </Head>
      <AlertProvider>
        <Component {...pageProps} />
      </AlertProvider>
    </>
  )
}

export default MyApp;