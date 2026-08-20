'use client';

import React from 'react';

/**
 * Vetor do Isótipo / Símbolo Infinito Orgânico (Peanut / Infinity Loop)
 * Proporção original: 100 x 54 (Aspect Ratio ~1.85:1)
 */
export const SYMBOL_PATH_FILL =
  'M27 0C12.0883 0 0 12.0883 0 27C0 41.9117 12.0883 54 27 54C34.4259 54 41.1396 50.0051 44.9756 43.6064C47.0117 40.2104 50 38 50 38C50 38 52.9883 40.2104 55.0244 43.6064C58.8604 50.0051 65.5741 54 73 54C87.9117 54 100 41.9117 100 27C100 12.0883 87.9117 0 73 0C65.5741 0 58.8604 3.99487 55.0244 10.3936C52.9883 13.7896 50 16 50 16C50 16 47.0117 13.7896 44.9756 10.3936C41.1396 3.99487 34.4259 0 27 0ZM27 12C32.1887 12 36.8576 14.887 39.2979 19.3496C42.2741 24.7924 47.3826 27 50 27C52.6174 27 57.7259 24.7924 60.7021 19.3496C63.1424 14.887 67.8113 12 73 12C81.2843 12 88 18.7157 88 27C88 35.2843 81.2843 42 73 42C67.8113 42 63.1424 39.113 60.7021 34.6504C57.7259 29.2076 52.6174 27 50 27C47.3826 27 42.2741 29.2076 39.2979 34.6504C36.8576 39.113 32.1887 42 27 42C18.7157 42 12 35.2843 12 27C12 18.7157 18.7157 12 27 12Z';

export const SYMBOL_OUTER_PATH =
  'M27 1C12.6406 1 1 12.6406 1 27C1 41.3594 12.6406 53 27 53C34.0954 53 40.5057 49.1843 44.1709 43.0723C46.3312 39.4703 49.5298 37.1068 50 36.7568C50.4702 37.1068 53.6688 39.4703 55.8291 43.0723C59.4943 49.1843 65.9046 53 73 53C87.3594 53 99 41.3594 99 27C99 12.6406 87.3594 1 73 1C65.9046 1 59.4943 4.81571 55.8291 10.9277C53.6688 14.5297 50.4702 16.8932 50 17.2432C49.5298 16.8932 46.3312 14.5297 44.1709 10.9277C40.5057 4.81571 34.0954 1 27 1Z';

export const SYMBOL_INNER_PATH =
  'M27 13C31.8152 13 36.1481 15.6793 38.415 19.8252C41.5204 25.5034 46.9026 28 50 28C53.0974 28 58.4796 25.5034 61.585 19.8252C63.8519 15.6793 68.1848 13 73 13C80.732 13 87 19.268 87 27C87 34.732 80.732 41 73 41C68.1848 41 63.8519 38.3207 61.585 34.1748C58.4796 28.4966 53.0974 26 50 26C46.9026 26 41.5204 28.4966 38.415 34.1748C36.1481 38.3207 31.8152 41 27 41C19.268 41 13 34.732 13 27C13 19.268 19.268 13 27 13Z';

/**
 * Wordmark Oficial Completo da Marca Unooria (viewBox: 0 0 540 120)
 */
export const UnooriaWordmarkVector: React.FC<{
  color: string;
  showRegisteredMark?: boolean;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
  onClick?: () => void;
}> = ({
  color,
  showRegisteredMark = true,
  className = '',
  style,
  ariaLabel = 'Unooria',
  onClick,
}) => (
  <svg
    viewBox="0 0 530 115"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    role="img"
    aria-label={ariaLabel}
    onClick={onClick}
  >
    {/* Letra 'u' */}
    <path
      d="M12 28H32V68C32 77.9411 40.0589 86 50 86C59.9411 86 68 77.9411 68 68V28H88V68C88 88.9868 70.9868 106 50 106C29.0132 106 12 88.9868 12 68V28Z"
      fill={color}
    />

    {/* Letra 'n' */}
    <path
      d="M112 106H132V66C132 56.0589 140.059 48 150 48C159.941 48 168 56.0589 168 66V106H188V66C188 45.0132 170.987 28 150 28C129.013 28 112 45.0132 112 66V106Z"
      fill={color}
    />

    {/* Símbolo 'oo' (Infinity / Peanut Loop) */}
    <g transform="translate(202, 38) scale(1.48, 1.26)">
      <path
        d={SYMBOL_PATH_FILL}
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </g>

    {/* Letra 'r' */}
    <path
      d="M362 106H382V62C382 54.268 388.268 48 396 48C400.12 48 403.85 49.78 406.44 52.62L418.8 35.8C412.8 30.8 404.8 28 396 28C384.6 28 374.6 34.2 369.2 43.4L368 28H362V106Z"
      fill={color}
    />

    {/* Letra 'i' (Haste + Ponto Circular) */}
    <rect x="424" y="38" width="18" height="68" rx="9" fill={color} />
    <circle cx="433" cy="18" r="10" fill={color} />

    {/* Letra 'a' */}
    <path
      d="M454 67C454 45.4609 471.461 28 493 28C514.539 28 532 45.4609 532 67V106H514V96.5C508.5 102.5 500.5 106 491 106C470.5 106 454 89.5 454 67ZM514 67C514 55.402 504.598 46 493 46C481.402 46 472 55.402 472 67C472 78.598 481.402 88 493 88C504.598 88 514 78.598 514 67Z"
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
    />

    {/* Marca Registrada (®) */}
    {showRegisteredMark && (
      <g transform="translate(534, 26)">
        <circle cx="9" cy="9" r="8" stroke={color} strokeWidth="1.5" fill="none" />
        <path
          d="M6.5 13V5H9.5C10.88 5 12 6.12 12 7.5C12 8.65 11.22 9.62 10.15 9.88L12.5 13H10.5L8.5 10H7.8V13H6.5ZM7.8 8.7H9.5C10.16 8.7 10.7 8.16 10.7 7.5C10.7 6.84 10.16 6.3 9.5 6.3H7.8V8.7Z"
          fill={color}
        />
      </g>
    )}
  </svg>
);

/**
 * Isótipo / Símbolo Isolado Unooria (viewBox: 0 0 100 54)
 */
export const UnooriaSymbolVector: React.FC<{
  color: string;
  variant?: 'fill' | 'outline';
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
  onClick?: () => void;
}> = ({
  color,
  variant = 'fill',
  className = '',
  style,
  ariaLabel = 'Símbolo Unooria',
  onClick,
}) => (
  <svg
    viewBox="0 0 100 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    role="img"
    aria-label={ariaLabel}
    onClick={onClick}
  >
    {variant === 'fill' ? (
      <path
        d={SYMBOL_PATH_FILL}
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
      />
    ) : (
      <>
        <path
          d={SYMBOL_OUTER_PATH}
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
        <path
          d={SYMBOL_INNER_PATH}
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
      </>
    )}
  </svg>
);

/**
 * App Icon em Squircle (viewBox: 0 0 120 120)
 */
export const UnooriaAppIconVector: React.FC<{
  variant?: 'light' | 'dark';
  sizePx?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}> = ({
  variant = 'light',
  sizePx = 64,
  className = '',
  style,
  onClick,
}) => {
  const isLight = variant === 'light';
  const bgFill = isLight ? '#FFFFFF' : '#0B0C28';
  const strokeColor = isLight ? '#0B0C28' : '#8886AA';
  const symbolColor = isLight ? '#0B0C28' : '#8886AA';

  return (
    <svg
      width={sizePx}
      height={sizePx}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      role="img"
      aria-label="Unooria App Icon"
      onClick={onClick}
    >
      {/* Squircle Card Background */}
      <rect
        x="6"
        y="6"
        width="108"
        height="108"
        rx="32"
        fill={bgFill}
        stroke={strokeColor}
        strokeWidth="3"
      />

      {/* Símbolo Interno */}
      <g transform="translate(26, 43) scale(0.68)">
        <path
          d={SYMBOL_PATH_FILL}
          fill={symbolColor}
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </g>
    </svg>
  );
};
