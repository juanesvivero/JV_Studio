type IconType = 'browser' | 'search' | 'flow' | 'chart';

const svgProps = {
  viewBox: '0 0 24 24',
  'aria-hidden': true,
  style: { fill: 'none', stroke: 'currentColor' } as React.CSSProperties,
};

export default function ServiceIcon({ type }: { type: IconType }) {
  if (type === 'search') {
    return (
      <svg {...svgProps}>
        <circle cx="11" cy="11" r="6" />
        <path d="m16 16 5 5" />
        <path d="M8 11h6" />
      </svg>
    );
  }

  if (type === 'flow') {
    return (
      <svg {...svgProps}>
        <rect x="3" y="4" width="6" height="6" rx="1" />
        <rect x="15" y="14" width="6" height="6" rx="1" />
        <path d="M9 7h3a4 4 0 0 1 4 4v3" />
        <path d="M13 12l3 3 3-3" />
      </svg>
    );
  }

  if (type === 'chart') {
    return (
      <svg {...svgProps}>
        <path d="M4 20V5" />
        <path d="M4 20h16" />
        <rect x="7" y="11" width="3" height="6" rx="1" />
        <rect x="12" y="8" width="3" height="9" rx="1" />
        <rect x="17" y="5" width="3" height="12" rx="1" />
      </svg>
    );
  }

  // default: 'browser'
  return (
    <svg {...svgProps}>
      <rect x="3" y="5" width="18" height="13" rx="2" />
      <path d="M3 9h18" />
      <path d="M8 21h8" />
      <path d="M12 18v3" />
    </svg>
  );
}
