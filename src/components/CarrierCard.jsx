import Tooltip from './Tooltip';
import { DEFINITIONS } from '../data/definitions';

export default function CarrierCard({ carrier }) {
  const c = carrier;
  const statusColor =
    c.allowedToOperate === 'Y' ? 'text-green-400' : 'text-red-400';

  return (
    <div className="rounded border border-gray-800 bg-gray-900 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">{c.legalName}</h2>
          {c.dbaName && (
            <p className="text-sm text-gray-400">DBA: {c.dbaName}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {[c.phyStreet, c.phyCity, c.phyState, c.phyZipcode].filter(Boolean).join(', ')}
          </p>
        </div>
        <span className={`text-sm font-medium ${statusColor} whitespace-nowrap`}>
          {c.allowedToOperate === 'Y' ? '● Authorized' : '● Not Authorized'}
        </span>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-gray-500 flex items-center">
            <Tooltip text={DEFINITIONS.usdot}>USDOT</Tooltip>
          </dt>
          <dd className="text-gray-100">{c.dotNumber}</dd>
        </div>
        {c.mcNumber && (
          <div>
            <dt className="text-gray-500 flex items-center">
              <Tooltip text={DEFINITIONS.mc}>MC Number</Tooltip>
            </dt>
            <dd className="text-gray-100">{c.mcNumber}</dd>
          </div>
        )}
        <div>
          <dt className="text-gray-500 flex items-center">
            <Tooltip text={DEFINITIONS.powerUnits}>Power Units</Tooltip>
          </dt>
          <dd className="text-gray-100">{c.totalPowerUnits ?? '—'}</dd>
        </div>
        <div>
          <dt className="text-gray-500 flex items-center">
            <Tooltip text={DEFINITIONS.drivers}>Drivers</Tooltip>
          </dt>
          <dd className="text-gray-100">{c.totalDrivers ?? '—'}</dd>
        </div>
        <div>
          <dt className="text-gray-500 flex items-center">
            <Tooltip text={DEFINITIONS.safetyRating}>Safety Rating</Tooltip>
          </dt>
          <dd className="text-gray-100">{c.safetyRating || 'Not rated'}</dd>
        </div>
        <div>
          <dt className="text-gray-500 flex items-center">
            <Tooltip text={DEFINITIONS.operatingStatus}>Operating Status</Tooltip>
          </dt>
          <dd className="text-gray-100">{c.operatingStatus || '—'}</dd>
        </div>
      </dl>
    </div>
  );
}
