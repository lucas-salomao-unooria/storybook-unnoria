import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { SectionHeader } from '../../../src/unoogaleria/components/SectionHeader';
import { MediaGrid } from '../../../src/unoogaleria/components/MediaGrid';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import { TopBar } from '../../../src/unoogaleria/components/TopBar';
import { uglGroupMedia } from '../../../src/unoogaleria/media';
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
import { uglDemoNow, uglMediaItems } from '../fixtures';

const BAR = '#716C98';

/** Os grupos por dia da biblioteca de demonstração. */
const GRUPOS = uglGroupMedia(uglMediaItems, 'day', { now: uglDemoNow });
const [HOJE, ONTEM] = GRUPOS;

/**
 * Cabeçalho com "Selecionar" / "Desmarcar" controlado pelo produto.
 */
const CabecalhoComSelecao: React.FC<{ theme?: 'light' | 'dark'; onToggle?: (todos: boolean) => void }> = ({
  theme,
  onToggle,
}) => {
  const [todos, setTodos] = useState(false);
  const rotulo = todos ? 'Desmarcar' : 'Selecionar';
  return (
    <div style={{ width: 390 }}>
      <SectionHeader
        theme={theme}
        title={HOJE.title}
        subtitle={HOJE.subtitle}
        action={{
          label: rotulo,
          ariaLabel: `${rotulo} ${HOJE.title}`,
          onClick: () => {
            onToggle?.(todos);
            setTodos((atual) => !atual);
          },
        }}
      />
    </div>
  );
};

/**
 * A grade no aparelho, com os cabeçalhos colando sob a barra sobreposta.
 */
const TelaComCabecalhos: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme }) => (
  <PhoneFrame scale={0.75} theme={theme}>
    <TopBar variant="overlay" title="Biblioteca" />
    <MediaGrid items={uglMediaItems} now={uglDemoNow} topInset={44} />
  </PhoneFrame>
);

/**
 * Página de documentação rica do componente SectionHeader.
 */
const SectionHeaderDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Grade"
      title="SectionHeader"
      description="Cabeçalho de grupo: o dia na grade da biblioteca (“Hoje”, “Ontem”) com o lugar na linha de apoio, ou uma seção de página (“Meus álbuns”). A ação de texto à direita é “Selecionar” / “Desmarcar” no modo de seleção, ou “Ver tudo”. Colante, vira uma faixa translúcida sobre a grade."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" description="Um título, um lugar, uma ação." />
    <UglDocGrid>
      <UglDocCard icon="📅" title="Dia na grade">
        A <code>MediaGrid</code> monta um cabeçalho por grupo com o título de{' '}
        <code>uglFormatDayLabel</code> e o lugar mais frequente do dia como linha de apoio.
      </UglDocCard>
      <UglDocCard icon="📌" title="Colante">
        Com <code>sticky</code>, cola no topo do contêiner de rolagem, logo abaixo da barra
        sobreposta: o topo vem de <code>--ugl-section-header-sticky-top</code>, que a grade define.
      </UglDocCard>
      <UglDocCard icon="☑️" title="Ação de grupo">
        No modo de seleção, “Selecionar” marca o dia inteiro e vira “Desmarcar”. O nome acessível
        completo é “Selecionar Hoje”: há um por grupo, e o rótulo sozinho seria ambíguo.
      </UglDocCard>
      <UglDocCard icon="🔠" title="Dois tamanhos">
        <code>md</code> (16px) na grade, para o cabeçalho colante tomar pouco da tela;{' '}
        <code>lg</code> (20px) em seções de página, como “Meus álbuns”.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" description="Medidas e escolhas de composição." />
    <UglDocSpecs
      component="SectionHeader"
      layout="Linha · mínimo 44px"
      specs={[
        { label: 'Altura mínima', value: '--ugl-touch-target (44px)' },
        { label: 'Margem esquerda', value: '--ugl-gutter (16px)' },
        { label: 'Título md', value: 'title-sm · 16/24' },
        { label: 'Título lg', value: 'title-lg · 20/30' },
        { label: 'Linha de apoio', value: 'caption · text-secondary' },
        { label: 'Ação', value: 'Button terciário · md (44px)' },
        { label: 'Colante', value: 'surface-bar + blur 16px' },
        { label: 'Topo colante', value: '--ugl-section-header-sticky-top' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'md na grade, lg nas páginas',
          detail:
            'o token de title-lg nomeia "Hoje" como uso, mas na grade o cabeçalho cola e fica sempre visível: em title-sm, com o lugar, ele mede 50px em vez de 56px. As seções de página (Álbuns, Busca) usam lg.',
        },
        {
          subject: 'Ação com nome completo',
          detail:
            'action.ariaLabel é extensão do contrato: a grade passa "Selecionar Hoje", que contém o rótulo visível (WCAG 2.5.3) e distingue os vários "Selecionar" da tela.',
        },
        {
          subject: 'Ação em Button md',
          detail:
            'o botão de texto usa a altura md (44px), o alvo mínimo de toque, e não a sm (32px) — é um alvo que se toca com o polegar, rolando.',
        },
        {
          subject: 'Topo colante por custom property',
          detail:
            'top: var(--ugl-section-header-sticky-top, 0px). A grade o define com a área segura mais o topInset, e o cabeçalho cola logo abaixo da barra sobreposta, e não sob ela.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" description="Título, linha de apoio e ação." />
    <UglDocStage label="Cabeçalho de dia (390px)" surface="primary" align="flex-start" padding={16}>
      <div style={{ width: 390 }}>
        <SectionHeader title={HOJE.title} subtitle={HOJE.subtitle} action={{ label: 'Selecionar', onClick: () => undefined }} />
      </div>
      <div style={{ flex: '1 1 320px' }}>
        <UglDocAnatomy
          zones={[
            { name: 'Título', role: '<h2> (ou <h3>) com o nome do grupo.', token: '--ugl-font-title-sm-* · --ugl-color-text-primary' },
            { name: 'Linha de apoio', role: 'O lugar do grupo, em uma linha com reticências.', token: '--ugl-font-caption-* · --ugl-color-text-secondary' },
            { name: 'Ação', role: 'Button terciário de 44px.', token: '--ugl-color-text-accent' },
            { name: 'Faixa colante', role: 'Só com sticky: translúcida com desfoque.', token: '--ugl-color-surface-bar · --ugl-blur-bar' },
          ]}
        />
      </div>
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes, tamanhos e estados" description="Tamanhos, linha de apoio e ação." />
    <UglDocStage label="Tamanhos" surface="primary" direction="column" align="flex-start" padding={16} gap={8}>
      <div style={{ width: 390 }}>
        <SectionHeader title={HOJE.title} subtitle={HOJE.subtitle} size="md" />
      </div>
      <div style={{ width: 390 }}>
        <SectionHeader title="Meus álbuns" size="lg" action={{ label: 'Ver tudo', onClick: () => undefined }} />
      </div>
    </UglDocStage>
    <UglDocStage label="Com ação de seleção" surface="primary" padding={16}>
      <CabecalhoComSelecao />
    </UglDocStage>
    <UglDocStage label="Colante, na grade do aparelho" surface="secondary" padding={16}>
      <TelaComCabecalhos />
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Regras de uso do cabeçalho de grupo." />
    <UglDocPractices
      dos={[
        'Usar os títulos de uglFormatDayLabel/uglGroupMedia, e não datas escritas à mão.',
        'Dar ariaLabel à ação quando há um cabeçalho igual por grupo.',
        'Usar sticky dentro de um contêiner de rolagem que defina o topo colante.',
        'Manter uma ação só, de texto.',
      ]}
      donts={[
        'Pôr ícones ou mais de uma ação no cabeçalho: ele vira uma barra.',
        'Usar lg na grade: o cabeçalho colante rouba altura das miniaturas.',
        'Pular níveis de título: h2 sob o h1 da barra, h3 dentro de uma seção h2.',
        'Escrever o lugar no título: ele tem a própria linha.',
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="6. Suporte a temas" description="Texto, acento e a faixa colante acompanham o tema." />
    <UglDocThemeSwitcher padding={16}>
      {(tema) => (
        <div style={{ display: 'grid', gap: 8 }}>
          <CabecalhoComSelecao theme={tema} />
          <div style={{ width: 390 }}>
            <SectionHeader theme={tema} title="Meus álbuns" size="lg" action={{ label: 'Ver tudo', onClick: () => undefined }} />
          </div>
        </div>
      )}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" description="Contrato público do componente SectionHeader." />
    <UglDocPropsTable
      title="SectionHeader"
      rows={[
        { name: 'title', type: 'string', description: 'Título do grupo. Obrigatório.' },
        { name: 'subtitle', type: 'string', description: 'Linha de apoio (o lugar).' },
        { name: 'action', type: 'UglSectionHeaderAction', description: 'Ação de texto à direita.' },
        { name: 'headingLevel', type: '2 | 3', default: '2', description: 'Nível do título.' },
        { name: 'sticky', type: 'boolean', default: 'false', description: 'Cola no topo do contêiner de rolagem.' },
        { name: 'size', type: "'md' | 'lg'", default: "'md'", description: 'Tamanho do título.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: '...rest', type: 'HTMLAttributes<HTMLDivElement>', description: 'Atributos nativos da raiz.' },
      ]}
    />
    <UglDocPropsTable
      title="UglSectionHeaderAction"
      rows={[
        { name: 'label', type: 'string', description: 'Rótulo visível.' },
        { name: 'onClick', type: '() => void', description: 'Acionamento.' },
        { name: 'ariaLabel', type: 'string', description: 'Nome acessível completo, contendo o rótulo (extensão).' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof SectionHeader> = {
  title: 'Unoogaleria/Componentes/SectionHeader',
  component: SectionHeader,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text', description: 'Título do grupo.' },
    subtitle: { control: 'text', description: 'Linha de apoio.' },
    action: { control: 'object', description: 'Ação de texto ({ label, onClick, ariaLabel }).' },
    headingLevel: { control: 'radio', options: [2, 3], description: 'Nível do título.' },
    sticky: { control: 'boolean', description: 'Colante.' },
    size: { control: 'radio', options: ['md', 'lg'], description: 'Tamanho.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    title: HOJE.title,
    subtitle: HOJE.subtitle,
    action: { label: 'Selecionar', ariaLabel: `Selecionar ${HOJE.title}`, onClick: fn() },
    headingLevel: 2,
    sticky: false,
    size: 'md',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof SectionHeader>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SectionHeaderDocumentationPage />,
};

/**
 * Playground com todas as propriedades do SectionHeader expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SectionHeader',
  render: (args) => (
    <UglDocStage theme={args.theme} surface="primary" padding={16}>
      <div style={{ width: 390 }}>
        <SectionHeader {...args} />
      </div>
    </UglDocStage>
  ),
};

/**
 * Cabeçalhos colantes na grade do aparelho.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: dias da biblioteca',
  parameters: { layout: 'centered' },
  render: () => <TelaComCabecalhos />,
};

/**
 * Os dois tamanhos, com e sem linha de apoio e ação.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UglDocStage surface="primary" direction="column" align="flex-start" padding={16} gap={8}>
      {GRUPOS.slice(0, 4).map((grupo) => (
        <div key={grupo.id} style={{ width: 390 }}>
          <SectionHeader title={grupo.title} subtitle={grupo.subtitle} />
        </div>
      ))}
      <div style={{ width: 390 }}>
        <SectionHeader title="Meus álbuns" size="lg" action={{ label: 'Ver tudo', onClick: () => undefined }} />
      </div>
    </UglDocStage>
  ),
};

/**
 * md e lg lado a lado.
 */
export const Tamanhos: Story = {
  render: () => (
    <UglDocStage surface="primary" direction="column" align="flex-start" padding={16} gap={8}>
      {(['md', 'lg'] as const).map((tamanho) => (
        <div key={tamanho} style={{ width: 390 }}>
          <SectionHeader title={ONTEM.title} subtitle={ONTEM.subtitle} size={tamanho} action={{ label: 'Selecionar', onClick: () => undefined }} />
        </div>
      ))}
    </UglDocStage>
  ),
};

/**
 * Em repouso, colante (sobre a grade) e com título longo.
 */
export const Estados: Story = {
  render: () => (
    <UglDocStage surface="primary" direction="column" align="flex-start" padding={16} gap={8}>
      <div style={{ width: 390 }}>
        <SectionHeader title="Um título de grupo muito longo que não cabe numa linha" subtitle="Chapada dos Veadeiros, Alto Paraíso de Goiás, GO" action={{ label: 'Selecionar', onClick: () => undefined }} />
      </div>
      <div style={{ width: 390, height: 200, overflowY: 'auto', borderRadius: 12 }}>
        <MediaGrid items={uglMediaItems.slice(0, 12)} now={uglDemoNow} ariaLabel="Cabeçalhos colantes" />
      </div>
    </UglDocStage>
  ),
};

/**
 * Nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <UglDocStage key={tema} label={tema === 'light' ? 'Tema claro' : 'Tema escuro'} theme={tema} surface="primary" padding={16} direction="column" align="flex-start">
          <CabecalhoComSelecao theme={tema} />
          <div style={{ width: 390, height: 220, borderRadius: 12, overflow: 'hidden' }}>
            <MediaGrid items={uglMediaItems} now={uglDemoNow} ariaLabel={`Grade no tema ${tema === 'light' ? 'claro' : 'escuro'}`} />
          </div>
        </UglDocStage>
      ))}
    </div>
  ),
};

/**
 * "Selecionar" vira "Desmarcar" e volta.
 */
export const AcaoDeGrupo: Story = {
  name: 'Ação de grupo',
  render: () => (
    <UglDocStage surface="primary" padding={16}>
      <CabecalhoComSelecao />
    </UglDocStage>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    await expect(tela.getByRole('heading', { level: 2, name: HOJE.title })).toBeInTheDocument();
    await userEvent.click(tela.getByRole('button', { name: `Selecionar ${HOJE.title}` }));
    const desmarcar = tela.getByRole('button', { name: `Desmarcar ${HOJE.title}` });
    await expect(desmarcar).toHaveTextContent('Desmarcar');
    await userEvent.click(desmarcar);
    await expect(tela.getByRole('button', { name: `Selecionar ${HOJE.title}` })).toBeInTheDocument();
  },
};
