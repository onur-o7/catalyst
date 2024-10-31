import { unstable_setRequestLocale } from 'next-intl/server';

import { getSessionCustomerId } from '~/auth';
import { LocaleType } from '~/i18n/routing';

interface Props {
  params: {
    locale: LocaleType;
  };
}

export default async function Registry({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const customerId = await getSessionCustomerId();

  return <h1>Onur</h1>;
}
