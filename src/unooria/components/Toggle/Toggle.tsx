'use client';

import React, { forwardRef, useId, useState } from 'react';
import { ToggleProps } from './Toggle.types';
import './Toggle.css';

/**
 * Componente oficial Toggle (Switch / Interruptor) do Unooria Design System.
 * Plataforma Unooria - Extraído do Figma (Node 6034:914 / Component Set 6034:960)
 */
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      checked,
      defaultChecked = false,
      onChange,
      size = 'xs',
      label,
      description,
      labelPosition = 'right',
      disabled = false,
      id,
      name,
      value,
      theme = 'light',
      className = '',
      style,
      ...rest
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked);

    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    // `useId` em vez de `Math.random()`: o id vai para o DOM e precisa ser
    // igual no servidor e no cliente (sob pena de erro de hidratação) e estável
    // entre renders (senão a associação <label>/<input> se perde).
    const reactId = useId();
    const generatedId = id || (label ? `unooria-toggle-${reactId}` : undefined);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      const nextChecked = e.target.checked;
      if (!isControlled) {
        setInternalChecked(nextChecked);
      }
      onChange?.(nextChecked, e);
    };

    const sizeClass = `unooria-toggle--size-${size}`;
    const checkedClass = isChecked ? 'unooria-toggle--checked' : '';
    const disabledClass = disabled ? 'unooria-toggle--disabled' : '';
    const labelPosClass = labelPosition === 'left' ? 'unooria-toggle--label-left' : '';
    const themeClass = theme === 'dark' ? 'unooria-toggle--theme-dark' : '';

    const containerClassName = [
      'unooria-toggle',
      sizeClass,
      checkedClass,
      disabledClass,
      labelPosClass,
      themeClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <label className={containerClassName} style={style}>
        <input
          ref={ref}
          id={generatedId}
          type="checkbox"
          role="switch"
          name={name}
          value={value}
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
          className="unooria-toggle__input"
          aria-checked={isChecked}
          {...rest}
        />

        <span className="unooria-toggle__track">
          <span className="unooria-toggle__knob" />
        </span>

        {(label || description) && (
          <div className="unooria-toggle__text-group">
            {label && <span className="unooria-toggle__label">{label}</span>}
            {description && <span className="unooria-toggle__description">{description}</span>}
          </div>
        )}
      </label>
    );
  }
);

Toggle.displayName = 'Toggle';

export default Toggle;
