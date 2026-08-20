import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Table } from '../../../src/unooria/components/Table/Table';
import { TableColumn } from '../../../src/unooria/components/Table/Table.types';
import { TableDropdownMenu } from '../../../src/unooria/components/Table/TableDropdownMenu';
import '../../../src/unooria/tokens/icons.css';
import '../../../src/unooria/components/Table/Table.css';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

interface FornecedorData {
  id: string;
  name: string;
  category: string;
  status: 'Ativo' | 'Pendente' | 'Inativo' | 'Homologado';
  progressLinear: number;
  progressCircle: number;
  verified: boolean;
  coursesCount: number;
}

const FORNECEDORES_MOCK: FornecedorData[] = [
  {
    id: 'FORN-001',
    name: 'TechEdu Soluções Digitais',
    category: 'Desenvolvimento Web',
    status: 'Homologado',
    progressLinear: 95,
    progressCircle: 95,
    verified: true,
    coursesCount: 24,
  },
  {
    id: 'FORN-002',
    name: 'InovaLearn Treinamentos',
    category: 'UX / UI Design',
    status: 'Ativo',
    progressLinear: 78,
    progressCircle: 78,
    verified: true,
    coursesCount: 16,
  },
  {
    id: 'FORN-003',
    name: 'DataMinds Analytics Corp',
    category: 'Ciência de Dados & IA',
    status: 'Pendente',
    progressLinear: 42,
    progressCircle: 42,
    verified: false,
    coursesCount: 8,
  },
  {
    id: 'FORN-004',
    name: 'CloudScale Infraestrutura',
    category: 'DevOps & Nuvem',
    status: 'Ativo',
    progressLinear: 88,
    progressCircle: 88,
    verified: true,
    coursesCount: 19,
  },
  {
    id: 'FORN-005',
    name: 'CyberShield Segurança',
    category: 'Cibersegurança',
    status: 'Inativo',
    progressLinear: 20,
    progressCircle: 20,
    verified: false,
    coursesCount: 4,
  },
];

/**
 * Demonstração completa da Tela Oficial de Exemplo (Node 19689:3273)
 */
const ScreenExampleDemo: React.FC = () => {
  const [data, setData] = useState<FornecedorData[]>(FORNECEDORES_MOCK);
  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>(['FORN-001']);
  const [sortCol, setSortCol] = useState<string>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string, dir: 'asc' | 'desc') => {
    setSortCol(key);
    setSortDir(dir);
    const sorted = [...data].sort((a, b) => {
      const valA = a[key as keyof FornecedorData];
      const valB = b[key as keyof FornecedorData];
      if (typeof valA === 'string') {
        return dir === 'asc' ? valA.localeCompare(String(valB)) : String(valB).localeCompare(valA);
      }
      return dir === 'asc' ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
    });
    setData(sorted);
  };

  const columns: TableColumn<FornecedorData>[] = [
    {
      key: 'name',
      title: 'Fornecedor / Categoria',
      sortable: true,
      render: (_, record) => (
        <div className="unooria-table-cell__text-group">
          <span className="unooria-table-cell__text-primary">{record.name}</span>
          <span className="unooria-table-cell__text-secondary">{record.category}</span>
        </div>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      align: 'center',
      render: (valor) => {
        const status = valor as FornecedorData['status'];
        const variantClass =
          status === 'Homologado' || status === 'Ativo'
            ? 'unooria-table-cell__tag--success'
            : status === 'Pendente'
            ? 'unooria-table-cell__tag--warning'
            : 'unooria-table-cell__tag--danger';
        return <span className={`unooria-table-cell__tag ${variantClass}`}>{status}</span>;
      },
    },
    {
      key: 'progressLinear',
      title: 'Progresso da Homologação',
      render: (valor) => {
        const progress = valor as number;
        return (
        <div className="unooria-table-cell__progress-linear">
          <div className="unooria-table-cell__progress-track">
            <div
              className="unooria-table-cell__progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="unooria-table-cell__progress-label">{progress}%</span>
        </div>
        );
      },
    },
    {
      key: 'progressCircle',
      title: 'DataViz Ring',
      align: 'center',
      render: (valor) => {
        const prog = valor as number;
        return (
        <div className="unooria-table-cell__progress-circle">
          <svg width="28" height="28" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#E4E8E9"
              strokeWidth="3.5"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#7FA5E2"
              strokeWidth="3.5"
              strokeDasharray={`${prog}, 100`}
            />
          </svg>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#383E41' }}>{prog}%</span>
        </div>
        );
      },
    },
    {
      key: 'verified',
      title: 'Ativo',
      align: 'center',
      render: (valor, record) => {
        const verified = valor as boolean;
        return (
        <input
          type="checkbox"
          checked={verified}
          onChange={(e) => {
            e.stopPropagation();
            setData((prev) =>
              prev.map((item) =>
                item.id === record.id ? { ...item, verified: !item.verified } : item
              )
            );
          }}
          style={{ cursor: 'pointer', accentColor: '#0086FF', width: '16px', height: '16px' }}
        />
        );
      },
    },
    {
      key: 'actions',
      title: 'Ações',
      align: 'center',
      render: (_, record) => (
        <TableDropdownMenu
          actions={[
            {
              key: 'view',
              label: 'Visualizar Cadastro',
              icon: 'visibility',
              onClick: () => alert(`Visualizando: ${record.name}`),
            },
            {
              key: 'edit',
              label: 'Editar Dados',
              icon: 'edit',
              onClick: () => alert(`Editando: ${record.name}`),
            },
            {
              key: 'delete',
              label: 'Excluir Fornecedor',
              icon: 'delete',
              danger: true,
              onClick: () => alert(`Excluindo: ${record.name}`),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>
          {selectedKeys.length} fornecedor(es) selecionado(s) de {data.length}
        </span>
      </div>

      <Table
        columns={columns}
        data={data}
        keyExtractor={(item) => item.id}
        selectable
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => setSelectedKeys(keys)}
        sortColumn={sortCol}
        sortDirection={sortDir}
        onSortChange={handleSort}
      />
    </div>
  );
};

/**
 * Página principal de documentação rica do componente Table (Padrão Ouro)
 */
const TableDocumentationPage: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Dados & Estrutura"
        title="Table"
        description="A Tabela organiza dados estruturados em linhas e colunas, com suporte a intercalação de linhas (zebra striping), 11 variantes de células, menu dropdown de ações contextuais, ordenação e seleção múltipla."
      />

      {/* =========================================================================
          SEÇÃO 1: ESPECIFICAÇÃO VISUAL FIEL DO FIGMA (Node 19493:47329)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#22272A', margin: '0 0 4px 0' }}>
              Especificação Visual Figma (Node 19493:47329)
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
              Regras visuais oficiais de cabeçalho, zebra striping e altura padrão de linha (50px).
            </p>
          </div>
          <a
            href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=19493-47329&m=dev"
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
              Table
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#475157', lineHeight: 1.6 }}>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#22272A' }}>Estrutura de Linhas:</strong> A Tabela segue um padrão visual pensado para
                facilitar a leitura e manter a organização dos dados.
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#22272A' }}>Linha de Título:</strong> A primeira linha é reservada exclusivamente para o
                título, sem aplicação de background, garantindo foco total na hierarquia da informação.
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#22272A' }}>Linhas de Conteúdo & Zebra Striping:</strong> As demais linhas apresentam o
                conteúdo e utilizam intercalação de background (zebra striping), criando um fluxo visual mais confortável e ajudando na
                identificação rápida de cada linha.
              </p>
            </div>
          </div>

          {/* Demonstração das 4 variantes de linha */}
          <div style={{ borderTop: '1px solid #E4E8E9', paddingTop: '28px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#7C8E94', textTransform: 'uppercase', marginBottom: '16px', display: 'block' }}>
              Estados de Linhas do Component Set `Linha` (Node 19493:47334)
            </span>
            <div className="unooria-table-container">
              <table className="unooria-table">
                <thead className="unooria-table__header">
                  <tr>
                    <th className="unooria-table__head-cell">Estado da Linha</th>
                    <th className="unooria-table__head-cell">Aplicação de Background</th>
                    <th className="unooria-table__head-cell">Altura Padrão</th>
                    <th className="unooria-table__head-cell">Divisor Inferior</th>
                  </tr>
                </thead>
                <tbody className="unooria-table__body">
                  <tr className="unooria-table__row unooria-table__row--default">
                    <td className="unooria-table__cell"><strong>Default (Par)</strong></td>
                    <td className="unooria-table__cell">Transparente</td>
                    <td className="unooria-table__cell">50px (md)</td>
                    <td className="unooria-table__cell">1px solid #E4E8E9</td>
                  </tr>
                  <tr className="unooria-table__row unooria-table__row--secondary">
                    <td className="unooria-table__cell"><strong>Secondary / Zebra (Ímpar)</strong></td>
                    <td className="unooria-table__cell">rgba(34, 39, 42, 0.02)</td>
                    <td className="unooria-table__cell">50px (md)</td>
                    <td className="unooria-table__cell">1px solid #E4E8E9</td>
                  </tr>
                  <tr className="unooria-table__row unooria-table__row--selected">
                    <td className="unooria-table__cell"><strong>Selected (Selecionado)</strong></td>
                    <td className="unooria-table__cell">rgba(127, 165, 226, 0.10)</td>
                    <td className="unooria-table__cell">50px (md)</td>
                    <td className="unooria-table__cell">1px solid #E4E8E9</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 2: TELA COMPLETA DE EXEMPLO OFICIAL (Node 19689:3273)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Exemplo de Tela Real (Node 19689:3273 - Cadastro de Fornecedor)"
          description="Tabela completa com ordenação, seleção por checkbox, status tags, progress linear e menu dropdown."
        />

        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E4E8E9', padding: '24px' }}>
          <ScreenExampleDemo />
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 3: AS 11 VARIANTES DE CÉLULAS DO FIGMA
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Catálogo das 11 Variantes de Células (Node 19493:47348)"
          description="Cada variante foi construída para atender a um tipo específico de conteúdo em dashboards e tabelas de gestão."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {[
            { name: '1. Text (Primary & Secondary)', desc: 'Título em negrito 14px com subtítulo descritivo em 12px.' },
            { name: '2. Tag / Badge Status', desc: 'Pílula de status em verde (sucesso), laranja (aviso) ou vermelho (erro).' },
            { name: '3. Icon + Avatar', desc: 'Avatar circular do usuário com iniciais ou foto de perfil.' },
            { name: '4. Checkbox / Radio', desc: 'Controle de seleção individual ou múltipla de linhas.' },
            { name: '5. Progress Bar Linear', desc: 'Barra horizontal de progresso com porcentagem ao lado.' },
            { name: '6. Progress Circle', desc: 'Anel circular do DataViz com percentual numérico central.' },
            { name: '7. Action Icon', desc: 'Botão de ação rápida com ícone do Material Symbols.' },
            { name: '8. Switch Toggle', desc: 'Interruptor toggle de ativar/desativar status.' },
            { name: '9. Dropdown (More Vert)', desc: 'Menu contextual flutuante com múltiplas ações (Editar/Excluir).' },
            { name: '10. Image Thumbnail', desc: 'Miniatura de imagem quadrada com raio de 8px.' },
            { name: '11. Slot Customizado', desc: 'Espaço livre para renderização de qualquer componente React.' },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E4E8E9',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#0086FF' }}>{item.name}</span>
              <span style={{ fontSize: '13px', color: '#475157' }}>{item.desc}</span>
            </div>
          ))}
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
            transition: 'all 0.2s ease',
          }}
        >
          <Table
            theme={activeTheme}
            columns={[
              { key: 'item', title: 'Item / Código' },
              { key: 'cat', title: 'Categoria' },
              { key: 'status', title: 'Status' },
            ]}
            data={[
              { item: 'Produto Alpha', cat: 'Software', status: 'Ativo' },
              { item: 'Produto Beta', cat: 'Hardware', status: 'Em Análise' },
              { item: 'Produto Gama', cat: 'Serviços', status: 'Concluído' },
            ]}
          />
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 5: BOAS PRÁTICAS DE USO (DO & DON'T)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Boas Práticas de Uso (DO & DON'T)"
          description="Diretrizes para manter tabelas legíveis e eficientes em telas de dados."
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
                <strong>Use zebra striping em tabelas com mais de 5 colunas:</strong> Ajuda a guiar o olhar horizontalmente.
              </li>
              <li>
                <strong>Alinhe números à direita ou centro:</strong> Facilita a comparação visual de grandezas.
              </li>
              <li>
                <strong>Agrupe ações em um menu dropdown (`more_vert`):</strong> Evita poluição visual com excesso de botões na linha.
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
                <strong>Não aplique backgrounds pesados no cabeçalho:</strong> Mantenha o cabeçalho limpo para destacar os dados.
              </li>
              <li>
                <strong>Não use mais de 8 colunas sem scroll horizontal:</strong> Use o componente `ScrollBar` para rolagem suave.
              </li>
              <li>
                <strong>Não oculte o indicador de ordenação ativa:</strong> Mostre a seta indicadora da direção atual da ordenação.
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
          description="Todas as propriedades suportadas pelo componente Table."
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
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>columns</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>TableColumn[]</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>[]</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Definição das colunas da tabela.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>data</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>any[]</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>[]</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Array de dados das linhas.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>zebra</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>boolean</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>true</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Intercalação de background nas linhas.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>selectable</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>boolean</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>false</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Exibe checkboxes para seleção múltipla de linhas.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>size</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>&apos;md&apos;</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Altura das linhas (md = 50px do Figma).</td>
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

const meta: Meta<typeof Table> = {
  title: 'Plataforma Unooria/Componentes/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    zebra: {
      control: 'boolean',
      description: 'Zebra striping intercalado',
      defaultValue: true,
    },
    selectable: {
      control: 'boolean',
      description: 'Seleção por checkbox',
      defaultValue: true,
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Altura das linhas',
      defaultValue: 'md',
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Tema visual',
      defaultValue: 'light',
    },
  },
  args: {
    zebra: true,
    selectable: true,
    size: 'md',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Table>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TableDocumentationPage />,
};

/**
 * Playground interativo com 100% das props mapeadas em controles.
 */
interface PlaygroundRow {
  id: string;
  name: string;
  category: string;
  status: string;
}

export const Playground: Story = {
  name: '🕹️ 1. Playground Interativo',
  render: (args) => {
    const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([]);

    const columns: TableColumn<PlaygroundRow>[] = [
      { key: 'name', title: 'Aluno / Curso', sortable: true },
      { key: 'category', title: 'Trilha' },
      { key: 'status', title: 'Situação', align: 'center' },
    ];

    const data = [
      { id: '1', name: 'Ana Beatriz', category: 'Front-end React', status: 'Ativo' },
      { id: '2', name: 'Carlos Eduardo', category: 'UX Research', status: 'Concluído' },
      { id: '3', name: 'Mariana Costa', category: 'Data Science', status: 'Em Andamento' },
    ];

    return (
      <div
        style={{
          padding: '24px',
          backgroundColor: args.theme === 'dark' ? '#181C1E' : '#FFFFFF',
          borderRadius: '16px',
        }}
      >
        <Table
          {...args}
          columns={columns}
          data={data}
          selectedKeys={selectedKeys}
          onSelectionChange={(keys) => setSelectedKeys(keys)}
        />
      </div>
    );
  },
};

/**
 * Réplica visual 1:1 dos frames oficiais do Figma (Node 19493:47329).
 */
export const ExemploOficialFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma (Node 19493:47329)',
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
          Table
        </h1>
        <p style={{ margin: 0, fontSize: '13px', color: '#475157', lineHeight: 1.6 }}>
          A primeira linha é reservada exclusivamente para o título. As demais linhas utilizam intercalação de background (zebra striping).
        </p>
      </div>

      <Table
        columns={[
          { key: 'col1', title: 'Título da Coluna 1' },
          { key: 'col2', title: 'Título da Coluna 2' },
          { key: 'col3', title: 'Título da Coluna 3', align: 'center' },
        ]}
        data={[
          { col1: 'Linha 1 (Default)', col2: 'Conteúdo Par', col3: 'Ativo' },
          { col1: 'Linha 2 (Secondary)', col2: 'Conteúdo Ímpar com Zebra', col3: 'Ativo' },
          { col1: 'Linha 3 (Default)', col2: 'Conteúdo Par', col3: 'Ativo' },
        ]}
      />
    </div>
  ),
};

/**
 * Tela Completa de Exemplo Oficial (Node 19689:3273 - Cadastro de Fornecedor).
 */
export const TelaCompletaDeExemplo: Story = {
  name: 'Tela Completa de Exemplo (Node 19689:3273)',
  render: () => <ScreenExampleDemo />,
};
