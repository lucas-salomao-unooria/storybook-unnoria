import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../../../src/unooria/components/Tooltip/Tooltip';
import { Button } from '../../../src/unooria/components/Button/Button';
import { Icon } from '../../../src/unooria/components/Icon/Icon';
import { Tag } from '../../../src/unooria/components/Tag/Tag';
import '../../../src/unooria/tokens/icons.css';
import '../../../src/unooria/components/Tooltip/Tooltip.css';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

/**
 * Demonstração de Casos de Uso Práticos na Interface
 */
const PracticalExamplesDemo: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E4E8E9',
        padding: '32px',
        maxWidth: '680px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 700, color: '#22272A' }}>
          Casos de Uso em Componentes da Plataforma
        </h4>
        <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
          Passe o mouse ou navegue com o teclado sobre os elementos abaixo.
        </p>
      </div>

      {/* 1. Botões de Ação Rápida */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#475157' }}>1. Botões de Ação na Toolbar:</span>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Tooltip content="Adicionar novo registro ao sistema" placement="top">
            <Button variant="primary">
              <Icon name="add" size="xs" color="currentColor" /> Adicionar
            </Button>
          </Tooltip>

          <Tooltip content="Baixar relatório em formato PDF" placement="top">
            <Button variant="secondary">
              <Icon name="download" size="xs" color="currentColor" /> Exportar
            </Button>
          </Tooltip>

          <Tooltip content="Excluir item permanentemente da base" placement="top">
            <button
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                border: '1px solid #FECACA',
                backgroundColor: '#FEF2F2',
                color: '#DC2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Icon name="delete" size="xs" color="currentColor" />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* 2. Ícones de Ajuda em Formulários */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#475157' }}>2. Ícone de Ajuda em Formulários:</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '14px', fontWeight: 600, color: '#22272A' }}>
            Código de Verificação CVV
          </label>
          <Tooltip
            content="Os 3 dígitos de segurança impressos no verso do seu cartão bancário."
            placement="right"
          >
            <span style={{ cursor: 'help', color: '#0086FF', display: 'inline-flex' }}>
              <Icon name="help" size="xs" color="currentColor" />
            </span>
          </Tooltip>
        </div>
      </div>

      {/* 3. Tags de Status com Informação Adicional */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#475157' }}>3. Etiquetas de Status com Detalhes:</span>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Tooltip content="O fornecedor atendeu a 100% dos critérios de compliance" placement="top-start">
            <div>
              <Tag variant="success" pill>Homologado</Tag>
            </div>
          </Tooltip>

          <Tooltip content="Documentação fiscal pendente de envio há mais de 5 dias" placement="top">
            <div>
              <Tag variant="warning" pill>Em Análise</Tag>
            </div>
          </Tooltip>

          <Tooltip content="Fornecedor inativado devido a pendências cadastrais" placement="top-end">
            <div>
              <Tag variant="danger" pill>Bloqueado</Tag>
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

/**
 * Página principal de documentação rica do componente Tooltip (Padrão Ouro)
 */
const TooltipDocumentationPage: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Dicas & Informações"
        title="Tooltip"
        description="O Tooltip (Balão de Dica Contextual) fornece instruções e orientações breves e temporárias sem sobrecarregar a interface, com acabamento Glassmorphism e posicionamento direcional inteligente."
      />

      {/* =========================================================================
          SEÇÃO 1: ESPECIFICAÇÃO VISUAL FIEL DO FIGMA (Node 6034:1092)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#22272A', margin: '0 0 4px 0' }}>
              Especificação Visual Figma (Node 6034:1092)
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
              Design, proporções e acabamento com gradiente holográfico e Glassmorphism conforme o Figma.
            </p>
          </div>
          <a
            href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=6034-1092&m=dev"
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

        {/* CONTAINER DO FIGMA COM GRADIENTE HOLOGRÁFICO */}
        <div
          style={{
            background: 'linear-gradient(145deg, #090B19 0%, #0E1039 25%, #18284A 55%, #3C5B8B 80%, #7FA5E2 100%)',
            borderRadius: '32px',
            padding: '48px',
            boxShadow: '0 15px 35px rgba(0,0,0,0.25)',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            color: '#FFFFFF',
          }}
        >
          {/* Header do Frame Figma */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '14px', color: '#CBD4D6', fontWeight: 400 }}>Foundations</span>
            <h1 style={{ fontSize: '34px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 16px 0', lineHeight: 1.2 }}>
              Tooltip
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#E4E8E9', lineHeight: 1.6 }}>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#FFFFFF' }}>O que são:</strong> Uma tooltip é uma pequena caixa de texto que aparece quando o usuário interage
                com um elemento da interface, oferecendo informações adicionais sem ocupar espaço visual fixo. Sua função é fornecer orientação contextual,
                evitando sobrecarga de informações. É importante que a tooltip seja discreta, mas legível, com contraste adequado para garantir boa visualização.
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#FFFFFF' }}>Exemplo visual:</strong> Um exemplo típico de tooltip é quando o usuário passa o mouse sobre um ícone de ajuda
                (como um ponto de interrogação), e uma pequena caixa surge com uma breve explicação. Ela desaparece quando o cursor sai do ícone, sendo exibida de forma temporária e contextual.
              </p>
            </div>
          </div>

          {/* Demonstração das Variantes do Figma sobre o Fundo Holográfico */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '28px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#E4E8E9', textTransform: 'uppercase', marginBottom: '24px', display: 'block' }}>
              Demonstração dos Balões Glassmorphism do Figma (Passe o mouse ou toque)
            </span>

            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Tooltip content="Tooltip Top Center" placement="top" defaultOpen>
                <div style={{ padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', fontSize: '13px' }}>
                  Top Center
                </div>
              </Tooltip>

              <Tooltip content="Tooltip Top Left" placement="top-start" defaultOpen>
                <div style={{ padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', fontSize: '13px' }}>
                  Top Left
                </div>
              </Tooltip>

              <Tooltip content="Tooltip Top Right" placement="top-end" defaultOpen>
                <div style={{ padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', fontSize: '13px' }}>
                  Top Right
                </div>
              </Tooltip>

              <Tooltip content="Tooltip Sem Seta" placement="none" defaultOpen>
                <div style={{ padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', fontSize: '13px' }}>
                  Sem Seta
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 2: MATRIZ DE TODOS OS 13 POSICIONAMENTOS
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Matriz dos 13 Posicionamentos Oficiais"
          description="Todas as posições direcionais com suporte a cantos inteligentes na ponta da seta."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {/* Top Placements */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E4E8E9', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#0086FF' }}>Posições Superiores (Top)</span>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Tooltip content="Tooltip Superior Central" placement="top">
                <Button variant="secondary" size="s">top</Button>
              </Tooltip>
              <Tooltip content="Tooltip Superior Início" placement="top-start">
                <Button variant="secondary" size="s">top-start</Button>
              </Tooltip>
              <Tooltip content="Tooltip Superior Fim" placement="top-end">
                <Button variant="secondary" size="s">top-end</Button>
              </Tooltip>
            </div>
          </div>

          {/* Bottom Placements */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E4E8E9', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#0086FF' }}>Posições Inferiores (Bottom)</span>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Tooltip content="Tooltip Inferior Central" placement="bottom">
                <Button variant="secondary" size="s">bottom</Button>
              </Tooltip>
              <Tooltip content="Tooltip Inferior Início" placement="bottom-start">
                <Button variant="secondary" size="s">bottom-start</Button>
              </Tooltip>
              <Tooltip content="Tooltip Inferior Fim" placement="bottom-end">
                <Button variant="secondary" size="s">bottom-end</Button>
              </Tooltip>
            </div>
          </div>

          {/* Left Placements */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E4E8E9', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#0086FF' }}>Posições Laterais (Left)</span>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Tooltip content="Tooltip Lateral Esquerda" placement="left">
                <Button variant="secondary" size="s">left</Button>
              </Tooltip>
              <Tooltip content="Tooltip Esquerda Topo" placement="left-start">
                <Button variant="secondary" size="s">left-start</Button>
              </Tooltip>
              <Tooltip content="Tooltip Esquerda Base" placement="left-end">
                <Button variant="secondary" size="s">left-end</Button>
              </Tooltip>
            </div>
          </div>

          {/* Right Placements */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E4E8E9', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#0086FF' }}>Posições Laterais (Right)</span>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Tooltip content="Tooltip Lateral Direita" placement="right">
                <Button variant="secondary" size="s">right</Button>
              </Tooltip>
              <Tooltip content="Tooltip Direita Topo" placement="right-start">
                <Button variant="secondary" size="s">right-start</Button>
              </Tooltip>
              <Tooltip content="Tooltip Direita Base" placement="right-end">
                <Button variant="secondary" size="s">right-end</Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 3: EXEMPLOS PRÁTICOS NA INTERFACE
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Casos Práticos de Aplicação"
          description="Integração com botões de ação, formulários e etiquetas de status."
        />

        <PracticalExamplesDemo />
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
            padding: '40px',
            display: 'flex',
            gap: '32px',
            flexWrap: 'wrap',
            transition: 'all 0.2s ease',
          }}
        >
          <Tooltip
            theme={activeTheme}
            content="Tooltip no tema selecionado com Glassmorphism ativo"
            placement="top"
            defaultOpen
          >
            <Button variant="primary">Passe o mouse aqui</Button>
          </Tooltip>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 5: BOAS PRÁTICAS DE USO (DO & DON'T)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Boas Práticas de Uso (DO & DON'T)"
          description="Diretrizes para garantir a melhor clareza e acessibilidade em dicas contextuais."
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
                <strong>Mantenha o texto conciso e direto:</strong> Apenas uma ou duas frases curtas de apoio.
              </li>
              <li>
                <strong>Use para explicar ícones sem rótulo textual:</strong> Melhora a compreensão imediata de botões de ação.
              </li>
              <li>
                <strong>Permita ativação via foco de teclado (Tab):</strong> Garante total acessibilidade motora.
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
                <strong>Não inclua informações críticas ou essenciais para a tarefa:</strong> Tooltips não são visíveis em dispositivos touch sem toque prévio.
              </li>
              <li>
                <strong>Não coloque links ou botões clicáveis dentro da Tooltip:</strong> Para conteúdo interativo com links, utilize `Popover` ou `Modal`.
              </li>
              <li>
                <strong>Não repita exatamente o mesmo texto do botão:</strong> A dica deve agregar valor contextual novo.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof Tooltip> = {
  title: 'Plataforma Unooria/Componentes/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
        'none',
      ],
      description: 'Posicionamento do balão',
      defaultValue: 'top',
    },
    showArrow: {
      control: 'boolean',
      description: 'Exibir seta indicadora',
      defaultValue: true,
    },
    content: {
      control: 'text',
      description: 'Texto do balão',
    },
    enterDelay: {
      control: 'number',
      description: 'Delay de abertura (ms)',
      defaultValue: 150,
    },
    leaveDelay: {
      control: 'number',
      description: 'Delay de fechamento (ms)',
      defaultValue: 100,
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilitar exibição',
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
    placement: 'top',
    showArrow: true,
    content: 'Esta é uma dica contextual informativa.',
    enterDelay: 150,
    leaveDelay: 100,
    disabled: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TooltipDocumentationPage />,
};

/**
 * Playground interativo com 100% das props mapeadas em controles.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground Interativo',
  render: (args) => (
    <div style={{ padding: '60px', display: 'flex', justifyContent: 'center', backgroundColor: args.theme === 'dark' ? '#181C1E' : '#FFFFFF', borderRadius: '16px' }}>
      <Tooltip {...args}>
        <Button variant="primary">Passe o mouse aqui</Button>
      </Tooltip>
    </div>
  ),
};

/**
 * Réplica visual 1:1 dos frames oficiais do Figma (Node 6034:1092).
 */
export const ExemploOficialFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma (Node 6034:1092)',
  render: () => (
    <div
      style={{
        background: 'linear-gradient(145deg, #090B19 0%, #0E1039 25%, #18284A 55%, #3C5B8B 80%, #7FA5E2 100%)',
        borderRadius: '32px',
        padding: '48px',
        maxWidth: '600px',
        boxShadow: '0 15px 35px rgba(0,0,0,0.25)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        color: '#FFFFFF',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontSize: '14px', color: '#CBD4D6' }}>Foundations</span>
        <h1 style={{ fontSize: '34px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 12px 0', lineHeight: 1.2 }}>
          Tooltip
        </h1>
        <p style={{ margin: 0, fontSize: '13px', color: '#E4E8E9', lineHeight: 1.6 }}>
          Uma tooltip é uma pequena caixa de texto que aparece quando o usuário interage com um elemento da interface.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', paddingTop: '16px' }}>
        <Tooltip content="Top Center" placement="top" defaultOpen>
          <span style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', fontSize: '12px' }}>
            Top Center
          </span>
        </Tooltip>

        <Tooltip content="Top Left" placement="top-start" defaultOpen>
          <span style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', fontSize: '12px' }}>
            Top Left
          </span>
        </Tooltip>

        <Tooltip content="Top Right" placement="top-end" defaultOpen>
          <span style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', fontSize: '12px' }}>
            Top Right
          </span>
        </Tooltip>
      </div>
    </div>
  ),
};

/**
 * Matriz de Todos os 13 Posicionamentos
 */
export const TodosOsPosicionamentos: Story = {
  name: 'Todos os 13 Posicionamentos',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', padding: '40px', maxWidth: '640px' }}>
      <Tooltip content="top-start" placement="top-start">
        <Button variant="secondary" size="s">top-start</Button>
      </Tooltip>
      <Tooltip content="top" placement="top">
        <Button variant="secondary" size="s">top</Button>
      </Tooltip>
      <Tooltip content="top-end" placement="top-end">
        <Button variant="secondary" size="s">top-end</Button>
      </Tooltip>

      <Tooltip content="left-start" placement="left-start">
        <Button variant="secondary" size="s">left-start</Button>
      </Tooltip>
      <Tooltip content="none" placement="none">
        <Button variant="secondary" size="s">none</Button>
      </Tooltip>
      <Tooltip content="right-start" placement="right-start">
        <Button variant="secondary" size="s">right-start</Button>
      </Tooltip>

      <Tooltip content="left" placement="left">
        <Button variant="secondary" size="s">left</Button>
      </Tooltip>
      <div />
      <Tooltip content="right" placement="right">
        <Button variant="secondary" size="s">right</Button>
      </Tooltip>

      <Tooltip content="left-end" placement="left-end">
        <Button variant="secondary" size="s">left-end</Button>
      </Tooltip>
      <div />
      <Tooltip content="right-end" placement="right-end">
        <Button variant="secondary" size="s">right-end</Button>
      </Tooltip>

      <Tooltip content="bottom-start" placement="bottom-start">
        <Button variant="secondary" size="s">bottom-start</Button>
      </Tooltip>
      <Tooltip content="bottom" placement="bottom">
        <Button variant="secondary" size="s">bottom</Button>
      </Tooltip>
      <Tooltip content="bottom-end" placement="bottom-end">
        <Button variant="secondary" size="s">bottom-end</Button>
      </Tooltip>
    </div>
  ),
};

/**
 * Exemplos Práticos
 */
export const ExemplosPraticos: Story = {
  name: 'Exemplos Práticos',
  render: () => <PracticalExamplesDemo />,
};
