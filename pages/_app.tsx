import type { AppProps } from 'next/app'
import "./../styles/globals.scss";
import Script from "next/script";
import Link from "next/link";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Link href="https://fonts.googleapis.com"><a></a></Link>
    <Link href="https://fonts.gstatic.com"><a></a></Link>
    <Link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"><a></a></Link>
    
    <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.17.0/TweenMax.min.js" />
    <Component {...pageProps} />
    </>
  )
}

export default MyApp
