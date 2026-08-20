import React from 'react';
import { Icon } from '../Icon';
import type { TikScannerProps } from './Scanner.types';
import './Scanner.css';

/**
 * Componente Scanner — Design System Tik Tooria
 *
 * Moldura de 250px do leitor de QR (node 4:749). As quatro cantoneiras são o
 * vetor literal do nó 4:750.
 *
 * O véu do arquivo é uma operação booleana — retângulo de 414×896 menos o
 * quadrado de 250px. Aqui ele é reproduzido por uma sombra expandida
 * (`box-shadow` com raio 0 e alcance maior que a tela), que produz o mesmo
 * recorte sem exigir um segundo nó em tela cheia.
 */
export const Scanner = React.forwardRef<HTMLDivElement, TikScannerProps>(
  ({ size = 250, hint, scrim = true, className = '', style, ...restProps }, ref) => (
    <div
      ref={ref}
      className={['tik-scanner', className].filter(Boolean).join(' ')}
      style={style}
      {...restProps}
    >
      <div
        className={['tik-scanner__frame', scrim ? 'tik-scanner__frame--scrim' : '']
          .filter(Boolean)
          .join(' ')}
        style={{ width: size, height: size }}
      >
        <Icon name="scannerBrackets" size={size} tone="onImmersive" />
      </div>
      {hint && <p className="tik-scanner__hint">{hint}</p>}
    </div>
  )
);

Scanner.displayName = 'Scanner';
