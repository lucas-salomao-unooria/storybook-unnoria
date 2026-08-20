/**
 * Ponto de entrada global da biblioteca.
 *
 * NÃO declare `'use client'` aqui. O pacote é emitido sem bundling (ver
 * `tsup.config.ts`), então a diretiva vale por arquivo: cada componente que
 * usa hooks, API de browser ou repassa função a um filho carrega a sua. Uma
 * diretiva neste barril marcaria as marcas inteiras como client e
 * eliminaria os 44 componentes que hoje rodam como Server Components.
 */

export * as UnooriaUI from './unooria';
export * as InstanooriaUI from './instanooria';
export * as WhatsAppMobileUI from './whatsappmobile';
export * as ChatGPTUI from './chatgpt';
export * as TikTooriaUI from './tiktooria';
export * as UnitubeUI from './unitube';
export * from './unooria';
