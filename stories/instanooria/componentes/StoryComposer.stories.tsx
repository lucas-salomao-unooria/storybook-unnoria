import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { StoryComposer } from '../../../src/instanooria/components/StoryComposer';
import { PhoneFrame } from '../../../src/instanooria/components/PhoneFrame';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  InstaDocCard,
  InstaDocGrid,
  InstaDocFigmaSpecs,
  InstaDocDeviations,
  InstaDocPractices,
  InstaDocStage,
  InstaDocThemeSwitcher,
  InstaDocPropsTable,
} from '../../../.storybook/components';
import { instaAvatars, instaGridItems } from '../fixtures';

type Tema = 'light' | 'dark';

/**
 * Prévia de demonstração: os três posts escolhidos, lado a lado.
 */
const Previa: React.FC = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, height: '100%' }}>
    {instaGridItems.slice(0, 3).map((item) => (
      <img
        key={item.id}
        src={item.src}
        alt={item.alt}
        style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
      />
    ))}
  </div>
);

/**
 * O compositor controlado, dentro do PhoneFrame — como na missão.
 */
const CompositorControlado: React.FC<{ theme?: Tema; onSubmit?: (valor: string) => void }> = ({
  theme = 'dark',
  onSubmit,
}) => {
  const [legenda, setLegenda] = useState('');

  return (
    <PhoneFrame theme={theme} ariaLabel="Novo story">
      <StoryComposer
        theme={theme}
        value={legenda}
        onChange={(event) => setLegenda(event.target.value)}
        maxLength={120}
        minLength={10}
        placeholder="Por que esses três posts?"
        avatarSrc={instaAvatars.jacob_w}
        onSubmit={onSubmit}
      >
        <Previa />
      </StoryComposer>
    </PhoneFrame>
  );
};

/**
 * Página de documentação rica do componente StoryComposer.
 */
const StoryComposerDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Instanooria"
      category="Componentes • Extensões"
      title="StoryComposer"
      description="O compositor de Story com legenda, como no app real: a prévia no palco, o campo de legenda com contador “{n}/{max}” e a barra inferior com o botão “Seu story” — avatar e rótulo — como ação de envio. Extensão: o arquivo publica só o visualizador de Story."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Escrever a legenda e publicar."
    />
    <InstaDocGrid>
      <InstaDocCard icon="🖼️" title="Prévia livre">
        <code>children</code> ocupa o palco com raio de 8px do visualizador — as mídias escolhidas,
        por exemplo.
      </InstaDocCard>
      <InstaDocCard icon="🔢" title="Contador">
        “{'{n}'}/{'{max}'}” sob o campo, em <strong>caracteres</strong>: um emoji conta um. O campo
        corta o que passa de <code>maxLength</code>; abaixo de <code>minLength</code>, o envio fica
        desabilitado.
      </InstaDocCard>
      <InstaDocCard icon="📤" title="“Seu story”">
        O envio é o botão do app real, com o avatar da pessoa. <code>onSubmit</code> recebe o texto
        da legenda.
      </InstaDocCard>
      <InstaDocCard icon="🧷" title="Controlado só com value">
        Sem <code>value</code>, quem guarda o texto é o DOM (<code>defaultValue</code>) — a seção
        4.5.1: um campo que perde texto é pior que um campo feio.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="O palco, a barra e a pílula vêm do visualizador de Story."
    />
    <InstaDocFigmaSpecs
      nodeId="0:2236"
      frameName="Instagram Story → Chat Bar (0:2254) · Send Message (0:2266)"
      specs={[
        { label: 'Palco', value: 'raio 8px (--insta-radius-m)' },
        { label: 'Campo', value: 'fill-field · raio 10px · Body/Large' },
        { label: 'Contador', value: 'Caption/Medium · text-secondary' },
        { label: 'Barra inferior', value: '94px (Chat Bar)' },
        { label: '“Seu story”', value: '43px · raio 21,5px · avatar de 32px' },
        { label: 'Rótulo', value: 'Title/Small · 14px' },
      ]}
    />
    <InstaDocDeviations
      items={[
        {
          subject: 'Sem quadro no arquivo de origem',
          detail:
            'o arquivo publica só o visualizador de Story (0:543 / 0:2236). O compositor reaproveita o palco com raio de 8px, a barra de 94px (Chat Bar, 0:2254) e a pílula de 43px com raio de 21,5px (Send Message, 0:2266), que vira o botão “Seu story”.',
        },
        {
          subject: 'Conta caracteres, não unidades UTF-16',
          detail:
            'contador, minLength e maxLength medem em code points (Array.from(texto).length), e o campo não usa os atributos nativos maxlength/minlength, que medem em UTF-16 e fariam o emoji valer dois. O teto é aplicado na digitação. Pedido da A Seleção (exp07ef1b): o servidor dela conta code points, e o contador visível discordava da régua com emoji.',
        },
        {
          subject: 'Legenda num campo, não sobre a mídia',
          detail:
            'no app o texto do Story é desenhado sobre a imagem. Aqui a legenda tem campo próprio, com contador, para ser lida e corrigida antes de publicar.',
        },
        {
          subject: 'Só “Seu story”',
          detail:
            'o app também oferece “Melhores amigos” e a seta de envio. A extensão tem uma ação só — a seta não está no registro, e nenhum glifo foi desenhado.',
        },
        {
          subject: 'Pílula com contorno',
          detail:
            'o campo “Send Message” usa branco a 40% (overlay-onmedia), que some no tema claro. O botão usa o contorno do Button secundário, visível nos dois temas.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia do Componente"
      description="Palco, legenda com contador e a barra “Seu story”."
    />
    <InstaDocStage label="Compositor controlado (mínimo de 10, máximo de 120)" align="flex-start">
      <CompositorControlado />
    </InstaDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz de Variantes e Estados"
      description="Não controlado com texto inicial e envio desabilitado pelo produto."
    />
    <InstaDocStage label="Estados" align="flex-start">
      <div style={{ width: 300, height: 300 }}>
        <StoryComposer
          maxLength={80}
          defaultValue="Os três que mais ajudaram a turma."
          avatarSrc={instaAvatars.jacob_w}
        />
      </div>
      <div style={{ width: 300, height: 300 }}>
        <StoryComposer maxLength={80} submitDisabled avatarSrc={instaAvatars.jacob_w} />
      </div>
    </InstaDocStage>

    <UnooriaDocSectionHeader title="5. Boas Práticas" description="Regras de uso do compositor." />
    <InstaDocPractices
      dos={[
        'Passar value e onChange juntos, ou nenhum dos dois.',
        'Usar minLength para não publicar legenda vazia.',
        'Mostrar a prévia do que vai ser publicado em children.',
        'Ligar submitDisabled enquanto a publicação espera o servidor.',
      ]}
      donts={[
        'Passar value sem onChange: o campo congela.',
        'Esconder o contador: o limite existe para ser visto.',
        'Desenhar a seta de envio à mão — ela não está no registro.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="Nasce escuro, como o visualizador; o tema claro também é publicado."
    />
    <InstaDocThemeSwitcher initial="dark">
      {(activeTheme) => <CompositorControlado key={activeTheme} theme={activeTheme} />}
    </InstaDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa de Props da API"
      description="Contrato público do componente StoryComposer."
    />
    <InstaDocPropsTable
      title="StoryComposer"
      rows={[
        { name: 'value', type: 'string', description: 'Legenda. Informada, o campo é controlado.' },
        { name: 'defaultValue', type: 'string', description: 'Texto inicial sem value.' },
        { name: 'onChange', type: '(event: ChangeEvent<HTMLTextAreaElement>) => void', description: 'A cada alteração.' },
        { name: 'maxLength', type: 'number', description: 'Máximo de caracteres (code points: um emoji conta um); aparece no contador. Obrigatório.' },
        { name: 'minLength', type: 'number', description: 'Mínimo de caracteres (code points) para enviar.' },
        { name: 'placeholder', type: 'string', default: "'Escreva uma legenda…'", description: 'Texto de espera.' },
        { name: 'label', type: 'string', default: "'Legenda do story'", description: 'Nome acessível do campo.' },
        { name: 'name', type: 'string', description: 'name do campo, para o FormData.' },
        { name: 'submitLabel', type: 'React.ReactNode', default: "'Seu story'", description: 'Rótulo do envio.' },
        { name: 'onSubmit', type: '(value: string) => void', description: 'No envio, com o texto.' },
        { name: 'submitDisabled', type: 'boolean', default: 'false', description: 'Desabilita o envio.' },
        { name: 'avatarSrc', type: 'string', description: 'Avatar no botão “Seu story”.' },
        { name: 'children', type: 'React.ReactNode', description: 'Prévia do Story.' },
        { name: 'theme', type: "'light' | 'dark'", default: "'dark'", description: 'Tema visual.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof StoryComposer> = {
  title: 'Instanooria/Componentes/StoryComposer',
  component: StoryComposer,
  parameters: { layout: 'padded' },
  argTypes: {
    defaultValue: { control: 'text', description: 'Texto inicial (não controlado).' },
    maxLength: { control: { type: 'number', min: 1 }, description: 'Máximo de caracteres.' },
    minLength: { control: { type: 'number', min: 0 }, description: 'Mínimo para enviar.' },
    placeholder: { control: 'text', description: 'Texto de espera.' },
    label: { control: 'text', description: 'Nome acessível do campo.' },
    submitLabel: { control: 'text', description: 'Rótulo do envio.' },
    submitDisabled: { control: 'boolean', description: 'Envio desabilitado.' },
    avatarSrc: { control: 'text', description: 'Avatar.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onChange: { action: 'onChange' },
    onSubmit: { action: 'onSubmit' },
  },
  args: {
    defaultValue: '',
    maxLength: 120,
    minLength: 10,
    placeholder: 'Por que esses três posts?',
    label: 'Legenda do story',
    submitLabel: 'Seu story',
    submitDisabled: false,
    avatarSrc: instaAvatars.jacob_w,
    theme: 'dark',
  },
};

export default meta;

type Story = StoryObj<typeof StoryComposer>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <StoryComposerDocumentationPage />,
};

/**
 * Playground com todas as propriedades do StoryComposer expostas (não controlado).
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do StoryComposer',
  render: (args) => (
    <PhoneFrame theme={args.theme} ariaLabel="Novo story">
      <StoryComposer {...args}>
        <Previa />
      </StoryComposer>
    </PhoneFrame>
  ),
};

/**
 * O compositor da missão, controlado, dentro do PhoneFrame.
 */
export const EmContexto: Story = {
  name: '🎨 Em Contexto',
  render: () => <CompositorControlado />,
};

/**
 * Contador, bloqueio por `minLength` e envio com o texto — no modo controlado.
 */
export const Estados: Story = {
  args: { onSubmit: fn() },
  render: (args) => <CompositorControlado onSubmit={args.onSubmit} />,
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    const campo = tela.getByRole('textbox', { name: 'Legenda do story' });
    const enviar = tela.getByRole('button', { name: 'Seu story' });

    await expect(campo).toHaveAccessibleDescription('0/120');
    await expect(enviar).toBeDisabled();

    await userEvent.type(campo, 'Curto');
    await expect(tela.getByText('5/120')).toBeInTheDocument();
    await expect(enviar).toBeDisabled();

    await userEvent.type(campo, ' demais? Não mais.');
    await expect(enviar).toBeEnabled();
    await userEvent.click(enviar);
    await expect(args.onSubmit).toHaveBeenCalledWith('Curto demais? Não mais.');
  },
};

/**
 * Não controlado: o texto inicial vive no DOM e o envio lê o campo.
 */
export const NaoControlado: Story = {
  args: { onSubmit: fn() },
  render: (args) => (
    <div style={{ width: 320, height: 360 }}>
      <StoryComposer
        maxLength={80}
        defaultValue="Os três que mais ajudaram a turma."
        onSubmit={args.onSubmit}
      />
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    const campo = tela.getByRole('textbox', { name: 'Legenda do story' });

    await expect(tela.getByText('34/80')).toBeInTheDocument();
    await userEvent.type(campo, '!');
    await expect(tela.getByText('35/80')).toBeInTheDocument();
    await userEvent.click(tela.getByRole('button', { name: 'Seu story' }));
    await expect(args.onSubmit).toHaveBeenCalledWith('Os três que mais ajudaram a turma.!');
  },
};

/**
 * Um emoji é UM caractere: no contador, no mínimo e no teto.
 */
export const ContaCaracteres: Story = {
  name: 'Conta caracteres (emoji vale um)',
  args: { onSubmit: fn() },
  render: (args) => (
    <div style={{ width: 320, height: 360 }}>
      <StoryComposer maxLength={5} minLength={3} onSubmit={args.onSubmit} />
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    const campo = tela.getByRole('textbox', { name: 'Legenda do story' });
    const enviar = tela.getByRole('button', { name: 'Seu story' });

    await userEvent.type(campo, 'a🎉');
    await expect(tela.getByText('2/5')).toBeInTheDocument();
    await expect(enviar).toBeDisabled();

    await userEvent.type(campo, 'b🎉cd');
    await expect(tela.getByText('5/5')).toBeInTheDocument();
    await expect(campo).toHaveValue('a🎉b🎉c');
    await userEvent.click(enviar);
    await expect(args.onSubmit).toHaveBeenCalledWith('a🎉b🎉c');
  },
};
