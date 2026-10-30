import React from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Propriedades do componente PuzzleTrack da Plataforma Unooria.
 *
 * A calha de vagas onde os `PuzzleBlock` se encaixam — a "Chave do Editor" do
 * Jornal da Escola. A calha só DESENHA: quais blocos estão em quais vagas, se a
 * chave está formada e o que dizer na linha de status é tudo informado por quem
 * usa. Ela não sabe qual combinação é a certa, porque o gabarito é do servidor.
 *
 * `children` fica de fora: o conteúdo da calha são as vagas, e elas entram por
 * `slots`, na ordem, uma por posição.
 */
export interface PuzzleTrackProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * O nome da calha ("Chave do Editor"). Aparece como título e NOMEIA o grupo
   * para o leitor de tela.
   */
  label: React.ReactNode;

  /**
   * O conteúdo de cada vaga, na ordem: um `PuzzleBlock` encaixado, ou `null`
   * para vaga vazia (`undefined` e `false` também contam como vazia). O
   * comprimento do array é o número de vagas — na missão, 3.
   */
  slots: React.ReactNode[];

  /**
   * Texto acessível de uma vaga vazia, a partir do índice (base 0). Por padrão
   * a vaga mostra só o número, e este texto é o que o leitor de tela lê no
   * lugar dele; com `showEmptySlotLabel`, é ele que aparece na vaga.
   *
   * É uma função: num app Next com Server Components, quem a passa precisa ser
   * Client Component (função não atravessa a fronteira servidor/cliente).
   * @default (index) => `Vaga ${index + 1}, vazia`
   */
  emptySlotLabel?: (index: number) => React.ReactNode;

  /**
   * Mostra o `emptySlotLabel` DENTRO da vaga vazia, como texto visível, no
   * lugar do número ("[Solte o cartão aqui]", "Colocar em Dados Fornecidos").
   * O nome acessível não muda: é o mesmo texto, agora lido de onde se vê, em
   * vez de uma cópia escondida. Sem a prop, a vaga é a de antes — só o número.
   * @default false
   */
  showEmptySlotLabel?: boolean;

  /**
   * A chave está formada. A calha vira um bloco só, com fundo de sucesso, e a
   * linha de status passa a dizer `completeLabel` com o glifo `key`.
   * @default false
   */
  complete?: boolean;

  /**
   * O que a calha diz quando `complete`. Fica na região anunciada, junto do
   * `status`, então o leitor de tela o ouve sem ninguém repetir o texto.
   * @default 'Chave do Editor formada'
   */
  completeLabel?: React.ReactNode;

  /**
   * Uma linha de status anunciada em `aria-live="polite"` ("2 de 3 vagas
   * preenchidas", "Esse bloco não abre a chave. Tente outro."). A região existe
   * sempre, mesmo vazia: é o que faz a PRIMEIRA mensagem ser anunciada.
   */
  status?: React.ReactNode;

  /**
   * Torna a VAGA VAZIA acionável: o segundo tempo do toque sequencial "toca o
   * cartão, toca a vaga" (o primeiro é o `selected` do `PuzzleBlock`). Com a
   * prop, cada vaga vazia vira um `<button type="button">` — toque, clique,
   * Enter e Espaço chamam a função com o índice da vaga (base 0). Sem a prop,
   * a vaga continua sendo só desenho, como antes.
   *
   * O NOME do botão é o `emptySlotLabel` da vaga. Quando a vaga é acionável,
   * escreva-o como ação ("Colocar em Dados Fornecidos"), não como estado.
   *
   * Vagas ocupadas nunca viram botão: o bloco encaixado já é um, e botão
   * dentro de botão é HTML inválido. O toque sequencial é o caminho PRINCIPAL:
   * faz a mesma coisa que o arraste sem excluir teclado, leitor de tela e
   * touchpad. O arraste, a mais, é o `onSlotDrop`.
   *
   * É uma função: num app Next com Server Components, quem a passa precisa ser
   * Client Component.
   */
  onSlotActivate?: (index: number) => void;

  /**
   * Torna CADA vaga — vazia ou ocupada — um alvo de SOLTURA para um
   * `PuzzleBlock` arrastável (com `dragData`). Ao soltar o bloco numa vaga, a
   * função é chamada com o índice da vaga (base 0) e o `dragData` do bloco, lido
   * do `dataTransfer` pelo tipo `PUZZLE_BLOCK_DRAG_TYPE`
   * (`application/x-unooria-puzzle-block`). Qualquer outra coisa arrastada (um
   * texto, um arquivo, uma imagem) não é aceita, e a vaga nem se acende.
   *
   * Enquanto um bloco passa por cima, a vaga ganha um contorno de 2px e, se
   * vazia, o fundo e o fio de realce do hover (`data-drop-target`). O que fazer
   * com a soltura numa vaga OCUPADA — trocar, empurrar, recusar — é do
   * consumidor: a calha só diz onde soltaram e o quê.
   *
   * É um caminho A MAIS, para quem tem mouse: o toque sequencial
   * (`onSlotActivate`) segue sendo o caminho de teclado e leitor de tela, e as
   * duas props convivem. `slotsDisabled` não bloqueia a soltura — ele diz
   * "nenhum cartão escolhido ainda", e quem arrasta já traz o seu. Sem a prop,
   * nada muda.
   *
   * É uma função: num app Next com Server Components, quem a passa precisa ser
   * Client Component.
   */
  onSlotDrop?: (index: number, dragData: string) => void;

  /**
   * Vagas acionáveis à espera ("nenhum cartão escolhido ainda"). As vagas
   * continuam no Tab e legíveis, com `aria-disabled`, mas o toque não chama
   * `onSlotActivate`. Sem `onSlotActivate`, não faz nada.
   * @default false
   */
  slotsDisabled?: boolean;

  /**
   * Tema visual.
   * @default 'light'
   */
  theme?: UnooriaTheme;

  /** Classe CSS adicional. */
  className?: string;
}
