/**
 * Módulo Principal do Design System Unoochat
 *
 * Design system Unoochat: a mensageria móvel da Plataforma Unooria. Mantém
 * namespace próprio de tokens (`--unc-*`) e prefixo de classes `.unc-*`, no
 * mesmo modelo de `src/instanooria/` e `src/chatgpt/`.
 *
 * Tema: atributo `data-unc-theme="light | dark"`. Os tokens são literais
 * copiados da paleta da Plataforma Unooria — a paridade é verificada por
 * `scripts/verificar-paridade-unoochat.mjs`. Os ícones são o Material Symbols
 * Rounded, por ligadura; a fonte é opt-in
 * (`@unooria/design-system/fonts/unoochat.css`). A tipografia é Open Sans.
 */

export * from './tokens';
export * from './components';
