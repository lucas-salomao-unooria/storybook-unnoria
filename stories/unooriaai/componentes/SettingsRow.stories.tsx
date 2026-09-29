import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { SettingsRow } from '../../../src/unooriaai/components/SettingsRow';
import { Badge, Button, Divider, Toggle } from '../../../src/unooriaai/components';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UaiDocCard,
  UaiDocGrid,
  UaiDocSpecs,
  UaiDocDecisions,
  UaiDocAnatomy,
  UaiDocPractices,
  UaiDocPropsTable,
  UaiDocStage,
  UaiDocThemeSwitcher,
} from '../../../.storybook/components';
import { uaiSettings } from '../fixtures';

const BAR = '#716C98';

/**
 * Página de documentação rica do componente SettingsRow.
 */
const SettingsRowDocumentationPage = () => {
  const [memoria, setMemoria] = React.useState(true);
  const [temporario, setTemporario] = React.useState(false);

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="UnooriaAI"
        category="Componentes • Configurações"
        title="SettingsRow"
        description="Linha de 400 × 48 com padding vertical de 12 e nenhum padding horizontal: rótulo em body-sm na cor primária e valor em body-sm na cor de apoio, alinhado à direita. É a linha das telas de configuração."
      />

      <UnooriaDocSectionHeader
        title="1. Visão geral e casos de uso"
        description="Uma linha de rótulo e valor que aceita texto ou controle."
        barColor={BAR}
      />
      <UaiDocGrid>
        <UaiDocCard icon="⚙️" title="Valor textual">
          O caso básico: rótulo à esquerda e valor à direita, em cor de apoio (tema, idioma, plano).
        </UaiDocCard>
        <UaiDocCard icon="🎚️" title="Valor como controle">
          A prop <code>value</code> aceita qualquer nó, o que permite colocar <code>Toggle</code>,{' '}
          <code>Button</code> ou <code>Badge</code> na coluna direita.
        </UaiDocCard>
        <UaiDocCard icon="➖" title="Sem calha própria">
          O padding horizontal é zero: a linha se alinha à calha da seção que a contém.
        </UaiDocCard>
        <UaiDocCard icon="📚" title="Composição em lista">
          Intercalada com <code>Divider</code>, forma a lista completa de uma aba de configurações.
        </UaiDocCard>
      </UaiDocGrid>

      <UnooriaDocSectionHeader
        title="2. Especificações técnicas"
        description="Medidas e tokens do componente."
        barColor={BAR}
      />
      <UaiDocSpecs
        component="SettingsRow"
        layout="Linha · 400 × 48"
        specs={[
          { label: 'Dimensões', value: '400 × 48' },
          { label: 'Padding', value: '12/0 · --uai-spacing-5 na vertical' },
          { label: 'Gap', value: '12px · --uai-spacing-5' },
          { label: 'Rótulo', value: 'body-sm · --uai-text-primary' },
          { label: 'Valor', value: 'body-sm · --uai-text-soft-50' },
          { label: 'Alinhamento', value: 'rótulo elástico, valor à direita' },
          { label: 'Superfície', value: 'nenhuma' },
        ]}
      />
      <UaiDocDecisions
        items={[
          {
            subject: 'Largura definida pela seção',
            detail:
              'os 400px valem só quando block não é usado; dentro de uma coluna de configurações o modo esperado é block, e a seção define a calha.',
          },
          {
            subject: 'Controles no slot de valor',
            detail:
              'aceitar Toggle, Button e Badge em value é extensão necessária, porque as telas de configuração do produto colocam controles nessa coluna, não só texto.',
          },
          {
            subject: 'Valor em --uai-text-soft-50',
            detail:
              'o valor textual mede 6,4:1 sobre a superfície clara e 8,6:1 sobre o roxo profundo, acima dos 4,5:1 exigidos, e ainda assim fica abaixo do rótulo na hierarquia.',
          },
        ]}
      />

      <UnooriaDocSectionHeader
        title="3. Anatomia do componente"
        description="Duas colunas com distribuição assimétrica."
        barColor={BAR}
      />
      <UaiDocAnatomy
        zones={[
          {
            name: 'label',
            role: 'Coluna elástica (flex: 1 1 auto) na cor primária.',
            token: '--uai-text-primary',
          },
          {
            name: 'value',
            role: 'Coluna que abraça o conteúdo, em cor de apoio quando textual. Omitir a prop remove a coluna.',
            token: '--uai-text-soft-50',
          },
          {
            name: 'block',
            role: 'Ocupa 100% da largura em vez dos 400px.',
          },
          {
            name: 'Separação',
            role: 'Nenhuma no componente: use Divider entre linhas consecutivas.',
          },
        ]}
      />

      <UnooriaDocSectionHeader
        title="4. Matriz de variantes, tamanhos e estados"
        description="Valor textual, valor como controle e lista completa."
        barColor={BAR}
      />
      <UaiDocStage label="Valor textual" direction="column" align="flex-start">
        <div style={{ width: 400 }}>
          {uaiSettings.map((row, index) => (
            <React.Fragment key={row.label}>
              <SettingsRow label={row.label} value={row.value} block />
              {index < uaiSettings.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </div>
      </UaiDocStage>
      <UaiDocStage label="Valor como controle" direction="column" align="flex-start">
        <div style={{ width: 400 }}>
          <SettingsRow
            label="Memória"
            block
            value={
              <Toggle checked={memoria} onCheckedChange={setMemoria} aria-label="Alternar memória" />
            }
          />
          <Divider />
          <SettingsRow
            label="Conversas temporárias"
            block
            value={
              <Toggle
                checked={temporario}
                onCheckedChange={setTemporario}
                aria-label="Alternar conversas temporárias"
              />
            }
          />
          <Divider />
          <SettingsRow label="Plano" block value={<Badge variant="primary">Premium</Badge>} />
          <Divider />
          <SettingsRow
            label="Apagar todas as conversas"
            block
            value={
              <Button variant="destructive" size="sm">
                Apagar
              </Button>
            }
          />
        </div>
      </UaiDocStage>
      <UaiDocStage label="Sem valor: linha usada como rótulo de seção">
        <div style={{ width: 400 }}>
          <SettingsRow label="Preferências gerais" block />
        </div>
      </UaiDocStage>

      <UnooriaDocSectionHeader
        title="5. Boas práticas"
        description="Regras de configuração."
        barColor={BAR}
      />
      <UaiDocPractices
        dos={[
          'Intercalar Divider entre linhas consecutivas, sem traço antes da primeira nem depois da última.',
          'Manter o rótulo curto e o valor ainda mais curto: a linha tem 48px e não quebra.',
          'Associar o rótulo ao controle da coluna direita por aria-label ou aria-labelledby.',
          'Usar block dentro de uma coluna de configurações, deixando a seção definir a calha.',
        ]}
        donts={[
          'Colocar dois controles na coluna de valor.',
          'Usar a linha para conteúdo de leitura longa: ela é um par rótulo/valor.',
          'Adicionar padding horizontal próprio, o que desalinha a linha da calha da seção.',
          'Confiar só na cor de apoio para transmitir estado; para isso use Badge.',
        ]}
      />

      <UnooriaDocSectionHeader
        title="6. Suporte a temas"
        description="Rótulo e valor seguem --uai-text-primary e --uai-text-soft-50, cada um com valor próprio em cada tema."
        barColor={BAR}
      />
      <UaiDocThemeSwitcher direction="column">
        {() => (
          <div style={{ width: '100%' }}>
            {uaiSettings.slice(0, 3).map((row, index) => (
              <React.Fragment key={row.label}>
                <SettingsRow label={row.label} value={row.value} block />
                {index < 2 && <Divider />}
              </React.Fragment>
            ))}
          </div>
        )}
      </UaiDocThemeSwitcher>

      <UnooriaDocSectionHeader
        title="7. Referência completa de props da API"
        description="Contrato público do componente SettingsRow."
        barColor={BAR}
      />
      <UaiDocPropsTable
        title="SettingsRow"
        rows={[
          { name: 'label', type: 'React.ReactNode', description: 'Rótulo da configuração.' },
          {
            name: 'value',
            type: 'React.ReactNode',
            description:
              'Valor exibido à direita. Aceita texto (em cor de apoio) ou controles como Toggle, Button e Badge.',
          },
          {
            name: 'block',
            type: 'boolean',
            default: 'false',
            description: 'Ocupa toda a largura disponível em vez dos 400px.',
          },
          {
            name: 'theme',
            type: "'light' | 'dark'",
            description:
              'Tema usado para resolver as variáveis de cor. Quando omitido, herda o tema do contêiner ancestral.',
          },
          { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        ]}
      />
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof SettingsRow> = {
  title: 'UnooriaAI/Componentes/SettingsRow',
  component: SettingsRow,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text', description: 'Rótulo da configuração.' },
    value: { control: 'text', description: 'Valor exibido à direita.' },
    block: { control: 'boolean', description: 'Ocupa toda a largura do contêiner.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: { label: 'Rótulo da configuração', value: 'Valor', block: false, theme: 'light' },
};

export default meta;

type Story = StoryObj<typeof SettingsRow>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SettingsRowDocumentationPage />,
};

/**
 * Playground com todas as propriedades do SettingsRow expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do SettingsRow',
  render: (args) => (
    <div
      data-uai-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        borderRadius: 12,
        background: 'var(--uai-bg-primary)',
        border: '1px solid var(--uai-border-default)',
      }}
    >
      <SettingsRow {...args} />
    </div>
  ),
};

/**
 * A linha em sua medida canônica, 400 × 48.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <div
      style={{
        width: 400,
        maxWidth: '100%',
        padding: 16,
        boxSizing: 'border-box',
        border: '1px solid var(--uai-border-default)',
        borderRadius: 8,
      }}
    >
      <SettingsRow label="Rótulo da configuração" value="Valor" block />
    </div>
  ),
};

/**
 * Lista completa de configurações com controles reais. O `play` aciona um
 * interruptor da coluna de valor e confere o estado.
 */
export const ComposicaoModular: Story = {
  render: function ListaDeConfiguracoes() {
    const [memoria, setMemoria] = React.useState(true);
    const [temporario, setTemporario] = React.useState(false);
    return (
      <div style={{ width: 440 }}>
        <SettingsRow label="Tema" value="Sistema" block />
        <Divider />
        <SettingsRow label="Idioma" value="Detectar automaticamente" block />
        <Divider />
        <SettingsRow
          label="Memória"
          block
          value={
            <Toggle checked={memoria} onCheckedChange={setMemoria} aria-label="Alternar memória" />
          }
        />
        <Divider />
        <SettingsRow
          label="Conversas temporárias"
          block
          value={
            <Toggle
              checked={temporario}
              onCheckedChange={setTemporario}
              aria-label="Alternar conversas temporárias"
            />
          }
        />
        <Divider />
        <SettingsRow label="Plano" block value={<Badge variant="primary">Premium</Badge>} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const temporario = canvas.getByRole('switch', { name: 'Alternar conversas temporárias' });

    await expect(temporario).toHaveAttribute('aria-checked', 'false');
    await userEvent.click(temporario);
    await expect(temporario).toHaveAttribute('aria-checked', 'true');
  },
};
