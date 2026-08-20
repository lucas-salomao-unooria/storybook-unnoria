import React from 'react';
import type { TikSectionLabelProps } from './SectionLabel.types';
import './SectionLabel.css';

/**
 * Componente SectionLabel — Design System Tik Tooria
 *
 * Rótulo de seção das telas de configuração ("ACCOUNT", "GENERAL", "SUPPORT",
 * nodes 4:254, 4:270 e 4:298). Semibold 13 em `--tik-color-text-secondary`,
 * recuado pela calha de 16px.
 *
 * O arquivo escreve o texto já em caixa alta e **não** declara `text-transform`
 * nem `letter-spacing`; nenhum dos dois foi acrescentado.
 */
export const SectionLabel = React.forwardRef<HTMLHeadingElement, TikSectionLabelProps>(
  ({ className = '', children, ...restProps }, ref) => (
    <h2
      ref={ref}
      className={['tik-sectionlabel', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {children}
    </h2>
  )
);

SectionLabel.displayName = 'SectionLabel';
