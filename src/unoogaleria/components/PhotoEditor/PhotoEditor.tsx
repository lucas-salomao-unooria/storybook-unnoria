'use client';

import React from 'react';
import { Button } from '../Button';
import { FilterPicker } from '../FilterPicker';
import { Icon } from '../Icon';
import type { UglIconName } from '../Icon';
import { IconButton } from '../IconButton';
import { Slider } from '../Slider';
import { useControllableState, useModalFocus } from '../../hooks';
import {
  uglDefaultEdit,
  uglEditToFilter,
  uglEditToTransform,
  uglEditedRatio,
  uglFormatDayLabel,
  uglFormatTime,
  uglIsEdited,
  uglVignetteOpacity,
} from '../../media';
import type { UglAdjustmentKey, UglAspectRatio, UglEditState } from '../../media';
import type { UglPhotoEditorProps, UglPhotoEditorTool } from './PhotoEditor.types';
import './PhotoEditor.css';

/** Abas de ferramenta, na ordem em que aparecem. */
const TOOLS: readonly { id: UglPhotoEditorTool; label: string; icon: UglIconName }[] = [
  { id: 'crop', label: 'Cortar', icon: 'cropRotate' },
  { id: 'adjust', label: 'Ajustar', icon: 'adjust' },
  { id: 'filters', label: 'Filtros', icon: 'filters' },
];

/** Ajustes finos. Todos vão de -100 a 100 com origem 0, exceto a vinheta. */
const ADJUSTMENTS: readonly {
  key: UglAdjustmentKey;
  label: string;
  icon: UglIconName;
  min: number;
}[] = [
  { key: 'exposure', label: 'Exposição', icon: 'exposure', min: -100 },
  { key: 'brightness', label: 'Brilho', icon: 'brightness', min: -100 },
  { key: 'contrast', label: 'Contraste', icon: 'contrast', min: -100 },
  { key: 'saturation', label: 'Saturação', icon: 'saturation', min: -100 },
  { key: 'warmth', label: 'Temperatura', icon: 'warmth', min: -100 },
  { key: 'shadows', label: 'Sombras', icon: 'shadows', min: -100 },
  { key: 'vignette', label: 'Vinheta', icon: 'vignette', min: 0 },
];

/** Proporções de corte. `spoken` é o nome lido pelo leitor de tela. */
const ASPECTS: readonly { id: UglAspectRatio; label: string; spoken?: string }[] = [
  { id: 'original', label: 'Original' },
  { id: 'free', label: 'Livre' },
  { id: '1:1', label: '1:1', spoken: 'Quadrado, 1 por 1' },
  { id: '4:5', label: '4:5', spoken: '4 por 5' },
  { id: '3:2', label: '3:2', spoken: '3 por 2' },
  { id: '4:3', label: '4:3', spoken: '4 por 3' },
  { id: '16:9', label: '16:9', spoken: '16 por 9' },
  { id: '9:16', label: '9:16', spoken: '9 por 16' },
];

/** Passos guardados pelo Desfazer. */
const HISTORY_LIMIT = 50;

const ADJUSTMENT_KEYS = ADJUSTMENTS.map((definition) => definition.key);

/** Duas edições são iguais campo a campo? */
const sameEdit = (a: UglEditState, b: UglEditState) =>
  a.rotation === b.rotation &&
  a.flipX === b.flipX &&
  a.straighten === b.straighten &&
  a.aspect === b.aspect &&
  a.filter === b.filter &&
  a.filterIntensity === b.filterIntensity &&
  ADJUSTMENT_KEYS.every((key) => a.adjustments[key] === b.adjustments[key]);

const formatDegrees = (value: number) =>
  value === 0 ? '0°' : `${value > 0 ? '+' : '−'}${Math.abs(value)}°`;

/**
 * Índice seguinte num grupo de foco móvel. `vertical` inclui as setas para
 * cima e para baixo (grupos de rádio); as abas só andam na horizontal.
 */
const rovingIndex = (key: string, index: number, length: number, vertical: boolean) => {
  const last = length - 1;
  if (key === 'ArrowRight' || (vertical && key === 'ArrowDown')) return index >= last ? 0 : index + 1;
  if (key === 'ArrowLeft' || (vertical && key === 'ArrowUp')) return index <= 0 ? last : index - 1;
  if (key === 'Home') return 0;
  if (key === 'End') return last;
  return null;
};

/**
 * Componente PhotoEditor — Design System Unoogaleria
 *
 * Editor de fotos da galeria, em tela cheia, sobre a superfície imersiva
 * (`data-ugl-immersive`: o cromo do aparelho clareia sozinho). É uma camada
 * modal — `role="dialog"`, foco preso, Esc cancela — posicionada no contêiner, e
 * não na janela.
 *
 * - **Não destrutivo.** O editor não toca na foto: produz um `UglEditState`, que
 *   a galeria aplica na exibição. A pré-visualização usa os mesmos utilitários
 *   da grade e do visualizador (`uglEditToFilter`, `uglEditToTransform`,
 *   `uglVignetteOpacity`, `uglEditedRatio`), então o que se vê aqui é o que a
 *   miniatura mostra depois.
 * - **Três ferramentas.** Cortar (girar 90°, espelhar, endireitar e
 *   proporção), Ajustar (sete ajustes finos, cada um com um ponto quando
 *   alterado) e Filtros (oito predefinidos e a intensidade).
 * - **Histórico.** Desfazer volta um passo — um gesto inteiro do deslizador é um
 *   passo só —, Reverter volta à foto original (e também pode ser desfeito), e
 *   Comparar mostra o original enquanto é mantido pressionado, por ponteiro ou
 *   com Espaço.
 * - **Cancelar com cuidado.** Com alterações não salvas, "Cancelar" (e o Esc)
 *   pergunta antes, num alerta local.
 *
 * Client Component: guarda estado, histórico e foco.
 */
export const PhotoEditor = React.forwardRef<HTMLDivElement, UglPhotoEditorProps>(
  (
    {
      item,
      value,
      defaultValue,
      onChange,
      onCancel,
      onSave,
      initialTool = 'adjust',
      now,
      timeZone,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const baseId = `ugl-photo-editor-${React.useId()}`;
    const titleId = `${baseId}-title`;
    const panelId = `${baseId}-panel`;
    const changedId = `${baseId}-changed`;
    const confirmTitleId = `${baseId}-confirm-title`;
    const confirmDescriptionId = `${baseId}-confirm-description`;
    const tabId = (tool: UglPhotoEditorTool) => `${baseId}-tab-${tool}`;

    /* A edição com que o editor abriu: "alterado" é diferente dela. */
    const [baseline] = React.useState<UglEditState>(
      () => value ?? defaultValue ?? item.edit ?? uglDefaultEdit
    );
    const [edit, setEdit] = useControllableState<UglEditState>({
      value,
      defaultValue: baseline,
      onChange,
    });

    const [past, setPast] = React.useState<UglEditState[]>([]);
    const [tool, setTool] = React.useState<UglPhotoEditorTool>(initialTool);
    const [adjustment, setAdjustment] = React.useState<UglAdjustmentKey>('exposure');
    const [comparing, setComparing] = React.useState(false);
    const [confirmOpen, setConfirmOpen] = React.useState(false);

    /* Um gesto contínuo (arrastar, tecla mantida) aberto: grava um passo só. */
    const gestureRef = React.useRef(false);
    const panelRef = React.useRef<HTMLDivElement | null>(null);
    const confirmRef = React.useRef<HTMLDivElement | null>(null);
    const keepEditingRef = React.useRef<HTMLButtonElement | null>(null);

    const dirty = !sameEdit(edit, baseline);
    const edited = uglIsEdited(edit);

    /* ------------------------------------------------------------ Edição */

    const apply = (next: UglEditState, continuous = false) => {
      if (sameEdit(next, edit)) return;
      if (!continuous || !gestureRef.current) {
        setPast((history) => [...history, edit].slice(-HISTORY_LIMIT));
      }
      gestureRef.current = continuous;
      setEdit(next);
    };

    const endGesture = () => {
      gestureRef.current = false;
    };

    const undo = () => {
      const previous = past[past.length - 1];
      if (!previous) return;
      gestureRef.current = false;
      setPast((history) => history.slice(0, -1));
      setEdit(previous);
    };

    const revert = () => apply(uglDefaultEdit);

    const setAdjustmentValue = (key: UglAdjustmentKey, next: number) =>
      apply({ ...edit, adjustments: { ...edit.adjustments, [key]: next } }, true);

    /* ---------------------------------------------------- Cancelar e sair */

    const requestCancel = () => {
      if (dirty) setConfirmOpen(true);
      else onCancel();
    };

    const discard = () => {
      setConfirmOpen(false);
      onCancel();
    };

    useModalFocus(panelRef, true, requestCancel);
    useModalFocus(confirmRef, confirmOpen, () => setConfirmOpen(false), keepEditingRef);

    /* ------------------------------------------------------------ Comparar */

    const stopCompare = () => setComparing(false);

    const handleComparePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {
        /* Ponteiro sintético ou já liberado: a comparação segue sem captura. */
      }
      setComparing(true);
    };

    const handleCompareKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key !== ' ') return;
      event.preventDefault();
      if (!event.repeat) setComparing(true);
    };

    const handleCompareKeyUp = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key !== ' ') return;
      event.preventDefault();
      stopCompare();
    };

    /* ------------------------------------------------------ Foco móvel */

    const focusIn = (selector: string) =>
      panelRef.current?.querySelector<HTMLElement>(selector)?.focus();

    const handleTabsKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const ids = TOOLS.map((entry) => entry.id);
      const next = rovingIndex(event.key, ids.indexOf(tool), ids.length, false);
      if (next === null) return;
      event.preventDefault();
      setTool(ids[next]);
      focusIn(`[data-ugl-tool="${ids[next]}"]`);
    };

    const handleAspectKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const ids = ASPECTS.map((entry) => entry.id);
      const next = rovingIndex(event.key, ids.indexOf(edit.aspect), ids.length, true);
      if (next === null) return;
      event.preventDefault();
      apply({ ...edit, aspect: ids[next] });
      focusIn(`[data-ugl-aspect="${ids[next]}"]`);
    };

    const handleAdjustmentKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const next = rovingIndex(
        event.key,
        ADJUSTMENT_KEYS.indexOf(adjustment),
        ADJUSTMENT_KEYS.length,
        true
      );
      if (next === null) return;
      event.preventDefault();
      setAdjustment(ADJUSTMENT_KEYS[next]);
      focusIn(`[data-ugl-adjustment="${ADJUSTMENT_KEYS[next]}"]`);
    };

    /* ------------------------------------------------- Pré-visualização */

    const shown = comparing ? uglDefaultEdit : edit;
    const ratio = uglEditedRatio(item, shown);
    const imageRatio = item.width / item.height;
    const turned = shown.rotation % 180 !== 0;
    const turnedRatio = turned ? 1 / imageRatio : imageRatio;
    /*
     * A caixa da imagem cobre o quadro depois de girada. Em frações do quadro:
     * primeiro a caixa já girada (dw × dh), depois a caixa antes do giro, que é
     * a que recebe `width` e `height` — trocando os eixos quando o giro é de 90°.
     */
    const [displayWidth, displayHeight] =
      turnedRatio > ratio ? [turnedRatio / ratio, 1] : [1, ratio / turnedRatio];
    const boxWidth = (turned ? displayHeight / ratio : displayWidth) * 100;
    const boxHeight = (turned ? displayWidth * ratio : displayHeight) * 100;
    const transform = uglEditToTransform(shown, ratio);
    const filter = uglEditToFilter(shown);
    const vignette = uglVignetteOpacity(shown);

    const subtitle = `${uglFormatDayLabel(item.takenAt, { now, timeZone })} · ${uglFormatTime(
      item.takenAt,
      timeZone
    )}`;

    const activeAdjustment =
      ADJUSTMENTS.find((definition) => definition.key === adjustment) ?? ADJUSTMENTS[0];

    const classes = ['ugl-photo-editor', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} data-ugl-immersive="" data-ugl-theme={theme} className={classes} {...restProps}>
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="ugl-photo-editor__panel"
        >
          {/* ------------------------------------------------ Barra superior */}
          <div className="ugl-photo-editor__bar">
            <button type="button" className="ugl-photo-editor__text-button" onClick={requestCancel}>
              Cancelar
            </button>
            <div className="ugl-photo-editor__heading">
              <h2 id={titleId} className="ugl-photo-editor__title">
                Editar
              </h2>
              <p className="ugl-photo-editor__subtitle">{subtitle}</p>
            </div>
            <button
              type="button"
              className="ugl-photo-editor__text-button ugl-photo-editor__text-button--done"
              onClick={() => onSave(edit)}
            >
              Concluído
            </button>
          </div>

          {/* ------------------------------------------------ Histórico */}
          <div className="ugl-photo-editor__actions" role="group" aria-label="Histórico da edição">
            <IconButton
              variant="bar"
              icon="undo"
              label="Desfazer"
              disabled={past.length === 0}
              onClick={undo}
            />
            <IconButton
              variant="bar"
              icon="compare"
              label="Comparar com o original"
              pressed={comparing}
              pressedTone="accent"
              disabled={!edited}
              onPointerDown={handleComparePointerDown}
              onPointerUp={stopCompare}
              onPointerCancel={stopCompare}
              onLostPointerCapture={stopCompare}
              onKeyDown={handleCompareKeyDown}
              onKeyUp={handleCompareKeyUp}
              onBlur={stopCompare}
              onContextMenu={(event) => event.preventDefault()}
            />
            <IconButton
              variant="bar"
              icon="history"
              label="Reverter"
              disabled={!edited}
              onClick={revert}
            />
          </div>

          {/* ------------------------------------------------ Pré-visualização */}
          <div className="ugl-photo-editor__stage">
            <div
              className="ugl-photo-editor__frame"
              style={{ '--ugl-photo-editor-ratio': ratio } as React.CSSProperties}
            >
              <div className="ugl-photo-editor__viewport">
                <div
                  className="ugl-photo-editor__canvas"
                  style={{
                    width: `${boxWidth}%`,
                    height: `${boxHeight}%`,
                    transform: `translate(-50%, -50%)${transform === 'none' ? '' : ` ${transform}`}`,
                  }}
                >
                  <img
                    className="ugl-photo-editor__image"
                    src={item.src}
                    alt={item.alt}
                    draggable={false}
                    decoding="async"
                    style={{ filter }}
                  />
                </div>
                {vignette > 0 && (
                  <span
                    className="ugl-photo-editor__vignette"
                    style={{ opacity: vignette }}
                    aria-hidden="true"
                  />
                )}
              </div>

              {tool === 'crop' && !comparing && (
                <span className="ugl-photo-editor__crop" aria-hidden="true">
                  <span className="ugl-photo-editor__grid ugl-photo-editor__grid--v1" />
                  <span className="ugl-photo-editor__grid ugl-photo-editor__grid--v2" />
                  <span className="ugl-photo-editor__grid ugl-photo-editor__grid--h1" />
                  <span className="ugl-photo-editor__grid ugl-photo-editor__grid--h2" />
                  <span className="ugl-photo-editor__corner ugl-photo-editor__corner--tl" />
                  <span className="ugl-photo-editor__corner ugl-photo-editor__corner--tr" />
                  <span className="ugl-photo-editor__corner ugl-photo-editor__corner--bl" />
                  <span className="ugl-photo-editor__corner ugl-photo-editor__corner--br" />
                </span>
              )}

              <span
                role="status"
                className={[
                  'ugl-photo-editor__badge',
                  comparing ? 'ugl-photo-editor__badge--visible' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {comparing ? 'Original' : ''}
              </span>
            </div>
          </div>

          {/* ------------------------------------------------ Ferramentas */}
          <div className="ugl-photo-editor__tools">
            <div
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId(tool)}
              className="ugl-photo-editor__tool-panel"
            >
              {tool === 'crop' && (
                <>
                  <div className="ugl-photo-editor__row">
                    <Button
                      variant="immersive"
                      size="sm"
                      iconStart="rotate"
                      onClick={() =>
                        apply({ ...edit, rotation: ((edit.rotation + 90) % 360) as UglEditState['rotation'] })
                      }
                    >
                      Girar 90°
                    </Button>
                    <Button
                      variant="immersive"
                      size="sm"
                      iconStart="flip"
                      aria-pressed={edit.flipX}
                      onClick={() => apply({ ...edit, flipX: !edit.flipX })}
                    >
                      Espelhar
                    </Button>
                  </div>
                  <Slider
                    variant="immersive"
                    label="Endireitar"
                    showValue
                    min={-45}
                    max={45}
                    origin={0}
                    ticks={[-30, -15, 15, 30]}
                    value={edit.straighten}
                    formatValue={formatDegrees}
                    onChange={(next) => apply({ ...edit, straighten: next }, true)}
                    onChangeEnd={endGesture}
                  />
                  <div
                    role="radiogroup"
                    aria-label="Proporção"
                    className="ugl-photo-editor__pills ugl-photo-editor__bleed"
                    onKeyDown={handleAspectKeyDown}
                  >
                    {ASPECTS.map((aspect) => {
                      const checked = edit.aspect === aspect.id;
                      return (
                        <button
                          key={aspect.id}
                          type="button"
                          role="radio"
                          aria-checked={checked}
                          aria-label={aspect.spoken}
                          tabIndex={checked ? 0 : -1}
                          data-ugl-aspect={aspect.id}
                          className={[
                            'ugl-photo-editor__pill',
                            checked ? 'ugl-photo-editor__pill--checked' : '',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                          onClick={() => apply({ ...edit, aspect: aspect.id })}
                        >
                          {aspect.label}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {tool === 'adjust' && (
                <>
                  <div
                    role="radiogroup"
                    aria-label="Ajuste"
                    className="ugl-photo-editor__adjustments ugl-photo-editor__bleed"
                    onKeyDown={handleAdjustmentKeyDown}
                  >
                    {ADJUSTMENTS.map((definition) => {
                      const checked = definition.key === adjustment;
                      const changed = edit.adjustments[definition.key] !== 0;
                      return (
                        <button
                          key={definition.key}
                          type="button"
                          role="radio"
                          aria-checked={checked}
                          aria-describedby={changed ? changedId : undefined}
                          tabIndex={checked ? 0 : -1}
                          data-ugl-adjustment={definition.key}
                          className={[
                            'ugl-photo-editor__adjustment',
                            checked ? 'ugl-photo-editor__adjustment--checked' : '',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                          onClick={() => setAdjustment(definition.key)}
                        >
                          <span className="ugl-photo-editor__adjustment-icon">
                            <Icon name={definition.icon} size="md" tone="inherit" filled={checked} />
                            {changed && <span className="ugl-photo-editor__dot" />}
                          </span>
                          <span className="ugl-photo-editor__adjustment-label">{definition.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  <span id={changedId} hidden>
                    Ajuste alterado
                  </span>
                  <Slider
                    key={activeAdjustment.key}
                    variant="immersive"
                    label={activeAdjustment.label}
                    showValue
                    min={activeAdjustment.min}
                    max={100}
                    origin={0}
                    value={edit.adjustments[activeAdjustment.key]}
                    onChange={(next) => setAdjustmentValue(activeAdjustment.key, next)}
                    onChangeEnd={endGesture}
                  />
                </>
              )}

              {tool === 'filters' && (
                <>
                  <FilterPicker
                    className="ugl-photo-editor__bleed"
                    src={item.src}
                    alt={item.alt}
                    value={edit.filter}
                    intensity={edit.filterIntensity}
                    edit={edit}
                    onChange={(next) => apply({ ...edit, filter: next })}
                  />
                  {edit.filter === 'original' ? (
                    <p className="ugl-photo-editor__hint">
                      Escolha um filtro para ajustar a intensidade.
                    </p>
                  ) : (
                    <Slider
                      variant="immersive"
                      label="Intensidade"
                      showValue
                      min={0}
                      max={100}
                      value={edit.filterIntensity}
                      onChange={(next) => apply({ ...edit, filterIntensity: next }, true)}
                      onChangeEnd={endGesture}
                    />
                  )}
                </>
              )}
            </div>

            <div
              role="tablist"
              aria-label="Ferramentas"
              className="ugl-photo-editor__tabs"
              onKeyDown={handleTabsKeyDown}
            >
              {TOOLS.map((entry) => {
                const selected = entry.id === tool;
                return (
                  <button
                    key={entry.id}
                    id={tabId(entry.id)}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={panelId}
                    tabIndex={selected ? 0 : -1}
                    data-ugl-tool={entry.id}
                    className={[
                      'ugl-photo-editor__tab',
                      selected ? 'ugl-photo-editor__tab--selected' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => setTool(entry.id)}
                  >
                    <Icon name={entry.icon} size="md" tone="inherit" filled={selected} />
                    <span className="ugl-photo-editor__tab-label">{entry.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ------------------------------------------------ Confirmação */}
        {confirmOpen && (
          <div className="ugl-photo-editor__confirm-layer">
            <div
              ref={confirmRef}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby={confirmTitleId}
              aria-describedby={confirmDescriptionId}
              className="ugl-photo-editor__confirm"
            >
              <h3 id={confirmTitleId} className="ugl-photo-editor__confirm-title">
                Descartar alterações?
              </h3>
              <p id={confirmDescriptionId} className="ugl-photo-editor__confirm-description">
                As edições desta foto serão perdidas. A foto original continua intacta.
              </p>
              <div className="ugl-photo-editor__confirm-actions">
                <Button variant="danger" fullWidth onClick={discard}>
                  Descartar alterações
                </Button>
                <Button
                  ref={keepEditingRef}
                  variant="secondary"
                  fullWidth
                  onClick={() => setConfirmOpen(false)}
                >
                  Continuar editando
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

PhotoEditor.displayName = 'PhotoEditor';
