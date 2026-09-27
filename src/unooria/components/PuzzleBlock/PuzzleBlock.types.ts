import React from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Em que momento da jogada o bloco está. Quem decide é o CONSUMIDOR — o bloco
 * não sabe se é peça certa ou isca, porque o gabarito é do servidor.
 *
 * - `idle`: na bandeja, esperando o toque.
 * - `placed`: encaixado numa vaga da calha. Tocar de novo devolve à bandeja.
 * - `returned`: acabou de VOLTAR para a bandeja porque não abria a chave. Mostra
 *   o aviso `returnedLabel` por escrito (com o glifo `replay`), e não só uma cor.
 *   É um estado breve: quem usa o devolve a `idle` na jogada seguinte.
 * - `locked`: a chave foi formada e o bloco não se mexe mais. Continua focável
 *   e legível (`aria-disabled`, não `disabled`), mas o toque não faz nada.
 */
export type PuzzleBlockState = 'idle' | 'placed' | 'returned' | 'locked';

/**
 * Propriedades do componente PuzzleBlock da Plataforma Unooria.
 *
 * Uma peça de quebra-cabeça que se toca para encaixar numa calha
 * (`PuzzleTrack`) — a "Chave do Editor" do Jornal da Escola. A interação é por
 * TOQUE SEQUENCIAL, não por arraste: tocar na bandeja encaixa, tocar na vaga
 * devolve. É um `<button>` de verdade, então teclado e leitor de tela chegam
 * nele sem nada a mais.
 *
 * `title` fica de fora: o balão nativo do navegador não aparece no toque nem no
 * leitor de tela, e o bloco já mostra o rótulo e a pergunta de apoio por escrito.
 */
export interface PuzzleBlockProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
  /**
   * O nome da peça ("Fonte"). É o NOME acessível do botão — sozinho, sem a
   * pergunta de apoio. A caixa alta é do CSS: escreva em caixa normal para o
   * leitor de tela dizer "Fonte" em vez de soletrar "F-O-N-T-E".
   */
  label: React.ReactNode;

  /**
   * A pergunta de apoio sob o rótulo ("De onde veio? É canal oficial ou
   * confiável?"). Vira a DESCRIÇÃO acessível do botão, lida depois do nome.
   */
  description?: React.ReactNode;

  /**
   * Nome da ligadura do Material Symbols Rounded mostrada à esquerda
   * (`account_balance`, `calendar_month`, `history_edu`). Decorativo: o nome do bloco
   * é o `label`.
   */
  icon?: string;

  /**
   * Momento da jogada. Ver `PuzzleBlockState`.
   * @default 'idle'
   */
  state?: PuzzleBlockState;

  /**
   * Aviso escrito do estado `returned`, também anunciado na descrição acessível.
   * @default 'Voltou para a bandeja'
   */
  returnedLabel?: string;

  /**
   * Tema visual.
   * @default 'light'
   */
  theme?: UnooriaTheme;

  /** Classe CSS adicional. */
  className?: string;
}
