import { useEffect } from 'react';
import useCarrier from './hooks/useCarrier';
import { DemoControlsProvider } from './context/DemoControlsContext';
import DemoControlsBar from './components/DemoControlsBar';
import CarrierSidebar from './components/CarrierSidebar';
import SearchBar from './components/SearchBar';
import CarrierCard from './components/CarrierCard';
import FleetVerification from './components/FleetVerification';
import BasicScores from './components/BasicScores';
import InspectionSummary from './components/InspectionSummary';
import CrashSummary from './components/CrashSummary';
import EmptyState from './components/EmptyState';
import { DEFAULT_DOT } from './data/topCarriers';

export default function App() {
  const { carrier, basics, loading, error, dotNumber, lookup } = useCarrier();

  useEffect(() => {
    lookup(DEFAULT_DOT);
  }, []);

  return (
    <DemoControlsProvider>
      <div className="flex h-screen flex-col overflow-hidden">
        <DemoControlsBar />

        <div className="flex flex-1 overflow-hidden">
          <CarrierSidebar activeDot={dotNumber} onSelect={lookup} />

          <main className="flex-1 overflow-y-auto">
            <header className="border-b border-gray-800 px-6 py-4">
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
                    FMCSA Explorer
                  </h1>
                  <p className="text-xs text-gray-600">Carrier Safety Lookup</p>
                </div>
                <div className="flex-1 max-w-md">
                  <SearchBar onSearch={lookup} loading={loading} />
                </div>
              </div>
            </header>

            <div className="px-6 py-5 space-y-4">
              {loading && (
                <div className="space-y-4 animate-pulse">
                  <div className="h-32 rounded bg-gray-900" />
                  <div className="h-48 rounded bg-gray-900" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 rounded bg-gray-900" />
                    <div className="h-24 rounded bg-gray-900" />
                  </div>
                </div>
              )}

              {!loading && error && (
                <div className="rounded border border-red-800 bg-red-950 px-4 py-3 text-sm text-red-300">
                  Error: {error}
                </div>
              )}

              {!loading && !error && carrier && (
                <>
                  <CarrierCard carrier={carrier} />
                  <FleetVerification carrier={carrier} />
                  <BasicScores basics={basics} />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <InspectionSummary carrier={carrier} />
                    <CrashSummary carrier={carrier} />
                  </div>
                </>
              )}

              {!loading && !error && !carrier && dotNumber && (
                <EmptyState dotNumber={dotNumber} />
              )}

              {!loading && !error && !dotNumber && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="text-gray-500 text-sm">
                    Enter a USDOT number or click a carrier from the sidebar.
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </DemoControlsProvider>
  );
}
