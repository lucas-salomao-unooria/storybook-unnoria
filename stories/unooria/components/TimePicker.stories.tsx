import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TimePicker } from '../../../src/unooria/components/TimePicker/TimePicker';
import { Button } from '../../../src/unooria/components/Button/Button';
import '../../../src/unooria/tokens/icons.css';
import '../../../src/unooria/components/TimePicker/TimePicker.css';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

/**
 * Demonstração de agendamento de horário
 */
const AppointmentBookingDemo: React.FC = () => {
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('10:30');

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E4E8E9',
        padding: '32px',
        maxWidth: '560px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <div>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 700, color: '#22272A' }}>
          Agendamento de Mentoria Individual
        </h4>
        <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
          Selecione o intervalo de horário disponível para atendimento com os alunos.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <TimePicker
          label="Horário Inicial"
          required
          value={startTime}
          onChange={setStartTime}
          minuteStep={15}
          helperText="Intervalos de 15 minutos."
          clearable
          fullWidth
        />

        <TimePicker
          label="Horário Final"
          required
          value={endTime}
          onChange={setEndTime}
          minuteStep={15}
          helperText="Término previsto."
          clearable
          fullWidth
        />
      </div>

      <div
        style={{
          padding: '12px 16px',
          backgroundColor: '#F8FAFC',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
          fontSize: '13px',
          color: '#334155',
        }}
      >
        <strong>Resumo do Agendamento:</strong> Atendimento configurado das <strong>{startTime}</strong> às <strong>{endTime}</strong>.
      </div>

      <div>
        <Button variant="primary" onClick={() => alert(`Horário salvo: ${startTime} às ${endTime}`)}>
          Confirmar Disponibilidade
        </Button>
      </div>
    </div>
  );
};

/**
 * Página principal de documentação rica do componente TimePicker (Padrão Ouro)
 */
const TimePickerDocumentationPage: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Formulários & Data/Hora"
        title="TimePicker"
        description="O TimePicker permite ao usuário selecionar horários com precisão e fluidez através de colunas verticais de horas, minutos e segundos, garantindo consistência no formato e evitando erros de digitação."
      />

      {/* =========================================================================
          SEÇÃO 1: ESPECIFICAÇÃO VISUAL FIEL DO FIGMA (Node 18753:5458)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#22272A', margin: '0 0 4px 0' }}>
              Especificação Visual Figma (Node 18753:5458)
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
              Design, proporções e matriz de estados exatos conforme especificados na prancha oficial do Figma.
            </p>
          </div>
          <a
            href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=18753-5458&m=dev"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#F1F5F9',
              color: '#0086FF',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid #E2E8F0',
            }}
          >
            <span>Abrir no Figma (Dev Mode)</span>
            <span>↗</span>
          </a>
        </div>

        {/* CONTAINER DO FIGMA */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '48px',
            border: '1px solid #E4E8E9',
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          }}
        >
          {/* Header do Frame Figma */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '18px', color: '#475157', fontWeight: 400 }}>Components</span>
            <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#22272A', margin: '0 0 16px 0', lineHeight: 1.2 }}>
              Time picker
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#475157', lineHeight: 1.6 }}>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#22272A' }}>O que são:</strong> Um componente que permite ao usuário selecionar um horário
                de forma simples e precisa, seja por rolagem de horas e minutos ou digitação. Ele garante consistência no formato e
                reduz erros, devendo ter boa legibilidade, contraste e interação fluida.
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#22272A' }}>Exemplo visual:</strong> Ao clicar em "Horário da reunião", o Time Picker aparece.
                O usuário ajusta as horas, minutos e segundos, e o valor selecionado, como "10:45:30", é exibido imediatamente no campo,
                confirmando a escolha.
              </p>
            </div>
          </div>

          {/* Demonstração dos Estados Aberto e Fechado */}
          <div style={{ borderTop: '1px solid #E4E8E9', paddingTop: '28px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#7C8E94', textTransform: 'uppercase', marginBottom: '16px', display: 'block' }}>
              Demonstração Prática do Time Picker (Figma Frame 18753:5458)
            </span>
            <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>Formato Simples (Horas e Minutos)</span>
                <TimePicker label="Input Label" required helperIcon defaultValue="10:45" />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>Formato Completo com Segundos</span>
                <TimePicker label="Input Label" required helperIcon showSeconds defaultValue="10:45:30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 2: ESCALA DE TAMANHOS (XS, SM, MD, LG)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Escala Oficial de Tamanhos"
          description="4 alturas do Figma com proporções harmoniosas para qualquer tipo de formulário."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E4E8E9' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0086FF', marginBottom: '8px', display: 'block' }}>
              XS • 32px
            </span>
            <TimePicker size="xs" label="Tamanho XS" defaultValue="08:00" fullWidth />
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E4E8E9' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0086FF', marginBottom: '8px', display: 'block' }}>
              SM • 40px
            </span>
            <TimePicker size="sm" label="Tamanho SM" defaultValue="12:30" fullWidth />
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E4E8E9' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0086FF', marginBottom: '8px', display: 'block' }}>
              MD • 48px (Padrão)
            </span>
            <TimePicker size="md" label="Tamanho MD" defaultValue="14:45" fullWidth />
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E4E8E9' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0086FF', marginBottom: '8px', display: 'block' }}>
              LG • 56px
            </span>
            <TimePicker size="lg" label="Tamanho LG" defaultValue="18:00" fullWidth />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 3: FORMULÁRIO DE AGENDAMENTO
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Exemplo de Aplicação em Agendamentos"
          description="Uso conjunto de dois seletores para definição de janelas de atendimento."
        />

        <AppointmentBookingDemo />
      </section>

      {/* =========================================================================
          SEÇÃO 4: SUPORTE A TEMAS (LIGHT & DARK)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <UnooriaDocSectionHeader
            title="Suporte a Temas (Light & Dark Mode)"
            description="Contraste adaptativo transparente no fundo escuro (#22272A) e claro (#FFFFFF)."
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveTheme('light')}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: activeTheme === 'light' ? '1px solid #0086FF' : '1px solid #CBD5E1',
                backgroundColor: activeTheme === 'light' ? '#0086FF' : '#FFFFFF',
                color: activeTheme === 'light' ? '#FFFFFF' : '#334155',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Light Mode
            </button>
            <button
              onClick={() => setActiveTheme('dark')}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: activeTheme === 'dark' ? '1px solid #7FA5E2' : '1px solid #CBD5E1',
                backgroundColor: activeTheme === 'dark' ? '#22272A' : '#FFFFFF',
                color: activeTheme === 'dark' ? '#FFFFFF' : '#334155',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Dark Mode
            </button>
          </div>
        </div>

        <div
          style={{
            backgroundColor: activeTheme === 'dark' ? '#181C1E' : '#F8FAFC',
            borderRadius: '16px',
            border: activeTheme === 'dark' ? '1px solid #383E41' : '1px solid #E4E8E9',
            padding: '32px',
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap',
            transition: 'all 0.2s ease',
          }}
        >
          <TimePicker
            theme={activeTheme}
            label="Início da Aula"
            defaultValue="19:00"
          />
          <TimePicker
            theme={activeTheme}
            label="Término da Aula"
            defaultValue="22:30"
          />
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 5: BOAS PRÁTICAS DE USO (DO & DON'T)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Boas Práticas de Uso (DO & DON'T)"
          description="Diretrizes para garantir clareza e usabilidade na seleção de horários."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {/* DO */}
          <div
            style={{
              backgroundColor: '#F0FDF4',
              borderRadius: '16px',
              border: '1px solid #BBF7D0',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16A34A', fontWeight: 700, fontSize: '16px' }}>
              <span>✓</span> O QUE FAZER (DO)
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#166534', fontSize: '14px', lineHeight: 1.6 }}>
              <li>
                <strong>Use minuteStep apropriado:</strong> Para reuniões e consultas, use passos de 15 ou 30 minutos.
              </li>
              <li>
                <strong>Oculte segundos a menos que sejam estritamente necessários:</strong> Reduz a complexidade visual do popover.
              </li>
              <li>
                <strong>Sempre forneça o ícone de relógio:</strong> Indica visualmente a finalidade temporal do campo.
              </li>
            </ul>
          </div>

          {/* DON'T */}
          <div
            style={{
              backgroundColor: '#FEF2F2',
              borderRadius: '16px',
              border: '1px solid #FECACA',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#DC2626', fontWeight: 700, fontSize: '16px' }}>
              <span>✕</span> O QUE EVITAR (DON'T)
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#991B1B', fontSize: '14px', lineHeight: 1.6 }}>
              <li>
                <strong>Não force o usuário a digitar horários em texto puro sem máscara:</strong> Pode gerar erros de formato.
              </li>
              <li>
                <strong>Não use seletores de hora para intervalos de datas:</strong> Para datas, utilize o `DatePicker`.
              </li>
              <li>
                <strong>Não bloqueie o fechamento do popover com a tecla ESC:</strong> Essencial para acessibilidade motora.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 6: REFERÊNCIA DE PROPS
          ========================================================================= */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="Referência Completa de Props da API"
          description="Todas as propriedades suportadas pelo componente TimePicker."
        />

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E4E8E9', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E4E8E9' }}>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Prop</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Tipo</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Padrão</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>value</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>string</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>undefined</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Horário selecionado no formato "HH:mm" ou "HH:mm:ss".</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>showSeconds</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>boolean</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>false</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Se exibe a terceira coluna de seleção de segundos.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>minuteStep</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>number</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>1</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Intervalo de minutos entre as opções (ex: 5, 15).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>size</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>'xs' | 'sm' | 'md' | 'lg'</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>'md'</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Tamanho visual (md = 48px do Figma).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>clearable</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>boolean</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>false</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Se exibe o botão de limpar horário.</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>theme</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>'light' | 'dark'</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>'light'</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Tema visual de contraste.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof TimePicker> = {
  title: 'Plataforma Unooria/Componentes/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamanho visual do campo',
      defaultValue: 'md',
    },
    showSeconds: {
      control: 'boolean',
      description: 'Exibir coluna de segundos',
      defaultValue: false,
    },
    minuteStep: {
      control: 'number',
      description: 'Intervalo de minutos',
      defaultValue: 1,
    },
    clearable: {
      control: 'boolean',
      description: 'Botão de limpar',
      defaultValue: true,
    },
    fullWidth: {
      control: 'boolean',
      description: 'Ocupar 100% da largura',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilitado',
      defaultValue: false,
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Tema visual',
      defaultValue: 'light',
    },
  },
  args: {
    size: 'md',
    showSeconds: false,
    minuteStep: 1,
    clearable: true,
    fullWidth: false,
    disabled: false,
    theme: 'light',
    label: 'Horário da Reunião',
    defaultValue: '10:45',
  },
};

export default meta;

type Story = StoryObj<typeof TimePicker>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TimePickerDocumentationPage />,
};

/**
 * Playground interativo com 100% das props mapeadas em controles.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground Interativo',
  render: (args) => {
    const [time, setTime] = useState<string>(args.defaultValue || '10:45');
    return (
      <div style={{ maxWidth: '320px', padding: '24px', backgroundColor: args.theme === 'dark' ? '#181C1E' : '#FFFFFF', borderRadius: '16px' }}>
        <TimePicker {...args} value={time} onChange={setTime} />
      </div>
    );
  },
};

/**
 * Réplica visual 1:1 dos frames oficiais do Figma (Node 18753:5458).
 */
export const ExemploOficialFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma (Node 18753:5458)',
  render: () => (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        padding: '48px',
        border: '1px solid #E4E8E9',
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
        maxWidth: '540px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontSize: '18px', color: '#475157' }}>Components</span>
        <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#22272A', margin: '0 0 12px 0', lineHeight: 1.2 }}>
          Time picker
        </h1>
        <p style={{ margin: 0, fontSize: '13px', color: '#475157', lineHeight: 1.6 }}>
          Um componente que permite ao usuário selecionar um horário de forma simples e precisa.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
        <TimePicker label="Input Label" required helperIcon defaultValue="10:45" />
        <TimePicker label="Input Label" required helperIcon showSeconds defaultValue="10:45:30" />
      </div>
    </div>
  ),
};

/**
 * Comparativo de Todos os Tamanhos Oficiais
 */
export const TodosOsTamanhos: Story = {
  name: 'Todos os Tamanhos Oficiais',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '320px' }}>
      <TimePicker size="xs" label="XS (32px)" defaultValue="08:00" fullWidth />
      <TimePicker size="sm" label="SM (40px)" defaultValue="12:30" fullWidth />
      <TimePicker size="md" label="MD (48px - Padrão)" defaultValue="14:45" fullWidth />
      <TimePicker size="lg" label="LG (56px)" defaultValue="18:00" fullWidth />
    </div>
  ),
};

/**
 * Formulário de Agendamento
 */
export const FormularioDeAgendamento: Story = {
  name: 'Formulário de Agendamento',
  render: () => <AppointmentBookingDemo />,
};
