'use client';

import React, { forwardRef, useState } from 'react';
import { PasswordInputProps } from './TextField.types';
import { TextField } from './TextField';
import { Icon } from '../Icon/Icon';

/**
 * Componente PasswordInput com alternância embutida de visibilidade da senha (olho).
 * Plataforma Unooria - Extraído do Figma (Node 6107:729 / Component Set 6107:840 & 24618:26361)
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      showVisibilityToggle = true,
      defaultVisible = false,
      onVisibilityChange,
      disabled,
      ...rest
    },
    ref
  ) => {
    const [visible, setVisible] = useState<boolean>(defaultVisible);

    const handleToggleVisibility = () => {
      const nextVisible = !visible;
      setVisible(nextVisible);
      onVisibilityChange?.(nextVisible);
    };

    const toggleButton = showVisibilityToggle && !disabled ? (
      <button
        type="button"
        aria-label={visible ? 'Ocultar senha' : 'Exibir senha'}
        onClick={handleToggleVisibility}
        className="unooria-textfield__action-btn"
      >
        <Icon name={visible ? 'visibility_off' : 'visibility'} size="xs" color="currentColor" />
      </button>
    ) : undefined;

    return (
      <TextField
        ref={ref}
        type={visible ? 'text' : 'password'}
        rightIcon={toggleButton}
        disabled={disabled}
        {...rest}
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
