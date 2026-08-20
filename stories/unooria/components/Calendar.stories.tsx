import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Calendar } from '../../../src/unooria/components/Calendar/Calendar';
import {
  CalendarEvent,
  DateRange,
} from '../../../src/unooria/components/Calendar/Calendar.types';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';

const sampleEvents: CalendarEvent[] = [
  {
    id: 1,
    date: new Date(2025, 4, 1),
    title: 'Dia do Trabalho',
    time: 'Dia todo',
    eventType: 'nacional',
  },
  {
    id: 2,
    date: new Date(2025, 4, 9),
    title: 'Reunião Pedagógica',
    time: '14:00 - 16:00',
    eventType: 'evento',
  },
  {
    id: 3,
    date: new Date(2025, 4, 10),
    title: 'Entrega de Relatório',
    time: '18:00',
    eventType: 'evento',
  },
  {
    id: 4,
    date: new Date(2025, 4, 10),
    title: 'Live: Carreira Tech',
    time: '19:30 - 21:00',
    eventType: 'evento',
  },
  {
    id: 5,
    date: new Date(2025, 4, 12),
    title: 'Revolução Constitucionalista',
    time: 'Dia todo',
    eventType: 'estadual',
  },
  {
    id: 6,
    date: new Date(2025, 4, 12),
    title: 'Aniversário da Cidade',
    time: 'Dia todo',
    eventType: 'municipal',
  },
  {
    id: 7,
    date: new Date(2025, 4, 14),
    title: 'Aula Inaugural de React',
    time: '19:00 - 21:00',
    eventType: 'evento',
  },
  {
    id: 8,
    date: new Date(2025, 4, 22),
    title: 'Simulado Prático',
    time: '10:00 - 12:00',
    eventType: 'evento',
  },
  {
    id: 9,
    date: new Date(2025, 4, 28),
    title: 'Encerramento de Módulo',
    time: '19:00 - 22:00',
    eventType: 'evento',
  },
];

/**
 * Página de Documentação Rica do Calendar baseada no Padrão Ouro do Design System Unooria
 */
const CalendarDocumentationPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2025, 4, 10));
  const [range, setRange] = useState<DateRange>({
    startDate: new Date(2025, 4, 10),
    endDate: new Date(2025, 4, 16),
  });

  return (
    <UnooriaDocShell>
      {/* 1. Cabeçalho Oficial */}
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Seleção & Tempo"
        title="Calendar"
        description="Um Calendar é um componente de interface usado para exibir datas e permitir a seleção ou visualização de eventos dentro de um intervalo de tempo, com suporte à visão compacta, visão de mês completo com cards expandidos e classificação visual de feriados e eventos."
      />

      {/* 2. Visão Geral */}
      <UnooriaDocSectionHeader
        title="1. Visão Geral & O que são"
        description="Diretrizes conceituais extraídas do Figma oficial."
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
          }}
        >
          <h4 style={{ margin: '0 0 12px 0', color: '#22272A', fontSize: 16 }}>🎯 O que são</h4>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#475157' }}>
            O <strong>Calendar</strong> é ideal para funcionalidades como agendamento, acompanhamento de atividades e controle de prazos.
            Ele oferece destaque visual para o dia atual, eventos agendados e feedback intuitivo na navegação entre meses ou semanas.
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            padding: 24,
            borderRadius: 12,
          }}
        >
          <h4 style={{ margin: '0 0 12px 0', color: '#6487C2', fontSize: 16 }}>🎨 Classificação Oficial de Cores</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: '#383E41' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#E31A1A' }} />
              <strong>Feriado Nacional:</strong> #E31A1A
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#008257' }} />
              <strong>Feriado Estadual:</strong> #008257
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#DD5202' }} />
              <strong>Feriado Municipal:</strong> #DD5202
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#006BFF' }} />
              <strong>Evento / Aula / Live:</strong> #006BFF
            </div>
          </div>
        </div>
      </div>

      {/* 3. Figma Specs */}
      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Links oficiais e nós de design homologados."
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
              Figma Frame Node IDs
            </span>
            <div style={{ fontSize: 16, color: '#22272A', fontWeight: 700, fontFamily: 'monospace' }}>
              12694:2509 (Visão Compacta) • 12694:2547 (Mês Completo)
            </div>
          </div>
          <div style={{ borderLeft: '1px solid #CBD5E1', paddingLeft: 16 }}>
            <span style={{ fontSize: 12, color: '#49699F', textTransform: 'uppercase', fontWeight: 600 }}>
              Component Sets
            </span>
            <div style={{ fontSize: 14, color: '#22272A', fontWeight: 600 }}>
              Calendar_responsive (#12694:2578) • calendar-day (#12694:2522) • calendar (#12694:2547)
            </div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <a
              href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=12694-2547&m=dev"
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
              Abrir Mês Completo no Figma ↗
            </a>
          </div>
        </div>
      </div>

      {/* 4. Matriz do Figma */}
      <UnooriaDocSectionHeader
        title="3. Matriz do Figma (Modos Compacto e Mês Completo)"
        description="Comparação visual entre Visão Mensal Compacta e a Visão Expandida de Mês Completo."
      />
      
      {/* Visão de Mês Completo Expandido */}
      <div style={{ padding: 24, backgroundColor: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0', marginBottom: 32, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h5 style={{ margin: '0 0 16px 0', color: '#22272A', alignSelf: 'flex-start' }}>
          🗓️ Mês Completo Expandido com Cards (#12694:2547)
        </h5>
        <Calendar
          view="month-expanded"
          defaultMonth={new Date(2025, 4, 1)}
          value={selectedDate}
          onSelectDate={setSelectedDate}
          events={sampleEvents}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, marginBottom: 32 }}>
        {/* Visão Mensal Compacta com Pontos */}
        <div style={{ padding: 24, backgroundColor: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h5 style={{ margin: '0 0 16px 0', color: '#22272A' }}>📅 Visão Compacta (#12694:2579)</h5>
          <Calendar
            defaultMonth={new Date(2025, 4, 1)}
            value={selectedDate}
            onSelectDate={setSelectedDate}
            events={sampleEvents}
          />
        </div>

        {/* Seleção de Intervalo / Range */}
        <div style={{ padding: 24, backgroundColor: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h5 style={{ margin: '0 0 16px 0', color: '#22272A' }}>📆 Intervalo de Datas / Period (#18819:1960)</h5>
          <Calendar
            mode="range"
            defaultMonth={new Date(2025, 4, 1)}
            rangeValue={range}
            onSelectRange={setRange}
            events={sampleEvents}
          />
        </div>
      </div>

      {/* 5. Tabela de Props da API */}
      <UnooriaDocSectionHeader
        title="4. Referência Completa de Props da API"
        description="Propriedades disponíveis para o componente Calendar e seus tipos associados."
      />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginBottom: 32 }}>
        {/* Tabela CalendarProps */}
        <div style={{ overflowX: 'auto', borderRadius: 8, border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ padding: '12px 16px', color: '#22272A', fontWeight: 600 }}>Propriedade</th>
                <th style={{ padding: '12px 16px', color: '#22272A', fontWeight: 600 }}>Tipo</th>
                <th style={{ padding: '12px 16px', color: '#22272A', fontWeight: 600 }}>Padrão</th>
                <th style={{ padding: '12px 16px', color: '#22272A', fontWeight: 600 }}>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>mode</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>CalendarMode</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Modo de seleção de datas.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>view</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>CalendarView</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Visualização atual do calendário.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>value</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>Date | null</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Data selecionada para o modo &apos;single&apos;.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>onSelectDate</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>{'(date: Date) => void'}</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Callback acionado ao selecionar uma data (modo &apos;single&apos;).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>rangeValue</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>DateRange</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Intervalo de datas selecionado para o modo &apos;range&apos;.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>onSelectRange</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>{'(range: DateRange) => void'}</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Callback acionado ao selecionar um intervalo de datas (modo &apos;range&apos;).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>multipleValues</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>Date[]</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Lista de datas selecionadas para o modo &apos;multiple&apos;.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>onSelectMultiple</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>{'(dates: Date[]) => void'}</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Callback acionado ao selecionar múltiplas datas (modo &apos;multiple&apos;).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>currentMonth</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>Date</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Mês atualmente exibido (modo controlado).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>defaultMonth</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>Date</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Mês inicial exibido (modo não-controlado).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>onMonthChange</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>{'(newMonth: Date) => void'}</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Callback acionado quando o usuário navega entre meses ou anos.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>minDate</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>Date</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Data mínima permitida para seleção.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>maxDate</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>Date</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Data máxima permitida para seleção.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>disabledDates</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>{'Date[] | ((date: Date) => boolean)'}</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Lista de datas ou função predicado para desabilitar dias específicos.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>events</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>CalendarEvent[]</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Lista de eventos a serem renderizados nas células do calendário.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>showEventTooltip</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>boolean</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Se deve exibir tooltip com detalhes dos eventos ao passar o mouse.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>onEventClick</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>{'(event: CalendarEvent, date: Date) => void'}</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Callback ao clicar em um evento ou dia com eventos.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>renderDay</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>{'(props: CalendarDayRenderProps) => React.ReactNode'}</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Renderizador customizado para o conteúdo das células de dias.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>showOutsideDays</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>boolean</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Se deve exibir os dias pertencentes aos meses anterior e próximo.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>firstDayOfWeek</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>0 | 1</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>0</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Primeiro dia da semana: 0 = Domingo, 1 = Segunda-feira.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>theme</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>CalendarTheme</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Tema visual: &apos;light&apos; ou &apos;dark&apos;.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>size</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>CalendarSize</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Tamanho do componente.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>locale</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>string</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>&apos;pt-BR&apos;</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Código de localidade para nomes e formatações.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>showTodayButton</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>boolean</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Se deve exibir o botão de atalho &quot;Hoje&quot;.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>showHeader</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>boolean</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Se deve exibir o cabeçalho de navegação.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>showQuickNav</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>boolean</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Se deve permitir abrir o seletor rápido de mês e ano.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>showFooter</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>boolean</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Se deve exibir o rodapé com resumo da seleção.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>className</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>string</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Classe CSS customizada.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>style</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>React.CSSProperties</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Estilos inline customizados.</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>ariaLabel</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>string</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Rótulo de acessibilidade.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Tabela CalendarEvent */}
        <div style={{ overflowX: 'auto', borderRadius: 8, border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}>
          <h4 style={{ margin: 0, padding: '16px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#22272A' }}>CalendarEvent</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ padding: '12px 16px', color: '#22272A', fontWeight: 600 }}>Propriedade</th>
                <th style={{ padding: '12px 16px', color: '#22272A', fontWeight: 600 }}>Tipo</th>
                <th style={{ padding: '12px 16px', color: '#22272A', fontWeight: 600 }}>Padrão</th>
                <th style={{ padding: '12px 16px', color: '#22272A', fontWeight: 600 }}>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>id</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>string | number</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Identificador único do evento.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>date</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>Date | string</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Data do evento (objeto Date ou string YYYY-MM-DD).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>title</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>string</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Título do evento exibido no tooltip/detalhes.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>description</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>string</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Descrição opcional.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>eventType</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>CalendarEventType</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Categoria / Tipo de evento conforme Figma.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>color</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>string</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Cor customizada (se eventType não for suficiente).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>dotColor</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>string</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Cor específica para o ponto (dot) sob o dia.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>time</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>string</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Horário de início e fim ou formatado (ex: &quot;09:30 - 11:00&quot; ou &quot;Dia todo&quot;).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>startTime</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>string</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Horário de início estruturado (ex: &quot;09:00&quot;).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>endTime</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>string</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Horário de término estruturado (ex: &quot;10:30&quot;).</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>category</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>string</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Categoria adicional de contexto.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Tabela DateRange */}
        <div style={{ overflowX: 'auto', borderRadius: 8, border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}>
          <h4 style={{ margin: 0, padding: '16px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#22272A' }}>DateRange</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ padding: '12px 16px', color: '#22272A', fontWeight: 600 }}>Propriedade</th>
                <th style={{ padding: '12px 16px', color: '#22272A', fontWeight: 600 }}>Tipo</th>
                <th style={{ padding: '12px 16px', color: '#22272A', fontWeight: 600 }}>Padrão</th>
                <th style={{ padding: '12px 16px', color: '#22272A', fontWeight: 600 }}>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>startDate</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>Date | null</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Data inicial do intervalo.</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', color: '#475157' }}><code>endDate</code></td>
                <td style={{ padding: '12px 16px', color: '#6487C2' }}>Date | null</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
                <td style={{ padding: '12px 16px', color: '#475157' }}>Data final do intervalo.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Boas Práticas (Do's & Don'ts) */}
      <UnooriaDocSectionHeader
        title="5. Boas Práticas (Do's & Don'ts)"
        description="Diretrizes de uso para manter a consistência e usabilidade."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 32 }}>
        {/* DO Card */}
        <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 8, padding: 20 }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#065F46', display: 'flex', alignItems: 'center', gap: 8 }}>
            ✅ Fazer (Do)
          </h4>
          <ul style={{ margin: 0, paddingLeft: 20, color: '#064E3B', fontSize: 14, lineHeight: 1.6 }}>
            <li>Utilize as cores oficiais da marca (Nacional, Estadual, Municipal, Evento) para classificar eventos.</li>
            <li>No modo &apos;range&apos;, deixe claro visualmente o início e o fim da seleção para o usuário.</li>
            <li>Forneça o atributo <code>ariaLabel</code> ou etiquetas visíveis quando o calendário tiver funcionalidade crítica para acessibilidade.</li>
          </ul>
        </div>
        
        {/* DON'T Card */}
        <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: 20 }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#991B1B', display: 'flex', alignItems: 'center', gap: 8 }}>
            ❌ Não Fazer (Don&apos;t)
          </h4>
          <ul style={{ margin: 0, paddingLeft: 20, color: '#7F1D1D', fontSize: 14, lineHeight: 1.6 }}>
            <li>Não polua as células do modo compacto com muito texto; prefira mostrar o detalhe no clique ou no tooltip.</li>
            <li>Evite cores arbitrárias para <code>eventType</code> que não estejam mapeadas no Design System (a menos que seja o modo custom).</li>
            <li>Não force um calendário de &apos;mês completo expandido&apos; em telas muito pequenas que demandem rolagem horizontal excessiva.</li>
          </ul>
        </div>
      </div>
    </UnooriaDocShell>
  );
};

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
      description: 'Modo de seleção de datas',
    },
    view: {
      control: 'select',
      options: ['month', 'month-expanded', 'week-expanded', 'months-picker', 'years-picker'],
      description: 'Visualização atual do calendário',
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Tema de cor',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Dimensão do calendário',
    },
  },
  args: {
    mode: 'single',
    view: 'month-expanded',
    theme: 'light',
    size: 'md',
    defaultMonth: new Date(2025, 4, 1),
    events: sampleEvents,
  },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <CalendarDocumentationPage />,
};

export const VisaoMesCompleto: Story = {
  name: '🗓️ Mês Completo Expandido (#12694:2547)',
  render: () => (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center', backgroundColor: '#F8FAFC', borderRadius: 12 }}>
      <Calendar
        view="month-expanded"
        defaultMonth={new Date(2025, 4, 1)}
        events={sampleEvents}
      />
    </div>
  ),
};

export const Playground: Story = {
  name: '🎮 Playground Interativo',
  render: (args) => (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center', backgroundColor: args.theme === 'dark' ? '#22272A' : '#F8FAFC', borderRadius: 12 }}>
      <Calendar {...args} />
    </div>
  ),
};

export const VisaoSemanaExpandida: Story = {
  name: '📊 Visão Expandida de Semana',
  render: () => (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center', backgroundColor: '#F8FAFC', borderRadius: 12 }}>
      <Calendar
        view="week-expanded"
        defaultMonth={new Date(2025, 4, 1)}
        events={sampleEvents}
      />
    </div>
  ),
};
