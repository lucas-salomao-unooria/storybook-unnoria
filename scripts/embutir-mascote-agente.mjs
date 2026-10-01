/**
 * Gera `src/unooria/assets/agent/agentImages.ts` a partir dos dois WebP do
 * busto do mascote (`agente-128.webp` e `agente-256.webp`, na mesma pasta).
 *
 * Por que embutir: o avatar do agente de IA do professor é identidade da marca,
 * como o `Logo` — tem de chegar PELO pacote, sem o produto hospedar arquivo nem
 * informar URL (exceção declarada à regra de bitmap, seção 1.2 do AGENTS.md).
 * O precedente é `assets/brand/brandImages.ts`.
 *
 * Por que o tipo é `string` e não `as const`: com `as const` o `tsc` copia o
 * literal base64 inteiro para o `.d.ts` (é o que acontece com o
 * `brandImages.d.ts`, 561 KB). Tipado como `string`, a declaração fica com
 * poucas linhas e o peso sai só no JS.
 *
 * Uso: node scripts/embutir-mascote-agente.mjs
 * (depois de `python3 scripts/recortar-mascote-agente.py <original.png>`).
 */
import fs from 'node:fs';
import path from 'node:path';

const pasta = path.join(process.cwd(), 'src', 'unooria', 'assets', 'agent');
const tamanhos = [128, 256];

const linhas = tamanhos.map((tam) => {
  const arquivo = path.join(pasta, `agente-${tam}.webp`);
  const bytes = fs.readFileSync(arquivo);
  // Confere a assinatura RIFF/WEBP: um PNG renomeado passaria calado.
  if (bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.toString('ascii', 8, 12) !== 'WEBP') {
    throw new Error(`${arquivo} não é WebP`);
  }
  return { tam, kb: (bytes.length / 1024).toFixed(1), uri: `data:image/webp;base64,${bytes.toString('base64')}` };
});

const conteudo = `/**
 * Busto do mascote do agente de IA do professor, embutido no pacote.
 *
 * ARQUIVO GERADO por \`scripts/embutir-mascote-agente.mjs\` a partir de
 * \`agente-128.webp\` e \`agente-256.webp\` (nesta pasta), que por sua vez saem de
 * \`scripts/recortar-mascote-agente.py\`. Não edite à mão.
 *
 * WebP com alfa, fundo recortado: ${linhas.map((l) => `${l.tam} px = ${l.kb} KB`).join('; ')}.
 * Exceção declarada à regra "bitmap nunca entra no pacote" (seção 1.2 do
 * AGENTS.md): o avatar do agente é identidade da marca, como o \`Logo\`.
 */

export type AgentImageSize = ${tamanhos.join(' | ')};

export const AGENT_IMAGES_BASE64: Readonly<Record<AgentImageSize, string>> = {
${linhas.map((l) => `  ${l.tam}: '${l.uri}',`).join('\n')}
};
`;

fs.writeFileSync(path.join(pasta, 'agentImages.ts'), conteudo);
console.log(`✓ agentImages.ts gerado (${linhas.map((l) => `${l.tam}px ${l.kb} KB`).join(', ')}).`);
