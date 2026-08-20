import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  BarChart,
  PositiveNegativeBarChart,
  LineChart,
  AreaChart,
  PieChart,
  SemiDonutChart,
  RadarChart,
  RadialBarChart,
  MetricCard,
  StackedProgressBar,
  CircularProgressBar,
  RankingCard,
} from '../../../src/unooria/components/DataViz';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';

// ============================================================================
// Ícones Utilitários SVG para a Documentação
// ============================================================================
const CheckCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const AlertTriangleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

// ============================================================================
// Conjuntos de Dados Oficiais de Demonstração
// ============================================================================
const MONTHLY_LABELS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const MULTI_BAR_DATA = MONTHLY_LABELS.map((label, idx) => ({
  label,
  values: [
    30 + (idx * 5) % 50,
    45 + (idx * 7) % 55,
    20 + (idx * 4) % 40,
    60 + (idx * 3) % 40,
  ],
}));

const POS_NEG_DATA = MONTHLY_LABELS.map((label, idx) => ({
  label,
  positiveValues: [40 + (idx * 6) % 50, 25 + (idx * 4) % 40],
  negativeValues: [20 + (idx * 5) % 40, 15 + (idx * 3) % 35],
}));

const PIE_DATA = [
  { label: 'Automação', value: 45, color: '#2F4F7F' },
  { label: 'Mecatrônica', value: 25, color: '#7FA5E2' },
  { label: 'Eletroeletrônica', value: 15, color: '#A4BDE9' },
  { label: 'Desenvolvimento', value: 15, color: '#BDD0EF' },
];

const RANKING_ITEMS = [
  { id: '1', position: 1, title: 'UX Design Avançado', description: 'Design & Pesquisa', tagText: '98 pts', category: 'UX' },
  { id: '2', position: 2, title: 'React & TypeScript Pro', description: 'Desenvolvimento Frontend', tagText: '92 pts', category: 'DEV' },
  { id: '3', position: 3, title: 'Node.js & Microsserviços', description: 'Desenvolvimento Backend', tagText: '88 pts', category: 'DEV' },
  { id: '4', position: 4, title: 'Inteligência Artificial Aplicada', description: 'Data & Analytics', tagText: '85 pts', category: 'AI' },
];

// Tabelas Específicas de Props por Componente
const BAR_CHART_PROPS = [
  { name: 'data', type: 'MultiBarDataPoint[] | DataPoint[]', default: '[]', desc: 'Array de objetos contendo rótulo no eixo X (label) e array de números (values) para 1, 2, 3 ou 4 barras por categoria.' },
  { name: 'title', type: 'string', default: 'undefined', desc: 'Título principal descritivo posicionado no topo do card.' },
  { name: 'subtitle', type: 'string', default: 'undefined', desc: 'Subtítulo posicionado abaixo do título com contexto complementar.' },
  { name: 'indicators', type: '{ label: string; color: string }[]', default: 'undefined', desc: 'Lista de séries e cores para renderizar a legenda superior com marcadores circulares de 12px.' },
  { name: 'yAxisLabels', type: 'string[]', default: "['100', '75', '50', '25', '0']", desc: 'Rótulos de referência no eixo vertical Y.' },
  { name: 'showTooltip', type: 'boolean', default: 'true', desc: 'Exibe o balão flutuante estilizado no hover com indicador cromático e valor numérico.' },
  { name: 'theme', type: "'light' | 'dark'", default: "'light'", desc: 'Adapta a paleta visual do gráfico (fundos, bordas e linhas de grade).' },
];

const POS_NEG_PROPS = [
  { name: 'data', type: 'PosNegDataPoint[]', default: '[]', desc: 'Array com rótulo (label), valores positivos (positiveValues) e valores negativos (negativeValues).' },
  { name: 'title', type: 'string', default: 'undefined', desc: 'Título principal descritivo do gráfico.' },
  { name: 'subtitle', type: 'string', default: 'undefined', desc: 'Subtítulo complementar.' },
  { name: 'indicators', type: '{ label: string; color: string }[]', default: 'undefined', desc: 'Legenda superior para identificar séries positivas e negativas.' },
  { name: 'yAxisLabels', type: 'string[]', default: "['+100', '+50', '0', '-50', '-100']", desc: 'Rótulos no eixo vertical Y.' },
  { name: 'showTooltip', type: 'boolean', default: 'true', desc: 'Exibe balão flutuante destacando ganhos (+) ou perdas (-).' },
  { name: 'theme', type: "'light' | 'dark'", default: "'light'", desc: 'Tema Claro ou Escuro.' },
];

const LINE_AREA_PROPS = [
  { name: 'categories', type: 'string[]', default: '[]', desc: 'Rótulos dos meses ou pontos temporais ao longo do eixo horizontal X.' },
  { name: 'series', type: 'ChartSeries[]', default: '[]', desc: 'Lista de séries temporais contendo id, name, array de números data e cor opcional.' },
  { name: 'isArea', type: 'boolean', default: 'false', desc: 'Quando true, preenche a área abaixo da linha com gradiente semitransparente suave.' },
  { name: 'yAxisLabels', type: 'string[]', default: "['100', '75', '50', '25', '0']", desc: 'Rótulos no eixo vertical Y.' },
  { name: 'showTooltip', type: 'boolean', default: 'true', desc: 'Exibe o balão com indicador e valor ao passar o mouse sobre cada marcador.' },
  { name: 'theme', type: "'light' | 'dark'", default: "'light'", desc: 'Tema Claro ou Escuro.' },
];

const PIE_DONUT_PROPS = [
  { name: 'data', type: 'DonutDataPoint[]', default: '[]', desc: 'Array de segmentos contendo rótulo (label), valor numérico (value) e cor (color).' },
  { name: 'title', type: 'string', default: 'undefined', desc: 'Título principal do card compacto de 301px.' },
  { name: 'subtitle', type: 'string', default: 'undefined', desc: 'Subtítulo da métrica.' },
  { name: 'showTooltip', type: 'boolean', default: 'true', desc: 'Balão flutuante na fatia/arco com valor absoluto e percentual calculado.' },
  { name: 'theme', type: "'light' | 'dark'", default: "'light'", desc: 'Tema Claro ou Escuro.' },
];

const RADAR_PROPS = [
  { name: 'axes', type: '(string | RadarAxis)[]', default: "['Curso', ...]", desc: 'Rótulos das categorias/variáveis posicionados nas extremidades de cada vértice do radar poligonal (3 ou mais eixos dinâmicos).' },
  { name: 'series', type: 'RadarSeries[]', default: '[]', desc: 'Múltiplas séries poligonais contendo name, values (array de 0 a maxValue) e cor.' },
  { name: 'gridLevels', type: 'number', default: '4', desc: 'Quantidade de níveis concêntricos de profundidade da grade poligonal (ex: 3, 4, 5, 6).' },
  { name: 'maxValue', type: 'number', default: '100', desc: 'Valor máximo da escala numérica para cálculo proporcional dos vértices.' },
  { name: 'showGridLevelsLabels', type: 'boolean', default: 'false', desc: 'Exibe os valores de escala de profundidade na grade interna (ex: 25, 50, 75, 100).' },
  { name: 'fillOpacity', type: 'number', default: '0.2', desc: 'Opacidade de preenchimento dos polígonos de dados.' },
  { name: 'strokeWidth', type: 'number', default: '1.5', desc: 'Espessura do traço do contorno das séries.' },
  { name: 'showDots', type: 'boolean', default: 'true', desc: 'Exibe marcadores circulares nos vértices das séries.' },
  { name: 'dashedLevelIndex', type: 'number', default: '1', desc: 'Índice do nível de profundidade a ser renderizado tracejado.' },
  { name: 'title', type: 'string', default: 'undefined', desc: 'Título do card.' },
  { name: 'subtitle', type: 'string', default: 'undefined', desc: 'Subtítulo contextual.' },
  { name: 'showTooltip', type: 'boolean', default: 'true', desc: 'Exibe o balão de valor no hover de cada vértice.' },
  { name: 'theme', type: "'light' | 'dark'", default: "'light'", desc: 'Tema Claro ou Escuro.' },
];

const METRIC_CARD_PROPS = [
  { name: 'title', type: 'string', default: 'undefined', desc: 'Título ou nome da métrica de negócio.' },
  { name: 'value', type: 'string | number', default: 'undefined', desc: 'Valor numérico de destaque em 40px/48px Bold.' },
  { name: 'variant', type: "'up' | 'down'", default: "'up'", desc: "Variante de tendência: 'up' (badge verde com call_made) ou 'down' (badge vermelho com call_received)." },
  { name: 'tagText', type: 'string', default: 'undefined', desc: 'Texto da variação percentual exibido junto à tag (ex: "+15.4%").' },
  { name: 'theme', type: "'light' | 'dark'", default: "'light'", desc: 'Tema Claro ou Escuro.' },
];

const STACKED_PROGRESS_PROPS = [
  { name: 'segments', type: 'StackedSegment[]', default: '[]', desc: 'Lista de segmentos com proporção (value), cor, rótulo e texto opcional.' },
  { name: 'totalValue', type: 'string | number', default: 'undefined', desc: 'Valor total exibido no topo do card de 606px.' },
  { name: 'title', type: 'string', default: 'undefined', desc: 'Título principal do card.' },
  { name: 'subtitle', type: 'string', default: 'undefined', desc: 'Subtítulo contextual.' },
  { name: 'showTooltip', type: 'boolean', default: 'true', desc: 'Balão flutuante exibido no hover de cada segmento da barra.' },
  { name: 'theme', type: "'light' | 'dark'", default: "'light'", desc: 'Tema Claro ou Escuro.' },
];

const RANKING_CARD_PROPS = [
  { name: 'items', type: 'RankingItem[]', default: '[]', desc: 'Lista ordenada de itens contendo position, title, description, tagText e category.' },
  { name: 'variant', type: "'default' | 'label-only' | 'describe-only'", default: "'default'", desc: 'Densidade visual dos itens na lista.' },
  { name: 'searchPlaceholder', type: 'string', default: "'Buscar...'", desc: 'Texto de orientação do campo de pesquisa integrado.' },
  { name: 'theme', type: "'light' | 'dark'", default: "'light'", desc: 'Tema Claro ou Escuro.' },
];

const CIRCULAR_PROGRESS_PROPS = [
  { name: 'value', type: 'number', default: '0', desc: 'Valor percentual de 0 a 100.' },
  { name: 'size', type: '48 | 56 | 66 | number', default: '56', desc: 'Diâmetro oficial em pixels.' },
  { name: 'strokeWidth', type: 'number', default: '4', desc: 'Espessura do traço da barra circular.' },
  { name: 'showLabel', type: 'boolean', default: 'true', desc: 'Exibe o texto de porcentagem centralizado.' },
  { name: 'color', type: 'string', default: "'#6487C2'", desc: 'Cor do progresso preenchido.' },
  { name: 'theme', type: "'light' | 'dark'", default: "'light'", desc: 'Tema Claro ou Escuro.' },
];

/**
 * Componente Utilitário para Renderizar Tabela de Props
 */
const PropsTableRenderer = ({ data }: { data: { name: string; type: string; default: string; desc: string }[] }) => (
  <div style={{ overflowX: 'auto', marginTop: '12px', marginBottom: '24px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
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
        {data.map((prop, idx) => (
          <tr key={prop.name} style={{ borderBottom: idx < data.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
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
);

/**
 * Página de Documentação Rica de DataViz baseada no Padrão Ouro do Design System Unooria
 */
const DataVizDocumentationPage = () => {
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light');

  return (
    <UnooriaDocShell>
      {/* 1. Cabeçalho Oficial */}
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Visualização de Dados"
        title="DataViz"
        description="Conjunto completo e nativo de componentes para visualização de dados e dashboards corporativos. Desenvolvido em SVG puro com React e CSS nativo (sem bibliotecas externas pesadas), oferecendo alta performance, balões flutuantes interativos no hover, suporte a temas Claro/Escuro e total conformidade com o Figma."
      />

      {/* 2. Visão Geral & Como Inserir Dados */}
      <UnooriaDocSectionHeader
        title="1. Visão Geral & Arquitetura dos Gráficos"
        description="Como alimentar os gráficos com dados e por que não precisamos de bibliotecas externas pesadas"
        barColor="#006BFF"
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <div style={{ padding: '20px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
            ⚡ 100% Nativo em SVG (Zero Dependências)
          </h4>
          <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: '#64748B' }}>
            Todos os gráficos são calculados e renderizados usando elementos vetoriais SVG nativos do React. Isso elimina dependências volumosas (como D3, Chart.js ou Recharts), garantindo carregamento instantâneo e total controle visual.
          </p>
        </div>

        <div style={{ padding: '20px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
            📊 Como Inserir Dados (Arrays Tipados)
          </h4>
          <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: '#64748B' }}>
            Basta fornecer um array simples de objetos TypeScript. Para barras múltiplas, use <code style={{ color: '#006BFF' }}>values: [num1, num2]</code>. Para radar, configure quantidade livre de eixos e profundidade.
          </p>
        </div>

        <div style={{ padding: '20px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
            🎈 Balões Flutuantes (Tooltips no Hover)
          </h4>
          <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: '#64748B' }}>
            Ao passar o cursor sobre qualquer ponto, barra, fatia ou vértice, um balão inteligente surge com a categoria, indicador cromático e valor exato formatado.
          </p>
        </div>
      </div>

      {/* 3. Figma & Especificações Técnicas */}
      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Links oficiais e nós de design homologados."
        barColor="#7FA5E2"
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
              5847:2154 (DataViz)
            </div>
          </div>
          <div style={{ borderLeft: '1px solid #CBD5E1', paddingLeft: 16 }}>
            <span style={{ fontSize: 12, color: '#49699F', textTransform: 'uppercase', fontWeight: 600 }}>
              Component Sets
            </span>
            <div style={{ fontSize: 14, color: '#22272A', fontWeight: 600 }}>
              Barras (#5843:564) • Pos/Neg (#5849:565) • Pizza (#5847:2374) • Meio Donut (#5849:2114) • Radar (#5847:2087) • Métricas (#5803:473) • Ranking (#26096:16701)
            </div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <a
              href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=5847-2154&m=dev"
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

      {/* 4. Matriz de Gráficos de Barras com Tooltips */}
      <UnooriaDocSectionHeader
        title="3. Gráficos de Barras (Múltiplas e Positivo/Negativo)"
        description="Passe o cursor sobre qualquer barra para testar os balões flutuantes interativos."
        barColor="#01B574"
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 32 }}>
        <BarChart
          title="Desempenho Mensal de Matrículas"
          subtitle="Comparativo por categoria de formação com balões interativos"
          data={MULTI_BAR_DATA}
          indicators={[
            { label: 'Presencial', color: '#BDD0EF' },
            { label: 'EAD', color: '#7FA5E2' },
            { label: 'Híbrido', color: '#D3E0F5' },
            { label: 'In-Company', color: '#A4BDE9' },
          ]}
        />

        <PositiveNegativeBarChart
          title="Variação de Desempenho e Metas (Positivo / Negativo)"
          subtitle="Ganhos e perdas percentuais por mês em torno do eixo zero"
          data={POS_NEG_DATA}
          indicators={[
            { label: 'Meta Atingida (+)', color: '#7FA5E2' },
            { label: 'Desvio Negativo (-)', color: '#01B574' },
          ]}
        />
      </div>

      {/* 5. Gráficos de Linhas e Área */}
      <UnooriaDocSectionHeader
        title="4. Gráficos de Linhas e Área"
        description="Curvas contínuas com marcadores circulares e balões flutuantes de valores."
        barColor="#8A38F5"
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 32 }}>
        <AreaChart
          title="Evolução de Usuários Ativos"
          subtitle="Acessos diários na plataforma"
          categories={['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']}
          series={[
            { id: '1', name: 'Alunos', data: [30, 45, 55, 60, 75, 80, 85, 90, 88, 92, 95, 98], color: '#7FA5E2' },
            { id: '2', name: 'Instrutores', data: [15, 20, 25, 30, 35, 40, 42, 45, 48, 50, 52, 55], color: '#BDD0EF' },
          ]}
        />
      </div>

      {/* 6. Gráficos Compactos e Circulares */}
      <UnooriaDocSectionHeader
        title="5. Gráficos de Pizza, Semi-Donut (180°), Radar e Barras Radiais"
        description="Formatos compactos de 301px com legendas verticais e tooltips interativos."
        barColor="#DD5202"
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 32 }}>
        <PieChart
          title="Distribuição de Cursos"
          subtitle="Total de inscritos por área"
          data={PIE_DATA}
        />

        <SemiDonutChart
          title="Ocupação de Vagas"
          subtitle="Meio gráfico de pizza (180°)"
          data={PIE_DATA}
        />

        <RadarChart
          title="Title Example"
          subtitle="Subtitle Example"
          axes={['Curso', 'Curso', 'Curso', 'Curso', 'Curso', 'Curso']}
          series={[
            { name: 'Indicator', values: [85, 90, 70, 85, 65, 95], color: '#2F4F7F' },
            { name: 'Indicator', values: [60, 75, 80, 60, 85, 70], color: '#7FA5E2' },
          ]}
        />

        <RadialBarChart
          title="Progresso por Módulo"
          subtitle="Barras circulares concêntricas"
          data={[
            { label: 'Módulo 1', value: 90, color: '#2F4F7F' },
            { label: 'Módulo 2', value: 75, color: '#7FA5E2' },
            { label: 'Módulo 3', value: 50, color: '#A4BDE9' },
            { label: 'Módulo 4', value: 30, color: '#D3E0F5' },
          ]}
        />
      </div>

      {/* 7. Painéis de Métricas, Barra Empilhada e Ranking */}
      <UnooriaDocSectionHeader
        title="6. Painel de Métricas (KPIs), Barra de Progresso Empilhada e Ranking"
        description="Cards oficiais de métricas (301x128px), barra de progresso empilhada de 606px e cards de ranking com busca."
        barColor="#EC4899"
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginBottom: 32, alignItems: 'flex-start' }}>
        <MetricCard
          title="Total de Alunos"
          value="1.420"
          variant="up"
          tagText="+18%"
        />

        <MetricCard
          title="Taxa de Evasão"
          value="3.2%"
          variant="down"
          tagText="-2.4%"
        />

        <StackedProgressBar
          title="Status de Solicitações"
          subtitle="Distribuição em tempo real"
          totalValue="1.000"
          segments={[
            { label: 'Abertas', value: 450, amountText: '450', color: '#2F4F7F' },
            { label: 'Em análise', value: 300, amountText: '300', color: '#7FA5E2' },
            { label: 'Concluídas', value: 250, amountText: '250', color: '#A4BDE9' },
          ]}
        />

        <RankingCard
          title="Top Cursos Mais Acessados"
          subtitle="Ranking semanal por engajamento"
          items={RANKING_ITEMS}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 24px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#22272A' }}>Progresso Circular</span>
            <span style={{ fontSize: 12, color: '#617379' }}>Tamanhos 48px, 56px, 66px</span>
          </div>
          <CircularProgressBar value={85} size={48} />
          <CircularProgressBar value={75} size={56} />
          <CircularProgressBar value={92} size={66} />
        </div>
      </div>

      {/* 8. Boas Práticas (Do's & Don'ts) */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="7. Boas Práticas (Do's & Don'ts)"
          description="Diretrizes essenciais de clareza visual e acessibilidade para visualização de dados"
          barColor="#F59E0B"
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '16px' }}>
          <div style={{ padding: '20px', backgroundColor: '#F0FDF4', borderRadius: '12px', border: '1px solid #BBF7D0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#16A34A' }}>
              <CheckCircleIcon />
              <strong style={{ fontSize: '14px' }}>DO (Recomendado)</strong>
            </div>
            <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: '#166534' }}>
              Utilize o <strong>PositiveNegativeBarChart</strong> para demonstrar métricas com variações em torno de um ponto de equilíbrio ou meta (ex: lucros vs prejuízos).
            </p>
          </div>

          <div style={{ padding: '20px', backgroundColor: '#FEF2F2', borderRadius: '12px', border: '1px solid #FECACA' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#DC2626' }}>
              <AlertTriangleIcon />
              <strong style={{ fontSize: '14px' }}>DON&apos;T (Evite)</strong>
            </div>
            <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: '#991B1B' }}>
              Não utilize mais de 6 fatias em gráficos de <strong>PieChart</strong> ou <strong>SemiDonutChart</strong> para não prejudicar a legibilidade da legenda e das fatias.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Suporte a Temas (Light e Dark) */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="8. Suporte a Temas (Light e Dark)"
          description="Alternância em tempo real com adaptação automática de contraste de eixos, grids e balões de valores"
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
            <MetricCard
              theme={previewTheme}
              title="Receita Mensal"
              value="R$ 145.800"
              variant="up"
              tagText="+22.4%"
            />
            <PieChart
              theme={previewTheme}
              title="Capacidade"
              subtitle="Por divisão"
              data={PIE_DATA}
            />
          </div>
        </div>
      </section>

      {/* 10. Tabelas Detalhadas de Props da API por Componente */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="9. Referência Completa de Props da API (Por Componente)"
          description="Interfaces, tipos e propriedades individuais de cada componente do DataViz"
          barColor="#006BFF"
        />

        {/* 9.1 BarChart */}
        <h4 style={{ margin: '20px 0 4px 0', fontSize: '15px', color: '#1E293B', fontWeight: 700 }}>
          📊 BarChart (Gráfico de Barras)
        </h4>
        <span style={{ fontSize: '12px', color: '#64748B' }}>Interface: <code>BarChartProps</code></span>
        <PropsTableRenderer data={BAR_CHART_PROPS} />

        {/* 9.2 PositiveNegativeBarChart */}
        <h4 style={{ margin: '20px 0 4px 0', fontSize: '15px', color: '#1E293B', fontWeight: 700 }}>
          ⚖️ PositiveNegativeBarChart (Barras Positivas e Negativas)
        </h4>
        <span style={{ fontSize: '12px', color: '#64748B' }}>Interface: <code>PositiveNegativeBarChartProps</code></span>
        <PropsTableRenderer data={POS_NEG_PROPS} />

        {/* 9.3 LineChart & AreaChart */}
        <h4 style={{ margin: '20px 0 4px 0', fontSize: '15px', color: '#1E293B', fontWeight: 700 }}>
          📈 LineChart & AreaChart (Linhas e Área)
        </h4>
        <span style={{ fontSize: '12px', color: '#64748B' }}>Interface: <code>LineChartProps</code></span>
        <PropsTableRenderer data={LINE_AREA_PROPS} />

        {/* 9.4 PieChart & SemiDonutChart */}
        <h4 style={{ margin: '20px 0 4px 0', fontSize: '15px', color: '#1E293B', fontWeight: 700 }}>
          🍩 PieChart & SemiDonutChart (Pizza e Meio Donut 180°)
        </h4>
        <span style={{ fontSize: '12px', color: '#64748B' }}>Interface: <code>PieChartProps</code> / <code>SemiDonutChartProps</code></span>
        <PropsTableRenderer data={PIE_DONUT_PROPS} />

        {/* 9.5 RadarChart */}
        <h4 style={{ margin: '20px 0 4px 0', fontSize: '15px', color: '#1E293B', fontWeight: 700 }}>
          🕸️ RadarChart (Gráfico Radar)
        </h4>
        <span style={{ fontSize: '12px', color: '#64748B' }}>Interface: <code>RadarChartProps</code></span>
        <PropsTableRenderer data={RADAR_PROPS} />

        {/* 9.6 MetricCard */}
        <h4 style={{ margin: '20px 0 4px 0', fontSize: '15px', color: '#1E293B', fontWeight: 700 }}>
          🎯 MetricCard (Painel de Métricas / KPI)
        </h4>
        <span style={{ fontSize: '12px', color: '#64748B' }}>Interface: <code>MetricCardProps</code></span>
        <PropsTableRenderer data={METRIC_CARD_PROPS} />

        {/* 9.7 StackedProgressBar */}
        <h4 style={{ margin: '20px 0 4px 0', fontSize: '15px', color: '#1E293B', fontWeight: 700 }}>
          📑 StackedProgressBar (Barra Empilhada)
        </h4>
        <span style={{ fontSize: '12px', color: '#64748B' }}>Interface: <code>StackedProgressBarProps</code></span>
        <PropsTableRenderer data={STACKED_PROGRESS_PROPS} />

        {/* 9.8 RankingCard */}
        <h4 style={{ margin: '20px 0 4px 0', fontSize: '15px', color: '#1E293B', fontWeight: 700 }}>
          🏆 RankingCard (Top Cursos / Cards de Ranking)
        </h4>
        <span style={{ fontSize: '12px', color: '#64748B' }}>Interface: <code>RankingCardProps</code></span>
        <PropsTableRenderer data={RANKING_CARD_PROPS} />

        {/* 9.9 CircularProgressBar */}
        <h4 style={{ margin: '20px 0 4px 0', fontSize: '15px', color: '#1E293B', fontWeight: 700 }}>
          ⭕ CircularProgressBar (Progresso Circular)
        </h4>
        <span style={{ fontSize: '12px', color: '#64748B' }}>Interface: <code>CircularProgressBarProps</code></span>
        <PropsTableRenderer data={CIRCULAR_PROGRESS_PROPS} />
      </section>
    </UnooriaDocShell>
  );
};

const meta: Meta = {
  title: 'Plataforma Unooria/Componentes/DataViz',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj;

// ============================================================================
// HISTÓRIA 1: Documentação Completa (Padrão Ouro)
// ============================================================================
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <DataVizDocumentationPage />,
};

// ============================================================================
// PLAYGROUNDS INDIVIDUAIS COM TODAS AS PROPS MAPEDAS PARA CADA UM DOS 12 ELEMENTOS
// ============================================================================

// 1. BarChart
export const PlaygroundBarChart: StoryObj<typeof BarChart> = {
  name: '🕹️ 1. Gráfico de Barras',
  args: {
    title: 'Desempenho Mensal',
    subtitle: 'Matrículas por categoria',
    yAxisLabels: ['100', '75', '50', '25', '0'],
    indicators: [
      { label: 'Presencial', color: '#BDD0EF' },
      { label: 'EAD', color: '#7FA5E2' },
      { label: 'Híbrido', color: '#D3E0F5' },
      { label: 'In-Company', color: '#A4BDE9' },
    ],
    data: MULTI_BAR_DATA,
    theme: 'light',
    showTooltip: true,
  },
  argTypes: {
    title: { control: 'text', description: 'Título principal do card' },
    subtitle: { control: 'text', description: 'Subtítulo contextual' },
    yAxisLabels: { control: 'object', description: 'Rótulos do eixo vertical Y' },
    indicators: { control: 'object', description: 'Legenda superior com cores' },
    data: { control: 'object', description: 'Array de dados (MultiBarDataPoint[])' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema Claro / Escuro' },
    showTooltip: { control: 'boolean', description: 'Balão flutuante no hover' },
  },
  render: (args) => (
    <div style={{ padding: 24, backgroundColor: args.theme === 'dark' ? '#1a1d1f' : '#F8FAFC', borderRadius: 12 }}>
      <BarChart {...args} />
    </div>
  ),
};

// 2. PositiveNegativeBarChart
export const PlaygroundPositiveNegativeBarChart: StoryObj<typeof PositiveNegativeBarChart> = {
  name: '🕹️ 2. Barras Positivas e Negativas',
  args: {
    title: 'Balanço Financeiro Mensal',
    subtitle: 'Ganhos vs Perdas em torno do eixo zero',
    yAxisLabels: ['+100', '+50', '0', '-50', '-100'],
    indicators: [
      { label: 'Ganhos (+)', color: '#7FA5E2' },
      { label: 'Perdas (-)', color: '#01B574' },
    ],
    data: POS_NEG_DATA,
    theme: 'light',
    showTooltip: true,
  },
  argTypes: {
    title: { control: 'text', description: 'Título principal' },
    subtitle: { control: 'text', description: 'Subtítulo contextual' },
    yAxisLabels: { control: 'object', description: 'Rótulos do eixo Y' },
    indicators: { control: 'object', description: 'Legenda de séries' },
    data: { control: 'object', description: 'Array PosNegDataPoint[]' },
    theme: { control: 'radio', options: ['light', 'dark'] },
    showTooltip: { control: 'boolean' },
  },
  render: (args) => (
    <div style={{ padding: 24, backgroundColor: args.theme === 'dark' ? '#1a1d1f' : '#F8FAFC', borderRadius: 12 }}>
      <PositiveNegativeBarChart {...args} />
    </div>
  ),
};

// 3. LineChart
export const PlaygroundLineChart: StoryObj<typeof LineChart> = {
  name: '🕹️ 3. Gráfico de Linhas',
  args: {
    title: 'Evolução de Usuários',
    subtitle: 'Acessos diários na plataforma',
    categories: MONTHLY_LABELS,
    series: [
      { id: '1', name: 'Alunos', data: [30, 45, 55, 60, 75, 80, 85, 90, 88, 92, 95, 98], color: '#7FA5E2', strokeWidth: 3 },
      { id: '2', name: 'Instrutores', data: [15, 20, 25, 30, 35, 40, 42, 45, 48, 50, 52, 55], color: '#BDD0EF', strokeWidth: 3 },
    ],
    isArea: false,
    yAxisLabels: ['100', '75', '50', '25', '0'],
    theme: 'light',
    showTooltip: true,
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    categories: { control: 'object', description: 'Rótulos no eixo X' },
    series: { control: 'object', description: 'Séries temporais' },
    isArea: { control: 'boolean', description: 'Preenchimento de área abaixo da linha' },
    yAxisLabels: { control: 'object' },
    theme: { control: 'radio', options: ['light', 'dark'] },
    showTooltip: { control: 'boolean' },
  },
  render: (args) => (
    <div style={{ padding: 24, backgroundColor: args.theme === 'dark' ? '#1a1d1f' : '#F8FAFC', borderRadius: 12 }}>
      <LineChart {...args} />
    </div>
  ),
};

// 4. AreaChart
export const PlaygroundAreaChart: StoryObj<typeof AreaChart> = {
  name: '🕹️ 4. Gráfico de Área',
  args: {
    title: 'Volume de Tráfego por Canal',
    subtitle: 'Distribuição percentual contínua',
    categories: MONTHLY_LABELS,
    series: [
      { id: '1', name: 'Orgânico', data: [35, 40, 50, 65, 70, 80, 85, 90, 88, 92, 95, 98], color: '#7FA5E2' },
      { id: '2', name: 'Campanhas', data: [20, 25, 30, 35, 45, 50, 55, 60, 58, 62, 65, 70], color: '#BDD0EF' },
    ],
    yAxisLabels: ['100', '75', '50', '25', '0'],
    theme: 'light',
    showTooltip: true,
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    categories: { control: 'object' },
    series: { control: 'object' },
    yAxisLabels: { control: 'object' },
    theme: { control: 'radio', options: ['light', 'dark'] },
    showTooltip: { control: 'boolean' },
  },
  render: (args) => (
    <div style={{ padding: 24, backgroundColor: args.theme === 'dark' ? '#1a1d1f' : '#F8FAFC', borderRadius: 12 }}>
      <AreaChart {...args} />
    </div>
  ),
};

// 5. PieChart
export const PlaygroundPieChart: StoryObj<typeof PieChart> = {
  name: '🕹️ 5. Gráfico de Pizza',
  args: {
    title: 'Distribuição de Alunos',
    subtitle: 'Por área técnica de formação',
    data: PIE_DATA,
    theme: 'light',
    showTooltip: true,
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    data: { control: 'object', description: 'Segmentos de pizza (PieDataPoint[])' },
    theme: { control: 'radio', options: ['light', 'dark'] },
    showTooltip: { control: 'boolean' },
  },
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 24, backgroundColor: args.theme === 'dark' ? '#1a1d1f' : '#F8FAFC', borderRadius: 12 }}>
      <PieChart {...args} />
    </div>
  ),
};

// 6. SemiDonutChart (180°)
export const PlaygroundSemiDonutChart: StoryObj<typeof SemiDonutChart> = {
  name: '🕹️ 6. Meio Gráfico de Pizza (180°)',
  args: {
    title: 'Capacidade de Vagas',
    subtitle: 'Ocupação semestral (180°)',
    data: PIE_DATA,
    theme: 'light',
    showTooltip: true,
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    data: { control: 'object', description: 'Segmentos de donut (DonutDataPoint[])' },
    theme: { control: 'radio', options: ['light', 'dark'] },
    showTooltip: { control: 'boolean' },
  },
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 24, backgroundColor: args.theme === 'dark' ? '#1a1d1f' : '#F8FAFC', borderRadius: 12 }}>
      <SemiDonutChart {...args} />
    </div>
  ),
};

// 7. RadarChart (Com Profundidade e Eixos Customizáveis)
export const PlaygroundRadarChart: StoryObj<typeof RadarChart> = {
  name: '🕹️ 7. Gráfico Radar (Customizável)',
  args: {
    title: 'Avaliação Multidimensional',
    subtitle: 'Desempenho por competência',
    axes: ['Lógica', 'Frontend', 'Backend', 'DevOps', 'Design', 'Soft Skills'],
    series: [
      { name: 'Nível Atual', values: [85, 90, 70, 85, 65, 95], color: '#2F4F7F' },
      { name: 'Meta Esperada', values: [70, 80, 85, 75, 80, 90], color: '#7FA5E2' },
    ],
    gridLevels: 4,
    maxValue: 100,
    showGridLevelsLabels: true,
    fillOpacity: 0.2,
    strokeWidth: 1.5,
    showDots: true,
    dashedLevelIndex: 1,
    theme: 'light',
    showTooltip: true,
  },
  argTypes: {
    title: { control: 'text', description: 'Título do card' },
    subtitle: { control: 'text', description: 'Subtítulo do card' },
    axes: { control: 'object', description: 'Rótulos dos eixos/vértices (array de strings)' },
    series: { control: 'object', description: 'Múltiplas séries com valores e cores' },
    gridLevels: { control: { type: 'range', min: 2, max: 8, step: 1 }, description: 'Níveis de profundidade da grade concêntrica' },
    maxValue: { control: { type: 'number', min: 10, max: 1000 }, description: 'Escala máxima dos dados' },
    showGridLevelsLabels: { control: 'boolean', description: 'Exibir números na grade de profundidade' },
    fillOpacity: { control: { type: 'range', min: 0.05, max: 1, step: 0.05 }, description: 'Opacidade de preenchimento dos polígonos' },
    strokeWidth: { control: { type: 'range', min: 1, max: 6, step: 0.5 }, description: 'Espessura das linhas das séries' },
    showDots: { control: 'boolean', description: 'Marcadores de vértices' },
    dashedLevelIndex: { control: { type: 'number', min: 0, max: 8 }, description: 'Índice do nível a ser renderizado tracejado' },
    theme: { control: 'radio', options: ['light', 'dark'] },
    showTooltip: { control: 'boolean' },
  },
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 24, backgroundColor: args.theme === 'dark' ? '#1a1d1f' : '#F8FAFC', borderRadius: 12 }}>
      <RadarChart {...args} />
    </div>
  ),
};

// 8. RadialBarChart
export const PlaygroundRadialBarChart: StoryObj<typeof RadialBarChart> = {
  name: '🕹️ 8. Barras Radiais Concêntricas',
  args: {
    title: 'Progresso por Módulo',
    subtitle: 'Conclusão de trilhas de aprendizagem',
    data: [
      { label: 'Design System', value: 85, color: '#2F4F7F' },
      { label: 'Frontend React', value: 70, color: '#7FA5E2' },
      { label: 'TypeScript Pro', value: 55, color: '#A4BDE9' },
      { label: 'Arquitetura', value: 40, color: '#D3E0F5' },
    ],
    theme: 'light',
    showTooltip: true,
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    data: { control: 'object', description: 'Array de barras concêntricas (RadialBarPoint[])' },
    theme: { control: 'radio', options: ['light', 'dark'] },
    showTooltip: { control: 'boolean' },
  },
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 24, backgroundColor: args.theme === 'dark' ? '#1a1d1f' : '#F8FAFC', borderRadius: 12 }}>
      <RadialBarChart {...args} />
    </div>
  ),
};

// 9. MetricCard
export const PlaygroundMetricCard: StoryObj<typeof MetricCard> = {
  name: '🕹️ 9. Painel de Métricas (KPI)',
  args: {
    title: 'Novas Matrículas',
    value: '1.240',
    variant: 'up',
    tagText: '+15%',
    theme: 'light',
  },
  argTypes: {
    title: { control: 'text', description: 'Nome da métrica' },
    value: { control: 'text', description: 'Valor de destaque' },
    variant: { control: 'radio', options: ['up', 'down'], description: 'Tendência (up = verde, down = vermelho)' },
    tagText: { control: 'text', description: 'Texto da tag percentual' },
    theme: { control: 'radio', options: ['light', 'dark'] },
  },
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 24, backgroundColor: args.theme === 'dark' ? '#1a1d1f' : '#F8FAFC', borderRadius: 12 }}>
      <MetricCard {...args} />
    </div>
  ),
};

// 10. StackedProgressBar
export const PlaygroundStackedProgressBar: StoryObj<typeof StackedProgressBar> = {
  name: '🕹️ 10. Barra de Progresso Empilhada',
  args: {
    title: 'Distribuição de Solicitações',
    subtitle: 'Status em tempo real',
    totalValue: '1.000',
    segments: [
      { label: 'Abertas', value: 450, amountText: '450', color: '#2F4F7F' },
      { label: 'Em análise', value: 300, amountText: '300', color: '#7FA5E2' },
      { label: 'Concluídas', value: 250, amountText: '250', color: '#A4BDE9' },
    ],
    theme: 'light',
    showTooltip: true,
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    totalValue: { control: 'text', description: 'Valor total em destaque' },
    segments: { control: 'object', description: 'Lista de segmentos empilhados' },
    theme: { control: 'radio', options: ['light', 'dark'] },
    showTooltip: { control: 'boolean' },
  },
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 24, backgroundColor: args.theme === 'dark' ? '#1a1d1f' : '#F8FAFC', borderRadius: 12 }}>
      <StackedProgressBar {...args} />
    </div>
  ),
};

// 11. CircularProgressBar
export const PlaygroundCircularProgressBar: StoryObj<typeof CircularProgressBar> = {
  name: '🕹️ 11. Progresso Circular',
  args: {
    value: 75,
    size: 56,
    strokeWidth: 4,
    showLabel: true,
    color: '#6487C2',
    theme: 'light',
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 }, description: 'Percentual de 0 a 100' },
    size: { control: 'radio', options: [48, 56, 66], description: 'Diâmetro oficial em pixels' },
    strokeWidth: { control: { type: 'range', min: 2, max: 12, step: 1 }, description: 'Espessura do aro de progresso' },
    showLabel: { control: 'boolean', description: 'Exibir porcentagem central' },
    color: { control: 'color', description: 'Cor do progresso' },
    theme: { control: 'radio', options: ['light', 'dark'] },
  },
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48, backgroundColor: args.theme === 'dark' ? '#1a1d1f' : '#F8FAFC', borderRadius: 12 }}>
      <CircularProgressBar {...args} />
    </div>
  ),
};

// 12. RankingCard
export const PlaygroundRankingCard: StoryObj<typeof RankingCard> = {
  name: '🕹️ 12. Cards de Ranking (Top Courses)',
  args: {
    title: 'Top Cursos Mais Acessados',
    subtitle: 'Ranking semanal por engajamento',
    variant: 'default',
    searchPlaceholder: 'Buscar curso ou área...',
    items: RANKING_ITEMS,
    theme: 'light',
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    variant: { control: 'radio', options: ['default', 'label-only', 'describe-only'], description: 'Densidade visual dos itens' },
    searchPlaceholder: { control: 'text', description: 'Placeholder do input de busca' },
    items: { control: 'object', description: 'Lista ordenada RankingItem[]' },
    theme: { control: 'radio', options: ['light', 'dark'] },
  },
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 24, backgroundColor: args.theme === 'dark' ? '#1a1d1f' : '#F8FAFC', borderRadius: 12 }}>
      <RankingCard {...args} />
    </div>
  ),
};
