import Tooltip from './Tooltip';
import { DEFINITIONS } from '../data/definitions';

const LABEL_TO_DEF = {
  'unsafe driving': DEFINITIONS.unsafeDriving,
  'crash indicator': DEFINITIONS.crashIndicator,
  'hours-of-service compliance': DEFINITIONS.hosCompliance,
  'hos compliance': DEFINITIONS.hosCompliance,
  'vehicle maintenance': DEFINITIONS.vehicleMaintenance,
  'controlled substances/alcohol': DEFINITIONS.controlledSubstances,
  'controlled substances': DEFINITIONS.controlledSubstances,
  'driver fitness': DEFINITIONS.driverFitness,
  'hazardous materials compliance': DEFINITIONS.hazmat,
  'hazardous materials': DEFINITIONS.hazmat,
  'hazmat compliance': DEFINITIONS.hazmat,
};

function definitionFor(label) {
  if (!label) return DEFINITIONS.basicScore;
  return LABEL_TO_DEF[label.toLowerCase().trim()] ?? DEFINITIONS.basicScore;
}

function formatDate(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d)) return null;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function BasicScores({ basics }) {
  const hasBasics = Array.isArray(basics) && basics.length > 0;
  const runDate = hasBasics ? basics.find((b) => b.runDate)?.runDate : null;

  return (
    <div className="rounded border border-gray-800 bg-gray-900 p-4">
      <div className="mb-3 flex items-center">
        <h3 className="flex items-center text-xs font-semibold uppercase tracking-widest text-gray-500">
          <Tooltip text={DEFINITIONS.basicScore}>BASIC Categories</Tooltip>
        </h3>
        <span className="ml-auto text-xs font-normal text-gray-600 italic">
          snapshot — not current
        </span>
      </div>

      {!hasBasics ? (
        <p className="text-sm text-gray-600 italic">No BASIC data available</p>
      ) : (
        <>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-600 border-b border-gray-800">
                <th className="text-left py-2 font-normal">Category</th>
                <th className="text-right py-2 font-normal">
                  <Tooltip text="Raw roadside inspection measure — a calculated safety metric. Not a percentile.">
                    Measure
                  </Tooltip>
                </th>
                <th className="text-right py-2 font-normal">Inspections w/ Violations</th>
                <th className="text-right py-2 font-normal">Total Violations</th>
                <th className="text-right py-2 font-normal">
                  <Tooltip text={DEFINITIONS.basicScore}>Percentile</Tooltip>
                </th>
              </tr>
            </thead>
            <tbody>
              {basics.map((b, i) => (
                <tr key={i} className="border-b border-gray-900 last:border-0">
                  <td className="py-2 text-gray-300">
                    <Tooltip text={definitionFor(b.typeLabel)}>
                      {b.typeLabel ?? '—'}
                    </Tooltip>
                  </td>
                  <td className="py-2 text-right text-gray-200 tabular-nums">
                    {b.measureValue === null ? '—' : b.measureValue.toFixed(2)}
                  </td>
                  <td className="py-2 text-right text-gray-200 tabular-nums">
                    {b.inspectionsWithViolations ?? '—'}
                  </td>
                  <td className="py-2 text-right text-gray-200 tabular-nums">
                    {b.totalViolations ?? '—'}
                  </td>
                  <td className="py-2 text-right text-gray-500 italic text-xs">
                    {b.notPublic ? 'Not Public' : b.percentile != null ? `${b.percentile}%` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="mt-3 text-xs text-gray-500 leading-relaxed">
            <span className="text-gray-400">Note:</span> The public FMCSA API serves a frozen
            snapshot of BASIC data — measure values and violation counts here reflect the last
            public update (2017) and are not current. Percentile rankings are withheld entirely
            ("Not Public"). For up-to-date scores, use the{' '}
            <a
              href="https://ai.fmcsa.dot.gov/SMS/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:underline"
            >
              FMCSA SMS portal
            </a>{' '}
            (free, requires login). The inspection and crash data shown elsewhere on this page
            is current.
          </p>
        </>
      )}
    </div>
  );
}
