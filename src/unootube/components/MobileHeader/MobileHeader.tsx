import React from 'react';
import { Icon } from '../Icon';
import type { UniMobileHeaderProps } from './MobileHeader.types';
import './MobileHeader.css';

/**
 * Componente MobileHeader — Design System Unootube
 *
 * Reproduz o cabeçalho das telas móveis internas do arquivo "Free YouTube
 * Shorts Mockups (Community)": a barra do reprodutor de Shorts (`3:245`, com
 * voltar e câmera) e a do cabeçalho de canal (`16:1070`, com voltar e
 * reticências).
 *
 * A seta e a câmera são **traçadas**, não preenchidas — o arquivo declara
 * `stroke-width: 2` com pontas arredondadas nos dois nós. É o único par de
 * glifos assim em toda a biblioteca, e foi o motivo de o registro de ícones
 * passar a aceitar caminhos com traço.
 */
export const MobileHeader = React.forwardRef<HTMLElement, UniMobileHeaderProps>(
  (
    {
      title,
      onBack,
      backLabel = 'Voltar',
      hideBack = false,
      action,
      surface = 'chrome',
      className = '',
      ...restProps
    },
    ref
  ) => (
    <header
      ref={ref}
      className={['uni-mobile-header', `uni-mobile-header--${surface}`, className]
        .filter(Boolean)
        .join(' ')}
      {...restProps}
    >
      {!hideBack && (
        <button
          type="button"
          className="uni-mobile-header__target"
          aria-label={backLabel}
          onClick={onBack}
        >
          <Icon name="arrowLeft" size={32} />
        </button>
      )}

      {title != null && <h1 className="uni-mobile-header__title">{title}</h1>}

      {action != null && <div className="uni-mobile-header__action">{action}</div>}
    </header>
  )
);

MobileHeader.displayName = 'MobileHeader';
