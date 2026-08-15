import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NumberButton } from '../../../src/unooria/components/NumberButton/NumberButton';
import {
  NumberButtonProps,
  NumberButtonSize,
  NumberButtonTheme,
} from '../../../src/unooria/components/NumberButton/NumberButton.types';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';

/**
 * Página de Documentação Rica do NumberButton baseada no Padrão Ouro do Design System Unooria
 */
const NumberButtonDocumentationPage = () => {
  const [demoValuePad, setDemoValuePad] = useState<number>(7);
  const [demoValueMoney, setDemoValueMoney] = useState<number>(150);
  const [demoValueWeight, setDemoValueWeight] = useState<number>(2.5);

  const sizesInfo: { size: NumberButtonSize; label: string; typography: string; desc: string }[] = [
    {
      size: 'lg',
      label: 'Large (LG)',
      typography: 'Title-L Bold (20px / 30px / 700)',
      desc: 'Destaque visual para touch screens, PDVs, fluxos prioritários de checkout e telas de autosserviço.',
    },
    {
      size: 'md',
      label: 'Medium (MD) • Padrão',
      typography: 'Body-M Bold (18px / 28px / 700)',
      desc: 'Tamanho padrão do Design System Unooria para modais, carrinhos, filtros e formulários principais.',
    },
    {
      size: 'sm',
      label: 'Small (SM)',
      typography: 'Body-S Bold (16px / 24px / 700)',
      desc: 'Ideal para tabelas operacionais densas, gavetas laterais de edição e listas compactas.',
    },
    {
      size: 'xs',
      label: 'Extra Small (XS)',
      typography: 'Body-XS Bold (14px / 20px / 700)',
      desc: 'Densidade extrema de dados, sublinhas de tabela e controles integrados a linhas de grade.',
    },
  ];

  const propsTableData = [
    {
      name: 'value',
      type: 'number',
      default: 'undefined',
      desc: 'Valor numérico em modo controlado.',
    },
    {
      name: 'defaultValue',
      type: 'number',
      default: '0',
      desc: 'Valor numérico inicial em modo não controlado.',
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg'",
      default: "'md'",
      desc: 'Tamanho visual e tipográfico do componente conforme escala do Figma.',
    },
    {
      name: 'min',
      type: 'number',
      default: '-Infinity',
      desc: 'Limite mínimo permitido para o stepper.',
    },
    {
      name: 'max',
      type: 'number',
      default: 'Infinity',
      desc: 'Limite máximo permitido para o stepper.',
    },
    {
      name: 'step',
      type: 'number',
      default: '1',
      desc: 'Passo de incremento/decremento ao clicar nos botões ou usar o teclado.',
    },
    {
      name: 'onChange',
      type: '(value: number) => void',
      default: 'undefined',
      desc: 'Callback disparado quando o valor numérico é alterado.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      desc: 'Desabilita o componente aplicando o estilo visual Disable e bloqueando interações.',
    },
    {
      name: 'padLength',
      type: 'number',
      default: 'undefined',
      desc: 'Formata o número com zeros à esquerda (ex: padLength=3 exibe "000", "007").',
    },
    {
      name: 'theme',
      type: "'light' | 'dark'",
      default: "'light'",
      desc: 'Tema visual de cor da interface.',
    },
    {
      name: 'allowInput',
      type: 'boolean',
      default: 'true',
      desc: 'Permite que o usuário digite o número diretamente no campo central.',
    },
  ];

  return (
    <UnooriaDocShell>
      {/* 1. Cabeçalho Oficial */}
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Controles & Formulários"
        title="NumberButton"
        description="O NumberButton (Stepper Numérico) é um controle de precisão para seleção e ajuste de quantidades, valores numéricos e contadores. Projetado com botões de incremento/decremento com raio de 4px e escala tipográfica em 4 tamanhos rigorosamente sincronizados ao Figma."
      />

      {/* 2. Visão Geral */}
      <UnooriaDocSectionHeader
        title="1. Visão Geral & Casos de Uso"
        description="Diretrizes de aplicação do NumberButton em fluxos de produto da Plataforma Unooria."
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            padding: 24,
            borderRadius: 12,
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <h4 style={{ margin: '0 0 12px 0', color: '#22272A', fontSize: 16 }}>🎯 Finalidade do Componente</h4>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#475157' }}>
            O <strong>NumberButton</strong> combina botões táteis de ação rápida (<code>remove</code> e <code>add</code>) com um
            display numérico central editável via teclado. Elimina erros de digitação ao restringir valores com <code>min</code>,{' '}
            <code>max</code> e <code>step</code>.
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            padding: 24,
            borderRadius: 12,
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <h4 style={{ margin: '0 0 12px 0', color: '#6487C2', fontSize: 16 }}>📐 Escala do Figma</h4>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#475157' }}>
            Suporta 4 tamanhos padronizados (<strong>LG: 20px</strong>, <strong>MD: 18px</strong>, <strong>SM: 16px</strong>, <strong>XS: 14px</strong>)
            e 3 estados principais de homologação visual: <strong>Default</strong>, <strong>Hover</strong> (com fundo translúcido azul de 4px) e <strong>Disable</strong>.
          </p>
        </div>
      </div>

      {/* 3. Figma & Especificações */}
      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Links oficiais e identificadores de nós de design para homologação visual."
      />
      <div
        style={{
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: 8,
          padding: 20,
          marginBottom: 32,
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: 12, color: '#49699F', textTransform: 'uppercase', fontWeight: 600 }}>
              Figma Frame Node ID
            </span>
            <div style={{ fontSize: 16, color: '#22272A', fontWeight: 700, fontFamily: 'monospace' }}>
              14662:399
            </div>
          </div>
          <div style={{ borderLeft: '1px solid #CBD5E1', paddingLeft: 16 }}>
            <span style={{ fontSize: 12, color: '#49699F', textTransform: 'uppercase', fontWeight: 600 }}>
              Component Set ID
            </span>
            <div style={{ fontSize: 16, color: '#22272A', fontWeight: 700, fontFamily: 'monospace' }}>
              14662:31020 (Number Button)
            </div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <a
              href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=14662-399&m=dev"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                backgroundColor: '#6487C2',
                color: '#FFFFFF',
                borderRadius: 6,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Abrir no Figma Dev Mode ↗
            </a>
          </div>
        </div>
      </div>

      {/* 4. Matriz Completa do Figma */}
      <UnooriaDocSectionHeader
        title="3. Matriz Oficial do Figma (Tamanhos x Estados)"
        description="Reprodução fiel da matriz de componentes do nó 14662:399 do Figma."
      />
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: 12,
          padding: 24,
          marginBottom: 32,
          overflowX: 'auto',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #E2E8F0' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', color: '#475157', fontSize: 13 }}>Tamanho</th>
              <th style={{ padding: '12px 16px', color: '#475157', fontSize: 13 }}>Default</th>
              <th style={{ padding: '12px 16px', color: '#475157', fontSize: 13 }}>Hover</th>
              <th style={{ padding: '12px 16px', color: '#475157', fontSize: 13 }}>Disable</th>
            </tr>
          </thead>
          <tbody>
            {sizesInfo.map((row) => (
              <tr key={row.size} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '16px', textAlign: 'left', fontWeight: 700, color: '#383E41' }}>
                  {row.label.split(' ')[0]} ({row.size.toUpperCase()})
                  <div style={{ fontSize: 12, color: '#617379', fontWeight: 400 }}>{row.typography}</div>
                </td>
                <td style={{ padding: '16px' }}>
                  <NumberButton size={row.size} defaultValue={0} padLength={3} state="default" />
                </td>
                <td style={{ padding: '16px' }}>
                  <NumberButton size={row.size} defaultValue={0} padLength={3} state="hover" />
                </td>
                <td style={{ padding: '16px' }}>
                  <NumberButton size={row.size} defaultValue={0} padLength={3} state="disable" disabled />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 5. Formatação com Zeros (000) & Exemplos de Uso */}
      <UnooriaDocSectionHeader
        title="4. Formatação Customizada e Exemplos Reais"
        description="Demonstração do formato 000 oficial do Figma e formatações de mercado."
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
          marginBottom: 32,
        }}
      >
        {/* Formato 000 */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 12,
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: '#6487C2' }}>Padrão Figma (padLength = 3)</span>
          <NumberButton
            size="md"
            value={demoValuePad}
            onChange={setDemoValuePad}
            min={0}
            max={999}
            padLength={3}
          />
          <span style={{ fontSize: 12, color: '#617379' }}>Exibe: "00{demoValuePad}"</span>
        </div>

        {/* Moeda R$ */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 12,
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: '#00A369' }}>Prefixo de Moeda (R$)</span>
          <NumberButton
            size="md"
            value={demoValueMoney}
            onChange={setDemoValueMoney}
            min={0}
            step={10}
            prefix={<span style={{ fontSize: 14, color: '#00A369', fontWeight: 600, marginRight: 4 }}>R$</span>}
          />
          <span style={{ fontSize: 12, color: '#617379' }}>Passo: R$ 10,00</span>
        </div>

        {/* Peso kg */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 12,
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: '#F97607' }}>Decimais e Sufixo (kg)</span>
          <NumberButton
            size="md"
            value={demoValueWeight}
            onChange={setDemoValueWeight}
            min={0.5}
            max={50}
            step={0.5}
            precision={1}
            suffix={<span style={{ fontSize: 14, color: '#617379', fontWeight: 600, marginLeft: 4 }}>kg</span>}
          />
          <span style={{ fontSize: 12, color: '#617379' }}>Passo decimal: 0.5 kg</span>
        </div>
      </div>

      {/* 6. Suporte a Temas */}
      <UnooriaDocSectionHeader
        title="5. Suporte a Temas (Light & Dark)"
        description="Adaptação de contraste para superfícies claras e escuras."
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            padding: 24,
            borderRadius: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 700, color: '#383E41' }}>Tema Claro (Light - Padrão Figma)</span>
          <NumberButton theme="light" size="lg" defaultValue={42} padLength={3} />
        </div>

        <div
          style={{
            backgroundColor: '#22272A',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: 24,
            borderRadius: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 700, color: '#F5F5F5' }}>Tema Escuro (Dark)</span>
          <NumberButton theme="dark" size="lg" defaultValue={42} padLength={3} />
        </div>
      </div>

      {/* 7. Boas Práticas */}
      <UnooriaDocSectionHeader
        title="6. Boas Práticas (Do's & Don'ts)"
        description="Diretrizes essenciais de experiência do usuário para steppers numéricos."
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            backgroundColor: '#0E241B',
            border: '1px solid #00A369',
            borderRadius: 8,
            padding: 20,
          }}
        >
          <h4 style={{ color: '#00A369', margin: '0 0 12px 0', fontSize: 16 }}>✅ O que FAZER (Do's)</h4>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.6, color: '#E8F5EE' }}>
            <li>Defina sempre limites semânticos razoáveis com <code>min</code> e <code>max</code>.</li>
            <li>Utilize o tamanho <code>LG</code> em interfaces touch e PDVs para fácil acionamento.</li>
            <li>Utilize <code>padLength=3</code> para números de código, guichês ou exibição estilo Figma.</li>
            <li>Permita digitação direta (<code>allowInput</code>) em contadores com intervalos longos.</li>
          </ul>
        </div>

        <div
          style={{
            backgroundColor: '#2A1212',
            border: '1px solid #E31A1A',
            borderRadius: 8,
            padding: 20,
          }}
        >
          <h4 style={{ color: '#E31A1A', margin: '0 0 12px 0', fontSize: 16 }}>❌ O que NÃO FAZER (Don'ts)</h4>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.6, color: '#FDECEC' }}>
            <li>Não utilize steppers para intervalos astronômicos sem permitir digitação direta.</li>
            <li>Não utilize tamanhos excessivamente pequenos (<code>XS</code>) em telas de toque.</li>
            <li>Evite steps complexos sem indicar a unidade ou contexto ao usuário.</li>
          </ul>
        </div>
      </div>

      {/* 8. Props API */}
      <UnooriaDocSectionHeader
        title="7. Tabela de Propriedades (Props API)"
        description="Especificação técnica detalhada das propriedades aceitas pelo NumberButton."
      />
      <div style={{ overflowX: 'auto', marginBottom: 32 }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 14,
            textAlign: 'left',
          }}
        >
          <thead>
            <tr style={{ borderBottom: '2px solid #CBD5E1', backgroundColor: '#F8FAFC' }}>
              <th style={{ padding: '12px 16px', color: '#22272A' }}>Propriedade</th>
              <th style={{ padding: '12px 16px', color: '#22272A' }}>Tipo</th>
              <th style={{ padding: '12px 16px', color: '#22272A' }}>Padrão</th>
              <th style={{ padding: '12px 16px', color: '#22272A' }}>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {propsTableData.map((item, idx) => (
              <tr
                key={item.name}
                style={{
                  borderBottom: '1px solid #E2E8F0',
                  backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                }}
              >
                <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#49699F', fontWeight: 600 }}>
                  {item.name}
                </td>
                <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#6487C2' }}>
                  {item.type}
                </td>
                <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#617379' }}>
                  {item.default}
                </td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>
                  {item.desc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </UnooriaDocShell>
  );
};

// Configuração Meta (Sem tags: ['autodocs'] conforme regra oficial)
const meta: Meta<typeof NumberButton> = {
  title: 'Plataforma Unooria/Componentes/NumberButton',
  component: NumberButton,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamanho visual e tipográfico do componente',
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'disable'],
      description: 'Estado visual de homologação',
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Tema visual de cor',
    },
    value: {
      control: 'number',
      description: 'Valor numérico controlado',
    },
    defaultValue: {
      control: 'number',
      description: 'Valor numérico inicial',
    },
    min: {
      control: 'number',
      description: 'Valor mínimo permitido',
    },
    max: {
      control: 'number',
      description: 'Valor máximo permitido',
    },
    step: {
      control: 'number',
      description: 'Passo de incremento/decremento',
    },
    padLength: {
      control: 'number',
      description: 'Quantidade de zeros à esquerda (ex: 3 exibe "000")',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o controle',
    },
    allowInput: {
      control: 'boolean',
      description: 'Permite digitação direta no display central',
    },
  },
  args: {
    size: 'md',
    theme: 'light',
    state: 'default',
    defaultValue: 0,
    min: 0,
    max: 100,
    step: 1,
    padLength: 3,
    disabled: false,
    allowInput: true,
  },
};

export default meta;

type Story = StoryObj<typeof NumberButton>;

/**
 * 📄 Documentação Completa (Padrão Ouro)
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <NumberButtonDocumentationPage />,
};

/**
 * Playground interativo com controls
 */
export const Playground: Story = {
  name: '🎮 Playground Interativo',
  render: (args) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        backgroundColor: args.theme === 'dark' ? '#22272A' : '#F8FAFC',
        borderRadius: 12,
        minHeight: 200,
      }}
    >
      <NumberButton {...args} />
    </div>
  ),
};

/**
 * Matriz Oficial do Figma (Tamanhos x Estados)
 */
export const MatrizFigmaCompleta: Story = {
  name: '📐 Matriz Completa do Figma',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        padding: 32,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      {(['lg', 'md', 'sm', 'xs'] as NumberButtonSize[]).map((sz) => (
        <div key={sz} style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <span style={{ width: 40, fontSize: 14, fontWeight: 700, color: '#383E41' }}>
            {sz.toUpperCase()}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ textAlign: 'center' }}>
              <NumberButton size={sz} defaultValue={0} padLength={3} state="default" />
              <div style={{ fontSize: 11, color: '#617379', marginTop: 6 }}>Default</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <NumberButton size={sz} defaultValue={0} padLength={3} state="hover" />
              <div style={{ fontSize: 11, color: '#617379', marginTop: 6 }}>Hover</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <NumberButton size={sz} defaultValue={0} padLength={3} state="disable" disabled />
              <div style={{ fontSize: 11, color: '#617379', marginTop: 6 }}>Disable</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Comparação de Tamanhos
 */
export const ComparacaoTamanhos: Story = {
  name: '📏 Comparação de Tamanhos (LG, MD, SM, XS)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ width: 60, fontSize: 13, fontWeight: 600, color: '#49699F' }}>LG (20px):</span>
        <NumberButton size="lg" defaultValue={7} padLength={3} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ width: 60, fontSize: 13, fontWeight: 600, color: '#49699F' }}>MD (18px):</span>
        <NumberButton size="md" defaultValue={7} padLength={3} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ width: 60, fontSize: 13, fontWeight: 600, color: '#49699F' }}>SM (16px):</span>
        <NumberButton size="sm" defaultValue={7} padLength={3} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ width: 60, fontSize: 13, fontWeight: 600, color: '#49699F' }}>XS (14px):</span>
        <NumberButton size="xs" defaultValue={7} padLength={3} />
      </div>
    </div>
  ),
};

/**
 * Comparativo de Temas Light e Dark
 */
export const ComparacaoTemas: Story = {
  name: '🌗 Comparativo de Temas (Light & Dark)',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
      <div style={{ backgroundColor: '#FFFFFF', padding: 32, borderRadius: 12, textAlign: 'center', border: '1px solid #E2E8F0' }}>
        <h4 style={{ color: '#383E41', marginBottom: 16 }}>Tema Claro (Light - Padrão Figma)</h4>
        <NumberButton theme="light" size="lg" defaultValue={10} padLength={3} />
      </div>

      <div style={{ backgroundColor: '#22272A', padding: 32, borderRadius: 12, textAlign: 'center' }}>
        <h4 style={{ color: '#F5F5F5', marginBottom: 16 }}>Tema Escuro (Dark)</h4>
        <NumberButton theme="dark" size="lg" defaultValue={10} padLength={3} />
      </div>
    </div>
  ),
};
