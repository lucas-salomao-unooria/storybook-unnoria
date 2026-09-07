import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { HeaderMenu } from '../../../src/unooria/components/HeaderMenu/HeaderMenu';
import type { HeaderMenuItem } from '../../../src/unooria/components/HeaderMenu/HeaderMenu.types';
import { Avatar } from '../../../src/unooria/components/Avatar/Avatar';
import { Icon } from '../../../src/unooria/components/Icon/Icon';
import { Logo } from '../../../src/unooria/components/Logo/Logo';
import '../../../src/unooria/tokens/colors.css';
import '../../../src/unooria/tokens/typography.css';
import '../../../src/unooria/tokens/spacing.css';
import '../../../src/unooria/tokens/elevation.css';
import '../../../src/unooria/tokens/icons.css';
import '../../../src/unooria/components/Avatar/Avatar.css';
import '../../../src/unooria/components/Icon/Icon.css';
import '../../../src/unooria/components/Logo/Logo.css';
import '../../../src/unooria/components/HeaderMenu/HeaderMenu.css';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

const FIGMA_FILE = 'https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria';
const FIGMA_NODE = '21765:12693';

const RETRATO =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80';

/**
 * A faixa completa do variante `Menu=Open` do Figma, na ordem do arquivo.
 * O `exit_to_app` é o último — encostado no gatilho — e é o logoff.
 */
const ITENS_DO_FIGMA: HeaderMenuItem[] = [
  { key: 'tema', label: 'Tema escuro', icon: 'dark_mode' },
  { key: 'notificacoes', label: 'Notificações', icon: 'notifications_active' },
  { key: 'widgets', label: 'Widgets', icon: 'dashboard_customize' },
  { key: 'iniciativas', label: 'Iniciativas', icon: 'apps' },
  { key: 'idioma', label: 'Idioma', text: 'PT' },
  { key: 'sair', label: 'Sair', icon: 'exit_to_app', danger: true },
];

/** O caso que o header da Plataforma precisa hoje: identidade + logoff. */
const ITENS_DA_PLATAFORMA: HeaderMenuItem[] = [
  { key: 'perfil', label: 'Meu perfil', icon: 'account_circle' },
  { key: 'ajustes', label: 'Preferências', icon: 'settings' },
  { key: 'sair', label: 'Sair', icon: 'exit_to_app', danger: true },
];

/* ==========================================================================
   Utilitários visuais locais da documentação
   ========================================================================== */

const DOC_BORDA = '#E4E8E9';
const DOC_TEXTO = '#22272A';
const DOC_APAGADO = '#617379';
const DOC_SUAVE = '#F7F9FA';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

const DocGrade: React.FC<{ children: React.ReactNode; min?: number }> = ({ children, min = 300 }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(${min}px, 1fr))`,
      gap: 20,
      marginBottom: 32,
    }}
  >
    {children}
  </div>
);

const DocCartao: React.FC<{ icone?: string; titulo: string; children: React.ReactNode }> = ({
  icone,
  titulo,
  children,
}) => (
  <div
    style={{
      backgroundColor: '#FFFFFF',
      border: `1px solid ${DOC_BORDA}`,
      borderRadius: 12,
      padding: 20,
    }}
  >
    <h4 style={{ margin: '0 0 8px 0', fontSize: 15, color: DOC_TEXTO }}>
      {icone ? `${icone} ` : ''}
      {titulo}
    </h4>
    <div style={{ fontSize: 13.5, lineHeight: 1.6, color: DOC_APAGADO }}>{children}</div>
  </div>
);

/**
 * Palco com o fundo cinza do header, para que os overlays translúcidos da faixa
 * (`neutrallight-700` sobre `neutraldark-50`) apareçam como no Figma. Sobre
 * branco puro eles somem.
 */
const DocPalco: React.FC<{
  rotulo?: string;
  tema?: 'light' | 'dark';
  altura?: number;
  children: React.ReactNode;
}> = ({ rotulo, tema = 'light', altura = 160, children }) => (
  <div style={{ marginBottom: 24 }}>
    {rotulo && (
      <div style={{ fontSize: 12, color: DOC_APAGADO, marginBottom: 8, fontFamily: MONO }}>
        {rotulo}
      </div>
    )}
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        minHeight: altura,
        padding: 24,
        borderRadius: 12,
        border: `1px solid ${tema === 'dark' ? '#3D4448' : DOC_BORDA}`,
        backgroundColor: tema === 'dark' ? '#22272A' : '#F5F5F5',
      }}
    >
      {children}
    </div>
  </div>
);

const DocTabela: React.FC<{
  titulo?: string;
  linhas: { nome: string; tipo: string; padrao?: string; descricao: string }[];
}> = ({ titulo, linhas }) => (
  <div style={{ marginBottom: 28 }}>
    {titulo && <h4 style={{ margin: '0 0 10px 0', fontSize: 14, color: DOC_TEXTO }}>{titulo}</h4>}
    <div style={{ border: `1px solid ${DOC_BORDA}`, borderRadius: 12, overflow: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ backgroundColor: DOC_SUAVE }}>
            <th style={{ textAlign: 'left', padding: '10px 14px', width: '18%' }}>Prop</th>
            <th style={{ textAlign: 'left', padding: '10px 14px', width: '30%' }}>Tipo</th>
            <th style={{ textAlign: 'left', padding: '10px 14px', width: '14%' }}>Padrão</th>
            <th style={{ textAlign: 'left', padding: '10px 14px' }}>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha) => (
            <tr key={linha.nome} style={{ borderTop: `1px solid ${DOC_BORDA}` }}>
              <td style={{ padding: '10px 14px', fontFamily: MONO, color: '#6487C2' }}>
                {linha.nome}
              </td>
              <td style={{ padding: '10px 14px', fontFamily: MONO, fontSize: 12 }}>{linha.tipo}</td>
              <td style={{ padding: '10px 14px', fontFamily: MONO, fontSize: 12 }}>
                {linha.padrao ?? '—'}
              </td>
              <td style={{ padding: '10px 14px', color: DOC_APAGADO }}>{linha.descricao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const DocPraticas: React.FC<{ faca: string[]; naoFaca: string[] }> = ({ faca, naoFaca }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: 20,
      marginBottom: 32,
    }}
  >
    <div
      style={{
        border: '1px solid #01B574',
        borderRadius: 12,
        padding: 20,
        backgroundColor: 'rgba(1, 181, 116, 0.06)',
      }}
    >
      <h4 style={{ margin: '0 0 12px 0', fontSize: 15, color: '#01B574' }}>✅ Faça</h4>
      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.7, color: DOC_TEXTO }}>
        {faca.map((texto) => (
          <li key={texto}>{texto}</li>
        ))}
      </ul>
    </div>
    <div
      style={{
        border: '1px solid #E31A1A',
        borderRadius: 12,
        padding: 20,
        backgroundColor: 'rgba(227, 26, 26, 0.05)',
      }}
    >
      <h4 style={{ margin: '0 0 12px 0', fontSize: 15, color: '#E31A1A' }}>🚫 Não faça</h4>
      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.7, color: DOC_TEXTO }}>
        {naoFaca.map((texto) => (
          <li key={texto}>{texto}</li>
        ))}
      </ul>
    </div>
  </div>
);

/* ==========================================================================
   Página de documentação rica (Padrão Ouro)
   ========================================================================== */

const HeaderMenuDocumentationPage: React.FC = () => {
  const [tema, setTema] = useState<'light' | 'dark'>('light');
  const [ultimaAcao, setUltimaAcao] = useState<string>('nenhuma');

  const itensComRegistro = ITENS_DO_FIGMA.map((item) => ({
    ...item,
    onClick: () => setUltimaAcao(item.label),
  }));

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Navegação"
        title="HeaderMenu"
        description="Menu recolhível do header. O gatilho fica fixo na borda direita — por padrão o avatar do usuário — e a faixa de ações se revela da direita para a esquerda, ancorada na borda esquerda do gatilho. É onde vivem as ações de conta, inclusive o logoff."
      />

      {/* 1. Visão geral e casos de uso */}
      <UnooriaDocSectionHeader
        title="1. Visão Geral & Casos de Uso"
        description="Um gatilho, uma faixa, e nada de menu vertical: as ações do header são ícones, e ícone em coluna desperdiça a barra."
      />
      <DocGrade>
        <DocCartao icone="👤" titulo="Ações de conta no header">
          Perfil, preferências e o <strong>Sair</strong>. Antes o logoff era um botão solto ao lado do
          avatar; aqui ele entra na faixa, marcado como destrutivo.
        </DocCartao>
        <DocCartao icone="↔️" titulo="Expansão da direita para a esquerda">
          O gatilho não se move um pixel ao abrir. A faixa cresce para a esquerda, sobre o espaço
          vazio da barra, e os itens entram em escada começando pelo que está encostado no gatilho.
        </DocCartao>
        <DocCartao icone="🔌" titulo="Gatilho plugável">
          Sem <code style={{ fontFamily: MONO }}>children</code> o componente monta o{' '}
          <code style={{ fontFamily: MONO }}>Avatar</code> do DS em 40px com a borda em gradiente.
          Com <code style={{ fontFamily: MONO }}>children</code>, o gatilho é o que você passar.
        </DocCartao>
        <DocCartao icone="🗂️" titulo="Painéis por item">
          Um item pode abrir o próprio painel abaixo da faixa — são os variantes{' '}
          <code style={{ fontFamily: MONO }}>Menu=Iniciativas</code> e{' '}
          <code style={{ fontFamily: MONO }}>Menu=Linguagem</code> do Figma.
        </DocCartao>
      </DocGrade>

      {/* 2. Figma e especificações */}
      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Medidas conferidas nos variantes Menu=Close (40x44) e Menu=Open (280x44)."
      />
      <div
        style={{
          backgroundColor: DOC_SUAVE,
          border: `1px solid ${DOC_BORDA}`,
          borderRadius: 12,
          padding: 20,
          marginBottom: 24,
        }}
      >
        <a
          href={`${FIGMA_FILE}?node-id=${FIGMA_NODE.replace(':', '-')}&m=dev`}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-block',
            backgroundColor: DOC_TEXTO,
            color: '#FFFFFF',
            fontSize: 12,
            fontWeight: 700,
            padding: '6px 14px',
            borderRadius: 999,
            textDecoration: 'none',
            marginBottom: 16,
          }}
        >
          Abrir no Figma Dev Mode →
        </a>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 12,
            fontSize: 13,
          }}
        >
          {[
            { label: 'Component set', value: 'Menu Desk · 21765:12693' },
            { label: 'Variantes', value: 'Close · Open · Iniciativas · Linguagem' },
            { label: 'Faixa', value: 'padding 4 · gap 4 · raio 12' },
            { label: 'Fundo da faixa', value: 'neutraldark-50 (5%)' },
            { label: 'Item', value: '34x34 · raio 8 · ícone 18' },
            { label: 'Fundo do item', value: 'neutrallight-700 (70%)' },
            { label: 'Item em hover', value: 'brandnavy-600 + dica abaixo' },
            { label: 'Item pressionado', value: 'brandnavy-800' },
            { label: 'Gatilho', value: '40x40 · avatar sm selecionado' },
            { label: 'Gap faixa/gatilho', value: '8px' },
            { label: 'Rótulo de texto', value: 'body-XXS semibold 12/18' },
            { label: 'Largura aberta', value: '280px (6 itens)' },
          ].map((spec) => (
            <div key={spec.label}>
              <div style={{ color: DOC_APAGADO, fontSize: 11, textTransform: 'uppercase' }}>
                {spec.label}
              </div>
              <div style={{ fontFamily: MONO, color: DOC_TEXTO }}>{spec.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          border: '1px solid #E31A1A',
          borderRadius: 12,
          padding: 20,
          marginBottom: 32,
          backgroundColor: 'rgba(227, 26, 26, 0.05)',
        }}
      >
        <h4 style={{ margin: '0 0 12px 0', fontSize: 15, color: '#E31A1A' }}>
          ⚠️ Desvios registrados em relação ao Figma
        </h4>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.7, color: DOC_TEXTO }}>
          <li>
            <strong>Duração e curva da animação não vêm do arquivo.</strong> O Figma não publica dado
            de movimento para este component set (<code style={{ fontFamily: MONO }}>get_motion_context</code>{' '}
            devolve vazio): não há transição de variante nem keyframe. Só a{' '}
            <em>direção</em> está no design, e ela vem da geometria. Duração e curva seguem a
            convenção já existente do pacote para abrir/fechar —{' '}
            <code style={{ fontFamily: MONO }}>0.3s cubic-bezier(0.4, 0, 0.2, 1)</code>, a mesma do{' '}
            <code style={{ fontFamily: MONO }}>Collapse</code>.
          </li>
          <li>
            <strong>A faixa é overlay, não reflow.</strong> No Figma o frame cresce de 40 para 280px.
            Aqui a faixa é posicionada fora de fluxo, ancorada no gatilho: o resultado visual no
            header é idêntico (à esquerda do avatar só há espaço vazio) e o gatilho fica imóvel. Em
            fluxo, abrir empurraria o resto da barra.
          </li>
          <li>
            <strong>Tema escuro não existe no arquivo.</strong> O <code style={{ fontFamily: MONO }}>Menu Desk</code>{' '}
            só é publicado no tema claro. O par escuro reusa os tokens{' '}
            <code style={{ fontFamily: MONO }}>neutraldark</code> do DS, como manda a seção 4.2 do
            AGENTS.md — não é um variante inventado do design.
          </li>
          <li>
            <strong>A dica não usa o <code style={{ fontFamily: MONO }}>Tooltip</code> do DS.</strong>{' '}
            O <code style={{ fontFamily: MONO }}>Tooltip</code> embrulha o filho num{' '}
            <code style={{ fontFamily: MONO }}>&lt;span&gt;</code>, e esse elemento genérico entraria
            entre o <code style={{ fontFamily: MONO }}>role=&quot;menu&quot;</code> e o{' '}
            <code style={{ fontFamily: MONO }}>role=&quot;menuitem&quot;</code>, quebrando a relação
            de posse da ARIA. A dica é um <code style={{ fontFamily: MONO }}>&lt;span aria-hidden&gt;</code>{' '}
            dentro do próprio botão, com os mesmos tokens do balão.
          </li>
        </ul>
      </div>

      {/* 3. Anatomia */}
      <UnooriaDocSectionHeader title="3. Anatomia do Componente" />
      <div
        style={{
          border: `1px solid ${DOC_BORDA}`,
          borderRadius: 12,
          overflow: 'hidden',
          marginBottom: 32,
        }}
      >
        {[
          {
            nome: '.unooria-header-menu',
            papel: 'Container relativo de 44px de altura. Carrega data-theme e data-state.',
            token: '--unooria-header-menu-altura',
          },
          {
            nome: '.unooria-header-menu__faixa',
            papel: 'role="menu" horizontal, ancorado à esquerda do gatilho. Some por opacidade + deslocamento.',
            token: '--unooria-color-opacity-neutraldark-50',
          },
          {
            nome: '.unooria-header-menu__item',
            papel: 'role="menuitem" de 34x34. Entra em escada, da direita para a esquerda.',
            token: '--unooria-color-opacity-neutrallight-700',
          },
          {
            nome: '.unooria-header-menu__dica',
            papel: 'Balão com o label, abaixo do item, no hover e no foco. aria-hidden.',
            token: '--unooria-color-opacity-neutrallight-900',
          },
          {
            nome: '.unooria-header-menu__gatilho',
            papel: 'Botão de 40px com aria-haspopup="menu" e aria-expanded. Recebe children ou o Avatar.',
            token: '--unooria-header-menu-gatilho',
          },
          {
            nome: '.unooria-header-menu__painel',
            papel: 'Painel suspenso do item que declara panel.',
            token: '--unooria-color-opacity-neutrallight-900',
          },
        ].map((zona, indice) => (
          <div
            key={zona.nome}
            style={{
              display: 'flex',
              gap: 14,
              padding: '12px 16px',
              borderTop: indice === 0 ? 'none' : `1px solid ${DOC_BORDA}`,
              backgroundColor: indice % 2 === 0 ? '#FFFFFF' : DOC_SUAVE,
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: 22,
                height: 22,
                borderRadius: 999,
                backgroundColor: DOC_TEXTO,
                color: '#FFFFFF',
                fontSize: 11,
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {indice + 1}
            </span>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 12.5, color: DOC_TEXTO }}>{zona.nome}</div>
              <div style={{ fontSize: 13, color: DOC_APAGADO, marginTop: 2 }}>{zona.papel}</div>
              <div style={{ fontFamily: MONO, fontSize: 11.5, color: '#6487C2', marginTop: 2 }}>
                {zona.token}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Matriz de estados */}
      <UnooriaDocSectionHeader
        title="4. Estados e Variantes"
        description="Clique no avatar para abrir. Passe o mouse nos itens para ver a dica; o último é o item destrutivo."
      />
      <DocPalco rotulo="Menu=Close → Menu=Open · a faixa completa do Figma">
        <HeaderMenu items={itensComRegistro} avatarSrc={RETRATO} avatarName="Helena Duarte" />
      </DocPalco>
      <div style={{ fontSize: 13, color: DOC_APAGADO, marginBottom: 24 }}>
        Última ação acionada: <strong style={{ color: DOC_TEXTO }}>{ultimaAcao}</strong>
      </div>

      <DocPalco rotulo="Item desabilitado e item pressionado (active)">
        <HeaderMenu
          defaultOpen
          avatarName="Helena Duarte"
          items={[
            { key: 'tema', label: 'Tema escuro', icon: 'dark_mode', active: true },
            { key: 'sino', label: 'Notificações (indisponível)', icon: 'notifications_active', disabled: true },
            { key: 'sair', label: 'Sair', icon: 'exit_to_app', danger: true },
          ]}
        />
      </DocPalco>

      <DocPalco rotulo="Gatilho plugável: um Logo em vez do avatar" altura={120}>
        <HeaderMenu items={ITENS_DA_PLATAFORMA} triggerLabel="Menu institucional">
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: 999,
              backgroundColor: '#FFFFFF',
            }}
          >
            <Logo.Symbol size="xs" />
          </span>
        </HeaderMenu>
      </DocPalco>

      {/* 5. Boas práticas */}
      <UnooriaDocSectionHeader title="5. Boas Práticas" />
      <DocPraticas
        faca={[
          'Coloque o Sair como ÚLTIMO item, com danger: true — no Figma ele é o exit_to_app encostado no gatilho.',
          'Escreva um label em todos os itens: ele é o nome acessível do botão, que só mostra ícone.',
          'Use text (no máximo 3 caracteres) para rótulos como PT ou EN, em vez de forçar um ícone.',
          'Desligue closeOnSelect quando o item alterna algo que o usuário quer ver sem reabrir o menu, como o tema.',
        ]}
        naoFaca={[
          'Não passe mais de 6 ou 7 itens: a faixa cresce sobre o header e come a barra inteira.',
          'Não use o HeaderMenu como navegação principal — ele é o menu de conta, não o menu do produto.',
          'Não repita o label dentro do item como texto visível: o botão é de 34px e o nome já vem do aria-label.',
          'Não marque dois itens como danger: o destrutivo perde o destaque que justifica a cor.',
        ]}
      />

      {/* 6. Suporte a temas */}
      <UnooriaDocSectionHeader
        title="6. Suporte a Temas (Light & Dark)"
        description="A marca (brandnavy) não muda entre temas; as superfícies mudam."
        actions={
          <div style={{ display: 'flex', gap: 8 }}>
            {(['light', 'dark'] as const).map((opcao) => (
              <button
                key={opcao}
                type="button"
                onClick={() => setTema(opcao)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: `1px solid ${tema === opcao ? DOC_TEXTO : DOC_BORDA}`,
                  backgroundColor: tema === opcao ? DOC_TEXTO : '#FFFFFF',
                  color: tema === opcao ? '#FFFFFF' : DOC_APAGADO,
                }}
              >
                {opcao === 'light' ? '☀️ Light' : '🌙 Dark'}
              </button>
            ))}
          </div>
        }
      />
      <DocPalco rotulo={`data-theme="${tema}"`} tema={tema}>
        <HeaderMenu
          defaultOpen
          theme={tema}
          items={ITENS_DO_FIGMA}
          avatarSrc={RETRATO}
          avatarName="Helena Duarte"
        />
      </DocPalco>

      {/* 7. Props */}
      <UnooriaDocSectionHeader title="7. Referência Completa de Props" />
      <DocTabela
        titulo="HeaderMenuProps"
        linhas={[
          { nome: 'items', tipo: 'HeaderMenuItem[]', descricao: 'Ações da faixa, da esquerda para a direita. O último fica encostado no gatilho.' },
          { nome: 'children', tipo: 'React.ReactNode', descricao: 'Conteúdo do gatilho. Omitido, monta o Avatar do DS em 40px.' },
          { nome: 'avatarSrc', tipo: 'string', descricao: 'Imagem do avatar padrão. Ignorado com children.' },
          { nome: 'avatarName', tipo: 'string', descricao: 'Nome do usuário; gera as iniciais do avatar padrão.' },
          { nome: 'avatarAlt', tipo: 'string', descricao: 'Texto alternativo da imagem do avatar padrão.' },
          { nome: 'triggerLabel', tipo: 'string', padrao: "'Menu da conta'", descricao: 'aria-label do gatilho e da faixa.' },
          { nome: 'open', tipo: 'boolean', descricao: 'Modo controlado. Informado, o componente não guarda estado próprio.' },
          { nome: 'defaultOpen', tipo: 'boolean', padrao: 'false', descricao: 'Estado inicial no modo não controlado.' },
          { nome: 'onOpenChange', tipo: '(open: boolean) => void', descricao: 'Disparado a cada mudança de abertura.' },
          { nome: 'closeOnSelect', tipo: 'boolean', padrao: 'true', descricao: 'Fecha o menu ao acionar item sem panel.' },
          { nome: 'showTooltips', tipo: 'boolean', padrao: 'true', descricao: 'Exibe a dica com o label no hover e no foco.' },
          { nome: 'theme', tipo: "'light' | 'dark'", padrao: "'light'", descricao: 'Tema visual do menu.' },
          { nome: 'className', tipo: 'string', descricao: 'Classes adicionais no container.' },
          { nome: 'style', tipo: 'React.CSSProperties', descricao: 'Estilos inline no container.' },
          { nome: 'id', tipo: 'string', descricao: 'Id do container; gerado com useId quando omitido.' },
        ]}
      />
      <DocTabela
        titulo="HeaderMenuItem"
        linhas={[
          { nome: 'key', tipo: 'string', descricao: 'Identificador único do item.' },
          { nome: 'label', tipo: 'string', descricao: 'Nome acessível (aria-label) e texto da dica. Nunca aparece em linha.' },
          { nome: 'icon', tipo: 'string', descricao: 'Ícone do Material Symbols Rounded, em 18px.' },
          { nome: 'text', tipo: 'string', descricao: 'Rótulo curto no lugar do ícone (ex: PT). Tem precedência sobre icon.' },
          { nome: 'danger', tipo: 'boolean', padrao: 'false', descricao: 'Pinta o item com a paleta de perigo. É o estado do Sair.' },
          { nome: 'disabled', tipo: 'boolean', padrao: 'false', descricao: 'Fora da navegação por setas, sem onClick, com aria-disabled.' },
          { nome: 'active', tipo: 'boolean', padrao: 'false', descricao: 'Mantém o item pressionado. Ignorado quando o item tem panel.' },
          { nome: 'panel', tipo: 'React.ReactNode', descricao: 'Painel suspenso aberto pelo item, abaixo da faixa.' },
          { nome: 'onClick', tipo: '(e: React.MouseEvent) => void', descricao: 'Callback de ativação (clique, Enter ou Espaço).' },
          { nome: 'className', tipo: 'string', descricao: 'Classes adicionais no item.' },
        ]}
      />

      <UnooriaDocSectionHeader
        title="8. Acessibilidade"
        description="O que o componente garante sem configuração."
      />
      <DocGrade min={260}>
        <DocCartao icone="⌨️" titulo="Teclado">
          Enter e Espaço abrem no gatilho. As setas (nos dois eixos) circulam entre os itens
          habilitados; Home e End vão às pontas. Tab fica preso na faixa enquanto o menu está aberto.
        </DocCartao>
        <DocCartao icone="↩️" titulo="Escape devolve o foco">
          Escape fecha e devolve o foco ao gatilho. Com um painel aberto, fecha primeiro o painel e
          devolve o foco ao item que o abriu.
        </DocCartao>
        <DocCartao icone="🔊" titulo="ARIA">
          Gatilho com <code style={{ fontFamily: MONO }}>aria-haspopup=&quot;menu&quot;</code>,{' '}
          <code style={{ fontFamily: MONO }}>aria-expanded</code> e{' '}
          <code style={{ fontFamily: MONO }}>aria-controls</code>. Faixa{' '}
          <code style={{ fontFamily: MONO }}>role=&quot;menu&quot;</code> horizontal com{' '}
          <code style={{ fontFamily: MONO }}>role=&quot;menuitem&quot;</code> diretos.
        </DocCartao>
        <DocCartao icone="🎚️" titulo="Movimento reduzido">
          Com <code style={{ fontFamily: MONO }}>prefers-reduced-motion: reduce</code> a faixa
          aparece sem deslocamento e sem escada — mas o atraso que tira o item da ordem de tabulação
          ao fechar permanece.
        </DocCartao>
      </DocGrade>
    </UnooriaDocShell>
  );
};

/* ==========================================================================
   Meta
   ========================================================================== */

const meta: Meta<typeof HeaderMenu> = {
  title: 'Plataforma Unooria/Componentes/HeaderMenu',
  component: HeaderMenu,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Ações da faixa, da esquerda para a direita',
    },
    avatarSrc: {
      control: 'text',
      description: 'Imagem do avatar do gatilho padrão',
    },
    avatarName: {
      control: 'text',
      description: 'Nome do usuário (iniciais do avatar padrão)',
    },
    avatarAlt: {
      control: 'text',
      description: 'Texto alternativo da imagem do avatar',
    },
    triggerLabel: {
      control: 'text',
      description: 'Nome acessível do gatilho e da faixa',
    },
    open: {
      control: 'boolean',
      description: 'Abertura controlada de fora',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Estado inicial de abertura (não controlado)',
    },
    closeOnSelect: {
      control: 'boolean',
      description: 'Fecha o menu ao acionar um item sem painel',
    },
    showTooltips: {
      control: 'boolean',
      description: 'Exibe a dica com o label no hover e no foco',
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Tema visual',
    },
    className: { control: 'text', description: 'Classes adicionais' },
    id: { control: 'text', description: 'Id do container' },
    onOpenChange: { action: 'onOpenChange' },
  },
  args: {
    items: ITENS_DO_FIGMA,
    avatarSrc: RETRATO,
    avatarName: 'Helena Duarte',
    avatarAlt: 'Foto de Helena Duarte',
    triggerLabel: 'Menu da conta',
    defaultOpen: false,
    closeOnSelect: true,
    showTooltips: true,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof HeaderMenu>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <HeaderMenuDocumentationPage />,
};

/**
 * Playground interativo com 100% das props mapeadas em controles.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do HeaderMenu',
  render: (args) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 40,
        minHeight: 220,
        backgroundColor: args.theme === 'dark' ? '#22272A' : '#F5F5F5',
        borderRadius: 12,
      }}
    >
      <HeaderMenu {...args} />
    </div>
  ),
};

/**
 * Réplica do component set `Menu Desk` (Node 21765:12693): as duas pontas do
 * variante — recolhido e expandido — lado a lado.
 */
export const ExemploOficialFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma (Node 21765:12693)',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        padding: 40,
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
      }}
    >
      <div>
        <div style={{ fontSize: 12, fontFamily: MONO, color: DOC_APAGADO, marginBottom: 8 }}>
          Menu=Close · 40x44
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <HeaderMenu items={ITENS_DO_FIGMA} avatarSrc={RETRATO} avatarName="Helena Duarte" />
        </div>
      </div>
      <div>
        <div style={{ fontSize: 12, fontFamily: MONO, color: DOC_APAGADO, marginBottom: 8 }}>
          Menu=Open · 280x44
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <HeaderMenu
            defaultOpen
            items={ITENS_DO_FIGMA}
            avatarSrc={RETRATO}
            avatarName="Helena Duarte"
          />
        </div>
      </div>
    </div>
  ),
};

/**
 * O caso que motivou o componente: o header da Plataforma com a identidade do
 * usuário e o logoff dentro do submenu do avatar, em vez de um botão solto.
 */
export const HeaderDaPlataforma: Story = {
  name: 'Caso real — identidade e Sair no submenu do avatar',
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        padding: '12px 24px',
        minHeight: 180,
        alignContent: 'flex-start',
        backgroundColor: '#FFFFFF',
        border: `1px solid ${DOC_BORDA}`,
        borderRadius: 12,
      }}
    >
      <Logo size="sm" />

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ textAlign: 'right', lineHeight: 1.3 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: DOC_TEXTO }}>Helena Duarte</div>
          <div style={{ fontSize: 12, color: DOC_APAGADO }}>Professora · EE Jardim das Flores</div>
        </div>
        <HeaderMenu
          avatarSrc={RETRATO}
          avatarName="Helena Duarte"
          triggerLabel="Menu da conta de Helena Duarte"
          items={[
            { key: 'perfil', label: 'Meu perfil', icon: 'account_circle' },
            { key: 'ajustes', label: 'Preferências', icon: 'settings' },
            { key: 'sair', label: 'Sair', icon: 'exit_to_app', danger: true },
          ]}
        />
      </div>
    </div>
  ),
};

/**
 * Itens com painel suspenso — os variantes `Menu=Iniciativas` e
 * `Menu=Linguagem` do Figma.
 */
export const ComPaineis: Story = {
  name: 'Itens com painel suspenso',
  render: () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 40,
        minHeight: 380,
        alignItems: 'flex-start',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
      }}
    >
      <HeaderMenu
        defaultOpen
        avatarName="Helena Duarte"
        avatarSrc={RETRATO}
        items={[
          {
            key: 'iniciativas',
            label: 'Iniciativas',
            icon: 'apps',
            panel: (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 240 }}>
                {['Aprendizagem Industrial', 'Carreira e empregabilidade', 'Futuro Digital', 'Mundo Senai'].map(
                  (nome) => (
                    <span
                      key={nome}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '8px 12px',
                        borderRadius: 8,
                        fontSize: 14,
                      }}
                    >
                      <Icon name="school" size={18} color="var(--unooria-color-brandnavy-700)" />
                      {nome}
                    </span>
                  )
                )}
              </div>
            ),
          },
          {
            key: 'idioma',
            label: 'Idioma',
            text: 'PT',
            panel: (
              <div style={{ minWidth: 200 }}>
                <div style={{ padding: '8px 12px', fontSize: 14, fontWeight: 600 }}>
                  Selecione o Idioma
                </div>
                {['Português', 'Inglês', 'Espanhol'].map((idioma) => (
                  <div key={idioma} style={{ padding: '8px 12px', fontSize: 14 }}>
                    {idioma}
                  </div>
                ))}
              </div>
            ),
          },
          { key: 'sair', label: 'Sair', icon: 'exit_to_app', danger: true },
        ]}
      />
    </div>
  ),
};

/**
 * Matriz dos dois temas, lado a lado.
 */
export const Temas: Story = {
  name: 'Temas (Light & Dark)',
  render: () => (
    <div style={{ display: 'grid', gap: 20 }}>
      {(['light', 'dark'] as const).map((tema) => (
        <div
          key={tema}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            minHeight: 140,
            padding: 32,
            borderRadius: 12,
            backgroundColor: tema === 'dark' ? '#22272A' : '#F5F5F5',
          }}
        >
          <HeaderMenu
            defaultOpen
            theme={tema}
            items={ITENS_DO_FIGMA}
            avatarSrc={RETRATO}
            avatarName="Helena Duarte"
          />
        </div>
      ))}
    </div>
  ),
};

/* ==========================================================================
   Estórias de comportamento — a suíte do `npm test` monta cada uma num
   Chromium real, então o `play` é onde o contrato de interação é provado.
   ========================================================================== */

/** Palco mínimo e estável para as estórias de comportamento. */
const PalcoDeTeste: React.FC<{
  itens: HeaderMenuItem[];
  onOpenChange?: (open: boolean) => void;
}> = ({ itens, onOpenChange }) => (
  <div style={{ padding: 40, minHeight: 240, backgroundColor: '#F5F5F5' }}>
    <button type="button" data-testid="fora">
      Elemento fora do menu
    </button>
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
      <HeaderMenu items={itens} avatarName="Helena Duarte" onOpenChange={onOpenChange} />
    </div>
  </div>
);

/**
 * Abre no clique do gatilho e fecha no segundo clique, refletindo em
 * `aria-expanded` e em `onOpenChange`.
 */
export const TesteAbreEFecha: Story = {
  name: '🧪 Abre e fecha no gatilho',
  render: () => {
    const registro = fn();
    return <PalcoDeTeste itens={ITENS_DA_PLATAFORMA} onOpenChange={registro} />;
  },
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const gatilho = tela.getByRole('button', { name: 'Menu da conta' });

    await expect(gatilho).toHaveAttribute('aria-expanded', 'false');
    await expect(tela.queryAllByRole('menuitem')).toHaveLength(0);

    await userEvent.click(gatilho);

    await expect(gatilho).toHaveAttribute('aria-expanded', 'true');
    await expect(tela.getAllByRole('menuitem')).toHaveLength(3);
    await expect(tela.getByRole('menuitem', { name: 'Sair' })).toBeInTheDocument();

    await userEvent.click(gatilho);

    await expect(gatilho).toHaveAttribute('aria-expanded', 'false');
    /* A faixa só sai da árvore depois do atraso de `visibility`. */
    await waitFor(() => expect(tela.queryAllByRole('menuitem')).toHaveLength(0));
  },
};

/**
 * Escape fecha o menu E devolve o foco ao gatilho — o que o
 * `TableDropdownMenu` não fazia.
 */
export const TesteEscapeDevolveFoco: Story = {
  name: '🧪 Escape fecha e devolve o foco ao gatilho',
  render: () => <PalcoDeTeste itens={ITENS_DA_PLATAFORMA} />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const gatilho = tela.getByRole('button', { name: 'Menu da conta' });

    await userEvent.click(gatilho);
    /* Ao abrir, o foco entra na faixa pelo primeiro item habilitado. */
    await waitFor(() =>
      expect(tela.getByRole('menuitem', { name: 'Meu perfil' })).toHaveFocus()
    );

    await userEvent.keyboard('{Escape}');

    await expect(gatilho).toHaveAttribute('aria-expanded', 'false');
    await expect(gatilho).toHaveFocus();
    await waitFor(() => expect(tela.queryAllByRole('menuitem')).toHaveLength(0));
  },
};

/**
 * Clique fora fecha o menu.
 */
export const TesteCliqueFora: Story = {
  name: '🧪 Clique fora fecha o menu',
  render: () => <PalcoDeTeste itens={ITENS_DA_PLATAFORMA} />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const gatilho = tela.getByRole('button', { name: 'Menu da conta' });

    await userEvent.click(gatilho);
    await expect(gatilho).toHaveAttribute('aria-expanded', 'true');

    await userEvent.click(tela.getByTestId('fora'));

    await expect(gatilho).toHaveAttribute('aria-expanded', 'false');
    await waitFor(() => expect(tela.queryAllByRole('menuitem')).toHaveLength(0));
  },
};

/**
 * As setas circulam entre os itens habilitados, com volta nas pontas, e pulam
 * o item desabilitado.
 */
export const TesteNavegacaoPorSetas: Story = {
  name: '🧪 Setas navegam e pulam o item desabilitado',
  render: () => (
    <PalcoDeTeste
      itens={[
        { key: 'perfil', label: 'Meu perfil', icon: 'account_circle' },
        { key: 'sino', label: 'Notificações', icon: 'notifications_active', disabled: true },
        { key: 'sair', label: 'Sair', icon: 'exit_to_app', danger: true },
      ]}
    />
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const gatilho = tela.getByRole('button', { name: 'Menu da conta' });

    await userEvent.click(gatilho);

    const perfil = tela.getByRole('menuitem', { name: 'Meu perfil' });
    const sair = tela.getByRole('menuitem', { name: 'Sair' });

    await waitFor(() => expect(perfil).toHaveFocus());

    /* Direita pula o desabilitado e cai no Sair. */
    await userEvent.keyboard('{ArrowRight}');
    await expect(sair).toHaveFocus();

    /* Direita de novo dá a volta para o primeiro. */
    await userEvent.keyboard('{ArrowRight}');
    await expect(perfil).toHaveFocus();

    /* Esquerda a partir do primeiro dá a volta para o último. */
    await userEvent.keyboard('{ArrowLeft}');
    await expect(sair).toHaveFocus();

    /* Home e End vão às pontas habilitadas. */
    await userEvent.keyboard('{Home}');
    await expect(perfil).toHaveFocus();
    await userEvent.keyboard('{End}');
    await expect(sair).toHaveFocus();
  },
};

/**
 * O `onClick` do item dispara e o menu fecha; o item desabilitado não dispara.
 */
export const TesteAcionamentoDeItem: Story = {
  name: '🧪 Item dispara onClick e fecha; desabilitado não dispara',
  render: () => {
    const aoSair = fn();
    const aoNotificar = fn();
    return (
      <div style={{ padding: 40, minHeight: 240, backgroundColor: '#F5F5F5' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <HeaderMenu
            avatarName="Helena Duarte"
            items={[
              {
                key: 'sino',
                label: 'Notificações',
                icon: 'notifications_active',
                disabled: true,
                onClick: aoNotificar,
              },
              { key: 'sair', label: 'Sair', icon: 'exit_to_app', danger: true, onClick: aoSair },
            ]}
          />
        </div>
        <div data-testid="placar" style={{ marginTop: 24, fontSize: 13 }}>
          <span data-testid="chamadas-sair">{String(aoSair.mock.calls.length)}</span>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const gatilho = tela.getByRole('button', { name: 'Menu da conta' });

    await userEvent.click(gatilho);

    const sino = tela.getByRole('menuitem', { name: 'Notificações' });
    await expect(sino).toHaveAttribute('aria-disabled', 'true');

    /* O desabilitado não fecha o menu — prova indireta de que não acionou. */
    await userEvent.click(sino);
    await expect(gatilho).toHaveAttribute('aria-expanded', 'true');

    /* O Sair aciona e fecha, devolvendo o foco ao gatilho. */
    await userEvent.click(tela.getByRole('menuitem', { name: 'Sair' }));
    await expect(gatilho).toHaveAttribute('aria-expanded', 'false');
    await expect(gatilho).toHaveFocus();
    await waitFor(() => expect(tela.queryAllByRole('menuitem')).toHaveLength(0));
  },
};

/**
 * Item com painel: o clique alterna o painel em vez de fechar o menu, e Escape
 * fecha primeiro o painel.
 */
export const TestePainelDoItem: Story = {
  name: '🧪 Item com painel alterna sem fechar o menu',
  render: () => (
    <div style={{ padding: 40, minHeight: 320, backgroundColor: '#F5F5F5' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <HeaderMenu
          avatarName="Helena Duarte"
          items={[
            {
              key: 'idioma',
              label: 'Idioma',
              text: 'PT',
              panel: <div data-testid="painel-idioma">Selecione o Idioma</div>,
            },
            { key: 'sair', label: 'Sair', icon: 'exit_to_app', danger: true },
          ]}
        />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const gatilho = tela.getByRole('button', { name: 'Menu da conta' });

    await userEvent.click(gatilho);

    const idioma = tela.getByRole('menuitem', { name: 'Idioma' });
    await expect(idioma).toHaveAttribute('aria-expanded', 'false');
    await expect(tela.queryByTestId('painel-idioma')).not.toBeInTheDocument();

    await userEvent.click(idioma);

    /* Abriu o painel e o menu continua aberto. */
    await expect(idioma).toHaveAttribute('aria-expanded', 'true');
    await expect(tela.getByTestId('painel-idioma')).toBeInTheDocument();
    await expect(gatilho).toHaveAttribute('aria-expanded', 'true');

    /* Escape fecha só o painel, devolvendo o foco ao item. */
    await userEvent.keyboard('{Escape}');
    await expect(tela.queryByTestId('painel-idioma')).not.toBeInTheDocument();
    await expect(gatilho).toHaveAttribute('aria-expanded', 'true');
    await expect(idioma).toHaveFocus();

    /* O segundo Escape fecha o menu. */
    await userEvent.keyboard('{Escape}');
    await expect(gatilho).toHaveAttribute('aria-expanded', 'false');
    await expect(gatilho).toHaveFocus();
  },
};

/**
 * O gatilho plugável: qualquer nó React no lugar do avatar padrão.
 */
export const TesteGatilhoPlugavel: Story = {
  name: '🧪 Gatilho plugável abre pelo teclado',
  render: () => (
    <div style={{ padding: 40, minHeight: 240, backgroundColor: '#F5F5F5' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <HeaderMenu items={ITENS_DA_PLATAFORMA} triggerLabel="Conta de Helena">
          <Avatar as="span" size="sm" name="Helena Duarte" state="selected" />
        </HeaderMenu>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const gatilho = tela.getByRole('button', { name: 'Conta de Helena' });

    await expect(gatilho).toHaveAttribute('aria-haspopup', 'menu');

    /* Enter no gatilho focado abre o menu. */
    gatilho.focus();
    await expect(gatilho).toHaveFocus();
    await userEvent.keyboard('{Enter}');

    await expect(gatilho).toHaveAttribute('aria-expanded', 'true');
    await waitFor(() =>
      expect(tela.getByRole('menuitem', { name: 'Meu perfil' })).toHaveFocus()
    );
  },
};
