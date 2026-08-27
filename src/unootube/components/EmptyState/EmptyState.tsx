import React from 'react';
import { Icon } from '../Icon';
import type { UniEmptyStateProps } from './EmptyState.types';
import './EmptyState.css';

/**
 * Componente EmptyState — Design System Unootube
 *
 * EXTENSÃO DECLARADA. Nenhum dos dois arquivos de origem publica estado vazio:
 * as seis telas que eles desenham estão todas cheias de conteúdo. O componente
 * existe porque produto tem playlist sem vídeo e busca sem resultado, e a
 * alternativa seria trazer o `EmptyState` da Plataforma Unooria, com Open Sans
 * e a paleta navy, para dentro de uma tela Roboto.
 *
 * A composição é inteiramente de degraus publicados: glifo da própria
 * biblioteca de 52, título em `Heading/H3`, descrição em `Body/Medium` na
 * tinta secundária e a calha de 16px. Nenhum valor novo.
 *
 * A ilustração é um slot `ReactNode`, e não um caminho de imagem, pelo mesmo
 * motivo que vale para todo o módulo: nenhum bitmap integra o pacote.
 */
export const EmptyState = React.forwardRef<HTMLDivElement, UniEmptyStateProps>(
  (
    {
      iconName,
      illustration,
      title,
      description,
      action,
      compact = false,
      className = '',
      ...restProps
    },
    ref
  ) => (
    <div
      ref={ref}
      className={['uni-empty-state', compact ? 'uni-empty-state--compact' : '', className]
        .filter(Boolean)
        .join(' ')}
      {...restProps}
    >
      {illustration != null ? (
        <div className="uni-empty-state__illustration">{illustration}</div>
      ) : (
        iconName && (
          <div className="uni-empty-state__illustration">
            {/*
             * Decorativo: o título já diz o que a tela comunica, e anunciar o
             * glifo só acrescentaria ruído ao leitor de tela.
             */}
            <Icon name={iconName} size={compact ? 32 : 48} />
          </div>
        )
      )}

      <h3 className="uni-empty-state__title">{title}</h3>
      {description != null && <p className="uni-empty-state__description">{description}</p>}
      {action != null && <div className="uni-empty-state__action">{action}</div>}
    </div>
  )
);

EmptyState.displayName = 'EmptyState';
