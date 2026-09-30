import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { PhotoEditor } from '../../../src/unoogaleria/components/PhotoEditor';
import type { UglPhotoEditorTool } from '../../../src/unoogaleria/components/PhotoEditor';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import { Button } from '../../../src/unoogaleria/components/Button';
import {
  uglDefaultEdit,
  uglEditToFilter,
  uglFilters,
  uglIsEdited,
  uglVignetteOpacity,
} from '../../../src/unoogaleria/media';
import type { UglEditState, UglMediaItem } from '../../../src/unoogaleria/media';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UglDocCard,
  UglDocGrid,
  UglDocSpecs,
  UglDocDecisions,
  UglDocAnatomy,
  UglDocPractices,
  UglDocStage,
  UglDocThemeSwitcher,
  UglDocPropsTable,
} from '../../../.storybook/components';
import { uglDemoNow, uglPhotos } from '../fixtures';

const BAR = '#716C98';

/** Foto de demonstração: a primeira em retrato da biblioteca. */
const FOTO = uglPhotos.find((foto) => foto.height > foto.width) ?? uglPhotos[0];

/** Uma edição salva anteriormente: filtro Nostalgia e temperatura. */
const EDICAO_SALVA: UglEditState = {
  ...uglDefaultEdit,
  filter: 'nostalgia',
  filterIntensity: 80,
  adjustments: { ...uglDefaultEdit.adjustments, warmth: 30, vignette: 35 },
};

/** Girada, espelhada, endireitada e em 1:1. */
const EDICAO_DE_CORTE: UglEditState = {
  ...uglDefaultEdit,
  rotation: 90,
  flipX: true,
  straighten: 8,
  aspect: '1:1',
};

/** Com filtro Vívido: o bastante para Comparar e Reverter ficarem ativos. */
const EDICAO_VIVIDA: UglEditState = { ...uglDefaultEdit, filter: 'vivido' };

const RODAPE: React.CSSProperties = {
  margin: 0,
  fontFamily: 'var(--ugl-font-sans)',
  fontSize: 14,
  lineHeight: '20px',
  textAlign: 'center',
  color: 'var(--ugl-color-immersive-text-secondary)',
};

/** Resumo legível de uma edição, para a tela de demonstração. */
const resumoDaEdicao = (edit?: UglEditState) => {
  if (!edit || !uglIsEdited(edit)) return 'Sem edição';
  const ajustes = Object.values(edit.adjustments).filter((valor) => valor !== 0).length;
  const filtro = uglFilters.find((item) => item.id === edit.filter);
  return [
    edit.filter !== 'original' && filtro ? `Filtro ${filtro.label} (${edit.filterIntensity})` : '',
    ajustes ? `${ajustes} ${ajustes === 1 ? 'ajuste' : 'ajustes'}` : '',
    edit.rotation ? `girada ${edit.rotation}°` : '',
    edit.flipX ? 'espelhada' : '',
    edit.straighten ? `endireitada ${edit.straighten}°` : '',
    edit.aspect !== 'original' ? `corte ${edit.aspect === 'free' ? 'livre' : edit.aspect}` : '',
  ]
    .filter(Boolean)
    .join(' · ');
};

/**
 * Tela de uma foto aberta, com o botão "Editar". O editor abre por cima, na
 * tela do aparelho; "Concluído" guarda a edição, "Cancelar" só fecha.
 */
const TelaDaFoto: React.FC<{
  item?: UglMediaItem;
  ferramenta?: UglPhotoEditorTool;
  aberto?: boolean;
  theme?: 'light' | 'dark';
  scale?: number;
}> = ({ item = FOTO, ferramenta, aberto = false, theme, scale = 0.6 }) => {
  const [editando, setEditando] = useState(aberto);
  const [edicao, setEdicao] = useState<UglEditState | undefined>(item.edit);

  return (
    <PhoneFrame scale={scale} theme={theme}>
      <div
        data-ugl-immersive=""
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          boxSizing: 'border-box',
          padding: 'calc(var(--ugl-safe-area-top) + 16px) 16px calc(var(--ugl-safe-area-bottom) + 16px)',
          background: 'var(--ugl-color-immersive-surface)',
        }}
      >
        <div style={{ position: 'relative', maxWidth: '100%', maxHeight: '70%', display: 'flex' }}>
          {/* A tela de demonstração só aplica o filtro e a vinheta; a moldura
              completa (giro e corte) é a da pré-visualização do editor. */}
          <img
            src={item.src}
            alt={item.alt}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              filter: uglEditToFilter(edicao),
              transform: edicao?.flipX ? 'scaleX(-1)' : undefined,
            }}
          />
          {uglVignetteOpacity(edicao) > 0 && (
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                opacity: uglVignetteOpacity(edicao),
                background:
                  'radial-gradient(ellipse at center, transparent 45%, var(--ugl-color-immersive-surface) 100%)',
              }}
            />
          )}
        </div>
        <p style={RODAPE}>{resumoDaEdicao(edicao)}</p>
        <Button variant="immersive" iconStart="edit" onClick={() => setEditando(true)}>
          Editar
        </Button>
      </div>

      {editando && (
        <PhotoEditor
          item={{ ...item, edit: edicao }}
          initialTool={ferramenta}
          now={uglDemoNow}
          onCancel={() => setEditando(false)}
          onSave={(proxima) => {
            setEdicao(uglIsEdited(proxima) ? proxima : undefined);
            setEditando(false);
          }}
        />
      )}
    </PhoneFrame>
  );
};

/**
 * Página de documentação rica do componente PhotoEditor.
 *
 * Os editores desta página abrem pelo botão "Editar": o editor é uma camada
 * modal que prende o foco, e vários abertos de uma vez prenderiam o Tab da
 * própria página de documentação.
 */
const PhotoEditorDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Editor"
      title="PhotoEditor"
      description="Editor de fotos da galeria, em tela cheia e imersivo: Cortar (girar, espelhar, endireitar e proporção), Ajustar (sete ajustes finos) e Filtros (oito predefinidos e a intensidade), com Desfazer, Reverter e Comparar com o original. A edição é não destrutiva — o componente só produz um UglEditState, que a galeria aplica na exibição."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Editar sem medo: nada toca na foto original."
    />
    <UglDocGrid>
      <UglDocCard icon="🧾" title="Não destrutivo">
        O editor devolve um <code>UglEditState</code> em <code>onSave</code>. A foto nunca é
        reescrita; a grade, o visualizador e a pré-visualização aplicam a mesma edição pelos
        mesmos utilitários.
      </UglDocCard>
      <UglDocCard icon="✂️" title="Cortar">
        Girar 90° no sentido anti-horário, espelhar, endireitar de -45° a 45° e oito proporções. A
        moldura de corte (borda, cantos e grade de terços) aparece só nesta aba.
      </UglDocCard>
      <UglDocCard icon="🎚️" title="Ajustar">
        Exposição, Brilho, Contraste, Saturação, Temperatura, Sombras e Vinheta. O ajuste ativo
        mostra o deslizador, com origem no centro; o alterado ganha um ponto.
      </UglDocCard>
      <UglDocCard icon="🎨" title="Filtros">
        O <code>FilterPicker</code> com as amostras da própria foto e, quando o filtro não é o
        Original, o deslizador de intensidade.
      </UglDocCard>
      <UglDocCard icon="↩️" title="Histórico">
        Desfazer volta um passo (um gesto inteiro do deslizador é um passo só); Reverter volta à
        foto original e também pode ser desfeito; Comparar mostra o original enquanto é mantido
        pressionado.
      </UglDocCard>
      <UglDocCard icon="🛟" title="Sem perder trabalho">
        Com alterações não salvas, Cancelar (e o Esc) pergunta antes, num alerta local com o foco
        em “Continuar editando”.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas do módulo e escolhas de composição e de comportamento."
    />
    <UglDocSpecs
      component="PhotoEditor"
      layout="Tela cheia imersiva · barra · histórico · foto · ferramenta · abas"
      specs={[
        { label: 'Camada', value: '--ugl-z-viewer · position: absolute; inset: 0' },
        { label: 'Superfície', value: '--ugl-color-immersive-surface (invariante)' },
        { label: 'Barra superior', value: '--ugl-topbar-height + --ugl-safe-area-top' },
        { label: 'Histórico', value: '--ugl-toolbar-height (50px) · 3 × IconButton bar' },
        { label: 'Painel da ferramenta', value: '196px fixos (--ugl-photo-editor-panel-height)' },
        { label: 'Abas', value: '--ugl-toolbar-height + --ugl-safe-area-bottom' },
        { label: 'Ativo', value: '--ugl-color-immersive-accent · glifo preenchido' },
        { label: 'Confirmação', value: '300px · --ugl-radius-l · --ugl-z-dialog' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Sem Refazer',
          detail:
            'o quadro de ícones da Plataforma Unooria não publica um glifo de refazer; o Desfazer usa o substituto já registrado (`undo` → replay). O Refazer foi omitido em vez de desenhado. Reverter pode ser desfeito, então nada se perde.',
        },
        {
          subject: 'Um passo de histórico por gesto',
          detail:
            'o deslizador avisa o fim do gesto (onChangeEnd, ao soltar o ponteiro ou a tecla); o editor grava o estado anterior só no primeiro passo de cada gesto. Um arraste inteiro é desfeito de uma vez; cada toque de seta é um passo. O histórico guarda até 50 passos.',
        },
        {
          subject: 'Comparar enquanto pressionado',
          detail:
            'o botão é de alternância momentânea: aria-pressed fica verdadeiro enquanto o ponteiro está abaixado (com captura de ponteiro) ou o Espaço está mantido; soltar, cancelar o ponteiro ou perder o foco volta à edição. Um selo “Original” aparece sobre a foto e também é a região de status lida pelo leitor de tela. Comparar e Reverter ficam desabilitados quando não há edição.',
        },
        {
          subject: 'Confirmação local, não o ConfirmDialog',
          detail:
            'o alerta de descarte é um painel simples do próprio editor (role="alertdialog", aria-modal, título e descrição ligados), empilhado pelo useModalFocus: Esc fecha só o alerta, e o foco inicial é “Continuar editando”, a ação segura. O alerta usa as superfícies do tema (elevated), como os diálogos da galeria, sobre o véu overlay-scrim.',
        },
        {
          subject: '“Alterado” é relativo à edição com que o editor abriu',
          detail:
            'Cancelar só pergunta se a edição difere da inicial (item.edit, defaultValue ou value na montagem). Uma foto já editada que não foi mexida sai sem perguntar.',
        },
        {
          subject: 'Proporção “Livre” sem alças de arrasto',
          detail:
            'o UglEditState não guarda um retângulo de corte, só a proporção; “Livre” mantém a proporção da foto girada e os cantos da moldura são indicação visual, não alças. A foto cobre o quadro centralizada (como object-fit: cover), girada e ampliada pelo endireitamento (uglStraightenScale) para que nenhum canto vazio apareça.',
        },
        {
          subject: 'Quadro pela menor dimensão do palco',
          detail:
            'a pré-visualização usa container-type: size no palco e width: min(100cqw, 100cqh × proporção), com aspect-ratio: a foto ocupa o máximo do espaço em qualquer proporção sem medir o DOM em JavaScript.',
        },
        {
          subject: 'Painel de altura fixa',
          detail:
            'o painel da ferramenta tem 196px nas três abas (--ugl-photo-editor-panel-height), para que a foto não salte ao trocar de aba.',
        },
        {
          subject: 'Pílulas de 32px com alvo de 44px',
          detail:
            'as pílulas de proporção medem 32px de altura visual; um ::after estende o alvo de toque a --ugl-touch-target sem engordar a pílula.',
        },
        {
          subject: 'Nomes falados das proporções',
          detail:
            '“4:5” vira “4 por 5” para o leitor de tela (aria-label), e “1:1” vira “Quadrado, 1 por 1”.',
        },
        {
          subject: 'Ponto de “alterado” também para o leitor de tela',
          detail:
            'o ajuste alterado ganha um ponto de 8px em immersive-accent com anel da superfície (visível até sobre o círculo ativo) e a descrição “Ajuste alterado” por aria-describedby; o nome do rádio não muda.',
        },
        {
          subject: 'Glifos',
          detail:
            'Cortar usa `cropRotate`, Ajustar `adjust` (tune), Filtros `filters` (filter_vintage); Girar usa `rotate` (anti-horário, como o UglEditState), Espelhar o substituto `flip` (swap_horiz), Reverter `history` e Comparar `compare`. Todos já estão no registro.',
        },
        {
          subject: 'Botões de texto na barra',
          detail:
            '“Cancelar” e “Concluído” são botões de texto do próprio editor (title-sm, 44px de altura), e não o Button imersivo: na barra, uma cápsula translúcida competiria com a foto. “Concluído” vai no acento imersivo e em 600, que é a ação principal.',
        },
        {
          subject: 'Vinheta sobre a superfície imersiva',
          detail:
            'a camada de vinheta é um gradiente radial até --ugl-color-immersive-surface, com a opacidade de uglVignetteOpacity; o módulo não publica um preto.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="De cima para baixo, dentro da tela do aparelho."
    />
    <UglDocStage label="Toque em Editar para abrir o editor" surface="secondary" align="flex-start">
      <TelaDaFoto ferramenta="crop" />
      <div style={{ flex: '1 1 320px' }}>
        <UglDocAnatomy
          zones={[
            { name: 'Barra superior', role: '“Cancelar”, título com dia e hora, “Concluído”. Soma a área segura de cima.', token: '--ugl-topbar-height · --ugl-safe-area-top' },
            { name: 'Histórico', role: 'Desfazer, Comparar (enquanto pressionado) e Reverter.', token: 'IconButton variant="bar"' },
            { name: 'Pré-visualização', role: 'A foto com filtro, transformação e vinheta, na proporção editada.', token: 'uglEditToFilter · uglEditToTransform · uglEditedRatio' },
            { name: 'Moldura de corte', role: 'Só na aba Cortar: borda, cantos em “L” e grade de terços.', token: '--ugl-color-immersive-text · --ugl-color-immersive-border' },
            { name: 'Painel da ferramenta', role: 'Controles da aba ativa (role="tabpanel"), em altura fixa.', token: '--ugl-photo-editor-panel-height' },
            { name: 'Abas', role: 'Cortar, Ajustar e Filtros (role="tablist"), com glifo preenchido no ativo.', token: '--ugl-color-immersive-accent · --ugl-safe-area-bottom' },
            { name: 'Confirmação', role: 'Alerta local de descarte, sobre o véu.', token: '--ugl-color-background-elevated · --ugl-z-dialog' },
          ]}
        />
      </div>
    </UglDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="As três ferramentas e uma foto já editada — toque em Editar em cada aparelho."
    />
    <UglDocStage label="Abre em Cortar · Ajustar · Filtros" surface="secondary" align="flex-start">
      <TelaDaFoto ferramenta="crop" scale={0.5} />
      <TelaDaFoto ferramenta="adjust" scale={0.5} />
      <TelaDaFoto ferramenta="filters" scale={0.5} />
    </UglDocStage>
    <UglDocStage label="Foto com edição salva (Reverter e Comparar ativos)" surface="secondary" align="flex-start">
      <TelaDaFoto item={{ ...FOTO, edit: EDICAO_SALVA }} ferramenta="filters" scale={0.5} />
      <TelaDaFoto item={{ ...FOTO, edit: EDICAO_DE_CORTE }} ferramenta="crop" scale={0.5} />
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Quando e como usar." />
    <UglDocPractices
      dos={[
        'Guardar só o UglEditState de onSave e aplicá-lo na exibição, sem reescrever a foto.',
        'Remontar o editor (key={item.id}) para editar outra foto.',
        'Abrir o editor dentro do mesmo contêiner do visualizador (a tela do aparelho).',
        'Passar now e timeZone para que o dia do título seja o mesmo da grade.',
        'Oferecer o editor só para fotos; vídeos não têm UglEditState.',
      ]}
      donts={[
        'Salvar a cada onChange: ele serve para pré-visualizar por fora, não para gravar.',
        'Fechar o editor em onCancel sem ter passado pela confirmação — o componente já pergunta.',
        'Renderizar o editor num portal ou com position: fixed na janela.',
        'Desenhar um glifo de refazer: ele não existe no quadro de ícones.',
        'Pôr o editor sobre uma superfície clara: ele é imersivo nos dois temas.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="O editor é imersivo e invariante; o tema alcança o alerta de descarte e o cromo em volta."
    />
    <UglDocThemeSwitcher surface="secondary" padding={16}>
      {(tema) => <TelaDaFoto key={tema} theme={tema} ferramenta="adjust" scale={0.55} />}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do PhotoEditor. Os demais atributos vão para a camada raiz."
    />
    <UglDocPropsTable
      title="PhotoEditor"
      rows={[
        { name: 'item', type: 'UglMediaItem', description: 'Foto editada. Obrigatório.' },
        { name: 'value', type: 'UglEditState', description: 'Edição controlada.' },
        { name: 'defaultValue', type: 'UglEditState', default: 'item.edit ?? uglDefaultEdit', description: 'Edição inicial não controlada.' },
        { name: 'onChange', type: '(edit: UglEditState) => void', description: 'A cada mudança, inclusive Desfazer e Reverter.' },
        { name: 'onCancel', type: '() => void', description: 'Sair sem salvar (depois da confirmação, se houver alterações). Obrigatório.' },
        { name: 'onSave', type: '(edit: UglEditState) => void', description: '“Concluído”: a edição final. Obrigatório.' },
        { name: 'initialTool', type: "'crop' | 'adjust' | 'filters'", default: "'adjust'", description: 'Aba aberta ao montar.' },
        { name: 'now', type: 'Date | string', default: 'agora', description: 'Referência de “Hoje” e “Ontem” no título.' },
        { name: 'timeZone', type: 'string', default: "'America/Sao_Paulo'", description: 'Fuso de leitura da data.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema do que é herdado (o alerta de descarte).' },
        { name: 'className / style', type: 'string / CSSProperties', description: 'Aplicados à camada raiz.' },
      ]}
    />
    <UglDocPropsTable
      title="UglEditState"
      rows={[
        { name: 'rotation', type: '0 | 90 | 180 | 270', default: '0', description: 'Rotação em passos de 90°, no sentido anti-horário.' },
        { name: 'flipX', type: 'boolean', default: 'false', description: 'Espelhamento horizontal.' },
        { name: 'straighten', type: 'number', default: '0', description: 'Endireitamento, de -45° a 45°.' },
        { name: 'aspect', type: 'UglAspectRatio', default: "'original'", description: "Proporção: 'original' | 'free' | '1:1' | '4:5' | '3:2' | '4:3' | '16:9' | '9:16'." },
        { name: 'adjustments', type: 'UglAdjustments', default: 'uglDefaultAdjustments', description: 'Ajustes finos de -100 a 100 (vinheta de 0 a 100).' },
        { name: 'filter', type: 'UglFilterId', default: "'original'", description: 'Filtro predefinido.' },
        { name: 'filterIntensity', type: 'number', default: '100', description: 'Intensidade do filtro, de 0 a 100.' },
      ]}
    />
    <UglDocPropsTable
      title="UglPhotoEditorTool"
      rows={[
        { name: "'crop'", type: 'Cortar', description: 'Girar 90°, Espelhar, Endireitar e proporção.' },
        { name: "'adjust'", type: 'Ajustar', description: 'Os sete ajustes finos.' },
        { name: "'filters'", type: 'Filtros', description: 'FilterPicker e intensidade.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof PhotoEditor> = {
  title: 'Unoogaleria/Componentes/PhotoEditor',
  component: PhotoEditor,
  parameters: { layout: 'centered' },
  argTypes: {
    item: { control: 'object', description: 'Foto editada.' },
    value: { control: 'object', description: 'Edição controlada.' },
    defaultValue: { control: 'object', description: 'Edição inicial não controlada.' },
    initialTool: {
      control: 'radio',
      options: ['crop', 'adjust', 'filters'],
      description: 'Aba aberta ao montar.',
    },
    now: { control: 'text', description: 'Referência de “Hoje”.' },
    timeZone: { control: 'text', description: 'Fuso de leitura da data.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema do que é herdado.' },
    onChange: { action: 'onChange' },
    onCancel: { action: 'onCancel' },
    onSave: { action: 'onSave' },
  },
  args: {
    item: FOTO,
    defaultValue: uglDefaultEdit,
    initialTool: 'adjust',
    now: uglDemoNow,
    timeZone: 'America/Sao_Paulo',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof PhotoEditor>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  parameters: { layout: 'padded' },
  render: () => <PhotoEditorDocumentationPage />,
};

/**
 * Playground com todas as propriedades do PhotoEditor expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do PhotoEditor',
  render: (args) => (
    <PhoneFrame scale={0.75} theme={args.theme}>
      <PhotoEditor key={`${args.item.id}-${args.initialTool}`} {...args} />
    </PhoneFrame>
  ),
};

/**
 * Uma foto aberta, o botão Editar, e o editor por cima; Concluído guarda a edição.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: editar uma foto aberta',
  render: () => <TelaDaFoto scale={0.75} />,
};

/**
 * As três ferramentas, lado a lado.
 */
export const TodasVariantes: Story = {
  name: 'Três ferramentas',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['crop', 'adjust', 'filters'] as const).map((ferramenta) => (
        <PhoneFrame key={ferramenta} scale={0.5}>
          <PhotoEditor
            item={FOTO}
            initialTool={ferramenta}
            defaultValue={ferramenta === 'filters' ? EDICAO_VIVIDA : undefined}
            now={uglDemoNow}
            onCancel={() => undefined}
            onSave={() => undefined}
          />
        </PhoneFrame>
      ))}
    </div>
  ),
};

/**
 * Foto com edição salva, e uma girada, espelhada, endireitada e em 1:1.
 */
export const Estados: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <PhoneFrame scale={0.5} ariaLabel="Foto com edição salva">
        <PhotoEditor
          item={{ ...FOTO, edit: EDICAO_SALVA }}
          initialTool="adjust"
          now={uglDemoNow}
          onCancel={() => undefined}
          onSave={() => undefined}
        />
      </PhoneFrame>
      <PhoneFrame scale={0.5} ariaLabel="Foto girada e cortada">
        <PhotoEditor
          item={{ ...FOTO, edit: EDICAO_DE_CORTE }}
          initialTool="crop"
          now={uglDemoNow}
          onCancel={() => undefined}
          onSave={() => undefined}
        />
      </PhoneFrame>
    </div>
  ),
};

/**
 * O editor em aparelhos de tema claro e escuro: a superfície é a mesma.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <PhoneFrame
          key={tema}
          scale={0.5}
          theme={tema}
          ariaLabel={tema === 'light' ? 'Tema claro' : 'Tema escuro'}
        >
          <PhotoEditor
            item={FOTO}
            initialTool="crop"
            defaultValue={EDICAO_VIVIDA}
            now={uglDemoNow}
            onCancel={() => undefined}
            onSave={() => undefined}
          />
        </PhoneFrame>
      ))}
    </div>
  ),
};

/**
 * Ajustar o brilho pelo teclado, desfazer, reverter e concluir.
 */
export const FluxoDeAjuste: Story = {
  name: 'Ajustar, desfazer, reverter e concluir',
  args: { onChange: fn(), onSave: fn(), onCancel: fn() },
  render: (args) => (
    <PhoneFrame scale={0.75}>
      <PhotoEditor
        item={FOTO}
        initialTool="crop"
        now={uglDemoNow}
        onChange={args.onChange}
        onSave={args.onSave}
        onCancel={args.onCancel}
      />
    </PhoneFrame>
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    const editor = await tela.findByRole('dialog', { name: 'Editar' });
    const dentro = within(editor);
    const brilhoEm = (valor: number) =>
      expect.objectContaining({ adjustments: expect.objectContaining({ brightness: valor }) });

    // Muda para a aba Ajustar e escolhe o Brilho.
    const ajustar = dentro.getByRole('tab', { name: 'Ajustar' });
    await userEvent.click(ajustar);
    await expect(ajustar).toHaveAttribute('aria-selected', 'true');
    await userEvent.click(dentro.getByRole('radio', { name: 'Brilho' }));

    const brilho = dentro.getByRole('slider', { name: 'Brilho' });
    const desfazer = dentro.getByRole('button', { name: 'Desfazer' });
    const reverter = dentro.getByRole('button', { name: 'Reverter' });
    await expect(desfazer).toBeDisabled();
    await expect(reverter).toBeDisabled();

    // Duas setas: dois passos de histórico, e onChange recebe o ajuste.
    brilho.focus();
    await userEvent.keyboard('{ArrowRight}{ArrowRight}');
    await expect(brilho).toHaveValue('2');
    await expect(args.onChange).toHaveBeenLastCalledWith(brilhoEm(2));
    await expect(dentro.getByRole('radio', { name: 'Brilho' })).toHaveAttribute('aria-describedby');

    // Desfazer volta um passo.
    await userEvent.click(desfazer);
    await expect(brilho).toHaveValue('1');
    await expect(args.onChange).toHaveBeenLastCalledWith(brilhoEm(1));

    // Reverter zera a edição inteira — e pode ser desfeito.
    brilho.focus();
    await userEvent.keyboard('{PageUp}');
    await expect(brilho).toHaveValue('21');
    await userEvent.click(reverter);
    await expect(brilho).toHaveValue('0');
    await expect(args.onChange).toHaveBeenLastCalledWith(uglDefaultEdit);
    await expect(reverter).toBeDisabled();
    await userEvent.click(desfazer);
    await expect(brilho).toHaveValue('21');

    // Concluído entrega o estado final.
    await userEvent.click(dentro.getByRole('button', { name: 'Concluído' }));
    await expect(args.onSave).toHaveBeenCalledTimes(1);
    await expect(args.onSave).toHaveBeenCalledWith(brilhoEm(21));
    await expect(args.onCancel).not.toHaveBeenCalled();
  },
};

/**
 * Girar, espelhar, endireitar e escolher a proporção.
 */
export const FerramentaCortar: Story = {
  args: { onChange: fn(), onSave: fn(), onCancel: fn() },
  render: (args) => (
    <PhoneFrame scale={0.75}>
      <PhotoEditor
        item={FOTO}
        initialTool="crop"
        now={uglDemoNow}
        onChange={args.onChange}
        onSave={args.onSave}
        onCancel={args.onCancel}
      />
    </PhoneFrame>
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    const dentro = within(await tela.findByRole('dialog', { name: 'Editar' }));

    await userEvent.click(dentro.getByRole('button', { name: 'Girar 90°' }));
    await expect(args.onChange).toHaveBeenLastCalledWith(expect.objectContaining({ rotation: 90 }));

    const espelhar = dentro.getByRole('button', { name: 'Espelhar' });
    await userEvent.click(espelhar);
    await expect(espelhar).toHaveAttribute('aria-pressed', 'true');
    await expect(args.onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ rotation: 90, flipX: true })
    );

    // Proporção: grupo de rádios com setas.
    const original = dentro.getByRole('radio', { name: 'Original' });
    await expect(original).toHaveAttribute('aria-checked', 'true');
    original.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(dentro.getByRole('radio', { name: 'Livre' })).toHaveAttribute('aria-checked', 'true');
    await userEvent.click(dentro.getByRole('radio', { name: 'Quadrado, 1 por 1' }));
    await expect(args.onChange).toHaveBeenLastCalledWith(expect.objectContaining({ aspect: '1:1' }));

    // Endireitar de -45° a 45°, com origem no centro.
    const endireitar = dentro.getByRole('slider', { name: 'Endireitar' });
    await expect(endireitar).toHaveAttribute('aria-valuetext', '0°');
    endireitar.focus();
    await userEvent.keyboard('{ArrowLeft}');
    await expect(endireitar).toHaveAttribute('aria-valuetext', '−1°');
    await expect(args.onChange).toHaveBeenLastCalledWith(expect.objectContaining({ straighten: -1 }));
  },
};

/**
 * Cancelar sem alterações sai direto; com alterações, pergunta antes.
 */
export const CancelarComAlteracoes: Story = {
  name: 'Cancelar com alterações',
  args: { onChange: fn(), onSave: fn(), onCancel: fn() },
  render: (args) => (
    <PhoneFrame scale={0.75}>
      <PhotoEditor
        item={FOTO}
        initialTool="crop"
        now={uglDemoNow}
        onChange={args.onChange}
        onSave={args.onSave}
        onCancel={args.onCancel}
      />
    </PhoneFrame>
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    const dentro = within(await tela.findByRole('dialog', { name: 'Editar' }));
    const cancelar = dentro.getByRole('button', { name: 'Cancelar' });

    // Sem alterações: sai sem perguntar.
    await userEvent.click(cancelar);
    await expect(args.onCancel).toHaveBeenCalledTimes(1);
    await expect(tela.queryByRole('alertdialog')).not.toBeInTheDocument();

    // Com alterações: pergunta, com o foco na ação segura.
    await userEvent.click(dentro.getByRole('button', { name: 'Girar 90°' }));
    await userEvent.click(cancelar);
    const alerta = await tela.findByRole('alertdialog', { name: 'Descartar alterações?' });
    await expect(alerta).toHaveAccessibleDescription(
      'As edições desta foto serão perdidas. A foto original continua intacta.'
    );
    await waitFor(() =>
      expect(within(alerta).getByRole('button', { name: 'Continuar editando' })).toHaveFocus()
    );
    await expect(args.onCancel).toHaveBeenCalledTimes(1);

    // Esc fecha só o alerta; o editor continua aberto.
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(tela.queryByRole('alertdialog')).not.toBeInTheDocument());
    await expect(tela.getByRole('dialog', { name: 'Editar' })).toBeInTheDocument();
    await expect(args.onCancel).toHaveBeenCalledTimes(1);

    // Descartar sai de fato.
    await userEvent.click(cancelar);
    const denovo = await tela.findByRole('alertdialog', { name: 'Descartar alterações?' });
    await userEvent.click(within(denovo).getByRole('button', { name: 'Descartar alterações' }));
    await expect(args.onCancel).toHaveBeenCalledTimes(2);
    await expect(args.onSave).not.toHaveBeenCalled();
  },
};

/**
 * Manter o Espaço (ou o ponteiro) no Comparar mostra o original.
 */
export const CompararComOriginal: Story = {
  name: 'Comparar com o original',
  args: { onChange: fn(), onSave: fn(), onCancel: fn() },
  render: (args) => (
    <PhoneFrame scale={0.75}>
      <PhotoEditor
        item={FOTO}
        initialTool="filters"
        defaultValue={EDICAO_VIVIDA}
        now={uglDemoNow}
        onChange={args.onChange}
        onSave={args.onSave}
        onCancel={args.onCancel}
      />
    </PhoneFrame>
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    const dentro = within(await tela.findByRole('dialog', { name: 'Editar' }));
    const comparar = dentro.getByRole('button', { name: 'Comparar com o original' });
    const status = dentro.getByRole('status');

    await expect(comparar).toHaveAttribute('aria-pressed', 'false');
    await expect(status).toHaveTextContent('');

    // Uma só sessão do user-event: cada chamada direta começa com o teclado
    // solto, e o `[/Space]` de uma sessão nova não soltaria a tecla da anterior.
    const usuario = userEvent.setup();
    comparar.focus();
    await usuario.keyboard('[Space>]');
    await expect(comparar).toHaveAttribute('aria-pressed', 'true');
    await expect(status).toHaveTextContent('Original');

    await usuario.keyboard('[/Space]');
    await expect(comparar).toHaveAttribute('aria-pressed', 'false');
    await expect(status).toHaveTextContent('');
    // Comparar não é edição.
    await expect(args.onChange).not.toHaveBeenCalled();
  },
};
