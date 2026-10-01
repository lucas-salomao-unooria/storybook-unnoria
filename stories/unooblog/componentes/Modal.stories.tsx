import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Modal } from '../../../src/unooblog/components/Modal';
import type { UblModalSize } from '../../../src/unooblog/components/Modal';
import { Button } from '../../../src/unooblog/components/Button';
import { DesktopFrame } from '../../../src/unooblog/components/DesktopFrame';
import { PhoneFrame } from '../../../src/unooblog/components/PhoneFrame';
import { TextArea } from '../../../src/unooblog/components/TextArea';
import { TextField } from '../../../src/unooblog/components/TextField';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UblDocGrid,
  UblDocCard,
  UblDocSpecs,
  UblDocDecisions,
  UblDocAnatomy,
  UblDocPractices,
  UblDocStage,
  UblDocThemeSwitcher,
  UblDocPropsTable,
} from '../../../.storybook/components';
import { ublAuthors, ublPosts, ublTopics } from '../fixtures';
import { PaginaDeFundo, notaEstilo } from './sobreposicoes.demo';

const BAR = '#716C98';

/** O post cujos detalhes o diálogo mostra. */
const POST = ublPosts[0];
const AUTORIA = ublAuthors.find((autor) => autor.id === POST.authorId) ?? ublAuthors[0];
const TOPICO = ublTopics.find((topico) => topico.id === POST.topicIds[0]);

/**
 * Conteúdo de demonstração: os detalhes de um post.
 */
const DetalhesDoPost: React.FC = () => (
  <dl
    className="ubl-text ubl-text--body-md"
    style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'var(--ubl-spacing-xs) var(--ubl-spacing-l)', margin: 0 }}
  >
    <dt style={{ color: 'var(--ubl-color-text-secondary)' }}>Autoria</dt>
    <dd style={{ margin: 0 }}>
      {AUTORIA.name} · {AUTORIA.role}
    </dd>
    <dt style={{ color: 'var(--ubl-color-text-secondary)' }}>Tópico</dt>
    <dd style={{ margin: 0 }}>{TOPICO?.label}</dd>
    <dt style={{ color: 'var(--ubl-color-text-secondary)' }}>Leitura</dt>
    <dd style={{ margin: 0 }}>{POST.readingMinutes} minutos</dd>
  </dl>
);

/**
 * Formulário de demonstração: editar o perfil.
 */
const EditarPerfil: React.FC = () => (
  <form
    onSubmit={(evento) => evento.preventDefault()}
    style={{ display: 'grid', gap: 'var(--ubl-spacing-l)' }}
    aria-label="Editar perfil"
  >
    <TextField label="Seu nome" required autoComplete="name" />
    <TextArea
      label="Sobre você"
      rows={4}
      maxLength={280}
      hint="Aparece no seu perfil, abaixo do nome."
    />
  </form>
);

type Formato = 'celular' | 'desktop';

/**
 * Diálogo de demonstração dentro do aparelho ou do quadro de navegador, com o
 * botão que abre e fecha. O estado de aberto é do produto (aqui, da estória).
 */
const ModalDemo: React.FC<{
  theme?: 'light' | 'dark';
  formato?: Formato;
  inicialAberto?: boolean;
  size?: UblModalSize;
  comDescricao?: boolean;
  comRodape?: boolean;
  comFormulario?: boolean;
  showClose?: boolean;
  dismissOnScrim?: boolean;
  scale?: number;
}> = ({
  theme,
  formato = 'celular',
  inicialAberto = false,
  size = 'md',
  comDescricao = true,
  comRodape = true,
  comFormulario = false,
  showClose = true,
  dismissOnScrim = true,
  scale,
}) => {
  const [aberto, setAberto] = useState(inicialAberto);
  const fechar = () => setAberto(false);

  const titulo = comFormulario ? 'Editar perfil' : 'Detalhes do post';
  const camada = (
    <PaginaDeFundo
      formato={formato}
      faixa={
        <Button size="sm" iconStart="info" onClick={() => setAberto(true)}>
          Abrir o diálogo
        </Button>
      }
    >
      <Modal
        open={aberto}
        onClose={fechar}
        title={titulo}
        description={comDescricao ? POST.title : undefined}
        size={size}
        showClose={showClose}
        dismissOnScrim={dismissOnScrim}
        footer={
          comRodape ? (
            <>
              <Button variant="ghost" onClick={fechar}>
                Cancelar
              </Button>
              <Button onClick={fechar}>{comFormulario ? 'Salvar perfil' : 'Entendi'}</Button>
            </>
          ) : undefined
        }
      >
        {comFormulario ? <EditarPerfil /> : <DetalhesDoPost />}
      </Modal>
    </PaginaDeFundo>
  );

  return formato === 'desktop' ? (
    <DesktopFrame url="cadernoaberto.com.br" scale={scale ?? 0.5} theme={theme} ariaLabel="Navegador de demonstração">
      {camada}
    </DesktopFrame>
  ) : (
    <PhoneFrame scale={scale ?? 0.75} theme={theme} ariaLabel="Aparelho de demonstração">
      {camada}
    </PhoneFrame>
  );
};

/**
 * Página de documentação rica do componente Modal.
 */
const ModalDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Camadas"
      title="Modal"
      description="Diálogo modal do blog: os detalhes de um post, a edição do perfil, a confirmação de uma exclusão. Cartão elevado de cantos macios sobre o véu, centrado na tela do aparelho ou do navegador, nomeado pelo próprio título."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Uma camada da tela, não da janela."
    />
    <UblDocGrid>
      <UblDocCard icon="📝" title="Informação sobre o post">
        Detalhes de autoria, créditos de imagem e regras da comunidade cabem num diálogo: lê-se,
        fecha-se, volta-se à leitura.
      </UblDocCard>
      <UblDocCard icon="👤" title="Formulário curto">
        Com <code>TextField</code> e <code>TextArea</code> no corpo e as ações no rodapé, o diálogo é
        o formulário curto do blog: editar o perfil, renomear uma coleção.
      </UblDocCard>
      <UblDocCard icon="🧭" title="Foco de camada">
        O <code>useModalFocus</code> prende o Tab, fecha no Esc, marca o fundo com{' '}
        <code>aria-hidden</code> e devolve o foco a quem abriu. Só a camada do topo responde.
      </UblDocCard>
      <UblDocCard icon="🏷️" title="Se nomeia sozinho">
        O título renderizado vira o <code>aria-labelledby</code>; a descrição, o{' '}
        <code>aria-describedby</code>. <code>getByRole(&apos;dialog&apos;, {'{ name }'})</code> acha pelo título.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas do módulo e escolhas de composição."
    />
    <UblDocSpecs
      component="Modal"
      layout="Camada absoluta · cartão centrado · cantos de 16px"
      specs={[
        { label: 'Véu', value: '--ubl-color-overlay-scrim' },
        { label: 'Cartão', value: '--ubl-color-background-elevated · --ubl-elevation-overlay' },
        { label: 'Raio', value: '--ubl-radius-l (16px; cantos macios)' },
        { label: 'Camada', value: '--ubl-z-dialog (40)' },
        { label: 'Larguras', value: 'sm 360px · md 560px (até a tela menos as margens)' },
        { label: 'Título', value: 'heading-4 (20/30, 600)' },
        { label: 'Corpo', value: 'body-lg (16/24), rolável' },
        { label: 'Fechar', value: 'IconButton close · alvo ≥ 44px' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'O véu fecha o diálogo',
          detail:
            'diferente de um alerta de exclusão, que não deve fechar pelo véu, o diálogo do blog é informativo: tocar fora é um jeito natural de dispensá-lo. O toque só fecha se o gesto inteiro (pressionar e soltar) ocorreu no véu — arrastar uma seleção de texto para fora não fecha. Desligue com dismissOnScrim={false} quando houver texto a perder.',
        },
        {
          subject: 'Montar é abrir',
          detail:
            'fechado, o diálogo não renderiza nada; aberto, monta uma camada interna. O hook de foco devolve o foco a quem abriu quando a camada sai, sem efeito que reinicie estado.',
        },
        {
          subject: 'Foco inicial no botão de fechar',
          detail:
            'sem initialFocusRef, o foco vai para "Fechar" — o primeiro elemento focável do cabeçalho. Num formulário, passe initialFocusRef para o primeiro campo.',
        },
        {
          subject: 'Título obrigatório e nome acessível',
          detail:
            'title não é opcional: é o nome do diálogo. aria-labelledby explícito manda; com aria-label explícito o diálogo não recebe aria-labelledby, que venceria o aria-label no cálculo do nome e o calaria sem aviso (AGENTS.md, 4.3).',
        },
        {
          subject: 'Cantos de 16px e título em heading-4',
          detail:
            'o blog é macio: o cartão usa raio l (16px), no lugar dos 8px do Modal do jornal, e o título é heading-4 (20/30, 600), menor que o título editorial do jornal, porque o diálogo do blog serve a tarefas curtas. A descrição fica em body-md e texto secundário.',
        },
        {
          subject: 'Sem portal',
          detail:
            'o diálogo é position: absolute dentro do contêiner posicionado mais próximo — a tela do PhoneFrame ou do DesktopFrame, que é bloco de contenção. Nunca vai para o body.',
        },
        {
          subject: 'Movimento',
          detail:
            'o véu esmaece e o cartão sobe 16px em --ubl-transition-slow. Em prefers-reduced-motion as animações são desligadas.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Toque em “Abrir o diálogo” para ver cada zona no aparelho."
    />
    <UblDocStage surface="subtle" align="flex-start" padding={16}>
      <ModalDemo comFormulario scale={0.6} />
      <div style={{ flex: '1 1 320px' }}>
        <UblDocAnatomy
          zones={[
            { name: 'Véu', role: 'Cobre a tela; o toque fecha (dismissOnScrim).', token: '--ubl-color-overlay-scrim' },
            { name: 'Cartão', role: 'role="dialog" aria-modal, nomeado pelo título.', token: '--ubl-color-background-elevated' },
            { name: 'Cabeçalho', role: 'Título (nomeia o diálogo), descrição e botão Fechar.', token: '--ubl-font-heading-4-* · --ubl-font-body-md-*' },
            { name: 'Corpo', role: 'Conteúdo rolável, com barra fina.', token: '--ubl-font-body-lg-*' },
            { name: 'Rodapé', role: 'Ações alinhadas à direita, separadas por fio.', token: '--ubl-elevation-hairline-top' },
          ]}
        />
      </div>
    </UblDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Cada quadro abre o diálogo real; as estórias Tamanhos, TodasVariantes e Estados mostram as mesmas combinações já abertas."
    />
    <UblDocStage label="Tamanhos" surface="subtle" align="flex-start" padding={16}>
      {(['sm', 'md'] as const).map((tamanho) => (
        <div key={tamanho} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={notaEstilo}>size=&quot;{tamanho}&quot;</p>
          <ModalDemo size={tamanho} scale={0.5} />
        </div>
      ))}
    </UblDocStage>
    <UblDocStage label="Em página de navegador" surface="subtle" align="flex-start" padding={16}>
      <ModalDemo formato="desktop" comFormulario scale={0.45} />
    </UblDocStage>
    <UblDocStage label="Estados" surface="subtle" align="flex-start" padding={16}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>sem rodapé e sem descrição</p>
        <ModalDemo comRodape={false} comDescricao={false} scale={0.5} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>véu que não fecha, sem Fechar</p>
        <ModalDemo dismissOnScrim={false} showClose={false} scale={0.5} />
      </div>
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Quando usar um diálogo." />
    <UblDocPractices
      dos={[
        'Dar um título ao diálogo: é ele que o nomeia para o leitor de tela.',
        'Renderizar o diálogo dentro da tela (PhoneFrame, DesktopFrame ou o contêiner do produto), irmão do conteúdo de fundo.',
        'Pôr as ações que concluem a tarefa no footer, fora da área que rola.',
        'Passar initialFocusRef para o primeiro campo quando o corpo é um formulário.',
        'Desligar dismissOnScrim quando fechar por engano faria a pessoa perder o que escreveu.',
      ]}
      donts={[
        'Levar o diálogo para um portal no body: ele sairia do aparelho e das áreas seguras.',
        'Abrir diálogo sobre diálogo: o blog é uma página de leitura, não um painel.',
        'Usar o diálogo para uma escolha curta no celular — use um BottomSheet.',
        'Esconder o botão Fechar e o véu ao mesmo tempo: restaria só o Esc.',
        'Pôr o diálogo dentro do nó que ele deve esconder: o fundo precisa ser irmão da camada.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Cartão, véu e rodapé acompanham o tema."
    />
    <UblDocThemeSwitcher surface="subtle" padding={16}>
      {(tema) => <ModalDemo key={tema} theme={tema} inicialAberto comFormulario scale={0.6} />}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do Modal. Os demais atributos vão ao cartão (role=dialog)."
    />
    <UblDocPropsTable
      title="Modal"
      rows={[
        { name: 'open', type: 'boolean', description: 'Diálogo aberto. Fechado, não renderiza nada. Obrigatório.' },
        { name: 'onClose', type: '() => void', description: 'Fechar, Esc e toque no véu. Obrigatório.' },
        { name: 'title', type: 'ReactNode', description: 'Título; nomeia o diálogo (aria-labelledby). Obrigatório.' },
        { name: 'description', type: 'ReactNode', description: 'Linha de apoio; descreve o diálogo (aria-describedby).' },
        { name: 'children', type: 'ReactNode', description: 'Conteúdo rolável.' },
        { name: 'footer', type: 'ReactNode', description: 'Rodapé com as ações, alinhadas à direita.' },
        { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Largura: 360px ou 560px.' },
        { name: 'closeLabel', type: 'string', default: "'Fechar'", description: 'Nome acessível do botão de fechar.' },
        { name: 'showClose', type: 'boolean', default: 'true', description: 'Mostra o botão de fechar.' },
        { name: 'dismissOnScrim', type: 'boolean', default: 'true', description: 'Toque no véu fecha.' },
        { name: 'initialFocusRef', type: 'RefObject<HTMLElement | null>', description: 'Recebe o foco ao abrir (padrão: Fechar).' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'aria-label', type: 'string', description: 'Nome explícito; com ele, o título não vira aria-labelledby.' },
        { name: 'className / ref', type: 'string / Ref<HTMLDivElement>', description: 'Classe e ref do cartão (role=dialog).' },
      ]}
    />
    <UblDocPropsTable
      title="UblModalSize"
      rows={[
        { name: "'sm'", type: 'UblModalSize', description: '360px: confirmações e avisos curtos.' },
        { name: "'md'", type: 'UblModalSize', description: '560px: texto corrido e formulários.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Modal> = {
  title: 'Unooblog/Componentes/Modal',
  component: Modal,
  parameters: { layout: 'padded' },
  argTypes: {
    open: { control: 'boolean', description: 'Diálogo aberto.' },
    title: { control: 'text', description: 'Título; nomeia o diálogo.' },
    description: { control: 'text', description: 'Linha de apoio; descreve o diálogo.' },
    size: { control: 'radio', options: ['sm', 'md'], description: 'Largura do diálogo.' },
    closeLabel: { control: 'text', description: 'Nome acessível do botão de fechar.' },
    showClose: { control: 'boolean', description: 'Mostra o botão de fechar.' },
    dismissOnScrim: { control: 'boolean', description: 'Toque no véu fecha.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    children: { control: false, description: 'Conteúdo rolável (a estória usa os detalhes do post).' },
    footer: { control: false, description: 'Rodapé de ações (a estória usa Cancelar e Entendi).' },
    initialFocusRef: { control: false, description: 'Elemento que recebe o foco ao abrir.' },
    onClose: { action: 'onClose' },
  },
  args: {
    open: true,
    title: 'Detalhes do post',
    description: POST.title,
    size: 'md',
    closeLabel: 'Fechar',
    showClose: true,
    dismissOnScrim: true,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ModalDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas. A abertura vem do controle
 * `open`; o `onClose` é registrado em Ações.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Modal',
  render: (args) => (
    <PhoneFrame scale={0.75} theme={args.theme}>
      <PaginaDeFundo>
        <Modal
          {...args}
          footer={
            <>
              <Button variant="ghost" onClick={args.onClose}>
                Cancelar
              </Button>
              <Button onClick={args.onClose}>Entendi</Button>
            </>
          }
        >
          <DetalhesDoPost />
        </Modal>
      </PaginaDeFundo>
    </PhoneFrame>
  ),
};

/**
 * Composição realista: a edição do perfil sobre a página do blog no navegador.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: editar perfil',
  render: () => <ModalDemo formato="desktop" inicialAberto comFormulario scale={0.6} />,
};

/**
 * As duas larguras, abertas.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['sm', 'md'] as const).map((tamanho) => (
        <div key={tamanho} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={notaEstilo}>size=&quot;{tamanho}&quot;</p>
          <ModalDemo inicialAberto size={tamanho} scale={0.6} />
        </div>
      ))}
    </div>
  ),
};

/**
 * Detalhes e formulário, no aparelho e no navegador.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>Informativo (detalhes do post)</p>
        <ModalDemo inicialAberto scale={0.6} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>Formulário (editar perfil)</p>
        <ModalDemo inicialAberto comFormulario scale={0.6} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>No navegador</p>
        <ModalDemo inicialAberto formato="desktop" scale={0.45} />
      </div>
    </div>
  ),
};

/**
 * Sem rodapé e sem descrição; véu que não fecha e sem Fechar.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>footer ausente · description ausente</p>
        <ModalDemo inicialAberto comRodape={false} comDescricao={false} scale={0.6} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>dismissOnScrim=false · showClose=false</p>
        <ModalDemo inicialAberto dismissOnScrim={false} showClose={false} scale={0.6} />
      </div>
    </div>
  ),
};

/**
 * O diálogo nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <div key={tema} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={notaEstilo}>{tema === 'light' ? 'Tema claro' : 'Tema escuro'}</p>
          <ModalDemo inicialAberto theme={tema} comFormulario scale={0.6} />
        </div>
      ))}
    </div>
  ),
};

/**
 * Abre, nomeia pelo título, prende o foco, fecha com Esc e devolve o foco ao
 * botão que abriu.
 */
export const AbrirEFechar: Story = {
  name: 'Abrir, prender o foco e fechar',
  render: () => <ModalDemo />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const abrir = tela.getByRole('button', { name: 'Abrir o diálogo' });

    await userEvent.click(abrir);

    // O diálogo se nomeia pelo título renderizado e se descreve pela descrição.
    const dialogo = await tela.findByRole('dialog', { name: 'Detalhes do post' });
    await expect(dialogo).toHaveAttribute('aria-modal', 'true');
    await expect(dialogo).toHaveAccessibleDescription(POST.title);

    // O foco inicial vai ao botão Fechar.
    await waitFor(() => expect(within(dialogo).getByRole('button', { name: 'Fechar' })).toHaveFocus());

    // O Tab dá a volta dentro do diálogo e nunca sai para o fundo.
    for (let passo = 0; passo < 5; passo += 1) {
      await userEvent.tab();
      await expect(dialogo.contains(document.activeElement)).toBe(true);
    }
    await userEvent.tab({ shift: true });
    await expect(dialogo.contains(document.activeElement)).toBe(true);

    // Esc fecha e o foco volta ao botão que abriu.
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(tela.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(abrir).toHaveFocus());
  },
};

/**
 * O toque no véu fecha o diálogo informativo; o toque no cartão não.
 */
export const FecharPeloVeu: Story = {
  name: 'Fechar pelo véu',
  render: () => <ModalDemo />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const abrir = tela.getByRole('button', { name: 'Abrir o diálogo' });

    await userEvent.click(abrir);
    const dialogo = await tela.findByRole('dialog', { name: 'Detalhes do post' });

    // Tocar dentro do cartão não fecha.
    await userEvent.click(within(dialogo).getByText('Autoria'));
    await expect(tela.getByRole('dialog')).toBeInTheDocument();

    // Tocar no véu, que é o pai do cartão, fecha.
    const veu = dialogo.parentElement as HTMLElement;
    await userEvent.click(veu);
    await waitFor(() => expect(tela.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(abrir).toHaveFocus());
  },
};
