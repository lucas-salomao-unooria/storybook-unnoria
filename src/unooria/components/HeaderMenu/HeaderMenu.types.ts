import React from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Item individual da faixa de ações do HeaderMenu.
 *
 * Cada item é renderizado como um `role="menuitem"` de 34x34px que exibe **ou**
 * um ícone (`icon`) **ou** um rótulo curto de texto (`text`, como o `PT` do
 * seletor de idioma do Figma). O texto de `label` nunca é exibido em linha: ele
 * é o nome acessível do item (`aria-label`) e o conteúdo da dica que aparece
 * abaixo do item no hover/foco.
 */
export interface HeaderMenuItem {
  /**
   * Identificador único do item dentro da faixa.
   * Usado como `key` do React e como referência do painel aberto.
   */
  key: string;

  /**
   * Rótulo textual do item (ex: 'Sair', 'Notificações', 'Iniciativas').
   *
   * Não é exibido em linha — vira o nome acessível (`aria-label`) do botão e o
   * texto da dica flutuante. É obrigatório porque o item só mostra um ícone, e
   * um botão apenas com ícone sem nome acessível é inacessível a leitores de tela.
   */
  label: string;

  /**
   * Nome do ícone do Material Symbols Rounded exibido no item (ex: 'exit_to_app',
   * 'dark_mode', 'notifications_active', 'apps').
   * Ignorado quando `text` é informado.
   */
  icon?: string;

  /**
   * Rótulo curto de texto exibido no lugar do ícone (ex: 'PT', 'EN').
   * Tem precedência sobre `icon`. Use no máximo 3 caracteres — o item tem 34px.
   */
  text?: string;

  /**
   * Marca o item como destrutivo, pintando-o com a paleta de perigo do DS.
   * É o estado do item de logoff ('Sair').
   * @default false
   */
  danger?: boolean;

  /**
   * Desabilita o item: ele não recebe foco pelas setas, não dispara `onClick`
   * e recebe `aria-disabled`.
   * @default false
   */
  disabled?: boolean;

  /**
   * Mantém o item no estado pressionado (fundo `brandnavy-800`), como no
   * variante `Menu=Iniciativas` do Figma.
   *
   * Quando o item declara `panel`, este estado é derivado automaticamente da
   * abertura do painel e esta prop é ignorada.
   * @default false
   */
  active?: boolean;

  /**
   * Conteúdo de um painel suspenso que abre abaixo da faixa quando o item é
   * acionado — os variantes `Menu=Iniciativas` e `Menu=Linguagem` do Figma.
   *
   * Quando presente, o clique alterna o painel em vez de fechar o menu, e o
   * item recebe `aria-haspopup="menu"` / `aria-expanded`.
   */
  panel?: React.ReactNode;

  /**
   * Callback acionado ao ativar o item (clique, Enter ou Espaço).
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Classes CSS adicionais para o item.
   */
  className?: string;
}

/**
 * Propriedades do componente HeaderMenu da Plataforma Unooria.
 *
 * O HeaderMenu é o menu recolhível do header: um gatilho fixo (por padrão o
 * avatar do usuário) que, ao ser acionado, revela uma faixa horizontal de ações
 * **expandindo da direita para a esquerda**, ancorada na borda direita do
 * gatilho. É onde vivem as ações de conta do usuário — inclusive o logoff.
 */
export interface HeaderMenuProps {
  /**
   * Ações exibidas na faixa, da esquerda para a direita.
   *
   * A ordem é a de leitura e a de navegação por setas. Como a faixa se abre da
   * direita para a esquerda, o **último** item é o que fica encostado no
   * gatilho — no Figma, é o `exit_to_app` (o 'Sair').
   */
  items: HeaderMenuItem[];

  /**
   * Conteúdo do gatilho. Recebe qualquer nó React, o que torna o gatilho
   * plugável (avatar, iniciais, logotipo, ícone).
   *
   * Omitido, o componente renderiza o `Avatar` do DS no tamanho `sm` (40px)
   * com a borda em gradiente Unooria, exatamente como o Figma — configurável
   * por `avatarSrc`, `avatarName` e `avatarAlt`.
   */
  children?: React.ReactNode;

  /**
   * URL da imagem do avatar do gatilho padrão.
   * Ignorado quando `children` é informado.
   */
  avatarSrc?: string;

  /**
   * Nome do usuário, usado pelo avatar padrão para gerar as iniciais quando
   * `avatarSrc` não é informado ou falha ao carregar.
   * Ignorado quando `children` é informado.
   */
  avatarName?: string;

  /**
   * Texto alternativo da imagem do avatar padrão.
   * Ignorado quando `children` é informado.
   */
  avatarAlt?: string;

  /**
   * Nome acessível do botão do gatilho (`aria-label`).
   * @default 'Menu da conta'
   */
  triggerLabel?: string;

  /**
   * Abre e fecha o menu de fora (modo controlado).
   * Informado, o componente não guarda estado próprio de abertura e depende de
   * `onOpenChange` para refletir a interação.
   */
  open?: boolean;

  /**
   * Estado inicial de abertura (modo não controlado).
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Callback disparado a cada mudança do estado de abertura, tanto no modo
   * controlado quanto no não controlado.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Fecha o menu ao acionar um item sem `panel`.
   * Desligue quando o item alterna um estado que o usuário quer ver refletido
   * sem reabrir o menu (ex: o alternador de tema claro/escuro).
   * @default true
   */
  closeOnSelect?: boolean;

  /**
   * Exibe a dica flutuante com o `label` abaixo do item no hover e no foco,
   * como no Figma. Desligada, o `label` continua sendo o nome acessível.
   * @default true
   */
  showTooltips?: boolean;

  /**
   * Tema visual do menu ('light' | 'dark').
   * @default 'light'
   */
  theme?: UnooriaTheme;

  /**
   * Classes CSS adicionais para o container do menu.
   */
  className?: string;

  /**
   * Estilos CSS inline adicionais para o container do menu.
   */
  style?: React.CSSProperties;

  /**
   * Identificador do container do menu. Quando omitido, um id estável é gerado
   * com `useId` para ligar o gatilho à faixa por `aria-controls`.
   */
  id?: string;
}
