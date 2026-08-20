import React from 'react';

/**
 * Propriedades da barra superior das telas de cromo.
 */
export interface TikNavBarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Título centralizado, em Proxima Nova Bold 17.
   */
  title?: React.ReactNode;

  /**
   * Exibe a seta de retorno à esquerda.
   * @default false
   */
  showBack?: boolean;

  /**
   * Rótulo acessível da seta de retorno.
   * @default 'Voltar'
   */
  backLabel?: string;

  /**
   * Acionado ao clicar na seta de retorno.
   */
  onBack?: () => void;

  /**
   * Conteúdo livre no canto esquerdo, usado quando a tela não tem retorno
   * (por exemplo, o ícone de adicionar conta do perfil).
   */
  leading?: React.ReactNode;

  /**
   * Conteúdo livre no canto direito (leitor de QR, menu, compartilhar).
   */
  trailing?: React.ReactNode;

  /**
   * Exibe a divisa de seleção ao lado do título, como nas telas "TikTok User"
   * e "All activity".
   * @default false
   */
  selectable?: boolean;

  /**
   * Aplica o fio inferior de 0,33px. As telas "Find friends" e "All activity"
   * não o têm; as demais, sim.
   * @default true
   */
  hairline?: boolean;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
