import React, { forwardRef } from 'react';
import { LogoLockupProps } from './Logo.types';
import { Logo } from './Logo';
import './Logo.css';

/**
 * Componente oficial LogoLockup (Lockup de Co-Branding / Integração com Parceiros)
 */
export const LogoLockup = forwardRef<HTMLDivElement, LogoLockupProps>(
  (
    {
      partnerName = 'Partner Name',
      partnerLogo,
      size = 'md',
      color,
      theme = 'light',
      className = '',
      style,
      ...rest
    },
    ref
  ) => {
    const themeClass = theme === 'dark' ? 'unooria-logo-lockup--theme-dark' : '';
    const containerClasses = [
      'unooria-logo-lockup',
      themeClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={containerClasses} style={style} {...rest}>
        <Logo size={size} color={color} theme={theme} />

        <div className="unooria-logo-lockup__divider" />

        {partnerLogo ? (
          <div className="unooria-logo-lockup__partner-logo">{partnerLogo}</div>
        ) : (
          <span className="unooria-logo-lockup__partner-name">{partnerName}</span>
        )}
      </div>
    );
  }
);

LogoLockup.displayName = 'LogoLockup';

export default LogoLockup;
