import '../styles/globals.css'

import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import dayjs from 'dayjs'
import dayjsLocaleId from 'dayjs/locale/id'
import dayjsRelativeTime from "dayjs/plugin/relativeTime"

dayjs.locale(dayjsLocaleId)
dayjs.extend(dayjsRelativeTime)

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <>
      <Head>
        <title>Animnya</title>

        <meta property="og:title" content="Animnya" />
        <meta name="description" content="Animnya meruapakan situs streaming anime tanpa iklan dan gratis." />
        <meta property="og:description" content="Animnya meruapakan situs streaming anime tanpa iklan dan gratis." />

        <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16x16.png" />
        <link rel="manifest" href="/assets/icons/site.webmanifest" />
        <link rel="mask-icon" href="/assets/icons/safari-pinned-tab.svg" color="#111827" />
        <link rel="shortcut icon" href="/assets/icons/favicon.ico" />
        <meta name="msapplication-TileColor" content="#111827" />
        <meta name="msapplication-config" content="/assets/icons/browserconfig.xml" />
        <meta name="theme-color" content="#111827" />
      </Head>

      <header className='text-center font-bold outline-none py-6'>
        <Link href="/">
          <div className='inline-flex'>
            <img width="25px" className='h-fit mr-3' src='/logo-white.png' alt="logo" />
            <span className='text-xl'>Animnya</span>
          </div>
        </Link>
      </header>

      <Component {...pageProps} />

      <footer className='text-center font-bold outline-none py-6'>
      </footer>
    </>
  )
}