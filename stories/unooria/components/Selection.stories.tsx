import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Selection,
  SelectionOptionItem,
  SelectionSize,
  SelectionState,
} from '../../../src/unooria/components/Selection';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

/* ==========================================================================
   Conteúdo de demonstração
   O arquivo de origem descreve o caso de uso canônico: escolher o país de
   origem em um formulário de cadastro.
   ========================================================================== */

const PAISES: SelectionOptionItem[] = [
  { value: 'br', label: 'Brasil' },
  { value: 'pt', label: 'Portugal' },
  { value: 'ao', label: 'Angola' },
  { value: 'mz', label: 'Moçambique' },
  { value: 'cv', label: 'Cabo Verde' },
  { value: 'gw', label: 'Guiné-Bissau', disabled: true },
  { value: 'st', label: 'São Tomé e Príncipe' },
  { value: 'tl', label: 'Timor-Leste' },
];

const OPCOES_FIGMA: SelectionOptionItem[] = Array.from({ length: 5 }, (_, indice) => ({
  value: `opcao-${indice + 1}`,
  label: 'Input Label',
}));

const TAMANHOS: { size: SelectionSize; rotulo: string; gatilho: string; raio: string }[] = [
  { size: 'lg', rotulo: 'LG', gatilho: '56px', raio: '16px' },
  { size: 'md', rotulo: 'MD', gatilho: '48px', raio: '12px' },
  { size: 'sm', rotulo: 'SM', gatilho: '40px', raio: '8px' },
  { size: 'xs', rotulo: 'XS', gatilho: '32px', raio: '8px' },
];

const ESTADOS: { state: SelectionState; rotulo: string }[] = [
  { state: 'default', rotulo: 'Default' },
  { state: 'active', rotulo: 'Active' },
  { state: 'disabled', rotulo: 'Disabled' },
  { state: 'error', rotulo: 'Error' },
];

/* ==========================================================================
   Utilitários locais de documentação (restritos a stories/)
   ========================================================================== */

const DocCard: React.FC<{
  titulo: string;
  glifo: string;
  children: React.ReactNode;
}> = ({ titulo, glifo, children }) => (
  <div
    style={{
      backgroundColor: '#FFFFFF',
      border: '1px solid #E4E8E9',
      borderRadius: '16px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}
  >
    <span style={{ fontSize: '24px', lineHeight: 1 }} aria-hidden="true">
      {glifo}
    </span>
    <strong style={{ fontSize: '15px', color: '#22272A' }}>{titulo}</strong>
    <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.6, color: '#475157' }}>{children}</p>
  </div>
);

const DocGrid: React.FC<{ min?: string; children: React.ReactNode }> = ({
  min = '260px',
  children,
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(${min}, 1fr))`,
      gap: '20px',
      alignItems: 'start',
    }}
  >
    {children}
  </div>
);

const DocStage: React.FC<{
  rotulo?: string;
  escuro?: boolean;
  children: React.ReactNode;
}> = ({ rotulo, escuro = false, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    {rotulo && (
      <span
        style={{
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.4px',
          textTransform: 'uppercase',
          color: escuro ? '#A7B5B9' : '#64748B',
        }}
      >
        {rotulo}
      </span>
    )}
    <div
      style={{
        backgroundColor: escuro ? '#181C1E' : '#F8FAFC',
        border: `1px solid ${escuro ? '#383E41' : '#E4E8E9'}`,
        borderRadius: '16px',
        padding: '24px',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  </div>
);

interface LinhaProp {
  prop: string;
  tipo: string;
  padrao: string;
  descricao: React.ReactNode;
}

const DocPropsTable: React.FC<{ titulo: string; linhas: LinhaProp[] }> = ({ titulo, linhas }) => (
  <div style={{ marginBottom: '28px' }}>
    <h3
      style={{
        fontSize: '15px',
        fontWeight: 700,
        color: '#22272A',
        margin: '0 0 10px 0',
        fontFamily: 'monospace',
      }}
    >
      {titulo}
    </h3>
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E4E8E9',
        overflowX: 'auto',
      }}
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'left',
          fontSize: '13px',
          minWidth: '720px',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E4E8E9' }}>
            <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Prop</th>
            <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Tipo</th>
            <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Padrão</th>
            <th style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha) => (
            <tr key={linha.prop} style={{ borderBottom: '1px solid #F1F5F9' }}>
              <td
                style={{
                  padding: '12px 18px',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  color: '#0086FF',
                  whiteSpace: 'nowrap',
                }}
              >
                {linha.prop}
              </td>
              <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>
                {linha.tipo}
              </td>
              <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>{linha.padrao}</td>
              <td style={{ padding: '12px 18px', color: '#334155', lineHeight: 1.6 }}>
                {linha.descricao}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* ==========================================================================
   Página de Documentação Rica
   ========================================================================== */

const SelectionDocumentationPage: React.FC = () => {
  const [tema, setTema] = useState<'light' | 'dark'>('light');

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Formulários & Seleção"
        title="Selection"
        description="O Selection é a lista suspensa da Plataforma Unooria: um gatilho compacto que revela um painel de opções, simplificando a escolha em cenários com muitas alternativas sem consumir espaço permanente na tela. Reconstruído nó a nó a partir dos quatro conjuntos publicados na prancha Select do arquivo Unooria_DS_v0.2."
      />

      {/* =====================================================================
          SEÇÃO 1: VISÃO GERAL & CASOS DE USO
          ===================================================================== */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Visão Geral & Casos de Uso"
          description="Quando escolher o Selection em vez de outro controle de escolha do Design System."
        />

        <DocGrid>
          <DocCard glifo="🗂️" titulo="Listas longas e fechadas">
            Conjuntos com mais de cinco alternativas conhecidas — país, unidade, curso, turma.
            O painel recolhe automaticamente e devolve a tela ao formulário.
          </DocCard>
          <DocCard glifo="🧮" titulo="Seleção múltipla">
            O painel do arquivo usa caixas de seleção, não botões de rádio. Com{' '}
            <code>multiple</code>, o campo acumula escolhas e o gatilho lista os rótulos
            selecionados.
          </DocCard>
          <DocCard glifo="⌨️" titulo="Operação por teclado">
            Setas percorrem as opções, Home e End saltam para as pontas, Enter confirma e Escape
            recolhe — o foco permanece no gatilho, apontado por{' '}
            <code>aria-activedescendant</code>.
          </DocCard>
          <DocCard glifo="🧩" titulo="Composição modular">
            <code>Selection.Trigger</code>, <code>Selection.Box</code> e{' '}
            <code>Selection.Option</code> são exportados à parte, para montar painéis com
            agrupamentos, cabeçalhos ou fontes de dados próprias.
          </DocCard>
          <DocCard glifo="🚫" titulo="Quando NÃO usar">
            Até quatro alternativas visíveis simultaneamente pedem{' '}
            <code>RadioButton</code> ou <code>Checkbox</code>. Duas alternativas mutuamente
            exclusivas pedem <code>Toggle</code>.
          </DocCard>
          <DocCard glifo="📐" titulo="Quatro alturas oficiais">
            56, 48, 40 e 32px de gatilho, cada uma com raio e degrau tipográfico próprios,
            para conviver com qualquer densidade de formulário.
          </DocCard>
        </DocGrid>
      </section>

      {/* =====================================================================
          SEÇÃO 2: FIGMA & ESPECIFICAÇÕES TÉCNICAS
          ===================================================================== */}
      <section style={{ marginBottom: '60px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '20px',
          }}
        >
          <UnooriaDocSectionHeader
            title="Figma & Especificações Técnicas"
            description="Prancha Select (6025:846) do arquivo Unooria_DS_v0.2, com os quatro conjuntos de componentes publicados."
            marginBottom="0px"
          />
          <a
            href="https://www.figma.com/design/i0HRQSBtQQ9ZXDYiJPRnGv/Unooria_DS_v0.2?node-id=13244-44733&m=dev"
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
              whiteSpace: 'nowrap',
            }}
          >
            <span>Abrir no Figma (Dev Mode)</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <DocGrid min="300px">
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E4E8E9',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            <strong style={{ fontSize: '14px', color: '#22272A' }}>Identificadores de origem</strong>
            <ul
              style={{
                margin: '12px 0 0 0',
                paddingLeft: '18px',
                fontSize: '13px',
                lineHeight: 1.9,
                color: '#475157',
              }}
            >
              <li>
                <code>fileKey</code> — i0HRQSBtQQ9ZXDYiJPRnGv
              </li>
              <li>
                Prancha <code>Select</code> — 6025:846
              </li>
              <li>
                <code>Select</code> (gatilho) — 1124:1007
              </li>
              <li>
                <code>Select State</code> (linha) — 1218:10533
              </li>
              <li>
                <code>Select Box</code> (painel) — 17017:43244
              </li>
              <li>
                <code>Select Input</code> (composto) — 12807:1730
              </li>
            </ul>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E4E8E9',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            <strong style={{ fontSize: '14px', color: '#22272A' }}>
              Variáveis lidas do arquivo
            </strong>
            <ul
              style={{
                margin: '12px 0 0 0',
                paddingLeft: '18px',
                fontSize: '13px',
                lineHeight: 1.9,
                color: '#475157',
              }}
            >
              <li>
                Superfície <code>background/neutral-50</code> → <code>--unooria-color-neutral-50</code>
              </li>
              <li>
                Contorno <code>border/neutral-150</code> → <code>--unooria-color-neutral-150</code>
              </li>
              <li>
                Ativo <code>border/primary-600</code> → <code>--unooria-color-brandnavy-600</code>
              </li>
              <li>
                Erro <code>text/danger-700</code> → <code>--unooria-color-danger-700</code>
              </li>
              <li>
                Realce <code>background/primary-overlay-100</code> →{' '}
                <code>--unooria-color-opacity-brandnavy-100</code>
              </li>
              <li>
                Medidas <code>spacing-3xs/2xs/xs</code> → 4, 8 e 12px
              </li>
            </ul>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E4E8E9',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            <strong style={{ fontSize: '14px', color: '#22272A' }}>
              Propriedades expostas no Figma
            </strong>
            <ul
              style={{
                margin: '12px 0 0 0',
                paddingLeft: '18px',
                fontSize: '13px',
                lineHeight: 1.9,
                color: '#475157',
              }}
            >
              <li>
                <code>Placeholder</code> → prop <code>label</code>
              </li>
              <li>
                <code>Label</code> / <code>Active Label</code> → props{' '}
                <code>placeholder</code> e <code>value</code>
              </li>
              <li>
                <code>Description</code> → prop <code>error</code>
              </li>
              <li>
                <code>Required</code> → prop <code>required</code>
              </li>
              <li>
                <code>Helper</code> → prop <code>helperIcon</code>
              </li>
              <li>
                <code>Show checkbox</code> → prop <code>showOptionCheckbox</code>
              </li>
            </ul>
          </div>
        </DocGrid>

        {/* Escala medida nó a nó */}
        <div
          style={{
            marginTop: '20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E4E8E9',
            overflowX: 'auto',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: '13px',
              minWidth: '760px',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E4E8E9' }}>
                {[
                  'Tamanho',
                  'Gatilho',
                  'Raio do gatilho',
                  'Tipografia do valor',
                  'Seta',
                  'Linha do painel',
                  'Raio do painel',
                ].map((cabecalho) => (
                  <th
                    key={cabecalho}
                    style={{ padding: '14px 18px', fontWeight: 600, color: '#334155' }}
                  >
                    {cabecalho}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['LG', '56px', '16px', 'body-M · 18/28', '20px', '56px', '16px'],
                ['MD', '48px', '12px', 'body-S · 16/24', '20px', '48px', '12px'],
                ['SM', '40px', '8px', 'body-XS · 14/20', '18px', '40px', '12px'],
                ['XS', '32px', '8px', 'body-XXS · 12/18', '18px', '36px', '8px'],
              ].map((linha) => (
                <tr key={linha[0]} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  {linha.map((celula, indice) => (
                    <td
                      key={`${linha[0]}-${indice}`}
                      style={{
                        padding: '12px 18px',
                        fontFamily: indice === 0 ? 'monospace' : 'inherit',
                        fontWeight: indice === 0 ? 700 : 400,
                        color: indice === 0 ? '#0086FF' : '#334155',
                      }}
                    >
                      {celula}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Registro de desvios */}
        <div
          style={{
            marginTop: '20px',
            backgroundColor: '#FFFBEB',
            border: '1px solid #FDE68A',
            borderRadius: '16px',
            padding: '24px',
          }}
        >
          <strong style={{ fontSize: '14px', color: '#92400E' }}>
            Registro de Desvios em Relação ao Figma
          </strong>
          <ul
            style={{
              margin: '12px 0 0 0',
              paddingLeft: '18px',
              fontSize: '13px',
              lineHeight: 1.9,
              color: '#78350F',
            }}
          >
            <li>
              <strong>Altura da linha XS.</strong> O conjunto <code>Select State</code> publica 32px
              em XS, mas o quadro <code>Size=XS</code> do <code>Select Box</code> sobrescreve as
              instâncias para 36px. Os dois valores foram preservados: dentro do painel manda o
              painel.
            </li>
            <li>
              <strong>Recuo do painel LG no quadro composto.</strong> O{' '}
              <code>Select Input / Variant=Opened, Size=LG</code> aplica 8px na horizontal e 4px na
              vertical, contra os 4px uniformes do conjunto <code>Select Box</code>. Adotou-se o
              valor do conjunto publicado.
            </li>
            <li>
              <strong>Painel flutuante.</strong> O quadro <code>Opened</code> empilha o painel no
              fluxo, como convém a um mockup estático. Em produção o painel flutua sobre o conteúdo
              seguinte; a montagem literal do arquivo permanece disponível por{' '}
              <code>inlineBox</code>.
            </li>
            <li>
              <strong>Estado Active e abertura.</strong> O quadro <code>Opened</code> mantém o
              contorno em <code>neutral-150</code>. O estado <code>Active</code> não é forçado pela
              abertura: ele é derivado do foco, que é o que esse estado representa.
            </li>
            <li>
              <strong>Hover e foco do gatilho.</strong> Não publicados no arquivo. O hover reaproveita
              o contorno do estado <code>Active</code>, e o foco por teclado acrescenta anel de 2px em{' '}
              <code>--unooria-color-opacity-brandnavy-300</code>.
            </li>
            <li>
              <strong>Estado selecionado da linha.</strong> O conjunto <code>Select State</code>
              publica apenas <code>Default</code> e <code>Hover</code>. O preenchimento da caixa vem
              do estado <code>Selected</code> do próprio <code>Checkbox</code> do Design System,
              que o arquivo instancia na linha — nenhum glifo foi desenhado.
            </li>
            <li>
              <strong>Raio da caixa de seleção.</strong> O nó da linha desenha 8px; o{' '}
              <code>Checkbox</code> oficial (#25405:5873) usa 6px no tamanho <code>md</code>.
              Prevalece a especificação do componente reaproveitado.
            </li>
            <li>
              <strong>Rolagem do painel.</strong> O arquivo desenha cinco linhas estáticas. Com{' '}
              <code>maxBoxHeight</code>, o painel rola de fato usando a{' '}
              <code>.unooria-scrollbar</code> do Design System.
            </li>
            <li>
              <strong>Tema escuro.</strong> A prancha publica apenas o tema claro. Os valores escuros
              vêm exclusivamente da escala <code>neutraldark</code> da própria Plataforma Unooria,
              conforme exigido pela seção 4.2 das diretrizes.
            </li>
            <li>
              <strong>Quadro Ideia de multiselect (25914:24118).</strong> É um estudo, não um
              conjunto publicado: propõe etiquetas no gatilho e campo de busca no painel. A seleção
              múltipla foi implementada; a busca interna e as etiquetas não foram inventadas.
            </li>
          </ul>
        </div>
      </section>

      {/* =====================================================================
          SEÇÃO 3: ANATOMIA DO COMPONENTE
          ===================================================================== */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Anatomia do Componente"
          description="Zonas de customização e subcomponentes exportados, na ordem em que aparecem no arquivo."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'start' }}>
          <DocStage rotulo="Gatilho recolhido e painel aberto">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <Selection
                label="Placeholder"
                required
                helperIcon
                placeholder="Input Label"
                options={PAISES}
                defaultValue="br"
              />
              <Selection
                label="Placeholder"
                required
                helperIcon
                placeholder="Input Label"
                options={OPCOES_FIGMA}
                defaultOpen
                inlineBox
                multiple
              />
            </div>
          </DocStage>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              {
                zona: '1 · Linha de rótulo',
                detalhe:
                  'Rótulo em body-XS/semibold (14/20) em neutral-950, asterisco em danger-700 e glifo help de 12px, separados por 4px.',
              },
              {
                zona: '2 · Caixa de valor',
                detalhe:
                  'Superfície neutral-50 com contorno de 1px, recuo de 6px por 12px e intervalo de 8px entre valor e seta.',
              },
              {
                zona: '3 · Seta',
                detalhe:
                  'keyboard_arrow_down recolhido, keyboard_arrow_up aberto. 20px em LG e MD, 18px em SM e XS.',
              },
              {
                zona: '4 · Descrição',
                detalhe:
                  'Mensagem em body-XXS (12/18) sob a caixa, em danger-700 no estado Error e em neutral-700 como texto de apoio.',
              },
              {
                zona: '5 · Painel',
                detalhe:
                  'Selection.Box — superfície neutral-50, contorno de 1px em neutral-150, recuo e intervalo de 4px.',
              },
              {
                zona: '6 · Linha de opção',
                detalhe:
                  'Selection.Option — recuo de 8px, intervalo de 12px, caixa de seleção de 20px em moldura de 4px com raio de 10px.',
              },
            ].map((item) => (
              <div
                key={item.zona}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E4E8E9',
                  borderRadius: '12px',
                  padding: '16px 18px',
                }}
              >
                <strong style={{ fontSize: '13px', color: '#0086FF', fontFamily: 'monospace' }}>
                  {item.zona}
                </strong>
                <p style={{ margin: '6px 0 0 0', fontSize: '13px', lineHeight: 1.6, color: '#475157' }}>
                  {item.detalhe}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SEÇÃO 4: MATRIZ DE VARIANTES, TAMANHOS E ESTADOS
          ===================================================================== */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Matriz de Variantes, Tamanhos e Estados"
          description="Réplica da matriz 4 × 4 do conjunto Select (1124:1007), renderizando o componente real de src/."
        />

        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E4E8E9',
            borderRadius: '16px',
            padding: '28px',
            overflowX: 'auto',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '56px repeat(4, minmax(190px, 1fr))',
              gap: '24px',
              alignItems: 'start',
              minWidth: '860px',
            }}
          >
            <span />
            {ESTADOS.map((estado) => (
              <span
                key={`cabecalho-${estado.state}`}
                style={{ fontSize: '13px', fontWeight: 600, color: '#475157' }}
              >
                {estado.rotulo}
              </span>
            ))}

            {TAMANHOS.map((tamanho) => (
              <React.Fragment key={tamanho.size}>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#64748B',
                    paddingTop: '26px',
                    fontFamily: 'monospace',
                  }}
                >
                  {tamanho.rotulo}
                </span>
                {ESTADOS.map((estado) => (
                  <Selection.Trigger
                    key={`${tamanho.size}-${estado.state}`}
                    size={tamanho.size}
                    state={estado.state}
                    label="Placeholder"
                    required
                    valueLabel="Input Label"
                    description={estado.state === 'error' ? 'Error Mensage' : undefined}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Linha de opção: Default e Hover */}
        <div style={{ marginTop: '24px' }}>
          <UnooriaDocSectionHeader
            title="Selection.Option — Default e Hover"
            description="Conjunto Select State (1218:10533). O realce em brandnavy a 10% também responde à navegação por teclado."
            barColor="#7FA5E2"
          />
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E4E8E9',
              borderRadius: '16px',
              padding: '28px',
              display: 'grid',
              gridTemplateColumns: '56px repeat(2, minmax(220px, 1fr))',
              gap: '20px',
              alignItems: 'center',
            }}
          >
            <span />
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#475157' }}>Default</span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#475157' }}>Hover</span>

            {TAMANHOS.map((tamanho) => (
              <React.Fragment key={`opcao-${tamanho.size}`}>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#64748B',
                    fontFamily: 'monospace',
                  }}
                >
                  {tamanho.rotulo}
                </span>
                <Selection.Option size={tamanho.size} label="Input Label" />
                <Selection.Option size={tamanho.size} label="Input Label" active />
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Painel nas quatro escalas */}
        <div style={{ marginTop: '24px' }}>
          <UnooriaDocSectionHeader
            title="Selection.Box — quatro escalas"
            description="Conjunto Select Box (17017:43244) com cinco linhas, como no arquivo. Em XS as linhas medem 36px, valor sobrescrito pelo próprio painel."
            barColor="#7FA5E2"
          />
          <DocGrid min="240px">
            {TAMANHOS.map((tamanho) => (
              <DocStage key={`box-${tamanho.size}`} rotulo={`${tamanho.rotulo} · raio ${tamanho.raio}`}>
                <Selection.Box size={tamanho.size}>
                  {OPCOES_FIGMA.map((opcao) => (
                    <Selection.Option
                      key={`${tamanho.size}-${opcao.value}`}
                      size={tamanho.size}
                      label={opcao.label}
                    />
                  ))}
                </Selection.Box>
              </DocStage>
            ))}
          </DocGrid>
        </div>
      </section>

      {/* =====================================================================
          SEÇÃO 5: BOAS PRÁTICAS
          ===================================================================== */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Boas Práticas (DO & DON'T)"
          description="Diretrizes para manter clareza, previsibilidade e acessibilidade na seleção."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          <div
            style={{
              backgroundColor: '#F0FDF4',
              border: '1px solid #BBF7D0',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            <strong style={{ fontSize: '15px', color: '#166534' }}>✓ DO — Faça</strong>
            <ul
              style={{
                margin: '12px 0 0 0',
                paddingLeft: '18px',
                fontSize: '13px',
                lineHeight: 1.9,
                color: '#15803D',
              }}
            >
              <li>Escreva um rótulo que diga o que se escolhe, e não o que se faz.</li>
              <li>Use o texto de espera para orientar (por exemplo, Selecione seu país).</li>
              <li>Ordene as opções por relevância ou alfabeticamente, nunca ao acaso.</li>
              <li>
                Marque a obrigatoriedade com <code>required</code>, que já pinta o asterisco em
                danger-700.
              </li>
              <li>
                Limite a altura com <code>maxBoxHeight</code> quando a lista passar de sete
                alternativas.
              </li>
              <li>
                Descreva o erro com a causa e o caminho de correção na prop <code>error</code>.
              </li>
            </ul>
          </div>

          <div
            style={{
              backgroundColor: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            <strong style={{ fontSize: '15px', color: '#991B1B' }}>✕ DON&apos;T — Evite</strong>
            <ul
              style={{
                margin: '12px 0 0 0',
                paddingLeft: '18px',
                fontSize: '13px',
                lineHeight: 1.9,
                color: '#B91C1C',
              }}
            >
              <li>Não use o Selection para duas ou três alternativas — prefira RadioButton.</li>
              <li>Não deixe o campo sem rótulo, confiando apenas no texto de espera.</li>
              <li>
                Não misture tamanhos diferentes na mesma linha de formulário: a altura do gatilho
                precisa acompanhar os demais campos.
              </li>
              <li>
                Não substitua a mensagem de erro por um contorno vermelho isolado — sem texto, a
                falha não é comunicada a leitores de tela.
              </li>
              <li>
                Não pinte contornos, realces ou textos com hexadecimais avulsos: use exclusivamente
                as variáveis <code>--unooria-*</code>.
              </li>
              <li>Não desabilite opções sem oferecer, em outro lugar, o motivo da indisponibilidade.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SEÇÃO 6: SUPORTE A TEMAS (LIGHT & DARK)
          ===================================================================== */}
      <section style={{ marginBottom: '60px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '16px',
          }}
        >
          <UnooriaDocSectionHeader
            title="Suporte a Temas (Light & Dark)"
            description="A prancha publica apenas o tema claro; o escuro usa exclusivamente a escala neutraldark da Plataforma Unooria."
            marginBottom="0px"
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setTema('light')}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: tema === 'light' ? '1px solid #0086FF' : '1px solid #CBD5E1',
                backgroundColor: tema === 'light' ? '#0086FF' : '#FFFFFF',
                color: tema === 'light' ? '#FFFFFF' : '#334155',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Light Mode
            </button>
            <button
              type="button"
              onClick={() => setTema('dark')}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: tema === 'dark' ? '1px solid #7FA5E2' : '1px solid #CBD5E1',
                backgroundColor: tema === 'dark' ? '#22272A' : '#FFFFFF',
                color: tema === 'dark' ? '#FFFFFF' : '#334155',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Dark Mode
            </button>
          </div>
        </div>

        <DocStage escuro={tema === 'dark'}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '28px',
              alignItems: 'start',
            }}
          >
            <Selection
              theme={tema}
              label="País de origem"
              required
              helperIcon
              placeholder="Selecione seu país"
              options={PAISES}
              defaultValue="br"
            />
            <Selection
              theme={tema}
              label="Unidade"
              placeholder="Selecione uma opção"
              options={PAISES}
              error="Selecione uma unidade para prosseguir."
            />
            <Selection
              theme={tema}
              label="Turma"
              placeholder="Indisponível neste período"
              options={PAISES}
              disabled
            />
            <Selection.Box theme={tema} size="md">
              {PAISES.slice(0, 4).map((opcao, indice) => (
                <Selection.Option
                  key={`tema-${opcao.value}`}
                  theme={tema}
                  size="md"
                  label={opcao.label}
                  selected={indice === 0}
                  active={indice === 1}
                />
              ))}
            </Selection.Box>
          </div>
        </DocStage>
      </section>

      {/* =====================================================================
          SEÇÃO 7: REFERÊNCIA COMPLETA DE PROPS DA API
          ===================================================================== */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="Referência Completa de Props da API"
          description="Tabelas individuais do componente raiz e de cada subcomponente exportado."
        />

        <DocPropsTable
          titulo="Selection"
          linhas={[
            { prop: 'options', tipo: 'SelectionOptionItem[]', padrao: '[]', descricao: 'Lista de opções do painel. Cada item tem value, label e disabled opcional.' },
            { prop: 'value', tipo: 'string | string[]', padrao: 'undefined', descricao: 'Valor selecionado no modo controlado. Lista quando multiple está ativo.' },
            { prop: 'defaultValue', tipo: 'string | string[]', padrao: 'undefined', descricao: 'Valor inicial no modo não-controlado.' },
            { prop: 'onChange', tipo: '(value, option) => void', padrao: 'undefined', descricao: 'Disparado a cada seleção, com o valor resultante e a opção acionada.' },
            { prop: 'multiple', tipo: 'boolean', padrao: 'false', descricao: 'Acumula seleções, coerente com as caixas de seleção do painel do arquivo.' },
            { prop: 'open', tipo: 'boolean', padrao: 'undefined', descricao: 'Abertura do painel no modo controlado.' },
            { prop: 'defaultOpen', tipo: 'boolean', padrao: 'false', descricao: 'Abertura inicial no modo não-controlado.' },
            { prop: 'onOpenChange', tipo: '(open: boolean) => void', padrao: 'undefined', descricao: 'Notifica abertura e fechamento, inclusive por clique externo e Escape.' },
            { prop: 'label', tipo: 'ReactNode', padrao: 'undefined', descricao: 'Rótulo superior. Corresponde à propriedade Placeholder do Figma.' },
            { prop: 'required', tipo: 'boolean', padrao: 'false', descricao: 'Exibe o asterisco em danger-700 e marca aria-required.' },
            { prop: 'helperIcon', tipo: 'boolean | string | ReactNode', padrao: 'undefined', descricao: 'Glifo de ajuda de 12px ao lado do rótulo. true usa o glifo help.' },
            { prop: 'placeholder', tipo: 'ReactNode', padrao: "'Selecione uma opção'", descricao: 'Texto de espera exibido na caixa de valor quando nada está selecionado.' },
            { prop: 'error', tipo: 'boolean | string', padrao: 'undefined', descricao: 'Pinta o estado Error. Quando string, exibe a mensagem com role alert.' },
            { prop: 'helperText', tipo: 'ReactNode', padrao: 'undefined', descricao: 'Texto de apoio sob a caixa, exibido apenas quando não há erro.' },
            { prop: 'state', tipo: "'default' | 'active' | 'disabled' | 'error'", padrao: 'undefined', descricao: 'Força um estado visual, ignorando a derivação automática. Para matrizes estáticas.' },
            { prop: 'disabled', tipo: 'boolean', padrao: 'false', descricao: 'Desabilita o gatilho e impede a abertura do painel.' },
            { prop: 'size', tipo: "'xs' | 'sm' | 'md' | 'lg'", padrao: "'md'", descricao: 'Escala de tamanho. md equivale ao gatilho de 48px.' },
            { prop: 'theme', tipo: "'light' | 'dark'", padrao: "'light'", descricao: 'Tema visual de contraste.' },
            { prop: 'fullWidth', tipo: 'boolean', padrao: 'true', descricao: 'Ocupa toda a largura disponível do container.' },
            { prop: 'showOptionCheckbox', tipo: 'boolean', padrao: 'true', descricao: 'Exibe a caixa de seleção nas linhas. Figma: Show checkbox.' },
            { prop: 'closeOnSelect', tipo: 'boolean', padrao: 'true', descricao: 'Recolhe o painel ao selecionar. Ignorado quando multiple está ativo.' },
            { prop: 'inlineBox', tipo: 'boolean', padrao: 'false', descricao: 'Empilha o painel no fluxo, como no quadro Variant=Opened do Figma.' },
            { prop: 'maxBoxHeight', tipo: 'number | string', padrao: 'undefined', descricao: 'Altura máxima do painel, habilitando rolagem com a scrollbar do Design System.' },
            { prop: 'renderValue', tipo: '(selected) => ReactNode', padrao: 'undefined', descricao: 'Substitui a renderização do valor exibido no gatilho.' },
            { prop: 'name', tipo: 'string', padrao: 'undefined', descricao: 'Nome do campo. Emite um input oculto com os valores separados por vírgula.' },
            { prop: 'children', tipo: 'ReactNode', padrao: 'undefined', descricao: 'Conteúdo customizado do painel, substituindo a renderização de options.' },
            { prop: 'triggerClassName', tipo: 'string', padrao: "''", descricao: 'Classe adicional aplicada ao container do gatilho.' },
            { prop: 'boxClassName', tipo: 'string', padrao: "''", descricao: 'Classe adicional aplicada ao painel.' },
          ]}
        />

        <DocPropsTable
          titulo="Selection.Trigger"
          linhas={[
            { prop: 'label', tipo: 'ReactNode', padrao: 'undefined', descricao: 'Rótulo superior do campo.' },
            { prop: 'required', tipo: 'boolean', padrao: 'false', descricao: 'Exibe o asterisco de obrigatoriedade.' },
            { prop: 'helperIcon', tipo: 'boolean | string | ReactNode', padrao: 'undefined', descricao: 'Glifo de ajuda de 12px ao lado do rótulo.' },
            { prop: 'valueLabel', tipo: 'ReactNode', padrao: 'undefined', descricao: 'Conteúdo da caixa de valor. Figma: Label / Active Label.' },
            { prop: 'placeholderShown', tipo: 'boolean', padrao: 'false', descricao: 'Atenua a cor do valor, indicando texto de espera.' },
            { prop: 'description', tipo: 'ReactNode', padrao: 'undefined', descricao: 'Mensagem sob a caixa. Figma: Description.' },
            { prop: 'state', tipo: "'default' | 'active' | 'disabled' | 'error'", padrao: "'default'", descricao: 'Estado visual publicado pelo conjunto Select.' },
            { prop: 'size', tipo: "'xs' | 'sm' | 'md' | 'lg'", padrao: "'md'", descricao: 'Escala de tamanho do gatilho.' },
            { prop: 'theme', tipo: "'light' | 'dark'", padrao: "'light'", descricao: 'Tema visual.' },
            { prop: 'open', tipo: 'boolean', padrao: 'false', descricao: 'Troca a seta por keyboard_arrow_up.' },
            { prop: 'controlClassName', tipo: 'string', padrao: "''", descricao: 'Classe adicional aplicada à caixa de valor.' },
          ]}
        />

        <DocPropsTable
          titulo="Selection.Box"
          linhas={[
            { prop: 'size', tipo: "'xs' | 'sm' | 'md' | 'lg'", padrao: "'md'", descricao: 'Governa o raio do painel e a altura das linhas descendentes.' },
            { prop: 'theme', tipo: "'light' | 'dark'", padrao: "'light'", descricao: 'Tema visual.' },
            { prop: 'floating', tipo: 'boolean', padrao: 'false', descricao: 'Posiciona o painel de forma absoluta, 4px sob o gatilho.' },
            { prop: 'maxHeight', tipo: 'number | string', padrao: 'undefined', descricao: 'Altura máxima antes de habilitar rolagem interna.' },
            { prop: 'role', tipo: 'string', padrao: "'listbox'", descricao: 'Papel ARIA do painel.' },
          ]}
        />

        <DocPropsTable
          titulo="Selection.Option"
          linhas={[
            { prop: 'value', tipo: 'string', padrao: 'undefined', descricao: 'Valor repassado ao onSelect.' },
            { prop: 'label', tipo: 'ReactNode', padrao: 'undefined', descricao: 'Rótulo da linha. Figma: Input Label.' },
            { prop: 'showCheckbox', tipo: 'boolean', padrao: 'true', descricao: 'Exibe a caixa de seleção. Figma: Show checkbox.' },
            { prop: 'selected', tipo: 'boolean', padrao: 'false', descricao: 'Preenche o Checkbox e marca aria-selected.' },
            { prop: 'active', tipo: 'boolean', padrao: 'false', descricao: 'Realce de navegação por teclado, equivalente ao estado Hover.' },
            { prop: 'disabled', tipo: 'boolean', padrao: 'false', descricao: 'Desabilita a linha e suprime o realce.' },
            { prop: 'size', tipo: "'xs' | 'sm' | 'md' | 'lg'", padrao: "'md'", descricao: 'Escala de tamanho da linha.' },
            { prop: 'theme', tipo: "'light' | 'dark'", padrao: "'light'", descricao: 'Tema visual.' },
            { prop: 'onSelect', tipo: '(value, event) => void', padrao: 'undefined', descricao: 'Disparado ao acionar a linha.' },
          ]}
        />
      </section>
    </UnooriaDocShell>
  );
};

/* ==========================================================================
   Meta
   ========================================================================== */

const meta: Meta<typeof Selection> = {
  title: 'Plataforma Unooria/Componentes/Selection',
  component: Selection,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    options: {
      control: 'object',
      description: 'Lista de opções do painel.',
      table: { category: 'Dados', type: { summary: 'SelectionOptionItem[]' } },
    },
    value: {
      control: 'text',
      description: 'Valor selecionado no modo controlado.',
      table: { category: 'Dados', type: { summary: 'string | string[]' } },
    },
    defaultValue: {
      control: 'text',
      description: 'Valor inicial no modo não-controlado.',
      table: { category: 'Dados', type: { summary: 'string | string[]' } },
    },
    multiple: {
      control: 'boolean',
      description: 'Acumula seleções.',
      table: { category: 'Dados' },
    },
    name: {
      control: 'text',
      description: 'Nome do campo para envio em formulários.',
      table: { category: 'Dados' },
    },
    label: {
      control: 'text',
      description: 'Rótulo superior (Figma: Placeholder).',
      table: { category: 'Conteúdo' },
    },
    placeholder: {
      control: 'text',
      description: 'Texto de espera da caixa de valor.',
      table: { category: 'Conteúdo' },
    },
    helperText: {
      control: 'text',
      description: 'Texto de apoio sob a caixa.',
      table: { category: 'Conteúdo' },
    },
    error: {
      control: 'text',
      description: 'Mensagem de erro, ou true para apenas pintar o estado.',
      table: { category: 'Conteúdo' },
    },
    required: {
      control: 'boolean',
      description: 'Exibe o asterisco de obrigatoriedade.',
      table: { category: 'Conteúdo' },
    },
    helperIcon: {
      control: 'boolean',
      description: 'Exibe o glifo de ajuda de 12px.',
      table: { category: 'Conteúdo' },
    },
    size: {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Escala oficial de tamanhos do Figma.',
      table: { category: 'Aparência', defaultValue: { summary: 'md' } },
    },
    state: {
      control: 'inline-radio',
      options: [undefined, 'default', 'active', 'disabled', 'error'],
      description: 'Força um estado visual, ignorando a derivação automática.',
      table: { category: 'Aparência' },
    },
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
      description: 'Tema visual de contraste.',
      table: { category: 'Aparência', defaultValue: { summary: 'light' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Ocupa toda a largura disponível.',
      table: { category: 'Aparência' },
    },
    showOptionCheckbox: {
      control: 'boolean',
      description: 'Exibe a caixa de seleção nas linhas do painel.',
      table: { category: 'Aparência' },
    },
    inlineBox: {
      control: 'boolean',
      description: 'Empilha o painel no fluxo, como no quadro Opened do Figma.',
      table: { category: 'Aparência' },
    },
    maxBoxHeight: {
      control: { type: 'range', min: 80, max: 480, step: 8 },
      description: 'Altura máxima do painel antes de habilitar rolagem.',
      table: { category: 'Aparência' },
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o campo.',
      table: { category: 'Comportamento' },
    },
    open: {
      control: 'boolean',
      description: 'Abertura do painel no modo controlado.',
      table: { category: 'Comportamento' },
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Abertura inicial no modo não-controlado.',
      table: { category: 'Comportamento' },
    },
    closeOnSelect: {
      control: 'boolean',
      description: 'Recolhe o painel ao selecionar.',
      table: { category: 'Comportamento' },
    },
    onChange: { action: 'onChange', table: { category: 'Eventos' } },
    onOpenChange: { action: 'onOpenChange', table: { category: 'Eventos' } },
    renderValue: { control: false, table: { category: 'Eventos' } },
    children: { control: false, table: { category: 'Composição' } },
    className: { control: false, table: { category: 'Composição' } },
    style: { control: false, table: { category: 'Composição' } },
    triggerClassName: { control: false, table: { category: 'Composição' } },
    boxClassName: { control: false, table: { category: 'Composição' } },
  },
  args: {
    label: 'País de origem',
    placeholder: 'Selecione seu país',
    required: true,
    helperIcon: true,
    size: 'md',
    theme: 'light',
    fullWidth: true,
    showOptionCheckbox: true,
    closeOnSelect: true,
    inlineBox: false,
    multiple: false,
    disabled: false,
    defaultOpen: false,
    options: PAISES,
    helperText: 'Usamos esta informação apenas para regionalizar o conteúdo.',
  },
};

export default meta;

type Story = StoryObj<typeof Selection>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <SelectionDocumentationPage />,
};

/**
 * Playground do componente completo, com 100% das props da API expostas.
 */
export const PlaygroundSelection: Story = {
  name: '🕹️ 1. Playground · Selection',
  render: (args) => (
    <div style={{ maxWidth: '420px', paddingBottom: '320px' }}>
      <Selection {...args} />
    </div>
  ),
};

/**
 * Playground dedicado do gatilho isolado (conjunto `Select` 1124:1007).
 */
export const PlaygroundTrigger: StoryObj<typeof Selection.Trigger> = {
  name: '🕹️ 2. Playground · Selection.Trigger',
  argTypes: {
    label: { control: 'text', table: { category: 'Conteúdo' } },
    valueLabel: { control: 'text', table: { category: 'Conteúdo' } },
    description: { control: 'text', table: { category: 'Conteúdo' } },
    required: { control: 'boolean', table: { category: 'Conteúdo' } },
    helperIcon: { control: 'boolean', table: { category: 'Conteúdo' } },
    placeholderShown: { control: 'boolean', table: { category: 'Conteúdo' } },
    size: {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg'],
      table: { category: 'Aparência' },
    },
    state: {
      control: 'inline-radio',
      options: ['default', 'active', 'disabled', 'error'],
      table: { category: 'Aparência' },
    },
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
      table: { category: 'Aparência' },
    },
    open: { control: 'boolean', table: { category: 'Aparência' } },
    disabled: { control: 'boolean', table: { category: 'Comportamento' } },
    onClick: { action: 'onClick', table: { category: 'Eventos' } },
  },
  args: {
    label: 'Placeholder',
    valueLabel: 'Input Label',
    description: 'Error Mensage',
    required: true,
    helperIcon: true,
    placeholderShown: false,
    size: 'lg',
    state: 'error',
    theme: 'light',
    open: false,
    disabled: false,
  },
  /*
   * As props são escolhidas uma a uma, e não repassadas por espalhamento: o
   * Storybook mescla os `args` do `meta` em toda estória do arquivo, e as props
   * exclusivas do `Selection` chegariam ao `<button>` como atributos inválidos.
   */
  render: ({
    label,
    valueLabel,
    description,
    required,
    helperIcon,
    placeholderShown,
    size,
    state,
    theme,
    open,
    disabled,
    onClick,
  }) => (
    <div style={{ maxWidth: '320px' }}>
      <Selection.Trigger
        label={label}
        valueLabel={valueLabel}
        description={description}
        required={required}
        helperIcon={helperIcon}
        placeholderShown={placeholderShown}
        size={size}
        state={state}
        theme={theme}
        open={open}
        disabled={disabled}
        onClick={onClick}
      />
    </div>
  ),
};

/**
 * Playground dedicado do painel e da linha de opção
 * (conjuntos `Select Box` 17017:43244 e `Select State` 1218:10533).
 */
export const PlaygroundBox: StoryObj<typeof Selection.Option> = {
  name: '🕹️ 3. Playground · Selection.Box & Option',
  argTypes: {
    label: { control: 'text', table: { category: 'Conteúdo' } },
    showCheckbox: { control: 'boolean', table: { category: 'Aparência' } },
    selected: { control: 'boolean', table: { category: 'Aparência' } },
    active: { control: 'boolean', table: { category: 'Aparência' } },
    disabled: { control: 'boolean', table: { category: 'Comportamento' } },
    size: {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg'],
      table: { category: 'Aparência' },
    },
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'],
      table: { category: 'Aparência' },
    },
    onSelect: { action: 'onSelect', table: { category: 'Eventos' } },
  },
  args: {
    label: 'Input Label',
    showCheckbox: true,
    selected: false,
    active: false,
    disabled: false,
    size: 'lg',
    theme: 'light',
  },
  /* Mesmo motivo do playground anterior: as props são escolhidas uma a uma. */
  render: ({ label, showCheckbox, selected, active, disabled, size, theme, onSelect }) => (
    <div
      style={{
        maxWidth: '380px',
        padding: '24px',
        borderRadius: '16px',
        backgroundColor: theme === 'dark' ? '#181C1E' : '#F8FAFC',
        border: `1px solid ${theme === 'dark' ? '#383E41' : '#E4E8E9'}`,
      }}
    >
      <Selection.Box size={size} theme={theme}>
        <Selection.Option
          label={label}
          showCheckbox={showCheckbox}
          selected={selected}
          active={active}
          disabled={disabled}
          size={size}
          theme={theme}
          onSelect={onSelect}
        />
        <Selection.Option label="Input Label" size={size} theme={theme} />
        <Selection.Option label="Input Label" size={size} theme={theme} selected />
        <Selection.Option label="Input Label" size={size} theme={theme} disabled />
      </Selection.Box>
    </div>
  ),
};

/**
 * Réplica 1:1 dos quadros oficiais do Figma: o composto `Select Input`
 * (12807:1730) nas variantes `Default` e `Opened`, com o painel empilhado
 * no fluxo como no arquivo.
 */
export const ExemploOficialFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma (Select Input 12807:1730)',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '32px',
        alignItems: 'start',
        maxWidth: '1440px',
      }}
    >
      {TAMANHOS.map((tamanho) => (
        <div key={tamanho.size} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 700,
              fontFamily: 'monospace',
              color: '#64748B',
            }}
          >
            {tamanho.rotulo} · gatilho {tamanho.gatilho}
          </span>

          <Selection
            size={tamanho.size}
            label="Placeholder"
            required
            placeholder="Input Label"
            options={OPCOES_FIGMA}
          />

          <Selection
            size={tamanho.size}
            label="Placeholder"
            required
            placeholder="Input Label"
            options={OPCOES_FIGMA}
            defaultOpen
            inlineBox
            multiple
          />
        </div>
      ))}
    </div>
  ),
};

/**
 * Matriz completa 4 × 4 do conjunto `Select` (1124:1007).
 */
export const TodasVariantes: Story = {
  name: 'Todos os Estados Oficiais',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '56px repeat(4, minmax(190px, 1fr))',
        gap: '24px',
        alignItems: 'start',
        overflowX: 'auto',
      }}
    >
      <span />
      {ESTADOS.map((estado) => (
        <span
          key={`variante-${estado.state}`}
          style={{ fontSize: '13px', fontWeight: 600, color: '#475157' }}
        >
          {estado.rotulo}
        </span>
      ))}
      {TAMANHOS.map((tamanho) => (
        <React.Fragment key={`variante-${tamanho.size}`}>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 700,
              fontFamily: 'monospace',
              color: '#64748B',
              paddingTop: '26px',
            }}
          >
            {tamanho.rotulo}
          </span>
          {ESTADOS.map((estado) => (
            <Selection.Trigger
              key={`${tamanho.size}-${estado.state}`}
              size={tamanho.size}
              state={estado.state}
              label="Placeholder"
              required
              valueLabel="Input Label"
              description={estado.state === 'error' ? 'Error Mensage' : undefined}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  ),
};

/**
 * Comparação das quatro alturas oficiais em operação real.
 */
export const Tamanhos: Story = {
  name: 'Escala Oficial de Tamanhos',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '24px',
        alignItems: 'start',
      }}
    >
      {TAMANHOS.map((tamanho) => (
        <div key={tamanho.size} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#0086FF' }}>
            {tamanho.rotulo} • {tamanho.gatilho} • raio {tamanho.raio}
          </span>
          <Selection
            size={tamanho.size}
            label="País de origem"
            required
            placeholder="Selecione seu país"
            options={PAISES}
            maxBoxHeight={220}
          />
        </div>
      ))}
    </div>
  ),
};

/**
 * Estados interativos em operação: seleção simples, múltipla, erro,
 * desabilitado e rolagem interna do painel.
 */
export const Estados: Story = {
  name: 'Estados em Operação',
  render: () => {
    const [simples, setSimples] = useState<string>('br');
    const [multiplos, setMultiplos] = useState<string[]>(['br', 'pt']);

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
          alignItems: 'start',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#0086FF' }}>
            Seleção simples (controlada)
          </span>
          <Selection
            label="País de origem"
            required
            placeholder="Selecione seu país"
            options={PAISES}
            value={simples}
            onChange={(valor) => setSimples(valor as string)}
            helperText={`Valor atual: ${simples}`}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#0086FF' }}>
            Seleção múltipla (controlada)
          </span>
          <Selection
            label="Países de atuação"
            multiple
            placeholder="Selecione um ou mais países"
            options={PAISES}
            value={multiplos}
            onChange={(valor) => setMultiplos(valor as string[])}
            helperText={`${multiplos.length} selecionado(s)`}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#0086FF' }}>Erro</span>
          <Selection
            label="País de origem"
            required
            placeholder="Selecione seu país"
            options={PAISES}
            error="Escolha um país para concluir o cadastro."
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#0086FF' }}>Desabilitado</span>
          <Selection
            label="Turma"
            placeholder="Indisponível neste período"
            options={PAISES}
            disabled
            helperText="A matrícula reabre no próximo semestre."
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#0086FF' }}>
            Painel com rolagem
          </span>
          <Selection
            label="País de origem"
            placeholder="Selecione seu país"
            options={PAISES}
            maxBoxHeight={180}
            defaultOpen
            inlineBox
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#0086FF' }}>
            Painel sem caixas de seleção
          </span>
          <Selection
            label="País de origem"
            placeholder="Selecione seu país"
            options={PAISES}
            showOptionCheckbox={false}
            defaultOpen
            inlineBox
          />
        </div>
      </div>
    );
  },
};

/**
 * Uso flexível dos Compound Components para montar um painel agrupado,
 * com fonte de dados e cabeçalhos próprios.
 */
export const ComposicaoModular: Story = {
  name: 'Composição Modular',
  render: () => {
    const [selecionado, setSelecionado] = useState<string>('mz');

    const grupos: { titulo: string; itens: SelectionOptionItem[] }[] = [
      { titulo: 'América do Sul', itens: PAISES.slice(0, 1) },
      { titulo: 'Europa', itens: PAISES.slice(1, 2) },
      { titulo: 'África', itens: PAISES.slice(2, 6) },
    ];

    const rotuloSelecionado = PAISES.find((item) => item.value === selecionado)?.label;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '380px' }}>
        <Selection.Trigger
          label="País de origem"
          required
          helperIcon
          valueLabel={rotuloSelecionado}
          open
          state="active"
          description="Painel montado com Selection.Box e Selection.Option."
        />

        <Selection.Box size="md" maxHeight={320}>
          {grupos.map((grupo) => (
            <React.Fragment key={grupo.titulo}>
              <h2
                style={{
                  margin: '4px 8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.4px',
                  textTransform: 'uppercase',
                  color: 'var(--unooria-color-neutral-500, #617379)',
                }}
              >
                {grupo.titulo}
              </h2>
              {grupo.itens.map((item) => (
                <Selection.Option
                  key={item.value}
                  size="md"
                  value={item.value}
                  label={item.label}
                  disabled={item.disabled}
                  selected={item.value === selecionado}
                  onSelect={(valor) => valor && setSelecionado(valor)}
                />
              ))}
            </React.Fragment>
          ))}
        </Selection.Box>
      </div>
    );
  },
};

/**
 * Aplicação em formulário de cadastro, o cenário descrito na prancha do Figma.
 */
export const FormularioDeCadastro: Story = {
  name: 'Formulário de Cadastro',
  render: () => {
    const [pais, setPais] = useState<string>('');
    const [enviado, setEnviado] = useState(false);

    return (
      <form
        onSubmit={(evento) => {
          evento.preventDefault();
          setEnviado(true);
        }}
        style={{
          maxWidth: '420px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '28px',
          borderRadius: '16px',
          border: '1px solid var(--unooria-color-neutral-150, #E4E8E9)',
          backgroundColor: 'var(--unooria-color-neutral-50, #FFFFFF)',
        }}
      >
        <h2 style={{ margin: 0, fontSize: '18px', color: '#22272A' }}>Dados de cadastro</h2>

        <Selection
          name="pais"
          label="País de origem"
          required
          helperIcon
          placeholder="Selecione seu país"
          options={PAISES}
          value={pais}
          onChange={(valor) => {
            setPais(valor as string);
            setEnviado(false);
          }}
          error={enviado && !pais ? 'Escolha um país para concluir o cadastro.' : undefined}
          helperText="A lista recolhe automaticamente após a escolha."
          maxBoxHeight={240}
        />

        <button
          type="submit"
          style={{
            alignSelf: 'flex-start',
            padding: '10px 20px',
            borderRadius: 'var(--unooria-radius-s, 8px)',
            border: 'none',
            backgroundColor: 'var(--unooria-color-brandnavy-600, #7FA5E2)',
            color: 'var(--unooria-color-neutral-950, #22272A)',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Concluir cadastro
        </button>

        {enviado && pais && (
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--unooria-color-success-500, #01B574)' }}>
            Cadastro concluído com o país {PAISES.find((item) => item.value === pais)?.label}.
          </p>
        )}
      </form>
    );
  },
};
