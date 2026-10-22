export function BrandLogo({
  size = 34,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={(size * 202) / 40}
      height={size}
      viewBox="0 0 202 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="fulgora seluler"
    >
      <rect x="2" y="2" width="36" height="36" rx="12" fill="#1D4ED8" />
      <rect x="14.3" y="11" width="4.8" height="18" rx="2" fill="#ffffff" />
      <rect x="14.3" y="11" width="11.4" height="4.8" rx="2" fill="#ffffff" />
      <rect x="14.3" y="18.1" width="8" height="4.8" rx="2" fill="#22D3EE" />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <text
        x="48"
        y="25.5"
        textLength="148"
        lengthAdjust="spacing"
        xmlSpace="preserve"
        fill="#0B1220"
        fontFamily={"var(--font-brand), 'Space Grotesk', ui-sans-serif, system-ui, sans-serif"}
        fontSize="21"
        fontWeight="700"
      >{"fulgora "}<tspan fill="#1D4ED8" fontWeight="500">{"seluler"}</tspan></text>
    </svg>
  );
}
