import type { IconName } from '../data';

const P: Record<IconName, JSX.Element> = {
  ship: <><path d="M3 17l1.5 3h15L21 17" /><path d="M5 17V11h14v6" /><path d="M8 11V7h8v4" /><path d="M12 3v4" /><path d="M2 21c1.5 0 2-1 3.5-1s2 1 3.5 1 2-1 3.5-1 2 1 3.5 1 2-1 3.5-1" /></>,
  plane: <path d="M10.5 13.5L4 11l1.5-1.5 7 .5 4-4c1-1 2.5-1.2 3-.5.7.5.5 2-.5 3l-4 4 .5 7L14 21l-2.5-6.5L8 18v2.5L6.5 22 5 19l-3-1.5L3.5 16H6l3.5-3.5" />,
  truck: <><path d="M2 6h11v10H2z" /><path d="M13 9h4.5l3.5 4v3h-8" /><circle cx="6" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></>,
  warehouse: <><path d="M3 21V9l9-5 9 5v12" /><path d="M7 21v-8h10v8" /><path d="M7 17h10" /></>,
  customs: <><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  boxes: <><path d="M3 13h8v8H3zM13 13h8v8h-8zM8 3h8v8H8z" /></>,
  arrow: <><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" /></>,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  fridge: <><rect x="6" y="2.5" width="12" height="19" rx="2" /><path d="M6 10h12M9 5.5v2M9 13v3" /></>,
  snow: <><rect x="2.5" y="5" width="19" height="8" rx="2" /><path d="M6 10h12M7 17l-1 3M12 16v4M17 17l1 3" /></>,
  sofa: <><path d="M4 11V8a2 2 0 012-2h12a2 2 0 012 2v3" /><path d="M2 13a2 2 0 014 0v2h12v-2a2 2 0 014 0v5H2z" /><path d="M5 18v2M19 18v2" /></>,
  brick: <><rect x="3" y="4" width="18" height="16" rx="1" /><path d="M3 9.3h18M3 14.6h18M9 4v5.3M15 9.3v5.3M9 14.6V20" /></>,
  plug: <><path d="M9 2v5M15 2v5" /><path d="M6 7h12v4a6 6 0 01-12 0z" /><path d="M12 17v5" /></>,
  whatsapp: <><path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1112 20.5a8.6 8.6 0 01-4.3-1.2z" /><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 .9c-1-.4-2.4-1.8-2.8-2.8l.9-1-1-2z" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 6.5l8.5 6.5 8.5-6.5" /></>,
  phone: <path d="M5 3h4l2 5-2.5 1.5a11 11 0 006 6L16 13l5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z" />,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  doc: <><path d="M14 3H6v18h12V7z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  calc: <><rect x="5" y="2.5" width="14" height="19" rx="2" /><path d="M8 6.5h8v3H8zM8.5 13h.01M12 13h.01M15.5 13h.01M8.5 17h.01M12 17h.01M15.5 17h.01" /></>,
  plus: <><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.6-3.5 3.3-5.5 6.5-5.5s5.9 2 6.5 5.5" /><path d="M16 4.6a3.5 3.5 0 010 6.8M18 14.8c2 .7 3.2 2.5 3.5 5.2" /></>,
  spark: <path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z" />,
  route: <><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="6" r="2.5" /><path d="M8.5 18H15a3 3 0 000-6H9a3 3 0 010-6h6.5" /></>,
  menu: <><path d="M4 8h16M4 16h10" /></>,
  close: <><path d="M6 6l12 12M18 6L6 18" /></>,
  beam: <><path d="M3 5h18M3 19h18M12 5v14" /><path d="M7 5v2M17 5v2M7 17v2M17 17v2" /></>,
  window: <><rect x="4" y="3" width="16" height="18" rx="1.5" /><path d="M12 3v18M4 12h16" /></>,
  home: <><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></>,
  speaker: <><rect x="6" y="2.5" width="12" height="19" rx="2" /><circle cx="12" cy="14.5" r="3.5" /><circle cx="12" cy="7" r="1.3" /></>,
  gear: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  bank: <><path d="M3 9l9-5 9 5" /><path d="M5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 20h18" /></>,
  pencil: <><path d="M4 20l1-4.5L15.5 5a2.1 2.1 0 013 3L8 18.5z" /><path d="M13.5 7l3 3" /></>,
  chat: <><path d="M4 5h16v11H9l-5 4z" /><path d="M8 9.5h8M8 12.5h5" /></>,
  layers: <><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></>,
};

export default function Icon({ name, size = 22, stroke = 1.7, className }: {
  name: IconName; size?: number; stroke?: number; className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {P[name]}
    </svg>
  );
}
