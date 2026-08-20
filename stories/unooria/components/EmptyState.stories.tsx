import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { EmptyState } from '../../../src/unooria/components/EmptyState/EmptyState';
import { EmptyStateVariant } from '../../../src/unooria/components/EmptyState/EmptyState.types';
import { Button } from '../../../src/unooria/components/Button';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';

// ============================================================================
// Ícones SVG utilitários inline para independência e máxima fidelidade visual
// ============================================================================
const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const RefreshIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

const FilterClearIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
    <line x1="1" y1="1" x2="23" y2="23" stroke="#DC2626" strokeWidth="2" />
  </svg>
);

const RocketIllustration = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="40" cy="40" r="36" fill="#006BFF" fillOpacity="0.08" />
    <path
      d="M49.5 24.5C49.5 24.5 45.5 22 38.5 29C31.5 36 29 40 29 40L34 45L44.5 34.5L45.5 35.5L35 46L40 51C40 51 44 48.5 51 41.5C58 34.5 55.5 30.5 55.5 30.5L49.5 24.5Z"
      stroke="#006BFF"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M29 40L23 42L25 48L31 46"
      stroke="#006BFF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M40 51L42 57L48 55L46 49"
      stroke="#006BFF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="48" cy="32" r="2.5" fill="#006BFF" />
    <path
      d="M24 56C21 59 20 63 20 63C20 63 24 62 27 59"
      stroke="#DD5202"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Página de Documentação Rica do EmptyState baseada no Padrão Ouro do Design System Unooria
 */
const EmptyStateDocumentationPage = () => {
  const [docTheme, setDocTheme] = useState<'light' | 'dark'>('light');

  const variantsList: {
    variant: EmptyStateVariant;
    title: string;
    description: string;
    color: string;
    useCase: string;
  }[] = [
    {
      variant: 'no-data',
      title: 'Nenhum dado cadastrado',
      description: 'Você ainda não possui cursos ou atividades ativas nesta categoria.',
      color: '#7FA5E2',
      useCase: 'Telas iniciais de onboarding, módulos sem registros e listagens vazias.',
    },
    {
      variant: 'no-results',
      title: 'Nenhum resultado encontrado',
      description: 'Não encontramos itens correspondentes aos termos ou filtros aplicados.',
      color: '#6487C2',
      useCase: 'Buscas sem correspondência, filtros combinados muito restritivos.',
    },
    {
      variant: 'error',
      title: 'Erro ao carregar informações',
      description: 'Ocorreu uma falha na conexão com nossos servidores. Tente novamente.',
      color: '#F83B3B',
      useCase: 'Falhas de rede, respostas 500 da API ou timeout de requisições.',
    },
    {
      variant: 'permission',
      title: 'Acesso restrito',
      description: 'Você não tem permissão para visualizar este relatório ou painel.',
      color: '#716C98',
      useCase: 'Perfis de usuário sem nível de acesso suficiente para o módulo.',
    },
    {
      variant: 'success',
      title: 'Tudo em dia por aqui!',
      description: 'Todas as tarefas e pendências foram concluídas com sucesso.',
      color: '#01B574',
      useCase: 'Zero Inbox, fila de moderação vazia ou aprovações 100% concluídas.',
    },
    {
      variant: 'custom',
      title: 'Variante Customizada',
      description: 'Permite injetar qualquer ilustração SVG ou ícone proprietário.',
      color: '#006BFF',
      useCase: 'Campanhas promocionais, boas-vindas especiais ou lançamentos.',
    },
  ];

  const propsTableData = [
    {
      name: 'variant',
      type: "'no-data' | 'no-results' | 'error' | 'permission' | 'success' | 'custom'",
      default: "'no-data'",
      desc: 'Define a variante semântica, ilustração SVG padrão e paleta cromática.',
    },
    {
      name: 'title',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Título principal em destaque (18px Bold / Heading) que resume a ausência de dados.',
    },
    {
      name: 'description',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Texto explicativo complementar (14px-16px Regular) orientando os próximos passos.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      desc: 'Escala do componente: sm (compacto, 48px ícone), md (padrão, 64px ícone) e lg (amplo, 80px ícone).',
    },
    {
      name: 'align',
      type: "'center' | 'left'",
      default: "'center'",
      desc: 'Alinhamento horizontal do conteúdo textual, botões e ilustração.',
    },
    {
      name: 'theme',
      type: "'light' | 'dark'",
      default: "'light'",
      desc: 'Alterna entre os esquemas visuais Claro e Escuro da plataforma Unooria.',
    },
    {
      name: 'primaryAction',
      type: 'EmptyStateAction | React.ReactNode',
      default: 'undefined',
      desc: 'Ação principal em destaque (CTA preenchido). Aceita objeto de configuração ou elemento React.',
    },
    {
      name: 'secondaryAction',
      type: 'EmptyStateAction | React.ReactNode',
      default: 'undefined',
      desc: 'Ação secundária complementar (Outline/Subtle). Aceita objeto de configuração ou elemento React.',
    },
    {
      name: 'icon',
      type: 'boolean | React.ReactNode',
      default: 'true',
      desc: 'Controla a exibição: true (SVG padrão), false (oculto) ou ReactNode customizado.',
    },
    {
      name: 'illustration',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Ilustração SVG customizada de alta prioridade (substitui o ícone padrão).',
    },
    {
      name: 'bordered',
      type: 'boolean',
      default: 'false',
      desc: 'Se true, aplica contorno suave de 1px e fundo delimitador arredondado tipo card.',
    },
    {
      name: 'compact',
      type: 'boolean',
      default: 'false',
      desc: 'Remove os paddings externos padrão para encaixe direto em tabelas e modais.',
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      default: 'true',
      desc: 'Se true, estende a largura do contêiner para 100% do espaço disponível.',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Nós filhos opcionais renderizados entre a descrição e a barra de ações.',
    },
  ];

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Estados & Feedbacks"
        title="EmptyState"
        description="O EmptyState é o componente oficial da Plataforma Unooria para comunicação de estados vazios, ausência de dados, resultados de busca não encontrados, erros de carregamento e boas-vindas. Evita telas em branco desconectadas, contextualiza a situação com ilustrações semânticas e fornece rotas de ação claras (CTAs primários e secundários)."
      />

      {/* 1. Visão Geral & Casos de Uso */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="1. Visão Geral & Casos de Uso"
          description="Diretrizes de experiência do usuário e principais cenários de aplicação"
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
              borderRadius: '12px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
              🚀 Telas Iniciais & Onboarding
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
              Quando um usuário entra pela primeira vez em um módulo sem conteúdo cadastrado (ex: &quot;Nenhum curso cadastrado&quot;), o EmptyState o convida a criar o primeiro item com um CTA em destaque.
            </p>
          </div>

          <div
            style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
              🔍 Resultados de Busca & Filtros
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
              Quando uma busca ou conjunto de filtros não retorna correspondências, orienta o usuário a redefinir os filtros ou tentar outros termos de pesquisa.
            </p>
          </div>

          <div
            style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
              ⚠️ Erros de Conexão & Carga
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
              Substitui travamentos ou telas quebradas por uma mensagem humana de erro acompanhada de botão de ação para tentar novamente.
            </p>
          </div>

          <div
            style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
              🔒 Permissões Negadas
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
              Comunica ausência de privilégios de acesso de forma educada, orientando o usuário a solicitar liberação ao administrador da conta.
            </p>
          </div>

          <div
            style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
              🎉 Zero Inbox / Conclusão
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
              Celebra a finalização de todas as atividades, pendências ou mensagens na fila (ex: &quot;Tudo limpo por aqui!&quot;).
            </p>
          </div>

          <div
            style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
              💡 Anti-Padrão &quot;Dead End&quot;
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6' }}>
              Elimina becos sem saída na navegação. Todo EmptyState deve apresentar pelo menos uma ação de retorno ou criação de conteúdo.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Figma & Especificações */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="2. Especificações de Design no Figma"
          description="Tokens oficiais, referências de nó e links diretos do arquivo de design"
          barColor="#6366F1"
        />

        <div
          style={{
            padding: '20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginTop: '16px',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Figma Component Master:
              </span>
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#1E293B', marginTop: '4px' }}>
                Design System Unooria • Empty State (Nós 7965:5382 e 7965:5390)
              </div>
            </div>
            <a
              href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=7965-5382&m=dev"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: '#006BFF',
                color: '#FFFFFF',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              <span>Abrir no Figma (Dev Mode)</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '12px',
              paddingTop: '12px',
              borderTop: '1px solid #F1F5F9',
            }}
          >
            <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Dimensão Padrão (MD)</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>Ícone 64px • Max-width 480px</div>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Tipografia do Título</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>18px Bold (Heading M)</div>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Tipografia da Descrição</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>14px-16px Regular (Body S/M)</div>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Espaçamento Interno</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>Gap 16px • Padding 32px/24px</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Anatomia do Componente */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="3. Anatomia do Componente"
          description="Estrutura visual e hierarquia dos elementos que compõem o EmptyState"
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
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            <div style={{ borderLeft: '4px solid #006BFF', paddingLeft: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>
                1. Ilustração SVG Vetorial
              </strong>
              <span style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.5' }}>
                Ilustração centralizada com proporções de 48px (sm), 64px (md), 80px (lg) ou artes proprietárias de até 120px.
              </span>
            </div>

            <div style={{ borderLeft: '4px solid #006BFF', paddingLeft: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>
                2. Título Principal (Heading)
              </strong>
              <span style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.5' }}>
                Frase curta, clara e concisa (18px Bold) explicando em poucas palavras o estado atual.
              </span>
            </div>

            <div style={{ borderLeft: '4px solid #006BFF', paddingLeft: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>
                3. Descrição Explicativa (Body)
              </strong>
              <span style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.5' }}>
                Texto orientativo (14px-16px Regular) indicando a causa e a rota recomendada ao usuário.
              </span>
            </div>

            <div style={{ borderLeft: '4px solid #006BFF', paddingLeft: '12px' }}>
              <strong style={{ fontSize: '14px', color: '#1E293B', display: 'block' }}>
                4. Ações & CTAs (Buttons Group)
              </strong>
              <span style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.5' }}>
                Botão primário preenchido (Filled/Primary) e botão secundário complementar (Outline/Subtle).
              </span>
            </div>
          </div>

          {/* Exemplo Vivo de Anatomia */}
          <div
            style={{
              padding: '24px',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px dashed #CBD5E1',
            }}
          >
            <EmptyState
              variant="no-data"
              title="Exemplo de Anatomia Completa"
              description="Esta demonstração ilustra a harmonia visual entre o ícone SVG, o título, o texto descritivo e os botões de ação."
              primaryAction={{
                label: 'Ação Primária',
                onClick: () => alert('Ação Primária Clicada'),
              }}
              secondaryAction={{
                label: 'Ação Secundária',
                onClick: () => alert('Ação Secundária Clicada'),
              }}
            />
          </div>
        </div>
      </section>

      {/* 4. Matriz de Variantes Semânticas & Tamanhos */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="4. Variantes Semânticas & Tamanhos"
          description="As 6 variantes contextuais e os 3 tamanhos padronizados"
          barColor="#10B981"
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '16px' }}>
          {variantsList.map((item) => (
            <div
              key={item.variant}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      backgroundColor: `${item.color}15`,
                      color: item.color,
                    }}
                  >
                    Variante: {item.variant}
                  </span>
                  <span style={{ fontSize: '12px', color: '#64748B' }}>size=&quot;sm&quot;</span>
                </div>
                <EmptyState
                  variant={item.variant}
                  size="sm"
                  title={item.title}
                  description={item.description}
                  illustration={item.variant === 'custom' ? <RocketIllustration /> : undefined}
                  primaryAction={{
                    label: 'Ação Recomendada',
                    size: 'sm',
                  }}
                  bordered
                />
              </div>
              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #F1F5F9', fontSize: '12px', color: '#64748B' }}>
                <strong>Caso de uso:</strong> {item.useCase}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Boas Práticas (Do's & Don'ts) */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="5. Boas Práticas (Do's & Don'ts)"
          description="Recomendações essenciais para garantir excelente experiência de uso"
          barColor="#EF4444"
        />

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
            <h4
              style={{
                margin: '0 0 12px 0',
                color: '#166534',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>✅</span> O que fazer (Do&apos;s)
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#15803D', lineHeight: '1.6' }}>
              <li>
                <strong>Forneça sempre uma rota de saída:</strong> Inclua botões como &quot;Criar item&quot;, &quot;Limpar filtros&quot; ou &quot;Tentar novamente&quot;.
              </li>
              <li>
                <strong>Use linguagem acolhedora e positiva:</strong> Explique o estado atual sem culpar o usuário.
              </li>
              <li>
                <strong>Escolha a variante correta:</strong> Utilize <code>no-results</code> para filtros vazios e <code>no-data</code> para tabelas recém-criadas.
              </li>
              <li>
                <strong>Adapte a escala:</strong> Use <code>size=&quot;sm&quot;</code> dentro de modais e gavetas laterais compactas.
              </li>
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
            <h4
              style={{
                margin: '0 0 12px 0',
                color: '#991B1B',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>❌</span> O que evitar (Don&apos;ts)
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#B91C1C', lineHeight: '1.6' }}>
              <li>
                <strong>Não crie &quot;Dead Ends&quot;:</strong> Evite telas vazias sem nenhum botão de ação ou orientação de navegação.
              </li>
              <li>
                <strong>Não use mensagens técnicas:</strong> Evite exibir termos como &quot;NullPointerException&quot; ou &quot;Erro 500&quot; no título.
              </li>
              <li>
                <strong>Não sobrecarregue com textos longos:</strong> Mantenha a descrição entre 1 e 2 linhas para leitura imediata.
              </li>
              <li>
                <strong>Não use a variante de erro para filtros vazios:</strong> A ausência de resultados de pesquisa não é uma falha de sistema.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Suporte a Temas (Light e Dark) */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="6. Suporte a Temas (Light & Dark)"
          description="Contraste de cores perfeitamente calibrado para ambientes claros e escuros"
          barColor="#0EA5E9"
        />

        <div
          style={{
            padding: '20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            marginBottom: '20px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>
              Simulador Interativo de Tema
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setDocTheme('light')}
                style={{
                  padding: '6px 12px',
                  fontSize: '13px',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: docTheme === 'light' ? '#006BFF' : '#FFFFFF',
                  color: docTheme === 'light' ? '#FFFFFF' : '#334155',
                  cursor: 'pointer',
                }}
              >
                ☀️ Light Mode
              </button>
              <button
                type="button"
                onClick={() => setDocTheme('dark')}
                style={{
                  padding: '6px 12px',
                  fontSize: '13px',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: '1px solid #3D4448',
                  backgroundColor: docTheme === 'dark' ? '#006BFF' : '#22272A',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                }}
              >
                🌙 Dark Mode
              </button>
            </div>
          </div>

          <div
            style={{
              padding: '32px',
              borderRadius: '12px',
              backgroundColor: docTheme === 'dark' ? '#0E1039' : '#FFFFFF',
              border: `1px solid ${docTheme === 'dark' ? '#57547D' : '#E2E8F0'}`,
              transition: 'all 0.3s ease',
            }}
          >
            <EmptyState
              theme={docTheme}
              variant="no-data"
              title="Ambiente Adaptável a Temas"
              description="O EmptyState recalcula automaticamente as cores de fundo, ilustrações SVG, contraste de texto e botões conforme o tema ativo."
              primaryAction={{
                label: 'Ação Principal',
                theme: docTheme,
              }}
              secondaryAction={{
                label: 'Ação Secundária',
                theme: docTheme,
              }}
              bordered
            />
          </div>
        </div>

        {/* Comparação Lado a Lado */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '20px', border: '1px solid #E2E8F0', borderRadius: '12px', backgroundColor: '#FFFFFF' }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#006BFF', fontSize: '15px', fontWeight: 600 }}>
              ☀️ Tema Claro (Light Mode)
            </h4>
            <EmptyState
              theme="light"
              variant="no-results"
              title="Sem resultados na busca"
              description="Experimente ajustar os termos ou remover filtros aplicados."
              size="sm"
              primaryAction={{ label: 'Limpar Filtros', size: 'sm' }}
              bordered
            />
          </div>

          <div style={{ padding: '20px', borderRadius: '12px', backgroundColor: '#0E1039', border: '1px solid #57547D' }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#A4BDE9', fontSize: '15px', fontWeight: 600 }}>
              🌙 Tema Escuro (Dark Mode)
            </h4>
            <EmptyState
              theme="dark"
              variant="no-results"
              title="Sem resultados na busca"
              description="Experimente ajustar os termos ou remover filtros aplicados."
              size="sm"
              primaryAction={{ label: 'Limpar Filtros', size: 'sm', theme: 'dark' }}
              bordered
            />
          </div>
        </div>
      </section>

      {/* 7. Props API Reference */}
      <section>
        <UnooriaDocSectionHeader
          title="7. Referência Completa das Propriedades (Props API)"
          description="Lista detalhada de tipos, valores padrão e documentação de cada prop"
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
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Tipo</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Padrão</th>
                <th style={{ padding: '12px 16px', color: '#1E293B', fontWeight: 600 }}>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {propsTableData.map((prop) => (
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

// ============================================================================
// Configuração Storybook Meta
// ============================================================================
const meta: Meta<typeof EmptyState> = {
  title: 'Plataforma Unooria/Componentes/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['no-data', 'no-results', 'error', 'permission', 'success', 'custom'],
      description: 'Variante semântica que define a ilustração e paleta de cores padrão.',
      table: {
        defaultValue: { summary: 'no-data' },
      },
    },
    title: {
      control: 'text',
      description: 'Título principal em destaque que sintetiza a situação.',
    },
    description: {
      control: 'text',
      description: 'Texto complementar explicativo orientando o usuário.',
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Escala dimensional do componente (tamanho do ícone e fontes).',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    align: {
      control: 'inline-radio',
      options: ['center', 'left'],
      description: 'Alinhamento horizontal dos elementos internos.',
      table: {
        defaultValue: { summary: 'center' },
      },
    },
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
      description: 'Tema visual de cores do componente.',
      table: {
        defaultValue: { summary: 'light' },
      },
    },
    icon: {
      control: 'boolean',
      description: 'Habilita ou oculta a ilustração vetorial SVG.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    bordered: {
      control: 'boolean',
      description: 'Aplica contorno suave de borda e fundo em formato de card.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    compact: {
      control: 'boolean',
      description: 'Remove os paddings externos para encaixe em contêineres reduzidos.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Estende o componente para 100% da largura do contêiner.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    variant: 'no-data',
    title: 'Nenhum dado cadastrado',
    description: 'Comece criando um novo registro para visualizar as métricas e relatórios.',
    size: 'md',
    align: 'center',
    theme: 'light',
    icon: true,
    bordered: false,
    compact: false,
    fullWidth: true,
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

// ============================================================================
// 1ª Estória (Mandatória): 📄 Documentação Completa
// ============================================================================
/**
 * Documentação rica e completa do componente EmptyState baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <EmptyStateDocumentationPage />,
};

// ============================================================================
// 2ª Estória: Playground Interativo
// ============================================================================
/**
 * Playground interativo com controles abrangentes e fundo adaptativo ao tema.
 */
export const Playground: Story = {
  render: (args) => (
    <div
      style={{
        padding: '32px',
        borderRadius: '12px',
        backgroundColor: args.theme === 'dark' ? '#0E1039' : '#F8FAFC',
        border: `1px solid ${args.theme === 'dark' ? '#57547D' : '#E2E8F0'}`,
        maxWidth: '720px',
        margin: '0 auto',
        transition: 'all 0.2s ease',
      }}
    >
      <EmptyState
        {...args}
        primaryAction={{
          label: 'Ação Principal',
          onClick: () => alert('Ação primária acionada no Playground'),
        }}
        secondaryAction={{
          label: 'Ação Secundária',
          onClick: () => alert('Ação secundária acionada no Playground'),
        }}
      />
    </div>
  ),
  args: {
    variant: 'no-data',
    title: 'Nenhum curso encontrado',
    description: 'Você pode criar um novo curso agora mesmo ou importar uma grade curricular existente.',
    size: 'md',
    align: 'center',
    theme: 'light',
    bordered: true,
  },
};

// ============================================================================
// 3ª Estória: Todas as Variantes Semânticas
// ============================================================================
/**
 * Matriz visual completa com todas as 5 variantes semânticas nativas do componente.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
      {/* no-data */}
      <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <EmptyState
          variant="no-data"
          size="sm"
          title="Sem dados cadastrados"
          description="Nenhum item foi adicionado a esta lista ainda."
          primaryAction={{ label: 'Adicionar Item', size: 'sm' }}
        />
      </div>

      {/* no-results */}
      <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <EmptyState
          variant="no-results"
          size="sm"
          title="Nenhum resultado"
          description="Tente buscar por outro termo ou limpe os filtros."
          primaryAction={{ label: 'Limpar Filtros', size: 'sm' }}
        />
      </div>

      {/* error */}
      <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <EmptyState
          variant="error"
          size="sm"
          title="Erro de conexão"
          description="Não foi possível carregar as informações do servidor."
          primaryAction={{ label: 'Tentar Novamente', size: 'sm' }}
        />
      </div>

      {/* permission */}
      <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <EmptyState
          variant="permission"
          size="sm"
          title="Acesso restrito"
          description="Você precisa de permissão de administrador para ver este painel."
          primaryAction={{ label: 'Solicitar Acesso', size: 'sm' }}
        />
      </div>

      {/* success */}
      <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <EmptyState
          variant="success"
          size="sm"
          title="Tudo concluído!"
          description="Você não possui pendências nem mensagens na fila."
          primaryAction={{ label: 'Ir para Dashboard', size: 'sm' }}
        />
      </div>
    </div>
  ),
};

// ============================================================================
// 4ª Estória: Com Botões de Ação (Primária e Secundária)
// ============================================================================
/**
 * Demonstração do suporte a múltiplas ações integradas (CTA primário Filled e secundário Outline).
 */
export const ComBotoesDeAcao: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '640px', margin: '0 auto' }}>
      {/* Com 2 Ações */}
      <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <EmptyState
          variant="no-data"
          title="Comece sua primeira turma"
          description="Crie uma turma do zero ou importe os dados cadastrais diretamente de uma planilha."
          primaryAction={{
            label: 'Criar Turma',
            icon: <PlusIcon />,
            onClick: () => alert('Criar Turma acionado'),
          }}
          secondaryAction={{
            label: 'Importar Planilha',
            onClick: () => alert('Importar Planilha acionado'),
          }}
          bordered
        />
      </div>

      {/* Com 1 Ação de Recarregamento */}
      <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <EmptyState
          variant="error"
          title="Falha na sincronização de dados"
          description="Ocorreu uma instabilidade momentânea na conexão. Seus dados continuam salvos."
          primaryAction={{
            label: 'Tentar Novamente',
            icon: <RefreshIcon />,
            onClick: () => alert('Tentando sincronizar novamente...'),
          }}
          bordered
        />
      </div>
    </div>
  ),
};

// ============================================================================
// 5ª Estória: Todos os Tamanhos (SM, MD, LG)
// ============================================================================
/**
 * Comparação lado a lado dos 3 tamanhos dimensionais (sm, md, lg).
 */
export const TodosTamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* SM */}
      <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '8px' }}>
          TAMANHO SM (Compacto - 48px SVG • Para cards e modais)
        </div>
        <EmptyState
          size="sm"
          variant="no-data"
          title="Nenhum arquivo anexado"
          description="Arraste arquivos aqui para fazer upload."
          primaryAction={{ label: 'Anexar Arquivo', size: 'sm' }}
        />
      </div>

      {/* MD */}
      <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '8px' }}>
          TAMANHO MD (Padrão Figma - 64px SVG • Para tabelas e seções)
        </div>
        <EmptyState
          size="md"
          variant="no-results"
          title="Nenhum aluno encontrado"
          description="Verifique a ortografia ou redefina os filtros aplicados."
          primaryAction={{ label: 'Redefinir Filtros' }}
        />
      </div>

      {/* LG */}
      <div style={{ padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '8px' }}>
          TAMANHO LG (Amplo - 80px SVG • Para páginas inteiras e onboarding)
        </div>
        <EmptyState
          size="lg"
          variant="no-data"
          title="Bem-vindo ao Unooria Learning"
          description="Você ainda não possui cursos cadastrados. Crie seu primeiro curso para iniciar o gerenciamento pedagógico."
          primaryAction={{ label: 'Criar Meu Primeiro Curso', size: 'md' }}
          secondaryAction={{ label: 'Conhecer Recursos' }}
        />
      </div>
    </div>
  ),
};

// ============================================================================
// 6ª Estória: Simulador de Tabela Vazia Interativo
// ============================================================================
/**
 * Exemplo prático simulando uma tabela de dados com estado vazio e adição interativa de registros.
 */
export const SimuladorTabelaVazia: Story = {
  render: () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [students, setStudents] = useState<string[]>([]);

    const handleAddStudent = () => {
      const nextId = students.length + 1;
      setStudents((prev) => [...prev, `Aluno ${nextId} - Matrícula #${1000 + nextId}`]);
    };

    const handleClearSearch = () => {
      setSearchTerm('');
    };

    const filteredStudents = students.filter((s) =>
      s.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          overflow: 'hidden',
        }}
      >
        {/* Cabeçalho do Card / Tabela */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            backgroundColor: '#F8FAFC',
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#1E293B' }}>
              Gestão de Alunos ({students.length})
            </h3>
            <span style={{ fontSize: '13px', color: '#64748B' }}>
              Listagem cadastral de matrículas ativas
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '8px 12px',
                fontSize: '13px',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                outline: 'none',
              }}
            />
            <Button variant="primary" size="sm" onClick={handleAddStudent} leftIcon={<PlusIcon />}>
              Novo Aluno
            </Button>
          </div>
        </div>

        {/* Corpo da Tabela / Estado Vazio */}
        <div style={{ padding: students.length > 0 && filteredStudents.length > 0 ? '0' : '32px' }}>
          {students.length === 0 ? (
            <EmptyState
              variant="no-data"
              title="Nenhum aluno cadastrado"
              description="Cadastre o primeiro aluno para começar a registrar frequências e notas."
              primaryAction={{
                label: 'Adicionar Primeiro Aluno',
                icon: <PlusIcon />,
                onClick: handleAddStudent,
              }}
            />
          ) : filteredStudents.length === 0 ? (
            <EmptyState
              variant="no-results"
              title="Nenhum aluno encontrado"
              description={`Nenhum aluno corresponde à busca "${searchTerm}". Verifique o termo digitado.`}
              primaryAction={{
                label: 'Limpar Busca',
                icon: <FilterClearIcon />,
                onClick: handleClearSearch,
              }}
            />
          ) : (
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {filteredStudents.map((student, idx) => (
                <li
                  key={idx}
                  style={{
                    padding: '14px 20px',
                    borderBottom: '1px solid #F1F5F9',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '14px',
                    color: '#334155',
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{student}</span>
                  <span
                    style={{
                      fontSize: '12px',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      backgroundColor: '#ECFDF5',
                      color: '#047857',
                      fontWeight: 600,
                    }}
                  >
                    Ativo
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Rodapé da Tabela */}
        {students.length > 0 && (
          <div
            style={{
              padding: '12px 20px',
              borderTop: '1px solid #E2E8F0',
              backgroundColor: '#F8FAFC',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: '13px', color: '#64748B' }}>
              Exibindo {filteredStudents.length} de {students.length} registro(s)
            </span>
            <button
              type="button"
              onClick={() => setStudents([])}
              style={{
                background: 'none',
                border: 'none',
                color: '#DC2626',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Resetar / Esvaziar Tabela
            </button>
          </div>
        )}
      </div>
    );
  },
};
