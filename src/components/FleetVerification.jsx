import Tooltip from './Tooltip';
import { DEFINITIONS } from '../data/definitions';
import { useDemoControls } from '../context/DemoControlsContext';

const PREMIUM_PER_POWER_UNIT = 15000;

function classify(discrepancyPercent) {
  if (discrepancyPercent < 90) {
    return {
      tier: 'insufficient',
      label: 'Insufficient sightings',
      emoji: '⚪',
      explanation: 'GenLogs coverage is limited for this carrier\'s routes — not enough observations to make a confident claim.',
      barColor: 'bg-gray-600',
      textColor: 'text-gray-400',
      ringColor: 'ring-gray-700',
    };
  }
  if (discrepancyPercent <= 105) {
    return {
      tier: 'green',
      label: 'Fleet size appears consistent',
      emoji: '🟢',
      explanation: 'GenLogs observations align with the carrier\'s reported fleet size.',
      barColor: 'bg-green-500',
      textColor: 'text-green-400',
      ringColor: 'ring-green-700',
    };
  }
  if (discrepancyPercent <= 120) {
    return {
      tier: 'yellow',
      label: 'Moderate discrepancy — warrants follow-up',
      emoji: '🟡',
      explanation: 'GenLogs is observing more trucks than the carrier disclosed. Worth investigating.',
      barColor: 'bg-yellow-400',
      textColor: 'text-yellow-400',
      ringColor: 'ring-yellow-700',
    };
  }
  return {
    tier: 'red',
    label: 'Significant underdisclosure — material underwriting concern',
    emoji: '🔴',
    explanation: 'GenLogs is observing substantially more trucks than the carrier disclosed. Premium leakage is likely.',
    barColor: 'bg-red-500',
    textColor: 'text-red-400',
    ringColor: 'ring-red-700',
  };
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

function LockedView({ fmcsaCount, discrepancyPercent }) {
  const isInsufficient = discrepancyPercent < 90;
  return (
    <div className="rounded border border-gray-800 bg-gray-900 p-4">
      <div className="mb-3 flex items-center">
        <h3 className="flex items-center text-xs font-semibold uppercase tracking-widest text-gray-500">
          <Tooltip text={DEFINITIONS.fleetVerification}>Fleet Verification</Tooltip>
          <span className="ml-2 text-gray-600">🔒</span>
        </h3>
      </div>

      <dl className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-gray-500">FMCSA reported fleet size</dt>
          <dd className="text-gray-100 font-medium tabular-nums">
            {fmcsaCount?.toLocaleString() ?? '—'} power units
          </dd>
        </div>

        <div className="relative rounded border border-gray-800 bg-gray-950/60 p-3">
          <div className="flex items-center justify-between blur-sm select-none pointer-events-none">
            <dt className="text-gray-500">GenLogs Fleet Verification</dt>
            <dd className="text-gray-100 font-medium tabular-nums">██ trucks observed</dd>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded bg-gray-900/95 border border-amber-700/40 px-4 py-2 text-center shadow-lg">
              <p className="text-xs text-amber-200 font-medium mb-1">
                🔒 Unlock with GenLogs Fleet Verification
              </p>
              <button
                type="button"
                className="mt-1 rounded bg-amber-600 hover:bg-amber-500 px-3 py-1 text-xs font-semibold text-gray-950 transition-colors"
                onClick={() => {}}
              >
                Upgrade to unlock
              </button>
            </div>
          </div>
        </div>
      </dl>

      {!isInsufficient && (
        <p className="mt-3 text-xs text-gray-500 leading-relaxed">
          GenLogs has independently observed this carrier's trucks on the road. Unlock to see the
          confirmed fleet count and any discrepancy from the FMCSA-reported number.
        </p>
      )}
    </div>
  );
}

function UnlockedView({ fmcsaCount, discrepancyPercent }) {
  const genlogsCount = Math.round((fmcsaCount * discrepancyPercent) / 100);
  const truckDiff = genlogsCount - fmcsaCount;
  const pctAboveReported = ((genlogsCount / fmcsaCount) - 1) * 100;
  const premiumLeakage = Math.max(0, truckDiff) * PREMIUM_PER_POWER_UNIT;
  const verdict = classify(discrepancyPercent);
  const isInsufficient = verdict.tier === 'insufficient';

  return (
    <div className={`rounded border border-gray-800 bg-gray-900 p-4 ring-1 ${verdict.ringColor}`}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center text-xs font-semibold uppercase tracking-widest text-gray-500">
          <Tooltip text={DEFINITIONS.fleetVerification}>Fleet Verification</Tooltip>
        </h3>
        <span className={`text-xs font-medium ${verdict.textColor}`}>
          {verdict.emoji} {verdict.label}
        </span>
      </div>

      <dl className="space-y-2.5 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-gray-500 flex items-center">
            <Tooltip text={DEFINITIONS.powerUnits}>FMCSA reported fleet size</Tooltip>
          </dt>
          <dd className="text-gray-100 font-medium tabular-nums">
            {fmcsaCount?.toLocaleString() ?? '—'} power units
          </dd>
        </div>

        <div className="flex items-center justify-between">
          <dt className="text-gray-500 flex items-center">
            <Tooltip text={DEFINITIONS.genlogsSightings}>GenLogs Fleet Verification</Tooltip>
          </dt>
          <dd className="font-medium tabular-nums text-gray-100">
            {isInsufficient ? (
              <span className="text-gray-500 italic text-xs">
                <Tooltip text={DEFINITIONS.insufficientSightings}>Insufficient sightings</Tooltip>
              </span>
            ) : (
              <>
                {genlogsCount.toLocaleString()} trucks observed
                <span className="ml-1 text-xs text-gray-500">(simulated demo data)</span>
              </>
            )}
          </dd>
        </div>

        {!isInsufficient && (
          <>
            <div className="flex items-center justify-between">
              <dt className="text-gray-500 flex items-center">
                <Tooltip text={DEFINITIONS.discrepancy}>Discrepancy</Tooltip>
              </dt>
              <dd className={`font-medium tabular-nums ${verdict.textColor}`}>
                {verdict.emoji}{' '}
                {pctAboveReported >= 0 ? '+' : ''}
                {pctAboveReported.toFixed(0)}% {pctAboveReported >= 0 ? 'above' : 'below'} reported
                {' '}
                <span className="text-gray-500">
                  ({truckDiff >= 0 ? '+' : ''}{truckDiff.toLocaleString()} trucks)
                </span>
              </dd>
            </div>

            {premiumLeakage > 0 && (
              <div className="flex items-center justify-between">
                <dt className="text-gray-500 flex items-center">
                  <Tooltip text={DEFINITIONS.premiumLeakage}>Estimated annual premium leakage</Tooltip>
                </dt>
                <dd className="font-semibold tabular-nums text-amber-300">
                  {formatCurrency(premiumLeakage)}/year
                </dd>
              </div>
            )}
          </>
        )}
      </dl>
    </div>
  );
}

export default function FleetVerification({ carrier }) {
  const { featureEnabled, isPaidUser, discrepancyPercent } = useDemoControls();

  if (!featureEnabled) return null;
  const fmcsaCount = carrier?.totalPowerUnits ?? null;
  if (!fmcsaCount) return null;

  return isPaidUser
    ? <UnlockedView fmcsaCount={fmcsaCount} discrepancyPercent={discrepancyPercent} />
    : <LockedView fmcsaCount={fmcsaCount} discrepancyPercent={discrepancyPercent} />;
}
