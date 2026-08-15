import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker, DateRangePicker } from '../../../src/unooria/components/DatePicker/DatePicker';
import {
  DatePickerProps,
  DatePickerShortcut,
  DatePickerSize,
  DatePickerTheme,
  DatePickerPlacement,
} from '../../../src/unooria/components/DatePicker/DatePicker.types';
import { DateRange } from '../../../src/unooria/components/Calendar/Calendar.types';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';

/* ==========================================================================
   Ícones SVG Utilitários Inline (Zero Dependências Externas)
   ========================================================================== */

const CalendarIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const CheckCircleIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const AlertTriangleIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const ExternalLinkIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const SparklesIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2l2.4 7.2L21.6 12l-7.2 2.8L12 22l-2.4-7.2L2.4 12l7.2-2.8z" />
  </svg>
);

const InfoIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const HotelIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
    <path d="M9 16h6" />
    <path d="M8 7h.01" />
    <path d="M16 7h.01" />
    <path d="M8 11h.01" />
    <path d="M16 11h.01" />
  </svg>
);

const SunIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
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

function formatRangeBR(range?: DateRange | null): string {
  if (!range || (!range.startDate && !range.endDate)) return 'Nenhum período selecionado';
  const start = range.startDate ? formatDateBR(range.startDate) : '...';
  const end = range.endDate ? formatDateBR(range.endDate) : '...';
  return `${start} até ${end}`;
}

/* ==========================================================================
   Página de Documentação Rica do DatePicker (Padrão Ouro Unooria)
   ========================================================================== */

const DatePickerDocumentationPage = () => {
  const [docSingleDate, setDocSingleDate] = useState<Date | null>(() => getSampleDate(2));
  const [docRange, setDocRange] = useState<DateRange>({
    startDate: getSampleDate(3),
    endDate: getSampleDate(10),
  });
  const [previewTheme, setPreviewTheme] = useState<DatePickerTheme>('light');

  const propsTableData = [
    {
      name: 'mode',
      type: "'single' | 'range'",
      default: "'single'",
      desc: "Define o modo de seleção do componente: data única ('single') ou intervalo contínuo ('range').",
    },
    {
      name: 'value',
      type: 'Date | null',
      default: 'undefined',
      desc: 'Data selecionada no modo controlado para seleção única (mode="single").',
    },
    {
      name: 'defaultValue',
      type: 'Date | null',
      default: 'undefined',
      desc: 'Data inicial selecionada no modo não-controlado (mode="single").',
    },
    {
      name: 'onChange',
      type: '(date: Date | null) => void',
      default: 'undefined',
      desc: 'Callback disparado ao alterar ou limpar a data no modo de seleção única.',
    },
    {
      name: 'rangeValue',
      type: 'DateRange | null',
      default: 'undefined',
      desc: 'Objeto de intervalo { startDate?: Date, endDate?: Date } no modo controlado (mode="range").',
    },
    {
      name: 'defaultRangeValue',
      type: 'DateRange | null',
      default: 'undefined',
      desc: 'Intervalo inicial no modo não-controlado (mode="range").',
    },
    {
      name: 'onRangeChange',
      type: '(range: DateRange) => void',
      default: 'undefined',
      desc: 'Callback disparado a cada definição de início ou conclusão de período.',
    },
    {
      name: 'label',
      type: 'string',
      default: 'undefined',
      desc: 'Rótulo descritivo posicionado acima do campo de entrada.',
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      desc: 'Exibe o asterisco indicador de obrigatoriedade (*) junto à label.',
    },
    {
      name: 'helperText',
      type: 'string',
      default: 'undefined',
      desc: 'Texto de orientação e auxílio exibido abaixo do campo.',
    },
    {
      name: 'error',
      type: 'boolean | string',
      default: 'false',
      desc: 'Sinaliza o estado de erro no input. Quando fornecida uma string, renderiza a mensagem de validação.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      desc: 'Desabilita o campo de entrada e impede a abertura do popover do calendário.',
    },
    {
      name: 'readOnly',
      type: 'boolean',
      default: 'false',
      desc: 'Torna o campo apenas para leitura, permitindo a seleção via calendário sem digitação manual.',
    },
    {
      name: 'placeholder',
      type: 'string',
      default: "'DD/MM/AAAA' ou 'DD/MM/AAAA - DD/MM/AAAA'",
      desc: 'Texto de instrução temporário exibido quando o campo está vazio.',
    },
    {
      name: 'shortcuts',
      type: 'boolean | DatePickerShortcut[]',
      default: 'false',
      desc: 'Habilita a barra superior de atalhos rápidos com presets ou array de atalhos customizados.',
    },
    {
      name: 'clearable',
      type: 'boolean',
      default: 'true',
      desc: "Exibe o botão de ação rápida 'x' para limpar o valor do campo com um único clique.",
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      desc: 'Tamanho vertical do input: sm (32px), md (48px padrão) ou lg (56px para alta densidade).',
    },
    {
      name: 'theme',
      type: "'light' | 'dark'",
      default: "'light'",
      desc: 'Define a paleta cromática do campo e do popover acoplado (Claro ou Escuro).',
    },
    {
      name: 'popoverPlacement',
      type: "'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'auto'",
      default: "'bottom-start'",
      desc: 'Posicionamento preferencial do popover flutuante em relação ao input.',
    },
    {
      name: 'closeOnSelect',
      type: 'boolean',
      default: 'true',
      desc: 'Fecha o popover automaticamente após selecionar a data (ou o range completo).',
    },
    {
      name: 'minDate',
      type: 'Date',
      default: 'undefined',
      desc: 'Data mínima permitida. Dias anteriores ficam desabilitados no calendário e bloqueados na digitação.',
    },
    {
      name: 'maxDate',
      type: 'Date',
      default: 'undefined',
      desc: 'Data máxima permitida. Dias posteriores ficam desabilitados no calendário e bloqueados na digitação.',
    },
    {
      name: 'disabledDates',
      type: 'Date[] | ((date: Date) => boolean)',
      default: 'undefined',
      desc: 'Array de datas ou função predicado customizada para desabilitar dias específicos.',
    },
    {
      name: 'locale',
      type: 'string',
      default: "'pt-BR'",
      desc: 'Localidade utilizada para formatação de datas e nomes de meses/dias.',
    },
  ];

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Agendamento & Formulários"
        title="DatePicker"
        description="O DatePicker Unooria é o componente oficial para inserção e seleção ágil de datas individuais ou intervalos de períodos (ranges). Combina um campo de entrada com máscara dinâmica progressiva (DD/MM/AAAA), ícone de calendário com popover flutuante acoplado ao Calendar Unooria (Elevação 1 com backdrop blur 4px), barra de atalhos rápidos de período ('Hoje', 'Ontem', 'Últimos 7 dias', 'Este mês', etc.) e suporte completo aos modos Claro e Escuro."
      />

      {/* 1. Visão Geral & Casos de Uso */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="1. Visão Geral & Casos de Uso"
          description="Aplicações práticas do DatePicker em fluxos corporativos, agendamentos e relatórios analíticos"
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
              📝 Campos de Formulário de Data
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Digitação assistida com máscara progressiva para preenchimento ágil de datas de nascimento, vencimento de faturas, contratações e prazos contratuais.
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
              🏨 Agendamento de Viagens & Consultas
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Seleção intuitiva de check-in / check-out, passagens aéreas de ida e volta, consultas médicas ou locação de veículos com validação de período mínimo e datas passadas.
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
              📊 Relatórios & Filtros Analíticos
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Filtro de período contínuo em dashboards gerenciais, conciliações financeiras e exportação de extratos com conectividade visual ponta a ponta.
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
              ⚡ Atalhos de Alta Produtividade
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Chips rápidos para preenchimento instantâneo em 1 clique de períodos como &quot;Hoje&quot;, &quot;Ontem&quot;, &quot;Últimos 7 dias&quot;, &quot;Este mês&quot; e &quot;Ano atual&quot;.
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
                Design System Unooria • DatePicker & DateRange
              </h4>
            </div>
            <a
              href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=18919-25934&m=dev"
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <strong style={{ fontSize: '13px', color: '#7C3AED', display: 'block', marginBottom: '4px' }}>
                Node ID 18919:25934
              </strong>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>DatePicker & Popover Flutuante</div>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
                Elevação 1 (<code style={{ fontSize: '11px' }}>box-shadow: 0 0 5px 1px rgba(34,39,42,0.1)</code>) e <code style={{ fontSize: '11px' }}>backdrop-filter: blur(4px)</code>.
              </p>
            </div>

            <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <strong style={{ fontSize: '13px', color: '#7C3AED', display: 'block', marginBottom: '4px' }}>
                Node ID 24668:2143
              </strong>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>Campos de Entrada & Estados</div>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
                Raio de 12px (md), anel de foco azul (<code style={{ fontSize: '11px' }}>#7FA5E2</code>) e feedback de erro em vermelho (<code style={{ fontSize: '11px' }}>#C11414</code>).
              </p>
            </div>

            <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <strong style={{ fontSize: '13px', color: '#7C3AED', display: 'block', marginBottom: '4px' }}>
                Escala de Alturas
              </strong>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>SM (32px), MD (48px), LG (56px)</div>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
                Conformidade com a grade modular de 8px e tipografia Open Sans integrada ao sistema.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Anatomia do DatePicker & Popover Acoplado */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="3. Anatomia do DatePicker & Popover Acoplado"
          description="Desconstrução visual dos elementos estruturais do campo de entrada e calendário acoplado"
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
            alignItems: 'start',
          }}
        >
          {/* Demonstração Interativa */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '20px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <DatePicker
                label="Data da Consulta Médica"
                required
                helperText="Clique no calendário ou digite dia, mês e ano."
                value={docSingleDate}
                onChange={(d) => setDocSingleDate(d)}
                shortcuts
                clearable
              />
              <div style={{ marginTop: '16px', fontSize: '13px', color: '#475569', backgroundColor: '#FFFFFF', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                📅 <strong>Data Atual:</strong> {formatDateBR(docSingleDate)}
              </div>
            </div>
          </div>

          {/* Lista de Partes Anatômicas */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ borderLeft: '3px solid #006BFF', paddingLeft: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>1. Label & Indicador Obrigatório (*)</strong>
              <span style={{ fontSize: '13px', color: '#64748B' }}>
                Rótulo superior tipográfico (14px, peso 600) com asterisco vermelho em campos mandatórios.
              </span>
            </div>

            <div style={{ borderLeft: '3px solid #006BFF', paddingLeft: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>2. Input com Máscara Progressiva</strong>
              <span style={{ fontSize: '13px', color: '#64748B' }}>
                Formatação automática enquanto o usuário digita (DD/MM/AAAA) sem necessidade de barras manuais.
              </span>
            </div>

            <div style={{ borderLeft: '3px solid #006BFF', paddingLeft: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>3. Botão Limpar ('x') & Ícone de Calendário</strong>
              <span style={{ fontSize: '13px', color: '#64748B' }}>
                Ações interativas integradas à direita para remoção do valor e acionamento manual do popover.
              </span>
            </div>

            <div style={{ borderLeft: '3px solid #006BFF', paddingLeft: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>4. Popover com Elevação 1 & Backdrop Blur</strong>
              <span style={{ fontSize: '13px', color: '#64748B' }}>
                Container flutuante acoplado com efeito translúcido (blur 4px) e posicionamento inteligente.
              </span>
            </div>

            <div style={{ borderLeft: '3px solid #006BFF', paddingLeft: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>5. Chips de Atalhos Rápidos (Shortcuts)</strong>
              <span style={{ fontSize: '13px', color: '#64748B' }}>
                Barra superior de preenchimento instantâneo em um clique para períodos comuns.
              </span>
            </div>

            <div style={{ borderLeft: '3px solid #006BFF', paddingLeft: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>6. Calendário Unooria Embutido</strong>
              <span style={{ fontSize: '13px', color: '#64748B' }}>
                Navegação temporal completa com suporte a anos, meses, eventos coloridos e seleção por clique.
              </span>
            </div>

            <div style={{ borderLeft: '3px solid #006BFF', paddingLeft: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>7. HelperText e Mensagem de Erro</strong>
              <span style={{ fontSize: '13px', color: '#64748B' }}>
                Feedback textual localizado abaixo do campo, com cor vermelha e anel de alerta no estado de erro.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Matriz de Modos de Seleção e Estados do Input */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="4. Matriz de Modos de Seleção e Estados do Input"
          description="Comparação entre seleção única e intervalos contínuos (Range), além de todos os estados do campo"
          barColor="#F59E0B"
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '16px' }}>
          {/* Card Modo Single */}
          <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ padding: '4px 8px', borderRadius: '6px', backgroundColor: '#EFF6FF', color: '#006BFF', fontSize: '12px', fontWeight: 700 }}>
                MODO SINGLE
              </span>
              <strong style={{ fontSize: '15px', color: '#1E293B' }}>Data Única</strong>
            </div>
            <DatePicker
              label="Data de Nascimento"
              placeholder="DD/MM/AAAA"
              defaultValue={getSampleDate(-365 * 25)}
            />
            <p style={{ margin: '12px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Ideal para eventos pontuais, datas comemorativas e preenchimento de cadastros de clientes.
            </p>
          </div>

          {/* Card Modo Range */}
          <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ padding: '4px 8px', borderRadius: '6px', backgroundColor: '#F5F3FF', color: '#7C3AED', fontSize: '12px', fontWeight: 700 }}>
                MODO RANGE
              </span>
              <strong style={{ fontSize: '15px', color: '#1E293B' }}>Intervalo de Período</strong>
            </div>
            <DateRangePicker
              label="Período de Hospedagem"
              value={docRange}
              onChange={(r) => setDocRange(r)}
              shortcuts
            />
            <p style={{ margin: '12px 0 0 0', fontSize: '13px', color: '#64748B' }}>
              Máscara contínua &quot;DD/MM/AAAA - DD/MM/AAAA&quot; com conector visual entre a data de início e fim.
            </p>
          </div>
        </div>

        {/* Grid de Estados */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '20px' }}>
          <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Estado 1</span>
            <h5 style={{ margin: '4px 0 12px 0', fontSize: '14px', color: '#1E293B' }}>Default (Vazio)</h5>
            <DatePicker placeholder="Selecione uma data" />
          </div>

          <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#006BFF', textTransform: 'uppercase' }}>Estado 2</span>
            <h5 style={{ margin: '4px 0 12px 0', fontSize: '14px', color: '#1E293B' }}>Preenchido / Ativo</h5>
            <DatePicker defaultValue={new Date()} />
          </div>

          <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#C11414', textTransform: 'uppercase' }}>Estado 3</span>
            <h5 style={{ margin: '4px 0 12px 0', fontSize: '14px', color: '#1E293B' }}>Com Erro / Inválido</h5>
            <DatePicker error="Data informada não pode ser anterior a hoje." defaultValue={getSampleDate(-5)} />
          </div>

          <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Estado 4</span>
            <h5 style={{ margin: '4px 0 12px 0', fontSize: '14px', color: '#1E293B' }}>Desabilitado</h5>
            <DatePicker disabled defaultValue={new Date()} helperText="Campo bloqueado pelo administrador." />
          </div>
        </div>
      </section>

      {/* 5. Atalhos Rápidos de Período (Shortcuts) */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="5. Atalhos Rápidos de Período (Shortcuts)"
          description="Agilize o fluxo do usuário com chips de períodos frequentes no topo do calendário"
          barColor="#3B82F6"
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 700, color: '#1E293B' }}>
                Presets Nativos Suportados
              </h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#475569', lineHeight: '1.8' }}>
                <li><strong>Modo Single:</strong> &quot;Hoje&quot;, &quot;Ontem&quot;, &quot;Amanhã&quot;, &quot;Início do mês&quot;, &quot;Fim do mês&quot;.</li>
                <li><strong>Modo Range:</strong> &quot;Hoje&quot;, &quot;Últimos 7 dias&quot;, &quot;Últimos 30 dias&quot;, &quot;Este mês&quot;, &quot;Mês passado&quot;, &quot;Ano atual&quot;.</li>
                <li><strong>Customizados:</strong> Suporte completo ao envio de array <code style={{ fontSize: '12px' }}>DatePickerShortcut[]</code>.</li>
              </ul>
            </div>

            <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#006BFF', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                Exemplo com Atalhos Ativados
              </span>
              <DateRangePicker
                label="Filtro de Relatório Financeiro"
                shortcuts
                helperText="Abra o calendário para ver os chips de atalho rápido."
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Boas Práticas (Do's & Don'ts) */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="6. Boas Práticas (Do's & Don'ts)"
          description="Orientações essenciais de usabilidade, clareza e acessibilidade para DatePicker"
          barColor="#EC4899"
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '16px' }}>
          {/* Par 1 */}
          <div style={{ padding: '20px', backgroundColor: '#F0FDF4', borderRadius: '12px', border: '1px solid #BBF7D0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#16A34A' }}>
              <CheckCircleIcon />
              <strong style={{ fontSize: '14px' }}>DO (Recomendado)</strong>
            </div>
            <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: '#166534' }}>
              Utilize o modo <strong>Range</strong> quando o usuário precisa selecionar períodos de início e fim contíguos (ex: reservas de hotel ou relatórios mensais), em vez de dois inputs separados desconexos.
            </p>
          </div>

          <div style={{ padding: '20px', backgroundColor: '#FEF2F2', borderRadius: '12px', border: '1px solid #FECACA' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#DC2626' }}>
              <AlertTriangleIcon />
              <strong style={{ fontSize: '14px' }}>DON&apos;T (Evite)</strong>
            </div>
            <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: '#991B1B' }}>
              Não force o usuário a navegar mês a mês no calendário para datas de nascimento muito distantes. Permita digitação direta com a máscara de teclado ou navegação rápida de anos.
            </p>
          </div>

          {/* Par 2 */}
          <div style={{ padding: '20px', backgroundColor: '#F0FDF4', borderRadius: '12px', border: '1px solid #BBF7D0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#16A34A' }}>
              <CheckCircleIcon />
              <strong style={{ fontSize: '14px' }}>DO (Recomendado)</strong>
            </div>
            <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: '#166534' }}>
              Forneça limites claros usando <strong>minDate</strong> e <strong>maxDate</strong> para impedir que o usuário selecione datas inválidas no passado ou fora da vigência contratual.
            </p>
          </div>

          <div style={{ padding: '20px', backgroundColor: '#FEF2F2', borderRadius: '12px', border: '1px solid #FECACA' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#DC2626' }}>
              <AlertTriangleIcon />
              <strong style={{ fontSize: '14px' }}>DON&apos;T (Evite)</strong>
            </div>
            <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: '#991B1B' }}>
              Não omita o <strong>helperText</strong> ou a mensagem de erro quando uma data informada manualmente estiver fora do formato esperado ou do intervalo permitido.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Suporte a Temas (Light e Dark) */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="7. Suporte a Temas (Light e Dark)"
          description="Alternância em tempo real entre temas Claro e Escuro com paletas calibradas"
          barColor="#14B8A6"
        />

        <div
          style={{
            padding: '24px',
            backgroundColor: previewTheme === 'dark' ? '#181C1E' : '#FFFFFF',
            borderRadius: '12px',
            border: `1px solid ${previewTheme === 'dark' ? '#383E41' : '#E2E8F0'}`,
            marginTop: '16px',
            transition: 'all 0.25s ease',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '12px', color: previewTheme === 'dark' ? '#A4BDE9' : '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
                Demonstração de Tema
              </span>
              <h4 style={{ margin: '4px 0 0 0', fontSize: '16px', color: previewTheme === 'dark' ? '#F5F8FC' : '#1E293B', fontWeight: 700 }}>
                Tema Ativo: {previewTheme === 'dark' ? '🌙 Modo Escuro (Dark)' : '☀️ Modo Claro (Light)'}
              </h4>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setPreviewTheme('light')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: previewTheme === 'light' ? '2px solid #006BFF' : '1px solid #E2E8F0',
                  backgroundColor: previewTheme === 'light' ? '#EFF6FF' : '#FFFFFF',
                  color: previewTheme === 'light' ? '#006BFF' : '#475569',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <SunIcon /> Claro
              </button>
              <button
                onClick={() => setPreviewTheme('dark')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: previewTheme === 'dark' ? '2px solid #7FA5E2' : '1px solid #383E41',
                  backgroundColor: previewTheme === 'dark' ? '#2B3237' : '#22272A',
                  color: previewTheme === 'dark' ? '#FFFFFF' : '#A4BDE9',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <MoonIcon /> Escuro
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <DatePicker
              theme={previewTheme}
              label="Data de Entrega do Projeto"
              defaultValue={getSampleDate(7)}
              shortcuts
              helperText="Tema aplicado automaticamente ao input e ao popover."
            />
            <DateRangePicker
              theme={previewTheme}
              label="Período de Execução"
              defaultValue={{ startDate: getSampleDate(1), endDate: getSampleDate(15) }}
              shortcuts
            />
          </div>
        </div>
      </section>

      {/* 8. Tabela de Props da API */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="8. Tabela de Props da API"
          description="Referência completa de interfaces, tipos e comportamentos do DatePicker e DateRangePicker"
          barColor="#006BFF"
        />

        <div style={{ overflowX: 'auto', marginTop: '16px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: '#1E293B' }}>Propriedade</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: '#1E293B' }}>Tipo</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: '#1E293B' }}>Padrão</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, color: '#1E293B' }}>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {propsTableData.map((prop, idx) => (
                <tr key={prop.name} style={{ borderBottom: idx < propsTableData.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontWeight: 600, color: '#006BFF' }}>
                    {prop.name}
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#7C3AED', fontSize: '12px' }}>
                    {prop.type}
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#64748B', fontSize: '12px' }}>
                    {prop.default}
                  </td>
                  <td style={{ padding: '12px 16px', color: '#334155', lineHeight: '1.5' }}>
                    {prop.desc}
                  </td>
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
   Configuração Storybook Meta
   ========================================================================== */

const meta: Meta<typeof DatePicker> = {
  title: 'Plataforma Unooria/Componentes/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'O DatePicker Unooria oferece seleção de datas únicas ou intervalos de períodos (ranges) com máscara de digitação, popover acoplado ao Calendar Unooria (Elevação 1 com blur de 4px), atalhos de período e temas Claro/Escuro.',
      },
    },
  },
  argTypes: {
    mode: {
      name: 'Modo de Seleção',
      description: 'Define se o componente seleciona uma data única ou um intervalo.',
      control: 'radio',
      options: ['single', 'range'],
      table: {
        category: 'Comportamento',
        defaultValue: { summary: 'single' },
      },
    },
    size: {
      name: 'Tamanho (Size)',
      description: 'Altura do input: sm (32px), md (48px) ou lg (56px).',
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      table: {
        category: 'Aparência',
        defaultValue: { summary: 'md' },
      },
    },
    theme: {
      name: 'Tema Visual',
      description: 'Aplica a paleta de cores para tema Claro ou Escuro.',
      control: 'radio',
      options: ['light', 'dark'],
      table: {
        category: 'Aparência',
        defaultValue: { summary: 'light' },
      },
    },
    label: {
      name: 'Rótulo (Label)',
      description: 'Texto do rótulo exibido acima do campo.',
      control: 'text',
      table: { category: 'Conteúdo' },
    },
    helperText: {
      name: 'Texto de Apoio (HelperText)',
      description: 'Texto informativo exibido abaixo do campo.',
      control: 'text',
      table: { category: 'Conteúdo' },
    },
    placeholder: {
      name: 'Placeholder',
      description: 'Texto temporário exibido quando o campo está vazio.',
      control: 'text',
      table: { category: 'Conteúdo' },
    },
    required: {
      name: 'Obrigatório (Required)',
      description: 'Exibe o asterisco vermelho indicando campo mandatório.',
      control: 'boolean',
      table: { category: 'Validação' },
    },
    disabled: {
      name: 'Desabilitado (Disabled)',
      description: 'Desabilita o input e impede interações.',
      control: 'boolean',
      table: { category: 'Estado' },
    },
    readOnly: {
      name: 'Somente Leitura (ReadOnly)',
      description: 'Impede a digitação direta mantendo a seleção por popover.',
      control: 'boolean',
      table: { category: 'Estado' },
    },
    clearable: {
      name: 'Permite Limpar (Clearable)',
      description: 'Exibe o botão de ação rápida para limpar o valor.',
      control: 'boolean',
      table: { category: 'Ações' },
    },
    shortcuts: {
      name: 'Atalhos Rápidos (Shortcuts)',
      description: 'Exibe chips de períodos pré-definidos no topo do popover.',
      control: 'boolean',
      table: { category: 'Recursos' },
    },
    closeOnSelect: {
      name: 'Fechar ao Selecionar',
      description: 'Fecha o popover automaticamente após concluir a seleção.',
      control: 'boolean',
      table: { category: 'Comportamento' },
    },
    popoverPlacement: {
      name: 'Posicionamento do Popover',
      description: 'Posição preferencial do calendário flutuante.',
      control: 'select',
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
      table: { category: 'Comportamento' },
    },
    showOutsideDays: {
      name: 'Exibir Dias Adjacentes',
      description: 'Exibe dias do mês anterior e posterior na grade de 7 colunas.',
      control: 'boolean',
      table: { category: 'Calendário' },
    },
    firstDayOfWeek: {
      name: 'Primeiro Dia da Semana',
      description: '0 = Domingo (padrão Brasil), 1 = Segunda-feira.',
      control: 'radio',
      options: [0, 1],
      table: { category: 'Calendário' },
    },
    locale: {
      name: 'Localidade (Locale)',
      description: 'Código de internacionalização (padrão pt-BR).',
      control: 'text',
      table: { category: 'Internacionalização' },
    },
  },
  args: {
    mode: 'single',
    size: 'md',
    theme: 'light',
    label: 'Data do Agendamento',
    helperText: 'Selecione uma data no calendário ou digite diretamente.',
    placeholder: 'DD/MM/AAAA',
    required: false,
    disabled: false,
    readOnly: false,
    clearable: true,
    shortcuts: true,
    closeOnSelect: true,
    popoverPlacement: 'bottom-start',
    showOutsideDays: true,
    firstDayOfWeek: 0,
    locale: 'pt-BR',
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

/* ==========================================================================
   1ª Estória: Documentação Completa (Mandatória - Padrão Ouro)
   ========================================================================== */

/**
 * Documentação rica e completa do componente DatePicker baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <DatePickerDocumentationPage />,
};

/* ==========================================================================
   2ª Estória: Playground Interativo
   ========================================================================== */

/**
 * Playground interativo para testar controles, propriedades dinâmicas e temas.
 */
export const Playground: Story = {
  name: '🎛️ Playground Interativo',
  render: (args) => {
    const [dateValue, setDateValue] = useState<Date | null>(new Date());
    const [rangeValue, setRangeValue] = useState<DateRange>({
      startDate: getSampleDate(2),
      endDate: getSampleDate(9),
    });

    const isDark = args.theme === 'dark';
    const { defaultValue, value, onChange, mode, ...restArgs } = args;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '380px',
          padding: '40px 20px',
          backgroundColor: isDark ? '#181C1E' : '#F8FAFC',
          borderRadius: '16px',
          border: `1px solid ${isDark ? '#383E41' : '#E2E8F0'}`,
          transition: 'all 0.2s ease',
        }}
      >
        <div style={{ width: '100%', maxWidth: '380px' }}>
          {args.mode === 'range' ? (
            <DateRangePicker
              {...(restArgs as any)}
              value={rangeValue}
              onChange={(r) => setRangeValue(r)}
            />
          ) : (
            <DatePicker
              {...restArgs}
              value={dateValue}
              onChange={(d) => setDateValue(d)}
            />
          )}

          <div
            style={{
              marginTop: '20px',
              padding: '12px 16px',
              borderRadius: '10px',
              backgroundColor: isDark ? '#22272A' : '#FFFFFF',
              border: `1px solid ${isDark ? '#383E41' : '#E2E8F0'}`,
              fontSize: '13px',
              color: isDark ? '#F5F8FC' : '#1E293B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ color: isDark ? '#A4BDE9' : '#64748B' }}>Valor Selecionado:</span>
            <strong>
              {args.mode === 'range' ? formatRangeBR(rangeValue) : formatDateBR(dateValue)}
            </strong>
          </div>
        </div>
      </div>
    );
  },
};

/* ==========================================================================
   3ª Estória: Seleção de Data Única
   ========================================================================== */

/**
 * Modo single com digitação assistida por máscara e abertura do calendário.
 */
export const SelecaoDataUnica: Story = {
  name: '📅 Seleção de Data Única',
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(() => getSampleDate(5));

    return (
      <div style={{ maxWidth: '420px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(14,16,57,0.04)' }}>
          <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#1E293B', fontWeight: 700 }}>
            Agendar Reunião Técnica
          </h4>
          <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#64748B' }}>
            Digite a data desejada (ex: 25/12/2026) ou abra o popover do calendário.
          </p>

          <DatePicker
            label="Data do Encontro"
            required
            value={selectedDate}
            onChange={(d) => setSelectedDate(d)}
            shortcuts
            clearable
            minDate={new Date()}
            helperText="Apenas datas a partir de hoje são permitidas."
          />

          <div style={{ marginTop: '20px', padding: '12px 14px', backgroundColor: '#EFF6FF', borderRadius: '8px', border: '1px solid #BFDBFE', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#1E40AF' }}>
            <CalendarIcon size={18} />
            <span>Data selecionada: <strong>{formatDateBR(selectedDate)}</strong></span>
          </div>
        </div>
      </div>
    );
  },
};

/* ==========================================================================
   4ª Estória: Seleção de Intervalo (Range)
   ========================================================================== */

/**
 * Modo range com conector visual contínuo entre a data de início e fim.
 */
export const SelecaoIntervaloRange: Story = {
  name: '↔️ Seleção de Intervalo (Range)',
  render: () => {
    const [range, setRange] = useState<DateRange>({
      startDate: getSampleDate(2),
      endDate: getSampleDate(8),
    });

    return (
      <div style={{ maxWidth: '460px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(14,16,57,0.04)' }}>
          <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#1E293B', fontWeight: 700 }}>
            Filtro de Extrato e Movimentações
          </h4>
          <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#64748B' }}>
            Selecione o primeiro e o último dia para calcular o intervalo de transações.
          </p>

          <DateRangePicker
            label="Período do Relatório"
            value={range}
            onChange={(r) => setRange(r)}
            shortcuts
            clearable
            helperText="Máscara automática: DD/MM/AAAA - DD/MM/AAAA"
          />

          <div style={{ marginTop: '20px', padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
              Síntese do Período
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#1E293B', marginBottom: '4px' }}>
              <span>Data Inicial:</span>
              <strong>{formatDateBR(range.startDate)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#1E293B', marginBottom: '8px' }}>
              <span>Data Final:</span>
              <strong>{formatDateBR(range.endDate)}</strong>
            </div>
            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, color: '#006BFF' }}>
              <span>Total de Dias:</span>
              <span>
                {range.startDate && range.endDate
                  ? Math.round((range.endDate.getTime() - range.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
                  : 0}{' '}
                dias
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

/* ==========================================================================
   5ª Estória: Com Atalhos Rápidos
   ========================================================================== */

/**
 * DatePicker com barra de atalhos rápidos padrão e lista customizada de presets.
 */
export const ComAtalhosRapidos: Story = {
  name: '⚡ Com Atalhos Rápidos',
  render: () => {
    const [range, setRange] = useState<DateRange>({
      startDate: new Date(),
      endDate: getSampleDate(6),
    });

    const customShortcuts: DatePickerShortcut[] = [
      {
        label: 'Próximo Fim de Semana',
        value: () => {
          const now = new Date();
          const dayOfWeek = now.getDay();
          const diffToSat = (6 - dayOfWeek + 7) % 7 || 7;
          const sat = new Date(now);
          sat.setDate(now.getDate() + diffToSat);
          const sun = new Date(sat);
          sun.setDate(sat.getDate() + 1);
          return { startDate: sat, endDate: sun };
        },
      },
      {
        label: 'Próxima Quinzena (15d)',
        value: () => {
          const start = new Date();
          const end = new Date();
          end.setDate(start.getDate() + 14);
          return { startDate: start, endDate: end };
        },
      },
      {
        label: 'Trimestre Atual (90d)',
        value: () => {
          const start = new Date();
          const end = new Date();
          end.setDate(start.getDate() + 89);
          return { startDate: start, endDate: end };
        },
      },
    ];

    return (
      <div style={{ maxWidth: '520px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(14,16,57,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <SparklesIcon size={20} />
            <h4 style={{ margin: 0, fontSize: '16px', color: '#1E293B', fontWeight: 700 }}>
              Atalhos Customizados de Negócio
            </h4>
          </div>
          <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#64748B' }}>
            Chips gerados dinamicamente via função para cálculos complexos de datas.
          </p>

          <DateRangePicker
            label="Planejamento Estratégico"
            value={range}
            onChange={(r) => setRange(r)}
            shortcuts={customShortcuts}
            helperText="Abra o seletor para ver os atalhos: 'Próximo Fim de Semana', 'Próxima Quinzena', etc."
          />

          <div style={{ marginTop: '20px', padding: '12px 14px', backgroundColor: '#F0FDF4', borderRadius: '8px', border: '1px solid #BBF7D0', fontSize: '13px', color: '#166534' }}>
            ✨ Período Selecionado: <strong>{formatRangeBR(range)}</strong>
          </div>
        </div>
      </div>
    );
  },
};

/* ==========================================================================
   6ª Estória: Todos os Estados do Input & Tamanhos
   ========================================================================== */

/**
 * Matriz visual comparando Default, Preenchido, Erro, Desabilitado e os 3 tamanhos (sm, md, lg).
 */
export const TodosEstadosInput: Story = {
  name: '🎨 Todos os Estados do Input',
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '860px', margin: '0 auto' }}>
        {/* Seção 1: Estados */}
        <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#1E293B', fontWeight: 700 }}>
            1. Estados de Interação do Input (MD - 48px)
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <DatePicker
              label="Estado Default (Vazio)"
              placeholder="DD/MM/AAAA"
              helperText="Aguardando inserção do usuário."
            />

            <DatePicker
              label="Estado Preenchido"
              defaultValue={new Date()}
              helperText="Data válida inserida no campo."
            />

            <DatePicker
              label="Estado com Erro"
              defaultValue={getSampleDate(-10)}
              error="A data não pode ser anterior ao dia de hoje."
            />

            <DatePicker
              label="Estado Desabilitado"
              disabled
              defaultValue={getSampleDate(3)}
              helperText="Campo bloqueado para edição."
            />
          </div>
        </div>

        {/* Seção 2: Tamanhos */}
        <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#1E293B', fontWeight: 700 }}>
            2. Escala de Tamanhos (SM 32px, MD 48px, LG 56px)
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '420px' }}>
            <DatePicker
              size="sm"
              label="Tamanho Small (32px - Raio 8px)"
              placeholder="DD/MM/AAAA"
              defaultValue={getSampleDate(1)}
            />

            <DatePicker
              size="md"
              label="Tamanho Medium (48px - Raio 12px Padrão)"
              placeholder="DD/MM/AAAA"
              defaultValue={getSampleDate(2)}
            />

            <DatePicker
              size="lg"
              label="Tamanho Large (56px - Raio 16px)"
              placeholder="DD/MM/AAAA"
              defaultValue={getSampleDate(3)}
            />
          </div>
        </div>
      </div>
    );
  },
};

/* ==========================================================================
   7ª Estória: Simulador de Formulário de Reserva
   ========================================================================== */

/**
 * Exemplo interativo realista de fluxo de reserva de hotel/voo com validações.
 */
export const SimuladorFormularioReserva: Story = {
  name: '🏨 Simulador: Formulário de Reserva',
  render: () => {
    const [stayRange, setStayRange] = useState<DateRange>({
      startDate: getSampleDate(3),
      endDate: getSampleDate(7),
    });
    const [guests, setGuests] = useState<number>(2);
    const [roomType, setRoomType] = useState<string>('deluxe');
    const [isBooked, setIsBooked] = useState<boolean>(false);

    const pricePerNightMap: Record<string, number> = {
      standard: 280,
      deluxe: 450,
      suite: 780,
    };

    const nights =
      stayRange.startDate && stayRange.endDate
        ? Math.max(1, Math.round((stayRange.endDate.getTime() - stayRange.startDate.getTime()) / (1000 * 60 * 60 * 24)))
        : 1;

    const pricePerNight = pricePerNightMap[roomType] || 450;
    const totalPrice = nights * pricePerNight;

    const handleConfirm = () => {
      setIsBooked(true);
    };

    const handleReset = () => {
      setIsBooked(false);
    };

    return (
      <div
        style={{
          maxWidth: '780px',
          margin: '0 auto',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 24px rgba(14,16,57,0.06)',
          overflow: 'hidden',
        }}
      >
        {/* Topo do Card */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#006BFF', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Unooria Travel & Hospitality
            </span>
            <h3 style={{ margin: '4px 0 0 0', fontSize: '18px', color: '#1E293B', fontWeight: 700 }}>
              Reserva de Hotel & Hospedagem
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569', fontSize: '13px' }}>
            <HotelIcon /> Grand Unooria Resort ★★★★★
          </div>
        </div>

        {isBooked ? (
          /* Tela de Sucesso */
          <div style={{ padding: '48px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16A34A' }}>
              <CheckCircleIcon size={32} />
            </div>
            <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#1E293B' }}>
              Reserva Confirmada com Sucesso!
            </h3>
            <p style={{ margin: 0, fontSize: '15px', color: '#475569', maxWidth: '460px', lineHeight: '1.6' }}>
              Sua estadia de <strong>{nights} noite(s)</strong> de <strong>{formatDateBR(stayRange.startDate)}</strong> até <strong>{formatDateBR(stayRange.endDate)}</strong> para <strong>{guests} hóspede(s)</strong> foi confirmada.
            </p>
            <div style={{ padding: '12px 24px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '15px', fontWeight: 700, color: '#006BFF' }}>
              Valor Total: R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <button
              onClick={handleReset}
              style={{
                marginTop: '12px',
                padding: '10px 24px',
                borderRadius: '8px',
                border: '1px solid #006BFF',
                backgroundColor: '#006BFF',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Fazer Nova Reserva
            </button>
          </div>
        ) : (
          /* Formulário Interativo */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', padding: '24px' }}>
            {/* Coluna 1: Campos do Formulário */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <DateRangePicker
                label="Período da Hospedagem (Check-in / Check-out)"
                required
                value={stayRange}
                onChange={(r) => setStayRange(r)}
                minDate={new Date()}
                shortcuts
                helperText="Escolha a data de entrada e de saída."
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#22272A', marginBottom: '4px' }}>
                    Tipo de Quarto
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    style={{
                      width: '100%',
                      height: '48px',
                      padding: '0 12px',
                      borderRadius: '12px',
                      border: '1px solid #E4E8E9',
                      fontSize: '14px',
                      color: '#22272A',
                      backgroundColor: '#FFFFFF',
                      outline: 'none',
                    }}
                  >
                    <option value="standard">Standard (R$ 280/noite)</option>
                    <option value="deluxe">Deluxe Vista Mar (R$ 450/noite)</option>
                    <option value="suite">Suíte Presidencial (R$ 780/noite)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#22272A', marginBottom: '4px' }}>
                    Hóspedes
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    style={{
                      width: '100%',
                      height: '48px',
                      padding: '0 12px',
                      borderRadius: '12px',
                      border: '1px solid #E4E8E9',
                      fontSize: '14px',
                      color: '#22272A',
                      backgroundColor: '#FFFFFF',
                      outline: 'none',
                    }}
                  >
                    <option value={1}>1 Adulto</option>
                    <option value={2}>2 Adultos</option>
                    <option value={3}>3 Adultos</option>
                    <option value={4}>4 Adultos</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Coluna 2: Card de Resumo de Cobrança */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  Detalhamento da Fatura
                </span>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#1E293B', marginBottom: '8px' }}>
                  <span>Diárias ({nights}x R$ {pricePerNight}):</span>
                  <strong>R$ {(nights * pricePerNight).toFixed(2)}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#1E293B', marginBottom: '8px' }}>
                  <span>Taxa de Serviço e Turismo:</span>
                  <span style={{ color: '#16A34A', fontWeight: 600 }}>Grátis (0%)</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#1E293B', marginBottom: '12px' }}>
                  <span>Cancelamento Gratuito:</span>
                  <span style={{ color: '#16A34A', fontWeight: 600 }}>Até 24h antes</span>
                </div>

                <div style={{ borderTop: '2px dashed #E2E8F0', paddingTop: '12px', marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B' }}>Total Estimado:</span>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: '#006BFF' }}>
                    R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <button
                onClick={handleConfirm}
                disabled={!stayRange.startDate || !stayRange.endDate}
                style={{
                  width: '100%',
                  marginTop: '16px',
                  padding: '14px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#006BFF',
                  color: '#FFFFFF',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,107,255,0.3)',
                  transition: 'background-color 0.15s ease',
                }}
              >
                Confirmar Reserva do Hotel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  },
};
