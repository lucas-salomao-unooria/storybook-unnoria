import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { gptElevation } from '../../../src/chatgpt/tokens/elevation';
import { gptOverlays } from '../../../src/chatgpt/tokens/colors';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  GptDocCard,
  GptDocGrid,
  GptDocFigmaSpecs,
  GptDocPractices,
  GptDocPropsTable,
  GptDocStage,
  GptDocThemeSwitcher,
} from '../../../.storybook/components';
import { Modal, Toggle } from '../../../src/chatgpt/components';
import { gptFigmaNodes } from '../fixtures';

const PUBLICADAS = ['sm', 'md', 'lg', 'xl'] as const;
const LOCAIS = ['knob', 'modal'] as const;

const DESCRICOES: Record<keyof typeof gptElevation, string> = {
  sm: 'Separação mínima — cartões em repouso e linhas destacadas.',
  md: 'Elevação de menu suspenso e popovers curtos.',
  lg: 'Elevação de painel lateral e de folhas de ação.',
  xl: 'Elevação máxima — camadas que cobrem a tela inteira.',
  knob: 'Efeito local do knob do Toggle, aplicado direto na elipse.',
  modal: 'Efeito local da superfície do Modal, aplicado direto no frame.',
};

/** Cartão de amostra de sombra. */
const AmostraDeSombra: React.FC<{ token: keyof typeof gptElevation }> = ({ token }) => (
  <div style={{ textAlign: 'center' }}>
    <div
      style={{
        width: 168,
        height: 96,
        borderRadius: 12,
        background: '#FFFFFF',
        boxShadow: gptElevation[token],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: 12,
        color: '#22272A',
      }}
    >
      --gpt-elevation-{token}
    </div>
    <div style={{ fontSize: 11, color: '#475157', marginTop: 10, maxWidth: 168 }}>
      {gptElevation[token]}
    </div>
  </div>
);

/**
 * Página de documentação rica dos tokens de elevação.
 */
const ElevacaoDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="ChatGPT"
      category="Fundamentos • Elevação & Overlays"
      title="Elevação & Overlays"
      description="As quatro sombras publicadas como estilos de efeito no Figma (Shadow/SM a Shadow/XL), as duas sombras aplicadas diretamente em componentes (knob do Toggle e superfície do Modal) e os oito overlays de scrim da coleção de estilos de pintura."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="A biblioteca é plana por padrão: sombra é exceção, reservada a camadas que saem do fluxo."
      barColor="#5856D6"
    />
    <GptDocGrid>
      <GptDocCard icon="🃏" title="Sombras publicadas">
        Quatro degraus com deslocamento vertical crescente e spread negativo, o que mantém a sombra
        contida sob a superfície em vez de vazar pelas laterais.
      </GptDocCard>
      <GptDocCard icon="🎛️" title="Efeitos locais">
        <code>knob</code> e <code>modal</code> não têm estilo publicado — foram lidos diretamente
        dos nós <code>Toggle/Knob</code> e <code>Modal</code>. Tokenizá-los evita hexadecimal
        avulso no CSS do componente.
      </GptDocCard>
      <GptDocCard icon="🫥" title="Overlays de scrim">
        <code>Overlay/Black 40%</code> é o scrim do <code>Modal</code>. Os degraus de branco
        servem a superfícies sobre mídia escura.
      </GptDocCard>
      <GptDocCard icon="📵" title="Superfícies planas">
        Nenhum componente de conteúdo usa sombra: cartões, campos e linhas se separam por contorno
        translúcido de 8% ou 10%. Sombra apenas em diálogo e knob.
      </GptDocCard>
    </GptDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Estilos de efeito e efeitos locais lidos via Plugin API."
      barColor="#5856D6"
    />
    <GptDocFigmaSpecs
      nodeId={gptFigmaNodes.modal}
      frameName="Modal · Toggle/Knob · Shadow/SM..XL"
      specs={[
        { label: 'Shadow/SM', value: '0 1 2 · preto 5%' },
        { label: 'Shadow/MD', value: '0 4 8 -2 · preto 10%' },
        { label: 'Shadow/LG', value: '0 8 24 -4 · preto 15%' },
        { label: 'Shadow/XL', value: '0 16 48 -8 · preto 20%' },
        { label: 'Knob (local)', value: '0 1 3 · preto 15%' },
        { label: 'Modal (local)', value: '0 8 32 -4 · preto 15%' },
      ]}
      deviations={[
        'A sombra do Modal (raio 32) fica entre Shadow/LG (24) e Shadow/XL (48) e não corresponde a nenhum estilo publicado. Foi tokenizada como --gpt-elevation-modal para preservar o valor exato do arquivo.',
        'Os seis efeitos são invariantes de tema no arquivo: as sombras continuam pretas no modo Dark, onde ganham menos leitura sobre a superfície #1C1C1C. Nenhuma variante clara foi inventada.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia das Sombras Publicadas"
      description="Os quatro degraus de Shadow/*, sobre a superfície bg/primary."
      barColor="#5856D6"
    />
    <GptDocStage label="Shadow/SM · MD · LG · XL" padding={40}>
      {PUBLICADAS.map((token) => (
        <AmostraDeSombra key={token} token={token} />
      ))}
    </GptDocStage>

    <UnooriaDocSectionHeader
      title="4. Matriz dos Efeitos Locais"
      description="Aplicados pelos componentes reais Toggle e Modal."
      barColor="#5856D6"
    />
    <GptDocStage label="Efeitos locais" padding={40}>
      {LOCAIS.map((token) => (
        <AmostraDeSombra key={token} token={token} />
      ))}
    </GptDocStage>

    <GptDocStage label="Nos componentes reais" padding={40}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
        <Toggle checked aria-label="Interruptor ligado" />
        <Toggle aria-label="Interruptor desligado" />
        <span style={{ fontSize: 11, color: '#475157' }}>--gpt-elevation-knob</span>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Modal withOverlay={false} title="Modal Title" style={{ width: 320 }}>
          <Modal.Body>Modal body content goes here.</Modal.Body>
        </Modal>
        <span style={{ fontSize: 11, color: '#475157' }}>--gpt-elevation-modal</span>
      </div>
    </GptDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de uso de profundidade."
      barColor="#5856D6"
    />
    <GptDocPractices
      dos={[
        'Reservar sombra para camadas que saem do fluxo — diálogos, menus e o knob do interruptor.',
        'Separar cartões e campos por contorno translúcido (--gpt-fill-8 e --gpt-fill-10), como faz o arquivo.',
        'Combinar o scrim --gpt-overlay-black-40 com a superfície do Modal ao cobrir a tela.',
        'Consumir os efeitos locais pelos tokens em vez de repetir a sombra no CSS do componente.',
      ]}
      donts={[
        'Empilhar duas sombras na mesma superfície.',
        'Aplicar Shadow/XL a cartões de conteúdo — a biblioteca é plana por padrão.',
        'Trocar a sombra por contorno colorido para simular elevação.',
        'Inventar variantes claras das sombras no modo Dark sem registrar o desvio.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a Temas"
      description="Os seis efeitos são invariantes; a leitura muda conforme a superfície embaixo."
      barColor="#5856D6"
    />
    <GptDocThemeSwitcher padding={40}>
      {() => (
        <>
          <Toggle checked aria-label="Interruptor ligado" />
          <Modal withOverlay={false} title="Modal Title" style={{ width: 300 }}>
            <Modal.Body>Modal body content goes here.</Modal.Body>
          </Modal>
        </>
      )}
    </GptDocThemeSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência Completa dos Efeitos e Overlays"
      description="Valor, variável CSS e aplicação de cada token."
      barColor="#5856D6"
    />
    <GptDocPropsTable
      title="Sombras"
      rows={(Object.keys(gptElevation) as (keyof typeof gptElevation)[]).map((token) => ({
        name: token,
        type: `--gpt-elevation-${token}`,
        default: gptElevation[token],
        description: DESCRICOES[token],
      }))}
    />
    <GptDocPropsTable
      title="Overlays"
      rows={(Object.keys(gptOverlays) as (keyof typeof gptOverlays)[]).map((key) => ({
        name: key,
        type: `--gpt-overlay-${key.replace(/([a-z])(\d)/, '$1-$2')}`,
        default: gptOverlays[key],
        description:
          key === 'black40'
            ? 'Scrim do Modal — o único overlay aplicado por um componente da biblioteca.'
            : 'Estilo de pintura publicado, disponível para scrims e superfícies translúcidas.',
      }))}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'ChatGPT/Fundamentos/Elevação & Overlays',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Sombras e overlays do ChatGPT, extraídos dos estilos de efeito e de pintura do arquivo Figma oficial.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

/**
 * Documentação rica e completa dos efeitos.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ElevacaoDocumentationPage />,
};

/**
 * As seis sombras da biblioteca, lado a lado.
 */
export const TodasAsSombras: Story = {
  name: '🃏 Todas as Sombras',
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', padding: 40 }}>
      {(Object.keys(gptElevation) as (keyof typeof gptElevation)[]).map((token) => (
        <AmostraDeSombra key={token} token={token} />
      ))}
    </div>
  ),
};
