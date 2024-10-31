import ResultsTableRow from './results-table-row';

export default function ResultsTable({ registries }: any) {
  return (
    <table className="registry-listing table-striped table-hover m-5 table w-full text-primary">
      <thead className="bg-white">
        <tr className="text-left text-lg">
          <th className="p-2" width={250}>
            Name of Registry / Registrant
          </th>
          <th className="p-2">City/Region</th>
          <th className="p-2" width={150}>
            Event Date
          </th>
        </tr>
      </thead>
      <tbody>
        {registries.map((registry) => (
          <ResultsTableRow
            id={registry.id}
            registry={{
              title: registry.registry_name,
              name: registry.name,
              location: registry.state,
              country: registry.country,
              date: registry.registry_date,
            }}
          />
        ))}
      </tbody>
    </table>
  );
}
