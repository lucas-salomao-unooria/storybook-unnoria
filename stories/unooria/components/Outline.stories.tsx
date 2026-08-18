import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Outline } from '../../../src/unooria/components/Outline/Outline';
import { OutlineItem } from '../../../src/unooria/components/Outline/OutlineItem';
import { OutlineItemData } from '../../../src/unooria/components/Outline/Outline.types';
import '../../../src/unooria/tokens/icons.css';
import '../../../src/unooria/components/Outline/Outline.css';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

// Dados de exemplo oficiais extraídos do Figma Placeholder (Frame 24200:1439)
const FIGMA_SAMPLE_ITEMS: OutlineItemData[] = [
  {
    id: '1',
    number: '1.',
    title: 'Metodologia ágil',
    level: 1,
    children: [
      {
        id: '1-1',
        number: '1.1.',
        title: 'Scrum',
        level: 2,
      },
      {
        id: '1-2',
        number: '1.2',
        title: 'Kanban',
        level: 2,
        children: [
          {
            id: '1-2-1',
            number: '1.2.1',
            title: 'Práticas e Políticas Explícitas',
            level: 3,
          },
        ],
      },
    ],
  },
  {
    id: '2',
    number: '2.',
    title: 'Conceitos de Usabilidade',
    level: 1,
  },
  {
    id: '3',
    number: '3.',
    title: 'Ferramentas',
    level: 1,
    children: [
      {
        id: '3-1',
        number: '3.1.',
        title: 'Trello e Jira',
        level: 2,
      },
    ],
  },
  {
    id: '4',
    number: '4.',
    title: 'Proto persona',
    level: 1,
  },
  {
    id: '5',
    number: '5.',
    title: 'Proto jornada',
    level: 1,
  },
  {
    id: '6',
    number: '6.',
    title: 'Arquitetura da Informação',
    level: 1,
  },
  {
    id: '7',
    number: '7.',
    title: 'Protótipo de baixa fidelidade',
    level: 1,
  },
  {
    id: '8',
    number: '8.',
    title: 'Protótipo de alta-fidelidade',
    level: 1,
    children: [
      {
        id: '8-1',
        number: '8.1.',
        title: 'Teoria das cores e tipografia',
        level: 2,
      },
    ],
  },
];

/**
 * Página principal de documentação rica do componente Outline Item
 */
const OutlineDocumentationPage: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');
  const [selectedId, setSelectedId] = useState<string | null>('8');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Estado para o simulador interativo completo
  const [interactiveItems, setInteractiveItems] = useState<OutlineItemData[]>([
    {
      id: 'it-1',
      title: 'Módulo 1: Fundamentos de UX/UI',
      level: 1,
      prefix: <span style={{ color: '#01B574', fontSize: '14px', marginRight: '4px' }}>●</span>,
      suffix: <span style={{ fontSize: '11px', backgroundColor: '#EBF3FF', color: '#0086FF', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>4 aulas</span>,
      children: [
        {
          id: 'it-1-1',
          title: 'Pesquisa com Usuários e Desk Research',
          level: 2,
          suffix: <span style={{ fontSize: '11px', color: '#64748B', fontFamily: 'monospace' }}>25 min</span>,
        },
        {
          id: 'it-1-2',
          title: 'Mapeamento de Empatia e Personas',
          level: 2,
          suffix: <span style={{ fontSize: '11px', color: '#64748B', fontFamily: 'monospace' }}>40 min</span>,
        },
      ],
    },
    {
      id: 'it-2',
      title: 'Módulo 2: Prototipação e Testes',
      level: 1,
      prefix: <span style={{ color: '#0086FF', fontSize: '14px', marginRight: '4px' }}>●</span>,
      suffix: <span style={{ fontSize: '11px', backgroundColor: '#EBF3FF', color: '#0086FF', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>3 aulas</span>,
      children: [
        {
          id: 'it-2-1',
          title: 'Wireframes e Fluxogramas Interativos',
          level: 2,
          suffix: <span style={{ fontSize: '11px', color: '#64748B', fontFamily: 'monospace' }}>30 min</span>,
        },
        {
          id: 'it-2-2',
          title: 'Testes de Usabilidade e Métricas de Sucesso',
          level: 2,
          suffix: <span style={{ fontSize: '11px', color: '#64748B', fontFamily: 'monospace' }}>50 min</span>,
        },
      ],
    },
  ]);

  const handleActionToast = (action: string, id: string) => {
    setActionFeedback(`Ação "${action}" executada no item ID: ${id}`);
    setTimeout(() => setActionFeedback(null), 2500);
  };

  const handleAddModule = () => {
    const nextNum = interactiveItems.length + 1;
    const newId = `it-${Date.now()}`;
    setInteractiveItems([
      ...interactiveItems,
      {
        id: newId,
        title: `Módulo ${nextNum}: Novo Módulo de Aprendizado`,
        level: 1,
        prefix: <span style={{ color: '#7FA5E2', fontSize: '14px', marginRight: '4px' }}>●</span>,
      },
    ]);
    setSelectedId(newId);
  };

  const handleAddSubItem = (parentId: string) => {
    const newSubId = `sub-${Date.now()}`;
    setInteractiveItems((prev) =>
      prev.map((item) => {
        if (item.id === parentId) {
          const currentChildren = item.children || [];
          return {
            ...item,
            children: [
              ...currentChildren,
              {
                id: newSubId,
                title: `Nova Aula / Subtópico ${currentChildren.length + 1}`,
                level: (item.level || 1) + 1,
              },
            ],
          };
        }
        return item;
      })
    );
    setSelectedId(newSubId);
  };

  const handleDeleteItem = (id: string) => {
    setInteractiveItems((prev) =>
      prev
        .filter((it) => it.id !== id)
        .map((it) => ({
          ...it,
          children: it.children ? it.children.filter((child) => child.id !== id) : undefined,
        }))
    );
    if (selectedId === id) setSelectedId(null);
  };

  const handleTitleChange = (id: string, newTitle: string) => {
    setInteractiveItems((prev) =>
      prev.map((it) => {
        if (it.id === id) return { ...it, title: newTitle };
        if (it.children) {
          return {
            ...it,
            children: it.children.map((c) => (c.id === id ? { ...c, title: newTitle } : c)),
          };
        }
        return it;
      })
    );
    handleActionToast('Título Atualizado', id);
  };

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Estrutura & Navegação"
        title="Outline Item"
        description="Componente oficial para exibição, edição, reordenação e gestão hierárquica de conteúdos estruturados em sequência, subtópicos ou níveis aninhados (como ementas de cursos, fluxos passo a passo e agendas)."
      />

      {/* FEEDBACK DE AÇÃO GLOBAL */}
      {actionFeedback && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#22272A',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
            fontSize: '14px',
            fontWeight: 600,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <span style={{ color: '#01B574' }}>✓</span>
          <span>{actionFeedback}</span>
        </div>
      )}

      {/* =========================================================================
          SEÇÃO 1: REPRODUÇÃO FIEL DO FIGMA (Node 24199:85)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#22272A', margin: '0 0 4px 0' }}>
              Especificação Visual Figma (Node 24199:85)
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
              Design exato conforme especificado na prancha do Figma para o componente Outline Item.
            </p>
          </div>
          <a
            href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=24199-85&m=dev"
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

        {/* CONTAINER ESCURO FIGMA #22272A */}
        <div
          style={{
            backgroundColor: '#22272A',
            borderRadius: '32px',
            padding: '56px 48px',
            color: '#FFFFFF',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {/* Header do Frame Figma */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '28px' }}>
            <span style={{ fontSize: '16px', color: '#CBD4D6', fontWeight: 400 }}>Components</span>
            <h1 style={{ fontSize: '40px', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>Outline Item</h1>
            <span style={{ fontSize: '18px', color: '#7FA5E2', fontWeight: 500 }}>Gestão Hierárquica de Tópicos e Ementas</span>
          </div>

          {/* Texto Conceitual do Figma */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              lineHeight: 1.6,
            }}
          >
            <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
              O que é o Outline Item?
            </h3>
            <p style={{ fontSize: '14px', color: '#CBD4D6', margin: 0 }}>
              O <strong>Outline Item</strong> é um componente utilizado para exibir e gerenciar conteúdos de forma estruturada,
              ordenada e hierárquica. Ele ajuda a organizar informações em sequência, subtópicos ou níveis aninhados, mantendo
              clareza e consistência na interface. Esse componente é especialmente útil em experiências onde o conteúdo precisa
              ser editado, reordenado, recuado ou removido, como estruturas de cursos, fluxos passo a passo, agendas ou listas de tópicos.
            </p>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
              <p style={{ fontSize: '14px', color: '#94A3B8', margin: 0 }}>
                <strong style={{ color: '#7FA5E2' }}>Exemplo visual prático (Placeholder):</strong> Em uma plataforma de ensino,
                o Outline Item organiza módulos e aulas: <em>"1. Metodologia ágil"</em>, <em>"1.1. Scrum"</em>, <em>"1.2 Kanban"</em>,
                <em>"2. Conceitos de Usabilidade"</em>, <em>"8. Protótipo de alta-fidelidade"</em>. Ao clicar em um item, o usuário
                revela ações contextuais para mover, indentar, outdentar, criar sub-itens e excluir.
              </p>
            </div>
          </div>

          {/* Frame Réplica 1:1 do Placeholder do Figma */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '32px',
              color: '#22272A',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                Placeholder Oficial do Figma (Frame 24200:1439)
              </span>
              <span style={{ fontSize: '12px', color: '#0086FF', fontWeight: 600 }}>
                Item "8. Protótipo de alta-fidelidade" ativo com 4 botões de ação
              </span>
            </div>

            <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', backgroundColor: '#FFFFFF' }}>
              <Outline
                items={FIGMA_SAMPLE_ITEMS}
                selectedId={selectedId}
                onSelect={(id) => setSelectedId(id)}
                onAction={(type, id) => handleActionToast(type, id)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 2: ANATOMIA E NÍVEIS HIERÁRQUICOS
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Anatomia e Escala de Recuo (padding-left)"
          description="O recuo horizontal é proporcional ao grau de aninhamento: paddingLeft = 8px + (Nível - 1) * 16px."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {/* Nível 01 */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B' }}>Nível 01 (Raiz)</span>
              <code style={{ fontSize: '11px', color: '#0086FF', backgroundColor: '#F0F7FF', padding: '2px 6px', borderRadius: '4px' }}>
                Recuo: 0px
              </code>
            </div>
            <div style={{ backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '8px', border: '1px solid #E2E8F0' }}>
              <OutlineItem
                id="ex-n1"
                number="1."
                title="Módulo 1: Metodologia Ágil"
                level={1}
                isSelected={true}
                onActionClick={(type) => handleActionToast(type, 'ex-n1')}
              />
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', marginTop: '12px', margin: '12px 0 0 0' }}>
              Nível superior. A ação <em>"Subir na hierarquia"</em> (outdent) fica oculta pois o item já está na raiz.
            </p>
          </div>

          {/* Nível 02 */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B' }}>Nível 02 (Subtópico)</span>
              <code style={{ fontSize: '11px', color: '#0086FF', backgroundColor: '#F0F7FF', padding: '2px 6px', borderRadius: '4px' }}>
                Recuo: 16px
              </code>
            </div>
            <div style={{ backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '8px', border: '1px solid #E2E8F0' }}>
              <OutlineItem
                id="ex-n2"
                number="1.1."
                title="Framework Scrum"
                level={2}
                isSelected={true}
                onActionClick={(type) => handleActionToast(type, 'ex-n2')}
              />
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', marginTop: '12px', margin: '12px 0 0 0' }}>
              Primeiro grau de indentação. Exibe os 5 botões de ação contextuais.
            </p>
          </div>

          {/* Nível 03 */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B' }}>Nível 03 (Item Profundo)</span>
              <code style={{ fontSize: '11px', color: '#0086FF', backgroundColor: '#F0F7FF', padding: '2px 6px', borderRadius: '4px' }}>
                Recuo: 32px
              </code>
            </div>
            <div style={{ backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '8px', border: '1px solid #E2E8F0' }}>
              <OutlineItem
                id="ex-n3"
                number="1.2.1"
                title="Práticas e Políticas Explícitas"
                level={3}
                isSelected={true}
                onActionClick={(type) => handleActionToast(type, 'ex-n3')}
              />
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', marginTop: '12px', margin: '12px 0 0 0' }}>
              Subtópicos detalhados. Permite indentação com suporte a limites configuráveis (`maxLevel`).
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 3: AS 5 AÇÕES CONTEXTUAIS
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Grupo de Ações Contextuais (24x24px, 8px Radius)"
          description="Detalhamento funcional e ícones dos 5 botões de ação revelados quando o item é ativado ou está em foco."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {[
            {
              action: 'Mover item',
              icon: 'swap_vert',
              desc: 'Permite reordenar ou arrastar o item verticalmente para cima ou para baixo na lista.',
              rule: 'Presente em todos os níveis',
            },
            {
              action: 'Adicionar sub-item',
              icon: 'switch_access_shortcut_add',
              desc: 'Cria imediatamente um novo item filho aninhado logo abaixo do item selecionado.',
              rule: 'Presente em todos os níveis',
            },
            {
              action: 'Descer na hierarquia',
              icon: 'subdirectory_arrow_right',
              desc: 'Aumenta o nível de recuo em +1 (ex: Nível 1 ➔ Nível 2), tornando o item subordinado.',
              rule: 'Desativa quando atinge maxLevel',
            },
            {
              action: 'Subir na hierarquia',
              icon: 'subdirectory_arrow_left',
              desc: 'Diminui o nível de recuo em -1 (ex: Nível 2 ➔ Nível 1), promovendo o item na hierarquia.',
              rule: 'Oculto automaticamente no Nível 1',
            },
            {
              action: 'Excluir item',
              icon: 'delete',
              desc: 'Remove o item e seus eventuais sub-itens da estrutura da árvore de tópicos.',
              rule: 'Destaque hover na cor de perigo (#BF340F)',
            },
          ].map((act) => (
            <div
              key={act.action}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: '#F0F7FF',
                    color: '#0086FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span className="material-symbols-rounded" style={{ fontSize: '20px' }}>
                    {act.icon}
                  </span>
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B' }}>{act.action}</div>
                  <code style={{ fontSize: '11px', color: '#64748B' }}>{act.icon}</code>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: 1.4 }}>{act.desc}</p>
              <div style={{ fontSize: '11px', color: '#0086FF', fontWeight: 600, backgroundColor: '#F8FAFC', padding: '4px 8px', borderRadius: '4px' }}>
                {act.rule}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 4: SIMULADOR INTERATIVO COM TODAS AS PROPS
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <UnooriaDocSectionHeader
              title="Simulador Interativo Completo com Todas as Props"
              description="Teste auto-numeração, edição inline de títulos (duplo-clique), expansão/recolhimento de módulos e slots de prefixo/sufixo."
            />
          </div>
          <button
            onClick={handleAddModule}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#0086FF',
              color: '#FFFFFF',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0, 134, 255, 0.25)',
            }}
          >
            <span>+ Adicionar Módulo</span>
          </button>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ marginBottom: '12px', fontSize: '12px', color: '#64748B' }}>
            💡 <strong>Dicas interativas:</strong> Dê duplo clique em qualquer título para editar inline. Clique no chevron para expandir/recolher.
          </div>

          <Outline
            items={interactiveItems}
            selectedId={selectedId}
            autoNumber={true}
            editable={true}
            collapsible={true}
            onSelect={(id) => setSelectedId(id)}
            onTitleChange={handleTitleChange}
            onAddSubItem={handleAddSubItem}
            onDelete={handleDeleteItem}
          />
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 5: SUPORTE A TEMAS (LIGHT & DARK)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <UnooriaDocSectionHeader
            title="Suporte a Temas (Light & Dark Mode)"
            description="Alternância suave entre tema claro e escuro mantendo contraste ideal de texto (#FFFFFF no Dark Mode)."
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
            backgroundColor: activeTheme === 'dark' ? '#22272A' : '#FFFFFF',
            borderRadius: '16px',
            border: activeTheme === 'dark' ? '1px solid #383E41' : '1px solid #E2E8F0',
            padding: '32px',
            transition: 'all 0.2s ease',
          }}
        >
          <Outline theme={activeTheme} selectedId="dark-item-2">
            <Outline.Item
              id="dark-item-1"
              number="1."
              title="1. Módulo Inicial de Boas-Vindas"
              level={1}
              theme={activeTheme}
            />
            <Outline.Item
              id="dark-item-2"
              number="1.1"
              title="1.1 Configuração de Ambiente e Ferramentas"
              level={2}
              isSelected={true}
              theme={activeTheme}
            />
            <Outline.Item
              id="dark-item-3"
              number="2."
              title="2. Arquitetura de Componentes React"
              level={1}
              theme={activeTheme}
            />
          </Outline>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 6: BOAS PRÁTICAS DE USO
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Boas Práticas de Uso (DO & DON'T)"
          description="Recomendações essenciais para garantir clareza estrutural e excelente experiência de edição."
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
                <strong>Mantenha numeração consistente:</strong> Adote formatos estruturados como <code>1.</code>, <code>1.1</code>, <code>1.1.1</code> ou ative <code>autoNumber</code>.
              </li>
              <li>
                <strong>Oculte 'outdent' no nível raiz:</strong> Não permita que itens de nível 1 sejam outdentados além do topo da árvore.
              </li>
              <li>
                <strong>Revele ações contextuais no foco:</strong> Mantenha a interface limpa exibindo os botões de ação apenas no hover ou seleção do item.
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
                <strong>Não exceda 4 ou 5 níveis de profundidade:</strong> Níveis excessivos prejudicam a legibilidade em telas menores.
              </li>
              <li>
                <strong>Não utilize botões de ação sem tooltips explicativas:</strong> Usuários precisam de clareza imediata sobre a função de cada ícone.
              </li>
              <li>
                <strong>Não altere a altura padrão de 40px:</strong> Mantenha a consistência de ritmo vertical em todas as listas do sistema.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 7: REFERÊNCIA COMPLETA DE PROPS
          ========================================================================= */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="Referência Completa de Props da API"
          description="Especificação detalhada de todas as propriedades dos componentes Outline e Outline.Item."
        />

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Prop</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Tipo</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Padrão</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>items</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>OutlineItemData[]</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>[]</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Array de itens para renderização automática da árvore hierárquica.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>selectedId</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>string | null</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>null</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>ID do item atualmente selecionado / em edição ativa.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>autoNumber</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>boolean</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>false</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Calcula e exibe numeração hierárquica automática (1., 1.1, 1.1.1).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>editable</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>boolean</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>false</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Permite edição inline do título do item via duplo-clique ou tecla F2.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>collapsible</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>boolean</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>false</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Permite expandir e recolher galhos de tópicos com sub-itens.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>maxLevel</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>number</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>5</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Nível máximo de profundidade hierárquica permitido para indentação.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>prefix</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>React.ReactNode</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>undefined</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Slot customizado antes do número/título (ex: ícone de status, bullet).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>suffix</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>React.ReactNode</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>undefined</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Slot customizado após o título (ex: tag de tempo, badge).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>readOnly</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>boolean</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>false</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Se true, desativa a exibição do grupo de ações contextuais.</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>theme</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>'light' | 'dark'</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>'light'</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Tema visual aplicado para suporte claro e escuro.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof Outline> = {
  title: 'Plataforma Unooria/Componentes/Outline',
  component: Outline,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    autoNumber: {
      control: 'boolean',
      description: 'Calcula automaticamente a numeração hierárquica',
      defaultValue: false,
    },
    editable: {
      control: 'boolean',
      description: 'Permite edição inline do título (duplo clique)',
      defaultValue: true,
    },
    collapsible: {
      control: 'boolean',
      description: 'Permite expandir/recolher tópicos com sub-itens',
      defaultValue: true,
    },
    maxLevel: {
      control: 'number',
      description: 'Nível máximo de indentação permitido',
      defaultValue: 4,
    },
    readOnly: {
      control: 'boolean',
      description: 'Modo apenas leitura (oculta ações contextuais)',
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
    autoNumber: false,
    editable: true,
    collapsible: true,
    maxLevel: 4,
    readOnly: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Outline>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <OutlineDocumentationPage />,
};

/**
 * Playground interativo do componente Outline com 100% das props mapeadas nos controles do Storybook.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground Interativo',
  render: (args) => (
    <div
      style={{
        maxWidth: '680px',
        backgroundColor: args.theme === 'dark' ? '#22272A' : '#FFFFFF',
        padding: '28px',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
      }}
    >
      <Outline {...args} items={FIGMA_SAMPLE_ITEMS} defaultSelectedId="1-2" />
    </div>
  ),
};

/**
 * Réplica visual 1:1 dos frames oficiais do Figma (Placeholder Frame 24200:1439).
 */
export const ExemploOficialFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma (Placeholder)',
  render: () => (
    <div
      style={{
        maxWidth: '680px',
        backgroundColor: '#FFFFFF',
        padding: '28px',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
      }}
    >
      <div style={{ marginBottom: '16px', fontSize: '13px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
        Estrutura de Curso Completa (Figma 24200:1439)
      </div>
      <Outline items={FIGMA_SAMPLE_ITEMS} defaultSelectedId="8" />
    </div>
  ),
};

/**
 * Demonstração de Edição Inline de Título (Duplo clique ou F2).
 */
export const EdicaoInline: Story = {
  name: '✏️ Edição Inline de Título',
  render: () => {
    const [sampleItems, setSampleItems] = useState<OutlineItemData[]>([
      { id: 'edit-1', number: '1.', title: 'Clique duas vezes para editar este título', level: 1 },
      { id: 'edit-2', number: '1.1', title: 'Subtópico editável (pressione Enter para salvar)', level: 2 },
    ]);

    return (
      <div style={{ maxWidth: '640px', backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <div style={{ marginBottom: '12px', fontSize: '13px', color: '#0086FF', fontWeight: 600 }}>
          💡 Dê um duplo-clique no texto para renomear em tempo real.
        </div>
        <Outline
          items={sampleItems}
          editable={true}
          defaultSelectedId="edit-1"
          onTitleChange={(id, newTitle) => {
            setSampleItems((prev) =>
              prev.map((item) => (item.id === id ? { ...item, title: newTitle } : item))
            );
          }}
        />
      </div>
    );
  },
};

/**
 * Demonstração de Auto-Numeração Hierárquica (`autoNumber: true`).
 */
export const AutoNumeracaoHierarquica: Story = {
  name: '🔢 Auto-Numeração Hierárquica',
  render: () => (
    <div style={{ maxWidth: '640px', backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
      <Outline
        autoNumber={true}
        items={[
          {
            id: 'auto-1',
            title: 'Módulo Principal 1',
            children: [
              { id: 'auto-1-1', title: 'Primeira Aula' },
              { id: 'auto-1-2', title: 'Segunda Aula' },
            ],
          },
          {
            id: 'auto-2',
            title: 'Módulo Principal 2',
            children: [
              {
                id: 'auto-2-1',
                title: 'Tópico Introdutório',
                children: [{ id: 'auto-2-1-1', title: 'Prática de Laboratório' }],
              },
            ],
          },
        ]}
      />
    </div>
  ),
};

/**
 * Demonstração com Slots de Prefixo e Sufixo (Tags, Badges, Status).
 */
export const ComSlotsPrefixoESufixo: Story = {
  name: '🏷️ Slots de Prefixo e Sufixo',
  render: () => (
    <div style={{ maxWidth: '680px', backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
      <Outline defaultSelectedId="slot-2">
        <Outline.Item
          id="slot-1"
          number="1."
          title="Pesquisa e Descoberta"
          level={1}
          prefix={<span style={{ color: '#01B574', fontSize: '14px' }}>✓</span>}
          suffix={<span style={{ fontSize: '11px', backgroundColor: '#DCFCE7', color: '#166534', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>Concluído</span>}
        />
        <Outline.Item
          id="slot-2"
          number="1.1"
          title="Entrevistas em Profundidade"
          level={2}
          isSelected={true}
          prefix={<span style={{ color: '#0086FF', fontSize: '14px' }}>●</span>}
          suffix={<span style={{ fontSize: '11px', backgroundColor: '#EBF3FF', color: '#0086FF', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>Em Progresso (15 min)</span>}
        />
        <Outline.Item
          id="slot-3"
          number="2."
          title="Entrega Final e Handover"
          level={1}
          prefix={<span style={{ color: '#94A3B8', fontSize: '14px' }}>○</span>}
          suffix={<span style={{ fontSize: '11px', backgroundColor: '#F1F5F9', color: '#64748B', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>Pendente</span>}
        />
      </Outline>
    </div>
  ),
};
