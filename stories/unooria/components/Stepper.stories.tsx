import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from '../../../src/unooria/components/Stepper/Stepper';
import { Step } from '../../../src/unooria/components/Stepper/Step';
import { Icon } from '../../../src/unooria/components/Icon/Icon';
import '../../../src/unooria/tokens/icons.css';
import '../../../src/unooria/components/Stepper/Stepper.css';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

/**
 * Componente de demonstração de fluxo interativo
 */
const InteractiveFlowSimulator: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const stepsData = [
    { label: 'Dados Pessoais', icon: 'person', description: 'Nome, CPF e e-mail' },
    { label: 'Endereço', icon: 'home', description: 'CEP e logradouro' },
    { label: 'Forma de Pagamento', icon: 'credit_card', description: 'Cartão ou Pix' },
    { label: 'Confirmação', icon: 'check_circle', description: 'Revisão final' },
  ];

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E4E8E9',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}
    >
      <Stepper
        steps={stepsData}
        currentStep={activeStep}
        onStepClick={(index) => setActiveStep(index)}
      />

      {/* Conteúdo da Etapa Ativa */}
      <div
        style={{
          padding: '24px',
          backgroundColor: '#F8FAFC',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          minHeight: '120px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Icon name={stepsData[activeStep].icon} size="s" color="#0086FF" />
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#22272A' }}>
            Etapa {activeStep + 1}: {stepsData[activeStep].label}
          </h3>
        </div>
        <p style={{ margin: 0, fontSize: '14px', color: '#64748B' }}>
          {stepsData[activeStep].description}. Preencha as informações necessárias para avançar para o próximo passo.
        </p>
      </div>

      {/* Controles de Navegação */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          type="button"
          disabled={activeStep === 0}
          onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: '1px solid #CBD5E1',
            backgroundColor: '#FFFFFF',
            color: activeStep === 0 ? '#94A3B8' : '#334155',
            fontSize: '14px',
            fontWeight: 600,
            cursor: activeStep === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          ← Voltar
        </button>

        <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>
          Passo {activeStep + 1} de {stepsData.length}
        </span>

        <button
          type="button"
          disabled={activeStep === stepsData.length - 1}
          onClick={() => setActiveStep((prev) => Math.min(stepsData.length - 1, prev + 1))}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: activeStep === stepsData.length - 1 ? '#94A3B8' : '#0086FF',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: 600,
            cursor: activeStep === stepsData.length - 1 ? 'not-allowed' : 'pointer',
          }}
        >
          {activeStep === stepsData.length - 2 ? 'Finalizar →' : 'Próximo →'}
        </button>
      </div>
    </div>
  );
};

/**
 * Página principal de documentação rica do componente Stepper (Padrão Ouro)
 */
const StepperDocumentationPage: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Navegação & Fluxos"
        title="Stepper"
        description="Um Stepper é um componente de interface que guia o usuário por meio de uma sequência de etapas ou fases em um processo longo, como cadastros, checkouts ou formulários com múltiplas seções, destacando visualmente a etapa atual e conectando o progresso."
      />

      {/* =========================================================================
          SEÇÃO 1: ESPECIFICAÇÃO VISUAL FIEL DO FIGMA (Node 12694:10079)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#22272A', margin: '0 0 4px 0' }}>
              Especificação Visual Figma (Node 12694:10079)
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
              Design, proporções e montagem exatas conforme especificadas na prancha oficial do Figma para o Stepper.
            </p>
          </div>
          <a
            href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=12694-10079&m=dev"
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
            gap: '40px',
          }}
        >
          {/* Header do Frame Figma */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'inline-flex' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#0E1039',
                  backgroundColor: '#BDD0EF',
                  padding: '4px 8px',
                  borderRadius: '4px',
                }}
              >
                Componentes
              </span>
            </div>
            <h1 style={{ fontSize: '34px', fontWeight: 700, color: '#0E1039', margin: '4px 0 12px 0', lineHeight: '48px' }}>
              Stepper
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#475157', lineHeight: '20px' }}>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#22272A' }}>O que são:</strong> Um Stepper é um componente de interface que guia o usuário
                por meio de uma sequência de etapas ou fases em um processo. Ele é especialmente útil em fluxos longos, como cadastros,
                checkouts ou formulários com múltiplas seções. O Stepper divide esse processo em partes menores, facilitando a
                compreensão do progresso e ajudando o usuário a saber onde está e o que ainda falta ser preenchido.
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#22272A' }}>Exemplo visual:</strong> Em um formulário de inscrição com várias fases
                (como "Dados Pessoais", "Endereço" e "Confirmação"), o Stepper apresenta essas etapas em linha, geralmente no
                topo do formulário, destacando a etapa atual e marcando a anterior como concluída.
              </p>
            </div>
          </div>

          {/* Catálogo de Variantes do Component Set Figma (Default vs Selected) */}
          <div style={{ borderTop: '1px solid #E4E8E9', paddingTop: '28px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#7C8E94', textTransform: 'uppercase', marginBottom: '16px', display: 'block' }}>
              Catálogo de Variantes do Figma (Component Set `Step`)
            </span>
            <div style={{ display: 'flex', gap: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
              {/* Variante 1: Default */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Default</span>
                <Step label="Example Text" icon="add" status="default" />
              </div>

              {/* Variante 2: Selected */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Selected</span>
                <Step label="Example Text" icon="add" status="selected" />
              </div>
            </div>
          </div>

          {/* Montagem Oficial do Fluxo Figma (Step Selected -> Line -> Step Default -> Line -> Step Default) */}
          <div style={{ borderTop: '1px solid #E4E8E9', paddingTop: '28px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#7C8E94', textTransform: 'uppercase', marginBottom: '16px', display: 'block' }}>
              Exemplo de Montagem do Figma (3 Etapas Conectadas)
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                backgroundColor: '#F8FAFC',
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
              }}
            >
              <Step label="Example Text" icon="add" status="selected" />
              <div style={{ flex: 1, height: '2px', backgroundColor: '#E4E8E9', borderRadius: '1px' }} />
              <Step label="Example Text" icon="add" status="default" />
              <div style={{ flex: 1, height: '2px', backgroundColor: '#E4E8E9', borderRadius: '1px' }} />
              <Step label="Example Text" icon="add" status="default" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 2: ANATOMIA E TABELA DE TOKENS OFICIAIS
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Anatomia & Tokens do Step e Conectores"
          description="Valores dimensionais, tipográficos e cromáticos extraídos do Figma e mapeados em tokens oficiais."
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
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Altura do Step</td>
                <td style={{ padding: '12px 18px' }}>48px</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>spacing.XL</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>--unooria-spacing-xl: 48px;</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Paddings do Step</td>
                <td style={{ padding: '12px 18px' }}>12px V / 8px R / 4px L</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>spacing.XS, XXS, XXXS</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>12px 8px 12px 4px</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Tamanho do Ícone</td>
                <td style={{ padding: '12px 18px' }}>24px × 24px</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>icon-size-s</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>--unooria-icon-size-s: 24px;</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Ícone Selected</td>
                <td style={{ padding: '12px 18px' }}>#7FA5E2</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>brandNavy[600]</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>--unooria-color-brandnavy-600</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Texto Selected</td>
                <td style={{ padding: '12px 18px' }}>#383E41 (16px SemiBold)</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>neutral[900]</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>--unooria-color-neutral-900</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Ícone / Texto Default</td>
                <td style={{ padding: '12px 18px' }}>#617379 (16px Regular)</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>neutral[500]</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>--unooria-color-neutral-500</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Conector (`Line`)</td>
                <td style={{ padding: '12px 18px' }}>2px (#E4E8E9)</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>neutral[150]</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>--unooria-color-neutral-150</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 18px', fontWeight: 600 }}>Conector Concluído</td>
                <td style={{ padding: '12px 18px' }}>#7FA5E2</td>
                <td style={{ padding: '12px 18px', color: '#64748B' }}>brandNavy[600]</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#0086FF' }}>--unooria-color-brandnavy-600</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 3: SIMULADOR DE FLUXO INTERATIVO
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Simulador de Fluxo Interativo (Multi-Etapas)"
          description="Navegue entre as etapas usando os botões ou clicando diretamente nos passos."
        />

        <InteractiveFlowSimulator />
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
            padding: '32px',
            transition: 'all 0.2s ease',
          }}
        >
          <Stepper
            theme={activeTheme}
            currentStep={1}
            steps={[
              { label: 'Identificação', icon: 'person' },
              { label: 'Endereço', icon: 'home' },
              { label: 'Pagamento', icon: 'credit_card' },
              { label: 'Revisão', icon: 'check_circle' },
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
          description="Diretrizes para garantir a clareza e usabilidade em formulários longos."
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
                <strong>Divida processos longos em 3 a 5 etapas lógicas:</strong> Evita sobrecarregar a interface.
              </li>
              <li>
                <strong>Permita clicar em etapas já concluídas:</strong> Facilita a revisão ou correção de dados anteriores.
              </li>
              <li>
                <strong>Use ícones coerentes com o conteúdo da etapa:</strong> Aumenta a velocidade de escaneamento visual.
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
                <strong>Não crie mais de 6 etapas horizontais:</strong> O layout pode quebrar ou truncar textos em telas menores.
              </li>
              <li>
                <strong>Não use o Stepper para ações não sequenciais:</strong> Para navegação livre entre abas, utilize o componente <code>Tabs</code>.
              </li>
              <li>
                <strong>Não oculte o conector sem motivo:</strong> O conector é essencial para comunicar continuidade e ordem.
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
          description="Todas as propriedades suportadas pelo componente Stepper e subcomponente Step."
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
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>steps</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>StepItem[]</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>[]</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Lista de etapas no modo baseado em dados.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>currentStep</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>number</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>0</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Índice do passo ativo (0-indexed).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>orientation</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>'horizontal' | 'vertical'</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>'horizontal'</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Disposição visual dos passos.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>size</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>'sm' | 'md' | 'lg'</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>'md'</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Escala visual (md = 48px Figma).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>clickable</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>boolean</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>true</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Permite navegação interativa ao clicar.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>showConnector</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>boolean</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>true</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Exibe linhas conectoras entre etapas.</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>fillCompletedConnectors</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>boolean</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>true</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Preenche linhas de etapas concluídas em azul brand.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof Stepper> = {
  title: 'Plataforma Unooria/Componentes/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 0, max: 3, step: 1 },
      description: 'Índice do passo ativo',
      defaultValue: 0,
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Orientação do Stepper',
      defaultValue: 'horizontal',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho visual',
      defaultValue: 'md',
    },
    clickable: {
      control: 'boolean',
      description: 'Permite interação ao clicar',
      defaultValue: true,
    },
    showConnector: {
      control: 'boolean',
      description: 'Exibe linhas de conexão',
      defaultValue: true,
    },
    fillCompletedConnectors: {
      control: 'boolean',
      description: 'Preenche linhas concluídas com azul de destaque',
      defaultValue: true,
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Tema visual',
      defaultValue: 'light',
    },
  },
  args: {
    currentStep: 0,
    orientation: 'horizontal',
    size: 'md',
    clickable: true,
    showConnector: true,
    fillCompletedConnectors: true,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Stepper>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <StepperDocumentationPage />,
};

/**
 * Playground interativo com 100% das props mapeadas em controles.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground Interativo',
  render: (args) => {
    const [currentStep, setCurrentStep] = useState<number>(args.currentStep ?? 0);

    return (
      <div
        style={{
          padding: '32px',
          backgroundColor: args.theme === 'dark' ? '#181C1E' : '#FFFFFF',
          borderRadius: '16px',
          border: args.theme === 'dark' ? '1px solid #383E41' : '1px solid #E4E8E9',
        }}
      >
        <Stepper
          {...args}
          currentStep={currentStep}
          onStepClick={(index) => setCurrentStep(index)}
          steps={[
            { label: 'Identificação', icon: 'person' },
            { label: 'Endereço', icon: 'home' },
            { label: 'Pagamento', icon: 'credit_card' },
            { label: 'Confirmação', icon: 'check_circle' },
          ]}
        />
      </div>
    );
  },
};

/**
 * Réplica visual 1:1 dos frames oficiais do Figma (Node 12694:10079).
 */
export const ExemploOficialFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma (Node 12694:10079)',
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex' }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#0E1039',
              backgroundColor: '#BDD0EF',
              padding: '4px 8px',
              borderRadius: '4px',
            }}
          >
            Componentes
          </span>
        </div>
        <h1 style={{ fontSize: '34px', fontWeight: 700, color: '#0E1039', margin: '4px 0 12px 0', lineHeight: '48px' }}>
          Stepper
        </h1>
        <p style={{ margin: 0, fontSize: '14px', color: '#475157', lineHeight: '20px' }}>
          <strong>O que são:</strong> Um Stepper é um componente de interface que guia o usuário por meio de uma sequência de etapas ou fases em um processo.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: '#F8FAFC',
          padding: '16px 24px',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
        }}
      >
        <Step label="Example Text" icon="add" status="selected" />
        <div style={{ flex: 1, height: '2px', backgroundColor: '#E4E8E9', borderRadius: '1px' }} />
        <Step label="Example Text" icon="add" status="default" />
        <div style={{ flex: 1, height: '2px', backgroundColor: '#E4E8E9', borderRadius: '1px' }} />
        <Step label="Example Text" icon="add" status="default" />
      </div>
    </div>
  ),
};

/**
 * Orientação Vertical (Ideal para fluxos laterais ou checkout detalhado).
 */
export const OrientacaoVertical: Story = {
  name: 'Orientação Vertical',
  render: () => (
    <div
      style={{
        maxWidth: '380px',
        padding: '24px',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E4E8E9',
      }}
    >
      <Stepper
        orientation="vertical"
        currentStep={1}
        steps={[
          { label: 'Informações Básicas', icon: 'person', description: 'Nome e CPF validados' },
          { label: 'Endereço de Entrega', icon: 'home', description: 'Aguardando CEP' },
          { label: 'Forma de Pagamento', icon: 'payment', description: 'Cartão de crédito ou boleto' },
          { label: 'Resumo do Pedido', icon: 'assignment', description: 'Validação final' },
        ]}
      />
    </div>
  ),
};

/**
 * Composição Modular Declarativa via Compound Components (<Stepper.Step />).
 */
export const ComposicaoModularDeclarativa: Story = {
  name: 'Composição Modular Declarativa',
  render: () => (
    <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E4E8E9' }}>
      <Stepper currentStep={1}>
        <Stepper.Step label="Dados Pessoais" icon="person" description="Preenchido" />
        <Stepper.Step label="Endereço" icon="home" description="Etapa atual" />
        <Stepper.Step label="Documentos" icon="badge" optional description="Opcional" />
        <Stepper.Step label="Finalização" icon="check_circle" />
      </Stepper>
    </div>
  ),
};
