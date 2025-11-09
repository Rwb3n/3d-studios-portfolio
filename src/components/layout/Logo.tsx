// Logo component - 3D Studios elliptical tube logo
// Converted from public/logo.html

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export default function Logo({ className = '', width, height }: LogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 400"
      preserveAspectRatio="xMidYMid meet"
      width={width}
      height={height}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : '100%',
        maxWidth: '600px',
        maxHeight: '400px',
      }}
    >
      {/* Text path definitions */}
      <defs>
        <path id="top-path" d="M 125,180 A 175,75 0 0,1 475,180" />
        <path id="bottom-path" d="M 125,232 A 175,75 0 0,0 475,232" />
      </defs>

      {/* White background ellipse */}
      <ellipse
        cx="300"
        cy="200"
        rx="213"
        ry="133"
        fill="#ffffff"
        stroke="none"
      />

      {/* Inner ellipse */}
      <ellipse
        cx="300"
        cy="200"
        rx="160"
        ry="85"
        stroke="#000000"
        strokeWidth="2"
        fill="none"
      />

      {/* Outer ellipse */}
      <ellipse
        cx="300"
        cy="200"
        rx="205"
        ry="125"
        stroke="#000000"
        strokeWidth="2"
        fill="none"
      />

      {/* Curved tagline text - top */}
      <text
        fill="#000000"
        fontSize="22"
        fontWeight="500"
        letterSpacing="1"
        fontFamily="Arial, sans-serif"
      >
        <textPath href="#top-path" startOffset="50%">
          <tspan textAnchor="middle">Probably the best</tspan>
        </textPath>
      </text>

      {/* Curved tagline text - bottom */}
      <text
        fill="#000000"
        fontSize="22"
        fontStyle="italic"
        fontFamily="Arial, sans-serif"
      >
        <textPath href="#bottom-path" startOffset="50%">
          <tspan textAnchor="middle">Modelmakers in the world</tspan>
        </textPath>
      </text>

      {/* Side accent circles */}
      <circle cx="118" cy="200" r="5" fill="#000000" />
      <circle cx="482" cy="200" r="5" fill="#000000" />

      {/* Center brand text */}
      <text
        x="300"
        y="200"
        fontSize="48"
        fill="#000000"
        fontWeight="bold"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Arial, sans-serif"
      >
        3D STUDIOS
      </text>
    </svg>
  )
}
