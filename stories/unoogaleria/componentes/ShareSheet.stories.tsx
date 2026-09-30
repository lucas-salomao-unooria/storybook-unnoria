import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { ShareSheet, uglDefaultShareActions } from '../../../src/unoogaleria/components/ShareSheet';
import type { UglShareAction } from '../../../src/unoogaleria/components/ShareSheet';
import { Button } from '../../../src/unoogaleria/components/Button';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import { uglFormatCount } from '../../../src/unoogaleria/media';
import type { UglMediaItem, UglPerson } from '../../../src/unoogaleria/media';
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
import { uglPeople, uglPhotos, uglVideos } from '../fixtures';
import { TelaDeFundo, notaEstilo } from './sobreposicoes.demo';

const BAR = '#716C98';

/** Seleção de demonstração: três fotos e um vídeo. */
const SELECAO: UglMediaItem[] = [...uglPhotos.slice(0, 3), uglVideos[0]];

/** Contatos sugeridos: os cinco primeiros das fixtures (o quarto sem retrato). */
const CONTATOS: UglPerson[] = uglPeople
  .slice(0, 5)
  .map((pessoa, index) => (index === 3 ? { ...pessoa, avatarSrc: undefined } : pessoa));

/** Ações reduzidas, para a variante de um item só. */
const ACOES_CURTAS: UglShareAction[] = uglDefaultShareActions.slice(0, 3);

/**
 * Compartilhamento de demonstração dentro do aparelho, com o botão que abre.
 * A folha não fecha sozinha ao tocar numa ação: a estória só registra a escolha.
 */
const CompartilharDemo: React.FC<{
  theme?: 'light' | 'dark';
  inicialAberta?: boolean;
  itens?: UglMediaItem[];
  contatos?: UglPerson[];
  acoes?: readonly UglShareAction[];
  variant?: 'default' | 'immersive';
  scale?: number;
  onAction?: (id: string) => void;
  onContact?: (pessoa: UglPerson) => void;
}> = ({
  theme,
  inicialAberta = false,
  itens = SELECAO,
  contatos = CONTATOS,
  acoes,
  variant = 'default',
  scale = 0.75,
  onAction,
  onContact,
}) => {
  const [aberta, setAberta] = useState(inicialAberta);
  const [ultima, setUltima] = useState<string | null>(null);
  const imersiva = variant === 'immersive';
  const rotulos = acoes ?? uglDefaultShareActions;

  return (
    <PhoneFrame scale={scale} theme={theme} ariaLabel="Aparelho de demonstração">
      <TelaDeFundo
        imersiva={imersiva}
        titulo={imersiva ? 'Hoje' : 'Biblioteca'}
        faixa={
          <>
            <Button
              size="sm"
              variant={imersiva ? 'immersive' : 'primary'}
              iconStart="share"
              onClick={() => setAberta(true)}
            >
              Compartilhar
            </Button>
            {!imersiva && <p style={notaEstilo}>{ultima ? `Última escolha: ${ultima}` : uglFormatCount(itens)}</p>}
          </>
        }
      >
        <ShareSheet
          open={aberta}
          onClose={() => setAberta(false)}
          items={itens}
          contacts={contatos}
          actions={acoes}
          variant={variant}
          onAction={(id) => {
            setUltima(rotulos.find((acao) => acao.id === id)?.label ?? id);
            onAction?.(id);
          }}
          onContact={(pessoa) => {
            setUltima(`Enviar para ${pessoa.name}`);
            onContact?.(pessoa);
          }}
        />
      </TelaDeFundo>
    </PhoneFrame>
  );
};

/**
 * Página de documentação rica do componente ShareSheet.
 */
const ShareSheetDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Sobreposições"
      title="ShareSheet"
      description="Folha de compartilhamento montada sobre o BottomSheet: a tira de prévia das mídias escolhidas com a contagem no cabeçalho, os contatos sugeridos e a lista de ações — Copiar link, Duplicar, Adicionar a um álbum e as demais."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" description="Mandar, copiar ou guardar o que foi escolhido." />
    <UglDocGrid>
      <UglDocCard icon="🖼️" title="Prévia e contagem">
        A tira mostra as mídias (com a duração nos vídeos) e o cabeçalho diz quanto vai: “3 fotos, 1
        vídeo”, por <code>uglFormatCount</code>. A contagem descreve o diálogo.
      </UglDocCard>
      <UglDocCard icon="👥" title="Contatos">
        Retrato e nome; o botão se anuncia “Enviar para Ana”. Sem retrato, as iniciais.
      </UglDocCard>
      <UglDocCard icon="📋" title="Ações">
        Oito ações padrão em <code>uglDefaultShareActions</code>, substituíveis por <code>actions</code>.
        A folha não fecha sozinha: o produto decide.
      </UglDocCard>
      <UglDocCard icon="🧩" title="Herda a folha">
        Camada na tela, foco preso, Esc, véu e foco devolvido vêm do <code>BottomSheet</code>.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" description="Medidas do módulo e escolhas de composição." />
    <UglDocSpecs
      component="ShareSheet"
      layout="BottomSheet · prévia 64px · contatos 64px · ações 52px em cartão"
      specs={[
        { label: 'Base', value: 'BottomSheet (título “Compartilhar”)' },
        { label: 'Miniatura', value: '64×64px · --ugl-radius-s' },
        { label: 'Selo de vídeo', value: '--ugl-color-media-scrim · Caption/Strong' },
        { label: 'Retrato', value: '--ugl-avatar-lg (64px) · iniciais em --ugl-color-text-accent' },
        { label: 'Ação', value: '52px · Body/Large · glifo 24px à direita' },
        { label: 'Cartão de ações', value: '--ugl-radius-m · contorno --ugl-color-border-subtle' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Retrato interno, sem Avatar',
          detail:
            'o Avatar do módulo é escrito em paralelo e ainda não existe; os retratos usam a peça interna SharePortrait (<img> com alt vazio sobre as iniciais), também usada pelo InfoPanel. O retrato é decorativo: o nome ao lado nomeia o botão. Quando o Avatar existir, a troca é de uma linha.',
        },
        {
          subject: 'Contagem como descrição',
          detail:
            'a contagem vai para a descrição do BottomSheet, então o leitor de tela anuncia “Compartilhar, diálogo, 3 fotos, 1 vídeo” ao abrir.',
        },
        {
          subject: '“Salvar em arquivos” com o glifo de baixar',
          detail: 'o registro não tem glifo de pasta de arquivos; download é o mais próximo da intenção (tirar a mídia da galeria).',
        },
        {
          subject: 'Folha que não fecha sozinha',
          detail:
            'algumas ações concluem (Copiar link), outras abrem outra camada (Adicionar a um álbum). Fechar ou não é decisão do produto em onAction.',
        },
        {
          subject: 'Cartão com contorno',
          detail:
            'as ações ficam num cartão com contorno de 1px e fios entre linhas, e não num preenchimento: no tema escuro, o preenchimento de campo coincide com a superfície elevada e o cartão sumiria.',
        },
        {
          subject: 'Constante fora do módulo cliente',
          detail: 'uglDefaultShareActions vive em ShareSheet.actions.ts, sem "use client", para chegar a Server Components como dado.',
        },
        {
          subject: 'Medidas locais',
          detail:
            '--ugl-share-sheet-thumb (64px), --ugl-share-sheet-contact-width (72px) e --ugl-share-sheet-action-height (52px, a altura das listas agrupadas), sem token equivalente.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="Toque em “Compartilhar” no aparelho." />
    <UglDocStage surface="secondary" align="flex-start" padding={16}>
      <CompartilharDemo scale={0.6} />
      <div style={{ flex: '1 1 320px' }}>
        <UglDocAnatomy
          zones={[
            { name: 'Cabeçalho', role: 'Título “Compartilhar” e contagem (descrição).', token: 'Title/Medium · uglFormatCount' },
            { name: 'Prévia', role: 'Lista das mídias, rolável na horizontal.', token: '--ugl-radius-s · --ugl-color-background-tertiary' },
            { name: 'Selo de vídeo', role: 'Glifo e duração sobre a miniatura.', token: '--ugl-color-media-scrim' },
            { name: 'Contatos', role: 'Botões “Enviar para …” com retrato e nome.', token: '--ugl-avatar-lg' },
            { name: 'Ações', role: 'Cartão de linhas de 52px com glifo à direita.', token: '--ugl-color-border-subtle' },
          ]}
        />
      </div>
    </UglDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Cada aparelho abre a folha real; TodasVariantes e Estados as mostram já abertas."
    />
    <UglDocStage label="Conteúdo" surface="secondary" align="flex-start" padding={16}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>seleção com contatos</p>
        <CompartilharDemo scale={0.5} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>um item, sem contatos, três ações</p>
        <CompartilharDemo itens={[uglPhotos[4]]} contatos={[]} acoes={ACOES_CURTAS} scale={0.5} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>variant=&quot;immersive&quot;</p>
        <CompartilharDemo variant="immersive" scale={0.5} />
      </div>
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Como oferecer o compartilhamento." />
    <UglDocPractices
      dos={[
        'Passar exatamente os itens escolhidos: a contagem e a prévia vêm deles.',
        'Oferecer poucos contatos, os mais recentes.',
        'Fechar a folha em onAction quando a ação conclui (Copiar link) e mostrar um aviso.',
        'Usar a variante immersive quando a folha abre sobre o visualizador.',
        'Manter os ids das ações padrão, para o produto reconhecê-los.',
      ]}
      donts={[
        'Abrir a folha sem nenhum item.',
        'Pôr ações destrutivas (Excluir) na lista de compartilhamento.',
        'Repetir a mesma ação com rótulos diferentes.',
        'Fechar a folha antes de a outra camada (escolha de álbum) abrir.',
        'Mostrar retratos sem o nome ao lado.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Suporte a temas" description="A folha acompanha o tema; a prévia e o selo são invariantes." />
    <UglDocThemeSwitcher surface="secondary" padding={16}>
      {(tema) => <CompartilharDemo key={tema} theme={tema} scale={0.6} />}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do ShareSheet. Os demais atributos vão ao painel do BottomSheet."
    />
    <UglDocPropsTable
      title="ShareSheet"
      rows={[
        { name: 'open', type: 'boolean', description: 'Folha aberta. Obrigatório.' },
        { name: 'onClose', type: '() => void', description: 'Fechar, Esc e véu. Obrigatório.' },
        { name: 'items', type: 'UglMediaItem[]', description: 'Mídias: prévia e contagem. Obrigatório.' },
        { name: 'contacts', type: 'UglPerson[]', description: 'Contatos sugeridos.' },
        { name: 'actions', type: 'readonly UglShareAction[]', default: 'uglDefaultShareActions', description: 'Ações da lista.' },
        { name: 'onContact', type: '(person: UglPerson) => void', description: 'Toque num contato.' },
        { name: 'onAction', type: '(id: string) => void', description: 'Toque numa ação, com o id.' },
        { name: 'title', type: 'string', default: "'Compartilhar'", description: 'Título da folha.' },
        { name: 'closeLabel', type: 'string', default: "'Fechar'", description: 'Nome do botão de fechar.' },
        { name: 'height', type: "'auto' | 'half' | 'full'", default: "'auto'", description: 'Altura inicial da folha.' },
        { name: 'variant', type: "'default' | 'immersive'", default: "'default'", description: 'Variante visual.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
      ]}
    />
    <UglDocPropsTable
      title="UglShareAction · uglDefaultShareActions"
      rows={[
        { name: 'id', type: 'string', description: 'Devolvido em onAction.' },
        { name: 'label', type: 'string', description: 'Rótulo e nome acessível.' },
        { name: 'icon', type: 'UglIconName', description: 'Glifo à direita.' },
        ...uglDefaultShareActions.map((acao) => ({
          name: `'${acao.id}'`,
          type: 'padrão',
          description: `${acao.label} · glifo ${acao.icon}`,
        })),
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ShareSheet> = {
  title: 'Unoogaleria/Componentes/ShareSheet',
  component: ShareSheet,
  parameters: { layout: 'padded' },
  argTypes: {
    open: { control: 'boolean', description: 'Folha aberta.' },
    items: { control: 'object', description: 'Mídias a compartilhar.' },
    contacts: { control: 'object', description: 'Contatos sugeridos.' },
    actions: { control: 'object', description: 'Ações da lista.' },
    title: { control: 'text', description: 'Título da folha.' },
    closeLabel: { control: 'text', description: 'Nome do botão de fechar.' },
    height: { control: 'radio', options: ['auto', 'half', 'full'], description: 'Altura inicial.' },
    variant: { control: 'radio', options: ['default', 'immersive'], description: 'Variante visual.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onClose: { action: 'onClose' },
    onAction: { action: 'onAction' },
    onContact: { action: 'onContact' },
  },
  args: {
    open: true,
    items: SELECAO,
    contacts: CONTATOS,
    actions: [...uglDefaultShareActions],
    title: 'Compartilhar',
    closeLabel: 'Fechar',
    height: 'auto',
    variant: 'default',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof ShareSheet>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ShareSheetDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ShareSheet',
  render: (args) => (
    <PhoneFrame scale={0.75} theme={args.theme}>
      <TelaDeFundo imersiva={args.variant === 'immersive'}>
        <ShareSheet {...args} />
      </TelaDeFundo>
    </PhoneFrame>
  ),
};

/**
 * Composição realista: compartilhar a seleção da biblioteca.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: compartilhar a seleção',
  render: () => <CompartilharDemo inicialAberta />,
};

/**
 * Comum e imersiva, abertas.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['default', 'immersive'] as const).map((variante) => (
        <div key={variante} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={notaEstilo}>variant=&quot;{variante}&quot;</p>
          <CompartilharDemo inicialAberta variant={variante} scale={0.6} />
        </div>
      ))}
    </div>
  ),
};

/**
 * Um item só, sem contatos e com três ações; e a folha cheia.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>um item · sem contatos · três ações</p>
        <CompartilharDemo inicialAberta itens={[uglPhotos[4]]} contatos={[]} acoes={ACOES_CURTAS} scale={0.6} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>seleção grande</p>
        <CompartilharDemo inicialAberta itens={uglPhotos.slice(0, 12)} scale={0.6} />
      </div>
    </div>
  ),
};

/**
 * A folha nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <UglDocStage key={tema} label={tema === 'light' ? 'Tema claro' : 'Tema escuro'} theme={tema} surface="secondary" padding={16}>
          <CompartilharDemo inicialAberta theme={tema} scale={0.6} />
        </UglDocStage>
      ))}
    </div>
  ),
};

/**
 * Uma ação chama `onAction` com o id; um contato chama `onContact` com a pessoa.
 */
export const AcaoEContato: Story = {
  name: 'Ação e contato',
  args: { onAction: fn(), onContact: fn() },
  render: (args) => <CompartilharDemo onAction={args.onAction} onContact={args.onContact} />,
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);
    const [copiarLink] = uglDefaultShareActions;
    const [primeiro] = CONTATOS;

    await userEvent.click(tela.getByRole('button', { name: 'Compartilhar' }));
    const folha = await tela.findByRole('dialog', { name: 'Compartilhar' });
    await expect(folha).toHaveAccessibleDescription(uglFormatCount(SELECAO));
    await expect(within(folha).getAllByRole('img').length).toBeGreaterThanOrEqual(SELECAO.length);

    await userEvent.click(within(folha).getByRole('button', { name: copiarLink.label }));
    await expect(args.onAction).toHaveBeenCalledWith(copiarLink.id);

    await userEvent.click(within(folha).getByRole('button', { name: `Enviar para ${primeiro.name}` }));
    await expect(args.onContact).toHaveBeenCalledWith(primeiro);

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(tela.queryByRole('dialog')).not.toBeInTheDocument());
    await expect(tela.getByText(`Última escolha: Enviar para ${primeiro.name}`)).toBeInTheDocument();
  },
};
