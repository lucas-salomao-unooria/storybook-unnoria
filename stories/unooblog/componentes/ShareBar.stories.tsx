import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ShareBar } from '../../../src/unooblog/components/ShareBar';
import type { UblShareBarOrientation } from '../../../src/unooblog/components/ShareBar';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UblDocGrid,
  UblDocCard,
  UblDocSpecs,
  UblDocDecisions,
  UblDocAnatomy,
  UblDocStage,
  UblDocPractices,
  UblDocThemeSwitcher,
  UblDocPropsTable,
} from '../../../.storybook/components';

const BAR = '#716C98';

const ORIENTATIONS: UblShareBarOrientation[] = ['horizontal', 'vertical'];

const noop = () => undefined;

const rotuloEstilo: React.CSSProperties = {
  margin: 0,
  fontFamily: 'var(--ubl-font-sans)',
  fontSize: 'var(--ubl-font-caption-size)',
  lineHeight: 'var(--ubl-font-caption-line)',
  color: 'var(--ubl-color-text-secondary)',
};

/**
 * Barra com legenda do arranjo.
 */
const BarraRotulada: React.FC<{
  rotulo: string;
  props?: Partial<React.ComponentProps<typeof ShareBar>>;
}> = ({ rotulo, props }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <p style={rotuloEstilo}>{rotulo}</p>
    <ShareBar onShare={noop} onCopyLink={noop} {...props} />
  </div>
);

/**
 * Barra vertical ao lado de uma coluna de texto, como na página do post: a
 * barra fica fixa abaixo do cabeçalho enquanto a coluna rola.
 */
const BarraAoLado: React.FC = () => (
  <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', width: 'min(640px, 100%)' }}>
    <ShareBar orientation="vertical" onShare={noop} onCopyLink={noop} />
    <div
      style={{
        flex: 1,
        fontFamily: 'var(--ubl-font-sans)',
        color: 'var(--ubl-color-text-primary)',
      }}
    >
      <p className="ubl-text ubl-text--prose">
        A barra vertical acompanha a leitura. Num layout com sumário lateral, ela fica na margem
        esquerda da coluna e continua à vista até o fim do texto.
      </p>
    </div>
  </div>
);

/**
 * Página de documentação rica do componente ShareBar.
 */
const ShareBarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Leitura"
      title="ShareBar"
      description="Ações de compartilhamento do post: compartilhar e copiar o link. Em linha, no fim do texto, ou em coluna fixa ao lado da leitura."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="O que a pessoa faz com o post depois de ler."
    />
    <UblDocGrid>
      <UblDocCard icon="📤" title="Compartilhar">
        O produto decide o que &quot;compartilhar&quot; faz (a folha do sistema, um menu); o
        componente só avisa por <code>onShare</code>.
      </UblDocCard>
      <UblDocCard icon="🔗" title="Copiar o link">
        <code>onCopyLink</code> avisa que a pessoa quer o endereço. Confirmar a cópia (com um aviso
        passageiro) é do produto.
      </UblDocCard>
      <UblDocCard icon="↕️" title="Em linha ou em coluna">
        Horizontal no fim do post; vertical e fixa ao lado do texto no layout largo, para que as
        ações continuem à mão durante a leitura.
      </UblDocCard>
      <UblDocCard icon="🎛️" title="Só o que o produto trata">
        Cada botão só aparece quando há manipulador. Sem nenhum, a barra não renderiza nada.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Estrutura própria sobre os IconButtons do módulo; cores e fontes são as da Plataforma Unooria."
    />
    <UblDocSpecs
      component="ShareBar"
      layout="Linha ou coluna · IconButtons com intervalo de 8px"
      specs={[
        { label: 'Botões', value: 'IconButton variant="outline" size="md" · glifos share e link' },
        { label: 'Intervalo', value: '--ubl-spacing-xs (8px)' },
        { label: 'Alvo', value: '≥ --ubl-touch-target (44px), pelo IconButton' },
        { label: 'Horizontal', value: 'flex em linha, quebra de linha se faltar largura' },
        { label: 'Vertical', value: 'position: sticky · top = --ubl-site-header-height + 24px' },
        { label: 'Papel', value: 'role="group" · aria-label "Ações de compartilhamento"' },
        { label: 'Nomes', value: '"Compartilhar o post" · "Copiar link do post"' },
        { label: 'Fronteira', value: 'Client Component (repassa os manipuladores aos botões)' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Só compartilhar e copiar o link',
          detail:
            'o Unoojornal tem também salvar e imprimir. No blog, salvar mora na ReactionBar (junto de curtir e comentar) e imprimir não faz parte do produto; a barra de compartilhamento fica com as duas ações que são só de compartilhar.',
        },
        {
          subject: 'Ação ausente, botão ausente',
          detail:
            'um botão sem manipulador seria um alvo morto. Cada ação só é renderizada quando o produto a trata; sem nenhuma, a barra devolve null.',
        },
        {
          subject: 'Vertical é sticky, não fixed',
          detail:
            'position: sticky abaixo da altura do cabeçalho do site mantém a barra no fluxo da coluna: ela acompanha a leitura sem tapar o conteúdo e para junto com o fim da coluna. position: fixed a tiraria do fluxo.',
        },
        {
          subject: 'Contorno em vez de preenchimento',
          detail:
            'os botões usam a variante outline do IconButton: o contorno de 1px (border-control) separa o alvo do fundo sem sombra.',
        },
        {
          subject: 'Nome do grupo diferente do nome dos botões',
          detail:
            'o grupo se chama "Ações de compartilhamento", e os botões, "Compartilhar o post" e "Copiar link do post": o leitor de tela não repete a mesma frase duas vezes.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Duas ações num grupo nomeado."
    />
    <UblDocStage surface="page" align="stretch" direction="column" padding={32}>
      <ShareBar onShare={noop} onCopyLink={noop} />
      <UblDocAnatomy
        zones={[
          { name: 'Compartilhar', role: 'Pede ao produto que compartilhe o post.', token: 'share · onShare' },
          { name: 'Copiar link', role: 'Pede o endereço do post.', token: 'link · onCopyLink' },
          { name: 'Grupo', role: 'role="group" nomeado; horizontal ou vertical sticky.', token: 'orientation' },
        ]}
      />
    </UblDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Orientações e ações presentes."
    />
    <UblDocStage label="Orientações" surface="page" align="flex-start" padding={24}>
      {ORIENTATIONS.map((orientacao) => (
        <BarraRotulada key={orientacao} rotulo={orientacao} props={{ orientation: orientacao }} />
      ))}
    </UblDocStage>
    <UblDocStage label="Ações presentes" surface="page" align="flex-start" padding={24}>
      <BarraRotulada rotulo="Duas ações" />
      <BarraRotulada rotulo="Só compartilhar" props={{ onCopyLink: undefined }} />
      <BarraRotulada rotulo="Só copiar o link" props={{ onShare: undefined }} />
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Como usar a barra." />
    <UblDocPractices
      dos={[
        'Passar só os manipuladores que o produto implementa.',
        'Confirmar a cópia do link ao leitor (um Toast, por exemplo).',
        'Usar a orientação vertical ao lado do texto no layout largo e a horizontal no fim do post.',
        'Manter a barra perto da leitura, onde a pessoa decide compartilhar.',
      ]}
      donts={[
        'Mostrar o botão de compartilhar em produto sem folha de compartilhamento.',
        'Esconder os rótulos: cada botão é só um ícone e depende do aria-label.',
        'Usar a barra vertical em tela estreita, onde ela tomaria a largura do texto.',
        'Acrescentar ações que não são de compartilhar: curtir e salvar ficam na ReactionBar.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Contornos e glifos acompanham o tema."
    />
    <UblDocThemeSwitcher surface="page" padding={32}>
      {(tema) => (
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <ShareBar theme={tema} onShare={noop} onCopyLink={noop} />
          <ShareBar theme={tema} orientation="vertical" onShare={noop} onCopyLink={noop} />
        </div>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do ShareBar. Os demais atributos vão à <div> raiz."
    />
    <UblDocPropsTable
      title="ShareBar"
      rows={[
        { name: 'onShare', type: '() => void', description: 'Chamado ao acionar "Compartilhar o post". Sem ele, o botão não aparece.' },
        { name: 'onCopyLink', type: '() => void', description: 'Chamado ao acionar "Copiar link do post". Sem ele, o botão não aparece.' },
        { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Disposição dos botões. A vertical é sticky abaixo do cabeçalho do site.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        { name: 'aria-label', type: 'string', default: "'Ações de compartilhamento'", description: 'Nome do grupo de ações.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ShareBar> = {
  title: 'Unooblog/Componentes/ShareBar',
  component: ShareBar,
  parameters: { layout: 'padded' },
  argTypes: {
    onShare: { action: 'onShare', description: 'Chamado ao acionar "Compartilhar o post".' },
    onCopyLink: { action: 'onCopyLink', description: 'Chamado ao acionar "Copiar link do post".' },
    orientation: { control: 'radio', options: ORIENTATIONS, description: 'Disposição dos botões.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    orientation: 'horizontal',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof ShareBar>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ShareBarDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas. As ações aparecem porque os
 * manipuladores vêm da aba Ações.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ShareBar',
  render: (args) => (
    <UblDocStage surface="page" theme={args.theme} align="flex-start" padding={32}>
      <ShareBar {...args} />
    </UblDocStage>
  ),
};

/**
 * A barra vertical ao lado do texto, como no layout largo do post.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: barra ao lado do texto',
  render: () => (
    <UblDocStage surface="page" align="flex-start" padding={32}>
      <BarraAoLado />
    </UblDocStage>
  ),
};

/**
 * O tamanho dos alvos é do IconButton; aqui, a barra horizontal em contêineres de
 * largura diferente: a linha quebra quando falta lugar.
 */
export const Tamanhos: Story = {
  render: () => (
    <UblDocStage surface="page" align="flex-start" padding={24}>
      {[60, 120, 240].map((largura) => (
        <div key={largura} style={{ width: largura, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={rotuloEstilo}>Contêiner de {largura}px</p>
          <ShareBar onShare={noop} onCopyLink={noop} />
        </div>
      ))}
    </UblDocStage>
  ),
};

/**
 * As duas orientações.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UblDocStage surface="page" align="flex-start" padding={24}>
      {ORIENTATIONS.map((orientacao) => (
        <BarraRotulada key={orientacao} rotulo={orientacao} props={{ orientation: orientacao }} />
      ))}
    </UblDocStage>
  ),
};

/**
 * Os arranjos de ações presentes.
 */
export const Estados: Story = {
  render: () => (
    <UblDocStage surface="page" align="flex-start" padding={24}>
      <BarraRotulada rotulo="Duas ações" />
      <BarraRotulada rotulo="Só compartilhar" props={{ onCopyLink: undefined }} />
      <BarraRotulada rotulo="Só copiar o link" props={{ onShare: undefined }} />
    </UblDocStage>
  ),
};

/**
 * A barra nos dois temas, nas duas orientações.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <UblDocStage
          key={tema}
          label={tema === 'light' ? 'Tema claro' : 'Tema escuro'}
          surface="page"
          theme={tema}
          align="flex-start"
          padding={24}
        >
          <ShareBar theme={tema} onShare={noop} onCopyLink={noop} />
          <ShareBar theme={tema} orientation="vertical" onShare={noop} onCopyLink={noop} />
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Cada botão tem o rótulo acessível próprio e chama o seu manipulador.
 */
export const RotulosEAcoes: Story = {
  name: 'Rótulos acessíveis e ações',
  args: { onShare: fn(), onCopyLink: fn() },
  render: (args) => (
    <UblDocStage surface="page" align="flex-start" padding={32}>
      <ShareBar {...args} />
    </UblDocStage>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);

    await expect(tela.getByRole('group', { name: 'Ações de compartilhamento' })).toBeInTheDocument();

    await userEvent.click(tela.getByRole('button', { name: 'Compartilhar o post' }));
    await expect(args.onShare).toHaveBeenCalledTimes(1);

    await userEvent.click(tela.getByRole('button', { name: 'Copiar link do post' }));
    await expect(args.onCopyLink).toHaveBeenCalledTimes(1);
  },
};

/**
 * Sem manipuladores, a barra não renderiza nada; com um só, só aparece o botão dele.
 */
export const SoOQueOProdutoTrata: Story = {
  name: 'Só o que o produto trata',
  args: { onShare: undefined, onCopyLink: fn() },
  render: (args) => (
    <UblDocStage surface="page" align="flex-start" padding={32}>
      <ShareBar {...args} />
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    await expect(tela.queryByRole('button', { name: 'Compartilhar o post' })).not.toBeInTheDocument();
    await expect(tela.getByRole('button', { name: 'Copiar link do post' })).toBeInTheDocument();
  },
};
