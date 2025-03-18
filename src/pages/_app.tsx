// filepath: /home/ubuntu/Desktop/eurotex/stationsync/src/pages/_app.tsx
import '../app/globals.css';
import type { AppProps } from 'next/app';
import { AlertProvider } from '../context/alertContext';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AlertProvider>
      <Component {...pageProps} />
    </AlertProvider>
  )
}

export default MyApp;