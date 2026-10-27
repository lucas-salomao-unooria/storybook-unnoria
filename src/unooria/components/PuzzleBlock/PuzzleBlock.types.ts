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
 * Escala do bloco.
 *
 * - `md`: a peça de 64px da bandeja — o alvo de quem toca num tablet, com o
 *   rótulo em caixa alta.
 * - `sm`: a peça COMPACTA, para a vaga estreita de uma calha em duas colunas
 *   num celular de 375px. Rótulo em caixa normal (14px), alvo de
 *   44px e quebra só entre PALAVRAS: o `md` quebra em qualquer letra
 *   (`overflow-wrap: anywhere`), e numa vaga de ~100px isso partia "AVANÇADA"
 *   em "AVANÇAD/A".
 */
export type PuzzleBlockSize = 'md' | 'sm';

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
   * O bloco está ESCOLHIDO e espera o próximo toque — o primeiro tempo do toque
   * sequencial "toca o cartão, toca a vaga" (ver `onSlotActivate` no
   * `PuzzleTrack`). É ortogonal a `state`: pensado para `idle`, na bandeja.
   *
   * Com a prop presente (`true` ou `false`), o botão vira um botão de
   * alternância: recebe `aria-pressed`, e o leitor de tela diz "Fonte, botão
   * de alternância, pressionado". Sem a prop, nada muda — nem o atributo nem o
   * visual —, então quem já usa o bloco não sente diferença. Um
   * `aria-pressed` passado à mão vence.
   *
   * O visual não depende só de cor: o contorno da peça inteira passa a 2px e
   * aparece o glifo `check_circle` à direita. Em `locked`, o visual de travado
   * manda (o `aria-pressed` continua seguindo a prop).
   */
  selected?: boolean;

  /**
   * Escala do bloco. Ver `PuzzleBlockSize`.
   * @default 'md'
   */
  size?: PuzzleBlockSize;

  /**
   * Tema visual.
   * @default 'light'
   */
  theme?: UnooriaTheme;

  /** Classe CSS adicional. */
  className?: string;
}
