import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FileUpload } from '../../../src/unooria/components/UploadFileModal/FileUpload';
import { UploadFileModal } from '../../../src/unooria/components/UploadFileModal/UploadFileModal';
import { UploadFileItem } from '../../../src/unooria/components/UploadFileModal/UploadFileModal.types';
import { Button } from '../../../src/unooria/components/Button/Button';
import { Icon } from '../../../src/unooria/components/Icon/Icon';
import '../../../src/unooria/tokens/icons.css';
import '../../../src/unooria/components/UploadFileModal/UploadFileModal.css';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
} from '../../../.storybook/components';

/**
 * Exemplos fixos do Figma
 */
const mockFileOne: UploadFileItem[] = [
  {
    id: '1',
    name: 'Nome do Arquivo Exemplo.pdf',
    size: '50 MB',
    progress: 75,
    status: 'uploading',
  },
];

const mockFileTwo: UploadFileItem[] = [
  {
    id: '1',
    name: 'Nome do Arquivo Exemplo.pdf',
    size: '50 MB',
    progress: 75,
    status: 'uploading',
  },
  {
    id: '2',
    name: 'Relatório_Compliance_2026.pdf',
    size: '12 MB',
    progress: 100,
    status: 'completed',
  },
];

/**
 * Demonstração do Modal em Ação
 */
const ModalTriggerDemo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadFileItem[]>(mockFileOne);

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E4E8E9',
        padding: '32px',
        maxWidth: '540px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <div>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 700, color: '#22272A' }}>
          Documentação do Aluno / Fornecedor
        </h4>
        <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
          Envie seus documentos comprobatórios para análise cadastral.
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          <Icon name="upload" size="xs" color="currentColor" /> Enviar documento
        </Button>
        <span style={{ fontSize: '13px', color: '#64748B' }}>
          {uploadedFiles.length > 0
            ? `${uploadedFiles.length} documento(s) anexado(s)`
            : 'Nenhum arquivo enviado'}
        </span>
      </div>

      <UploadFileModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Upload de arquivo"
        description="Selecione ou arraste os documentos necessários."
        files={uploadedFiles}
        onFilesChange={setUploadedFiles}
        onSubmit={(files) => {
          alert(`Documentos enviados com sucesso! Total: ${files.length}`);
          setIsOpen(false);
        }}
      />
    </div>
  );
};

/**
 * Página principal de documentação rica do componente UploadFileModal (Padrão Ouro)
 */
const UploadFileModalDocumentationPage: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');

  return (
    <UnooriaDocShell>
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Modais & Arquivos"
        title="UploadFileModal"
        description="O Upload File Modal é uma janela de interface usada para enviar arquivos sem sair da página atual. Ele concentra as ações de seleção, visualização e confirmação do upload em um espaço compacto e focado."
      />

      {/* =========================================================================
          SEÇÃO 1: ESPECIFICAÇÃO VISUAL FIEL DO FIGMA (Node 18661:2161)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#22272A', margin: '0 0 4px 0' }}>
              Especificação Visual Figma (Node 18661:2161)
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
              As 3 variações oficiais do Figma: No file, One file e Two file com barras de progresso e dropzone tracejada.
            </p>
          </div>
          <a
            href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=18661-2161&m=dev"
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
              Upload file modal
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#475157', lineHeight: 1.6 }}>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#22272A' }}>O que são:</strong> O Upload File Modal é uma janela de interface usada para enviar arquivos sem sair da página atual.
                Ele concentra as ações de seleção, visualização e confirmação do upload em um espaço compacto e focado, reduzindo distrações e mantendo o usuário no contexto da tarefa.
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#22272A' }}>Exemplo visual:</strong> Ao clicar em &quot;Enviar documento&quot;, abre-se um modal central com o título &quot;Upload de arquivo&quot;.
                O usuário escolhe o arquivo, e uma Progress Bar mostra o progresso do envio (ex.: &quot;72%&quot;).
              </p>
            </div>
          </div>

          {/* Matriz das 3 Variações do Figma */}
          <div style={{ borderTop: '1px solid #E4E8E9', paddingTop: '32px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#7C8E94', textTransform: 'uppercase', display: 'block' }}>
              Variações de Densidade de Arquivos (Component Set 18647:26131)
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {/* 1. No File */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>Variation=No file</span>
                <FileUpload label="Input Label" required defaultFiles={[]} />
              </div>

              {/* 2. One File */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>Variation=One file</span>
                <FileUpload label="Input Label" required defaultFiles={mockFileOne} />
              </div>

              {/* 3. Two File */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>Variation=Two file</span>
                <FileUpload label="Input Label" required defaultFiles={mockFileTwo} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 2: MODAL COMPLETO INTERATIVO
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Modal Flutuante de Upload em Ação"
          description="Demonstração prática do modal acionado por botão com confirmação de envio."
        />

        <ModalTriggerDemo />
      </section>

      {/* =========================================================================
          SEÇÃO 3: SUPORTE A TEMAS (LIGHT & DARK)
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
            maxWidth: '520px',
            transition: 'all 0.2s ease',
          }}
        >
          <FileUpload
            theme={activeTheme}
            label="Documentos Fiscais"
            required
            defaultFiles={mockFileOne}
          />
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 4: BOAS PRÁTICAS DE USO (DO & DON'T)
          ========================================================================= */}
      <section style={{ marginBottom: '60px' }}>
        <UnooriaDocSectionHeader
          title="Boas Práticas de Uso (DO & DON'T)"
          description="Diretrizes para garantir clareza e previsibilidade no envio de arquivos."
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
                <strong>Informe claramente os formatos aceitos e limite de tamanho:</strong> Ex: &quot;JPEG, PNG, PDF até 50 MB&quot;.
              </li>
              <li>
                <strong>Exiba o progresso individual de cada arquivo:</strong> A barra linear com porcentagem reduz a ansiedade de espera.
              </li>
              <li>
                <strong>Permita cancelar ou remover itens da lista antes do envio final:</strong> Dá controle total ao usuário.
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
                <strong>Não silencie erros de upload:</strong> Se o arquivo exceder o tamanho máximo, exiba a borda vermelha e mensagem clara.
              </li>
              <li>
                <strong>Não feche o modal bruscamente durante o upload ativo:</strong> Solicite confirmação caso o envio esteja em andamento.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof FileUpload> = {
  title: 'Plataforma Unooria/Componentes/UploadFileModal',
  component: FileUpload,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Rótulo superior do campo',
      defaultValue: 'Input Label',
    },
    required: {
      control: 'boolean',
      description: 'Campo obrigatório (*)',
      defaultValue: true,
    },
    dropzoneTitle: {
      control: 'text',
      description: 'Título da dropzone',
      defaultValue: 'Solte seu arquivo aqui ou clique para escolher',
    },
    dropzoneSubtitle: {
      control: 'text',
      description: 'Subtítulo da dropzone',
      defaultValue: 'Formatos JPEG, PNG, PDF e MP4, até 50 MB',
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
    label: 'Input Label',
    required: true,
    dropzoneTitle: 'Solte seu arquivo aqui ou clique para escolher',
    dropzoneSubtitle: 'Formatos JPEG, PNG, PDF e MP4, até 50 MB',
    disabled: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <UploadFileModalDocumentationPage />,
};

/**
 * Playground interativo do componente FileUpload inline
 */
export const PlaygroundFileUpload: Story = {
  name: '🕹️ 1. Playground FileUpload (Inline)',
  render: (args) => (
    <div style={{ maxWidth: '420px', padding: '24px', backgroundColor: args.theme === 'dark' ? '#181C1E' : '#FFFFFF', borderRadius: '16px' }}>
      <FileUpload {...args} defaultFiles={mockFileOne} />
    </div>
  ),
};

/**
 * Playground do Modal Completo
 */
export const PlaygroundModalCompleto: Story = {
  name: '🕹️ 2. Playground Modal Completo',
  render: () => <ModalTriggerDemo />,
};

/**
 * Réplica visual 1:1 dos frames oficiais do Figma (Node 18661:2161).
 */
export const ExemploOficialFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma (Node 18661:2161)',
  render: () => (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        padding: '48px',
        border: '1px solid #E4E8E9',
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
        maxWidth: '480px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontSize: '18px', color: '#475157' }}>Components</span>
        <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#22272A', margin: '0 0 12px 0', lineHeight: 1.2 }}>
          Upload file modal
        </h1>
        <p style={{ margin: 0, fontSize: '13px', color: '#475157', lineHeight: 1.6 }}>
          O Upload File Modal é uma janela de interface usada para enviar arquivos sem sair da página atual.
        </p>
      </div>

      <FileUpload label="Input Label" required defaultFiles={mockFileTwo} />
    </div>
  ),
};

/**
 * Comparativo das 3 Variações do Figma
 */
export const VariacoesDoFigma: Story = {
  name: 'Variações de Densidade (No file, One file, Two file)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '420px' }}>
      <div>
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748B', marginBottom: '8px', display: 'block' }}>
          1. Variation=No file
        </span>
        <FileUpload label="Input Label" required defaultFiles={[]} />
      </div>

      <div>
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748B', marginBottom: '8px', display: 'block' }}>
          2. Variation=One file
        </span>
        <FileUpload label="Input Label" required defaultFiles={mockFileOne} />
      </div>

      <div>
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748B', marginBottom: '8px', display: 'block' }}>
          3. Variation=Two file
        </span>
        <FileUpload label="Input Label" required defaultFiles={mockFileTwo} />
      </div>
    </div>
  ),
};
