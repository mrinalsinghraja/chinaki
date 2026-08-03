/**
 * Hand-drawn icon set. Inline SVG, single stroke weight, no icon
 * library — the whole set costs less than one font request.
 *
 * Every icon inherits currentColor and sizes from the `size` prop.
 */

type IconProps = {
  size?: number;
  className?: string;
};

function Svg({
  size = 20,
  className,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

/* ---- Category marks ------------------------------------------ */

/** Business — a storefront awning over a counter. */
export const IconBusiness = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 9.5 4.8 4h14.4L21 9.5" />
    <path d="M4.5 9.5V20h15V9.5" />
    <path d="M3 9.5h18" />
    <path d="M9.5 20v-5.5h5V20" />
  </Svg>
);

/** Tax — a receipt with a torn foot and a total rule. */
export const IconTax = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 3h12v16.5l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2-2 1.2Z" />
    <path d="M9.5 8h5" />
    <path d="M9.5 12h5" />
  </Svg>
);

/** Government — a portico. Three columns, one plinth. */
export const IconGovernment = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 9.5 12 4l9 5.5" />
    <path d="M5.5 9.5V17M12 9.5V17M18.5 9.5V17" />
    <path d="M3.5 20h17" />
    <path d="M4.5 17h15" />
  </Svg>
);

/** Employee — a badge on a lanyard. */
export const IconEmployee = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9 3l3 3.5L15 3" />
    <rect x="5" y="6.5" width="14" height="14" rx="1.5" />
    <circle cx="12" cy="12" r="2" />
    <path d="M8.5 17.5c.8-1.5 2-2.2 3.5-2.2s2.7.7 3.5 2.2" />
  </Svg>
);

/** Student — an open book, spine centred. */
export const IconStudent = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 6.5C10 5 7.5 4.5 4 4.7v13c3.5-.2 6 .3 8 1.8 2-1.5 4.5-2 8-1.8v-13c-3.5-.2-6 .3-8 1.8Z" />
    <path d="M12 6.5v13" />
  </Svg>
);

/** Documentation — stacked sheets with a folded corner. */
export const IconDocumentation = (p: IconProps) => (
  <Svg {...p}>
    <path d="M14 3H7.5A1.5 1.5 0 0 0 6 4.5v15A1.5 1.5 0 0 0 7.5 21h9a1.5 1.5 0 0 0 1.5-1.5V7Z" />
    <path d="M14 3v4h4" />
    <path d="M9 12.5h6M9 16h4" />
  </Svg>
);

/* ---- Interface ----------------------------------------------- */

export const IconArrow = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </Svg>
);

export const IconCheck = (p: IconProps) => (
  <Svg {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </Svg>
);

export const IconWhatsApp = ({ size = 20, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.93L2 22l5.37-1.4a9.85 9.85 0 0 0 4.67 1.18h.01c5.43 0 9.84-4.4 9.84-9.84 0-2.63-1.02-5.1-2.88-6.96A9.77 9.77 0 0 0 12.04 2Zm0 18.02a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.03-.2-.31a8.16 8.16 0 0 1-1.25-4.33c0-4.52 3.68-8.19 8.2-8.19a8.14 8.14 0 0 1 5.78 2.4 8.11 8.11 0 0 1 2.4 5.8c0 4.52-3.68 8.17-8.19 8.17Zm4.5-6.12c-.25-.13-1.46-.72-1.69-.8-.23-.09-.39-.13-.55.12-.16.25-.64.8-.78.96-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22a7.4 7.4 0 0 1-1.37-1.7c-.14-.25-.02-.38.1-.5.12-.13.25-.3.37-.45.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.55-1.33-.75-1.82-.2-.48-.4-.4-.55-.41h-.47c-.16 0-.42.06-.64.3-.22.25-.84.83-.84 2.02 0 1.19.86 2.34.98 2.5.12.17 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.46-.07 1.42-.58 1.62-1.15.2-.56.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28Z" />
  </svg>
);

export const IconPhone = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
  </Svg>
);

export const IconMail = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </Svg>
);

export const IconPin = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Svg>
);

export const IconClock = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Svg>
);

export const IconPlus = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5.5v13M5.5 12h13" />
  </Svg>
);

export const IconMenu = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 8h16M4 16h16" />
  </Svg>
);

export const IconClose = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);

export const IconShield = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3 5 5.5v6c0 4.2 3 7.4 7 9.5 4-2.1 7-5.3 7-9.5v-6Z" />
    <path d="m9 12 2 2 4-4.5" />
  </Svg>
);

export const IconSpark = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.5v5M12 15.5v5M3.5 12h5M15.5 12h5" />
    <path d="m6.5 6.5 3 3M14.5 14.5l3 3M17.5 6.5l-3 3M9.5 14.5l-3 3" />
  </Svg>
);

/** Maps a category slug to its mark. */
export const categoryIcons: Record<
  string,
  (p: IconProps) => React.JSX.Element
> = {
  "business-services": IconBusiness,
  "tax-services": IconTax,
  "government-services": IconGovernment,
  "employee-services": IconEmployee,
  "student-services": IconStudent,
  "documentation-services": IconDocumentation,
};
