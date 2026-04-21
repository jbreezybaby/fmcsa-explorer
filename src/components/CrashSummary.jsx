import Tooltip from './Tooltip';
import { DEFINITIONS } from '../data/definitions';

export default function CrashSummary({ carrier }) {
  const total = carrier?.crashTotal ?? null;
  const fatal = carrier?.fatalCrash ?? null;
  const injury = carrier?.injCrash ?? null;
  const tow = carrier?.towawayCrash ?? null;

  return (
    <div className="rounded border border-gray-800 bg-gray-900 p-4">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500 flex items-center">
        <Tooltip text={DEFINITIONS.crashIndicator}>Crash History</Tooltip>
        <span className="ml-auto text-xs font-normal normal-case tracking-normal text-gray-600">
          24-month window
        </span>
      </h3>
      {total === null ? (
        <p className="text-sm text-gray-600 italic">No crash data available</p>
      ) : (
        <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-gray-500">Total</dt>
            <dd className="text-gray-100 font-medium">{total}</dd>
          </div>
          {fatal !== null && (
            <div>
              <dt className="text-gray-500">Fatal</dt>
              <dd className={`font-medium ${fatal > 0 ? 'text-red-400' : 'text-gray-100'}`}>{fatal}</dd>
            </div>
          )}
          {injury !== null && (
            <div>
              <dt className="text-gray-500">Injury</dt>
              <dd className="text-gray-100 font-medium">{injury}</dd>
            </div>
          )}
          {tow !== null && (
            <div>
              <dt className="text-gray-500">Tow-away</dt>
              <dd className="text-gray-100 font-medium">{tow}</dd>
            </div>
          )}
        </dl>
      )}
    </div>
  );
}
