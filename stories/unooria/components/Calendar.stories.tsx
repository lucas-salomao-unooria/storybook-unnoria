import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '../../../src/unooria/components/Calendar/Calendar';
import {
  CalendarProps,
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
