'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  RichTextParagraphStyle,
  RichTextFontFamily,
  RichTextAlign,
  RichTextTransform,
  RichTextToolbarConfig,
} from './RichTextEditor.types';
import { Icon } from '../Icon/Icon';

export interface RichTextEditorToolbarProps {
  onCommand: (command: string, value?: string) => void;
  onApplyStyle: (style: RichTextParagraphStyle) => void;
  onApplyFontFamily: (font: RichTextFontFamily) => void;
  onApplyFontSize: (delta: number) => void;
  onApplyTransform: (transform: RichTextTransform) => void;
  onApplyTextColor: (color: string) => void;
  onApplyHighlightColor: (color: string) => void;
  onInsertImageClick: () => void;
  onInsertLinkClick: () => void;
  currentStyle?: RichTextParagraphStyle;
  currentFontFamily?: RichTextFontFamily;
  currentFontSize?: number;
  currentAlign?: RichTextAlign;
  textColor?: string;
  highlightColor?: string;
  config?: RichTextToolbarConfig;
  disabled?: boolean;
}

// Paleta de 14 cores predefinidas extraída do Figma
const FIGMA_COLOR_SWATCHES = [
  '#000000',
  '#9B9B9B',
  '#FFFFFF',
  '#D0021B',
  '#FF6A6A',
  '#F5A623',
  '#F8E71C',
  '#8B572A',
  '#417505',
  '#7ED321',
  '#B8E986',
  '#50E3C2',
  '#4A90E2',
  '#8A38F5',
];

export const RichTextEditorToolbar: React.FC<RichTextEditorToolbarProps> = ({
  onCommand,
  onApplyStyle,
  onApplyFontFamily,
  onApplyFontSize,
  onApplyTransform,
  onApplyTextColor,
  onApplyHighlightColor,
  onInsertImageClick,
  onInsertLinkClick,
  currentStyle = 'normal',
  currentFontFamily = 'Open Sans',
  currentFontSize = 14,
  currentAlign = 'left',
  textColor = '#22272A',
  highlightColor = 'transparent',
  config = {},
  disabled = false,
}) => {
  // Estados para dropdowns abertos
  const [openDropdown, setOpenDropdown] = useState<
    'style' | 'font' | 'transform' | 'align' | 'textColor' | 'highlightColor' | null
  >(null);

  const [customHexTextColor, setCustomHexTextColor] = useState<string>('#7FA5E2');
  const [customHexHighlightColor, setCustomHexHighlightColor] = useState<string>('#F8E71C');

  const toolbarRef = useRef<HTMLDivElement>(null);

  // Fecha dropdowns ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolbarRef.current && !toolbarRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (
    name: 'style' | 'font' | 'transform' | 'align' | 'textColor' | 'highlightColor'
  ) => {
    if (disabled) return;
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const getStyleLabel = (style: RichTextParagraphStyle): string => {
    switch (style) {
      case 'h1':
        return 'Título 1';
      case 'h2':
        return 'Título 2';
      case 'h3':
        return 'Título 3';
      case 'ordered-list':
        return 'Lista numerada';
      case 'unordered-list':
        return 'Lista com marcadores';
      case 'checklist':
        return 'Lista de verificações';
      case 'quote':
        return 'Citar';
      case 'code-block':
        return 'Bloco de código';
      default:
        return 'Normal';
    }
  };

  const getAlignLabel = (align: RichTextAlign): string => {
    switch (align) {
      case 'center':
        return 'Centralizar';
      case 'right':
        return 'À direita';
      case 'justify':
        return 'Justificar';
      default:
        return 'À esquerda';
    }
  };

  return (
    <div ref={toolbarRef} className="unooria-rte__toolbar">
      {/* GRUPO 1: HISTÓRICO (Undo & Redo) */}
      {config.history !== false && (
        <div className="unooria-rte__toolbar-group">
          <button
            type="button"
            title="Desfazer (Ctrl+Z)"
            disabled={disabled}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onCommand('undo')}
            className="unooria-rte__btn"
          >
            <Icon name="replay" size="xs" color="currentColor" />
          </button>
          <button
            type="button"
            title="Refazer (Ctrl+Y)"
            disabled={disabled}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onCommand('redo')}
            className="unooria-rte__btn"
          >
            <Icon name="forward_media" size="xs" color="currentColor" />
          </button>
          <div className="unooria-rte__divider" />
        </div>
      )}

      {/* GRUPO 2: ESTILOS DE PARÁGRAFO (_Main Container Style) */}
      {config.paragraphStyle !== false && (
        <div className="unooria-rte__toolbar-group">
          <button
            type="button"
            disabled={disabled}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => toggleDropdown('style')}
            className="unooria-rte__btn"
          >
            <Icon name="notes" size="xs" color="currentColor" />
            <span>{getStyleLabel(currentStyle)}</span>
            <Icon name="keyboard_arrow_down" size="4xs" color="currentColor" />
          </button>

          {openDropdown === 'style' && (
            <div className="unooria-rte__dropdown">
              {[
                { id: 'normal', label: 'Normal', icon: 'notes' },
                { id: 'h1', label: 'Título 1', icon: 'format_h1' },
                { id: 'h2', label: 'Título 2', icon: 'format_h2' },
                { id: 'h3', label: 'Título 3', icon: 'format_h3' },
                { id: 'ordered-list', label: 'Lista numerada', icon: 'format_list_numbered' },
                { id: 'unordered-list', label: 'Lista com marcadores', icon: 'format_list_bulleted' },
                { id: 'checklist', label: 'Lista de verificações', icon: 'check_box' },
                { id: 'quote', label: 'Citar', icon: 'format_quote' },
                { id: 'code-block', label: 'Bloco de código', icon: 'code' },
              ].map((item) => (
                <div
                  key={item.id}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onApplyStyle(item.id as RichTextParagraphStyle);
                    setOpenDropdown(null);
                  }}
                  className="unooria-rte__dropdown-item"
                >
                  <div className="unooria-rte__dropdown-item-left">
                    <Icon name={item.icon} size="xs" color="currentColor" />
                    <span>{item.label}</span>
                  </div>
                  {currentStyle === item.id && <span>✓</span>}
                </div>
              ))}
            </div>
          )}
          <div className="unooria-rte__divider" />
        </div>
      )}

      {/* GRUPO 3: SELETOR DE FAMÍLIA TIPOGRÁFICA (_Font Selector) */}
      {config.fontFamily !== false && (
        <div className="unooria-rte__toolbar-group">
          <button
            type="button"
            disabled={disabled}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => toggleDropdown('font')}
            className="unooria-rte__btn"
          >
            <Icon name="title" size="xs" color="currentColor" />
            <span>{currentFontFamily}</span>
            <Icon name="keyboard_arrow_down" size="4xs" color="currentColor" />
          </button>

          {openDropdown === 'font' && (
            <div className="unooria-rte__dropdown">
              {[
                { id: 'Open Sans', label: 'Open Sans (Padrão)', font: 'Open Sans, sans-serif' },
                { id: 'Neo Sans Pro', label: 'Neo Sans Pro', font: 'Neo Sans Pro, sans-serif' },
                { id: 'Inter', label: 'Inter', font: 'Inter, sans-serif' },
                { id: 'Roboto', label: 'Roboto', font: 'Roboto, sans-serif' },
                { id: 'Arial', label: 'Arial', font: 'Arial, sans-serif' },
                { id: 'monospace', label: 'Código (Monospace)', font: 'Courier New, monospace' },
              ].map((item) => (
                <div
                  key={item.id}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onApplyFontFamily(item.id as RichTextFontFamily);
                    setOpenDropdown(null);
                  }}
                  className="unooria-rte__dropdown-item"
                  style={{ fontFamily: item.font }}
                >
                  <span>{item.label}</span>
                  {currentFontFamily === item.id && <span>✓</span>}
                </div>
              ))}
            </div>
          )}
          <div className="unooria-rte__divider" />
        </div>
      )}

      {/* GRUPO 4: CONTADOR DE TAMANHO DE FONTE (Number Button XS) */}
      {config.fontSize !== false && (
        <div className="unooria-rte__toolbar-group">
          <div className="unooria-rte__font-size-control">
            <button
              type="button"
              title="Diminuir tamanho da fonte"
              disabled={disabled || currentFontSize <= 8}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onApplyFontSize(-2)}
              className="unooria-rte__font-size-btn"
            >
              <Icon name="remove" size="4xs" color="currentColor" />
            </button>
            <span className="unooria-rte__font-size-display">{currentFontSize}</span>
            <button
              type="button"
              title="Aumentar tamanho da fonte"
              disabled={disabled || currentFontSize >= 72}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onApplyFontSize(2)}
              className="unooria-rte__font-size-btn"
            >
              <Icon name="add" size="4xs" color="currentColor" />
            </button>
          </div>
          <div className="unooria-rte__divider" />
        </div>
      )}

      {/* GRUPO 5: FORMATAÇÕES INLINE, CORES E TRANSFORMAÇÕES */}
      {config.inlineStyles !== false && (
        <div className="unooria-rte__toolbar-group">
          {/* Negrito (B) */}
          <button
            type="button"
            title="Negrito (Ctrl+B)"
            disabled={disabled}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onCommand('bold')}
            className="unooria-rte__btn"
          >
            <span className="unooria-rte__btn-icon-label" style={{ fontWeight: 800 }}>
              B
            </span>
          </button>

          {/* Itálico (I) */}
          <button
            type="button"
            title="Itálico (Ctrl+I)"
            disabled={disabled}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onCommand('italic')}
            className="unooria-rte__btn"
          >
            <span className="unooria-rte__btn-icon-label" style={{ fontStyle: 'italic', fontWeight: 600 }}>
              I
            </span>
          </button>

          {/* Sublinhado (U) */}
          <button
            type="button"
            title="Sublinhado (Ctrl+U)"
            disabled={disabled}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onCommand('underline')}
            className="unooria-rte__btn"
          >
            <span className="unooria-rte__btn-icon-label" style={{ textDecoration: 'underline' }}>
              U
            </span>
          </button>

          {/* Tachado (S) */}
          <button
            type="button"
            title="Tachado / Riscado"
            disabled={disabled}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onCommand('strikeThrough')}
            className="unooria-rte__btn"
          >
            <span className="unooria-rte__btn-icon-label" style={{ textDecoration: 'line-through' }}>
              S
            </span>
          </button>

          {/* Código Inline */}
          <button
            type="button"
            title="Código Inline"
            disabled={disabled}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onCommand('formatBlock', 'code')}
            className="unooria-rte__btn"
          >
            <Icon name="code" size="xs" color="currentColor" />
          </button>

          {/* Link */}
          <button
            type="button"
            title="Inserir Hiperlink"
            disabled={disabled}
            onMouseDown={(e) => e.preventDefault()}
            onClick={onInsertLinkClick}
            className="unooria-rte__btn"
          >
            <Icon name="link" size="xs" color="currentColor" />
          </button>

          {/* Seletor de Cor do Texto (_Color Picker Container) */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              title="Cor do Texto"
              disabled={disabled}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => toggleDropdown('textColor')}
              className="unooria-rte__btn"
              style={{ flexDirection: 'column', gap: '0px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                <Icon name="format_color_fill" size="xs" color="currentColor" />
                <span style={{ fontWeight: 700, fontSize: '12px' }}>A</span>
              </div>
              <div
                className="unooria-rte__color-indicator"
                style={{ backgroundColor: textColor || '#22272A' }}
              />
            </button>

            {openDropdown === 'textColor' && (
              <div className="unooria-rte__color-picker-popover">
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>
                  Cor do Texto
                </span>
                <div className="unooria-rte__color-grid">
                  {FIGMA_COLOR_SWATCHES.map((swatch) => (
                    <button
                      key={swatch}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        onApplyTextColor(swatch);
                        setOpenDropdown(null);
                      }}
                      className="unooria-rte__color-swatch"
                      style={{ backgroundColor: swatch }}
                    />
                  ))}
                </div>
                <div className="unooria-rte__color-custom-row">
                  <input
                    type="text"
                    value={customHexTextColor}
                    onChange={(e) => setCustomHexTextColor(e.target.value)}
                    className="unooria-rte__color-hex-input"
                    placeholder="#000000"
                  />
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      onApplyTextColor(customHexTextColor);
                      setOpenDropdown(null);
                    }}
                    className="unooria-rte__btn"
                    style={{ backgroundColor: '#0086FF', color: '#FFFFFF' }}
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Seletor de Cor de Destaque / Realce (_Color Picker Highlight) */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              title="Cor de Realce / Fundo"
              disabled={disabled}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => toggleDropdown('highlightColor')}
              className="unooria-rte__btn"
              style={{ flexDirection: 'column', gap: '0px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                <Icon name="format_color_fill" size="xs" color="currentColor" />
                <span style={{ fontWeight: 700, fontSize: '11px' }}>Aa</span>
              </div>
              <div
                className="unooria-rte__color-indicator"
                style={{ backgroundColor: highlightColor !== 'transparent' ? highlightColor : '#F8E71C' }}
              />
            </button>

            {openDropdown === 'highlightColor' && (
              <div className="unooria-rte__color-picker-popover">
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>
                  Cor de Realce
                </span>
                <div className="unooria-rte__color-grid">
                  {FIGMA_COLOR_SWATCHES.map((swatch) => (
                    <button
                      key={swatch}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        onApplyHighlightColor(swatch);
                        setOpenDropdown(null);
                      }}
                      className="unooria-rte__color-swatch"
                      style={{ backgroundColor: swatch }}
                    />
                  ))}
                </div>
                <div className="unooria-rte__color-custom-row">
                  <input
                    type="text"
                    value={customHexHighlightColor}
                    onChange={(e) => setCustomHexHighlightColor(e.target.value)}
                    className="unooria-rte__color-hex-input"
                    placeholder="#F8E71C"
                  />
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      onApplyHighlightColor(customHexHighlightColor);
                      setOpenDropdown(null);
                    }}
                    className="unooria-rte__btn"
                    style={{ backgroundColor: '#0086FF', color: '#FFFFFF' }}
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Transformações de Texto ("Aa") */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              title="Transformações de Texto"
              disabled={disabled}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => toggleDropdown('transform')}
              className="unooria-rte__btn"
            >
              <span style={{ fontWeight: 700 }}>Aa</span>
              <Icon name="keyboard_arrow_down" size="4xs" color="currentColor" />
            </button>

            {openDropdown === 'transform' && (
              <div className="unooria-rte__dropdown">
                {[
                  { id: 'lowercase', label: 'Minúsculas (abc)' },
                  { id: 'uppercase', label: 'MAIÚSCULAS (ABC)' },
                  { id: 'sentence', label: 'Primeira letra da frase maiúscula' },
                  { id: 'capitalize', label: 'Primeira Letra de Cada Palavra' },
                  { id: 'strikethrough', label: 'Tachado' },
                  { id: 'highlight', label: 'Destacar' },
                  { id: 'clear', label: 'Limpar Formatação' },
                ].map((item) => (
                  <div
                    key={item.id}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      onApplyTransform(item.id as RichTextTransform);
                      setOpenDropdown(null);
                    }}
                    className="unooria-rte__dropdown-item"
                  >
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="unooria-rte__divider" />
        </div>
      )}

      {/* GRUPO 6: INSERIR MÍDIA (Frame 42) */}
      {config.media !== false && (
        <div className="unooria-rte__toolbar-group">
          <button
            type="button"
            title="Inserir Imagem"
            disabled={disabled}
            onMouseDown={(e) => e.preventDefault()}
            onClick={onInsertImageClick}
            className="unooria-rte__btn"
          >
            <Icon name="add_photo_alternate" size="xs" color="currentColor" />
            <span>Imagem</span>
            <Icon name="image_search" size="4xs" color="currentColor" />
          </button>
          <div className="unooria-rte__divider" />
        </div>
      )}

      {/* GRUPO 7: ALINHAMENTO E RECUO (_Main Container Alignment) */}
      {config.alignment !== false && (
        <div className="unooria-rte__toolbar-group">
          <button
            type="button"
            title="Alinhamento e Recuo"
            disabled={disabled}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => toggleDropdown('align')}
            className="unooria-rte__btn"
          >
            <Icon
              name={
                currentAlign === 'center'
                  ? 'format_align_center'
                  : currentAlign === 'right'
                  ? 'format_align_right'
                  : currentAlign === 'justify'
                  ? 'format_align_justify'
                  : 'format_align_left'
              }
              size="xs"
              color="currentColor"
            />
            <span>{getAlignLabel(currentAlign)}</span>
            <Icon name="keyboard_arrow_down" size="4xs" color="currentColor" />
          </button>

          {openDropdown === 'align' && (
            <div className="unooria-rte__dropdown">
              {[
                { id: 'left', label: 'À esquerda', icon: 'format_align_left' },
                { id: 'center', label: 'Centralizar', icon: 'format_align_center' },
                { id: 'right', label: 'À direita', icon: 'format_align_right' },
                { id: 'justify', label: 'Justificar', icon: 'format_align_justify' },
              ].map((item) => (
                <div
                  key={item.id}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onCommand(
                      item.id === 'center'
                        ? 'justifyCenter'
                        : item.id === 'right'
                        ? 'justifyRight'
                        : item.id === 'justify'
                        ? 'justifyFull'
                        : 'justifyLeft'
                    );
                    setOpenDropdown(null);
                  }}
                  className="unooria-rte__dropdown-item"
                >
                  <div className="unooria-rte__dropdown-item-left">
                    <Icon name={item.icon} size="xs" color="currentColor" />
                    <span>{item.label}</span>
                  </div>
                  {currentAlign === item.id && <span>✓</span>}
                </div>
              ))}

              <div style={{ height: '1px', backgroundColor: '#E2E8F0', margin: '4px 0' }} />

              <div
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onCommand('indent');
                  setOpenDropdown(null);
                }}
                className="unooria-rte__dropdown-item"
              >
                <div className="unooria-rte__dropdown-item-left">
                  <Icon name="format_indent_increase" size="xs" color="currentColor" />
                  <span>Recuar (Aumentar)</span>
                </div>
              </div>

              <div
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onCommand('outdent');
                  setOpenDropdown(null);
                }}
                className="unooria-rte__dropdown-item"
              >
                <div className="unooria-rte__dropdown-item-left">
                  <Icon name="format_indent_decrease" size="xs" color="currentColor" />
                  <span>Diminuir recuo</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RichTextEditorToolbar;
