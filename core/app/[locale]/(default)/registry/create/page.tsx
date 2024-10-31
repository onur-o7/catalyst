import { unstable_setRequestLocale } from 'next-intl/server';

import { getSessionCustomerId } from '~/auth';
import { LocaleType } from '~/i18n/routing';
import { client } from '~/client';
import { graphql, ResultOf } from '~/client/graphql';
import { FormFieldsFragment } from '~/components/form-fields/fragment';
import { bypassReCaptcha } from '~/lib/bypass-recaptcha';

import { AddAddressForm } from '../../account/(tabs)/addresses/add/_components/add-address-form';

type FieldName = 'name' | 'surname' | 'partner_name' | 'partner_surname' | 'registry_name';

interface Field {
  name: FieldName;
  label: string;
  span: number;
}

interface Props {
  params: {
    locale: LocaleType;
  };
  searchParams: {
    name?: string;
    surname?: string;
    partner_name?: string;
    partner_surname?: string;
    registry_name?: string;
  };
}

const CustomerNewAdressQuery = graphql(
  `
    query CustomerNewAdressQuery(
      $countryCode: String
      $shippingFilters: FormFieldFiltersInput
      $shippingSorting: FormFieldSortInput
    ) {
      site {
        settings {
          contact {
            country
          }
          reCaptcha {
            isEnabledOnStorefront
            siteKey
          }
          formFields {
            shippingAddress(filters: $shippingFilters, sortBy: $shippingSorting) {
              ...FormFieldsFragment
            }
          }
        }
      }
      geography {
        countries(filters: { code: $countryCode }) {
          __typename
          name
          entityId
          code
          statesOrProvinces {
            __typename
            entityId
            name
            abbreviation
          }
        }
      }
    }
  `,
  [FormFieldsFragment],
);

export type NewAddressQueryResult = ResultOf<typeof CustomerNewAdressQuery>;

const FALLBACK_COUNTRY = {
  entityId: 226,
  name: 'United States',
  code: 'US',
  states: [],
};

export default async function Registry({ params: { locale }, searchParams }: Props) {
  unstable_setRequestLocale(locale);
  const customerId = await getSessionCustomerId();

  const { data } = await client.fetch({
    document: CustomerNewAdressQuery,
    customerId,
    fetchOptions: { cache: 'no-store' },
    variables: {
      shippingSorting: 'SORT_ORDER',
    },
  });

  const addressFields = [...(data.site.settings?.formFields.shippingAddress ?? [])];
  const reCaptchaSettings = data.site.settings?.reCaptcha;
  const countries = data.geography.countries;
  const defaultCountry = data.site.settings?.contact?.country || FALLBACK_COUNTRY.name;

  const {
    code = FALLBACK_COUNTRY.code,
    entityId = FALLBACK_COUNTRY.entityId,
    statesOrProvinces: defaultCountryStates = FALLBACK_COUNTRY.states,
  } = countries?.find(({ name: country }) => country === defaultCountry) || {};

  const getParamValue = (name: FieldName): string => searchParams[name] ?? '';

  const fields: Field[] = [
    { name: 'name', label: 'Name', span: 1 },
    { name: 'surname', label: 'Surname', span: 1 },
    { name: 'partner_name', label: "Partner's Name", span: 1 },
    { name: 'partner_surname', label: "Partner's Surname", span: 1 },
    { name: 'registry_name', label: 'Registry Name', span: 2 },
  ];

  return (
    <div className="mx-auto my-5 w-full max-w-[716px] p-10 shadow-md">
      <h1 className="text-center">Create Your Registry</h1>
      <AddAddressForm
        addressFields={addressFields}
        countries={countries || []}
        defaultCountry={{ id: entityId, code, states: defaultCountryStates }}
        reCaptchaSettings={bypassReCaptcha(reCaptchaSettings)}
      />
      <form
        action="/registry/create/"
        className="grid grid-cols-2 gap-x-4 gap-y-6 text-sm [&>input]:mb-2 [&>select]:mb-2"
      >
        {fields.map(({ name, label, span }) => (
          <div className={`col-span-${span}`} key={name}>
            <label htmlFor={name}>{label}:</label>
            <input
              className="mt-2 w-full bg-gray-100"
              defaultValue={getParamValue(name)}
              id={name}
              name={name}
              placeholder={`Enter ${label.toLowerCase()}`}
              type="text"
            />
          </div>
        ))}

        <button type="submit">Next (Step 1/2)</button>
      </form>
    </div>
  );
}
