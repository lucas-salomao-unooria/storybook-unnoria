import React from 'react';
import type { TikRecordButtonProps } from './RecordButton.types';
import './RecordButton.css';

/**
 * Componente RecordButton — Design System Tik Tooria
 *
 * Botão de gravação de 80px da câmera (node 4:695): disco de raio 32 em
 * `--tik-color-brand-button` dentro de um anel de 6px do mesmo tom, com o vão
 * transparente entre os dois. As duas medidas são literais do arquivo.
 */
export const RecordButton = React.forwardRef<HTMLButtonElement, TikRecordButtonProps>(
  ({ size = 80, label = 'Gravar', className = '', style, ...restProps }, ref) => (
    <button
      ref={ref}
      type="button"
      className={['tik-recordbutton', className].filter(Boolean).join(' ')}
      style={{ width: size, height: size, ...style }}
      aria-label={label}
      {...restProps}
    >
      <span className="tik-recordbutton__ring" aria-hidden />
      <span className="tik-recordbutton__core" aria-hidden />
    </button>
  )
);

RecordButton.displayName = 'RecordButton';
