import { useState } from 'react';

export default function Tooltip({ text, children }) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="relative inline-flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <span
        className="ml-1 cursor-help text-gray-500 leading-none"
        tabIndex={0}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        aria-label="More information"
      >
        ⓘ
      </span>
      {visible && (
        <span
          role="tooltip"
          className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 w-72 rounded border border-gray-700 bg-gray-950 p-2 text-xs font-normal normal-case tracking-normal text-gray-200 shadow-xl"
        >
          {text}
        </span>
      )}
    </span>
  );
}
