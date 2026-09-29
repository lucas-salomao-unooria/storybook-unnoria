import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { StoryComposer } from '../../../src/unoovista/components/StoryComposer';
import { PhoneFrame } from '../../../src/unoovista/components/PhoneFrame';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UnvDocGrid,
  UnvDocCard,
  UnvDocSpecs,
  UnvDocDecisions,
  UnvDocAnatomy,
  UnvDocPractices,
  UnvDocPropsTable,
  UnvDocStage,
  UnvDocThemeSwitcher,
} from '../../../.storybook/components';
import { unvAvatars, unvGridItems } from '../fixtures';

const BAR = '#716C98';

type Tema = 'light' | 'dark';

/**
 * Prévia de demonstração: as três publicações escolhidas, lado a lado.
 */
const Previa: React.FC = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--unv-spacing-3xs)',
      height: '100%',
    }}
  >
    {unvGridItems.slice(0, 3).map((item) => (
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
 * O compositor controlado, dentro do PhoneFrame.
 */
const CompositorControlado: React.FC<{ theme?: Tema; onSubmit?: (valor: string) => void }> = ({
  theme,
  onSubmit,
}) => {
  const [legenda, setLegenda] = useState('');

  return (
    <PhoneFrame theme={theme} ariaLabel="Nova história">
      <StoryComposer
        theme={theme}
        value={legenda}
        onChange={(event) => setLegenda(event.target.value)}
        maxLength={120}
        minLength={10}
        placeholder="Por que essas três publicações?"
        avatarSrc={unvAvatars.lucasMar}
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
      badgeBrand="Unoovista"
      category="Componentes • Histórias"
      title="StoryComposer"
      description="O compositor de história com legenda: a prévia em um palco de cantos arredondados, o campo de legenda num cartão com contador “n/máximo” e a ação “Sua história” numa cápsula de ação. Conta caracteres, não unidades UTF-16: um emoji vale um."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Escrever a legenda e publicar a história em uma tela só."
    />
    <UnvDocGrid>
      <UnvDocCard icon="🖼️" title="Prévia">
        O palco recebe as mídias escolhidas em <code>children</code>: as publicações que a pessoa
        vai compartilhar, por exemplo.
      </UnvDocCard>
      <UnvDocCard icon="🔢" title="Contador em caracteres">
        O contador, <code>minLength</code> e <code>maxLength</code> medem em <em>code points</em>.
        O excesso é cortado na digitação, antes do <code>onChange</code>.
      </UnvDocCard>
      <UnvDocCard icon="🚫" title="Envio protegido">
        Abaixo de <code>minLength</code> (ou com <code>submitDisabled</code>) o envio fica
        desabilitado, e o Enter não o contorna.
      </UnvDocCard>
      <UnvDocCard icon="🛡️" title="Sem perder texto">
        O campo só é controlado quando o consumidor passa <code>value</code>. Sem ele, o DOM guarda
        o texto — como o preenchimento automático espera.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UnvDocSpecs
      component="StoryComposer"
      layout="Coluna · palco, legenda e envio"
      specs={[
        { label: 'Tela', value: '--unv-color-background-secondary' },
        { label: 'Palco', value: '--unv-radius-l · margem de 16px' },
        { label: 'Legenda', value: 'background-primary · contorno border-control' },
        { label: 'Texto da legenda', value: 'body-lg · Open Sans 400' },
        { label: 'Contador', value: 'caption-md · text-secondary · tabular' },
        { label: 'Envio', value: 'Cápsula · action-primary · 44px' },
        { label: 'Rótulo do envio', value: 'title-sm · text-on-action' },
        { label: 'Foco', value: '2px em action-primary' },
      ]}
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Extensão sem par na Plataforma Unooria',
          detail:
            'a Plataforma não tem compositor de história. O palco, o cartão e a cápsula usam só degraus do módulo.',
        },
        {
          subject: 'Cartão da legenda em superfície primária',
          detail:
            'o cartão é conteúdo da tela e por isso fica em background-primary; background-elevated é reservado às camadas flutuantes. O placeholder mede mais de 4,5:1 nos dois temas. O contorno usa border-control (4,96:1 no claro, 8,64:1 no escuro).',
        },
        {
          subject: 'Envio em cápsula de ação',
          detail:
            'o envio usa action-primary com text-on-action (4,88:1 no claro, 8,27:1 no escuro). Desabilitado, usa action-disabled com text-secondary (5,0:1 e 4,7:1).',
        },
        {
          subject: 'Rótulos em pt-BR e sem tema padrão',
          detail:
            'label passa a “Legenda da história” e submitLabel a “Sua história”. A prop theme deixa de ter padrão escuro: sem ela, o componente herda o tema do contêiner.',
        },
        {
          subject: 'Contagem em code points',
          detail:
            'os atributos nativos maxlength e minlength medem UTF-16 e fariam o emoji valer dois. O teto é aplicado no onChange, cortando o excesso sem partir um emoji ao meio.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Formulário com palco opcional, campo de legenda e barra de envio."
    />
    <UnvDocAnatomy
      zones={[
        { name: 'Palco', role: 'Prévia da história; só existe com children.', token: '--unv-radius-l' },
        { name: 'Cartão da legenda', role: 'Textarea com contorno de controle e foco de 2px.', token: '--unv-color-border-control' },
        { name: 'Contador', role: '“n/máximo”, ligado ao campo por aria-describedby.', token: '--unv-color-text-secondary' },
        { name: 'Envio', role: 'Botão submit em cápsula, com o avatar e o rótulo.', token: '--unv-color-action-primary' },
      ]}
    />
    <UnvDocStage label="Compositor controlado" surface="secondary" padding={16}>
      <CompositorControlado />
    </UnvDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de estados"
      description="Vazio, abaixo do mínimo, dentro dos limites e no teto."
    />
    <UnvDocStage label="Estados do envio" surface="secondary" align="flex-start" padding={16}>
      {[
        { legenda: '', rotulo: 'Vazio · envio desabilitado' },
        { legenda: 'Curto', rotulo: 'Abaixo do mínimo' },
        { legenda: 'Os três que mais ajudaram a turma.', rotulo: 'Pronto para enviar' },
      ].map((estado) => (
        <div key={estado.rotulo} style={{ display: 'grid', gap: 8, width: 300 }}>
          <span style={{ fontSize: 12, fontWeight: 600 }}>{estado.rotulo}</span>
          <div style={{ height: 240, display: 'flex' }}>
            <StoryComposer
              defaultValue={estado.legenda}
              maxLength={80}
              minLength={10}
              avatarSrc={unvAvatars.lucasMar}
            />
          </div>
        </div>
      ))}
    </UnvDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UnvDocPractices
      dos={[
        'Passar value e onChange juntos, ou nenhum dos dois.',
        'Escolher um maxLength que caiba na legenda mais longa que o produto aceita.',
        'Usar minLength quando a legenda for obrigatória — o envio bloqueia sozinho.',
        'Mostrar em children exatamente o que será publicado.',
      ]}
      donts={[
        'Passar os atributos maxlength e minlength nativos: eles medem UTF-16.',
        'Guardar o texto em estado próprio e passar value sem onChange.',
        'Contar o tamanho da legenda fora do componente com .length.',
        'Trocar o envio por um botão sem rótulo: o nome acessível vem do texto.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Tela, cartão da legenda e envio acompanham o tema."
    />
    <UnvDocThemeSwitcher surface="secondary" padding={16}>
      {(theme) => <CompositorControlado key={theme} />}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UnvDocPropsTable
      title="StoryComposer"
      rows={[
        { name: 'value', type: 'string', description: 'Legenda. Informada, o campo é controlado.' },
        { name: 'defaultValue', type: 'string', description: 'Texto inicial quando value não é informado.' },
        { name: 'onChange', type: '(event: ChangeEvent<HTMLTextAreaElement>) => void', description: 'A cada alteração.' },
        { name: 'maxLength', type: 'number', description: 'Máximo de caracteres (code points); aparece no contador. Obrigatório.' },
        { name: 'minLength', type: 'number', description: 'Mínimo de caracteres (code points) para enviar.' },
        { name: 'placeholder', type: 'string', default: "'Escreva uma legenda…'", description: 'Texto de espera.' },
        { name: 'label', type: 'string', default: "'Legenda da história'", description: 'Nome acessível do campo.' },
        { name: 'name', type: 'string', description: 'Atributo name do campo, para o FormData.' },
        { name: 'submitLabel', type: 'React.ReactNode', default: "'Sua história'", description: 'Rótulo do envio.' },
        { name: 'onSubmit', type: '(value: string) => void', description: 'No envio, com o texto da legenda.' },
        { name: 'submitDisabled', type: 'boolean', default: 'false', description: 'Desabilita o envio, além do bloqueio por minLength.' },
        { name: 'avatarSrc', type: 'string', description: 'Avatar da pessoa no botão de envio.' },
        { name: 'children', type: 'React.ReactNode', description: 'Prévia da história, acima da legenda.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof StoryComposer> = {
  title: 'Unoovista/Componentes/StoryComposer',
  component: StoryComposer,
  parameters: { layout: 'padded' },
  argTypes: {
    value: { control: 'text', description: 'Legenda controlada. Vazio deixa o campo não controlado.' },
    defaultValue: { control: 'text', description: 'Texto inicial (não controlado).' },
    maxLength: { control: { type: 'number', min: 1 }, description: 'Máximo de caracteres.' },
    minLength: { control: { type: 'number', min: 0 }, description: 'Mínimo para enviar.' },
    placeholder: { control: 'text', description: 'Texto de espera.' },
    label: { control: 'text', description: 'Nome acessível do campo.' },
    name: { control: 'text', description: 'Atributo name do campo.' },
    submitLabel: { control: 'text', description: 'Rótulo do envio.' },
    submitDisabled: { control: 'boolean', description: 'Envio desabilitado.' },
    avatarSrc: { control: 'text', description: 'Avatar.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    onChange: { action: 'onChange' },
    onSubmit: { action: 'onSubmit' },
  },
  args: {
    defaultValue: '',
    maxLength: 120,
    minLength: 10,
    placeholder: 'Por que essas três publicações?',
    label: 'Legenda da história',
    name: 'legenda',
    submitLabel: 'Sua história',
    submitDisabled: false,
    avatarSrc: unvAvatars.lucasMar,
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
 * Playground com todas as propriedades do StoryComposer expostas. Passe `value`
 * para vê-lo controlado; vazio, o campo é não controlado.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do StoryComposer',
  render: (args) => {
    const { value, ...resto } = args;
    const controle = value ? { value } : {};

    return (
      <PhoneFrame theme={args.theme} ariaLabel="Nova história">
        <StoryComposer {...resto} {...controle}>
          <Previa />
        </StoryComposer>
      </PhoneFrame>
    );
  },
};

/**
 * O compositor controlado, dentro do PhoneFrame.
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
    const campo = tela.getByRole('textbox', { name: 'Legenda da história' });
    const enviar = tela.getByRole('button', { name: 'Sua história' });

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
    <div style={{ width: 320, height: 360, display: 'flex' }}>
      <StoryComposer
        maxLength={80}
        defaultValue="Os três que mais ajudaram a turma."
        onSubmit={args.onSubmit}
      />
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    const campo = tela.getByRole('textbox', { name: 'Legenda da história' });

    await expect(tela.getByText('34/80')).toBeInTheDocument();
    await userEvent.type(campo, '!');
    await expect(tela.getByText('35/80')).toBeInTheDocument();
    await userEvent.click(tela.getByRole('button', { name: 'Sua história' }));
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
    <div style={{ width: 320, height: 360, display: 'flex' }}>
      <StoryComposer maxLength={5} minLength={3} onSubmit={args.onSubmit} />
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const tela = within(canvasElement);
    const campo = tela.getByRole('textbox', { name: 'Legenda da história' });
    const enviar = tela.getByRole('button', { name: 'Sua história' });

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
