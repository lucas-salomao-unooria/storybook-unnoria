import React, { forwardRef, Children, isValidElement, cloneElement } from 'react';
import { StepperProps, StepItem, StepStatus } from './Stepper.types';
import { Step } from './Step';
import './Stepper.css';

interface StepperComponent
  extends React.ForwardRefExoticComponent<
    StepperProps & React.RefAttributes<HTMLDivElement>
  > {
  Step: typeof Step;
}

/**
 * Componente oficial de Stepper (Indicador de Etapas / Passos) do Unooria Design System.
 * Plataforma Unooria - Extraído do Figma (Node 12694:10079 / Component Set 12694:10091)
 *
 * Guia o usuário por meio de uma sequência clara de etapas em formulários, cadastros ou fluxos longos.
 */
export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      steps,
      currentStep = 0,
      onStepClick,
      orientation = 'horizontal',
      size = 'md',
      clickable = true,
      showConnector = true,
      fillCompletedConnectors = true,
      theme = 'light',
      children,
      className = '',
      style,
      ...rest
    },
    ref
  ) => {
    const orientationClass = `unooria-stepper--${orientation}`;
    const sizeClass = `unooria-stepper--size-${size}`;
    const themeClass = theme === 'dark' ? 'unooria-stepper--theme-dark' : '';

    const combinedClassName = [
      'unooria-stepper',
      orientationClass,
      sizeClass,
      themeClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // 1. Modo Declarativo via Compound Components (<Stepper.Step />)
    if (children) {
      const childArray = Children.toArray(children).filter(isValidElement);

      return (
        <div
          ref={ref}
          role="navigation"
          aria-label="Progresso de etapas"
          className={combinedClassName}
          style={style}
          {...rest}
        >
          {childArray.map((child, index) => {
            const isLast = index === childArray.length - 1;
            const childProps = child.props as any;

            let stepStatus: StepStatus = childProps.status;
            if (!stepStatus) {
              if (index === currentStep) {
                stepStatus = 'selected';
              } else if (index < currentStep) {
                stepStatus = 'completed';
              } else {
                stepStatus = 'default';
              }
            }

            const isConnectorFilled = fillCompletedConnectors && index < currentStep;

            const clonedChild = cloneElement(child as React.ReactElement<any>, {
              index,
              status: stepStatus,
              size,
              theme,
              clickable: childProps.clickable !== undefined ? childProps.clickable : clickable,
              onStepClick: () => {
                childProps.onStepClick?.();
                onStepClick?.(index, {
                  label: childProps.label,
                  description: childProps.description,
                  icon: childProps.icon,
                  status: stepStatus,
                });
              },
            });

            if (orientation === 'vertical') {
              return (
                <div key={index} className="unooria-stepper__vertical-step-wrapper">
                  {clonedChild}
                  {!isLast && showConnector && (
                    <div
                      className={`unooria-stepper__connector-vertical ${
                        isConnectorFilled ? 'unooria-stepper__connector-vertical--filled' : ''
                      }`}
                    />
                  )}
                </div>
              );
            }

            return (
              <React.Fragment key={index}>
                {clonedChild}
                {!isLast && showConnector && (
                  <div
                    className={`unooria-stepper__connector-horizontal ${
                      isConnectorFilled ? 'unooria-stepper__connector-horizontal--filled' : ''
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      );
    }

    // 2. Modo Baseado em Dados (Array de `steps`)
    const items = steps || [];

    return (
      <div
        ref={ref}
        role="navigation"
        aria-label="Progresso de etapas"
        className={combinedClassName}
        style={style}
        {...rest}
      >
        {items.map((step, index) => {
          const isLast = index === items.length - 1;

          let stepStatus: StepStatus = step.status || 'default';
          if (!step.status) {
            if (index === currentStep) {
              stepStatus = 'selected';
            } else if (index < currentStep) {
              stepStatus = 'completed';
            } else {
              stepStatus = 'default';
            }
          }

          const isConnectorFilled = fillCompletedConnectors && index < currentStep;
          const isStepClickable = clickable && !step.disabled && !!onStepClick;

          const stepElement = (
            <Step
              key={step.id || index}
              index={index}
              label={step.label}
              description={step.description}
              icon={step.icon || 'add'}
              status={stepStatus}
              optional={step.optional}
              disabled={step.disabled}
              clickable={isStepClickable}
              size={size}
              theme={theme}
              onStepClick={() => onStepClick?.(index, step)}
            />
          );

          if (orientation === 'vertical') {
            return (
              <div key={step.id || index} className="unooria-stepper__vertical-step-wrapper">
                {stepElement}
                {!isLast && showConnector && (
                  <div
                    className={`unooria-stepper__connector-vertical ${
                      isConnectorFilled ? 'unooria-stepper__connector-vertical--filled' : ''
                    }`}
                  />
                )}
              </div>
            );
          }

          return (
            <React.Fragment key={step.id || index}>
              {stepElement}
              {!isLast && showConnector && (
                <div
                  className={`unooria-stepper__connector-horizontal ${
                    isConnectorFilled ? 'unooria-stepper__connector-horizontal--filled' : ''
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
) as StepperComponent;

Stepper.displayName = 'Stepper';
Stepper.Step = Step;

export default Stepper;
