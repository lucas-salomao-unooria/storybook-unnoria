import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '../../../src/unooria/components/Calendar/Calendar';
import {
  CalendarProps,
  CalendarEvent,
  DateRange,
  CalendarMode,
  CalendarSize,
  CalendarTheme,
} from '../../../src/unooria/components/Calendar/Calendar.types';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../src/unooria/docs';

/* ==========================================================================
   Ícones SVG Utilitários Inline (Zero Dependências Externas)
   ========================================================================== */

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

/* ==========================================================================
   Funções Auxiliares de Datas para Exemplos
   ========================================================================== */

function getSampleDate(offsetDays: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d;
}

function formatDateBR(date?: Date | null): string {
  if (!date) return 'Nenhuma data selecionada';
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function formatLongDateBR(date?: Date | null): string {
  if (!date) return 'Nenhuma data';
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/* ==========================================================================
   Eventos Mockados para Demonstrações Ricas
   ========================================================================== */

const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 1,
    date: getSampleDate(0),
    title: 'Daily de Alinhamento Unooria DS',
    description: 'Revisão das especificações de acessibilidade do Calendar e novos componentes.',
    time: '09:30 - 10:00',
    category: 'Design System',
    dotColor: '#7FA5E2',
  },
  {
    id: 2,
    date: getSampleDate(0),
    title: 'Aprovação de Protótipos Figma',
    description: 'Apresentação dos fluxos de agendamento e reserva para stakeholders.',
    time: '15:00 - 16:00',
    category: 'Design Review',
    dotColor: '#10B981',
  },
  {
    id: 3,
    date: getSampleDate(2),
    title: 'Sprint Planning & Refinamento',
    description: 'Planejamento da sprint com foco em tokens e internacionalização.',
    time: '14:00 - 15:30',
    category: 'Gestão Ágil',
    dotColor: '#F59E0B',
  },
  {
    id: 4,
    date: getSampleDate(5),
    title: 'Entrega da Release v0.2.0',
    description: 'Publicação do pacote NPM com suporte ao tema Dark e novos componentes.',
    time: '18:00',
    category: 'Deploy & Release',
    dotColor: '#EF4444',
  },
  {
    id: 5,
    date: getSampleDate(8),
    title: 'Workshop de Acessibilidade WCAG 2.1',
    description: 'Capacitação do time em navegação por teclado e leitores de tela NVDA/VoiceOver.',
    time: '10:00 - 12:00',
    category: 'Treinamento',
    dotColor: '#8B5CF6',
  },
  {
    id: 6,
    date: getSampleDate(-3),
    title: 'Sincronização de Tokens com Figma Tokens Studio',
    description: 'Exportação automática dos tokens CSS para o repositório oficial.',
    time: '11:00',
    category: 'Engenharia',
    dotColor: '#006BFF',
  },
];

/* ==========================================================================
   Página de Documentação Rica do Calendar (Padrão Ouro Unooria)
   ========================================================================== */

const CalendarDocumentationPage = () => {
  const [docSingleDate, setDocSingleDate] = useState<Date>(() => new Date());
  const [docRange, setDocRange] = useState<DateRange>({
    startDate: getSampleDate(1),
    endDate: getSampleDate(6),
  });
  const [selectedEventInfo, setSelectedEventInfo] = useState<CalendarEvent | null>(MOCK_CALENDAR_EVENTS[0]);

  const propsTableData = [
    {
      name: 'mode',
      type: "'single' | 'range' | 'multiple'",
      default: "'single'",
      desc: 'Define a mecânica de seleção: data única, intervalo contínuo ou múltiplas datas avulsas.',
    },
    {
      name: 'value',
      type: 'Date | null',
      default: 'undefined',
      desc: 'Data selecionada no modo controlado para seleção única (mode="single").',
    },
    {
      name: 'onSelectDate',
      type: '(date: Date) => void',
      default: 'undefined',
      desc: 'Callback disparado quando o usuário clica em um dia válido no modo de seleção única.',
    },
    {
      name: 'rangeValue',
      type: '{ startDate?: Date | null; endDate?: Date | null }',
      default: 'undefined',
      desc: 'Objeto com data inicial e final selecionadas para o modo de intervalo (mode="range").',
    },
    {
      name: 'onSelectRange',
      type: '(range: DateRange) => void',
      default: 'undefined',
      desc: 'Callback disparado a cada clique de definição de início ou fim de intervalo.',
    },
    {
      name: 'multipleValues',
      type: 'Date[]',
      default: '[]',
      desc: 'Lista de datas selecionadas para o modo múltiplo (mode="multiple").',
    },
    {
      name: 'onSelectMultiple',
      type: '(dates: Date[]) => void',
      default: 'undefined',
      desc: 'Callback disparado ao adicionar ou remover uma data da seleção múltipla.',
    },
    {
      name: 'events',
      type: 'CalendarEvent[]',
      default: '[]',
      desc: 'Lista de eventos com título, cor de indicador (dotColor), descrição, hora e categoria.',
    },
    {
      name: 'showEventTooltip',
      type: 'boolean',
      default: 'true',
      desc: 'Se true, exibe um tooltip/popover acessível contendo o resumo dos eventos ao passar o mouse.',
    },
    {
      name: 'onEventClick',
      type: '(event: CalendarEvent, date: Date) => void',
      default: 'undefined',
      desc: 'Callback acionado ao clicar em um evento listado no calendário.',
    },
    {
      name: 'theme',
      type: "'light' | 'dark'",
      default: "'light'",
      desc: 'Aplica a paleta cromática de superfície e texto para temas Claro ou Escuro.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      desc: 'Escala do calendário: sm (260px), md (320px padrão do Figma) e lg (380px para alta densidade).',
    },
    {
      name: 'showOutsideDays',
      type: 'boolean',
      default: 'true',
      desc: 'Exibe os dias pertencentes aos meses anterior e posterior para completar a grade de 7 colunas.',
    },
    {
      name: 'firstDayOfWeek',
      type: '0 | 1',
      default: '0',
      desc: 'Define o primeiro dia da semana na grade: 0 para Domingo (padrão Brasil) ou 1 para Segunda-feira.',
    },
    {
      name: 'minDate',
      type: 'Date',
      default: 'undefined',
      desc: 'Data mínima permitida. Dias anteriores a esta data ficam automaticamente desabilitados.',
    },
    {
      name: 'maxDate',
      type: 'Date',
      default: 'undefined',
      desc: 'Data máxima permitida. Dias posteriores a esta data ficam automaticamente desabilitados.',
    },
    {
      name: 'disabledDates',
      type: 'Date[] | ((date: Date) => boolean)',
      default: 'undefined',
      desc: 'Array de datas ou função predicado customizada para desabilitar feriados, fins de semana, etc.',
    },
    {
      name: 'showTodayButton',
      type: 'boolean',
      default: 'true',
      desc: 'Exibe botão de atalho no cabeçalho para retornar instantaneamente ao dia de hoje.',
    },
    {
      name: 'showQuickNav',
      type: 'boolean',
      default: 'true',
      desc: 'Habilita o clique no título de mês/ano para abrir a grade rápida de seleção de meses e anos.',
    },
    {
      name: 'showFooter',
      type: 'boolean',
      default: 'false',
      desc: 'Exibe uma barra de rodapé informativa com a síntese da data ou intervalo atualmente selecionado.',
    },
    {
      name: 'renderDay',
      type: '(props: CalendarDayRenderProps) => ReactNode',
      default: 'undefined',
      desc: 'Função de renderização customizada para controle total do conteúdo interno da célula de dia.',
    },
    {
      name: 'locale',
      type: 'string',
      default: "'pt-BR'",
      desc: 'Localidade utilizada para formatação de meses, cabeçalhos de dias e leitores de tela.',
    },
  ];

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Agendamento & Temporalidade"
        title="Calendar"
        description="O Calendar é o componente oficial da Plataforma Unooria para navegação temporal, agendamento de atendimentos/reuniões, seleção de datas únicas ou períodos (range contínuo) e visualização de eventos com pontos indicadores coloridos. Projetado com conformidade estrita aos tokens do Figma (Nós 12694:2508, 18797:1358, 18797:1371), suporte a temas Claro/Escuro e total acessibilidade WCAG 2.1 AA."
      />

      {/* 1. Visão Geral & Casos de Uso */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="1. Visão Geral & Casos de Uso"
          description="Onde e como aplicar o componente Calendar em fluxos de negócios e interfaces corporativas"
          barColor="#006BFF"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
            marginTop: '16px',
          }}
        >
          <div
            style={{
              padding: '20px',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
              📅 Seleção de Data & Prazos
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Perfeito para seletores de data de vencimento, agendamento de consultas médicas, reserva de salas, check-in de hotéis e definição de datas limites em formulários.
            </p>
          </div>

          <div
            style={{
              padding: '20px',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
              ↔️ Intervalos de Períodos (Range)
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Conector visual contínuo com destaque do primeiro ao último dia do período, ideal para filtros de relatórios contábeis, extratos bancários e períodos de férias.
            </p>
          </div>

          <div
            style={{
              padding: '20px',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
              🔵 Indicadores de Eventos (Event Dots)
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Pontos coloridos sob o número do dia com popover informativo automático e integração direta com listas de compromissos diários e tarefas da equipe.
            </p>
          </div>

          <div
            style={{
              padding: '20px',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
              ⚡ Navegação Instantânea de Anos
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Um clique no mês/ano abre imediatamente a grade com os 12 meses ou uma década completa de anos, permitindo saltar rapidamente para datas distantes no passado ou futuro.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Figma & Especificações Técnicas */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="2. Figma & Especificações Técnicas"
          description="Rastreabilidade oficial e parâmetros de design definidos no arquivo Unooria DS v0.2"
          barColor="#7C3AED"
        />

        <div
          style={{
            padding: '24px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            marginTop: '16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              paddingBottom: '16px',
              borderBottom: '1px solid #F1F5F9',
              marginBottom: '20px',
            }}
          >
            <div>
              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
                Figma Source File
              </span>
              <h4 style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#1E293B', fontWeight: 700 }}>
                Unooria_DS_v0.2 • Calendar & Date Pickers
              </h4>
            </div>
            <a
              href="https://www.figma.com/design/i0HRQSBtQQ9ZXDYiJPRnGv/Unooria_DS_v0.2?node-id=12694-2508&m=dev"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: '#7C3AED',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Abrir no Figma Dev Mode <ExternalLinkIcon />
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <strong style={{ fontSize: '13px', color: '#7C3AED', display: 'block', marginBottom: '4px' }}>
                Node ID 12694:2508
              </strong>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>Calendar Container Principal</div>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
                Largura 320px (md), raio 16px, sombra suave <code style={{ fontSize: '11px' }}>0 4px 20px rgba(14,16,57,0.08)</code>.
              </p>
            </div>

            <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <strong style={{ fontSize: '13px', color: '#7C3AED', display: 'block', marginBottom: '4px' }}>
                Node ID 18797:1358
              </strong>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>Células de Dias & Grade 7 Colunas</div>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
                Tamanho da célula 40x40px, raio 8px, tipografia 14px peso 500, conector de range contínuo.
              </p>
            </div>

            <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <strong style={{ fontSize: '13px', color: '#7C3AED', display: 'block', marginBottom: '4px' }}>
                Node ID 18797:1371
              </strong>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>Event Dots & Tooltip Popover</div>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
                Pontos de 4x4px, espaçamento 2px, transição em escala no hover e tooltip escuro com sombra de elevação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Anatomia do Componente e Grade de 7 Colunas */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="3. Anatomia do Componente e Grade de 7 Colunas"
          description="Desconstrução visual dos elementos estruturais e hierarquia funcional do calendário"
          barColor="#10B981"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            backgroundColor: '#FFFFFF',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            marginTop: '16px',
            alignItems: 'center',
          }}
        >
          {/* Visualização de Demonstração */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Calendar
              mode="single"
              value={docSingleDate}
              onSelectDate={(d) => setDocSingleDate(d)}
              events={MOCK_CALENDAR_EVENTS}
              showTodayButton={true}
              showFooter={true}
            />
          </div>

          {/* Lista Anatômica */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ borderLeft: '3px solid #0066FF', paddingLeft: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>1. Cabeçalho de Navegação (Header)</strong>
              <span style={{ fontSize: '13px', color: '#64748B' }}>
                Contém o seletor interativo de Mês/Ano, setas de navegação temporal e o botão de atalho rápido &quot;Hoje&quot;.
              </span>
            </div>

            <div style={{ borderLeft: '3px solid #0066FF', paddingLeft: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>2. Cabeçalho de Dias da Semana (Weekdays)</strong>
              <span style={{ fontSize: '13px', color: '#64748B' }}>
                Grade de 7 colunas (D, S, T, Q, Q, S, S) com tipografia em caixa alta, tamanho 11px e peso semi-bold (600).
              </span>
            </div>

            <div style={{ borderLeft: '3px solid #0066FF', paddingLeft: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>3. Grade de Dias do Mês (Days Grid)</strong>
              <span style={{ fontSize: '13px', color: '#64748B' }}>
                Células de 40x40px com números centralizados, cantos arredondados (8px) e transição fluida para estados de foco/hover.
              </span>
            </div>

            <div style={{ borderLeft: '3px solid #0066FF', paddingLeft: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>4. Indicadores de Eventos (Event Dots)</strong>
              <span style={{ fontSize: '13px', color: '#64748B' }}>
                Até 3 pontos sob a data que sinalizam a quantidade e tipo de compromissos agendados para aquele dia.
              </span>
            </div>

            <div style={{ borderLeft: '3px solid #0066FF', paddingLeft: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>5. Rodapé Opcional (Footer)</strong>
              <span style={{ fontSize: '13px', color: '#64748B' }}>
                Exibe feedback imediato da data ou intervalo selecionado pelo usuário sem ocupar espaço externo.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Matriz de Estados das Células de Dias */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="4. Matriz de Estados das Células de Dias"
          description="Comportamento visual exato para cada condição de interação e contexto temporal"
          barColor="#F59E0B"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
            marginTop: '16px',
          }}
        >
          {/* Default */}
          <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B' }}>Default (Dia Comum)</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 500, color: '#383E41' }}>
                15
              </div>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748B', lineHeight: '1.5' }}>
              Texto escuro (#383E41) com fundo transparente e área de clique de 40x40px.
            </p>
          </div>

          {/* Hover */}
          <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#006BFF' }}>Hover (Foco do Mouse)</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'rgba(127,165,226,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#6487C2' }}>
                15
              </div>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748B', lineHeight: '1.5' }}>
              Fundo sutil <code style={{ fontSize: '11px' }}>rgba(127,165,226,0.18)</code> e texto azul da marca.
            </p>
          </div>

          {/* Selected */}
          <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#6487C2' }}>Selected (Selecionado)</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#6487C2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#FFFFFF', boxShadow: '0 2px 8px rgba(100,135,194,0.4)' }}>
                15
              </div>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748B', lineHeight: '1.5' }}>
              Fundo azul primário (#6487C2), texto branco e sombra de elevação destacada.
            </p>
          </div>

          {/* Today */}
          <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#6487C2' }}>Today (Dia Atual)</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1.5px solid #7FA5E2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#6487C2' }}>
                15
              </div>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748B', lineHeight: '1.5' }}>
              Contorno azul (#7FA5E2), texto em negrito e destaque sem necessidade de clique.
            </p>
          </div>

          {/* In-Range */}
          <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#2F4F7F' }}>In-Range (Intervalo)</span>
              <div style={{ width: '48px', height: '36px', backgroundColor: 'rgba(127,165,226,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#2F4F7F' }}>
                15
              </div>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748B', lineHeight: '1.5' }}>
              Conector contínuo retangular preenchendo o espaço entre as células do período.
            </p>
          </div>

          {/* Outside Month */}
          <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#9C61AE' }}>Outside Month (Fora do Mês)</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 400, color: '#9C61AE' }}>
                31
              </div>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748B', lineHeight: '1.5' }}>
              Tom suave distintivo (#9C61AE) para distinguir dias do mês anterior/próximo.
            </p>
          </div>

          {/* Disabled */}
          <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#94A3B8' }}>Disabled (Bloqueado)</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', opacity: 0.3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 400, color: '#94A3B8', cursor: 'not-allowed' }}>
                15
              </div>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748B', lineHeight: '1.5' }}>
              Opacidade 30%, bloqueio de ponteiro do mouse e rejeição de foco acessível.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Indicadores de Eventos e Agendamentos */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="5. Indicadores de Eventos e Agendamentos"
          description="Sinalização de compromissos com pontos coloridos e integração com painel contextual"
          barColor="#3B82F6"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            backgroundColor: '#FFFFFF',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            marginTop: '16px',
          }}
        >
          <div>
            <Calendar
              mode="single"
              value={docSingleDate}
              onSelectDate={(d) => setDocSingleDate(d)}
              events={MOCK_CALENDAR_EVENTS}
              showEventTooltip={true}
              onEventClick={(ev) => setSelectedEventInfo(ev)}
            />
          </div>

          {/* Painel lateral de detalhes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <CalendarIcon />
              <h4 style={{ margin: 0, fontSize: '15px', color: '#1E293B', fontWeight: 700 }}>
                Compromissos do Dia {formatDateBR(docSingleDate)}
              </h4>
            </div>

            {MOCK_CALENDAR_EVENTS.filter((e) => {
              const evDate = typeof e.date === 'string' ? new Date(e.date) : e.date;
              return (
                evDate.getFullYear() === docSingleDate.getFullYear() &&
                evDate.getMonth() === docSingleDate.getMonth() &&
                evDate.getDate() === docSingleDate.getDate()
              );
            }).length === 0 ? (
              <div style={{ padding: '20px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px dashed #CBD5E1', textAlign: 'center', color: '#64748B', fontSize: '13px' }}>
                Nenhum evento registrado para esta data. Clique em datas com pontos azuis ou verdes para visualizar compromissos!
              </div>
            ) : (
              MOCK_CALENDAR_EVENTS.filter((e) => {
                const evDate = typeof e.date === 'string' ? new Date(e.date) : e.date;
                return (
                  evDate.getFullYear() === docSingleDate.getFullYear() &&
                  evDate.getMonth() === docSingleDate.getMonth() &&
                  evDate.getDate() === docSingleDate.getDate()
                );
              }).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedEventInfo(item)}
                  style={{
                    padding: '14px',
                    borderRadius: '8px',
                    backgroundColor: selectedEventInfo?.id === item.id ? '#EFF6FF' : '#F8FAFC',
                    border: `1px solid ${selectedEventInfo?.id === item.id ? '#93C5FD' : '#E2E8F0'}`,
                    borderLeft: `4px solid ${item.dotColor || '#7FA5E2'}`,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <strong style={{ fontSize: '14px', color: '#1E293B' }}>{item.title}</strong>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: item.dotColor || '#7FA5E2', backgroundColor: '#FFFFFF', padding: '2px 8px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                      {item.category || 'Geral'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748B', marginBottom: '6px' }}>
                    <ClockIcon /> {item.time || 'Horário flexível'}
                  </div>
                  {item.description && (
                    <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>
                      {item.description}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 6. Boas Práticas (Do's & Don'ts) */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader title="6. Diretrizes de Design & Boas Práticas" barColor="#EF4444" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
            marginTop: '16px',
          }}
        >
          {/* Do's */}
          <div
            style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: '#F0FDF4',
              border: '1px solid #BBF7D0',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', color: '#166534', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>✅</span> O que fazer (Do&apos;s)
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#15803D', lineHeight: '1.6' }}>
              <li>Utilize o modo <code style={{ fontSize: '12px' }}>mode=&quot;range&quot;</code> para seleção de períodos contínuos (check-in/check-out, relatórios periódicos).</li>
              <li>Mantenha o botão de atalho &quot;Hoje&quot; ativo (<code style={{ fontSize: '12px' }}>showTodayButton=true</code>) para evitar desorientação temporal do usuário.</li>
              <li>Forneça descrições curtas e horários claros na estrutura de <code style={{ fontSize: '12px' }}>events</code> para facilitar a leitura no tooltip.</li>
              <li>Desabilite datas passadas (<code style={{ fontSize: '12px' }}>minDate</code>) em formulários de agendamento futuro de reuniões ou consultas.</li>
            </ul>
          </div>

          {/* Don'ts */}
          <div
            style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: '#FEF2F2',
              border: '1px solid #FECACA',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', color: '#991B1B', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>❌</span> O que evitar (Don&apos;ts)
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#B91C1C', lineHeight: '1.6' }}>
              <li>Não use o Calendar completo para inputs em tabelas densas quando um <code style={{ fontSize: '12px' }}>DatePicker</code> popover for mais adequado.</li>
              <li>Não insira mais de 3 cores de pontos de eventos por dia para evitar poluição visual na grade.</li>
              <li>Não desabilite a navegação rápida (<code style={{ fontSize: '12px' }}>showQuickNav=false</code>) se o usuário precisar selecionar anos distantes (ex: data de nascimento).</li>
              <li>Não utilize temas manuais incompatíveis com a paleta global do sistema Unooria.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Suporte a Temas (Light e Dark com Toggle) */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="7. Suporte a Temas (Light e Dark Mode)"
          description="Adaptação cromática automática aos tokens do Unooria com contraste calibrado para máxima legibilidade"
          barColor="#06B6D4"
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '16px' }}>
          {/* Tema Claro */}
          <div style={{ padding: '24px', border: '1px solid #E2E8F0', borderRadius: '12px', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4 style={{ margin: '0 0 16px 0', color: '#0284C7', fontSize: '15px', fontWeight: 700, alignSelf: 'flex-start' }}>
              ☀️ Tema Claro (Light Mode)
            </h4>
            <Calendar
              theme="light"
              mode="range"
              rangeValue={docRange}
              onSelectRange={(r) => setDocRange(r)}
              events={MOCK_CALENDAR_EVENTS}
              showFooter
            />
          </div>

          {/* Tema Escuro */}
          <div style={{ padding: '24px', borderRadius: '12px', backgroundColor: '#1A1D1F', border: '1px solid #3D4448', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4 style={{ margin: '0 0 16px 0', color: '#38BDF8', fontSize: '15px', fontWeight: 700, alignSelf: 'flex-start' }}>
              🌙 Tema Escuro (Dark Mode)
            </h4>
            <Calendar
              theme="dark"
              mode="range"
              rangeValue={docRange}
              onSelectRange={(r) => setDocRange(r)}
              events={MOCK_CALENDAR_EVENTS}
              showFooter
            />
          </div>
        </div>
      </section>

      {/* 8. Tabela de Referência de Props da API */}
      <section>
        <UnooriaDocSectionHeader
          title="8. Referência Completa das Propriedades (Props API)"
          description="Documentação técnica detalhada das interfaces TypeScript e opções de customização"
          barColor="#64748B"
        />

        <div style={{ overflowX: 'auto', marginTop: '16px' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: '14px',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
            }}
          >
            <thead>
              <tr style={{ borderBottom: '2px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Propriedade</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Tipo TypeScript</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Padrão</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {propsTableData.map((prop) => (
                <tr key={prop.name} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0066FF', fontFamily: 'monospace' }}>
                    {prop.name}
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#475569', fontSize: '13px' }}>
                    {prop.type}
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#64748B', fontSize: '13px' }}>
                    {prop.default}
                  </td>
                  <td style={{ padding: '12px 16px', color: '#334155' }}>{prop.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </UnooriaDocShell>
  );
};

/* ==========================================================================
   Configuração do Objeto Meta (Storybook) - Sem tags: ['autodocs']
   ========================================================================== */

const meta: Meta<typeof Calendar> = {
  title: 'Plataforma Unooria/Componentes/Calendar',
  component: Calendar,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'range', 'multiple'],
      description: 'Modo de seleção de datas no calendário.',
      table: {
        defaultValue: { summary: 'single' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Escala de dimensão visual do componente.',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Tema visual de superfícies e cores.',
      table: {
        defaultValue: { summary: 'light' },
      },
    },
    showOutsideDays: {
      control: 'boolean',
      description: 'Exibe os dias pertencentes aos meses adjacentes.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    firstDayOfWeek: {
      control: 'select',
      options: [0, 1],
      description: 'Primeiro dia da semana: 0 (Domingo) ou 1 (Segunda-feira).',
      table: {
        defaultValue: { summary: '0' },
      },
    },
    showTodayButton: {
      control: 'boolean',
      description: 'Exibe o botão de atalho para Hoje no cabeçalho.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    showQuickNav: {
      control: 'boolean',
      description: 'Permite abrir a navegação rápida por meses e anos.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    showFooter: {
      control: 'boolean',
      description: 'Exibe o rodapé com a síntese da seleção.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showEventTooltip: {
      control: 'boolean',
      description: 'Exibe tooltip de detalhes sobre os eventos do dia.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    mode: 'single',
    size: 'md',
    theme: 'light',
    showOutsideDays: true,
    firstDayOfWeek: 0,
    showTodayButton: true,
    showQuickNav: true,
    showFooter: true,
    showEventTooltip: true,
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

/* ==========================================================================
   1ª Estória (Mandatória): Documentação Completa Rica
   ========================================================================== */

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <CalendarDocumentationPage />,
};

/* ==========================================================================
   2ª Estória: Playground Interativo com Controles
   ========================================================================== */

/**
 * Ambiente interativo para teste e validação de todas as propriedades e controles.
 */
export const Playground: Story = {
  render: (args) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [range, setRange] = useState<DateRange>({
      startDate: new Date(),
      endDate: getSampleDate(5),
    });
    const [multiple, setMultiple] = useState<Date[]>([
      new Date(),
      getSampleDate(2),
      getSampleDate(4),
    ]);

    const isDark = args.theme === 'dark';

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px',
          minHeight: '480px',
          borderRadius: '16px',
          backgroundColor: isDark ? '#1A1D1F' : '#F8FAFC',
          transition: 'background-color 0.2s ease',
        }}
      >
        <Calendar
          {...args}
          value={selectedDate}
          onSelectDate={(d) => setSelectedDate(d)}
          rangeValue={range}
          onSelectRange={(r) => setRange(r)}
          multipleValues={multiple}
          onSelectMultiple={(m) => setMultiple(m)}
          events={MOCK_CALENDAR_EVENTS}
        />
      </div>
    );
  },
};

/* ==========================================================================
   3ª Estória: Seleção Única (Single Date Selection)
   ========================================================================== */

/**
 * Demonstração do modo padrão de seleção de uma única data.
 */
export const SelecaoUnica: Story = {
  name: '📅 Seleção Única',
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ padding: '16px', backgroundColor: '#EFF6FF', borderRadius: '12px', border: '1px solid #BFDBFE' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#1E40AF', textTransform: 'uppercase' }}>
            Data Selecionada
          </span>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#1E293B', marginTop: '4px' }}>
            {formatLongDateBR(selectedDate)}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Calendar
            mode="single"
            value={selectedDate}
            onSelectDate={(d) => setSelectedDate(d)}
            showTodayButton
            showFooter
          />
        </div>
      </div>
    );
  },
};

/* ==========================================================================
   4ª Estória: Seleção de Intervalo (Range de Datas Contínuo)
   ========================================================================== */

/**
 * Demonstração da seleção de períodos contínuos com conector visual entre datas.
 */
export const SelecaoIntervalo: Story = {
  name: '↔️ Seleção de Intervalo (Range)',
  render: () => {
    const [range, setRange] = useState<DateRange>({
      startDate: getSampleDate(2),
      endDate: getSampleDate(8),
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '440px', margin: '0 auto' }}>
        <div
          style={{
            padding: '16px',
            backgroundColor: '#F0FDF4',
            borderRadius: '12px',
            border: '1px solid #BBF7D0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>
              Check-in / Início
            </span>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B', marginTop: '2px' }}>
              {formatDateBR(range.startDate)}
            </div>
          </div>

          <div style={{ fontSize: '18px', color: '#16A34A', fontWeight: 700 }}>➔</div>

          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>
              Check-out / Fim
            </span>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B', marginTop: '2px' }}>
              {formatDateBR(range.endDate)}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Calendar
            mode="range"
            rangeValue={range}
            onSelectRange={(r) => setRange(r)}
            showTodayButton
            showFooter
          />
        </div>
      </div>
    );
  },
};

/* ==========================================================================
   5ª Estória: Com Eventos e Agendamentos (Pontos Coloridos)
   ========================================================================== */

/**
 * Exibição de compromissos corporativos com pontos indicadores e detalhes.
 */
export const ComEventosEAgendamentos: Story = {
  name: '🔵 Com Eventos e Agendamentos',
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [activeEvent, setActiveEvent] = useState<CalendarEvent | null>(MOCK_CALENDAR_EVENTS[0]);

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', maxWidth: '780px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Calendar
            mode="single"
            value={selectedDate}
            onSelectDate={(d) => setSelectedDate(d)}
            events={MOCK_CALENDAR_EVENTS}
            showEventTooltip
            onEventClick={(ev) => setActiveEvent(ev)}
            showFooter
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CalendarIcon />
            <h4 style={{ margin: 0, fontSize: '15px', color: '#1E293B', fontWeight: 700 }}>
              Agenda de Compromissos
            </h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {MOCK_CALENDAR_EVENTS.map((ev) => (
              <div
                key={ev.id}
                onClick={() => {
                  setActiveEvent(ev);
                  if (ev.date instanceof Date) {
                    setSelectedDate(ev.date);
                  }
                }}
                style={{
                  padding: '12px 14px',
                  borderRadius: '8px',
                  backgroundColor: activeEvent?.id === ev.id ? '#EFF6FF' : '#FFFFFF',
                  border: `1px solid ${activeEvent?.id === ev.id ? '#93C5FD' : '#E2E8F0'}`,
                  borderLeft: `4px solid ${ev.dotColor || '#7FA5E2'}`,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#1E293B' }}>{ev.title}</span>
                  <span style={{ fontSize: '11px', color: '#64748B' }}>{ev.time}</span>
                </div>
                {ev.description && (
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748B' }}>
                    {ev.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

/* ==========================================================================
   6ª Estória: Simulador de Agendamento Completo (Consulta / Reunião)
   ========================================================================== */

/**
 * Simulador interativo real de agendamento de consultas ou reuniões.
 */
export const SimuladorAgendamento: Story = {
  name: '⚡ Simulador de Agendamento',
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date>(() => getSampleDate(1));
    const [selectedTime, setSelectedTime] = useState<string>('10:00');
    const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

    const availableTimeSlots = ['09:00', '10:00', '11:30', '14:00', '15:30', '16:45'];

    const handleConfirmBooking = () => {
      setIsConfirmed(true);
    };

    const handleResetBooking = () => {
      setIsConfirmed(false);
    };

    return (
      <div
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 24px rgba(14,16,57,0.06)',
          overflow: 'hidden',
        }}
      >
        {/* Topo do Card de Agendamento */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#006BFF', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Plataforma de Atendimento Unooria
            </span>
            <h3 style={{ margin: '4px 0 0 0', fontSize: '18px', color: '#1E293B', fontWeight: 700 }}>
              Reserva de Consulta / Alinhamento Técnico
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '13px' }}>
            <UserIcon /> Especialista Sênior
          </div>
        </div>

        {isConfirmed ? (
          /* Tela de Confirmação */
          <div style={{ padding: '48px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16A34A' }}>
              <CheckCircleIcon />
            </div>
            <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#1E293B' }}>
              Agendamento Confirmado com Sucesso!
            </h3>
            <p style={{ margin: 0, fontSize: '15px', color: '#475569', maxWidth: '440px', lineHeight: '1.6' }}>
              Sua sessão foi reservada para <strong>{formatLongDateBR(selectedDate)}</strong> às <strong>{selectedTime}</strong>. O convite com o link do Google Meet foi enviado ao seu e-mail.
            </p>
            <button
              onClick={handleResetBooking}
              style={{
                marginTop: '12px',
                padding: '10px 20px',
                borderRadius: '8px',
                border: '1px solid #006BFF',
                backgroundColor: '#006BFF',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Fazer Novo Agendamento
            </button>
          </div>
        ) : (
          /* Formulário de Seleção */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', padding: '24px' }}>
            {/* Coluna 1: Calendário */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '12px', alignSelf: 'flex-start' }}>
                1. Escolha a data da reunião:
              </span>
              <Calendar
                mode="single"
                value={selectedDate}
                onSelectDate={(d) => setSelectedDate(d)}
                minDate={new Date()}
                showTodayButton
              />
            </div>

            {/* Coluna 2: Horários e Resumo */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
              <div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '12px' }}>
                  2. Horários disponíveis para {formatDateBR(selectedDate)}:
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {availableTimeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      style={{
                        padding: '10px 8px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        border: selectedTime === slot ? '2px solid #006BFF' : '1px solid #E2E8F0',
                        backgroundColor: selectedTime === slot ? '#EFF6FF' : '#FFFFFF',
                        color: selectedTime === slot ? '#006BFF' : '#1E293B',
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Resumo da Escolha */}
              <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Resumo da Reserva
                </div>
                <div style={{ fontSize: '14px', color: '#1E293B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <CalendarIcon /> {formatLongDateBR(selectedDate)}
                </div>
                <div style={{ fontSize: '13px', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ClockIcon /> Horário: {selectedTime} (Duração: 45 min)
                </div>
              </div>

              <button
                onClick={handleConfirmBooking}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#006BFF',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,107,255,0.3)',
                  transition: 'background-color 0.15s ease',
                }}
              >
                Confirmar Agendamento
              </button>
            </div>
          </div>
        )}
      </div>
    );
  },
};
