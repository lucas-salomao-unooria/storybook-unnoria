import React from 'react';

/**
 * Propriedades do componente MediaViewer do WhatsApp Mobile.
 *
 * Extensão: o visualizador de mídia em tela cheia. O arquivo de origem não o
 * publica — o quadro "Picture sent" mostra a imagem só dentro do balão.
 */
export interface WaMediaViewerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Controla a visibilidade do visualizador.
   * @default true
   */
  open?: boolean;
  /**
   * Título da barra superior, como o nome de quem enviou. Vira o nome acessível
   * do visualizador.
   */
  title: React.ReactNode;
  /**
   * Linha abaixo do título, como o nome do arquivo.
   */
  subtitle?: React.ReactNode;
  /**
   * A mídia ampliada — uma imagem ou a mídia desenhada.
   */
  children: React.ReactNode;
  /**
   * Texto exibido abaixo da mídia, como a transcrição de um comunicado.
   */
  caption?: React.ReactNode;
  /**
   * Callback da seta de voltar e do ESC.
   */
  onClose?: () => void;
  /**
   * Nome acessível da seta de voltar.
   * @default 'Voltar'
   */
  backLabel?: string;
  /**
   * Classe CSS adicional.
   */
  className?: string;
}
