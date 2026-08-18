import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  useCallback,
} from 'react';
import {
  RichTextEditorProps,
  RichTextParagraphStyle,
  RichTextFontFamily,
  RichTextAlign,
  RichTextTransform,
} from './RichTextEditor.types';
import { RichTextEditorToolbar } from './RichTextEditorToolbar';
import './RichTextEditor.css';

/**
 * Componente oficial de Editor de Texto (Rich Text Editor) do Unooria Design System.
 * Plataforma Unooria - Extraído do Figma (Node 18577:27000 / 18536:24047)
 */
export const RichTextEditor = forwardRef<HTMLDivElement, RichTextEditorProps>(
  (
    {
      value,
      defaultValue = '',
      placeholder = 'Comece a digitar seu texto aqui...',
      label,
      helperText,
      error,
      minHeight = '240px',
      maxHeight = '600px',
      readOnly = false,
      disabled = false,
      showWordCount = true,
      showCharCount = true,
      maxLength,
      toolbarConfig,
      theme = 'light',
      onChange,
      onFocus,
      onBlur,
      onInsertImage,
      className = '',
      style,
      ...rest
    },
    ref
  ) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const savedRangeRef = useRef<Range | null>(null);

    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [wordCount, setWordCount] = useState<number>(0);
    const [charCount, setCharCount] = useState<number>(0);

    // Estados da barra de ferramentas
    const [currentStyle, setCurrentStyle] = useState<RichTextParagraphStyle>('normal');
    const [currentFontFamily, setCurrentFontFamily] = useState<RichTextFontFamily>('Open Sans');
    const [currentFontSize, setCurrentFontSize] = useState<number>(14);
    const [currentAlign, setCurrentAlign] = useState<RichTextAlign>('left');
    const [textColor, setTextColor] = useState<string>('#22272A');
    const [highlightColor, setHighlightColor] = useState<string>('transparent');

    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    // Salva a seleção ativa dentro da área do editor
    const saveSelection = useCallback(() => {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0 && editorRef.current) {
        const range = sel.getRangeAt(0);
        if (editorRef.current.contains(range.commonAncestorContainer)) {
          savedRangeRef.current = range.cloneRange();
        }
      }
    }, []);

    // Restaura a seleção previamente salva
    const restoreSelection = useCallback(() => {
      if (savedRangeRef.current && editorRef.current) {
        const sel = window.getSelection();
        if (sel) {
          sel.removeAllRanges();
          sel.addRange(savedRangeRef.current);
        }
      }
    }, []);

    const updateCounters = useCallback(() => {
      if (!editorRef.current) return;
      const text = editorRef.current.innerText || '';
      const chars = text.replace(/\n/g, '').length;
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      setCharCount(chars);
      setWordCount(words);
    }, []);

    const handleInput = useCallback(() => {
      if (!editorRef.current) return;
      const html = editorRef.current.innerHTML;
      const text = editorRef.current.innerText || '';
      updateCounters();
      onChange?.(html, text);
    }, [onChange, updateCounters]);

    // Inicializa conteúdo
    useEffect(() => {
      if (editorRef.current) {
        const initialHtml = value !== undefined ? value : defaultValue;
        if (editorRef.current.innerHTML !== initialHtml) {
          editorRef.current.innerHTML = initialHtml;
          updateCounters();
        }
      }
    }, [value, defaultValue, updateCounters]);

    // Executa comandos de formatação com garantia de foco e seleção
    const executeCommand = useCallback(
      (command: string, val: string = '') => {
        if (disabled || readOnly) return;
        if (editorRef.current) {
          editorRef.current.focus();
        }
        restoreSelection();

        try {
          document.execCommand('styleWithCSS', false, 'true');
        } catch {}

        document.execCommand(command, false, val);
        saveSelection();
        handleInput();
      },
      [disabled, readOnly, restoreSelection, saveSelection, handleInput]
    );

    // Aplicação de estilos de parágrafo (H1, H2, H3, etc.)
    const handleApplyStyle = (styleType: RichTextParagraphStyle) => {
      setCurrentStyle(styleType);
      switch (styleType) {
        case 'h1':
          executeCommand('formatBlock', '<h1>');
          break;
        case 'h2':
          executeCommand('formatBlock', '<h2>');
          break;
        case 'h3':
          executeCommand('formatBlock', '<h3>');
          break;
        case 'ordered-list':
          executeCommand('insertOrderedList');
          break;
        case 'unordered-list':
          executeCommand('insertUnorderedList');
          break;
        case 'quote':
          executeCommand('formatBlock', '<blockquote>');
          break;
        case 'code-block':
          executeCommand('formatBlock', '<pre>');
          break;
        case 'checklist':
          executeCommand('insertHTML', '<div><input type="checkbox" /> Nova tarefa</div>');
          break;
        default:
          executeCommand('formatBlock', '<p>');
          break;
      }
    };

    // Aplica estilo inline apenas ao trecho selecionado ou no ponto de inserção atual (nova linha)
    const applyInlineStyleAtSelection = (
      styleProp: 'fontFamily' | 'fontSize' | 'color' | 'backgroundColor',
      styleValue: string,
      execCmd?: { command: string; value: string }
    ) => {
      if (disabled || readOnly) return;
      if (editorRef.current) {
        editorRef.current.focus();
      }
      restoreSelection();

      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);

        if (!selection.isCollapsed) {
          // Trecho selecionado: formata apenas o texto selecionado
          if (execCmd) {
            try {
              document.execCommand('styleWithCSS', false, 'true');
              document.execCommand(execCmd.command, false, execCmd.value);
            } catch {}
          }
          const contents = range.extractContents();
          const span = document.createElement('span');
          span.style[styleProp] = styleValue;
          span.appendChild(contents);
          range.insertNode(span);

          const newRange = document.createRange();
          newRange.selectNodeContents(span);
          selection.removeAllRanges();
          selection.addRange(newRange);
        } else {
          // Cursor colapsado (ex: nova linha): insere span com zero-width space e posiciona o cursor dentro
          const span = document.createElement('span');
          span.style[styleProp] = styleValue;
          const textNode = document.createTextNode('\u200B');
          span.appendChild(textNode);
          range.insertNode(span);

          const newRange = document.createRange();
          newRange.setStart(textNode, 1);
          newRange.collapse(true);
          selection.removeAllRanges();
          selection.addRange(newRange);
        }
      }
      saveSelection();
      handleInput();
    };

    // Aplicação robusta de Família de Fonte
    const handleApplyFontFamily = (font: RichTextFontFamily) => {
      setCurrentFontFamily(font);
      applyInlineStyleAtSelection('fontFamily', font, {
        command: 'fontName',
        value: font,
      });
    };

    // Aplicação robusta de Tamanho de Fonte
    const handleApplyFontSize = (delta: number) => {
      const newSize = Math.max(8, Math.min(72, currentFontSize + delta));
      setCurrentFontSize(newSize);
      applyInlineStyleAtSelection('fontSize', `${newSize}px`);
    };

    // Aplicação de Cor do Texto
    const handleApplyTextColor = (color: string) => {
      setTextColor(color);
      applyInlineStyleAtSelection('color', color, {
        command: 'foreColor',
        value: color,
      });
    };

    // Aplicação de Cor de Realce
    const handleApplyHighlightColor = (color: string) => {
      setHighlightColor(color);
      applyInlineStyleAtSelection('backgroundColor', color, {
        command: 'hiliteColor',
        value: color,
      });
    };

    // Transformações de Texto (Maiúsculas, Minúsculas, etc.)
    const handleApplyTransform = (transform: RichTextTransform) => {
      if (disabled || readOnly) return;
      if (editorRef.current) {
        editorRef.current.focus();
      }
      restoreSelection();

      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
      const selectedText = selection.toString();
      if (!selectedText) return;

      let transformed = selectedText;
      switch (transform) {
        case 'uppercase':
          transformed = selectedText.toUpperCase();
          break;
        case 'lowercase':
          transformed = selectedText.toLowerCase();
          break;
        case 'capitalize':
          transformed = selectedText.replace(/\b\w/g, (c) => c.toUpperCase());
          break;
        case 'sentence':
          transformed = selectedText.charAt(0).toUpperCase() + selectedText.slice(1).toLowerCase();
          break;
        case 'strikethrough':
          executeCommand('strikeThrough');
          return;
        case 'highlight':
          handleApplyHighlightColor('#F8E71C');
          return;
        case 'clear':
          executeCommand('removeFormat');
          return;
      }

      executeCommand('insertText', transformed);
    };

    const handleInsertImage = () => {
      if (onInsertImage) {
        onInsertImage((url, alt) => {
          if (url) {
            executeCommand('insertHTML', `<img src="${url}" alt="${alt || 'Imagem'}" />`);
          }
        });
      } else {
        const url = window.prompt('Insira a URL da imagem:');
        if (url) {
          executeCommand('insertImage', url);
        }
      }
    };

    const handleInsertLink = () => {
      const url = window.prompt('Insira o endereço do link (URL):', 'https://');
      if (url && url !== 'https://') {
        executeCommand('createLink', url);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        if (e.shiftKey) {
          executeCommand('outdent');
        } else {
          executeCommand('indent');
        }
      }
    };

    const isDark = theme === 'dark';
    const hasError = Boolean(error);

    return (
      <div
        ref={containerRef}
        className={`unooria-rte-wrapper ${
          isDark ? 'unooria-rte-wrapper--theme-dark' : ''
        } ${className}`.trim()}
        style={style}
        {...rest}
      >
        {/* Rótulo do Campo */}
        {label && <label className="unooria-rte-label">{label}</label>}

        {/* Caixa do Editor */}
        <div
          className={`unooria-rte ${isFocused ? 'unooria-rte--focused' : ''} ${
            hasError ? 'unooria-rte--error' : ''
          } ${disabled ? 'unooria-rte--disabled' : ''} ${
            isDark ? 'unooria-rte--theme-dark' : ''
          }`}
        >
          {/* Barra de Ferramentas */}
          {!readOnly && (
            <RichTextEditorToolbar
              onCommand={executeCommand}
              onApplyStyle={handleApplyStyle}
              onApplyFontFamily={handleApplyFontFamily}
              onApplyFontSize={handleApplyFontSize}
              onApplyTransform={handleApplyTransform}
              onApplyTextColor={handleApplyTextColor}
              onApplyHighlightColor={handleApplyHighlightColor}
              onInsertImageClick={handleInsertImage}
              onInsertLinkClick={handleInsertLink}
              currentStyle={currentStyle}
              currentFontFamily={currentFontFamily}
              currentFontSize={currentFontSize}
              currentAlign={currentAlign}
              textColor={textColor}
              highlightColor={highlightColor}
              config={toolbarConfig}
              disabled={disabled}
            />
          )}

          {/* Área de Digitação WYSIWYG */}
          <div
            ref={editorRef}
            contentEditable={!readOnly && !disabled}
            data-placeholder={placeholder}
            role="textbox"
            aria-multiline="true"
            aria-label={typeof label === 'string' ? label : 'Editor de Texto'}
            onInput={handleInput}
            onMouseUp={saveSelection}
            onKeyUp={saveSelection}
            onSelect={saveSelection}
            onFocus={(e) => {
              setIsFocused(true);
              saveSelection();
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              saveSelection();
              onBlur?.(e);
            }}
            onKeyDown={handleKeyDown}
            className="unooria-rte__body"
            style={{
              minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
              maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
            }}
          />

          {/* Rodapé com Contadores de Palavras e Caracteres */}
          {(showWordCount || showCharCount) && (
            <div className="unooria-rte__footer">
              <span style={{ fontStyle: 'italic' }}>
                {readOnly ? 'Modo de visualização' : 'Pressione Tab para indentar e Shift+Tab para recuar'}
              </span>
              <div className="unooria-rte__counters">
                {showWordCount && <span>{wordCount} palavras</span>}
                {showCharCount && (
                  <span>
                    {charCount}
                    {maxLength ? ` / ${maxLength}` : ''} caracteres
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mensagem de Ajuda ou Erro */}
        {hasError ? (
          <span className="unooria-rte-error-msg">{error}</span>
        ) : helperText ? (
          <span className="unooria-rte-helper">{helperText}</span>
        ) : null}
      </div>
    );
  }
);

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;
