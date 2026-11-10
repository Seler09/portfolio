const paths: Record<string, string> = {
  download: 'M12 3v12m0 0-4.5-4.5M12 15l4.5-4.5M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2',
  arrow: 'M5 12h14m0 0-6-6m6 6-6 6',
  pin: 'M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  mail: 'M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Zm0 .5 9 6 9-6',
  copy: 'M9 9h10v12H9zM5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm9 3-4.3-4.3',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  hash: 'M5 9h14M5 15h14M10 3 8 21M16 3l-2 18',
  trophy: 'M8 21h8m-4-4v4m-5-17h10v5a5 5 0 0 1-10 0V4Zm10 2h3v1a3 3 0 0 1-3 3M7 6H4v1a3 3 0 0 0 3 3',
  car: 'M3 13l2-5.5A2 2 0 0 1 6.9 6h10.2a2 2 0 0 1 1.9 1.5L21 13m-18 0h18v4a1 1 0 0 1-1 1h-1.5M3 13v4a1 1 0 0 0 1 1h1.5m0 0a1.75 1.75 0 1 0 3.5 0m-3.5 0a1.75 1.75 0 1 1 3.5 0m0 0h6m0 0a1.75 1.75 0 1 0 3.5 0m-3.5 0a1.75 1.75 0 1 1 3.5 0',
  gauge: 'M12 21a9 9 0 1 0-9-9m9 0 4.5-4.5M12 12a1.5 1.5 0 1 0 0 .01M3 12h2m14 0h2M12 3v2M5.6 5.6 7 7m11.4-1.4L17 7',
  moto: 'M5.5 18.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm13 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM5.5 15.5 9 9h5l4.5 6.5M14 9l-1.5-3H10m4 3 2-1.5h2M9 9l3 6.5h-6.5',
  mountain: 'M2 20 9 8l4 6 2.5-3.5L22 20H2Zm7-12 2.2 3.4M15 6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
  check: 'M5 12.5 10 17 19 7',
  camera: 'M4 8.5A1.5 1.5 0 0 1 5.5 7h2.3l1.4-2h5.6l1.4 2h2.3A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-9ZM12 16a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5Z',
};

export type IconName = keyof typeof paths | 'linkedin';

export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  if (name === 'linkedin') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
      </svg>
    );
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
