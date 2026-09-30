'use client';

import React from 'react';

/**
 * Estado que o consumidor pode controlar ou deixar com o componente.
 *
 * `value` definido (inclusive `null`) é controlado: o componente só pede a troca
 * por `onChange`. `value` indefinido é não controlado: o componente guarda o
 * próprio estado, a partir de `defaultValue`, e ainda avisa por `onChange`.
 *
 * NÃO serve para texto de campo nativo: campos seguem a regra 4.5.1 do
 * AGENTS.md (`defaultValue` no elemento quando o consumidor não passa `value`).
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T;
  defaultValue: T;
  onChange?: (next: T) => void;
}): [T, (next: T | ((current: T) => T)) => void] {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState<T>(defaultValue);
  const current = isControlled ? (value as T) : internal;
  const currentRef = React.useRef(current);

  React.useEffect(() => {
    currentRef.current = current;
  }, [current]);

  const setValue = React.useCallback(
    (next: T | ((current: T) => T)) => {
      const resolved =
        typeof next === 'function' ? (next as (current: T) => T)(currentRef.current) : next;
      if (Object.is(resolved, currentRef.current)) return;
      if (!isControlled) {
        currentRef.current = resolved;
        setInternal(resolved);
      }
      onChange?.(resolved);
    },
    [isControlled, onChange]
  );

  return [current, setValue];
}
