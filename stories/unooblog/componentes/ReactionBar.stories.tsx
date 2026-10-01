import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ReactionBar } from '../../../src/unooblog/components/ReactionBar';
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
  props?: Partial<React.ComponentProps<typeof ReactionBar>>;
}> = ({ rotulo, props }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 'min(360px, 100%)' }}>
    <p style={rotuloEstilo}>{rotulo}</p>
    <ReactionBar likes={128} comments={24} onOpenComments={noop} defaultSaved={false} {...props} />
  </div>
);

/**
 * Barra controlada: o produto guarda curtir e salvar, e mostra o estado ao lado.
 */
const BarraControlada: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme }) => {
  const [curtido, setCurtido] = useState(false);
  const [salvo, setSalvo] = useState(false);
  const curtidas = 127 + (curtido ? 1 : 0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 'min(360px, 100%)' }}>
      <ReactionBar
        theme={theme}
        likes={curtidas}
        liked={curtido}
        onToggleLike={setCurtido}
        comments={24}
        onOpenComments={noop}
        saved={salvo}
        onToggleSave={setSalvo}
      />
      <p style={rotuloEstilo} data-testid="estado">
        {curtido ? 'Curtido' : 'Não curtido'} · {salvo ? 'salvo' : 'não salvo'}
      </p>
    </div>
  );
};

/**
 * Página de documentação rica do componente ReactionBar.
 */
const ReactionBarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Leitura"
      title="ReactionBar"
      description="As reações ao post: curtir, ver os comentários e salvar para ler depois. Cápsulas de 44px com contagem, estado em aria-pressed e glifo preenchido."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="O que a pessoa faz com o post depois de ler."
    />
    <UblDocGrid>
      <UblDocCard icon="❤️" title="Curtir">
        Botão de alternância com a contagem. O nome acessível traz o número: &quot;Curtir, 128
        curtidas&quot;. Curtido, o coração vem preenchido e na cor de marca.
      </UblDocCard>
      <UblDocCard icon="💬" title="Comentários">
        Leva à seção de comentários (a âncora é do produto, por <code>onOpenComments</code>), com a
        contagem no nome acessível.
      </UblDocCard>
      <UblDocCard icon="🔖" title="Salvar">
        Guarda o post para ler depois. Botão de alternância com <code>aria-pressed</code> e glifo
        preenchido quando salvo; só aparece quando o produto trata.
      </UblDocCard>
      <UblDocCard icon="🎛️" title="Controlado ou não">
        <code>liked</code> e <code>saved</code> deixam o estado com o produto; sem eles, a barra
        guarda o estado e ajusta a contagem exibida.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Estrutura própria do módulo; cores e fontes são as da Plataforma Unooria."
    />
    <UblDocSpecs
      component="ReactionBar"
      layout="Linha · cápsulas de 44px com intervalo de 8px · salvar no fim da linha"
      specs={[
        { label: 'Cápsula', value: 'altura 44px (--ubl-touch-target) · raio --ubl-radius-full · contorno 1px em --ubl-color-border-control' },
        { label: 'Texto', value: 'label (14/20) · números tabulares · --ubl-color-text-primary' },
        { label: 'Curtido', value: 'contorno e coração em --ubl-color-brand-like · fundo --ubl-color-fill-field · glifo likeFilled' },
        { label: 'Salvo', value: 'contorno em --ubl-color-action-primary · glifo bookmarkFilled em --ubl-color-icon-accent' },
        { label: 'Glifos', value: 'like/likeFilled · comments · bookmark/bookmarkFilled, 20px' },
        { label: 'Papel', value: 'role="group" · aria-label "Reações ao post"' },
        { label: 'Nomes', value: '"Curtir, N curtidas" · "Ver comentários, N comentários" · "Salvar para ler depois"' },
        { label: 'Fronteira', value: 'Client Component (estado dos botões de alternância)' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'A contagem entra no nome acessível',
          detail:
            'o botão se chama "Curtir, 128 curtidas" (e "1 curtida" no singular): quem usa leitor de tela ouve o número sem precisar ler a legenda visual. O estado vai em aria-pressed, e o nome não muda ao curtir — trocar nome e estado juntos faria o leitor anunciar o contrário do que aconteceu.',
        },
        {
          subject: 'Estado por forma e por cor',
          detail:
            'curtido, o glifo troca de contorno para preenchido (likeFilled) e a cápsula ganha fundo e contorno em brand-like; salvo, o marcador também fica preenchido. O estado nunca depende só da cor.',
        },
        {
          subject: 'Contagem ajustada no modo não controlado',
          detail:
            'sem a prop liked, a barra guarda o estado e mostra likes ± 1 conforme a pessoa alterna, para que a demonstração e produtos simples não precisem de um estado externo. Com liked, likes é a contagem final: o produto já contou a curtida.',
        },
        {
          subject: 'Comentários e salvar só quando o produto trata',
          detail:
            'o botão de comentários aparece com comments ou onOpenComments; o de salvar, com saved, defaultSaved ou onToggleSave. Curtir é a única reação sempre presente.',
        },
        {
          subject: 'Cápsulas, não botões de ícone',
          detail:
            'as reações são cápsulas com contagem ao lado do glifo (como em redes sociais), e não IconButtons quadrados: o número precisa de lugar, e a forma separa as reações das ações de compartilhar, que são quadradas.',
        },
        {
          subject: 'Contorno de controle',
          detail:
            'as cápsulas usam border-control (≥ 3:1) e não border-default: o contorno é a única marca de que a cápsula é um botão.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Três reações num grupo nomeado."
    />
    <UblDocStage surface="page" align="stretch" direction="column" padding={32}>
      <ReactionBar likes={128} comments={24} onOpenComments={noop} defaultSaved={false} />
      <UblDocAnatomy
        zones={[
          { name: 'Curtir', role: 'Alterna; aria-pressed, coração preenchido e contagem no nome.', token: 'like · likes · liked' },
          { name: 'Comentários', role: 'Leva à seção de comentários, com a contagem.', token: 'comments · onOpenComments' },
          { name: 'Salvar', role: 'Alterna; aria-pressed e marcador preenchido; no fim da linha.', token: 'bookmark · saved' },
          { name: 'Grupo', role: 'role="group" nomeado "Reações ao post".', token: 'aria-label' },
        ]}
      />
    </UblDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Reações presentes e estados."
    />
    <UblDocStage label="Reações presentes" surface="page" align="flex-start" direction="column" padding={24}>
      <BarraRotulada rotulo="Curtir, comentários e salvar" />
      <BarraRotulada rotulo="Curtir e comentários" props={{ defaultSaved: undefined }} />
      <BarraRotulada rotulo="Só curtir" props={{ comments: undefined, onOpenComments: undefined, defaultSaved: undefined }} />
    </UblDocStage>
    <UblDocStage label="Estados" surface="page" align="flex-start" direction="column" padding={24}>
      <BarraRotulada rotulo="Em repouso" props={{ liked: false, saved: false }} />
      <BarraRotulada rotulo="Curtido" props={{ liked: true, likes: 129 }} />
      <BarraRotulada rotulo="Salvo" props={{ liked: false, saved: true }} />
      <BarraRotulada rotulo="Curtido e salvo, contagem grande" props={{ liked: true, likes: 12840, comments: 1043, saved: true }} />
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Como usar as reações." />
    <UblDocPractices
      dos={[
        'Controlar liked e saved quando o produto guarda as reações no servidor.',
        'Passar em likes a contagem que já inclui a curtida da própria pessoa.',
        'Levar o botão de comentários à seção de comentários, com foco no título dela.',
        'Manter a barra perto do fim do texto, onde a pessoa decide reagir.',
      ]}
      donts={[
        'Mostrar o botão de salvar em produto que não tem lista de salvos.',
        'Mudar o rótulo do botão de curtir conforme o estado: o aria-pressed já diz.',
        'Esconder a contagem: ela é parte do nome acessível e do sentido social do botão.',
        'Misturar com a barra de compartilhar: são ações de naturezas diferentes.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="O coração de marca e os contornos mudam por tema para manter o contraste."
    />
    <UblDocThemeSwitcher surface="page" padding={32}>
      {(tema) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <ReactionBar theme={tema} likes={128} comments={24} onOpenComments={noop} defaultSaved={false} />
          <ReactionBar theme={tema} likes={129} liked comments={24} onOpenComments={noop} saved />
        </div>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do ReactionBar. Os demais atributos vão à <div> raiz."
    />
    <UblDocPropsTable
      title="ReactionBar"
      rows={[
        { name: 'likes', type: 'number', description: 'Quantidade de curtidas. Entra no nome acessível do botão de curtir.' },
        { name: 'liked', type: 'boolean', description: 'Post curtido (modo controlado). Com ele, likes é a contagem final.' },
        { name: 'defaultLiked', type: 'boolean', default: 'false', description: 'Estado inicial no modo não controlado; a contagem exibida acompanha a alternância.' },
        { name: 'onToggleLike', type: '(liked: boolean) => void', description: 'Chamado ao alternar curtir, com o novo estado.' },
        { name: 'comments', type: 'number', description: 'Quantidade de comentários. Faz o botão de comentários aparecer e entra no nome.' },
        { name: 'onOpenComments', type: '() => void', description: 'Chamado ao acionar "Ver comentários". Também faz o botão aparecer.' },
        { name: 'saved', type: 'boolean', description: 'Post salvo (modo controlado). Faz o botão de salvar aparecer.' },
        { name: 'defaultSaved', type: 'boolean', description: 'Estado inicial de salvo no modo não controlado. Informá-lo faz o botão aparecer.' },
        { name: 'onToggleSave', type: '(saved: boolean) => void', description: 'Chamado ao alternar salvar, com o novo estado.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ReactionBar> = {
  title: 'Unooblog/Componentes/ReactionBar',
  component: ReactionBar,
  parameters: { layout: 'padded' },
  argTypes: {
    likes: { control: { type: 'number', min: 0, step: 1 }, description: 'Quantidade de curtidas.' },
    liked: { control: 'boolean', description: 'Post curtido (modo controlado).' },
    defaultLiked: { control: 'boolean', description: 'Estado inicial de curtido no modo não controlado.' },
    onToggleLike: { action: 'onToggleLike', description: 'Chamado ao alternar curtir.' },
    comments: { control: { type: 'number', min: 0, step: 1 }, description: 'Quantidade de comentários.' },
    onOpenComments: { action: 'onOpenComments', description: 'Chamado ao acionar "Ver comentários".' },
    saved: { control: 'boolean', description: 'Post salvo (modo controlado).' },
    defaultSaved: { control: 'boolean', description: 'Estado inicial de salvo no modo não controlado.' },
    onToggleSave: { action: 'onToggleSave', description: 'Chamado ao alternar salvar.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    likes: 128,
    defaultLiked: false,
    comments: 24,
    defaultSaved: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof ReactionBar>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ReactionBarDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas. `liked` e `saved` ligam o modo
 * controlado; sem eles, a barra guarda o estado.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ReactionBar',
  render: (args) => (
    <UblDocStage surface="page" theme={args.theme} align="flex-start" padding={32} width="min(420px, 100%)">
      <ReactionBar {...args} />
    </UblDocStage>
  ),
};

/**
 * As reações ao fim do post, com o estado guardado pelo produto.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: reações no fim do post',
  render: () => (
    <UblDocStage surface="page" align="flex-start" padding={32}>
      <BarraControlada />
    </UblDocStage>
  ),
};

/**
 * A barra em contêineres de largura diferente: as cápsulas quebram de linha quando falta lugar.
 */
export const Tamanhos: Story = {
  render: () => (
    <UblDocStage surface="page" align="flex-start" padding={24}>
      {[160, 260, 420].map((largura) => (
        <div key={largura} style={{ width: largura, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={rotuloEstilo}>Contêiner de {largura}px</p>
          <ReactionBar likes={1284} comments={96} onOpenComments={noop} defaultSaved={false} />
        </div>
      ))}
    </UblDocStage>
  ),
};

/**
 * As combinações de reações presentes.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UblDocStage surface="page" align="flex-start" direction="column" padding={24}>
      <BarraRotulada rotulo="Curtir, comentários e salvar" />
      <BarraRotulada rotulo="Curtir e comentários" props={{ defaultSaved: undefined }} />
      <BarraRotulada rotulo="Curtir e salvar" props={{ comments: undefined, onOpenComments: undefined }} />
      <BarraRotulada rotulo="Só curtir" props={{ comments: undefined, onOpenComments: undefined, defaultSaved: undefined }} />
    </UblDocStage>
  ),
};

/**
 * Em repouso, curtido, salvo, contagens no singular, zero e grandes.
 */
export const Estados: Story = {
  render: () => (
    <UblDocStage surface="page" align="flex-start" direction="column" padding={24}>
      <BarraRotulada rotulo="Em repouso" props={{ liked: false, saved: false }} />
      <BarraRotulada rotulo="Curtido" props={{ liked: true, likes: 129 }} />
      <BarraRotulada rotulo="Salvo" props={{ liked: false, saved: true }} />
      <BarraRotulada rotulo="Uma curtida, um comentário" props={{ liked: false, likes: 1, comments: 1, saved: false }} />
      <BarraRotulada rotulo="Zero e contagem grande" props={{ liked: false, likes: 0, comments: 12043, saved: false }} />
    </UblDocStage>
  ),
};

/**
 * A barra nos dois temas, em repouso e com tudo ativo.
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
          direction="column"
          padding={24}
          width={380}
        >
          <ReactionBar theme={tema} likes={128} liked={false} comments={24} onOpenComments={noop} saved={false} />
          <ReactionBar theme={tema} likes={129} liked comments={24} onOpenComments={noop} saved />
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Sem `liked`, a barra guarda o estado: clicar em "Curtir" alterna `aria-pressed`,
 * ajusta a contagem no nome acessível e avisa por `onToggleLike`.
 */
export const CurtirAlternaAriaPressed: Story = {
  name: 'Curtir alterna aria-pressed',
  args: { likes: 128, onToggleLike: fn(), onOpenComments: fn(), onToggleSave: fn() },
  render: (args) => (
    <UblDocStage surface="page" align="flex-start" padding={32} width="min(420px, 100%)">
      <ReactionBar {...args} />
    </UblDocStage>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);
    const curtir = tela.getByRole('button', { name: 'Curtir, 128 curtidas' });

    await expect(curtir).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(curtir);
    const curtido = tela.getByRole('button', { name: 'Curtir, 129 curtidas' });
    await expect(curtido).toHaveAttribute('aria-pressed', 'true');
    await expect(args.onToggleLike).toHaveBeenLastCalledWith(true);

    await userEvent.click(curtido);
    await expect(tela.getByRole('button', { name: 'Curtir, 128 curtidas' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
    await expect(args.onToggleLike).toHaveBeenLastCalledWith(false);
    await expect(args.onToggleLike).toHaveBeenCalledTimes(2);
  },
};

/**
 * Modo controlado: o produto guarda curtir e salvar, e a barra só pede a troca.
 */
export const ModoControlado: Story = {
  name: 'Modo controlado',
  render: () => (
    <UblDocStage surface="page" align="flex-start" padding={32}>
      <BarraControlada />
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    await expect(tela.getByTestId('estado')).toHaveTextContent('Não curtido · não salvo');

    await userEvent.click(tela.getByRole('button', { name: 'Curtir, 127 curtidas' }));
    await expect(tela.getByRole('button', { name: 'Curtir, 128 curtidas' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );

    await userEvent.click(tela.getByRole('button', { name: 'Salvar para ler depois' }));
    await expect(tela.getByRole('button', { name: 'Salvar para ler depois' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    await expect(tela.getByTestId('estado')).toHaveTextContent('Curtido · salvo');
  },
};

/**
 * O botão de comentários traz a contagem no nome e chama `onOpenComments`.
 */
export const AbrirComentarios: Story = {
  name: 'Comentários com contagem no nome',
  args: { likes: 1, comments: 1, onOpenComments: fn() },
  render: (args) => (
    <UblDocStage surface="page" align="flex-start" padding={32} width="min(420px, 100%)">
      <ReactionBar {...args} />
    </UblDocStage>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);

    await expect(tela.getByRole('button', { name: 'Curtir, 1 curtida' })).toBeInTheDocument();
    await userEvent.click(tela.getByRole('button', { name: 'Ver comentários, 1 comentário' }));
    await expect(args.onOpenComments).toHaveBeenCalledTimes(1);
  },
};
