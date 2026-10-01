/**
 * Formata a quantidade de seguidores em pt-BR, abreviando a partir de mil:
 * 980 → "980 seguidores", 1200 → "1,2 mil seguidores", 1 → "1 seguidor".
 */
export function formatFollowers(count: number): string {
  const safe = Math.max(0, Math.round(count));
  const formatted =
    safe >= 1000
      ? new Intl.NumberFormat('pt-BR', {
          notation: 'compact',
          compactDisplay: 'long',
          maximumFractionDigits: 1,
        }).format(safe)
      : safe.toLocaleString('pt-BR');
  return `${formatted} ${safe === 1 ? 'seguidor' : 'seguidores'}`;
}
