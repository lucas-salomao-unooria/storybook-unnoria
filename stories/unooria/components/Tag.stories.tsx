import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tag } from '../../../src/unooria/components/Tag/Tag';
import { TagVariant } from '../../../src/unooria/components/Tag/Tag.types';
import '../../../src/unooria/tokens/icons.css';
import '../../../src/unooria/components/Tag/Tag.css';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

/**
 * Grupo de tags dinâmicas e removíveis
 */
const DismissibleTagsDemo: React.FC = () => {
  const [tags, setTags] = useState<Array<{ id: number; label: string; variant: TagVariant }>>([
    { id: 1, label: 'React.js', variant: 'info' },
    { id: 2, label: 'Design System', variant: 'brand' },
    { id: 3, label: 'Aprovado', variant: 'success' },
    { id: 4, label: 'Pendente', variant: 'warning' },
    { id: 5, label: 'Expirado', variant: 'danger' },
  ]);

  const handleDismiss = (id: number) => {
    setTags((prev) => prev.filter((t) => t.id !== id));
  };

  const handleReset = () => {
    setTags([
      { id: 1, label: 'React.js', variant: 'info' },
      { id: 2, label: 'Design System', variant: 'brand' },
      { id: 3, label: 'Aprovado', variant: 'success' },
      { id: 4, label: 'Pendente', variant: 'warning' },
      { id: 5, label: 'Expirado', variant: 'danger' },
    ]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        {tags.map((tag) => (
          <Tag
            key={tag.id}
            variant={tag.variant}
            dismissible
            onDismiss={() => handleDismiss(tag.id)}
          >
            {tag.label}
          </Tag>
        ))}
        {tags.length === 0 && (
          <span style={{ fontSize: '13px', color: '#64748B' }}>
            Todas as tags foram removidas.
          </span>
        )}
      </div>

      <div>
        <button
          onClick={handleReset}
          style={{
            padding: '6px 12px',
            fontSize: '12px',
            borderRadius: '6px',
            border: '1px solid #CBD5E1',
            backgroundColor: '#FFFFFF',
            cursor: 'pointer',
            fontWeight: 600,
            color: '#334155',
          }}
        >
          Restaurar Tags
        </button>
      </div>
    </div>
  );
};

/**
 * Grupo de filtros interativos com seleção
 */
const FilterGroupDemo: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['all']);

  const filters = [
    { id: 'all', label: 'Todos os Cursos (48)', variant: 'neutral' as TagVariant },
    { id: 'new', label: 'Novo (12)', variant: 'success' as TagVariant, leftIcon: 'sparkles' },
    { id: 'cert', label: 'Com Certificação (32)', variant: 'info' as TagVariant, leftIcon: 'verified' },
    { id: 'promo', label: 'Promoção (8)', variant: 'warning' as TagVariant, leftIcon: 'local_offer' },
    { id: 'out', label: 'Esgotado (4)', variant: 'danger' as TagVariant, leftIcon: 'block' },
  ];

  const handleToggle = (id: string) => {
    if (id === 'all') {
      setSelectedFilters(['all']);
      return;
    }

    const withoutAll = selectedFilters.filter((f) => f !== 'all');
    if (withoutAll.includes(id)) {
      const next = withoutAll.filter((f) => f !== id);
      setSelectedFilters(next.length === 0 ? ['all'] : next);
    } else {
      setSelectedFilters([...withoutAll, id]);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
      {filters.map((f) => {
        const isSelected = selectedFilters.includes(f.id);
        return (
          <Tag
            key={f.id}
            variant={f.variant}
            pill
            clickable
            selected={isSelected}
            leftIcon={f.leftIcon}
            onClick={() => handleToggle(f.id)}
            style={{
              boxShadow: isSelected ? '0 0 0 1px #0086FF' : undefined,
              fontWeight: isSelected ? 600 : 400,
            }}
          >
            {f.label}
          </Tag>
        );
      })}
    </div>
  );
};

/**
 * Página principal de documentação rica do componente Tag (Padrão Ouro)
 */
const TagDocumentationPage: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Feedback & Categorização"
        title="Tag"
        description="As tags são elementos visuais compactos que servem para categorizar e identificar informações em uma interface, destacando atributos específicos como status, categorias ou filtros com contraste e tipografia nítidos."
      />

      {/* =========================================================================
          SEÇÃO 1: ESPECIFICAÇÃO VISUAL FIEL DO FIGMA (Node 6029:1817)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#22272A', margin: '0 0 4px 0' }}>
              Especificação Visual Figma (Node 6029:1817)
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
              Design, proporções e matriz cromática exatos conforme especificados na prancha oficial do Figma.
            </p>
          </div>
          <a
            href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=6029-1817&m=dev"
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

        {/* CONTAINER DO FIGMA */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '48px',
            border: '1px solid #E4E8E9',
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          }}
        >
          {/* Header do Frame Figma */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '18px', color: '#475157', fontWeight: 400 }}>Components</span>
            <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#22272A', margin: '0 0 16px 0', lineHeight: 1.2 }}>
              Tag
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#475157', lineHeight: 1.6 }}>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#22272A' }}>O que são:</strong> As tags são elementos visuais que servem para categorizar e
                identificar informações em uma interface. Elas são úteis para destacar atributos específicos, como status, categorias ou
                filtros, ajudando o usuário a localizar rapidamente informações relevantes.
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#22272A' }}>Exemplo visual:</strong> Em uma plataforma de cursos online, um curso pode exibir
                tags como &quot;Novo&quot;, &quot;Certificação&quot; ou &quot;Esgotado&quot; abaixo do título. A tag &quot;Novo&quot; pode ser verde, indicando que o curso foi
                recentemente adicionado, enquanto &quot;Certificação&quot; pode ser azul e &quot;Esgotado&quot; vermelha, com bordas arredondadas para suavizar a
                aparência.
              </p>
            </div>
          </div>

          {/* Matriz de Variantes do Component Set Figma (Node 6029:1994) */}
          <div style={{ borderTop: '1px solid #E4E8E9', paddingTop: '28px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#7C8E94', textTransform: 'uppercase', marginBottom: '16px', display: 'block' }}>
              Catálogo de Variantes do Component Set Figma (`Tag`)
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {/* Success */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#01B574' }}>1. Success (Sucesso / Novo)</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Tag variant="success" leftIcon="add" rightIcon="add">Text Content</Tag>
                  <Tag variant="success" leftIcon="add" rightIcon="add" className="unooria-tag--hover">Hover (20%)</Tag>
                </div>
              </div>

              {/* Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#0086FF' }}>2. Info (Informação / Certificação)</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Tag variant="info" leftIcon="add" rightIcon="add">Text Content</Tag>
                  <Tag variant="info" leftIcon="add" rightIcon="add" className="unooria-tag--hover">Hover (20%)</Tag>
                </div>
              </div>

              {/* Warning */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#F97607' }}>3. Warning (Atenção / Promoção)</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Tag variant="warning" leftIcon="add" rightIcon="add">Text Content</Tag>
                  <Tag variant="warning" leftIcon="add" rightIcon="add" className="unooria-tag--hover">Hover (20%)</Tag>
                </div>
              </div>

              {/* Danger */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#E31A1A' }}>4. Danger (Erro / Esgotado)</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Tag variant="danger" leftIcon="add" rightIcon="add">Text Content</Tag>
                  <Tag variant="danger" leftIcon="add" rightIcon="add" className="unooria-tag--hover">Hover (20%)</Tag>
                </div>
              </div>

              {/* Neutral */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#475157' }}>5. Neutral (Padrão)</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Tag variant="neutral" leftIcon="add" rightIcon="add">Text Content</Tag>
                  <Tag variant="neutral" leftIcon="add" rightIcon="add" className="unooria-tag--hover">Hover (10%)</Tag>
                </div>
              </div>

              {/* Outline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#475157' }}>6. Outline (Contorno)</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Tag variant="outline" leftIcon="add" rightIcon="add">Text Content</Tag>
                  <Tag variant="outline" leftIcon="add" rightIcon="add" className="unooria-tag--hover">Hover (5%)</Tag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 2: ANATOMIA E TABELA DE TOKENS OFICIAIS
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Anatomia & Tokens Oficiais"
          description="Tokens oficiais do Design System Unooria com integração nativa ao arquivo colors.css."
        />

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E4E8E9', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E4E8E9' }}>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Propriedade</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Valor Figma</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Token Oficial</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Variável CSS</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Altura do Componente</td>
                <td style={{ padding: '12px 18px' }}>28px</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>Fixed md height</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>height: 28px;</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Padding Vertical / Horizontal</td>
                <td style={{ padding: '12px 18px' }}>4px / 8px</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>spacing-xxxs / spacing-xxs</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>--unooria-spacing-xxxs / --unooria-spacing-xxs</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Raio de Borda (Radius)</td>
                <td style={{ padding: '12px 18px' }}>8px (Pill: 1000px)</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>radius-s / radius-full</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>--unooria-radius-s: 8px;</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Tipografia</td>
                <td style={{ padding: '12px 18px' }}>Open Sans 400 (14px/20px)</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>font-sans</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>--unooria-font-sans: &apos;Open Sans&apos;, sans-serif;</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Texto Tinted</td>
                <td style={{ padding: '12px 18px' }}>#383E41</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>neutral[900]</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>--unooria-color-neutral-900</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Dimensões do Ícone</td>
                <td style={{ padding: '12px 18px' }}>16x16px</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>icon-size-xs</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>width: 16px; height: 16px;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 3: TAGS COM BOTÃO DE REMOÇÃO & GRUPO DE FILTROS
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Tags Interativas & Grupo de Filtros"
          description="Exemplos com botão de fechar/dismiss e filtros clicáveis com seleção ativa."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E4E8E9' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: 700, color: '#22272A' }}>
              Tags Removíveis (Dismissible)
            </h4>
            <DismissibleTagsDemo />
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E4E8E9' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: 700, color: '#22272A' }}>
              Grupo de Filtros de Cursos
            </h4>
            <FilterGroupDemo />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 4: SUPORTE A TEMAS (LIGHT & DARK)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <UnooriaDocSectionHeader
            title="Suporte a Temas (Light & Dark Mode)"
            description="Contraste adaptativo transparente no fundo escuro (#22272A) e claro (#FFFFFF)."
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
            backgroundColor: activeTheme === 'dark' ? '#181C1E' : '#F8FAFC',
            borderRadius: '16px',
            border: activeTheme === 'dark' ? '1px solid #383E41' : '1px solid #E4E8E9',
            padding: '24px',
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            transition: 'all 0.2s ease',
          }}
        >
          <Tag theme={activeTheme} variant="success" leftIcon="check_circle">
            Concluído
          </Tag>
          <Tag theme={activeTheme} variant="info" leftIcon="info">
            Em Revisão
          </Tag>
          <Tag theme={activeTheme} variant="warning" leftIcon="warning">
            Atenção
          </Tag>
          <Tag theme={activeTheme} variant="danger" leftIcon="error">
            Crítico
          </Tag>
          <Tag theme={activeTheme} variant="neutral">
            Geral
          </Tag>
          <Tag theme={activeTheme} variant="outline">
            Rascunho
          </Tag>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 5: BOAS PRÁTICAS DE USO (DO & DON'T)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Boas Práticas de Uso (DO & DON'T)"
          description="Diretrizes para rotulagem clara e concisa em componentes de tag."
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
                <strong>Use rótulos curtos e objetivos:</strong> Palavras únicas ou termos compostos de 2 palavras (ex: &quot;Em Aberto&quot;).
              </li>
              <li>
                <strong>Mantenha consistência de cores semânticas:</strong> Verde sempre para sucesso/ativo, vermelho para erros.
              </li>
              <li>
                <strong>Use botão dismiss quando o usuário puder desmarcar o filtro:</strong> Facilita a remoção com um clique.
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
              <span>✕</span> O QUE EVITAR (DON&apos;T)
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#991B1B', fontSize: '14px', lineHeight: 1.6 }}>
              <li>
                <strong>Não use tags para textos longos:</strong> Elas são para metadados curtos e palavras-chave.
              </li>
              <li>
                <strong>Não confunda Tag com Botão de Ação Primária:</strong> Tags têm menor peso visual que botões principais.
              </li>
              <li>
                <strong>Não sobrecarregue a tela com mais de 5 cores diferentes no mesmo card:</strong> Pode gerar confusão cognitiva.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 6: REFERÊNCIA DE PROPS
          ========================================================================= */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="Referência Completa de Props da API"
          description="Todas as propriedades suportadas pelo componente Tag."
        />

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E4E8E9', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E4E8E9' }}>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Prop</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Tipo</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Padrão</th>
                <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>variant</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>&apos;success&apos; | &apos;info&apos; | &apos;warning&apos; | &apos;danger&apos; | &apos;neutral&apos; | &apos;brand&apos; | &apos;outline&apos;</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>&apos;neutral&apos;</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Variante cromática / severidade da tag.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>size</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>&apos;md&apos;</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Tamanho visual (md = 28px do Figma).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>pill</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>boolean</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>false</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Aplica formato de pílula arredondada (1000px).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>leftIcon</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>string | ReactNode</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>undefined</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Ícone de 16x16px exibido à esquerda.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>dismissible</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>boolean</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>false</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Exibe botão de remoção &apos;x&apos; à direita.</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>theme</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>&apos;light&apos; | &apos;dark&apos;</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>&apos;light&apos;</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Tema visual de contraste.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof Tag> = {
  title: 'Plataforma Unooria/Componentes/Tag',
  component: Tag,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'info', 'warning', 'danger', 'neutral', 'brand', 'outline'],
      description: 'Variante cromática da tag',
      defaultValue: 'neutral',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho visual',
      defaultValue: 'md',
    },
    pill: {
      control: 'boolean',
      description: 'Formato de pílula arredondada',
      defaultValue: false,
    },
    dismissible: {
      control: 'boolean',
      description: 'Botão de fechar/remover',
      defaultValue: false,
    },
    leftIcon: {
      control: 'text',
      description: 'Nome do ícone à esquerda',
    },
    rightIcon: {
      control: 'text',
      description: 'Nome do ícone à direita',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilitado',
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
    variant: 'neutral',
    size: 'md',
    pill: false,
    dismissible: false,
    disabled: false,
    theme: 'light',
    children: 'Text Content',
  },
};

export default meta;

type Story = StoryObj<typeof Tag>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TagDocumentationPage />,
};

/**
 * Playground interativo com 100% das props mapeadas em controles.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground Interativo',
  render: (args) => <Tag {...args}>{args.children || 'Text Content'}</Tag>,
};

/**
 * Réplica visual 1:1 dos frames oficiais do Figma (Node 6029:1817).
 */
export const ExemploOficialFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma (Node 6029:1817)',
  render: () => (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        padding: '48px',
        border: '1px solid #E4E8E9',
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
        maxWidth: '820px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '24px' }}>
        <span style={{ fontSize: '18px', color: '#475157' }}>Components</span>
        <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#22272A', margin: '0 0 12px 0', lineHeight: 1.2 }}>
          Tag
        </h1>
        <p style={{ margin: 0, fontSize: '13px', color: '#475157', lineHeight: 1.6 }}>
          As tags são elementos visuais que servem para categorizar e identificar informações em uma interface.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Tag variant="success" leftIcon="add" rightIcon="add">Text Content</Tag>
        <Tag variant="info" leftIcon="add" rightIcon="add">Text Content</Tag>
        <Tag variant="warning" leftIcon="add" rightIcon="add">Text Content</Tag>
        <Tag variant="danger" leftIcon="add" rightIcon="add">Text Content</Tag>
        <Tag variant="neutral" leftIcon="add" rightIcon="add">Text Content</Tag>
        <Tag variant="outline" leftIcon="add" rightIcon="add">Text Content</Tag>
      </div>
    </div>
  ),
};

/**
 * Matriz de Todas as Variantes e Severidades
 */
export const TodasAsVariantesESeveridades: Story = {
  name: 'Todas as Variantes e Severidades',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#64748B' }}>
          Formato Padrão Retangular (Radius 8px)
        </h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Tag variant="success">Novo</Tag>
          <Tag variant="info">Certificação</Tag>
          <Tag variant="warning">Em Andamento</Tag>
          <Tag variant="danger">Esgotado</Tag>
          <Tag variant="brand">Plataforma</Tag>
          <Tag variant="neutral">Geral</Tag>
          <Tag variant="outline">Rascunho</Tag>
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600, color: '#64748B' }}>
          Formato Pílula (Radius 1000px)
        </h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Tag variant="success" pill>Novo</Tag>
          <Tag variant="info" pill>Certificação</Tag>
          <Tag variant="warning" pill>Em Andamento</Tag>
          <Tag variant="danger" pill>Esgotado</Tag>
          <Tag variant="brand" pill>Plataforma</Tag>
          <Tag variant="neutral" pill>Geral</Tag>
          <Tag variant="outline" pill>Rascunho</Tag>
        </div>
      </div>
    </div>
  ),
};

/**
 * Tags com Ícones e Botão de Remoção
 */
export const TagsComIconesERemocao: Story = {
  name: 'Tags com Ícones e Remoção',
  render: () => <DismissibleTagsDemo />,
};

/**
 * Grupo de Filtros Interativos
 */
export const GrupoDeFiltrosInterativos: Story = {
  name: 'Grupo de Filtros Interativos',
  render: () => <FilterGroupDemo />,
};
