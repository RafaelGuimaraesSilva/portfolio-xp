type IconProps = {
  size?: number;
  className?: string;
};

export function ArrowUpRight({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M4 12 12 4M5.5 4H12v6.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function ArrowRight({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2.5 8h11M9.5 3.5 14 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function ArrowLeft({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M13.5 8h-11M6.5 3.5 2 8l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function Download({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M8 2v8M4.5 7 8 10.5 11.5 7M2.5 13h11"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function Mail({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="1.5"
        y="3.5"
        width="13"
        height="9"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="m2 4 6 4.5L14 4"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}

export function Github({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M8 .5a7.5 7.5 0 0 0-2.37 14.62c.37.07.5-.16.5-.36v-1.26c-2.08.45-2.52-1-2.52-1-.34-.87-.83-1.1-.83-1.1-.68-.46.05-.45.05-.45.75.05 1.14.77 1.14.77.67 1.14 1.76.81 2.19.62.07-.48.26-.81.47-1-1.66-.19-3.4-.83-3.4-3.7 0-.82.29-1.49.77-2.01-.08-.19-.33-.95.07-1.98 0 0 .63-.2 2.06.76A7.1 7.1 0 0 1 8 4.15c.64 0 1.28.09 1.88.25 1.43-.96 2.06-.76 2.06-.76.4 1.03.15 1.79.07 1.98.48.52.77 1.19.77 2.01 0 2.88-1.74 3.51-3.4 3.7.27.23.5.68.5 1.37v2.03c0 .2.13.43.5.36A7.5 7.5 0 0 0 8 .5Z" />
    </svg>
  );
}

export function Linkedin({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M3.2 5.6H.9V15h2.3V5.6ZM2 1a1.4 1.4 0 1 0 0 2.8A1.4 1.4 0 0 0 2 1ZM15 9.7c0-2.5-1.3-3.7-3-3.7a2.6 2.6 0 0 0-2.4 1.3h-.1V5.6H7.3V15h2.3v-4.7c0-1.2.2-2.4 1.8-2.4 1.6 0 1.6 1.5 1.6 2.5V15H15V9.7Z" />
    </svg>
  );
}

export function Whatsapp({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M8 1a6.9 6.9 0 0 0-6 10.4L1 15l3.7-1A6.9 6.9 0 1 0 8 1Zm0 1.3a5.6 5.6 0 0 1 0 11.2 5.6 5.6 0 0 1-2.9-.8l-.2-.1-2.2.6.6-2.1-.1-.2A5.6 5.6 0 0 1 8 2.3Zm-2.4 2.6c-.1 0-.3 0-.5.2-.2.2-.7.7-.7 1.6 0 1 .7 1.9.8 2 .1.2 1.4 2.2 3.4 3 .5.2.9.3 1.2.4.5.2 1 .1 1.3.1.4-.1 1.1-.5 1.3-.9.2-.4.2-.8.1-.9 0-.1-.2-.2-.4-.3l-1.3-.6c-.2-.1-.4-.1-.5.1l-.6.8c-.1.1-.2.2-.4.1-.2-.1-.9-.3-1.7-1a6.3 6.3 0 0 1-1.1-1.4c-.1-.2 0-.3.1-.4l.3-.4.2-.4v-.4l-.6-1.4c-.2-.4-.4-.4-.5-.4h-.1Z" />
    </svg>
  );
}
