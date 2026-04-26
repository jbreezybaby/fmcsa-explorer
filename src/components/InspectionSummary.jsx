import Tooltip from './Tooltip';
import { DEFINITIONS } from '../data/definitions';

function fmt(n, decimals = 1) {
  if (n === null || n === undefined) return '—';
  return Number(n).toFixed(decimals);
}

export default function InspectionSummary({ carrier }) {
  const driverInsp   = carrier?.driverInsp   ?? null;
  const vehicleInsp  = carrier?.vehicleInsp  ?? null;
  const hazmatInsp   = carrier?.hazmatInsp   ?? null;
  const driverOos    = carrier?.driverOosInsp  ?? null;
  const vehicleOos   = carrier?.vehicleOosInsp ?? null;
  const hazmatOos    = carrier?.hazmatOosInsp  ?? null;
  const driverRate   = carrier?.driverOosRate  ?? null;
  const vehicleRate  = carrier?.vehicleOosRate ?? null;
  const hazmatRate   = carrier?.hazmatOosRate  ?? null;
  const driverNat    = carrier?.driverOosRateNationalAverage  ?? null;
  const vehicleNat   = carrier?.vehicleOosRateNationalAverage ?? null;

  const hasData = driverInsp !== null || vehicleInsp !== null;

  return (
    <div className="rounded border border-gray-800 bg-gray-900 p-4">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500 flex items-center">
        <Tooltip text={DEFINITIONS.totalInspections}>Inspections</Tooltip>
        <span className="ml-auto text-xs font-normal normal-case tracking-normal text-gray-600">
          24-month window
        </span>
      </h3>
      {!hasData ? (
        <p className="text-sm text-gray-600 italic">No inspection data available</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-600 border-b border-gray-800">
              <th className="text-left py-1 font-normal">Type</th>
              <th className="text-right py-1 font-normal">Inspections</th>
              <th className="text-right py-1 font-normal">
                <Tooltip text={DEFINITIONS.oosRate}>OOS Count</Tooltip>
              </th>
              <th className="text-right py-1 font-normal">OOS Rate</th>
              <th className="text-right py-1 font-normal">Nat'l Avg</th>
            </tr>
          </thead>
          <tbody>
            {driverInsp !== null && (
              <tr className="border-b border-gray-900">
                <td className="py-1.5 text-gray-400">Driver</td>
                <td className="py-1.5 text-right text-gray-100 tabular-nums">{driverInsp.toLocaleString()}</td>
                <td className="py-1.5 text-right text-gray-100 tabular-nums">{driverOos ?? '—'}</td>
                <td className="py-1.5 text-right text-gray-100 tabular-nums">{fmt(driverRate)}%</td>
                <td className="py-1.5 text-right text-gray-500 tabular-nums">{driverNat ?? '—'}%</td>
              </tr>
            )}
            {vehicleInsp !== null && (
              <tr className="border-b border-gray-900">
                <td className="py-1.5 text-gray-400">Vehicle</td>
                <td className="py-1.5 text-right text-gray-100 tabular-nums">{vehicleInsp.toLocaleString()}</td>
                <td className="py-1.5 text-right text-gray-100 tabular-nums">{vehicleOos ?? '—'}</td>
                <td className="py-1.5 text-right text-gray-100 tabular-nums">{fmt(vehicleRate)}%</td>
                <td className="py-1.5 text-right text-gray-500 tabular-nums">{vehicleNat ?? '—'}%</td>
              </tr>
            )}
            {hazmatInsp !== null && hazmatInsp > 0 && (
              <tr>
                <td className="py-1.5 text-gray-400">HazMat</td>
                <td className="py-1.5 text-right text-gray-100 tabular-nums">{hazmatInsp.toLocaleString()}</td>
                <td className="py-1.5 text-right text-gray-100 tabular-nums">{hazmatOos ?? '—'}</td>
                <td className="py-1.5 text-right text-gray-100 tabular-nums">{fmt(hazmatRate)}%</td>
                <td className="py-1.5 text-right text-gray-500 tabular-nums">—</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
