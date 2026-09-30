import React from 'react';
import type { UglEditState, UglMediaItem } from '../../media';
import type { UglTheme } from '../../tokens';

/**
 * Ferramentas do editor, na ordem das abas.
 * - 'crop': girar, espelhar, endireitar e proporção
 * - 'adjust': exposição, brilho, contraste, saturação, temperatura, sombras e vinheta
 * - 'filters': filtros predefinidos e intensidade
 */
export type UglPhotoEditorTool = 'crop' | 'adjust' | 'filters';

/**
 * Propriedades do componente PhotoEditor da Unoogaleria.
 */
export interface UglPhotoEditorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'children'> {
  /**
   * Foto editada. A mídia original nunca é reescrita: o editor só produz um
   * `UglEditState`. Para editar outra foto, remonte o editor (`key={item.id}`).
   */
  item: UglMediaItem;

  /**
   * Edição controlada. Com ela, o editor só pede a troca por `onChange`.
   */
  value?: UglEditState;

  /**
   * Edição inicial em modo não controlado.
   * @default item.edit ?? uglDefaultEdit
   */
  defaultValue?: UglEditState;

  /**
   * Chamado a cada mudança da edição (inclusive Desfazer e Reverter).
   */
  onChange?: (edit: UglEditState) => void;

  /**
   * Sair sem salvar. Com alterações não salvas, o editor pergunta antes.
   */
  onCancel: () => void;

  /**
   * "Concluído": entrega a edição final.
   */
  onSave: (edit: UglEditState) => void;

  /**
   * Aba aberta ao montar.
   * @default 'adjust'
   */
  initialTool?: UglPhotoEditorTool;

  /**
   * Momento de referência para o rótulo do dia ("Hoje", "Ontem").
   */
  now?: Date | string;

  /**
   * Fuso de leitura da data.
   * @default 'America/Sao_Paulo'
   */
  timeZone?: string;

  /**
   * Força o tema visual. A superfície do editor é imersiva e invariante; o tema
   * só alcança o que for herdado.
   */
  theme?: UglTheme;
}
