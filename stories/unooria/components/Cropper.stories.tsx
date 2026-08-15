import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Cropper } from '../../../src/unooria/components/Cropper/Cropper';
import {
  CropperProps,
  CropperStep,
  CropResult,
} from '../../../src/unooria/components/Cropper/Cropper.types';
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';

const DEMO_IMAGE = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80';

/**
 * Página de Documentação Rica do Cropper baseada no Padrão Ouro do Design System Unooria
 */
const CropperDocumentationPage = () => {
  const [result, setResult] = useState<CropResult | null>(null);

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
