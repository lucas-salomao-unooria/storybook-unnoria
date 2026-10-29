'use client';

import React from 'react';
import type { UncSwitchProps } from './Switch.types';
import './Switch.css';

/**
 * Componente Switch — Design System Unoochat
 *
 * Extensão: interruptor de dois estados com rótulo e descrição, para as linhas
 * de configuração do aplicativo e para as escolhas de uma missão ("Anotação de
 * escala" / "Eixo vertical iniciando em 0%").
 *
 * O controle é um `<button type="button" role="switch">` VISÍVEL, com
 * `aria-checked`: Enter e Espaço o acionam pelo comportamento nativo do botão,
 * e ele tem caixa própria de 44 × 44px — o alvo de toque e o que um teste de
 * navegador encontra visível. Não se esconde um `<input>` com largura zero,
 * como faz o `Toggle` da Plataforma Unooria. O texto fica num `<label>` ligado
 * ao botão: tocar no rótulo ou na descrição também alterna. O rótulo dá o nome
 * acessível (`aria-labelledby`) e a descrição, a descrição (`aria-describedby`).
 *
 * Client Component: guarda estado e gera ids com `useId`.
 */
export const Switch = React.forwardRef<HTMLButtonElement, UncSwitchProps>(
  (
    {
      checked,
      defaultChecked = false,
      onChange,
      label,
      description,
      labelPosition = 'right',
      disabled = false,
      name,
      value = 'on',
      id,
      className = '',
      style,
      onClick,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      ...restProps
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState<boolean>(defaultChecked);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    const reactId = React.useId();
    const buttonId = id ?? `unc-switch-${reactId}`;
    const labelId = `${buttonId}-rotulo`;
    const descriptionId = `${buttonId}-descricao`;

    const hasLabel = label !== undefined && label !== null && label !== false && label !== '';
    const hasDescription =
      description !== undefined &&
      description !== null &&
      description !== false &&
      description !== '';

    // Precedência do `Modal` e do `Certificate` (seção 4.3 do AGENTS.md): o
    // `aria-labelledby` explícito manda, e um `aria-label` explícito não é
    // calado pelo rótulo.
    const labelledBy = ariaLabelledBy ?? (ariaLabel || !hasLabel ? undefined : labelId);
    const describedBy =
      [ariaDescribedBy, hasDescription ? descriptionId : undefined].filter(Boolean).join(' ') ||
      undefined;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (disabled || event.defaultPrevented) return;
      const next = !isChecked;
      if (!isControlled) setInternalChecked(next);
      onChange?.(next, event);
    };

    const classes = [
      'unc-switch',
      labelPosition === 'left' ? 'unc-switch--label-left' : '',
      isChecked ? 'unc-switch--checked' : '',
      disabled ? 'unc-switch--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={classes} style={style}>
        <button
          ref={ref}
          id={buttonId}
          type="button"
          role="switch"
          aria-checked={isChecked}
          aria-label={ariaLabel}
          aria-labelledby={labelledBy}
          aria-describedby={describedBy}
          disabled={disabled}
          className="unc-switch__control"
          onClick={handleClick}
          {...restProps}
        >
          <span className="unc-switch__track" aria-hidden="true">
            <span className="unc-switch__knob" />
          </span>
        </button>

        {(hasLabel || hasDescription) && (
          <label htmlFor={buttonId} className="unc-switch__text">
            {hasLabel && (
              <span id={labelId} className="unc-switch__label">
                {label}
              </span>
            )}
            {hasDescription && (
              <span id={descriptionId} className="unc-switch__description">
                {description}
              </span>
            )}
          </label>
        )}

        {name && <input type="hidden" name={name} value={value} disabled={!isChecked} />}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
