import React from 'react';
import { Icon } from '../Icon';
import type { TikSheetBodyProps, TikSheetHeaderProps, TikSheetProps } from './Sheet.types';
import './Sheet.css';

/**
 * Cabeçalho da folha — título em Semibold 13 e botão de fechar opcional.
 */
const SheetHeader = React.forwardRef<HTMLDivElement, TikSheetHeaderProps>(
  ({ title, showClose = false, closeLabel = 'Fechar', onClose, className = '', children, ...restProps }, ref) => (
    <div ref={ref} className={['tik-sheet__header', className].filter(Boolean).join(' ')} {...restProps}>
      {title !== undefined && <span className="tik-sheet__title">{title}</span>}
      {children}
      {showClose && (
        <button type="button" className="tik-sheet__close" onClick={onClose} aria-label={closeLabel}>
          <Icon name="closeSmall" size={9.5} tone="primary" />
        </button>
      )}
    </div>
  )
);

SheetHeader.displayName = 'Sheet.Header';

/**
 * Corpo rolável da folha, com barra de rolagem fina e trilho transparente.
 */
const SheetBody = React.forwardRef<HTMLDivElement, TikSheetBodyProps>(
  ({ className = '', children, ...restProps }, ref) => (
    <div ref={ref} className={['tik-sheet__body', className].filter(Boolean).join(' ')} {...restProps}>
      {children}
    </div>
  )
);

SheetBody.displayName = 'Sheet.Body';

/**
 * Componente Sheet — Design System Tik Tooria
 *
 * Folha inferior das telas "TikTok Comments" e "TikTok Share to" (nodes 4:964 e
 * 4:859). Superfície `#F5F5F4` com raio de 8px apenas nos cantos superiores e
 * **sem sombra** — o arquivo separa a folha do vídeo apenas pelo contraste de
 * luminância.
 */
const SheetRoot = React.forwardRef<HTMLDivElement, TikSheetProps>(
  ({ ariaLabel, className = '', children, ...restProps }, ref) => (
    <div
      ref={ref}
      role="dialog"
      aria-modal="false"
      aria-label={ariaLabel}
      className={['tik-sheet', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {children}
    </div>
  )
);

SheetRoot.displayName = 'Sheet';

/**
 * Folha inferior com os subcomponentes `Sheet.Header` e `Sheet.Body`.
 */
export const Sheet = Object.assign(SheetRoot, { Header: SheetHeader, Body: SheetBody });
