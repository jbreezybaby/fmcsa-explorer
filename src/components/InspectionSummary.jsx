import Tooltip from './Tooltip';
import { DEFINITIONS } from '../data/definitions';

export default function InspectionSummary({ carrier }) {
  const total = carrier?.totalInspections ?? carrier?.inspTotal ?? null;
  const driverOOS = carrier?.driverOosInspTotal ?? null;
  const vehicleOOS = carrier?.vehicleOosInspTotal ?? null;
  const driverOOSRate = carrier?.driverOosRate ?? null;
  const vehicleOOSRate = carrier?.vehicleOosRate ?? null;

  return (
    <div className="rounded border border-gray-800 bg-gray-900 p-4">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500 flex items-center">
        <Tooltip text={DEFINITIONS.totalInspections}>Inspections</Tooltip>
        <span className="ml-auto text-xs font-normal normal-case tracking-normal text-gray-600">
          24-month window
        </span>
      </h3>
      {total === null ? (
        <p className="text-sm text-gray-600 italic">No inspection data available</p>
      ) : (
        <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-gray-500">Total</dt>
            <dd className="text-gray-100 font-medium">{total}</dd>
          </div>
          {driverOOS !== null && (
            <div>
              <dt className="text-gray-500 flex items-center">
                <Tooltip text={DEFINITIONS.oosRate}>Driver OOS</Tooltip>
              </dt>
              <dd className="text-gray-100 font-medium">
                {driverOOS} <span className="text-gray-500">({driverOOSRate ?? '—'}%)</span>
              </dd>
            </div>
          )}
          {vehicleOOS !== null && (
            <div>
              <dt className="text-gray-500 flex items-center">
                <Tooltip text={DEFINITIONS.oosRate}>Vehicle OOS</Tooltip>
              </dt>
              <dd className="text-gray-100 font-medium">
                {vehicleOOS} <span className="text-gray-500">({vehicleOOSRate ?? '—'}%)</span>
              </dd>
            </div>
          )}
        </dl>
      )}
    </div>
  );
}
