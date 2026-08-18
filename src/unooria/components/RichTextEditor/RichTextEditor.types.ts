import React from 'react';
import { UnooriaTheme } from '../../tokens';

export type RichTextParagraphStyle =
  | 'normal'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'ordered-list'
  | 'unordered-list'
  | 'checklist'
  | 'quote'
  | 'code-block';

export type RichTextFontFamily =
  | 'Open Sans'
  | 'Neo Sans Pro'
  | 'Roboto'
  | 'Arial'
  | 'Inter'
  | 'monospace';

export type RichTextAlign = 'left' | 'center' | 'right' | 'justify';

export type RichTextTransform =
  | 'uppercase'
  | 'lowercase'
  | 'capitalize'
  | 'sentence'
  | 'strikethrough'
  | 'highlight'
  | 'clear';

export interface RichTextToolbarConfig {
  history?: boolean;
  paragraphStyle?: boolean;
  fontFamily?: boolean;
  fontSize?: boolean;
  inlineStyles?: boolean;
  textColor?: boolean;
  highlightColor?: boolean;
  transformations?: boolean;
  media?: boolean;
  alignment?: boolean;
}

export interface RichTextEditorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onFocus' | 'onBlur'> {
  /**
   * Conteúdo HTML do editor (modo controlado).
   */
  value?: string;

  /**
   * Conteúdo HTML inicial (modo não-controlado).
   */
  defaultValue?: string;

  /**
   * Texto de orientação exibido quando o editor está vazio.
   * @default 'Comece a digitar seu texto aqui...'
   */
  placeholder?: string;

  /**
   * Rótulo descritivo do campo (ex: "Descrição da Atividade").
   */
  label?: React.ReactNode;

  /**
   * Texto de ajuda ou dica exibido abaixo do editor.
   */
  helperText?: React.ReactNode;

  /**
   * Mensagem de erro ou booleano para indicar estado de erro de validação.
   */
  error?: React.ReactNode;

  /**
   * Altura mínima da área de digitação em pixels ou CSS string.
   * @default '240px'
   */
  minHeight?: string | number;

  /**
   * Altura máxima da área de digitação com barra de rolagem interna suave.
   * @default '600px'
   */
  maxHeight?: string | number;

  /**
   * Se true, desativa a barra de ferramentas e torna o conteúdo apenas leitura.
   * @default false
   */
  readOnly?: boolean;

  /**
   * Se true, desativa todo o componente com opacidade reduzida.
   * @default false
   */
  disabled?: boolean;

  /**
   * Se true, exibe o contador de palavras no rodapé.
   * @default true
   */
  showWordCount?: boolean;

  /**
   * Se true, exibe o contador de caracteres no rodapé.
   * @default true
   */
  showCharCount?: boolean;

  /**
   * Limite máximo de caracteres permitidos.
   */
  maxLength?: number;

  /**
   * Configurações para habilitar ou ocultar grupos específicos da barra de ferramentas.
   */
  toolbarConfig?: RichTextToolbarConfig;

  /**
   * Tema visual (`light` ou `dark`).
   * @default 'light'
   */
  theme?: UnooriaTheme;

  /**
   * Callback disparado quando o conteúdo textual ou HTML é modificado.
   */
  onChange?: (html: string, plainText: string) => void;

  /**
   * Callback disparado quando o editor recebe foco.
   */
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;

  /**
   * Callback disparado quando o editor perde o foco.
   */
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;

  /**
   * Callback disparado quando o usuário clica no botão de inserir imagem.
   * Se fornecido, substitui o prompt padrão do navegador por um handler customizado.
   */
  onInsertImage?: (insertCallback: (url: string, alt?: string) => void) => void;
}
