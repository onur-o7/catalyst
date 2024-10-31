import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import {
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiPinterest,
  SiX,
  SiYoutube,
} from '@icons-pack/react-simple-icons';
import { JSX } from 'react';

import { LayoutQuery } from '~/app/[locale]/(default)/query';
import { getSessionCustomerId } from '~/auth';
import { client } from '~/client';
import { readFragment } from '~/client/graphql';
import { revalidate } from '~/client/revalidate-target';
import { Footer as ComponentsFooter } from '~/components/ui/footer';
import { logoTransformer } from '~/data-transformers/logo-transformer';

import { FooterFragment } from './fragment';
import { AmazonIcon } from './payment-icons/amazon';
import { AmericanExpressIcon } from './payment-icons/american-express';
import { ApplePayIcon } from './payment-icons/apple-pay';
import { MastercardIcon } from './payment-icons/mastercard';
import { PayPalIcon } from './payment-icons/paypal';
import { VisaIcon } from './payment-icons/visa';
import { getTranslations } from 'next-intl/server';

const socialIcons: Record<string, { icon: JSX.Element }> = {
  Facebook: { icon: <SiFacebook title="Facebook" /> },
  Twitter: { icon: <SiX title="Twitter" /> },
  X: { icon: <SiX title="X" /> },
  Pinterest: { icon: <SiPinterest title="Pinterest" /> },
  Instagram: { icon: <SiInstagram title="Instagram" /> },
  LinkedIn: { icon: <SiLinkedin title="LinkedIn" /> },
  YouTube: { icon: <SiYoutube title="YouTube" /> },
};

const column1Links = [
  {
    href: '/create-registry',
    title: 'column1.list.item1',
  },
  {
    href: '/find-registry',
    title: 'column1.list.item2',
  },
  {
    href: '/categories',
    title: 'column1.list.item3',
  },
];

const column2Links = [
  { href: '/about-us', title: 'column2.list.item1' },
  { href: '/how-it-works', title: 'column2.list.item2' },
  { href: '/discover-more', title: 'column2.list.item3' },
  { href: '/benefits', title: 'column2.list.item4' },
  { href: '/events', title: 'column2.list.item5' },
];

export const Footer = async () => {
  const customerId = await getSessionCustomerId();
  const t = await getTranslations('Footer');

  const { data: response } = await client.fetch({
    document: LayoutQuery,
    fetchOptions: customerId ? { cache: 'no-store' } : { next: { revalidate } },
  });

  const data = readFragment(FooterFragment, response).site;

  const sections = [
    {
      title: t('column1.title'),
      links: column1Links.map((l) => ({ label: t(l.title), href: l.href })),
    },
    {
      title: t('column2.title'),
      links: column2Links.map((l) => ({ label: t(l.title), href: l.href })),
    },
    {
      title: t('column3.title'),
      links: removeEdgesAndNodes(data.content.pages).map((page) => ({
        label: page.name,
        href: page.__typename === 'ExternalLinkPage' ? page.link : page.path,
      })),
    },
  ];

  return (
    <ComponentsFooter
      contactInformation={data.settings?.contact ?? undefined}
      copyright={
        data.settings
          ? `© ${new Date().getFullYear()} ${data.settings.storeName} – Powered by BigCommerce`
          : undefined
      }
      logo={data.settings ? logoTransformer(data.settings) : undefined}
      paymentIcons={[
        <AmazonIcon key="amazon" />,
        <AmericanExpressIcon key="americanExpress" />,
        <ApplePayIcon key="apple" />,
        <MastercardIcon key="mastercard" />,
        <PayPalIcon key="paypal" />,
        <VisaIcon key="visa" />,
      ]}
      sections={sections}
      socialMediaLinks={data.settings?.socialMediaLinks
        .filter((socialMediaLink) => Boolean(socialIcons[socialMediaLink.name]))
        .map((socialMediaLink) => ({
          href: socialMediaLink.url,
          icon: socialIcons[socialMediaLink.name]?.icon,
        }))}
    />
  );
};
