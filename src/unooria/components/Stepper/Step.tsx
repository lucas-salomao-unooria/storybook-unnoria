import React, { forwardRef } from 'react';
import { StepProps } from './Stepper.types';
import { Icon } from '../Icon/Icon';
import './Stepper.css';

/**
 * Subcomponente individual Step (Etapa) do Stepper.
 * Plataforma Unooria - Extraído do Figma (Node 12694:10091)
 */
export const Step = forwardRef<HTMLButtonElement, StepProps>(
  (
    {
      index,
      label,
      description,
      icon = 'add',
      status = 'default',
      optional = false,
      clickable = true,
      size = 'md',
      theme = 'light',
      onStepClick,
      className = '',
      style,
      disabled,
      ...rest
    },
    ref
  ) => {
    const isClickable = clickable && !disabled && !!onStepClick;

    const statusClass = `unooria-step--${status}`;
    const clickableClass = isClickable ? 'unooria-step--clickable' : '';
    const disabledClass = disabled || status === 'disabled' ? 'unooria-step--disabled' : '';

    const combinedClassName = [
      'unooria-step',
      statusClass,
      clickableClass,
      disabledClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Ícone do Step: usa 'check' se concluído (a menos que tenha ícone customizado), ou o ícone configurado
    const iconName = status === 'completed' && icon === 'add' ? 'check' : icon;

    const iconSize = size === 'sm' ? 'xs' : size === 'lg' ? 'm' : 's';

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled || status === 'disabled' || !isClickable}
        onClick={isClickable ? onStepClick : undefined}
        aria-current={status === 'selected' ? 'step' : undefined}
        className={combinedClassName}
        style={style}
        {...rest}
      >
        {/* Ícone */}
        <div className="unooria-step__icon-wrapper">
          <Icon name={iconName} size={iconSize} color="currentColor" />
        </div>

        {/* Textos (Rótulo + Opcional + Descrição) */}
        <div className="unooria-step__content">
          <div className="unooria-step__label-row">
            <span className="unooria-step__label">{label}</span>
            {optional && <span className="unooria-step__optional-badge">Opcional</span>}
          </div>
          {description && <span className="unooria-step__description">{description}</span>}
        </div>
      </button>
    );
  }
);

Step.displayName = 'Step';

export default Step;
