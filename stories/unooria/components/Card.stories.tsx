import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardMedia,
  CardContent,
  CardFooter,
  CardBadgeGroup,
  CardProgress,
} from '../../../src/unooria/components/Card';
import {
  CardProps,
  CardVariant,
  CardOrientation,
  CardRadius,
  CardPadding,
} from '../../../src/unooria/components/Card/Card.types';
import { Button } from '../../../src/unooria/components/Button';
import { Badge } from '../../../src/unooria/components/Badge';
import { Avatar } from '../../../src/unooria/components/Avatar';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../src/unooria/docs';

// ============================================================================
// Ícones SVG Inline Utilitários
// ============================================================================
const LayersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const ActivityIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const CheckCircle2Icon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const MoreVerticalIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const CalendarSmallIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const SAMPLE_IMAGE_PROJECT = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80';
const SAMPLE_IMAGE_DESIGN = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';
const SAMPLE_IMAGE_CARD = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80';

/**
 * Componente da Página de Documentação Rica do Card - Padrão Ouro Unooria
 */
const CardDocumentationPage: React.FC = () => {
  const [docTheme, setDocTheme] = useState<'light' | 'dark'>('light');
  const [interactiveProgress, setInteractiveProgress] = useState<number>(75);
  const [activeVariant, setActiveVariant] = useState<CardVariant>('default');
  const [clickCount, setClickCount] = useState<number>(0);

  const cardPropsList = [
    { name: 'variant', type: "'default' | 'elevated' | 'outlined' | 'interactive'", default: "'default'", desc: 'Estilo visual da superfície e intensidade de elevação/borda.' },
    { name: 'orientation', type: "'vertical' | 'horizontal'", default: "'vertical'", desc: 'Direção do fluxo visual: empilhado (vertical) ou lado a lado (horizontal).' },
    { name: 'theme', type: "'light' | 'dark'", default: "'light'", desc: 'Tema visual claro ou escuro com tokens cromáticos automáticos.' },
    { name: 'radius', type: "'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | number", default: "'lg'", desc: 'Raio de arredondamento dos cantos (ex: lg = 24px no Figma).' },
    { name: 'padding', type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number", default: "'none'", desc: 'Espaçamento interno padrão quando não usar subcomponentes.' },
    { name: 'interactive', type: 'boolean', default: 'false', desc: 'Ativa efeitos visuais de hover, cursor pointer e navegação acessível por teclado.' },
    { name: 'fullWidth', type: 'boolean', default: 'false', desc: 'Define se o Card deve ocupar 100% da largura disponível.' },
    { name: 'disabled', type: 'boolean', default: 'false', desc: 'Aplica opacidade reduzida e previne disparos de clique/foco.' },
    { name: 'image', type: 'string | CardImageConfig', default: 'undefined', desc: 'Atalho declarativo para imagem de capa/mídia do topo.' },
    { name: 'title', type: 'React.ReactNode', default: 'undefined', desc: 'Atalho declarativo para título do Card.' },
    { name: 'subtitle', type: 'React.ReactNode', default: 'undefined', desc: 'Atalho declarativo para subtítulo secundário.' },
    { name: 'description', type: 'React.ReactNode', default: 'undefined', desc: 'Atalho declarativo para o texto do corpo.' },
    { name: 'badges', type: 'React.ReactNode[] | Array<{ label, variant }>', default: 'undefined', desc: 'Lista de tags/badges a serem renderizadas automaticamente.' },
    { name: 'progress', type: 'number | CardProgressConfig', default: 'undefined', desc: 'Atalho declarativo para indicador circular de progresso (0 a 100).' },
    { name: 'primaryAction', type: 'React.ReactNode | CardActionConfig', default: 'undefined', desc: 'Atalho declarativo para botão de ação primária no rodapé.' },
    { name: 'secondaryAction', type: 'React.ReactNode | CardActionConfig', default: 'undefined', desc: 'Atalho declarativo para botão de ação secundária no rodapé.' },
    { name: 'children', type: 'React.ReactNode', default: 'undefined', desc: 'Composição livre com subcomponentes (Card.Header, Card.Media, etc.).' },
  ];

  const subcomponentsList = [
    { name: 'Card.Header', props: 'avatar, title, subtitle, action, className, children', desc: 'Cabeçalho estruturado com avatar/ícone à esquerda, textos e ação à direita.' },
    { name: 'Card.Media', props: 'src, alt, height (244px), aspectRatio, fit, position, overlay, badge', desc: 'Container de mídia com proporção calibrada e suporte a badge sobreposta.' },
    { name: 'Card.Content', props: 'padding, className, children', desc: 'Corpo principal para agrupamento de descrições, badges e métricas.' },
    { name: 'Card.Title', props: 'as (h3), size (sm|md|lg|xl), truncate, className, children', desc: 'Título tipográfico semântico com controle de quebra e reticências.' },
    { name: 'Card.Description', props: 'icon, truncate, className, children', desc: 'Texto descritivo com suporte a ícone lateral e line-clamp.' },
    { name: 'Card.BadgeGroup', props: 'gap, wrap, align, className, children', desc: 'Container flexível com quebra automática para tags e categorias.' },
    { name: 'Card.Progress', props: 'value (0..100), size (48), strokeWidth (4), progressColor, showLabel, label, helperText', desc: 'Indicador de progresso circular SVG de alta precisão visual.' },
    { name: 'Card.Footer', props: 'align, direction, divider, className, children', desc: 'Rodapé flexível para alinhamento de ações e links contextuais.' },
  ];

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Estrutura & Containers"
        title="Card"
        description="O Card é uma superfície modular e flexível utilizada para agrupar informações relacionadas, dados de entidades, mídias visuais, métricas com indicadores de progresso circular e pontos de ação contextual. Desenvolvido com base no Design System Unooria e especificações do Figma."
      />

      {/* 1. Visão Geral & Motivos de Uso */}
      <section style={{ marginBottom: '48px' }}>
        <UnooriaDocSectionHeader
          title="1. Visão Geral & Casos de Uso"
          description="Diretrizes arquiteturais para estruturação de interfaces modulares no ecossistema Unooria"
          barColor="#006BFF"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
            marginTop: '20px',
          }}
        >
          <div
            style={{
              padding: '24px',
              borderRadius: '16px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#EFF6FF', color: '#006BFF' }}>
                <LayersIcon />
              </div>
              <h4 style={{ margin: 0, fontSize: '16px', color: '#0F172A', fontWeight: 600 }}>
                Agrupamento Semântico
              </h4>
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748B', lineHeight: '1.6' }}>
              Delimita blocos de informação com superfícies de alto contraste e bordas suaves, reduzindo a carga cognitiva em dashboards, feeds e catálogos.
            </p>
          </div>

          <div
            style={{
              padding: '24px',
              borderRadius: '16px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#F0FDF4', color: '#16A34A' }}>
                <ActivityIcon />
              </div>
              <h4 style={{ margin: 0, fontSize: '16px', color: '#0F172A', fontWeight: 600 }}>
                Progresso & Métricas
              </h4>
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748B', lineHeight: '1.6' }}>
              Integração nativa com anéis circulares de progresso SVG (0 a 100%), ideais para status de tarefas, conclusão de cursos e monitoramento de metas.
            </p>
          </div>

          <div
            style={{
              padding: '24px',
              borderRadius: '16px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: '#FAF5FF', color: '#9333EA' }}>
                <CheckCircle2Icon />
              </div>
              <h4 style={{ margin: 0, fontSize: '16px', color: '#0F172A', fontWeight: 600 }}>
                Composição Flexível
              </h4>
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748B', lineHeight: '1.6' }}>
              Permite tanto uso declarativo rápido via props (<code style={{ fontSize: '12px', background: '#F1F5F9', padding: '2px 4px', borderRadius: '4px' }}>title</code>, <code style={{ fontSize: '12px', background: '#F1F5F9', padding: '2px 4px', borderRadius: '4px' }}>image</code>, <code style={{ fontSize: '12px', background: '#F1F5F9', padding: '2px 4px', borderRadius: '4px' }}>progress</code>) quanto montagem via Compound Components (<code style={{ fontSize: '12px', background: '#F1F5F9', padding: '2px 4px', borderRadius: '4px' }}>Card.Header</code>, etc.).
            </p>
          </div>
        </div>
      </section>

      {/* 2. Figma & Especificações */}
      <section style={{ marginBottom: '48px' }}>
        <UnooriaDocSectionHeader
          title="2. Figma & Especificações Técnicas"
          description="Mapeamento direto dos nós de design e tokens de estilo do Figma"
          barColor="#10B981"
        />

        <div
          style={{
            padding: '24px',
            borderRadius: '16px',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            marginTop: '20px',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>Nós de Referência no Figma:</span>
            <a
              href="https://www.figma.com/design/i0HRQSBtQQ9ZXDYiJPRnGv/Unooria_DS_v0.2?node-id=7740-1778&m=dev"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                backgroundColor: '#006BFF',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <span>🎨 Figma Node #7740:1778 (Card Completo com Imagem e Progresso)</span>
              <ArrowRightIcon />
            </a>
            <span style={{ padding: '6px 10px', borderRadius: '6px', backgroundColor: '#E2E8F0', fontSize: '12px', color: '#334155', fontWeight: 500 }}>
              Node #7731:286 (Card Padrão)
            </span>
            <span style={{ padding: '6px 10px', borderRadius: '6px', backgroundColor: '#E2E8F0', fontSize: '12px', color: '#334155', fontWeight: 500 }}>
              Node #7731:291 (Card Horizontal)
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Bordas & Raio</span>
              <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#1E293B', fontWeight: 600 }}>
                Border Radius 24px (<code style={{ fontSize: '12px' }}>--unooria-radius-lg</code>) / 16px
              </p>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Altura da Capa</span>
              <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#1E293B', fontWeight: 600 }}>
                244px fixa padrão Figma ou Proporção de Aspecto Fluida
              </p>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Elevações</span>
              <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#1E293B', fontWeight: 600 }}>
                Tokens <code style={{ fontSize: '12px' }}>--unooria-elevation-1</code> e <code style={{ fontSize: '12px' }}>--unooria-elevation-3</code>
              </p>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Progresso SVG</span>
              <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#1E293B', fontWeight: 600 }}>
                Diâmetro 48px, Stroke 4px com Animação Fluida de Transição
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Anatomia Modular da Família Card */}
      <section style={{ marginBottom: '48px' }}>
        <UnooriaDocSectionHeader
          title="3. Anatomia Modular da Família Card"
          description="Estrutura de blocos visuais e hierarquia dos subcomponentes"
          barColor="#8B5CF6"
        />

        <div
          style={{
            padding: '24px',
            borderRadius: '16px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            marginTop: '20px',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={{ borderLeft: '4px solid #006BFF', paddingLeft: '16px' }}>
              <strong style={{ fontSize: '15px', color: '#0F172A', display: 'block', marginBottom: '4px' }}>
                1. Card.Header
              </strong>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748B', lineHeight: '1.5' }}>
                Acomoda o Avatar ou ícone de categoria, título, subtítulo e ações no canto superior direito (ex: menu de opções ou tag).
              </p>
            </div>

            <div style={{ borderLeft: '4px solid #10B981', paddingLeft: '16px' }}>
              <strong style={{ fontSize: '15px', color: '#0F172A', display: 'block', marginBottom: '4px' }}>
                2. Card.Media (Imagem / Banner)
              </strong>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748B', lineHeight: '1.5' }}>
                Imagem de capa com altura calibrada (244px), ajuste de enquadramento (<code style={{ fontSize: '11px' }}>fit="cover"</code>) e suporte a badge flutuante sobreposta.
              </p>
            </div>

            <div style={{ borderLeft: '4px solid #F59E0B', paddingLeft: '16px' }}>
              <strong style={{ fontSize: '15px', color: '#0F172A', display: 'block', marginBottom: '4px' }}>
                3. Card.Content / Card.Body
              </strong>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748B', lineHeight: '1.5' }}>
                Container do corpo principal com espaçamento interno equilibrado, agrupando títulos, descrições, tags e métricas de progresso.
              </p>
            </div>

            <div style={{ borderLeft: '4px solid #EC4899', paddingLeft: '16px' }}>
              <strong style={{ fontSize: '15px', color: '#0F172A', display: 'block', marginBottom: '4px' }}>
                4. Card.BadgeGroup & Card.Progress
              </strong>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748B', lineHeight: '1.5' }}>
                Agrupamento flexível de tags de categorias e indicador circular de porcentagem com rótulo descritivo.
              </p>
            </div>

            <div style={{ borderLeft: '4px solid #6366F1', paddingLeft: '16px' }}>
              <strong style={{ fontSize: '15px', color: '#0F172A', display: 'block', marginBottom: '4px' }}>
                5. Card.Footer
              </strong>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748B', lineHeight: '1.5' }}>
                Área dedicada a ações de encerramento, botões primários/secundários, carimbos de data ou links de navegação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Matriz de Variantes & Orientações */}
      <section style={{ marginBottom: '48px' }}>
        <UnooriaDocSectionHeader
          title="4. Matriz de Variantes & Orientações"
          description="Superfícies de elevação, contorno e layouts verticais vs horizontais"
          barColor="#F59E0B"
        />

        <div style={{ marginTop: '20px' }}>
          {/* Seletor Rápido de Variante para Teste Visual */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {(['default', 'elevated', 'outlined', 'interactive'] as CardVariant[]).map((v) => (
              <button
                key={v}
                onClick={() => setActiveVariant(v)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: activeVariant === v ? '2px solid #006BFF' : '1px solid #CBD5E1',
                  backgroundColor: activeVariant === v ? '#EFF6FF' : '#FFFFFF',
                  color: activeVariant === v ? '#006BFF' : '#475569',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                Variante: {v}
              </button>
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Card Vertical de Demonstração */}
            <div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '8px' }}>
                Layout Vertical (Variante: {activeVariant})
              </span>
              <Card
                variant={activeVariant}
                image={{
                  src: SAMPLE_IMAGE_DESIGN,
                  alt: 'Design System Unooria',
                  badge: <Badge variant="primary" size="sm">Design System</Badge>,
                }}
                title="Design System Unooria v0.2"
                subtitle="Tokens, Componentes e Acessibilidade"
                description="Biblioteca unificada de componentes com conformidade estrita aos padrões visuais e especificações do Figma."
                progress={{
                  value: 85,
                  label: '85%',
                  helperText: 'Conclusão da Sprint',
                }}
                primaryAction={{
                  label: 'Explorar Componentes',
                  variant: 'primary',
                }}
                secondaryAction={{
                  label: 'Ver Tokens',
                  variant: 'outlined',
                }}
                onClick={activeVariant === 'interactive' ? () => setClickCount((c) => c + 1) : undefined}
              />
              {activeVariant === 'interactive' && (
                <span style={{ fontSize: '12px', color: '#006BFF', marginTop: '6px', display: 'block' }}>
                  👆 Cliques registrados: {clickCount}
                </span>
              )}
            </div>

            {/* Card Horizontal de Demonstração */}
            <div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '8px' }}>
                Layout Horizontal (Side-by-side)
              </span>
              <Card
                variant={activeVariant}
                orientation="horizontal"
                image={{
                  src: SAMPLE_IMAGE_PROJECT,
                  alt: 'Métricas de Performance',
                  aspectRatio: '16/9',
                }}
                title="Relatório de Performance"
                subtitle="Atualizado há 10 minutos"
                description="Métricas de tempo de resposta e fidelidade de renderização nos navegadores."
                badges={[
                  <Badge key="1" variant="success" size="sm">99.8% Uptime</Badge>,
                  <Badge key="2" variant="neutral" size="sm">Analytics</Badge>,
                ]}
                primaryAction={{
                  label: 'Ver Detalhes',
                  variant: 'primary',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Elementos em Destaque: Progresso Circular, Capas & Ações */}
      <section style={{ marginBottom: '48px' }}>
        <UnooriaDocSectionHeader
          title="5. Elementos em Destaque: Progresso Circular & Simulador"
          description="Demonstração interativa do indicador circular SVG e composição de cabeçalho"
          barColor="#EC4899"
        />

        <div
          style={{
            padding: '24px',
            borderRadius: '16px',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            marginTop: '20px',
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '14px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '8px' }}>
              Simulador do Progresso Circular: <span style={{ color: '#006BFF' }}>{interactiveProgress}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={interactiveProgress}
              onChange={(e) => setInteractiveProgress(Number(e.target.value))}
              style={{ width: '100%', maxWidth: '400px', cursor: 'pointer' }}
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Card com Progresso Interativo */}
            <Card variant="elevated">
              <Card.Header
                avatar={<Avatar name="Lucas Salomão" size="md" />}
                title="Lucas Salomão"
                subtitle="Lead Design Engineer"
                action={
                  <button
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', padding: '4px' }}
                    aria-label="Mais opções"
                  >
                    <MoreVerticalIcon />
                  </button>
                }
              />
              <Card.Media
                src={SAMPLE_IMAGE_CARD}
                alt="Status do Projeto"
                badge={<Badge variant="warning" size="sm">Fase 2 de 4</Badge>}
              />
              <Card.Content>
                <Card.Title size="md">Migração para Design System v0.2</Card.Title>
                <Card.Description>
                  Refatoração da camada de tokens de cores, elevação e componentes React para suporte universal a temas.
                </Card.Description>
                <Card.Progress
                  value={interactiveProgress}
                  helperText={`Meta da Sprint: ${interactiveProgress}% concluído`}
                />
              </Card.Content>
              <Card.Footer>
                <Button variant="outlined" size="sm">
                  Ver Tarefas
                </Button>
                <Button variant="primary" size="sm">
                  Continuar
                </Button>
              </Card.Footer>
            </Card>

            {/* Card com Badges e Ações Compactas */}
            <Card variant="outlined">
              <Card.Header
                title="Módulo de Calendário"
                subtitle="Componente Interativo"
                action={<Badge variant="success" size="sm">Concluído</Badge>}
              />
              <Card.Content>
                <Card.BadgeGroup>
                  <Badge variant="primary" size="sm">React 18</Badge>
                  <Badge variant="neutral" size="sm">WCAG 2.1 AA</Badge>
                  <Badge variant="info" size="sm">Storybook 8</Badge>
                </Card.BadgeGroup>
                <Card.Description icon={<CalendarSmallIcon />}>
                  Suporte a seleção de datas únicas, intervalos e navegação por teclado fluida.
                </Card.Description>
                <Card.Progress
                  value={100}
                  progressColor="#16A34A"
                  helperText="100% de cobertura de testes"
                />
              </Card.Content>
              <Card.Footer>
                <Button variant="primary" size="sm" fullWidth>
                  Visualizar Documentação
                </Button>
              </Card.Footer>
            </Card>
          </div>
        </div>
      </section>

      {/* 6. Boas Práticas (Do's & Don'ts) */}
      <section style={{ marginBottom: '48px' }}>
        <UnooriaDocSectionHeader
          title="6. Diretrizes de Design & Boas Práticas (Do's & Don'ts)"
          description="Recomendações essenciais para garantir consistência e ergonomia visual"
          barColor="#EF4444"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
            marginTop: '20px',
          }}
        >
          {/* Do's */}
          <div
            style={{
              padding: '24px',
              borderRadius: '16px',
              backgroundColor: '#F0FDF4',
              border: '1px solid #BBF7D0',
            }}
          >
            <h4 style={{ margin: '0 0 16px 0', color: '#166534', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>✅</span> O que fazer (Do&apos;s)
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#15803D', lineHeight: '1.7' }}>
              <li>Mantenha a hierarquia visual clara: Header com avatar/título, Media com enquadramento correto, Content para detalhes e Footer para ações.</li>
              <li>Utilize a variante <code style={{ fontSize: '12px' }}>interactive</code> apenas quando o Card inteiro tiver comportamento de link ou botão único.</li>
              <li>Sempre informe um texto alternativo (<code style={{ fontSize: '12px' }}>alt</code>) na mídia ou imagem para conformidade com acessibilidade.</li>
              <li>Agrupe badges com <code style={{ fontSize: '12px' }}>CardBadgeGroup</code> para permitir quebra de linha harmoniosa em telas estreitas.</li>
            </ul>
          </div>

          {/* Don'ts */}
          <div
            style={{
              padding: '24px',
              borderRadius: '16px',
              backgroundColor: '#FEF2F2',
              border: '1px solid #FECACA',
            }}
          >
            <h4 style={{ margin: '0 0 16px 0', color: '#991B1B', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>❌</span> O que evitar (Don&apos;ts)
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#B91C1C', lineHeight: '1.7' }}>
              <li>Não insira múltiplos links ou botões independentes clicáveis dentro de um Card que já possua <code style={{ fontSize: '12px' }}>interactive=true</code> com <code style={{ fontSize: '12px' }}>onClick</code> geral.</li>
              <li>Não utilize imagens com alturas randômicas sem configurar proporção de aspecto ou <code style={{ fontSize: '12px' }}>fit=&quot;cover&quot;</code>.</li>
              <li>Não sobrecarregue o Card com parágrafos longos (limite o texto principal a 2 ou 3 linhas).</li>
              <li>Não misture estilos de borda e sombra fora dos tokens padrão do Design System Unooria.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Suporte a Temas (Light e Dark) */}
      <section style={{ marginBottom: '48px' }}>
        <UnooriaDocSectionHeader
          title="7. Suporte a Temas (Light & Dark Mode)"
          description="Adaptação cromática automática das superfícies, bordas e tipografia"
          barColor="#06B6D4"
        />

        <div
          style={{
            padding: '20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            marginBottom: '20px',
            marginTop: '20px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ fontSize: '14px', color: '#334155', fontWeight: 600 }}>
              Alternar Tema de Demonstração:
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setDocTheme('light')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  border: docTheme === 'light' ? '2px solid #006BFF' : '1px solid #CBD5E1',
                  backgroundColor: docTheme === 'light' ? '#EFF6FF' : '#FFFFFF',
                  color: docTheme === 'light' ? '#006BFF' : '#475569',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                ☀️ Tema Claro
              </button>
              <button
                onClick={() => setDocTheme('dark')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  border: docTheme === 'dark' ? '2px solid #38BDF8' : '1px solid #CBD5E1',
                  backgroundColor: docTheme === 'dark' ? '#1E293B' : '#FFFFFF',
                  color: docTheme === 'dark' ? '#38BDF8' : '#475569',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                🌙 Tema Escuro
              </button>
            </div>
          </div>
        </div>

        {/* Preview Lado a Lado Light e Dark */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* Fundo Claro */}
          <div
            style={{
              padding: '24px',
              borderRadius: '16px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
            }}
          >
            <h4 style={{ margin: '0 0 16px 0', color: '#0284C7', fontSize: '15px', fontWeight: 600 }}>
              ☀️ Light Mode Preview
            </h4>
            <Card
              theme="light"
              variant="elevated"
              image={{
                src: SAMPLE_IMAGE_DESIGN,
                alt: 'Design no Tema Claro',
                badge: <Badge variant="primary" size="sm">Design System</Badge>,
              }}
              title="Interface Unooria Light"
              subtitle="Superfície Branca #FFFFFF"
              description="Contraste de alto nível com bordas sutis e tipografia profunda para ambientes claros."
              progress={{
                value: 90,
                label: '90%',
                helperText: 'Concluído no Light Mode',
              }}
              primaryAction={{
                label: 'Acessar Módulo',
                variant: 'primary',
              }}
            />
          </div>

          {/* Fundo Escuro */}
          <div
            style={{
              padding: '24px',
              borderRadius: '16px',
              backgroundColor: '#0F172A',
              border: '1px solid #334155',
            }}
          >
            <h4 style={{ margin: '0 0 16px 0', color: '#38BDF8', fontSize: '15px', fontWeight: 600 }}>
              🌙 Dark Mode Preview
            </h4>
            <Card
              theme="dark"
              variant="elevated"
              image={{
                src: SAMPLE_IMAGE_DESIGN,
                alt: 'Design no Tema Escuro',
                badge: <Badge variant="info" size="sm">Dark Mode</Badge>,
              }}
              title="Interface Unooria Dark"
              subtitle="Superfície Escura #1E293B"
              description="Superfície escura com bordas de realce para visualização confortável com baixa luminosidade."
              progress={{
                value: 90,
                label: '90%',
                helperText: 'Concluído no Dark Mode',
              }}
              primaryAction={{
                label: 'Acessar Módulo',
                variant: 'primary',
              }}
            />
          </div>
        </div>
      </section>

      {/* 8. Tabela de Props da API */}
      <section style={{ marginBottom: '32px' }}>
        <UnooriaDocSectionHeader
          title="8. Referência Completa da API (Props Reference)"
          description="Documentação técnica de propriedades do Card e de todos os seus subcomponentes"
          barColor="#64748B"
        />

        <div style={{ marginTop: '20px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0F172A', fontWeight: 600 }}>
            Componente Principal: <code style={{ fontSize: '14px', color: '#006BFF' }}>&lt;Card /&gt;</code>
          </h4>
          <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
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
                  <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Tipo</th>
                  <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Padrão</th>
                  <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Descrição</th>
                </tr>
              </thead>
              <tbody>
                {cardPropsList.map((prop) => (
                  <tr key={prop.name} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#006BFF', fontFamily: 'monospace' }}>
                      {prop.name}
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#475569', fontSize: '13px' }}>
                      {prop.type}
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#64748B', fontSize: '13px' }}>
                      {prop.default}
                    </td>
                    <td style={{ padding: '12px 16px', color: '#334155' }}>
                      {prop.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#0F172A', fontWeight: 600 }}>
            Subcomponentes da Família Card
          </h4>
          <div style={{ overflowX: 'auto' }}>
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
                  <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Subcomponente</th>
                  <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Props Principais</th>
                  <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Descrição e Função</th>
                </tr>
              </thead>
              <tbody>
                {subcomponentsList.map((sub) => (
                  <tr key={sub.name} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#8B5CF6', fontFamily: 'monospace' }}>
                      {sub.name}
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#475569', fontSize: '13px' }}>
                      {sub.props}
                    </td>
                    <td style={{ padding: '12px 16px', color: '#334155' }}>
                      {sub.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </UnooriaDocShell>
  );
};

// ============================================================================
// Configuração Storybook Meta
// ============================================================================
const meta: Meta<typeof Card> = {
  title: 'Plataforma Unooria/Componentes/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'interactive'],
      description: 'Variante visual da superfície e nível de sombra.',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    orientation: {
      control: 'inline-radio',
      options: ['vertical', 'horizontal'],
      description: 'Orientação estrutural do Card.',
      table: {
        defaultValue: { summary: 'vertical' },
      },
    },
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
      description: 'Tema cromático do componente.',
      table: {
        defaultValue: { summary: 'light' },
      },
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'Raio de arredondamento das bordas.',
      table: {
        defaultValue: { summary: 'lg' },
      },
    },
    title: {
      control: 'text',
      description: 'Título principal exibido no cabeçalho ou corpo.',
    },
    subtitle: {
      control: 'text',
      description: 'Subtítulo ou texto complementar.',
    },
    description: {
      control: 'text',
      description: 'Texto descritivo principal.',
    },
    mediaSrc: {
      control: 'text',
      description: 'URL da imagem de capa/mídia.',
    },
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Valor percentual do progresso circular (0 a 100).',
    },
    interactive: {
      control: 'boolean',
      description: 'Habilita efeitos de hover e cursor pointer.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o card reduzindo a opacidade.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Define se ocupa 100% da largura.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    variant: 'default',
    orientation: 'vertical',
    theme: 'light',
    radius: 'lg',
    title: 'Design System Unooria v0.2',
    subtitle: 'Tokens e Componentes',
    description: 'O Card organiza conteúdos com hierarquia visual precisa e suporte a progresso circular.',
    mediaSrc: SAMPLE_IMAGE_DESIGN,
    progress: 75,
    interactive: false,
    disabled: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// ============================================================================
// 1ª Estória: Documentação Completa (Mandatória - Padrão Ouro)
// ============================================================================
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <CardDocumentationPage />,
};

// ============================================================================
// 2ª Estória: Playground Interativo
// ============================================================================
export const Playground: Story = {
  name: '🎮 Playground',
  render: (args) => (
    <div
      style={{
        padding: '32px',
        borderRadius: '16px',
        backgroundColor: args.theme === 'dark' ? '#0F172A' : '#F8FAFC',
        border: `1px solid ${args.theme === 'dark' ? '#334155' : '#E2E8F0'}`,
        maxWidth: args.orientation === 'horizontal' ? '720px' : '400px',
        margin: '0 auto',
      }}
    >
      <Card
        {...args}
        primaryAction={{
          label: 'Ação Principal',
          variant: 'primary',
        }}
        secondaryAction={{
          label: 'Ação Secundária',
          variant: 'outlined',
        }}
      />
    </div>
  ),
  args: {
    variant: 'elevated',
    orientation: 'vertical',
    theme: 'light',
    radius: 'lg',
    title: 'Card Interativo de Exemplo',
    subtitle: 'Altere as props abaixo',
    description: 'Experimente modificar as opções na barra de controles do Storybook para visualizar diferentes variantes e tamanhos.',
    mediaSrc: SAMPLE_IMAGE_PROJECT,
    progress: 80,
    interactive: false,
  },
};

// ============================================================================
// 3ª Estória: Todas as Variantes (Default, Elevated, Outlined, Interactive)
// ============================================================================
export const TodasVariantes: Story = {
  name: '✨ Todas as Variantes',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Default */}
      <Card
        variant="default"
        title="Variante: Default"
        subtitle="Superfície Padrão"
        description="Fundo neutro com borda sutil de 1px e sombra discreta para hierarquia balanceada."
        progress={{ value: 40, helperText: '40% concluído' }}
        primaryAction={{ label: 'Ver Detalhes', variant: 'primary' }}
      />

      {/* Elevated */}
      <Card
        variant="elevated"
        title="Variante: Elevated"
        subtitle="Sombra de Profundidade"
        description="Sombra projetada com blur suave (--unooria-elevation-1) destacando o card sobre o fundo."
        progress={{ value: 65, helperText: '65% concluído' }}
        primaryAction={{ label: 'Ver Detalhes', variant: 'primary' }}
      />

      {/* Outlined */}
      <Card
        variant="outlined"
        title="Variante: Outlined"
        subtitle="Foco no Contorno"
        description="Contorno estruturado e sem sombra, excelente para interfaces densas e tabelas."
        progress={{ value: 90, helperText: '90% concluído' }}
        primaryAction={{ label: 'Ver Detalhes', variant: 'primary' }}
      />

      {/* Interactive */}
      <Card
        variant="interactive"
        title="Variante: Interactive"
        subtitle="Hover & Foco Tátil"
        description="Passar o mouse eleva o card com animação suave. Foco acessível com anel delimitador."
        progress={{ value: 100, helperText: '100% finalizado' }}
        primaryAction={{ label: 'Acessar Link', variant: 'primary' }}
        onClick={() => alert('Card interativo clicado!')}
      />
    </div>
  ),
};

// ============================================================================
// 4ª Estória: Com Progresso Circular
// ============================================================================
export const ComProgressoCircular: Story = {
  name: '📊 Com Progresso Circular',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      <Card
        variant="elevated"
        avatar={<Avatar name="Equipe Frontend" size="md" />}
        title="Sprint 24 - Plataforma Unooria"
        subtitle="12 tarefas restantes"
        description="Desenvolvimento dos componentes base e documentação de acessibilidade no Storybook."
        progress={{
          value: 75,
          label: '75%',
          helperText: 'Meta de entrega: 18/Agosto',
        }}
        primaryAction={{ label: 'Abrir Kanban', variant: 'primary' }}
      />

      <Card
        variant="outlined"
        avatar={<Avatar name="QA Testing" size="md" />}
        title="Homologação de Acessibilidade"
        subtitle="WCAG 2.1 Nível AA"
        description="Testes com leitores de tela NVDA/VoiceOver e contraste cromático nas variantes."
        progress={{
          value: 100,
          label: '100%',
          color: '#16A34A',
          helperText: '100% de conformidade aprovada',
        }}
        primaryAction={{ label: 'Ver Relatório', variant: 'primary' }}
      />
    </div>
  ),
};

// ============================================================================
// 5ª Estória: Com Imagem e Capa
// ============================================================================
export const ComImagemECapa: Story = {
  name: '🖼️ Com Imagem e Capa',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      <Card
        variant="elevated"
        image={{
          src: SAMPLE_IMAGE_DESIGN,
          alt: 'Design System Unooria v0.2',
          badge: <Badge variant="primary" size="sm">Design System</Badge>,
        }}
        title="Fundamentos de Design"
        subtitle="Tipografia, Cores e Espaçamentos"
        description="Guia completo de aplicação dos tokens oficiais para construção de aplicações consistentes."
        badges={[
          <Badge key="1" variant="info" size="sm">Figma Mapped</Badge>,
          <Badge key="2" variant="neutral" size="sm">v0.2</Badge>,
        ]}
        progress={{
          value: 80,
          helperText: '80% revisado pelo time de Design',
        }}
        primaryAction={{ label: 'Acessar Guia', variant: 'primary' }}
        secondaryAction={{ label: 'Exportar PDF', variant: 'outlined' }}
      />

      <Card
        variant="elevated"
        image={{
          src: SAMPLE_IMAGE_PROJECT,
          alt: 'Dashboard de Análise de Dados',
          badge: <Badge variant="success" size="sm">Produção</Badge>,
        }}
        title="Analytics & Telemetria"
        subtitle="Métricas em tempo real"
        description="Monitoramento de interações do usuário, latência de renderização e taxa de conversão."
        badges={[
          <Badge key="1" variant="success" size="sm">Ativo</Badge>,
          <Badge key="2" variant="warning" size="sm">Realtime</Badge>,
        ]}
        progress={{
          value: 95,
          helperText: '95% de estabilidade de rede',
        }}
        primaryAction={{ label: 'Ver Dashboard', variant: 'primary' }}
      />
    </div>
  ),
};

// ============================================================================
// 6ª Estória: Orientação Horizontal
// ============================================================================
export const OrientacaoHorizontal: Story = {
  name: '↔️ Orientação Horizontal',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Card
        variant="elevated"
        orientation="horizontal"
        image={{
          src: SAMPLE_IMAGE_DESIGN,
          alt: 'Arquitetura de Componentes',
          aspectRatio: '16/9',
          badge: <Badge variant="primary" size="sm">Novo</Badge>,
        }}
        title="Arquitetura de Componentes React"
        subtitle="Módulo Avançado de Engenharia"
        description="Padrões de Compound Components, desacoplamento de estilos e acessibilidade com suporte a temas dinâmicos."
        badges={[
          <Badge key="1" variant="info" size="sm">TypeScript</Badge>,
          <Badge key="2" variant="neutral" size="sm">Storybook 8</Badge>,
        ]}
        progress={{ value: 70, helperText: '70% concluído' }}
        primaryAction={{ label: 'Iniciar Módulo', variant: 'primary' }}
      />

      <Card
        variant="outlined"
        orientation="horizontal"
        image={{
          src: SAMPLE_IMAGE_PROJECT,
          alt: 'Relatório Financeiro',
          aspectRatio: '16/9',
        }}
        title="Faturamento & Receita Mensal"
        subtitle="Fechamento de Ciclo"
        description="Consolidação contábil e conciliação automática de recebíveis da plataforma."
        badges={[
          <Badge key="1" variant="success" size="sm">Auditado</Badge>,
        ]}
        primaryAction={{ label: 'Download XLSX', variant: 'primary' }}
        secondaryAction={{ label: 'Ver Gráficos', variant: 'outlined' }}
      />
    </div>
  ),
};

// ============================================================================
// 7ª Estória: Composição Modular (Compound Components)
// ============================================================================
export const ComposicaoModular: Story = {
  name: '🧩 Composição Modular',
  render: () => (
    <div style={{ maxWidth: '440px', margin: '0 auto' }}>
      <Card variant="elevated">
        {/* Cabeçalho */}
        <Card.Header
          avatar={<Avatar name="Marina Silva" size="md" />}
          title="Marina Silva"
          subtitle="Tech Lead Frontend"
          action={
            <Badge variant="primary" size="sm">
              Online
            </Badge>
          }
        />

        {/* Imagem de Capa */}
        <Card.Media
          src={SAMPLE_IMAGE_CARD}
          alt="Banner de Engenharia"
          badge={<Badge variant="warning" size="sm">Review Pendente</Badge>}
        />

        {/* Corpo de Conteúdo */}
        <Card.Content>
          <Card.BadgeGroup>
            <Badge variant="neutral" size="sm">Design System</Badge>
            <Badge variant="info" size="sm">Storybook</Badge>
            <Badge variant="success" size="sm">WCAG AA</Badge>
          </Card.BadgeGroup>

          <Card.Title size="lg">
            Revisão Final da Família Card
          </Card.Title>

          <Card.Description icon={<CheckCircle2Icon />}>
            Validação de contraste cromático, interatividade por teclado e comportamento responsivo em telas mobile.
          </Card.Description>

          <Card.Progress
            value={92}
            label="92%"
            helperText="Aprovação em 11 de 12 critérios"
          />
        </Card.Content>

        {/* Rodapé de Ações */}
        <Card.Footer>
          <Button variant="outlined" size="sm">
            Recusar
          </Button>
          <Button variant="primary" size="sm">
            Aprovar Release
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ),
};
