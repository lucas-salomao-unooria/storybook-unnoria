import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, waitFor, within } from 'storybook/test';
import { Avatar, uglInitials } from '../../../src/unoogaleria/components/Avatar';
import { SearchField } from '../../../src/unoogaleria/components/SearchField';
import { ListGroup, ListRow } from '../../../src/unoogaleria/components/ListRow';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UglDocGrid,
  UglDocCard,
  UglDocSpecs,
  UglDocDecisions,
  UglDocAnatomy,
  UglDocStage,
  UglDocPractices,
  UglDocThemeSwitcher,
  UglDocPropsTable,
} from '../../../.storybook/components';
import type { UglPerson } from '../../../src/unoogaleria/media';
import { uglMediaItems, uglPeople } from '../fixtures';

const BAR = '#716C98';

/** Pessoas sem retrato, para mostrar as iniciais (declaradas aqui). */
const NO_PORTRAIT: UglPerson[] = [
  { id: 'gabriela', name: 'Gabriela Nunes' },
  { id: 'heitor', name: 'Heitor' },
  { id: 'icaro', name: 'Ícaro Andrade Lima' },
];

const photosOf = (personId: string) =>
  uglMediaItems.filter((item) => item.people?.includes(personId)).length;

/**
 * Fileira de pessoas da busca: retrato grande e nome abaixo. O nome está
 * escrito, então o retrato é decorativo.
 */
const PeopleRow: React.FC = () => {
  const [chosen, setChosen] = useState<string | null>(null);

  return (
    <ul
      aria-label="Pessoas"
      style={{
        display: 'flex',
        gap: 'var(--ugl-spacing-l)',
        margin: 0,
        padding: '4px var(--ugl-gutter)',
        overflowX: 'auto',
        scrollbarWidth: 'thin',
        listStyle: 'none',
      }}
    >
      {uglPeople.map((person) => (
        <li key={person.id}>
          <button
            type="button"
            aria-pressed={chosen === person.id}
            onClick={() => setChosen((current) => (current === person.id ? null : person.id))}
            style={{
              display: 'grid',
              justifyItems: 'center',
              gap: 'var(--ugl-spacing-xxs)',
              padding: 'var(--ugl-spacing-3xs)',
              border: 'none',
              borderRadius: 'var(--ugl-radius-s)',
              background: 'none',
              color: 'var(--ugl-color-text-primary)',
              cursor: 'pointer',
              fontFamily: 'var(--ugl-font-sans)',
            }}
          >
            <Avatar src={person.avatarSrc} name={person.name} size="lg" ring={chosen === person.id} decorative />
            <span className="ugl-text ugl-text--caption-strong">{person.name}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

/**
 * Tela "Pessoas" no aparelho: fileira de retratos e lista com contagem.
 */
const PeopleScreen: React.FC = () => (
  <div
    style={{
      display: 'grid',
      alignContent: 'start',
      gap: 'var(--ugl-spacing-xl)',
      height: '100%',
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      padding: 'calc(var(--ugl-safe-area-top) + var(--ugl-spacing-xs)) 0 var(--ugl-spacing-xl)',
      boxSizing: 'border-box',
      background: 'var(--ugl-color-background-secondary)',
    }}
  >
    <div style={{ display: 'grid', gap: 'var(--ugl-spacing-m)', padding: '0 var(--ugl-gutter)' }}>
      <h1 className="ugl-text ugl-text--display">Pessoas</h1>
      <SearchField placeholder="Buscar pessoas" ariaLabel="Buscar pessoas" />
    </div>
    <PeopleRow />
    <ListGroup title="Todas as pessoas">
      {[...uglPeople, ...NO_PORTRAIT].map((person) => (
        <ListRow
          key={person.id}
          title={
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--ugl-spacing-m)' }}>
              <Avatar src={person.avatarSrc} name={person.name} size="sm" decorative />
              {person.name}
            </span>
          }
          detail={photosOf(person.id)}
          onClick={() => undefined}
        />
      ))}
    </ListGroup>
  </div>
);

/**
 * Página de documentação rica do componente Avatar.
 */
const AvatarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Pessoas"
      title="Avatar"
      description="Retrato redondo de uma pessoa, em 32, 48 ou 64px. Sem retrato — ou quando ele falha —, mostra as iniciais com o mesmo nome acessível. O anel opcional marca a pessoa escolhida."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Pessoas reconhecidas, contatos e marcações."
    />
    <UglDocGrid>
      <UglDocCard icon="🧑" title="Pessoas na busca">
        Retrato grande (<code>lg</code>) com o nome escrito abaixo — aí o retrato é{' '}
        <code>decorative</code>, para o nome não ser lido duas vezes.
      </UglDocCard>
      <UglDocCard icon="📤" title="Contatos do compartilhamento">
        Retrato médio (<code>md</code>) num botão “Enviar para Ana”.
      </UglDocCard>
      <UglDocCard icon="🔤" title="Iniciais honestas">
        Primeira letra do primeiro e do último nome, por code point e em caixa alta pt-BR:
        “Ícaro Andrade Lima” vira “ÍL”.
      </UglDocCard>
      <UglDocCard icon="⭕" title="Anel de destaque">
        <code>ring</code> desenha 2px em action-primary afastados 2px do retrato, sem mudar a
        caixa — a fileira não pula ao escolher.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UglDocSpecs
      component="Avatar"
      layout="Círculo · 32/48/64px"
      specs={[
        { label: 'Diâmetros', value: '--ugl-avatar-sm · -md · -lg' },
        { label: 'Fundo das iniciais', value: '--ugl-color-background-tertiary' },
        { label: 'Iniciais', value: '--ugl-color-text-accent · 12/18/24px' },
        { label: 'Anel', value: '2px --ugl-color-action-primary, afastado 2px' },
        { label: 'Imagem', value: 'object-fit: cover · loading="lazy"' },
        { label: 'Nome acessível', value: 'alt={name} · role="img" nas iniciais' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Cai nas iniciais quando o retrato falha',
          detail:
            'o componente lembra qual src falhou (onError) e mostra as iniciais; trocar o src tenta de novo. É o único motivo de o Avatar ser de cliente.',
        },
        {
          subject: 'Iniciais por code point',
          detail:
            'Array.from pega a primeira letra inteira (acentuada ou emoji), e toLocaleUpperCase("pt-BR") acerta a caixa. uglInitials é exportado para quem precisar do mesmo cálculo.',
        },
        {
          subject: 'Contraste das iniciais',
          detail:
            'text-accent sobre background-tertiary passa de 4,5:1 nos dois temas; o fundo é o mesmo da mídia ainda não carregada, para o avatar não piscar de cor ao carregar.',
        },
        {
          subject: 'Anel por outline',
          detail:
            '--ugl-avatar-ring-width e --ugl-avatar-ring-gap (2px cada) no topo do CSS; outline com afastamento não mexe no layout e deixa o vão transparente sobre qualquer superfície.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UglDocAnatomy
      zones={[
        { name: 'Círculo', role: 'Caixa do diâmetro, com o fundo das iniciais.', token: '--ugl-avatar-* · --ugl-color-background-tertiary' },
        { name: 'Retrato', role: '<img> com alt = nome (vazio se decorativo).', token: 'object-fit: cover' },
        { name: 'Iniciais', role: 'Sem retrato: role="img" com aria-label = nome.', token: '--ugl-color-text-accent' },
        { name: 'Anel', role: 'Destaque opcional, fora da caixa.', token: '--ugl-color-action-primary' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Retrato e iniciais nos três diâmetros, com e sem anel."
    />
    <UglDocStage label="Retrato" gap={20}>
      <Avatar src={uglPeople[0].avatarSrc} name={uglPeople[0].name} size="sm" />
      <Avatar src={uglPeople[1].avatarSrc} name={uglPeople[1].name} size="md" />
      <Avatar src={uglPeople[2].avatarSrc} name={uglPeople[2].name} size="lg" />
      <Avatar src={uglPeople[3].avatarSrc} name={uglPeople[3].name} size="lg" ring />
    </UglDocStage>
    <UglDocStage label="Iniciais" gap={20}>
      <Avatar name={NO_PORTRAIT[0].name} size="sm" />
      <Avatar name={NO_PORTRAIT[1].name} size="md" />
      <Avatar name={NO_PORTRAIT[2].name} size="lg" />
      <Avatar name={NO_PORTRAIT[0].name} size="lg" ring />
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UglDocPractices
      dos={[
        'Passar o nome completo: ele é o texto alternativo e a origem das iniciais.',
        'Usar decorative quando o nome já está escrito ao lado.',
        'Usar ring para a pessoa escolhida numa fileira, junto com aria-pressed no botão.',
        'Deixar o avatar dentro de um botão quando ele for tocável.',
      ]}
      donts={[
        'Deixar o nome vazio: o retrato fica sem nome acessível.',
        'Usar ring como único sinal de escolha.',
        'Esticar o retrato para diâmetros fora de --ugl-avatar-*.',
        'Pôr foto de terceiros no pacote: o retrato entra sempre por src.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Fundo das iniciais, texto e anel acompanham data-ugl-theme."
    />
    <UglDocThemeSwitcher>
      {() => (
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <Avatar src={uglPeople[4].avatarSrc} name={uglPeople[4].name} size="lg" ring />
          <Avatar name={NO_PORTRAIT[0].name} size="lg" />
          <Avatar name={NO_PORTRAIT[1].name} size="md" ring />
          <Avatar name={NO_PORTRAIT[2].name} size="sm" />
        </div>
      )}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UglDocPropsTable
      title="Avatar"
      rows={[
        { name: 'name', type: 'string', description: 'Nome: texto alternativo e origem das iniciais. Obrigatório.' },
        { name: 'src', type: 'string', description: 'Retrato; sem ele, ou se falhar, as iniciais.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '32, 48 ou 64px.' },
        { name: 'ring', type: 'boolean', default: 'false', description: 'Anel de destaque de 2px.' },
        { name: 'decorative', type: 'boolean', default: 'false', description: 'Tira o avatar da árvore de acessibilidade.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: 'className / style / ...', type: 'React.HTMLAttributes<HTMLSpanElement>', description: 'Demais atributos da raiz.' },
      ]}
    />
    <UglDocPropsTable
      title="Exportações públicas"
      rows={[
        { name: 'UglAvatarSize', type: "'sm' | 'md' | 'lg'", description: 'Diâmetros.' },
        { name: 'uglInitials', type: '(name: string) => string', description: 'Iniciais por code point, em caixa alta pt-BR.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Avatar> = {
  title: 'Unoogaleria/Componentes/Avatar',
  component: Avatar,
  parameters: { layout: 'padded' },
  argTypes: {
    src: {
      control: 'select',
      options: [undefined, ...uglPeople.map((person) => person.avatarSrc)],
      description: 'Retrato (vazio = iniciais).',
    },
    name: { control: 'text', description: 'Nome da pessoa.' },
    size: { control: 'radio', options: ['sm', 'md', 'lg'], description: 'Diâmetro.' },
    ring: { control: 'boolean', description: 'Anel de destaque.' },
    decorative: { control: 'boolean', description: 'Decorativo.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    src: uglPeople[0].avatarSrc,
    name: uglPeople[0].name,
    size: 'lg',
    ring: false,
    decorative: false,
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <AvatarDocumentationPage />,
};

/**
 * Playground com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Avatar',
  render: (args) => (
    <UglDocStage theme={args.theme ?? 'light'} padding={40}>
      <Avatar {...args} />
    </UglDocStage>
  ),
};

/**
 * A tela Pessoas no aparelho: fileira de retratos e lista com as iniciais.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: pessoas',
  parameters: { layout: 'centered' },
  render: () => (
    <PhoneFrame scale={0.75} ariaLabel="Galeria — pessoas">
      <PeopleScreen />
    </PhoneFrame>
  ),
};

/**
 * Retrato, iniciais e anel.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <UglDocStage gap={20}>
      <Avatar src={uglPeople[0].avatarSrc} name={uglPeople[0].name} />
      <Avatar name={NO_PORTRAIT[0].name} />
      <Avatar src={uglPeople[1].avatarSrc} name={uglPeople[1].name} ring />
      <Avatar name={NO_PORTRAIT[2].name} ring />
    </UglDocStage>
  ),
};

/**
 * Os três diâmetros.
 */
export const Tamanhos: Story = {
  render: () => (
    <UglDocStage gap={20}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Avatar key={size} src={uglPeople[2].avatarSrc} name={uglPeople[2].name} size={size} />
      ))}
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Avatar key={`i-${size}`} name={NO_PORTRAIT[0].name} size={size} />
      ))}
    </UglDocStage>
  ),
};

/**
 * Com retrato, sem retrato, retrato que falhou, decorativo e com anel.
 */
export const Estados: Story = {
  render: () => (
    <UglDocStage gap={20}>
      <Avatar src={uglPeople[5].avatarSrc} name={uglPeople[5].name} size="lg" />
      <Avatar name={NO_PORTRAIT[1].name} size="lg" />
      <Avatar src="/unoogaleria/retrato-inexistente.svg" name="Retrato que não carregou" size="lg" />
      <Avatar src={uglPeople[0].avatarSrc} name={uglPeople[0].name} size="lg" decorative />
      <Avatar src={uglPeople[3].avatarSrc} name={uglPeople[3].name} size="lg" ring />
    </UglDocStage>
  ),
};

/**
 * Os dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['light', 'dark'] as const).map((theme) => (
        <UglDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} gap={20}>
          <Avatar src={uglPeople[0].avatarSrc} name={uglPeople[0].name} size="lg" ring />
          <Avatar name={NO_PORTRAIT[0].name} size="lg" />
          <Avatar name={NO_PORTRAIT[2].name} size="md" />
        </UglDocStage>
      ))}
    </div>
  ),
};

/**
 * Nome acessível: `alt` no retrato, `role="img"` nas iniciais, nada no
 * decorativo, e o retrato que falha cai nas iniciais com o mesmo nome.
 */
export const NomeAcessivel: Story = {
  name: 'Interação: nome acessível e retrato que falha',
  render: () => (
    <UglDocStage gap={20}>
      <Avatar src={uglPeople[0].avatarSrc} name={uglPeople[0].name} />
      <Avatar name={NO_PORTRAIT[2].name} />
      <Avatar src={uglPeople[1].avatarSrc} name={uglPeople[1].name} decorative />
      <Avatar src="/unoogaleria/retrato-inexistente.svg" name={NO_PORTRAIT[1].name} />
    </UglDocStage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const portrait = canvas.getByRole('img', { name: uglPeople[0].name });
    await expect(portrait.tagName).toBe('IMG');

    const initials = canvas.getByRole('img', { name: NO_PORTRAIT[2].name });
    await expect(initials).toHaveTextContent(uglInitials(NO_PORTRAIT[2].name));
    await expect(uglInitials(NO_PORTRAIT[2].name)).toBe('ÍL');

    await expect(canvas.queryByRole('img', { name: uglPeople[1].name })).toBeNull();

    await waitFor(
      async () => {
        const fallback = canvas.getByRole('img', { name: NO_PORTRAIT[1].name });
        await expect(fallback.tagName).toBe('SPAN');
        await expect(fallback).toHaveTextContent('H');
      },
      { timeout: 4000 }
    );
  },
};
