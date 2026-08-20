import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Cropper } from '../../../src/unooria/components/Cropper/Cropper';
import { CropResult } from '../../../src/unooria/components/Cropper/Cropper.types';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';

const DEMO_IMAGE = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80';

/**
 * Página de Documentação Rica do Cropper baseada no Padrão Ouro do Design System Unooria
 */
const CropperDocumentationPage = () => {
  const [, setResult] = useState<CropResult | null>(null);

  return (
    <UnooriaDocShell>
      {/* 1. Cabeçalho Oficial */}
      <UnooriaDocHeader
        badgeBrand="Plataforma Unooria"
        category="Componentes • Mídia & Imagens"
        title="Cropper"
        description="Um Cropper é um componente de interface que permite ao usuário selecionar, ajustar e recortar uma área específica de uma imagem (com zoom e pan), garantindo centralização e proporções ideais antes de salvar ou enviar."
      />

      {/* 2. Visão Geral & Casos de Uso */}
      <UnooriaDocSectionHeader
        title="1. Visão Geral & Casos de Uso"
        description="Diretrizes conceituais extraídas do Figma oficial."
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            padding: 24,
            borderRadius: 12,
          }}
        >
          <h4 style={{ margin: '0 0 12px 0', color: '#22272A', fontSize: 16 }}>🎯 O que são</h4>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#475157' }}>
            Útil em situações onde é necessário ajustar o enquadramento ou remover partes indesejadas da imagem antes de salvá-la. Oferece visualização em tempo real com controle de zoom por controle deslizante e botões dedicados.
          </p>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            padding: 24,
            borderRadius: 12,
          }}
        >
          <h4 style={{ margin: '0 0 12px 0', color: '#6487C2', fontSize: 16 }}>📸 Fluxo em 3 Passos</h4>
          <ol style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.6, color: '#475157' }}>
            <li><strong>Alterar foto do perfil:</strong> Foto atual com opções de <em>Remover</em> ou <em>Editar</em>.</li>
            <li><strong>Atualize sua foto:</strong> Opções de <em>Fazer upload</em> ou <em>Tire uma foto</em>.</li>
            <li><strong>Visualize sua nova foto:</strong> Canvas 387x387px com zoom/pan, <em>Cancelar</em> e <em>Salvar</em>.</li>
          </ol>
        </div>
      </div>

      {/* 3. Figma Specs */}
      <UnooriaDocSectionHeader
        title="2. Figma & Especificações Técnicas"
        description="Links oficiais e nós de design homologados."
      />
      <div
        style={{
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: 8,
          padding: 20,
          marginBottom: 32,
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: 12, color: '#49699F', textTransform: 'uppercase', fontWeight: 600 }}>
              Figma Frame Node ID
            </span>
            <div style={{ fontSize: 16, color: '#22272A', fontWeight: 700, fontFamily: 'monospace' }}>
              12694:9694 (Cropper)
            </div>
          </div>
          <div style={{ borderLeft: '1px solid #CBD5E1', paddingLeft: 16 }}>
            <span style={{ fontSize: 12, color: '#49699F', textTransform: 'uppercase', fontWeight: 600 }}>
              Component Set
            </span>
            <div style={{ fontSize: 14, color: '#22272A', fontWeight: 600 }}>
              Cropper_main (#12694:9703)
            </div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <a
              href="https://www.figma.com/design/mPw4Hhx9ptkgcHtySaSilO/Design-System-Unooria?node-id=12694-9694&m=dev"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                backgroundColor: '#6487C2',
                color: '#FFFFFF',
                borderRadius: 6,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Abrir no Figma Dev Mode ↗
            </a>
          </div>
        </div>
      </div>

      {/* 4. Matriz do Figma (Os 3 Passos) */}
      <UnooriaDocSectionHeader
        title="3. Matriz do Figma (Os 3 Estados Oficiais)"
        description="Visualização dos 3 passos declarativos do fluxo de corte e upload de foto de perfil em sua largura oficial de 435px."
      />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 32,
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginBottom: 32,
        }}
      >
        {/* Passo 1 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#49699F' }}>
            1️⃣ Alterar foto do perfil (#12694:9704)
          </span>
          <Cropper
            initialStep="change-photo"
            currentImage={DEMO_IMAGE}
          />
        </div>

        {/* Passo 2 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#49699F' }}>
            2️⃣ Atualize sua foto de perfil (#12694:9719)
          </span>
          <Cropper
            initialStep="upload"
          />
        </div>

        {/* Passo 3 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#49699F' }}>
            3️⃣ Visualize sua nova foto (#12694:9734)
          </span>
          <Cropper
            initialStep="crop-preview"
            initialImage={DEMO_IMAGE}
            onSave={setResult}
          />
        </div>
      </div>

      {/* 4. Referência Completa de Props da API */}
      <UnooriaDocSectionHeader
        title="4. Referência Completa de Props da API"
        description="Todas as propriedades disponíveis para o componente Cropper."
      />
      <div style={{ overflowX: 'auto', marginBottom: 32 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 14 }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
              <th style={{ padding: '12px 16px', color: '#22272A', fontWeight: 600 }}>Propriedade</th>
              <th style={{ padding: '12px 16px', color: '#22272A', fontWeight: 600 }}>Tipo</th>
              <th style={{ padding: '12px 16px', color: '#22272A', fontWeight: 600 }}>Padrão</th>
              <th style={{ padding: '12px 16px', color: '#22272A', fontWeight: 600 }}>Descrição</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A', fontWeight: 500 }}>currentImage</td>
              <td style={{ padding: '12px 16px', color: '#49699F', fontFamily: 'monospace' }}>string</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>URL ou Base64 da foto de perfil atualmente salva (se houver).</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A', fontWeight: 500 }}>initialImage</td>
              <td style={{ padding: '12px 16px', color: '#49699F', fontFamily: 'monospace' }}>string</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Imagem inicial a ser aberta no editor para corte imediato.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A', fontWeight: 500 }}>initialStep</td>
              <td style={{ padding: '12px 16px', color: '#49699F', fontFamily: 'monospace' }}>CropperStep</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Passo inicial do componente (&apos;change-photo&apos; | &apos;upload&apos; | &apos;crop-preview&apos;).</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A', fontWeight: 500 }}>shape</td>
              <td style={{ padding: '12px 16px', color: '#49699F', fontFamily: 'monospace' }}>CropperShape</td>
              <td style={{ padding: '12px 16px', color: '#475157', fontFamily: 'monospace' }}>&apos;circle&apos;</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Formato da máscara de corte (&apos;circle&apos; | &apos;square&apos;).</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A', fontWeight: 500 }}>viewMode</td>
              <td style={{ padding: '12px 16px', color: '#49699F', fontFamily: 'monospace' }}>CropperViewMode</td>
              <td style={{ padding: '12px 16px', color: '#475157', fontFamily: 'monospace' }}>&apos;inline&apos;</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Modo de exibição do componente (&apos;modal&apos; | &apos;inline&apos;).</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A', fontWeight: 500 }}>theme</td>
              <td style={{ padding: '12px 16px', color: '#49699F', fontFamily: 'monospace' }}>CropperTheme</td>
              <td style={{ padding: '12px 16px', color: '#475157', fontFamily: 'monospace' }}>&apos;light&apos;</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Tema visual de cor (&apos;light&apos; | &apos;dark&apos;).</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A', fontWeight: 500 }}>onClose</td>
              <td style={{ padding: '12px 16px', color: '#49699F', fontFamily: 'monospace' }}>{'() => void'}</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Callback disparado quando o usuário clica no botão de fechar ou cancelar.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A', fontWeight: 500 }}>onSave</td>
              <td style={{ padding: '12px 16px', color: '#49699F', fontFamily: 'monospace' }}>{'(result: CropResult) => void'}</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Callback disparado quando o usuário confirma o corte da imagem.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A', fontWeight: 500 }}>onDelete</td>
              <td style={{ padding: '12px 16px', color: '#49699F', fontFamily: 'monospace' }}>{'() => void'}</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Callback disparado quando o usuário clica em remover a foto atual.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A', fontWeight: 500 }}>onStepChange</td>
              <td style={{ padding: '12px 16px', color: '#49699F', fontFamily: 'monospace' }}>{'(step: CropperStep) => void'}</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Callback disparado quando o passo atual é alterado.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A', fontWeight: 500 }}>customTexts</td>
              <td style={{ padding: '12px 16px', color: '#49699F', fontFamily: 'monospace' }}>CropperCustomTexts</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Textos customizados para internacionalização.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A', fontWeight: 500 }}>maxFileSizeMB</td>
              <td style={{ padding: '12px 16px', color: '#49699F', fontFamily: 'monospace' }}>number</td>
              <td style={{ padding: '12px 16px', color: '#475157', fontFamily: 'monospace' }}>10</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Tamanho máximo permitido para o arquivo em MB.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A', fontWeight: 500 }}>className</td>
              <td style={{ padding: '12px 16px', color: '#49699F', fontFamily: 'monospace' }}>string</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Classes CSS adicionais.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 16px', color: '#22272A', fontWeight: 500 }}>style</td>
              <td style={{ padding: '12px 16px', color: '#49699F', fontFamily: 'monospace' }}>React.CSSProperties</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>-</td>
              <td style={{ padding: '12px 16px', color: '#475157' }}>Estilos CSS inline customizados.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 5. Boas Práticas (Do's & Don'ts) */}
      <UnooriaDocSectionHeader
        title="5. Boas Práticas (Do's & Don'ts)"
        description="Diretrizes de uso do Cropper para manter a consistência do design system."
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            backgroundColor: '#ECFDF5',
            border: '1px solid #A7F3D0',
            padding: 24,
            borderRadius: 12,
          }}
        >
          <h4 style={{ margin: '0 0 12px 0', color: '#065F46', fontSize: 16 }}>✅ Faça (Do)</h4>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.6, color: '#065F46' }}>
            <li>Permita que o usuário centralize visualmente o rosto ou o objeto principal.</li>
            <li>Forneça resoluções adequadas para evitar distorções no corte.</li>
            <li>Use o shape &quot;circle&quot; para fotos de perfil ou avatares.</li>
          </ul>
        </div>

        <div
          style={{
            backgroundColor: '#FEF2F2',
            border: '1px solid #FECACA',
            padding: 24,
            borderRadius: 12,
          }}
        >
          <h4 style={{ margin: '0 0 12px 0', color: '#991B1B', fontSize: 16 }}>❌ Não Faça (Don&apos;t)</h4>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.6, color: '#991B1B' }}>
            <li>Não use o Cropper para imagens de dimensões complexas ou muito longas.</li>
            <li>Evite pular a etapa de preview sem dar ao usuário a chance de ajustar a imagem.</li>
            <li>Não mude o shape para quadrados se o contexto for apenas a foto de perfil.</li>
          </ul>
        </div>
      </div>
    </UnooriaDocShell>
  );
};

const meta: Meta<typeof Cropper> = {
  title: 'Plataforma Unooria/Componentes/Cropper',
  component: Cropper,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    shape: {
      control: 'radio',
      options: ['circle', 'square'],
      description: 'Formato da máscara de corte',
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Tema visual de cor',
    },
    initialStep: {
      control: 'select',
      options: ['change-photo', 'upload', 'crop-preview'],
      description: 'Passo inicial do fluxo',
    },
  },
  args: {
    shape: 'circle',
    theme: 'light',
    initialStep: 'crop-preview',
    initialImage: DEMO_IMAGE,
  },
};

export default meta;

type Story = StoryObj<typeof Cropper>;

export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <CropperDocumentationPage />,
};

export const Playground: Story = {
  name: '🎮 Playground Interativo',
  render: (args) => (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center', backgroundColor: args.theme === 'dark' ? '#22272A' : '#F8FAFC', borderRadius: 12 }}>
      <Cropper {...args} />
    </div>
  ),
};

export const Passo1AlterarFoto: Story = {
  name: '1️⃣ Passo: Alterar Foto (#12694:9704)',
  render: () => (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center', backgroundColor: '#F8FAFC', borderRadius: 12 }}>
      <Cropper initialStep="change-photo" currentImage={DEMO_IMAGE} />
    </div>
  ),
};

export const Passo2AtualizeFoto: Story = {
  name: '2️⃣ Passo: Atualizar Foto (#12694:9719)',
  render: () => (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center', backgroundColor: '#F8FAFC', borderRadius: 12 }}>
      <Cropper initialStep="upload" />
    </div>
  ),
};

export const Passo3VisualizarFoto: Story = {
  name: '3️⃣ Passo: Visualize Nova Foto (#12694:9734)',
  render: () => (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center', backgroundColor: '#F8FAFC', borderRadius: 12 }}>
      <Cropper initialStep="crop-preview" initialImage={DEMO_IMAGE} />
    </div>
  ),
};
