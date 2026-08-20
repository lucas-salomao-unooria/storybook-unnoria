import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SettingsRow } from '../../../src/chatgpt/components/SettingsRow';
import { Badge, Button, Divider, Toggle } from '../../../src/chatgpt/components';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  GptDocCard,
  GptDocGrid,
  GptDocFigmaSpecs,
  GptDocPractices,
  GptDocPropsTable,
  GptDocStage,
  GptDocThemeSwitcher,
} from '../../../.storybook/components';
import { gptFigmaNodes, gptSettings } from '../fixtures';

/**
 * Página de documentação rica do componente SettingsRow.
 */
const SettingsRowDocumentationPage = () => {
  const [memoria, setMemoria] = React.useState(true);
  const [temporario, setTemporario] = React.useState(false);

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="ChatGPT"
        category="Componentes • Configurações"
        title="SettingsRow"
        description="Réplica do componente SettingsRow da página 🟡 Design system: linha de 400 × 48 com padding vertical de 12 e nenhum padding horizontal, rótulo em Body/SM a 100% e valor em Body/SM a 50% de opacidade alinhado à direita. É a linha das telas de configuração."
      />

      <UnooriaDocSectionHeader
        title="1. Visão Geral & Casos de Uso"
        description="Uma linha de rótulo e valor que aceita texto ou controle."
        barColor="#5856D6"
      />
      <GptDocGrid>
        <GptDocCard icon="⚙️" title="Valor textual">
          O caso do arquivo: rótulo à esquerda e valor à direita a 50% de opacidade — tema, idioma,
          plano.
        </GptDocCard>
        <GptDocCard icon="🎚️" title="Valor como controle">
          A prop <code>value</code> aceita qualquer nó, o que permite colocar <code>Toggle</code>,{' '}
          <code>Button</code> ou <code>Badge</code> na coluna direita.
        </GptDocCard>
        <GptDocCard icon="➖" title="Sem calha própria">
          O padding horizontal é zero: a linha se alinha à calha da seção que a contém, como no
          arquivo.
        </GptDocCard>
        <GptDocCard icon="📚" title="Composição em lista">
          Intercalada com <code>Divider</code>, forma a lista completa de uma aba de configurações.
        </GptDocCard>
      </GptDocGrid>

      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Medidas lidas do componente via Plugin API."
        barColor="#5856D6"
      />
      <GptDocFigmaSpecs
        nodeId={gptFigmaNodes.settingsRow}
        frameName="SettingsRow (componente único)"
        specs={[
          { label: 'Dimensões', value: '400 × 48' },
          { label: 'Padding', value: '12/0 · spacing/5 na vertical' },
          { label: 'Rótulo', value: 'Body/SM · text/primary' },
          { label: 'Valor', value: 'Body/SM · preto a 50%' },
          { label: 'Alinhamento', value: 'rótulo FILL, valor HUG à direita' },
          { label: 'Superfície', value: 'nenhuma' },
        ]}
        deviations={[
          'A largura de 400px não é fixada quando block é usado — o modo esperado dentro de uma coluna de configurações.',
          'O arquivo mostra apenas valor textual. Aceitar controles no slot value é extensão registrada, necessária porque as telas de configuração do produto colocam Toggle nessa coluna.',
        ]}
      />

      <UnooriaDocSectionHeader
        title="3. Anatomia do Componente"
        description="Duas colunas com distribuição assimétrica."
        barColor="#5856D6"
      />
      <GptDocGrid min={260}>
        <GptDocCard icon="🏷️" title="label">
          Coluna elástica (<code>flex: 1 1 auto</code>) em <code>text/primary</code>.
        </GptDocCard>
        <GptDocCard icon="🔢" title="value">
          Coluna que abraça o conteúdo, a 50% de opacidade quando textual. Omitir a prop remove a
          coluna.
        </GptDocCard>
        <GptDocCard icon="↔️" title="block">
          Ocupa 100% da largura em vez dos 400px do arquivo.
        </GptDocCard>
        <GptDocCard icon="➖" title="Separação">
          Nenhuma no componente — use <code>Divider</code> entre linhas consecutivas.
        </GptDocCard>
      </GptDocGrid>

      <UnooriaDocSectionHeader
        title="4. Matriz de Composições"
        description="Valor textual, valor como controle e lista completa."
        barColor="#5856D6"
      />
      <GptDocStage label="Valor textual — as linhas do arquivo" direction="column" align="flex-start">
        <div style={{ width: 400 }}>
          {gptSettings.map((row, index) => (
            <React.Fragment key={row.label}>
              <SettingsRow label={row.label} value={row.value} block />
              {index < gptSettings.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </div>
      </GptDocStage>
      <GptDocStage label="Valor como controle" direction="column" align="flex-start">
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
            label="Chats temporários"
            block
            value={
              <Toggle
                checked={temporario}
                onCheckedChange={setTemporario}
                aria-label="Alternar chats temporários"
              />
            }
          />
          <Divider />
          <SettingsRow label="Plano" block value={<Badge variant="primary">Plus</Badge>} />
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
      </GptDocStage>
      <GptDocStage label="Sem valor — linha usada como rótulo de seção">
        <div style={{ width: 400 }}>
          <SettingsRow label="Preferências gerais" block />
        </div>
      </GptDocStage>

      <UnooriaDocSectionHeader
        title="5. Boas Práticas"
        description="Regras de configuração."
        barColor="#5856D6"
      />
      <GptDocPractices
        dos={[
          'Intercalar Divider entre linhas consecutivas, sem traço antes da primeira nem depois da última.',
          'Manter o rótulo curto e o valor ainda mais curto — a linha tem 48px e não quebra.',
          'Associar o rótulo ao controle da coluna direita por aria-label ou aria-labelledby.',
          'Usar block dentro de uma coluna de configurações, deixando a seção definir a calha.',
        ]}
        donts={[
          'Colocar dois controles na coluna de valor.',
          'Usar a linha para conteúdo de leitura longa — ela é um par rótulo/valor.',
          'Adicionar padding horizontal próprio, o que desalinha a linha da calha da seção.',
          'Confiar na cor a 50% para transmitir estado; para isso use Badge.',
        ]}
      />

      <UnooriaDocSectionHeader
        title="6. Suporte a Temas"
        description="Rótulo e valor seguem text/primary e a escada translúcida, ambos invertidos no Dark."
        barColor="#5856D6"
      />
      <GptDocThemeSwitcher direction="column">
        {() => (
          <div style={{ width: '100%' }}>
            {gptSettings.slice(0, 3).map((row, index) => (
              <React.Fragment key={row.label}>
                <SettingsRow label={row.label} value={row.value} block />
                {index < 2 && <Divider />}
              </React.Fragment>
            ))}
          </div>
        )}
      </GptDocThemeSwitcher>

      <UnooriaDocSectionHeader
        title="7. Referência Completa de Props da API"
        description="Contrato público do componente SettingsRow."
        barColor="#5856D6"
      />
      <GptDocPropsTable
        title="SettingsRow"
        rows={[
          { name: 'label', type: 'React.ReactNode', description: 'Rótulo da configuração.' },
          {
            name: 'value',
            type: 'React.ReactNode',
            description:
              'Valor exibido à direita. Aceita texto (a 50% de opacidade) ou controles como Toggle, Button e Badge.',
          },
          {
            name: 'block',
            type: 'boolean',
            default: 'false',
            description: 'Ocupa toda a largura disponível em vez dos 400px do arquivo.',
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
  title: 'ChatGPT/Componentes/SettingsRow',
  component: SettingsRow,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text', description: 'Rótulo da configuração.' },
    value: { control: 'text', description: 'Valor exibido à direita.' },
    block: { control: 'boolean', description: 'Ocupa toda a largura do contêiner.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: { label: 'Setting label', value: 'Value', block: false, theme: 'light' },
};

export default meta;

type Story = StoryObj<typeof SettingsRow>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
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
      data-gpt-theme={args.theme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
        borderRadius: 12,
        backgroundColor: args.theme === 'dark' ? '#1C1C1C' : '#FFFFFF',
        border: '1px solid #E4E8E9',
      }}
    >
      <SettingsRow {...args} />
    </div>
  ),
};

/**
 * Réplica visual do componente publicado no Figma — 400 × 48.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ width: 400, padding: 16, border: '1px solid #E4E8E9', borderRadius: 5 }}>
      <SettingsRow label="Setting label" value="Value" block />
    </div>
  ),
};

/**
 * Lista completa de configurações com controles reais.
 */
export const ComposicaoModular: Story = {
  render: function ListaDeConfiguracoes() {
    const [memoria, setMemoria] = React.useState(true);
    const [temporario, setTemporario] = React.useState(false);
    return (
      <div style={{ width: 440 }}>
        <SettingsRow label="Theme" value="System" block />
        <Divider />
        <SettingsRow label="Language" value="Auto-detect" block />
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
          label="Chats temporários"
          block
          value={
            <Toggle
              checked={temporario}
              onCheckedChange={setTemporario}
              aria-label="Alternar chats temporários"
            />
          }
        />
        <Divider />
        <SettingsRow label="Plano" block value={<Badge variant="primary">Plus</Badge>} />
      </div>
    );
  },
};
