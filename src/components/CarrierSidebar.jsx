import { TOP_CARRIERS } from '../data/topCarriers';

export default function CarrierSidebar({ activeDot, onSelect }) {
  return (
    <aside className="w-64 shrink-0 border-r border-gray-800 bg-gray-950 flex flex-col">
      <div className="px-4 py-3 border-b border-gray-800">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
          Top 10 Carriers
        </h2>
        <p className="text-xs text-gray-600 mt-0.5">by fleet size — click to load</p>
      </div>
      <ul className="flex-1 overflow-y-auto">
        {TOP_CARRIERS.map((c) => (
          <li key={c.dotNumber}>
            <button
              type="button"
              onClick={() => onSelect(c.dotNumber)}
              className={`w-full text-left px-4 py-2.5 border-b border-gray-900 hover:bg-gray-900 transition-colors ${
                activeDot === c.dotNumber ? 'bg-gray-900 border-l-2 border-l-blue-500' : ''
              }`}
            >
              <div className="text-sm text-gray-200 truncate">{c.name}</div>
              <div className="flex justify-between mt-0.5">
                <span className="text-xs text-gray-500">DOT {c.dotNumber}</span>
                <span className="text-xs text-gray-600">{c.fleetSize} units</span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
