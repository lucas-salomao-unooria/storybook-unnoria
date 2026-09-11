import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '../../../src/unooria/components/Button/Button';
import { ButtonVariant, ButtonState } from '../../../src/unooria/components/Button/Button.types';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';

// Ícones SVG inline para independência total e zero dependências externas
const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h8c1 0 2 1 2 2v2" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

/**
 * Página de Documentação Rica do Button baseada no Padrão Ouro do Design System Unooria
 */
const ButtonDocumentationPage = () => {
  const propsTableData = [
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'",
      default: "'primary'",
      desc: 'Variante visual e nível de hierarquia funcional da ação.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      desc: 'Escala do botão: sm (36px altura), md (44px altura padrão) e lg (52px altura).',
    },
    {
      name: 'theme',
      type: "'light' | 'dark'",
      default: "'light'",
      desc: 'Tema visual de cores para interfaces claras ou escuras.',
    },
    {
      name: 'state',
      type: "'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading'",
      default: "'default'",
      desc: 'Força um estado visual isolado para testes, homologação ou exibição em matrizes.',
    },
    {
      name: 'isDisabled',
      type: 'boolean',
      default: 'false',
      desc: 'Desabilita o botão, aplicando estilos opacos e bloqueando eventos de clique.',
    },
    {
      name: 'isLoading',
      type: 'boolean',
      default: 'false',
      desc: 'Exibe indicador animado de carregamento (spinner), bloqueia cliques e aplica aria-busy="true".',
    },
    {
      name: 'loadingText',
      type: 'string',
      default: 'undefined',
      desc: 'Texto alternativo exibido ao lado do spinner durante o estado de carregamento.',
    },
    {
      name: 'leftIcon',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Elemento ou ícone renderizado à esquerda do texto.',
    },
    {
      name: 'rightIcon',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Elemento ou ícone renderizado à direita do texto.',
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      default: 'false',
      desc: 'Se true, expande o botão para ocupar 100% da largura do elemento pai.',
    },
    {
      name: 'as',
      type: 'React.ElementType',
      default: "'button'",
      desc: 'Elemento ou componente polimórfico (ex: "a", "button", Link do Next.js/React Router).',
    },
    {
      name: 'href',
      type: 'string',
      default: 'undefined',
      desc: 'URL de destino quando o botão é renderizado como link polimórfico.',
    },
    {
      name: 'target',
      type: 'string',
      default: 'undefined',
      desc: 'Destino de abertura (ex: "_blank") quando renderizado como link.',
    },
    {
      name: 'rel',
      type: 'string',
      default: 'undefined',
      desc: 'Relação do link quando renderizado como link.',
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      default: 'undefined',
      desc: 'Conteúdo textual ou elementos internos do botão.',
    },
  ];

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Ações"
        title="Button"
        description="O componente Button é o principal elemento de interação da Plataforma Unooria. Projetado para acionar ações síncronas e assíncronas, submeter formulários e orientar o fluxo do usuário com hierarquia clara, feedback tátil instantâneo, microinterações refinadas e conformidade total com a WCAG 2.1 AA."
      />

      {/* 1. Visão Geral & Motivo de Uso */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="1. Visão Geral & Motivos de Uso"
          description="Diretrizes fundamentais de uso do botão no ecossistema de produtos Unooria"
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
              🎯 Propósito & Intenção
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Utilizado para acionar comandos imediatos que alteram o estado da aplicação ou disparam fluxos de dados, como salvar dados, confirmar diálogos, baixar relatórios e deletar registros.
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
              ⚡ Feedback Instantâneo
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Transições suaves para os estados <code style={{ fontSize: '12px', background: '#E2E8F0', padding: '2px 4px', borderRadius: '4px' }}>Hover</code>, <code style={{ fontSize: '12px', background: '#E2E8F0', padding: '2px 4px', borderRadius: '4px' }}>Active</code>, <code style={{ fontSize: '12px', background: '#E2E8F0', padding: '2px 4px', borderRadius: '4px' }}>Focus</code> e spinner animado de <code style={{ fontSize: '12px', background: '#E2E8F0', padding: '2px 4px', borderRadius: '4px' }}>Loading</code>.
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
              ♿ Acessibilidade Integrada
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#475569' }}>
              Atende à conformidade WCAG 2.1 AA com contraste mínimo de 4.5:1 em todas as variantes, anel de foco por teclado de 2px e bloqueio nativo durante carregamento.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Hierarquia das Variantes */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="2. Hierarquia das 7 Variantes"
          description="O sistema disponibiliza 7 variantes para estabelecer uma hierarquia visual intuitiva e evitar sobrecarga cognitiva"
          barColor="#1D0B36"
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
          {/* Primary */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '16px 20px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', flexWrap: 'wrap' }}>
            <div style={{ minWidth: '160px' }}>
              <Button variant="primary">Primary Action</Button>
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 600, color: '#006BFF' }}>Primary (Ação Principal)</h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>
                Destinada à ação de maior relevância da tela ou modal (ex: &quot;Salvar alterações&quot;, &quot;Confirmar compra&quot;). <strong>Regra:</strong> Deve haver no máximo 1 botão Primary em foco por bloco visual.
              </p>
              <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#475569', lineHeight: '1.5', padding: '8px 10px', backgroundColor: '#F8FAFC', borderLeft: '3px solid #CBD4D6', borderRadius: '4px' }}>
                <strong>O tom desta variante mudou, e essa era a razão de ser do quadro novo.</strong> O azul anterior (<code>brandnavy-600</code>) é quase o mesmo tom do desabilitado, e o botão principal da tela lia como desligado em vez de apertável. Agora o repouso é o roxo quase preto <code>brandpurple-950</code> e o <em>pressed</em> clareia um degrau, para <code>brandpurple-900</code> — não há para onde escurecer a partir do extremo da escala.
              </p>
            </div>
          </div>

          {/* Secondary */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '16px 20px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', flexWrap: 'wrap' }}>
            <div style={{ minWidth: '160px' }}>
              <Button variant="secondary">Secondary Action</Button>
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>Secondary (Ação Secundária)</h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>
                Ações de suporte de alta importância que acompanham um botão primário (ex: &quot;Exportar dados&quot;, &quot;Aplicar filtro&quot;, &quot;Ver detalhes&quot;).
              </p>
            </div>
          </div>

          {/* Outline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '16px 20px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', flexWrap: 'wrap' }}>
            <div style={{ minWidth: '160px' }}>
              <Button variant="outline">Outline Action</Button>
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 600, color: '#475569' }}>Outline (Ação Contornada)</h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>
                Ações de média prioridade ou opções alternativas (ex: &quot;Voltar&quot;, &quot;Cancelar&quot;, &quot;Editar rascunho&quot;). Apresenta borda de 1.5px e fundo transparente.
              </p>
            </div>
          </div>

          {/* Ghost */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '16px 20px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', flexWrap: 'wrap' }}>
            <div style={{ minWidth: '160px' }}>
              <Button variant="ghost">Ghost Action</Button>
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 600, color: '#64748B' }}>Ghost (Ação Sutil)</h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>
                Ações de baixa prioridade em barras de ferramentas, cabeçalhos ou agrupamentos densos (ex: &quot;Limpar filtros&quot;, &quot;Saiba mais&quot;, &quot;Ajuda&quot;). Sem borda e sem fundo.
              </p>
            </div>
          </div>

          {/* Danger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '16px 20px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', flexWrap: 'wrap' }}>
            <div style={{ minWidth: '160px' }}>
              <Button variant="danger" leftIcon={<TrashIcon />}>Excluir Item</Button>
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 600, color: '#DC2626' }}>Danger (Ação Crítica/Destrutiva)</h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>
                Exclusiva para operações irreversíveis ou de alto risco (ex: &quot;Excluir conta&quot;, &quot;Remover usuário&quot;, &quot;Revogar acesso&quot;).
              </p>
            </div>
          </div>

          {/* Light — a amostra vai sobre faixa escura, que é onde a variante existe */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '16px 20px', backgroundColor: '#22272A', border: '1px solid #3D4448', borderRadius: '12px', flexWrap: 'wrap' }}>
            <div style={{ minWidth: '160px' }}>
              <Button variant="light">Ver a foto</Button>
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 600, color: '#FFFFFF' }}>Light (Sobre Fundo Escuro ou Foto)</h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#CBD4D6', lineHeight: '1.5' }}>
                Pastilha branca translúcida para quando o fundo não é a superfície da plataforma: capa de vídeo, imagem, faixa escura. <strong>Regra:</strong> não use sobre fundo claro — ali ela desaparece, e <code>outline</code> ou <code>ghost</code> resolvem melhor.
              </p>
            </div>
          </div>

          {/* AI */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '16px 20px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', flexWrap: 'wrap' }}>
            <div style={{ minWidth: '160px' }}>
              <Button variant="ai">Gerar com IA</Button>
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 600, color: '#57547D' }}>AI (Ação de Inteligência Artificial)</h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>
                Contorno roxo e rótulo em gradiente, reservados a ações que acionam IA (gerar, resumir, sugerir). <strong>Regra:</strong> o gradiente é a marca dessa ação — não a use para outra coisa, ou ela deixa de sinalizar o que sinaliza.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Anatomia & Dimensões */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="3. Anatomia & Dimensões"
          description="Especificação dos três tamanhos disponíveis e seus alvos de toque acessíveis"
          barColor="#00A369"
        />

        <div style={{ overflowX: 'auto', marginTop: '16px' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '650px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', textAlign: 'left', fontSize: '13px', color: '#475569' }}>
                <th style={{ padding: '12px 16px' }}>Tamanho</th>
                <th style={{ padding: '12px 16px' }}>Altura</th>
                <th style={{ padding: '12px 16px' }}>Tipografia</th>
                <th style={{ padding: '12px 16px' }}>Padding & Gap</th>
                <th style={{ padding: '12px 16px' }}>Exemplo</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '14px', color: '#1E293B' }}>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '16px', fontWeight: 600 }}>Small (<code style={{ fontSize: '12px' }}>sm</code>)</td>
                <td style={{ padding: '16px' }}>36px</td>
                <td style={{ padding: '16px' }}>13px / Peso 600</td>
                <td style={{ padding: '16px' }}>8px 14px (gap: 6px)</td>
                <td style={{ padding: '16px' }}>
                  <Button size="sm" variant="primary">Botão SM</Button>
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '16px', fontWeight: 600 }}>Medium (<code style={{ fontSize: '12px' }}>md</code>) — Padrão</td>
                <td style={{ padding: '16px' }}>44px</td>
                <td style={{ padding: '16px' }}>14px / Peso 600</td>
                <td style={{ padding: '16px' }}>10px 18px (gap: 8px)</td>
                <td style={{ padding: '16px' }}>
                  <Button size="md" variant="primary">Botão MD</Button>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '16px', fontWeight: 600 }}>Large (<code style={{ fontSize: '12px' }}>lg</code>)</td>
                <td style={{ padding: '16px' }}>52px</td>
                <td style={{ padding: '16px' }}>15px / Peso 600</td>
                <td style={{ padding: '16px' }}>12px 24px (gap: 10px)</td>
                <td style={{ padding: '16px' }}>
                  <Button size="lg" variant="primary">Botão LG</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Diretrizes de Design & Boas Práticas (Do's & Don'ts) */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader title="4. Diretrizes de Design & Boas Práticas" barColor="#EF4444" />
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
              <li>Utilize verbos no imperativo ou infinitivo que indiquem ação clara (ex: &quot;Salvar alterações&quot;, &quot;Criar conta&quot;).</li>
              <li>Mantenha no máximo 1 botão <code style={{ fontSize: '12px' }}>Primary</code> por viewport ou modal para não dividir a atenção.</li>
              <li>Utilize a prop <code style={{ fontSize: '12px' }}>isLoading</code> e <code style={{ fontSize: '12px' }}>loadingText</code> durante requisições assíncronas.</li>
              <li>Adicione <code style={{ fontSize: '12px' }}>aria-label</code> quando o botão contiver apenas ícone sem rótulo textual visível.</li>
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
              <li>Não utilize rótulos genéricos como &quot;Clique aqui&quot; ou &quot;OK&quot;.</li>
              <li>Não coloque dois botões <code style={{ fontSize: '12px' }}>Primary</code> lado a lado competindo pela mesma ação.</li>
              <li>Não utilize a variante <code style={{ fontSize: '12px' }}>danger</code> para ações rotineiras e reversíveis como &quot;Cancelar edição&quot;.</li>
              <li>Não desabilite botões sem fornecer feedback ou dica do motivo do bloqueio.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Acessibilidade (WCAG) & Suporte a Temas */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader title="5. Acessibilidade (WCAG 2.1 AA) & Suporte a Temas" barColor="#06B6D4" />
        <div
          style={{
            padding: '20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            marginBottom: '20px',
          }}
        >
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1E293B', fontWeight: 600 }}>
            ♿ Acessibilidade e Navegação por Teclado
          </h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#475569', lineHeight: '1.7' }}>
            <li>
              <strong>Contraste:</strong> no claro, o rótulo de <code>outline</code>, <code>ghost</code> e <code>light</code> mede <strong>5.52:1</strong> (<code>brandnavy-800</code>) e o gradiente da <code>ai</code> vai de 7.07:1 a 5.52:1 em toda a sua extensão — todos acima do mínimo de 4.5:1 da WCAG AA. O tema escuro atende inteiro (rótulo 9.65:1; <code>primary</code> 6.78:1 em repouso, 7.93:1 em <em>hover</em>, 6.02:1 em <em>pressed</em>).
            </li>
            <li>
              <strong>A <code>primary</code> passou a ser a variante de MAIOR contraste</strong> — rótulo branco sobre o roxo quase preto mede <strong>19.58:1</strong> em repouso e <strong>18.23:1</strong> em <em>pressed</em>. Era a de menor contraste antes (2.51:1). No tema escuro, 9.32:1, 11.27:1 e 6.37:1.
            </li>
            <li>
              <strong>Exceção aberta — o <em>hover</em> da <code>primary</code> no tema claro:</strong> o quadro o mantém em <code>brandnavy-600</code>, que com rótulo branco mede <strong>2.51:1</strong>. O botão salta de 19.58:1 em repouso para 2.51:1 sob o ponteiro, ou seja, o rótulo quase some no momento em que a pessoa mira nele. Está implementado como o desenho manda; a correção de um degrau seria <code>brandpurple-800</code>, que daria <strong>11.37:1</strong> e preservaria o clareamento. <strong>Pendente de decisão de design.</strong>
            </li>
            <li>
              <strong>Desvio deliberado em relação ao Figma:</strong> o quadro põe rótulo e borda no mesmo degrau, e o rótulo ali mediria 3.63:1 em repouso e 2.51:1 em <em>hover</em> — abaixo do mínimo. Aqui os dois se separam: a <strong>borda</strong> segue o degrau mais leve do desenho (<code>brandnavy-700</code>, e <code>600</code> no <em>hover</em>) e o <strong>rótulo</strong> fica no degrau legível. A intenção visual do desenho se mantém; o que não acompanha é o texto, que é o que precisa ser lido. Registrado na seção 5.1 do <code>AGENTS.md</code>.
            </li>
            <li>
              <strong>Duas ressalvas que continuam abertas, nas cores que o desenho define:</strong> a borda da <code>outline</code> em <em>hover</em> mede 2.51:1, abaixo dos 3:1 que a WCAG 1.4.11 pede para contorno de componente — o rótulo continua legível, o contorno é que enfraquece ao passar o ponteiro. E o rótulo branco da <code>light</code> sobre o azul do <em>hover</em> mede 2.51:1 (no <em>pressed</em> sobe para 5.52:1). O desabilitado da <code>light</code> mede 1.28:1, tecnicamente isento pela WCAG (componente inativo), mas na prática ilegível.
            </li>
            <li>
              <strong>Anel de Foco Visível:</strong> Foco por teclado via tecla <code style={{ fontSize: '12px' }}>Tab</code> com contorno de 2px de alto contraste (<code style={{ fontSize: '12px' }}>:focus-visible</code>).
            </li>
            <li>
              <strong>Gerenciamento de Estado ARIA:</strong> Quando <code style={{ fontSize: '12px' }}>isLoading=true</code>, o componente aplica automaticamente <code style={{ fontSize: '12px' }}>aria-busy=&quot;true&quot;</code> e <code style={{ fontSize: '12px' }}>aria-disabled=&quot;true&quot;</code>.
            </li>
          </ul>
        </div>

        {/* Comparação Light vs Dark */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '20px', border: '1px solid #CBD4D6', borderRadius: '12px', backgroundColor: '#FFFFFF' }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#22272A', fontSize: '14px', fontWeight: 700 }}>☀️ Light Mode (Tema Claro)</h4>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Button theme="light" variant="primary">Primary</Button>
              <Button theme="light" variant="secondary">Secondary</Button>
              <Button theme="light" variant="outline">Outline</Button>
              <Button theme="light" variant="danger">Danger</Button>
            </div>
          </div>

          <div style={{ padding: '20px', borderRadius: '12px', backgroundColor: '#22272A' }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#F1F5F9', fontSize: '14px', fontWeight: 700 }}>🌙 Dark Mode (Tema Escuro)</h4>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Button theme="dark" variant="primary">Primary</Button>
              <Button theme="dark" variant="secondary">Secondary</Button>
              <Button theme="dark" variant="outline">Outline</Button>
              <Button theme="dark" variant="danger">Danger</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Props API Reference */}
      <section>
        <UnooriaDocSectionHeader title="6. Referência Completa das Propriedades (Props API)" barColor="#64748B" />
        <div style={{ overflowX: 'auto', marginTop: '16px' }}>
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
      </section>
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof Button> = {
  title: 'Plataforma Unooria/Componentes/Button',
  component: Button,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'light', 'ai'],
      description:
        'Variante visual do botão. No Figma a `ghost` se chama Subtle; o nome do código não mudou para não quebrar quem já a usa.',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho e escala de altura do componente.',
      table: {
        defaultValue: { summary: 'md' },
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
    state: {
      control: 'select',
      options: ['default', 'hover', 'active', 'focus', 'disabled', 'loading'],
      description: 'Força um estado visual isolado.',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Desabilita o botão bloqueando cliques.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Exibe indicador animado de carregamento.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loadingText: {
      control: 'text',
      description: 'Texto exibido durante o carregamento.',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Expande o botão para 100% da largura.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: 'text',
      description: 'Texto do botão.',
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    theme: 'light',
    state: 'default',
    isDisabled: false,
    isLoading: false,
    fullWidth: false,
    children: 'Salvar Alterações',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ButtonDocumentationPage />,
};

/**
 * Playground interativo com controles abrangentes e fundo adaptativo ao tema.
 */
export const Playground: Story = {
  render: (args) => (
    <div
      style={{
        padding: '32px',
        borderRadius: '12px',
        backgroundColor: args.theme === 'dark' ? '#1E293B' : '#F8FAFC',
        border: `1px solid ${args.theme === 'dark' ? '#334155' : '#E2E8F0'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '120px',
      }}
    >
      <Button {...args} />
    </div>
  ),
  args: {
    variant: 'primary',
    size: 'md',
    theme: 'light',
    children: 'Botão Interativo',
  },
};

/**
 * Todas as 7 variantes funcionais do botão (Primary, Secondary, Outline, Ghost, Danger, Light, AI).
 */
export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger" leftIcon={<TrashIcon />}>Danger</Button>
        <Button variant="ai">AI</Button>
      </div>

      {/*
        A `light` fica na sua própria faixa porque é branca: sobre o fundo claro
        das outras ela não se enxergaria, e uma amostra invisível documenta
        errado. A faixa escura é o contexto em que ela existe.
      */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          alignItems: 'center',
          padding: '20px',
          borderRadius: '12px',
          backgroundColor: '#22272A',
        }}
      >
        <Button variant="light">Light</Button>
        <Button variant="light" leftIcon={<PlusIcon />}>Sobre fundo escuro</Button>
      </div>
    </div>
  ),
};

/**
 * Escala de tamanhos suportados (sm: 36px, md: 44px, lg: 52px).
 */
export const TodosTamanhos: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
      <Button size="sm" leftIcon={<PlusIcon />}>
        Small (36px)
      </Button>
      <Button size="md" leftIcon={<PlusIcon />}>
        Medium (44px)
      </Button>
      <Button size="lg" leftIcon={<PlusIcon />}>
        Large (52px)
      </Button>
    </div>
  ),
};

/**
 * Matriz visual completa comparando variantes e estados interativos nos dois temas.
 */
export const MatrizDeEstados: Story = {
  render: () => {
    const variants: ButtonVariant[] = [
      'primary',
      'secondary',
      'outline',
      'ghost',
      'danger',
      'light',
      'ai',
    ];
    /*
     * A `light` é uma pastilha branca: na linha de fundo branco do tema claro
     * ela desapareceria, e a matriz mostraria uma linha vazia como se o
     * componente estivesse quebrado. A célula dela ganha fundo escuro nos DOIS
     * temas — é o contexto para o qual a variante foi desenhada.
     */
    const fundoDaCelula = (v: ButtonVariant) => (v === 'light' ? '#22272A' : undefined);
    const states: { label: string; stateProp?: ButtonState }[] = [
      { label: 'Default', stateProp: 'default' },
      { label: 'Hover', stateProp: 'hover' },
      { label: 'Active', stateProp: 'active' },
      { label: 'Focus', stateProp: 'focus' },
      { label: 'Disabled', stateProp: 'disabled' },
      { label: 'Loading', stateProp: 'loading' },
    ];

    const renderMatrix = (theme: 'light' | 'dark') => (
      <div
        style={{
          padding: '24px',
          borderRadius: '12px',
          backgroundColor: theme === 'dark' ? '#22272A' : '#FFFFFF',
          border: `1px solid ${theme === 'dark' ? '#3D4448' : '#E2E8F0'}`,
          marginBottom: '24px',
          color: theme === 'dark' ? '#FFFFFF' : '#1E293B',
        }}
      >
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 700 }}>
          {theme === 'light' ? '☀️ Tema Claro (Light Mode)' : '🌙 Tema Escuro (Dark Mode)'}
        </h4>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '760px' }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${theme === 'dark' ? '#3D4448' : '#CBD4D6'}` }}>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px' }}>Variante</th>
                {states.map((st) => (
                  <th key={st.label} style={{ padding: '12px', textAlign: 'center', fontSize: '13px' }}>
                    {st.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {variants.map((v) => (
                <tr key={v} style={{ borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}` }}>
                  <td style={{ padding: '14px 12px', fontWeight: 600, fontSize: '13px', textTransform: 'capitalize' }}>
                    {v}
                  </td>
                  {states.map((st) => (
                    <td
                      key={st.label}
                      style={{
                        padding: '14px 8px',
                        textAlign: 'center',
                        backgroundColor: fundoDaCelula(v),
                      }}
                    >
                      <Button
                        variant={v}
                        size="sm"
                        theme={theme}
                        state={st.stateProp}
                        leftIcon={st.stateProp === 'default' ? <PlusIcon /> : undefined}
                      >
                        {st.stateProp === 'loading' ? 'Salvando' : 'Botão'}
                      </Button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {renderMatrix('light')}
        {renderMatrix('dark')}
      </div>
    );
  },
};

/**
 * Variações de Ícones (Esquerda, Direita, Ambos e Botão Somente Ícone com aria-label).
 */
export const ComIcones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary" leftIcon={<PlusIcon />}>
        Novo Registro
      </Button>
      <Button variant="secondary" rightIcon={<ArrowRightIcon />}>
        Avançar
      </Button>
      <Button variant="outline" leftIcon={<DownloadIcon />} rightIcon={<StarIcon />}>
        Exportar Favorito
      </Button>
      <Button variant="danger" leftIcon={<TrashIcon />}>
        Excluir
      </Button>
      <Button variant="primary" size="md" aria-label="Adicionar novo item" leftIcon={<PlusIcon />} />
    </div>
  ),
};

/**
 * Estados de Carregamento Assíncrono (isLoading e loadingText).
 */
export const EstadoCarregamento: Story = {
  render: () => {
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const triggerAsync = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
      setter(true);
      setTimeout(() => setter(false), 2500);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#64748B' }}>
          Clique nos botões abaixo para simular chamadas assíncronas com bloqueio de clique automático:
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button
            variant="primary"
            isLoading={loading1}
            loadingText="Salvando no Servidor..."
            onClick={() => triggerAsync(setLoading1)}
          >
            {loading1 ? 'Salvando...' : 'Salvar Alterações'}
          </Button>

          <Button
            variant="secondary"
            isLoading={loading2}
            loadingText="Gerando PDF..."
            onClick={() => triggerAsync(setLoading2)}
          >
            {loading2 ? 'Gerando...' : 'Baixar Relatório'}
          </Button>

          <Button variant="outline" isLoading>
            Spinner Sem Texto
          </Button>
        </div>
      </div>
    );
  },
};

/**
 * Botão com Largura Total (fullWidth={true}) ideal para contêineres de formulários móveis e modais.
 */
export const LarguraTotal: Story = {
  render: () => (
    <div style={{ maxWidth: '400px', padding: '24px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Button variant="primary" fullWidth size="lg">
        Continuar para o Pagamento
      </Button>
      <Button variant="ghost" fullWidth size="md">
        Cancelar e Voltar
      </Button>
    </div>
  ),
};

/**
 * Renderização Polimórfica utilizando a propriedade `as` (ex: como link `<a>`).
 */
export const Polimorfismo: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button
        as="a"
        href="https://unooria.com"
        target="_blank"
        rel="noopener noreferrer"
        variant="primary"
      >
        Link Externo (&lt;a&gt;) ↗
      </Button>
      <Button
        as="a"
        href="#secao-documentacao"
        variant="outline"
      >
        Âncora Interna (&lt;a&gt;)
      </Button>
    </div>
  ),
};

/**
 * Modo Escuro (Dark Mode) Isolado.
 */
export const ModoEscuro: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div style={{ padding: '24px', backgroundColor: '#22272A', borderRadius: '12px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button theme="dark" variant="primary">Primary Dark</Button>
      <Button theme="dark" variant="secondary">Secondary Dark</Button>
      <Button theme="dark" variant="outline">Outline Dark</Button>
      <Button theme="dark" variant="ghost">Ghost Dark</Button>
      <Button theme="dark" variant="danger" leftIcon={<TrashIcon />}>Danger Dark</Button>
    </div>
  ),
};

/**
 * Comparação Lado a Lado dos Temas Light e Dark.
 */
export const ComparacaoTemas: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
      <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #CBD4D6' }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#22272A' }}>☀️ Modo Claro (Light)</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Button variant="primary" theme="light">Primary Light</Button>
          <Button variant="secondary" theme="light">Secondary Light</Button>
          <Button variant="outline" theme="light">Outline Light</Button>
          <Button variant="ghost" theme="light">Ghost Light</Button>
          <Button variant="danger" theme="light">Danger Light</Button>
        </div>
      </div>

      <div style={{ padding: '24px', backgroundColor: '#22272A', borderRadius: '12px' }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#F1F5F9' }}>🌙 Modo Escuro (Dark)</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Button variant="primary" theme="dark">Primary Dark</Button>
          <Button variant="secondary" theme="dark">Secondary Dark</Button>
          <Button variant="outline" theme="dark">Outline Dark</Button>
          <Button variant="ghost" theme="dark">Ghost Dark</Button>
          <Button variant="danger" theme="dark">Danger Dark</Button>
        </div>
      </div>
    </div>
  ),
};

/**
 * Cenários Práticos Reais: Modal de Confirmação Crítica e Barra de Ações de Tabela.
 */
export const CenariosReais: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '640px' }}>
      {/* Modal de Exclusão */}
      <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <h5 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 700, color: '#1E293B' }}>
          Excluir Repositório de Dados
        </h5>
        <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#64748B', lineHeight: '1.5' }}>
          Esta ação é irreversível e excluirá permanentemente todos os registros, backups e logs associados.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <Button variant="outline" onClick={() => alert('Cancelado')}>
            Cancelar
          </Button>
          <Button variant="danger" leftIcon={<TrashIcon />} onClick={() => alert('Excluído')}>
            Excluir Definitivamente
          </Button>
        </div>
      </div>
    </div>
  ),
};
