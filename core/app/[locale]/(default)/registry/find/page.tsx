import { unstable_setRequestLocale } from 'next-intl/server';

import { getSessionCustomerId } from '~/auth';
import { Breadcrumbs } from '~/components/ui/breadcrumbs';
import { LocaleType } from '~/i18n/routing';
import ResultsTable from './_components/results-table';

interface Props {
  params: {
    locale: LocaleType;
  };
}

export default async function RegistryFindPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const registries = await fetch('https://manage-registry.grantdays.eu/api/v2/find-registry').then(
    (r) => r.json(),
  );

  const customerId = await getSessionCustomerId();
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Registry', href: '/registry' },
    { label: 'Find', href: '/registry/find' },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1 className="mb-3 text-xl font-medium text-primary">Find a Registry</h1>
      <section className="min-h-400 grid min-h-96 grid-cols-12 gap-4 xl:gap-5" id="find-registry">
        <aside className="col-span-4 h-full bg-gray-100 px-4 py-3">
          <h2>Fill in Event Details</h2>

          <form action="#" className="flex w-full flex-col">
            <input
              autoComplete="none"
              id="name"
              name="name"
              placeholder="Name of Registry/Registrant"
              required
              type="text"
            />
            <select
              aria-label="Default select example"
              className="mt-5"
              name="registry_type"
              style={{ color: 'rgb(201, 209, 228)' }}
            >
              <option value={-1}>Event Type</option>
              <option style={{ color: 'rgb(33, 37, 41)' }} value={1}>
                Wedding
              </option>
              <option style={{ color: 'rgb(33, 37, 41)' }} value={2}>
                Baptism
              </option>
              <option style={{ color: 'rgb(33, 37, 41)' }} value={3}>
                Baby Shower
              </option>
              <option style={{ color: 'rgb(33, 37, 41)' }} value={6}>
                Group Activity
              </option>
              <option style={{ color: 'rgb(33, 37, 41)' }} value={7}>
                Birthday
              </option>
              <option style={{ color: 'rgb(33, 37, 41)' }} value={9}>
                Student Life
              </option>
              <option style={{ color: 'rgb(33, 37, 41)' }} value={11}>
                Other Event
              </option>
            </select>
            <input id="city" name="city" className="mt-5" placeholder="City" type="text" />
            <div className="mt-5 grid grid-cols-2 gap-5">
              <select
                aria-label="Default select example"
                className="form-select form-select-lg"
                name="month"
                placeholder="Month"
                style={{ color: 'rgb(201, 209, 228)' }}
              >
                <option value="">Month</option>
                <option style={{ color: 'rgb(33, 37, 41)' }} value={1}>
                  1. Jan
                </option>
                <option style={{ color: 'rgb(33, 37, 41)' }} value={2}>
                  2. Feb
                </option>
                <option style={{ color: 'rgb(33, 37, 41)' }} value={3}>
                  3. Mar
                </option>
                <option style={{ color: 'rgb(33, 37, 41)' }} value={4}>
                  4. Apr
                </option>
                <option style={{ color: 'rgb(33, 37, 41)' }} value={5}>
                  5. May
                </option>
                <option style={{ color: 'rgb(33, 37, 41)' }} value={6}>
                  6. Jun
                </option>
                <option style={{ color: 'rgb(33, 37, 41)' }} value={7}>
                  7. Jul
                </option>
                <option style={{ color: 'rgb(33, 37, 41)' }} value={8}>
                  8. Aug
                </option>
                <option style={{ color: 'rgb(33, 37, 41)' }} value={9}>
                  9. Sep
                </option>
                <option style={{ color: 'rgb(33, 37, 41)' }} value={10}>
                  10. Oct
                </option>
                <option style={{ color: 'rgb(33, 37, 41)' }} value={11}>
                  11. Nov
                </option>
                <option style={{ color: 'rgb(33, 37, 41)' }} value={12}>
                  12. Dec
                </option>
              </select>
              <select
                aria-label="Default select example"
                className="form-select form-select-lg"
                name="year"
                style={{ color: 'rgb(201, 209, 228)' }}
              >
                <option value="">Year</option>
                <option style={{ color: 'rgb(33, 37, 41)' }} value={2024}>
                  2024
                </option>
                <option style={{ color: 'rgb(33, 37, 41)' }} value={2025}>
                  2025
                </option>
                <option style={{ color: 'rgb(33, 37, 41)' }} value={2026}>
                  2026
                </option>
                <option style={{ color: 'rgb(33, 37, 41)' }} value={2027}>
                  2027
                </option>
                <option style={{ color: 'rgb(33, 37, 41)' }} value={2028}>
                  2028
                </option>
              </select>
            </div>
            <button className="mt-5 w-full bg-secondary" type="submit">
              SEARCH
            </button>
          </form>
        </aside>
        <div className="col-span-8 h-full bg-gray-100">
          <p className="total-page-information">22 results</p>
          <ResultsTable registries={registries.data} />
        </div>
      </section>
    </>
  );
}
