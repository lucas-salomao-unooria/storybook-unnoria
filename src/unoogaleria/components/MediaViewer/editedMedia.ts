import type React from 'react';
import {
  uglEditToFilter,
  uglEditToTransform,
  uglEditedRatio,
  uglVignetteOpacity,
} from '../../media';
import type { UglMediaItem } from '../../media';

/**
 * Aplicação da edição não destrutiva na exibição, compartilhada pelo
 * visualizador e pela tira de miniaturas.
 *
 * A caixa que recebe a imagem declara `container-type: size` e tem a proporção
 * EDITADA (depois do corte e da rotação). A imagem é centralizada nela e, quando
 * a rotação é de 90° ou 270°, nasce com os lados trocados (`100cqh × 100cqw`),
 * para que, girada, cubra a caixa. `object-fit: cover` faz o corte da proporção.
 *
 * Vídeos não recebem edição: o editor da galeria só edita fotos.
 */

/** Edição que vale para a exibição do item (só fotos). */
const editOf = (item: UglMediaItem) => (item.type === 'photo' ? item.edit : undefined);

/**
 * Proporção exibida (largura ÷ altura) do item, depois do corte e da rotação.
 */
export const mediaDisplayRatio = (item: UglMediaItem) => {
  const edit = editOf(item);
  const ratio = edit ? uglEditedRatio(item, edit) : item.width / item.height;
  return Number.isFinite(ratio) && ratio > 0 ? ratio : 1;
};

/**
 * Estilo da imagem (ou do vídeo) dentro da caixa editada.
 */
export const editedMediaStyle = (item: UglMediaItem): React.CSSProperties => {
  const edit = editOf(item);
  const turned = Boolean(edit && edit.rotation % 180 !== 0);
  const transform = uglEditToTransform(edit, mediaDisplayRatio(item));
  const filter = uglEditToFilter(edit);

  return {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: turned ? '100cqh' : '100%',
    height: turned ? '100cqw' : '100%',
    objectFit: 'cover',
    transform: `translate(-50%, -50%)${transform === 'none' ? '' : ` ${transform}`}`,
    ...(filter === 'none' ? {} : { filter }),
  };
};

/**
 * Opacidade da camada de vinheta do item (0 quando não há vinheta).
 */
export const mediaVignetteOpacity = (item: UglMediaItem) => uglVignetteOpacity(editOf(item));
