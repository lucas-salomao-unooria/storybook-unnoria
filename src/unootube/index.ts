/**
 * Módulo Principal do Design System Unootube
 *
 * É o único módulo da plataforma com **dois arquivos Figma de origem**:
 *
 * 1. "YouTube UI Clone Design (Community)" (fileKey `HcbrbLtDZ1rMEvSjoXpA5c`),
 *    composto por três páginas — a documentação de tokens em
 *    `🎨 Design System` (`104:3087`), os 30 primeiros componentes em
 *    `Component` (`7:182`) e as três telas de referência em `Screen` (`0:1`),
 *    todas de 1440×1024. É a origem de toda a escala de tokens e do tema
 *    escuro.
 * 2. "Free YouTube Shorts Mockups (Community)" (fileKey
 *    `FlqnnoY0Mqdjic53twLAC1`, página `YouTube ` — `1:2`), com 18 quadros:
 *    três telas × três dispositivos × dois temas. É a origem do Shorts, do
 *    cromo móvel e do **tema claro**.
 *
 * Mantém namespace próprio de tokens (`--uni-*`) e prefixo de classes `uni-`,
 * no mesmo modelo adotado por `src/instanooria/`, `src/chatgpt/`,
 * `src/whatsappmobile/` e `src/tiktooria/`.
 *
 * O primeiro arquivo publica **um único modo semântico — escuro**: o quadro de
 * tokens se intitula "SEMANTIC TOKENS (DARK MODE)" e o cabeçalho da página
 * declara "Dark theme first". Dele continua proibido derivar um tema claro por
 * cálculo. O par claro/escuro que o módulo publica hoje vem **medido** do
 * segundo arquivo, que desenha as mesmas telas nas duas versões — cada valor
 * claro registra em `tokens/colors.ts` o nó em que foi lido. Ver a seção
 * "Figma & Especificações Técnicas" das estórias para o registro completo de
 * desvios.
 */

export * from './tokens';
export * from './components';
