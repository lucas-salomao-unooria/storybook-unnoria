import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup } from '../../../src/unooria/components/Avatar/Avatar';
import {
  AvatarProps,
  AvatarGroupProps,
  AvatarSize,
  AvatarVariant,
  AvatarStatus,
  AvatarState,
} from '../../../src/unooria/components/Avatar/Avatar.types';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../src/unooria/docs';

// URLs de imagens de alta definição para demonstração
const DEMO_AVATARS = {
  sarah: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  lucas: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  ana: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
  gabriel: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
  helena: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80',
  marcos: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
};

// Ícones SVG inline para ilustrações e fallbacks customizados
const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const BotIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16" />
    <line x1="16" y1="16" x2="16" y2="16" />
  </svg>
);

const BuildingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="9" y1="22" x2="9" y2="12" />
    <line x1="15" y1="22" x2="15" y2="12" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="8" y1="6" x2="10" y2="6" />
    <line x1="14" y1="6" x2="16" y2="6" />
    <line x1="8" y1="9" x2="10" y2="9" />
    <line x1="14" y1="9" x2="16" y2="9" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

/**
 * Página de Documentação Rica do Avatar baseada no Padrão Ouro do Design System Unooria
 */
const AvatarDocumentationPage = () => {
  const [removedList, setRemovedList] = useState<string[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<string>('sarah');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const handleRemove = (name: string) => {
    setRemovedList((prev) => [...prev, name]);
  };

  const handleResetRemoved = () => {
    setRemovedList([]);
  };

  const sizeTableData: { size: AvatarSize; pixels: string; font: string; statusSize: string; usage: string }[] = [
    { size: 'xs', pixels: '32px', font: '12px', statusSize: '8px', usage: 'Tabelas densas, cabeçalhos compactos e listagens secundárias.' },
    { size: 'sm', pixels: '40px', font: '14px', statusSize: '10px', usage: 'Comentários, barras de navegação superiores e dropdowns de perfil.' },
    { size: 'md', pixels: '48px', font: '16px', statusSize: '12px', usage: 'Tamanho padrão Unooria. Cards de membros, feeds e chats.' },
    { size: 'lg', pixels: '72px', font: '22px', statusSize: '16px', usage: 'Modais de detalhes do usuário, headers de página de perfil e resumos.' },
    { size: 'xl', pixels: '100px', font: '32px', statusSize: '20px', usage: 'Página principal de configurações de conta e upload de foto de perfil.' },
  ];

  const variantTableData: { variant: AvatarVariant; radius: string; description: string }[] = [
    { variant: 'circle', radius: '9999px (Circular)', description: 'Formato padrão e universal para usuários humanos e perfis pessoais.' },
    { variant: 'rounded', radius: '6px a 22px (Proporcional ao tamanho)', description: 'Formato moderno com cantos arredondados, ideal para chatbots, bots de IA e canais.' },
    { variant: 'square', radius: '4px (Quadrado Chanfrado)', description: 'Formato estruturado recomendado para organizações, empresas e logotipos corporativos.' },
  ];

  const propsTableData = [
    {
      name: 'src',
      type: 'string',
      default: 'undefined',
      desc: 'URL da imagem do perfil. Se a imagem falhar ao carregar ou for omitida, o componente ativa automaticamente o fallback (iniciais ou ícone).',
    },
    {
      name: 'name',
      type: 'string',
      default: 'undefined',
      desc: 'Nome completo ou de exibição do usuário. Gera iniciais automáticas inteligentes (ex: "Lucas Salomão" -> "LS", "Carlos" -> "CA").',
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      default: "'md'",
      desc: 'Dimensão do avatar: xs (32px), sm (40px), md (48px - Padrão), lg (72px), xl (100px).',
    },
    {
      name: 'variant',
      type: "'circle' | 'square' | 'rounded'",
      default: "'circle'",
      desc: 'Formato geométrico do contorno do avatar.',
    },
    {
      name: 'status',
      type: "'online' | 'offline' | 'busy' | 'away' | 'none'",
      default: "'none'",
      desc: 'Indicador luminoso de disponibilidade do usuário no canto inferior direito com anel de recorte (cutout).',
    },
    {
      name: 'state',
      type: "'default' | 'notification' | 'selected' | 'default_remove' | 'selected_remove'",
      default: "'default'",
      desc: 'Configuração rápida para os estados padronizados da especificação do Figma.',
    },
    {
      name: 'selected',
      type: 'boolean',
      default: 'false',
      desc: 'Ativa a borda com gradiente de alta fidelidade Unooria (linear-gradient 225deg) e anel de separação interno.',
    },
    {
      name: 'badge',
      type: 'ReactNode | number | string | boolean',
      default: 'undefined',
      desc: 'Badge de notificação no canto superior direito. Aceita booleano (dot simples), número ou elemento customizado.',
    },
    {
      name: 'badgeCount',
      type: 'number',
      default: 'undefined',
      desc: 'Contador numérico de notificações. Exibe contagens formatadas (ex: > 99 renderiza como "99+").',
    },
    {
      name: 'isRemovable',
      type: 'boolean',
      default: 'false',
      desc: 'Habilita o botão flutuante de remoção (X) no canto superior direito com foco acessível e feedback de hover.',
    },
    {
      name: 'onRemove',
      type: '(e: React.MouseEvent<HTMLButtonElement>) => void',
      default: 'undefined',
      desc: 'Callback disparado ao clicar no botão de remoção (X). Interrompe a propagação do clique no avatar.',
    },
    {
      name: 'icon',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Ícone customizado renderizado no centro do avatar quando não há imagem.',
    },
    {
      name: 'fallback',
      type: 'React.ReactNode',
      default: '<DefaultUserSvg />',
      desc: 'Elemento customizado de contingência caso a imagem falhe e não haja iniciais ou ícone fornecido.',
    },
    {
      name: 'theme',
      type: "'light' | 'dark'",
      default: "'light'",
      desc: 'Alterna a paleta de cores entre os modos Claro e Escuro da Plataforma Unooria.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      desc: 'Aplica opacidade reduzida (50%) e desativa todas as interações e manipuladores de clique.',
    },
    {
      name: 'onClick',
      type: '(e: React.MouseEvent<HTMLDivElement>) => void',
      default: 'undefined',
      desc: 'Torna o avatar interativo, habilitando foco por teclado (Tab, Enter, Space) e estilos de hover/active.',
    },
    {
      name: 'as',
      type: 'React.ElementType',
      default: "'div'",
      desc: 'Elemento HTML ou componente customizado para renderização polimórfica (ex: "button", "a", Link).',
    },
  ];

  const groupPropsTableData = [
    {
      name: 'max',
      type: 'number',
      default: 'undefined',
      desc: 'Quantidade máxima de avatares visíveis. Os itens excedentes são agrupados automaticamente em um avatar de contagem residual (+N).',
    },
    {
      name: 'total',
      type: 'number',
      default: 'undefined',
      desc: 'Contador total de membros caso a lista de filhos (`children`) seja paginada ou parcial.',
    },
    {
      name: 'spacing',
      type: "'tight' | 'normal' | 'relaxed' | number",
      default: "'normal'",
      desc: 'Intensidade da sobreposição entre os avatares empilhados.',
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      default: "'md'",
      desc: 'Tamanho padrão repassado a todos os avatares filhos que não declararem tamanho próprio.',
    },
    {
      name: 'variant',
      type: "'circle' | 'square' | 'rounded'",
      default: "'circle'",
      desc: 'Formato geométrico repassado a todos os avatares filhos.',
    },
    {
      name: 'onExtraClick',
      type: '(e: React.MouseEvent<HTMLDivElement>) => void',
      default: 'undefined',
      desc: 'Callback acionado ao clicar no avatar de contagem residual (+N).',
    },
    {
      name: 'extraAriaLabel',
      type: 'string',
      default: "'Ver mais usuários'",
      desc: 'Texto descritivo de acessibilidade (aria-label) para o indicador de excedentes.',
    },
  ];

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Identidade & Mídia"
        title="Avatar & AvatarGroup"
        description="O Avatar é o componente visual oficial da Plataforma Unooria para representação de identidades de usuários, membros de equipe, entidades corporativas, bots e contatos. Conta com suporte nativo a fotos de perfil, geração automática de iniciais com algoritmo inteligente, fallbacks com ícones SVG, 3 formatos geométricos (circle, rounded, square), 5 escalas dimensionais (xs a xl), anéis de status de presença, badges de contagem, botões de remoção rápida, bordas de seleção com gradiente exclusivo Unooria e empilhamento harmônico com AvatarGroup."
      />

      {/* 1. Visão Geral & Casos de Uso */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="1. Visão Geral & Casos de Uso"
          description="Diretrizes de experiência do usuário e cenários recomendados"
          barColor="#0066FF"
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
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
              👤 Identidade Visual Humanizada
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Permite reconhecimento visual instantâneo de pessoas em chats, tabelas de CRM, históricos de atividades, comentários e cabeçalhos de sistema.
            </p>
          </div>

          <div
            style={{
              padding: '20px',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
              🛡️ Resiliência com Fallbacks Automáticos
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Caso a imagem falhe na conexão de rede ou não exista, o componente extrai automaticamente as iniciais do <code style={{ fontSize: '12px', background: '#F1F5F9', padding: '2px 4px', borderRadius: '4px' }}>name</code> ou renderiza o ícone SVG de fallback.
            </p>
          </div>

          <div
            style={{
              padding: '20px',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
              👥 Empilhamento com AvatarGroup
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Agrupa equipes e participantes com bordas de recorte (cutout) inteligentes, controle de densidade e indicador de excesso (<code style={{ fontSize: '12px', background: '#F1F5F9', padding: '2px 4px', borderRadius: '4px' }}>+N</code>) interativo.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Figma & Especificações Oficiais */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="2. Especificações do Figma & Tokens de Design"
          description="Mapeamento direto dos nós de design e tokens CSS de alta fidelidade"
          barColor="#7FA5E2"
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Figma Design System v0.2
              </span>
              <h4 style={{ margin: '4px 0 0 0', fontSize: '18px', color: '#1E293B', fontWeight: 700 }}>
                Unooria_DS_v0.2 • Componente Avatar
              </h4>
            </div>
            <a
              href="https://www.figma.com/design/i0HRQSBtQQ9ZXDYiJPRnGv/Unooria_DS_v0.2?node-id=17423-1574&m=dev"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                backgroundColor: '#0066FF',
                color: '#FFFFFF',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 600,
                transition: 'background-color 0.2s',
              }}
            >
              <span>Abrir no Figma Dev Mode</span>
              <ExternalLinkIcon />
            </a>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Node ID Principal:</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>17423:1574</div>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Node ID de Variantes:</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>30027:31514</div>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Borda de Seleção:</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#7FA5E2', marginTop: '2px' }}>Gradiente 225° Unooria</div>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Anel de Recorte (Cutout):</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>2px Solid Cutout</div>
            </div>
          </div>

          <h5 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#334155' }}>
            Tokens CSS Mapeados:
          </h5>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '8px' }}>
            {[
              { token: '--unooria-avatar-size', value: '32px | 40px | 48px | 72px | 100px', desc: 'Dimensão dimensional da caixa' },
              { token: '--unooria-avatar-radius', value: '9999px (Circle) | 6-22px (Rounded) | 4px (Square)', desc: 'Raio de curvatura dos cantos' },
              { token: '--unooria-avatar-selected-gradient', value: 'linear-gradient(225deg, #57547D ... #BDD0EF)', desc: 'Gradiente exclusivo do anel de seleção' },
              { token: '--unooria-avatar-cutout', value: 'Light: #FFFFFF | Dark: #22272A', desc: 'Cor do anel de isolamento de bordas' },
              { token: '--unooria-avatar-bg', value: 'Light: #F5F5F5 | Dark: #3D4448', desc: 'Fundo do avatar para iniciais e ícones' },
              { token: '--unooria-avatar-color', value: 'Light: #475157 | Dark: #F5F5F5', desc: 'Cor tipográfica e de ícones internos' },
            ].map((t) => (
              <div
                key={t.token}
                onClick={() => handleCopy(t.token)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '6px',
                  border: '1px solid #E2E8F0',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
                title="Clique para copiar token"
              >
                <div>
                  <code style={{ fontWeight: 600, color: '#0066FF' }}>{t.token}</code>
                  <div style={{ color: '#64748B', fontSize: '11px' }}>{t.desc}</div>
                </div>
                <button
                  type="button"
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: copiedToken === t.token ? '#10B981' : '#94A3B8',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                  }}
                >
                  {copiedToken === t.token ? 'Copiado!' : <CopyIcon />}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Anatomia do Componente */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="3. Anatomia do Componente"
          description="Dissecção das camadas de renderização, indicadores e sobreposições"
          barColor="#10B981"
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
              justifyContent: 'center',
              gap: '48px',
              padding: '32px',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px dashed #CBD5E1',
              flexWrap: 'wrap',
            }}
          >
            {/* Exemplo 1: Avatar com Imagem e Status Online */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Avatar
                size="xl"
                src={DEMO_AVATARS.sarah}
                name="Sarah Jenkins"
                status="online"
              />
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Imagem + Status Online</span>
            </div>

            {/* Exemplo 2: Avatar Selecionado com Gradiente */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Avatar
                size="xl"
                src={DEMO_AVATARS.lucas}
                name="Lucas Salomão"
                selected
                status="busy"
              />
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Borda Gradiente + Ocupado</span>
            </div>

            {/* Exemplo 3: Avatar com Badge de Notificação */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Avatar
                size="xl"
                name="Helena Costa"
                badgeCount={5}
                variant="rounded"
              />
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Iniciais + Badge (5)</span>
            </div>

            {/* Exemplo 4: Avatar Removível */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Avatar
                size="xl"
                src={DEMO_AVATARS.gabriel}
                name="Gabriel Silva"
                isRemovable
                onRemove={() => alert('Remover clicado!')}
                variant="square"
              />
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Square + Botão Remover (X)</span>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
              marginTop: '24px',
            }}
          >
            <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
              <h5 style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>
                1. Container & Superfície (`unooria-avatar__inner`)
              </h5>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748B', lineHeight: '1.5' }}>
                Garante o corte preciso da imagem através de <code style={{ fontSize: '11px' }}>overflow: hidden</code> e aplica a borda interna de 1px.
              </p>
            </div>

            <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
              <h5 style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>
                2. Ponto de Status (`unooria-avatar__status`)
              </h5>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748B', lineHeight: '1.5' }}>
                Círculo posicionado no canto inferior direito com anel de recorte (cutout) na cor de fundo do tema para máxima legibilidade.
              </p>
            </div>

            <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
              <h5 style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>
                3. Badge de Notificação (`unooria-avatar__badge`)
              </h5>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748B', lineHeight: '1.5' }}>
                Renderizado no canto superior direito para exibir números ou pontos de notificação não lida.
              </p>
            </div>

            <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
              <h5 style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>
                4. Botão de Remoção (`unooria-avatar__remove-btn`)
              </h5>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748B', lineHeight: '1.5' }}>
                Botão acessível com foco visível, microanimação de escala no hover e ativação via Enter/Space.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Matriz de Formatos & Escala de Tamanhos */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="4. Formatos Geométricos & Escala de Tamanhos"
          description="Suporte a 3 formatos (`circle`, `rounded`, `square`) e 5 tamanhos (`xs` a `xl`)"
          barColor="#F59E0B"
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
          <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
            Escala Completa de Tamanhos:
          </h4>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: '32px',
              padding: '24px',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              marginBottom: '24px',
              flexWrap: 'wrap',
            }}
          >
            {sizeTableData.map((item) => (
              <div key={item.size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <Avatar size={item.size} src={DEMO_AVATARS.sarah} name="Sarah Jenkins" status="online" />
                <div style={{ textAlign: 'center' }}>
                  <code style={{ fontSize: '12px', fontWeight: 700, color: '#0066FF' }}>{item.size}</code>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>{item.pixels}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                  <th style={{ padding: '10px 14px', color: '#1E293B', fontWeight: 600 }}>Tamanho</th>
                  <th style={{ padding: '10px 14px', color: '#1E293B', fontWeight: 600 }}>Dimensão</th>
                  <th style={{ padding: '10px 14px', color: '#1E293B', fontWeight: 600 }}>Tipografia</th>
                  <th style={{ padding: '10px 14px', color: '#1E293B', fontWeight: 600 }}>Status Dot</th>
                  <th style={{ padding: '10px 14px', color: '#1E293B', fontWeight: 600 }}>Recomendação de Uso</th>
                </tr>
              </thead>
              <tbody>
                {sizeTableData.map((row) => (
                  <tr key={row.size} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: '#0066FF', fontFamily: 'monospace' }}>{row.size}</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#475569' }}>{row.pixels}</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#64748B' }}>{row.font}</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: '#64748B' }}>{row.statusSize}</td>
                    <td style={{ padding: '10px 14px', color: '#334155' }}>{row.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
            Formatos Geométricos (`variant`):
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {variantTableData.map((item) => (
              <div
                key={item.variant}
                style={{
                  padding: '16px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <Avatar size="lg" variant={item.variant} src={DEMO_AVATARS.lucas} name="Lucas Salomão" />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <code style={{ fontSize: '13px', fontWeight: 700, color: '#0066FF' }}>{item.variant}</code>
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{item.radius}</div>
                  <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: '#475569', lineHeight: '1.4' }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Matriz de Estados e Status de Presença */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="5. Matriz de Estados & Status de Presença"
          description="Sinalizadores de disponibilidade em tempo real, badges de notificação e seleção com gradiente"
          barColor="#8B5CF6"
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
          <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
            Status de Presença (`status`):
          </h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              marginBottom: '28px',
            }}
          >
            {[
              { status: 'online' as AvatarStatus, label: 'Online', color: '#01B574', desc: 'Disponível para chat ou chamadas imediatas.' },
              { status: 'busy' as AvatarStatus, label: 'Ocupado (Busy)', color: '#F83B3B', desc: 'Em reunião, chamada ou foco total.' },
              { status: 'away' as AvatarStatus, label: 'Ausente (Away)', color: '#F97607', desc: 'Inativo temporariamente ou em pausa.' },
              { status: 'offline' as AvatarStatus, label: 'Offline', color: '#A7B5B9', desc: 'Desconectado do sistema.' },
            ].map((st) => (
              <div
                key={st.status}
                style={{
                  padding: '16px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <Avatar size="lg" src={DEMO_AVATARS.ana} name="Ana Paula" status={st.status} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: st.color }} />
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B' }}>{st.label}</span>
                  </div>
                  <code style={{ fontSize: '11px', color: '#64748B' }}>status="{st.status}"</code>
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748B', lineHeight: '1.4' }}>
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
            Simulador Interativo de Seleção & Remoção:
          </h4>
          <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#64748B' }}>
            Clique nos avatares abaixo para selecionar e alternar o gradiente Unooria ou use o botão (X) para simular remoção de participantes de uma reunião:
          </p>

          <div
            style={{
              padding: '24px',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              flexWrap: 'wrap',
            }}
          >
            {[
              { id: 'sarah', name: 'Sarah Jenkins', src: DEMO_AVATARS.sarah, status: 'online' as AvatarStatus },
              { id: 'lucas', name: 'Lucas Salomão', src: DEMO_AVATARS.lucas, status: 'away' as AvatarStatus },
              { id: 'gabriel', name: 'Gabriel Silva', src: DEMO_AVATARS.gabriel, status: 'busy' as AvatarStatus },
              { id: 'ana', name: 'Ana Paula', src: DEMO_AVATARS.ana, status: 'online' as AvatarStatus },
              { id: 'helena', name: 'Helena Costa', src: DEMO_AVATARS.helena, status: 'offline' as AvatarStatus },
            ]
              .filter((item) => !removedList.includes(item.id))
              .map((item) => (
                <div key={item.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <Avatar
                    size="lg"
                    src={item.src}
                    name={item.name}
                    status={item.status}
                    selected={selectedAvatar === item.id}
                    isRemovable
                    onRemove={() => handleRemove(item.id)}
                    onClick={() => setSelectedAvatar(item.id)}
                  />
                  <span style={{ fontSize: '12px', color: selectedAvatar === item.id ? '#0066FF' : '#475569', fontWeight: selectedAvatar === item.id ? 700 : 500 }}>
                    {item.name.split(' ')[0]}
                  </span>
                </div>
              ))}

            {removedList.length > 0 && (
              <button
                type="button"
                onClick={handleResetRemoved}
                style={{
                  padding: '8px 14px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#0066FF',
                  cursor: 'pointer',
                }}
              >
                Restaurar ({removedList.length}) Removidos
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 6. Demonstração do AvatarGroup */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="6. Componente AvatarGroup & Empilhamento"
          description="Agrupamento de múltiplos avatares com controle de limite (`max`), densidade (`spacing`) e contador residual (+N)"
          barColor="#EC4899"
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div style={{ padding: '20px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <h5 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>
                Grupo com Limite (`max={3}` de 6 membros):
              </h5>
              <div style={{ padding: '16px 0' }}>
                <AvatarGroup max={3} size="md" onExtraClick={() => alert('Exibindo todos os 6 membros!')}>
                  <Avatar src={DEMO_AVATARS.sarah} name="Sarah Jenkins" />
                  <Avatar src={DEMO_AVATARS.lucas} name="Lucas Salomão" />
                  <Avatar src={DEMO_AVATARS.ana} name="Ana Paula" />
                  <Avatar src={DEMO_AVATARS.gabriel} name="Gabriel Silva" />
                  <Avatar src={DEMO_AVATARS.helena} name="Helena Costa" />
                  <Avatar src={DEMO_AVATARS.marcos} name="Marcos Souza" />
                </AvatarGroup>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>
                Automaticamente trunca e gera o botão <code style={{ fontSize: '11px' }}>+3</code> clicável.
              </p>
            </div>

            <div style={{ padding: '20px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <h5 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>
                Formatos Arredondados (`variant="rounded"`):
              </h5>
              <div style={{ padding: '16px 0' }}>
                <AvatarGroup max={4} size="md" variant="rounded">
                  <Avatar src={DEMO_AVATARS.sarah} name="Sarah Jenkins" />
                  <Avatar src={DEMO_AVATARS.lucas} name="Lucas Salomão" />
                  <Avatar icon={<BotIcon />} name="IA Assistant" />
                  <Avatar icon={<BuildingIcon />} name="Enterprise Unooria" />
                  <Avatar name="Carlos Eduardo" />
                </AvatarGroup>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>
                Todos os filhos herdam automaticamente o formato e o tamanho declarados no grupo.
              </p>
            </div>

            <div style={{ padding: '20px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <h5 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>
                Variações de Espaçamento (`spacing`):
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '8px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '12px', minWidth: '60px', color: '#64748B' }}>tight:</span>
                  <AvatarGroup spacing="tight" size="sm">
                    <Avatar src={DEMO_AVATARS.sarah} />
                    <Avatar src={DEMO_AVATARS.lucas} />
                    <Avatar src={DEMO_AVATARS.ana} />
                  </AvatarGroup>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '12px', minWidth: '60px', color: '#64748B' }}>normal:</span>
                  <AvatarGroup spacing="normal" size="sm">
                    <Avatar src={DEMO_AVATARS.sarah} />
                    <Avatar src={DEMO_AVATARS.lucas} />
                    <Avatar src={DEMO_AVATARS.ana} />
                  </AvatarGroup>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '12px', minWidth: '60px', color: '#64748B' }}>relaxed:</span>
                  <AvatarGroup spacing="relaxed" size="sm">
                    <Avatar src={DEMO_AVATARS.sarah} />
                    <Avatar src={DEMO_AVATARS.lucas} />
                    <Avatar src={DEMO_AVATARS.ana} />
                  </AvatarGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Boas Práticas (Do's & Don'ts) */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="7. Diretrizes de Design & Boas Práticas"
          description="Orientações essenciais para garantir consistência e ergonomia na interface"
          barColor="#EF4444"
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '16px' }}>
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
              <li>Sempre forneça a prop <code style={{ fontSize: '12px' }}>name</code> mesmo ao passar <code style={{ fontSize: '12px' }}>src</code>, para gerar o texto alternativo acessível e o fallback de iniciais.</li>
              <li>Utilize o formato <code style={{ fontSize: '12px' }}>circle</code> para seres humanos e <code style={{ fontSize: '12px' }}>rounded</code> ou <code style={{ fontSize: '12px' }}>square</code> para bots, sistemas ou empresas.</li>
              <li>Utilize o componente <code style={{ fontSize: '12px' }}>AvatarGroup</code> ao listar mais de 2 participantes juntos para evitar poluição visual.</li>
              <li>Adicione <code style={{ fontSize: '12px' }}>onRemove</code> quando o avatar representar um usuário selecionado em um campo de busca/filtro (tags).</li>
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
              <li>Não utilize imagens de baixa resolução que fiquem pixeladas nos tamanhos <code style={{ fontSize: '12px' }}>lg</code> e <code style={{ fontSize: '12px' }}>xl</code>.</li>
              <li>Não misture formatos geométricos diferentes (ex: circle com square) dentro do mesmo <code style={{ fontSize: '12px' }}>AvatarGroup</code>.</li>
              <li>Não exiba múltiplos status luminosos conflitantes no mesmo elemento.</li>
              <li>Não utilize o avatar como botão de ação destrutiva sem confirmação prévia ao acionar o <code style={{ fontSize: '12px' }}>onRemove</code>.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 8. Suporte a Temas (Light e Dark) */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="8. Suporte a Temas (Light & Dark)"
          description="Adaptação cromática automática de fundos, bordas e anéis de recorte (cutout)"
          barColor="#06B6D4"
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '16px' }}>
          {/* Light Theme */}
          <div style={{ padding: '24px', border: '1px solid #E2E8F0', borderRadius: '12px', backgroundColor: '#FFFFFF' }}>
            <h4 style={{ margin: '0 0 16px 0', color: '#0284C7', fontSize: '15px', fontWeight: 600 }}>
              ☀️ Light Theme (Tema Claro)
            </h4>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Avatar theme="light" size="lg" src={DEMO_AVATARS.sarah} status="online" />
              <Avatar theme="light" size="lg" name="Lucas Salomão" selected status="busy" />
              <Avatar theme="light" size="lg" name="Ana Paula" badgeCount={12} />
              <Avatar theme="light" size="lg" icon={<ShieldIcon />} isRemovable />
            </div>
            <p style={{ margin: '16px 0 0 0', fontSize: '12px', color: '#64748B' }}>
              Fundo claro (#F5F5F5), bordas sutis (#CBD4D6) e recorte em branco puro (#FFFFFF).
            </p>
          </div>

          {/* Dark Theme */}
          <div style={{ padding: '24px', borderRadius: '12px', backgroundColor: '#22272A', border: '1px solid #3D4448' }}>
            <h4 style={{ margin: '0 0 16px 0', color: '#38BDF8', fontSize: '15px', fontWeight: 600 }}>
              🌙 Dark Theme (Tema Escuro)
            </h4>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Avatar theme="dark" size="lg" src={DEMO_AVATARS.sarah} status="online" />
              <Avatar theme="dark" size="lg" name="Lucas Salomão" selected status="busy" />
              <Avatar theme="dark" size="lg" name="Ana Paula" badgeCount={12} />
              <Avatar theme="dark" size="lg" icon={<ShieldIcon />} isRemovable />
            </div>
            <p style={{ margin: '16px 0 0 0', fontSize: '12px', color: '#94A3B8' }}>
              Fundo escuro (#3D4448), bordas contrastantes (#536167) e anel de recorte em chumbo (#22272A).
            </p>
          </div>
        </div>
      </section>

      {/* 9. Tabela de Props API */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="9. Referência Completa das Propriedades (Props API)"
          description="Especificação técnica dos tipos, padrões e comportamentos do Avatar e AvatarGroup"
          barColor="#64748B"
        />

        <h4 style={{ margin: '16px 0 12px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
          AvatarProps
        </h4>
        <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Propriedade</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Tipo</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Padrão</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {propsTableData.map((prop) => (
                <tr key={prop.name} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0066FF', fontFamily: 'monospace' }}>{prop.name}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#475569', fontSize: '13px' }}>{prop.type}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#64748B', fontSize: '13px' }}>{prop.default}</td>
                  <td style={{ padding: '12px 16px', color: '#334155' }}>{prop.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>
          AvatarGroupProps
        </h4>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Propriedade</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Tipo</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Padrão</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {groupPropsTableData.map((prop) => (
                <tr key={prop.name} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0066FF', fontFamily: 'monospace' }}>{prop.name}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#475569', fontSize: '13px' }}>{prop.type}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#64748B', fontSize: '13px' }}>{prop.default}</td>
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

const meta: Meta<typeof Avatar> = {
  title: 'Plataforma Unooria/Componentes/Avatar',
  component: Avatar,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'URL da imagem do avatar.',
    },
    name: {
      control: 'text',
      description: 'Nome do usuário para gerar iniciais automáticas ou texto alternativo.',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Tamanho dimensional do avatar (xs: 32px a xl: 100px).',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    variant: {
      control: 'inline-radio',
      options: ['circle', 'rounded', 'square'],
      description: 'Formato geométrico do avatar.',
      table: {
        defaultValue: { summary: 'circle' },
      },
    },
    status: {
      control: 'select',
      options: ['none', 'online', 'busy', 'away', 'offline'],
      description: 'Indicador luminoso de presença do usuário.',
      table: {
        defaultValue: { summary: 'none' },
      },
    },
    state: {
      control: 'select',
      options: ['default', 'notification', 'selected', 'default_remove', 'selected_remove'],
      description: 'Estado predefinido conforme especificações do Figma.',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    selected: {
      control: 'boolean',
      description: 'Define se o avatar possui a borda em gradiente Unooria.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    badgeCount: {
      control: 'number',
      description: 'Contador numérico de notificações.',
    },
    isRemovable: {
      control: 'boolean',
      description: 'Exibe o botão de fechar/remover (X) no canto superior direito.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
      description: 'Tema visual de cores.',
      table: {
        defaultValue: { summary: 'light' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o avatar reduzindo opacidade e bloqueando cliques.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    src: DEMO_AVATARS.sarah,
    name: 'Sarah Jenkins',
    size: 'md',
    variant: 'circle',
    status: 'none',
    state: 'default',
    selected: false,
    isRemovable: false,
    theme: 'light',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

/**
 * 1. Documentação rica e completa do componente Avatar e AvatarGroup baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <AvatarDocumentationPage />,
};

/**
 * 2. Playground interativo com controles dinâmicos e container adaptável ao tema.
 */
export const Playground: Story = {
  render: (args) => (
    <div
      style={{
        padding: '48px',
        borderRadius: '16px',
        backgroundColor: args.theme === 'dark' ? '#1E293B' : '#F8FAFC',
        border: `1px solid ${args.theme === 'dark' ? '#334155' : '#E2E8F0'}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        minHeight: '200px',
      }}
    >
      <Avatar {...args} />
      {args.name && (
        <span
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: args.theme === 'dark' ? '#F8FAFC' : '#1E293B',
          }}
        >
          {args.name}
        </span>
      )}
    </div>
  ),
  args: {
    src: DEMO_AVATARS.sarah,
    name: 'Sarah Jenkins',
    size: 'lg',
    variant: 'circle',
    status: 'online',
    state: 'default',
    selected: false,
    badgeCount: 3,
    isRemovable: false,
    theme: 'light',
    disabled: false,
  },
};

/**
 * 3. Matriz visual completa com todas as variantes de formato (Circle, Rounded, Square) e tipos de conteúdo.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Tema Claro */}
      <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
          ☀️ Tema Claro (Light): Circle, Rounded e Square
        </h4>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar size="lg" variant="circle" src={DEMO_AVATARS.sarah} name="Sarah Jenkins" status="online" />
            <span style={{ fontSize: '12px', color: '#64748B' }}>Circle (Foto)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar size="lg" variant="rounded" name="Lucas Salomão" status="away" />
            <span style={{ fontSize: '12px', color: '#64748B' }}>Rounded (Iniciais)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar size="lg" variant="square" icon={<BuildingIcon />} status="offline" />
            <span style={{ fontSize: '12px', color: '#64748B' }}>Square (Ícone)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar size="lg" variant="circle" selected src={DEMO_AVATARS.lucas} name="Lucas" status="busy" />
            <span style={{ fontSize: '12px', color: '#64748B' }}>Circle (Selecionado)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar size="lg" variant="rounded" name="Helena Costa" badgeCount={9} />
            <span style={{ fontSize: '12px', color: '#64748B' }}>Rounded (Badge)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar size="lg" variant="circle" src={DEMO_AVATARS.gabriel} isRemovable onRemove={() => alert('Remover!')} />
            <span style={{ fontSize: '12px', color: '#64748B' }}>Circle (Removível)</span>
          </div>
        </div>
      </div>

      {/* Tema Escuro */}
      <div style={{ padding: '24px', backgroundColor: '#22272A', borderRadius: '16px', border: '1px solid #3D4448' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#F8FAFC', fontWeight: 600 }}>
          🌙 Tema Escuro (Dark): Circle, Rounded e Square
        </h4>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar theme="dark" size="lg" variant="circle" src={DEMO_AVATARS.sarah} name="Sarah Jenkins" status="online" />
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>Circle (Foto)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar theme="dark" size="lg" variant="rounded" name="Lucas Salomão" status="away" />
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>Rounded (Iniciais)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar theme="dark" size="lg" variant="square" icon={<BuildingIcon />} status="offline" />
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>Square (Ícone)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar theme="dark" size="lg" variant="circle" selected src={DEMO_AVATARS.lucas} name="Lucas" status="busy" />
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>Circle (Selecionado)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar theme="dark" size="lg" variant="rounded" name="Helena Costa" badgeCount={9} />
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>Rounded (Badge)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar theme="dark" size="lg" variant="circle" src={DEMO_AVATARS.gabriel} isRemovable onRemove={() => alert('Remover!')} />
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>Circle (Removível)</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * 4. Comparação da escala completa de tamanhos (xs: 32px, sm: 40px, md: 48px, lg: 72px, xl: 100px).
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h5 style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#64748B' }}>
          Avatares com Foto & Status de Presença:
        </h5>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar size="xs" src={DEMO_AVATARS.sarah} status="online" />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#0066FF' }}>xs (32px)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar size="sm" src={DEMO_AVATARS.sarah} status="online" />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#0066FF' }}>sm (40px)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar size="md" src={DEMO_AVATARS.sarah} status="online" />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#0066FF' }}>md (48px - Padrão)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar size="lg" src={DEMO_AVATARS.sarah} status="online" />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#0066FF' }}>lg (72px)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar size="xl" src={DEMO_AVATARS.sarah} status="online" />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#0066FF' }}>xl (100px)</span>
          </div>
        </div>
      </div>

      <div>
        <h5 style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#64748B' }}>
          Iniciais Automáticas com Fallback:
        </h5>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px', flexWrap: 'wrap' }}>
          <Avatar size="xs" name="Carlos Eduardo" />
          <Avatar size="sm" name="Carlos Eduardo" />
          <Avatar size="md" name="Carlos Eduardo" />
          <Avatar size="lg" name="Carlos Eduardo" />
          <Avatar size="xl" name="Carlos Eduardo" />
        </div>
      </div>
    </div>
  ),
};

/**
 * 5. Estados Visuais e Funcionais (Default, Presença, Notificação com Badge, Seleção com Gradiente, Remoção).
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <h5 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#1E293B', fontWeight: 600 }}>
          1. Indicadores de Status de Presença:
        </h5>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Avatar size="md" src={DEMO_AVATARS.sarah} status="online" />
            <span style={{ fontSize: '13px', color: '#475569' }}>Online</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Avatar size="md" src={DEMO_AVATARS.lucas} status="busy" />
            <span style={{ fontSize: '13px', color: '#475569' }}>Ocupado</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Avatar size="md" src={DEMO_AVATARS.ana} status="away" />
            <span style={{ fontSize: '13px', color: '#475569' }}>Ausente</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Avatar size="md" src={DEMO_AVATARS.gabriel} status="offline" />
            <span style={{ fontSize: '13px', color: '#475569' }}>Offline</span>
          </div>
        </div>
      </div>

      <div>
        <h5 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#1E293B', fontWeight: 600 }}>
          2. Badges de Notificação (Dot Simples e Contadores Numéricos):
        </h5>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Avatar size="md" src={DEMO_AVATARS.helena} badge />
          <Avatar size="md" src={DEMO_AVATARS.sarah} badgeCount={3} />
          <Avatar size="md" src={DEMO_AVATARS.lucas} badgeCount={42} />
          <Avatar size="md" src={DEMO_AVATARS.ana} badgeCount={150} />
        </div>
      </div>

      <div>
        <h5 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#1E293B', fontWeight: 600 }}>
          3. Estado Selecionado com Borda em Gradiente Unooria:
        </h5>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Avatar size="md" src={DEMO_AVATARS.sarah} selected />
          <Avatar size="lg" src={DEMO_AVATARS.lucas} selected status="online" />
          <Avatar size="xl" src={DEMO_AVATARS.ana} selected status="busy" />
        </div>
      </div>

      <div>
        <h5 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#1E293B', fontWeight: 600 }}>
          4. Estado Removível com Botão (X):
        </h5>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Avatar size="md" src={DEMO_AVATARS.gabriel} isRemovable onRemove={() => alert('Remover Gabriel!')} />
          <Avatar size="lg" src={DEMO_AVATARS.sarah} isRemovable onRemove={() => alert('Remover Sarah!')} />
          <Avatar size="xl" name="Lucas Salomão" isRemovable onRemove={() => alert('Remover Lucas!')} />
        </div>
      </div>
    </div>
  ),
};

/**
 * 6. Demonstrações do AvatarGroup com empilhamento harmônico, limites e contadores de excesso.
 */
export const GrupoDeAvatares: Story = {
  name: 'Grupo de Avatares (AvatarGroup)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h5 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#1E293B', fontWeight: 600 }}>
          Grupo Completo vs. Limite de Excesso (`max={4}`):
        </h5>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <AvatarGroup size="md">
            <Avatar src={DEMO_AVATARS.sarah} name="Sarah Jenkins" />
            <Avatar src={DEMO_AVATARS.lucas} name="Lucas Salomão" />
            <Avatar src={DEMO_AVATARS.ana} name="Ana Paula" />
            <Avatar src={DEMO_AVATARS.gabriel} name="Gabriel Silva" />
            <Avatar src={DEMO_AVATARS.helena} name="Helena Costa" />
            <Avatar src={DEMO_AVATARS.marcos} name="Marcos Souza" />
          </AvatarGroup>

          <AvatarGroup max={4} size="md" onExtraClick={() => alert('Ver todos os participantes')}>
            <Avatar src={DEMO_AVATARS.sarah} name="Sarah Jenkins" />
            <Avatar src={DEMO_AVATARS.lucas} name="Lucas Salomão" />
            <Avatar src={DEMO_AVATARS.ana} name="Ana Paula" />
            <Avatar src={DEMO_AVATARS.gabriel} name="Gabriel Silva" />
            <Avatar src={DEMO_AVATARS.helena} name="Helena Costa" />
            <Avatar src={DEMO_AVATARS.marcos} name="Marcos Souza" />
          </AvatarGroup>
        </div>
      </div>

      <div>
        <h5 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#1E293B', fontWeight: 600 }}>
          Escalas de Tamanho do AvatarGroup:
        </h5>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '12px', minWidth: '40px', color: '#64748B' }}>sm:</span>
            <AvatarGroup max={3} size="sm">
              <Avatar src={DEMO_AVATARS.sarah} />
              <Avatar src={DEMO_AVATARS.lucas} />
              <Avatar src={DEMO_AVATARS.ana} />
              <Avatar src={DEMO_AVATARS.gabriel} />
              <Avatar src={DEMO_AVATARS.helena} />
            </AvatarGroup>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '12px', minWidth: '40px', color: '#64748B' }}>md:</span>
            <AvatarGroup max={3} size="md">
              <Avatar src={DEMO_AVATARS.sarah} />
              <Avatar src={DEMO_AVATARS.lucas} />
              <Avatar src={DEMO_AVATARS.ana} />
              <Avatar src={DEMO_AVATARS.gabriel} />
              <Avatar src={DEMO_AVATARS.helena} />
            </AvatarGroup>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '12px', minWidth: '40px', color: '#64748B' }}>lg:</span>
            <AvatarGroup max={3} size="lg">
              <Avatar src={DEMO_AVATARS.sarah} />
              <Avatar src={DEMO_AVATARS.lucas} />
              <Avatar src={DEMO_AVATARS.ana} />
              <Avatar src={DEMO_AVATARS.gabriel} />
              <Avatar src={DEMO_AVATARS.helena} />
            </AvatarGroup>
          </div>
        </div>
      </div>
    </div>
  ),
};
