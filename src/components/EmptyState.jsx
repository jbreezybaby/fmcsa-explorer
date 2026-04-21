export default function EmptyState({ dotNumber }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-4xl text-gray-700 mb-4">⊘</div>
      <p className="text-gray-400 text-sm">
        No safety data available for USDOT {dotNumber}
      </p>
      <p className="text-gray-600 text-xs mt-2 max-w-sm">
        ~50–60% of active carriers have insufficient inspection history to generate BASIC scores.
        This is common for new or small carriers.
      </p>
    </div>
  );
}
