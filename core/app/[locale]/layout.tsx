import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { PropsWithChildren } from 'react';

import '../globals.css';

import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { revalidate } from '~/client/revalidate-target';

import { Notifications } from '../notifications';
import { Providers } from '../providers';

const gotham = localFont({
  src: [
    {
      path: './fonts/GothamGreek-Light.woff2',
      weight: '300',
      style: 'normal',
    },

    {
      path: './fonts/GothamGreek-Book.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/GothamGreek-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/GothamGreek-Medium.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--ff-gotham',
});

const butler = localFont({
  src: [
    {
      path: './fonts/Butler-UltraLight.woff2',
      weight: '200',
      style: 'normal',
    },

    {
      path: './fonts/Butler-Light.woff2',
      weight: '300',
      style: 'normal',
    },

    {
      path: './fonts/Butler.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Butler-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Butler-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Butler-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },

    {
      path: './fonts/Butler-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--ff-butler',
});

const RootLayoutMetadataQuery = graphql(`
  query RootLayoutMetadataQuery {
    site {
      settings {
        storeName
        seo {
          pageTitle
          metaDescription
          metaKeywords
        }
      }
    }
  }
`);

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await client.fetch({
    document: RootLayoutMetadataQuery,
    fetchOptions: { next: { revalidate } },
  });

  const storeName = data.site.settings?.storeName ?? '';

  const { pageTitle, metaDescription, metaKeywords } = data.site.settings?.seo || {};

  return {
    title: {
      template: `%s - ${storeName}`,
      default: pageTitle || storeName,
    },
    icons: {
      icon: '/favicon.ico', // app/favicon.ico/route.ts
    },
    description: metaDescription,
    keywords: metaKeywords ? metaKeywords.split(',') : null,
    other: {
      platform: 'bigcommerce.catalyst',
      build_sha: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? '',
    },
  };
}

const VercelComponents = () => {
  if (process.env.VERCEL !== '1') {
    return null;
  }

  return (
    <>
      {process.env.DISABLE_VERCEL_ANALYTICS !== 'true' && <Analytics />}
      {process.env.DISABLE_VERCEL_SPEED_INSIGHTS !== 'true' && <SpeedInsights />}
    </>
  );
};

interface Props extends PropsWithChildren {
  params: { locale: string };
}

export default function RootLayout({ children, params: { locale } }: Props) {
  // need to call this method everywhere where static rendering is enabled
  // https://next-intl-docs.vercel.app/docs/getting-started/app-router#add-setRequestLocale-to-all-layouts-and-pages
  setRequestLocale(locale);

  const messages = useMessages();

  return (
    <html className={`${gotham.variable} ${butler.variable} font-sans`} lang={locale}>
      <body className="flex h-screen min-w-[375px] flex-col bg-white">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
        <VercelComponents />
        <Notifications />
      </body>
    </html>
  );
}

export const fetchCache = 'default-cache';
