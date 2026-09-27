import React from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Propriedades do componente RevealClue da Plataforma Unooria.
 *
 * Uma pista escondida atrás de um botão largo: a pessoa toca, a pista aparece
 * logo abaixo; toca de novo, ela some. Nasceu na missão "Jornal da Escola" do
 * 4º ano — Fonte, Data e Autoria de uma notícia —, mas serve a qualquer
 * informação que a criança deva ir buscar em vez de receber pronta.
 *
 * **O componente só guarda o próprio estado.** Ele não sabe se a pista é boa
 * ou ruim, não avisa nada e não conta quantas vezes foi aberta: quem registra
 * "a criança abriu a pista" é a missão, pelo `onOpenChange`.
 *
 * **Fechada, a pista não existe para o teclado nem para o leitor de tela.** O
 * painel recebe o atributo `hidden` — e não `aria-hidden` —, porque foi o
 * `aria-hidden` do `Collapse` que deixou ~30 botões focáveis dentro de
 * conteúdo fechado no monorepo consumidor, sequestrando o Tab.
 */
export interface RevealClueProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'children'> {
  /** O nome da pista, sempre visível no botão (ex.: "Fonte"). */
  label: React.ReactNode;

  /**
   * A pergunta de apoio, exibida sob o rótulo (ex.: "De onde veio?"). Para
   * quem ainda está aprendendo a ler a notícia, é a pergunta que diz o que
   * procurar — por isso ela entra no nome do botão.
   */
  question?: React.ReactNode;

  /**
   * Nome da ligadura do Material Symbols Rounded exibida à esquerda
   * (ex.: `account_balance`, `calendar_month`, `history_edu`). Decorativo: o
   * nome da pista já está no rótulo.
   */
  icon?: string;

  /** O que se revela ao abrir. */
  children: React.ReactNode;

  /**
   * Estado aberto controlado. Informado, o componente deixa de guardar o
   * próprio estado e só avisa pelo `onOpenChange`.
   */
  open?: boolean;

  /**
   * Estado aberto inicial, no modo não controlado.
   * @default false
   */
  defaultOpen?: boolean;

  /** Chamado a cada toque no botão, com o estado que a pista passa a ter. */
  onOpenChange?: (open: boolean) => void;

  /**
   * Tema visual.
   * @default 'light'
   */
  theme?: UnooriaTheme;

  /** Classe CSS adicional na raiz. */
  className?: string;
}
