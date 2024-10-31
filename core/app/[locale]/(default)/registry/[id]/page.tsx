import React from 'react';

import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { LocaleType } from '~/i18n/routing';
import RegistryHeader from './_components/registry-header';

interface Props {
  params: { id: string; locale: LocaleType };
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function RegistryPage({ params: { locale, id }, searchParams }: Props) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('Product');

  const registryId = Number(id);

  return (
    <>
      <RegistryHeader />
      <h1>
        Registry {registryId}-{JSON.stringify(searchParams)}
      </h1>
    </>
  );
}

export const runtime = 'edge';
