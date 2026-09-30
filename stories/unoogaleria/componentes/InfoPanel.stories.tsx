import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { InfoPanel } from '../../../src/unoogaleria/components/InfoPanel';
import { BottomSheet } from '../../../src/unoogaleria/components/BottomSheet';
import { Button } from '../../../src/unoogaleria/components/Button';
import { IconButton } from '../../../src/unoogaleria/components/IconButton';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import type { UglMediaItem } from '../../../src/unoogaleria/media';
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
import { uglAlbums, uglItemById, uglPeople, uglVideos } from '../fixtures';
import { TelaDeFundo, notaEstilo } from './sobreposicoes.demo';

const BAR = '#716C98';

/** Selfie com três pessoas, um álbum e sem legenda. */
const SELFIE = uglItemById('m03');
/** Foto com legenda escrita. */
const ANIVERSARIO = uglItemById('m07');
/** Um vídeo, com duração. */
const VIDEO = uglVideos[0];
/** Uma captura mínima: sem câmera, lugar, pessoas nem álbuns. */
const CAPTURA: UglMediaItem = {
  id: 'captura-local',
  type: 'photo',
  src: SELFIE.src,
  alt: 'Captura de tela do horário das aulas',
  width: 1170,
  height: 2532,
  takenAt: '2026-09-29T21:40:00-03:00',
  subtypes: ['screenshot'],
  fileName: 'CAPTURA_0932.PNG',
  sizeBytes: 412_000,
};

const SEQUENCIA = [SELFIE, ANIVERSARIO, VIDEO];

/**
 * Painel com troca de mídia, para mostrar que a legenda é recriada a cada
 * mídia (campo não controlado com `key`).
 */
const PainelComTroca: React.FC<{
  theme?: 'light' | 'dark';
  onDescriptionChange?: (texto: string) => void;
}> = ({ theme, onDescriptionChange }) => {
  const [indice, setIndice] = useState(0);
  const [legendas, setLegendas] = useState<Record<string, string>>({});
  const atual = SEQUENCIA[indice];
  const item = { ...atual, description: legendas[atual.id] ?? atual.description };

  return (
    <UglDocStage theme={theme} surface="elevated" direction="column" align="stretch" padding={16}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Button
          size="sm"
          variant="secondary"
          iconStart="back"
          onClick={() => setIndice((i) => (i + SEQUENCIA.length - 1) % SEQUENCIA.length)}
        >
          Mídia anterior
        </Button>
        <Button
          size="sm"
          variant="secondary"
          iconEnd="chevronRight"
          onClick={() => setIndice((i) => (i + 1) % SEQUENCIA.length)}
        >
          Próxima mídia
        </Button>
        <p style={notaEstilo}>
          {indice + 1} de {SEQUENCIA.length}
        </p>
      </div>
      <div style={{ width: 358 }}>
        <InfoPanel
          item={item}
          people={uglPeople}
          albums={uglAlbums}
          onDescriptionChange={(texto) => {
            setLegendas((atuais) => ({ ...atuais, [atual.id]: texto }));
            onDescriptionChange?.(texto);
          }}
          onLocation={() => undefined}
        />
      </div>
    </UglDocStage>
  );
};

/**
 * O painel como o produto o usa: dentro de uma folha imersiva, aberta pelo
 * botão de informações sobre o visualizador.
 */
const InformacoesDemo: React.FC<{
  theme?: 'light' | 'dark';
  inicialAberta?: boolean;
  imersiva?: boolean;
  item?: UglMediaItem;
  scale?: number;
}> = ({ theme, inicialAberta = false, imersiva = true, item = SELFIE, scale = 0.75 }) => {
  const [aberta, setAberta] = useState(inicialAberta);
  const [legenda, setLegenda] = useState(item.description);
  const [lugar, setLugar] = useState(false);

  return (
    <PhoneFrame scale={scale} theme={theme} ariaLabel="Aparelho de demonstração">
      <TelaDeFundo
        imersiva={imersiva}
        titulo={imersiva ? 'Hoje' : 'Biblioteca'}
        faixa={
          <>
            <IconButton
              icon="info"
              label="Informações"
              variant={imersiva ? 'bar' : 'tinted'}
              pressed={aberta}
              pressedTone="accent"
              onClick={() => setAberta((atual) => !atual)}
            />
            {lugar && !imersiva && <p style={notaEstilo}>Abrir o lugar no mapa</p>}
          </>
        }
      >
        <BottomSheet
          open={aberta}
          onClose={() => setAberta(false)}
          title="Informações"
          height="half"
          variant={imersiva ? 'immersive' : 'default'}
        >
          <InfoPanel
            item={{ ...item, description: legenda }}
            people={uglPeople}
            albums={uglAlbums}
            variant={imersiva ? 'immersive' : 'default'}
            onDescriptionChange={setLegenda}
            onLocation={() => setLugar(true)}
          />
        </BottomSheet>
      </TelaDeFundo>
    </PhoneFrame>
  );
};

/**
 * Página de documentação rica do componente InfoPanel.
 */
const InfoPanelDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Sobreposições"
      title="InfoPanel"
      description="Informações de uma mídia: legenda editável, data e hora, tipo, câmera, resolução, tamanho, nome do arquivo, duração, lugar, pessoas e álbuns. É conteúdo — o produto o coloca dentro de um BottomSheet, imersivo sobre o visualizador."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" description="Tudo o que se sabe sobre a foto, sem mapa." />
    <UglDocGrid>
      <UglDocCard icon="✍️" title="Legenda que se salva sozinha">
        Campo não controlado a partir de <code>item.description</code> (regra 4.5.1), salvo no blur e no
        Enter — e só quando o texto mudou.
      </UglDocCard>
      <UglDocCard icon="📅" title="Datas do módulo">
        Data e hora saem de <code>uglFormatDateTime</code> no fuso pedido; resolução, tamanho e duração,
        dos utilitários do módulo.
      </UglDocCard>
      <UglDocCard icon="📍" title="Lugar em cartão">
        Glifo de lugar e o nome, sem mapa; com <code>onLocation</code>, o cartão é um botão.
      </UglDocCard>
      <UglDocCard icon="👥" title="Pessoas e álbuns">
        Resolvidos a partir de <code>item.people</code> e <code>item.albumIds</code>; ids desconhecidos
        são ignorados, seções vazias não aparecem.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" description="Medidas do módulo e escolhas de composição." />
    <UglDocSpecs
      component="InfoPanel"
      layout="Coluna · legenda · <dl> de metadados · seções com título"
      specs={[
        { label: 'Legenda', value: 'textarea · Body/Large · --ugl-color-fill-field' },
        { label: 'Termo', value: 'Caption · --ugl-color-text-secondary · glifo 20px' },
        { label: 'Valor', value: 'Body/Medium · recuo de 32px' },
        { label: 'Seções', value: 'h3 Title/Small' },
        { label: 'Lugar', value: 'cartão --ugl-radius-m · glifo --ugl-color-icon-accent' },
        { label: 'Retratos', value: '--ugl-avatar-md (48px)' },
        { label: 'Álbuns', value: 'cápsulas --ugl-color-fill-field · Label' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Glifo dentro do <dt>',
          detail:
            'um <div> de <dl> só aceita <dt> e <dd>; o glifo decorativo mora dentro do termo, e o valor ganha o recuo local --ugl-info-panel-value-inset (glifo de 20px + 12px) para alinhar com o texto do termo.',
        },
        {
          subject: 'Legenda recriada por mídia',
          detail:
            'o campo é um componente interno com key={item.id}: trocar de mídia descarta o texto do DOM e parte da nova descrição. Salvar compara com o último texto salvo (aparado), para não chamar onDescriptionChange em todo blur.',
        },
        {
          subject: 'Enter salva sem sair',
          detail:
            'Enter (sem Shift, fora de composição de texto) salva e mantém o foco no campo; Shift+Enter quebra a linha. Sem onDescriptionChange, a legenda existente aparece só como texto.',
        },
        {
          subject: 'Retratos do ShareSheet',
          detail:
            'as pessoas usam a mesma peça interna SharePortrait do compartilhamento (o Avatar ainda não existe), em 48px, decorativa: o nome aparece abaixo.',
        },
        {
          subject: 'Glifos escolhidos',
          detail:
            'Resolução usa aspectRatio, Tamanho usa document e Nome do arquivo usa label — o registro não tem glifos específicos de peso de arquivo nem de nome; foram os mais próximos da função.',
        },
        {
          subject: 'Duração falada',
          detail: 'a duração mostra “0:32” e anuncia “32 segundos” (uglFormatDurationSpoken), num texto só para leitor de tela.',
        },
        {
          subject: 'Tipo com subtipos',
          detail: 'uma linha só, “Foto · Selfie”, junta o tipo e os rótulos de uglSubtypeLabels.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="O painel real, fora da folha." />
    <UglDocStage surface="elevated" align="flex-start" padding={16}>
      <div style={{ width: 358 }}>
        <InfoPanel item={SELFIE} people={uglPeople} albums={uglAlbums} onDescriptionChange={() => undefined} onLocation={() => undefined} />
      </div>
      <div style={{ flex: '1 1 320px' }}>
        <UglDocAnatomy
          zones={[
            { name: 'Legenda', role: 'Campo não controlado, salvo no blur/Enter.', token: '--ugl-color-fill-field · Body/Large' },
            { name: 'Metadados', role: '<dl>: data, tipo, duração, câmera, resolução, tamanho, arquivo.', token: 'Caption · Body/Medium' },
            { name: 'Lugar', role: 'Cartão; botão quando há onLocation.', token: '--ugl-radius-m · --ugl-color-icon-accent' },
            { name: 'Pessoas', role: 'Retratos de 48px com o nome.', token: '--ugl-avatar-md' },
            { name: 'Álbuns', role: 'Cápsulas com o glifo de álbum.', token: '--ugl-color-fill-field · Label' },
          ]}
        />
      </div>
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes, tamanhos e estados" description="Foto completa, vídeo, captura mínima e só leitura." />
    <UglDocStage label="Conteúdo" surface="elevated" align="flex-start" padding={16}>
      {[
        { rotulo: 'foto com pessoas e álbum', item: SELFIE },
        { rotulo: 'vídeo', item: VIDEO },
        { rotulo: 'captura mínima', item: CAPTURA },
      ].map(({ rotulo, item }) => (
        <div key={item.id} style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={notaEstilo}>{rotulo}</p>
          <InfoPanel item={item} people={uglPeople} albums={uglAlbums} onDescriptionChange={() => undefined} />
        </div>
      ))}
    </UglDocStage>
    <UglDocStage label="Só leitura e imersivo" surface="immersive" align="flex-start" padding={16}>
      <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ ...notaEstilo, color: 'var(--ugl-color-immersive-text-secondary)' }}>
          variant=&quot;immersive&quot; · sem onDescriptionChange
        </p>
        <InfoPanel item={ANIVERSARIO} people={uglPeople} albums={uglAlbums} variant="immersive" />
      </div>
      <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ ...notaEstilo, color: 'var(--ugl-color-immersive-text-secondary)' }}>
          variant=&quot;immersive&quot; · editável
        </p>
        <InfoPanel
          item={SELFIE}
          people={uglPeople}
          albums={uglAlbums}
          variant="immersive"
          onDescriptionChange={() => undefined}
          onLocation={() => undefined}
        />
      </div>
    </UglDocStage>
    <UglDocStage label="No aparelho (toque no botão de informações)" surface="secondary" align="flex-start" padding={16}>
      <InformacoesDemo scale={0.6} />
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Como mostrar as informações." />
    <UglDocPractices
      dos={[
        'Colocar o painel dentro de um BottomSheet titulado “Informações”.',
        'Passar a lista completa de pessoas e álbuns: o painel escolhe os da mídia.',
        'Usar a variante immersive quando a folha abre sobre o visualizador.',
        'Guardar a legenda recebida em onDescriptionChange e devolvê-la em item.description.',
        'Passar o timeZone do produto quando não for o de São Paulo.',
      ]}
      donts={[
        'Controlar o campo da legenda por fora: ele é não controlado de propósito.',
        'Formatar datas por conta própria — use os utilitários do módulo.',
        'Desenhar um mapa no lugar do cartão.',
        'Mostrar seções vazias (“Pessoas: nenhuma”).',
        'Usar o painel como camada: ele não tem véu nem foco preso.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Suporte a temas" description="A variante comum acompanha o tema; a imersiva é invariante." />
    <UglDocThemeSwitcher surface="elevated" padding={16}>
      {(tema) => (
        <div key={tema} style={{ width: 358 }}>
          <InfoPanel item={SELFIE} people={uglPeople} albums={uglAlbums} theme={tema} onDescriptionChange={() => undefined} onLocation={() => undefined} />
        </div>
      )}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" description="Contrato público do InfoPanel. Os demais atributos vão ao nó raiz (<div>)." />
    <UglDocPropsTable
      title="InfoPanel"
      rows={[
        { name: 'item', type: 'UglMediaItem', description: 'Mídia descrita. Obrigatório.' },
        { name: 'people', type: 'UglPerson[]', description: 'Pessoas conhecidas; o painel mostra as de item.people.' },
        { name: 'albums', type: 'UglAlbum[]', description: 'Álbuns conhecidos; o painel mostra os de item.albumIds.' },
        { name: 'onDescriptionChange', type: '(text: string) => void', description: 'Legenda salva (blur/Enter, só quando mudou). Sem ela, só leitura.' },
        { name: 'onLocation', type: '(item: UglMediaItem) => void', description: 'Toque no cartão do lugar.' },
        { name: 'timeZone', type: 'string', default: "'America/Sao_Paulo'", description: 'Fuso de leitura da data e da hora.' },
        { name: 'descriptionPlaceholder', type: 'string', default: "'Adicionar uma legenda…'", description: 'Apoio do campo vazio.' },
        { name: 'variant', type: "'default' | 'immersive'", default: "'default'", description: 'Texto do tema ou claro invariante.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof InfoPanel> = {
  title: 'Unoogaleria/Componentes/InfoPanel',
  component: InfoPanel,
  parameters: { layout: 'padded' },
  argTypes: {
    item: { control: 'object', description: 'Mídia descrita.' },
    people: { control: 'object', description: 'Pessoas conhecidas.' },
    albums: { control: 'object', description: 'Álbuns conhecidos.' },
    timeZone: {
      control: 'select',
      options: ['America/Sao_Paulo', 'America/Manaus', 'America/Noronha', 'UTC'],
      description: 'Fuso de leitura.',
    },
    descriptionPlaceholder: { control: 'text', description: 'Apoio do campo vazio.' },
    variant: { control: 'radio', options: ['default', 'immersive'], description: 'Variante visual.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onDescriptionChange: { action: 'onDescriptionChange' },
    onLocation: { action: 'onLocation' },
  },
  args: {
    item: SELFIE,
    people: uglPeople,
    albums: uglAlbums,
    timeZone: 'America/Sao_Paulo',
    descriptionPlaceholder: 'Adicionar uma legenda…',
    variant: 'default',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof InfoPanel>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <InfoPanelDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do InfoPanel',
  render: (args) => (
    <UglDocStage theme={args.theme} surface={args.variant === 'immersive' ? 'immersive' : 'elevated'} padding={16}>
      <div style={{ width: 358 }}>
        <InfoPanel {...args} />
      </div>
    </UglDocStage>
  ),
};

/**
 * Composição realista: as informações numa folha imersiva sobre o
 * visualizador, abertas pelo botão de informações.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: informações sobre o visualizador',
  render: () => <InformacoesDemo inicialAberta />,
};

/**
 * Foto completa, vídeo e captura mínima.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UglDocStage surface="elevated" align="flex-start" padding={16}>
      {[SELFIE, VIDEO, CAPTURA].map((item) => (
        <div key={item.id} style={{ width: 300 }}>
          <InfoPanel item={item} people={uglPeople} albums={uglAlbums} onDescriptionChange={() => undefined} />
        </div>
      ))}
    </UglDocStage>
  ),
};

/**
 * Editável com lugar acionável, só leitura e imersivo.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <UglDocStage label="Editável · lugar acionável" surface="elevated" padding={16}>
        <div style={{ width: 300 }}>
          <InfoPanel item={ANIVERSARIO} people={uglPeople} albums={uglAlbums} onDescriptionChange={() => undefined} onLocation={() => undefined} />
        </div>
      </UglDocStage>
      <UglDocStage label="Só leitura" surface="elevated" padding={16}>
        <div style={{ width: 300 }}>
          <InfoPanel item={ANIVERSARIO} people={uglPeople} albums={uglAlbums} />
        </div>
      </UglDocStage>
      <UglDocStage label="Imersivo" surface="immersive" padding={16}>
        <div style={{ width: 300 }}>
          <InfoPanel item={ANIVERSARIO} people={uglPeople} albums={uglAlbums} variant="immersive" onDescriptionChange={() => undefined} />
        </div>
      </UglDocStage>
    </div>
  ),
};

/**
 * O painel nos dois temas, dentro da folha comum.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <div key={tema} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={notaEstilo}>{tema === 'light' ? 'Tema claro' : 'Tema escuro'}</p>
          <InformacoesDemo inicialAberta imersiva={false} theme={tema} scale={0.6} />
        </div>
      ))}
    </div>
  ),
};

/**
 * A legenda se salva no blur e no Enter, só quando muda, e é recriada ao
 * trocar de mídia.
 */
export const SalvarLegenda: Story = {
  name: 'Salvar a legenda no blur',
  args: { onDescriptionChange: fn() },
  render: (args) => <PainelComTroca onDescriptionChange={args.onDescriptionChange} />,
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);
    const campo = tela.getByRole('textbox', { name: 'Legenda' });
    await expect(campo).toHaveValue(SELFIE.description ?? '');

    await userEvent.click(campo);
    await userEvent.type(campo, 'Piquenique no parque');
    await expect(args.onDescriptionChange).not.toHaveBeenCalled();
    await userEvent.tab();
    await expect(args.onDescriptionChange).toHaveBeenCalledTimes(1);
    await expect(args.onDescriptionChange).toHaveBeenLastCalledWith('Piquenique no parque');

    // Sair de novo sem mudar nada não salva outra vez.
    await userEvent.click(campo);
    await userEvent.tab();
    await expect(args.onDescriptionChange).toHaveBeenCalledTimes(1);

    // Enter salva sem sair do campo.
    await userEvent.click(campo);
    await userEvent.type(campo, ' com a turma{Enter}');
    await expect(args.onDescriptionChange).toHaveBeenLastCalledWith('Piquenique no parque com a turma');
    await expect(campo).toHaveFocus();

    // Trocar de mídia recria o campo a partir da nova descrição.
    await userEvent.click(tela.getByRole('button', { name: 'Próxima mídia' }));
    await expect(tela.getByRole('textbox', { name: 'Legenda' })).toHaveValue(ANIVERSARIO.description ?? '');
  },
};
