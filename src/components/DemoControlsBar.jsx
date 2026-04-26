import { useDemoControls } from '../context/DemoControlsContext';

function Toggle({ label, value, onChange, onLabel = 'ON', offLabel = 'OFF' }) {
  return (
    <label className="flex items-center gap-2 text-xs text-amber-100">
      <span className="uppercase tracking-wider text-amber-200/70">{label}:</span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
          value ? 'bg-amber-500' : 'bg-gray-700'
        }`}
        aria-pressed={value}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-gray-950 transition-transform ${
            value ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
      <span className={`font-semibold ${value ? 'text-amber-300' : 'text-gray-500'}`}>
        {value ? onLabel : offLabel}
      </span>
    </label>
  );
}

export default function DemoControlsBar() {
  const {
    featureEnabled,
    isPaidUser,
    discrepancyPercent,
    setFeatureEnabled,
    setIsPaidUser,
    setDiscrepancyPercent,
  } = useDemoControls();

  return (
    <div className="border-b border-amber-900/60 bg-amber-950/40 px-6 py-2">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-xs">
        <span className="font-semibold uppercase tracking-widest text-amber-300">
          🛠 Fleet Verification Feature — Demo Controls
        </span>

        <Toggle
          label="Feature"
          value={featureEnabled}
          onChange={setFeatureEnabled}
          onLabel="ON"
          offLabel="OFF"
        />

        <Toggle
          label="Subscription"
          value={isPaidUser}
          onChange={setIsPaidUser}
          onLabel="PAID"
          offLabel="UNPAID"
        />

        <label className="flex flex-1 min-w-[280px] items-center gap-3 text-amber-100">
          <span className="uppercase tracking-wider text-amber-200/70 whitespace-nowrap">
            Discrepancy:
          </span>
          <input
            type="range"
            min={50}
            max={200}
            step={1}
            value={discrepancyPercent}
            onChange={(e) => setDiscrepancyPercent(Number(e.target.value))}
            className="flex-1 accent-amber-500"
          />
          <span className="font-semibold tabular-nums text-amber-300 w-12 text-right">
            {discrepancyPercent}%
          </span>
          <span className="text-amber-200/60 whitespace-nowrap">
            (GenLogs vs FMCSA)
          </span>
        </label>
      </div>
    </div>
  );
}
