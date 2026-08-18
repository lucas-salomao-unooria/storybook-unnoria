import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from '../../../src/unooria/components/ProgressBar/ProgressBar';
import '../../../src/unooria/components/ProgressBar/ProgressBar.css';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

/**
 * Página principal de documentação rica do componente ProgressBar
 */
const ProgressBarDocumentationPage: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');
  const [simulatedProgress, setSimulatedProgress] = useState<number>(66);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(2);

  // Simulação de upload contínuo
  useEffect(() => {
    let interval: any;
    if (isUploading) {
      interval = setInterval(() => {
        setSimulatedProgress((prev) => {
          if (prev >= 100) {
            setIsUploading(false);
            return 100;
          }
          return prev + 5;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isUploading]);

  const handleStartUpload = () => {
    setSimulatedProgress(0);
    setIsUploading(true);
  };

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Feedback & Carregamento"
        title="ProgressBar"
        description="A Progress Bar é um componente visual que comunica o andamento de uma tarefa, processo de carregamento ou preenchimento de etapas sequenciais, transmitindo clareza e controle ao usuário."
      />

      {/* =========================================================================
          SEÇÃO 1: ESPECIFICAÇÃO VISUAL FIEL DO FIGMA (Node 18644:1049 / 18641:699)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#22272A', margin: '0 0 4px 0' }}>
              Especificação Visual Figma (Node 18644:1049)
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
              Design exato conforme especificado na prancha do Figma para o componente Progress Bar.
            </p>
          </div>
          <a
            href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=18644-1049&m=dev"
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
            <h1 style={{ fontSize: '40px', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>Progress Bar</h1>
            <span style={{ fontSize: '18px', color: '#7FA5E2', fontWeight: 500 }}>Indicador Linear de Progresso e Etapas</span>
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
              O que é a Progress Bar?
            </h3>
            <p style={{ fontSize: '14px', color: '#CBD4D6', margin: 0 }}>
              A <strong>Progress Bar</strong> é um componente que mostra visualmente o andamento de uma tarefa ou processo,
              como um carregamento ou preenchimento de etapas. Ela ajuda o usuário a entender o quanto já foi concluído e o
              quanto falta, transmitindo clareza e controle.
            </p>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
              <p style={{ fontSize: '14px', color: '#94A3B8', margin: 0 }}>
                <strong style={{ color: '#7FA5E2' }}>Exemplo visual do Figma:</strong> Em um cadastro dividido em três etapas,
                a Progress Bar mostra “Etapa 2 de 3” e a barra preenchida em 66%, indicando que o usuário está quase finalizando o processo.
              </p>
            </div>
          </div>

          {/* Reprodução das 2 Variantes Oficiais do Figma dentro do Frame Escuro */}
          <div
            style={{
              backgroundColor: '#1E2328',
              borderRadius: '16px',
              padding: '36px',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
            }}
          >
            {/* Variante 1: Top Labels */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: '#7FA5E2', textTransform: 'uppercase', fontWeight: 600 }}>
                Variante 1 — Top Labels (Node 11454:20879)
              </span>
              <div style={{ maxWidth: '360px' }}>
                <ProgressBar
                  label="Title"
                  value={66}
                  valuePosition="top"
                  theme="dark"
                />
              </div>
            </div>

            {/* Variante 2: Inline Percentage */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: '#7FA5E2', textTransform: 'uppercase', fontWeight: 600 }}>
                Variante 2 — Inline Percentage (Node 18641:700)
              </span>
              <div style={{ maxWidth: '360px' }}>
                <ProgressBar
                  label="Title"
                  value={66}
                  valuePosition="inline"
                  theme="dark"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 2: ANATOMIA E ESPECIFICAÇÕES TÉCNICAS
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Anatomia & Especificações Técnicas"
          description="Detalhamento das dimensões, raios de borda (pill 100px) e tokens visuais extraídos do Figma."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {/* Card 1 */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px' }}>
            <div style={{ fontSize: '20px', marginBottom: '8px' }}>📏</div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B', margin: '0 0 6px 0' }}>Trilho & Altura</h4>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#64748B', lineHeight: 1.6 }}>
              <li>Altura Padrão Figma: <strong>8px</strong> (<code>size="sm"</code>)</li>
              <li>Raio de Borda: <strong>100px</strong> (Formato Pílula)</li>
              <li>Trilho (Fundo): <code>#E2E8F0</code> (Light) / <code>rgba(255,255,255,0.1)</code> (Dark)</li>
              <li>Preenchimento Padrão: <code>#7FA5E2</code> (Brand Navy)</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px' }}>
            <div style={{ fontSize: '20px', marginBottom: '8px' }}>🔤</div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B', margin: '0 0 6px 0' }}>Tipografia & Rótulos</h4>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#64748B', lineHeight: 1.6 }}>
              <li>Título (Label): <code>Open Sans 400 14px/20px</code></li>
              <li>Percentual Top: <code>Open Sans 700 14px/20px</code></li>
              <li>Percentual Inline: <code>Open Sans 700 12px/18px</code> (min-width 32px)</li>
              <li>Gap entre Título e Barra: <strong>4px</strong></li>
            </ul>
          </div>

          {/* Card 3 */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px' }}>
            <div style={{ fontSize: '20px', marginBottom: '8px' }}>🎨</div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B', margin: '0 0 6px 0' }}>Severidades & Modos</h4>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#64748B', lineHeight: 1.6 }}>
              <li><code>brand</code>: <code>#7FA5E2</code> (Padrão)</li>
              <li><code>primary</code>: <code>#0086FF</code></li>
              <li><code>success</code>: <code>#01B574</code> (Conclusão)</li>
              <li><code>warning</code>: <code>#F97607</code> / <code>danger</code>: <code>#E31A1A</code></li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 3: SIMULADORES INTERATIVOS REAIS
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Simuladores Interativos de Casos de Uso Reais"
          description="Experiências funcionais de simulação de Upload de Arquivos e Formulário de Cadastro em Etapas."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          {/* Simulador 1: Upload de Arquivos */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B' }}>
                Simulação: Upload de Arquivo
              </span>
              <button
                onClick={handleStartUpload}
                disabled={isUploading}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: isUploading ? '#94A3B8' : '#0086FF',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: isUploading ? 'not-allowed' : 'pointer',
                }}
              >
                {isUploading ? 'Enviando...' : simulatedProgress === 100 ? 'Reiniciar Upload' : 'Iniciar Upload'}
              </button>
            </div>

            <ProgressBar
              label={isUploading ? 'Fazendo upload do arquivo ZIP...' : simulatedProgress === 100 ? 'Upload concluído com sucesso!' : 'Aguardando início do upload'}
              value={simulatedProgress}
              valuePosition="top"
              autoStatus={true}
              variant="primary"
            />

            <span style={{ fontSize: '12px', color: '#64748B' }}>
              💡 Ao atingir 100%, a barra muda automaticamente para a variante <strong>success</strong> (verde).
            </span>
          </div>

          {/* Simulador 2: Cadastro em Etapas (Figma Example) */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B' }}>
                Exemplo do Figma: Cadastro em Etapas
              </span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
                  disabled={currentStep <= 1}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    cursor: currentStep <= 1 ? 'not-allowed' : 'pointer',
                    fontSize: '12px',
                  }}
                >
                  ← Anterior
                </button>
                <button
                  onClick={() => setCurrentStep((s) => Math.min(3, s + 1))}
                  disabled={currentStep >= 3}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    cursor: currentStep >= 3 ? 'not-allowed' : 'pointer',
                    fontSize: '12px',
                  }}
                >
                  Próxima →
                </button>
              </div>
            </div>

            <ProgressBar
              label={`Etapa ${currentStep} de 3`}
              value={currentStep === 1 ? 33 : currentStep === 2 ? 66 : 100}
              valuePosition="inline"
              variant="brand"
              valueFormatter={(_, __, pct) => `${pct}%`}
            />

            <span style={{ fontSize: '12px', color: '#64748B' }}>
              Etapa atual: <strong>{currentStep === 1 ? 'Dados Pessoais' : currentStep === 2 ? 'Endereço & Contato' : 'Confirmação Final'}</strong>
            </span>
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
            description="Demonstração da barra de progresso com contraste otimizado em fundos claros e escuros."
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
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            transition: 'all 0.2s ease',
          }}
        >
          <ProgressBar
            label="Sincronizando banco de dados..."
            value={75}
            valuePosition="top"
            theme={activeTheme}
          />

          <ProgressBar
            label="Instalação de pacotes"
            value={45}
            valuePosition="inline"
            theme={activeTheme}
          />
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 5: BOAS PRÁTICAS DE USO
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Boas Práticas de Uso (DO & DON'T)"
          description="Recomendações para assegurar comunicação clara do tempo e estado de carregamento."
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
                <strong>Use rótulos explicativos:</strong> Forneça contexto sobre qual tarefa está sendo executada.
              </li>
              <li>
                <strong>Utilize indeterminate para tempos desconhecidos:</strong> Não simule percentuais falsos quando não for possível estimar.
              </li>
              <li>
                <strong>Destaque conclusões:</strong> Transicione a cor para <code>success</code> quando o processo atingir 100%.
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
                <strong>Não congele o indicador em 99%:</strong> Forneça feedback de carregamento real ou mude para estado indeterminado.
              </li>
              <li>
                <strong>Não use cores de perigo sem falha real:</strong> Reserve a variante <code>danger</code> estritamente para erros de processo.
              </li>
              <li>
                <strong>Não remova a semântica ARIA:</strong> Mantenha atributos de acessibilidade para tecnologias assistivas.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 6: REFERÊNCIA COMPLETA DE PROPS
          ========================================================================= */}
      <section style={{ marginBottom: '40px' }}>
        <UnooriaDocSectionHeader
          title="Referência Completa de Props da API"
          description="Todas as propriedades suportadas pelo componente ProgressBar."
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
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>value</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>number</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>0</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Valor numérico atual do progresso.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>max</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>number</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>100</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Valor máximo da escala.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>label</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>ReactNode</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>undefined</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Título ou rótulo textual do processo.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>valuePosition</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>'top' | 'inline' | 'bottom' | 'none'</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>'top'</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Posição do percentual ('top' = Variante 1 Figma, 'inline' = Variante 2 Figma).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>variant</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>'brand' | 'primary' | 'success' | 'warning' | 'danger'</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>'brand'</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Variante cromática da barra (brand = #7FA5E2 padrão).</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>size</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>'xs' | 'sm' | 'md' | 'lg'</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>'sm' (8px)</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Altura da barra de progresso.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>indeterminate</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>boolean</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>false</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Ativa animação contínua para tempo desconhecido.</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', fontWeight: 700, color: '#0086FF' }}>theme</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace', color: '#64748B' }}>'light' | 'dark'</td>
                <td style={{ padding: '12px 18px', fontFamily: 'monospace' }}>'light'</td>
                <td style={{ padding: '12px 18px', color: '#334155' }}>Tema visual de contraste.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof ProgressBar> = {
  title: 'Plataforma Unooria/Componentes/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Valor numérico atual',
      defaultValue: 66,
    },
    label: {
      control: 'text',
      description: 'Título ou rótulo do processo',
      defaultValue: 'Title',
    },
    valuePosition: {
      control: 'select',
      options: ['top', 'inline', 'bottom', 'none'],
      description: 'Posição do percentual/valor',
      defaultValue: 'top',
    },
    variant: {
      control: 'select',
      options: ['brand', 'primary', 'success', 'warning', 'danger'],
      description: 'Variante cromática da barra',
      defaultValue: 'brand',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Altura da barra',
      defaultValue: 'sm',
    },
    autoStatus: {
      control: 'boolean',
      description: 'Mudar automaticamente para success em 100%',
      defaultValue: false,
    },
    indeterminate: {
      control: 'boolean',
      description: 'Modo indeterminado (loading contínuo)',
      defaultValue: false,
    },
    striped: {
      control: 'boolean',
      description: 'Padrão listrado',
      defaultValue: false,
    },
    animated: {
      control: 'boolean',
      description: 'Animar listras',
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
    value: 66,
    label: 'Title',
    valuePosition: 'top',
    variant: 'brand',
    size: 'sm',
    autoStatus: false,
    indeterminate: false,
    striped: false,
    animated: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ProgressBarDocumentationPage />,
};

/**
 * Playground interativo do componente ProgressBar com 100% das props mapeadas em controles do Storybook.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground Interativo',
  render: (args) => (
    <div
      style={{
        maxWidth: '480px',
        padding: '32px',
        backgroundColor: args.theme === 'dark' ? '#22272A' : '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
      }}
    >
      <ProgressBar {...args} />
    </div>
  ),
};

/**
 * Réplica visual 1:1 dos frames oficiais do Figma (Node 18644:1049).
 */
export const ExemploOficialFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma (Node 18644:1049)',
  render: () => (
    <div
      style={{
        backgroundColor: '#22272A',
        padding: '48px',
        borderRadius: '24px',
        maxWidth: '420px',
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
        boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
      }}
    >
      <div>
        <div style={{ fontSize: '11px', color: '#7FA5E2', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>
          Variante 1 — Top Labels (66%)
        </div>
        <ProgressBar
          label="Title"
          value={66}
          valuePosition="top"
          theme="dark"
        />
      </div>

      <div>
        <div style={{ fontSize: '11px', color: '#7FA5E2', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>
          Variante 2 — Inline Percentage (66%)
        </div>
        <ProgressBar
          label="Title"
          value={66}
          valuePosition="inline"
          theme="dark"
        />
      </div>
    </div>
  ),
};

/**
 * Comparativo de Posicionamento de Rótulos (Top vs Inline vs Bottom).
 */
export const VariantesDePosicao: Story = {
  name: 'Variantes de Posicionamento',
  render: () => (
    <div style={{ maxWidth: '440px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
          1. Top Labels (Padrão Figma Variante 1)
        </div>
        <ProgressBar label="Progresso da Matrícula" value={66} valuePosition="top" />
      </div>

      <div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
          2. Inline Percentage (Padrão Figma Variante 2)
        </div>
        <ProgressBar label="Envio de Formulário" value={66} valuePosition="inline" />
      </div>

      <div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
          3. Bottom Position
        </div>
        <ProgressBar label="Processamento de Dados" value={66} valuePosition="bottom" />
      </div>
    </div>
  ),
};

/**
 * Matriz de Severidades e Cores Suportadas.
 */
export const CoresESeveridades: Story = {
  name: 'Cores e Severidades',
  render: () => (
    <div style={{ maxWidth: '440px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <ProgressBar label="Brand Navy (#7FA5E2 - Padrão Unooria)" value={70} variant="brand" />
      <ProgressBar label="Primary Blue (#0086FF)" value={85} variant="primary" />
      <ProgressBar label="Success (#01B574 - 100% Concluído)" value={100} variant="success" />
      <ProgressBar label="Warning (#F97607 - Atenção/Espaço Baixo)" value={88} variant="warning" />
      <ProgressBar label="Danger (#E31A1A - Limite Excedido)" value={95} variant="danger" />
    </div>
  ),
};

/**
 * Comparativo de Todos os Tamanhos de Altura Suportados (XS, SM, MD, LG).
 */
export const Tamanhos: Story = {
  name: 'Tamanhos (XS, SM, MD, LG)',
  render: () => (
    <div style={{ maxWidth: '440px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <ProgressBar label="XS (4px de Altura)" value={40} size="xs" />
      <ProgressBar label="SM (8px de Altura - Padrão Figma)" value={60} size="sm" />
      <ProgressBar label="MD (12px de Altura)" value={75} size="md" />
      <ProgressBar label="LG (16px de Altura)" value={90} size="lg" />
    </div>
  ),
};

/**
 * Modo Indeterminado (Loading Contínuo Animado).
 */
export const ModoIndeterminado: Story = {
  name: 'Modo Indeterminado (Loading Contínuo)',
  render: () => (
    <div style={{ maxWidth: '440px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <ProgressBar
        label="Verificando integridade dos arquivos..."
        indeterminate={true}
        variant="primary"
      />
      <ProgressBar
        label="Processando pagamento..."
        indeterminate={true}
        variant="brand"
      />
    </div>
  ),
};
