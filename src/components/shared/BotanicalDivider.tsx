interface BotanicalDividerProps {
  className?: string
  color?: string
}

export function BotanicalDivider({
  className = '',
  color = 'var(--color-text-muted)',
}: BotanicalDividerProps) {
  return (
    <div
      className={`flex items-center justify-center py-8 opacity-30 ${className}`}
    >
      <svg
        width="200"
        height="40"
        viewBox="0 0 200 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left branch */}
        <path
          d="M100 20 C80 20, 60 8, 30 12"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M70 14 C65 8, 58 6, 52 10"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M55 12 C50 6, 42 5, 38 9"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M80 16 C78 10, 72 7, 67 11"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />

        {/* Right branch */}
        <path
          d="M100 20 C120 20, 140 8, 170 12"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M130 14 C135 8, 142 6, 148 10"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M145 12 C150 6, 158 5, 162 9"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M120 16 C122 10, 128 7, 133 11"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />

        {/* Center dot */}
        <circle cx="100" cy="20" r="2" fill={color} />
      </svg>
    </div>
  )
}
