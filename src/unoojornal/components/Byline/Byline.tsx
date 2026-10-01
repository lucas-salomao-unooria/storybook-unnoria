import React from 'react';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import type { UjnBylineProps } from './Byline.types';
import './Byline.css';

/**
 * Componente Byline — Design System Unoojornal
 *
 * Assinatura da matéria: autoria em negrito, papel ou turma, data e tempo de
 * leitura. Na disposição `inline` (a da capa), a autoria fica à esquerda e o
 * tempo de leitura à direita; na `stacked` (a do cabeçalho da matéria), tudo
 * se empilha ao lado do retrato. O retrato só aparece quando `avatarSrc` é
 * informado.
 *
 * Só recebe props e renderiza markup: é Server Component.
 */
export const Byline = React.forwardRef<HTMLDivElement, UjnBylineProps>(
  (
    { author, role, avatarSrc, date, readingTime, layout = 'inline', theme, className = '', ...restProps },
    ref
  ) => {
    const classes = ['ujn-byline', `ujn-byline--${layout}`, className].filter(Boolean).join(' ');
    const details = [role, date].filter(Boolean);

    return (
      <div ref={ref} data-ujn-theme={theme} className={classes} {...restProps}>
        {avatarSrc && <Avatar src={avatarSrc} name={author} size="md" alt="" />}
        <div className="ujn-byline__text">
          <span className="ujn-byline__author">{author}</span>
          {details.length > 0 && (
            <span className="ujn-byline__detail">
              {details.map((detail, index) => (
                <React.Fragment key={detail}>
                  {index > 0 && (
                    <span className="ujn-byline__separator" aria-hidden="true">
                      {' · '}
                    </span>
                  )}
                  {detail}
                </React.Fragment>
              ))}
            </span>
          )}
        </div>
        {readingTime && (
          <span className="ujn-byline__reading-time">
            <Icon name="schedule" size="xs" tone="inherit" />
            {readingTime}
          </span>
        )}
      </div>
    );
  }
);

Byline.displayName = 'Byline';
