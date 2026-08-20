import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { tikColorGroups } from '../../../src/tiktooria/tokens';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  TikDocCard,
  TikDocDeviations,
  TikDocFigmaSpecs,
  TikDocGrid,
  TikDocPractices,
  TikDocStage,
  TikDocSurfaceSwitcher,
  TikDocTokenSwatch,
} from '../../../.storybook/components';
import { Avatar, SettingsRow, VideoMeta } from '../../../src/tiktooria';
import { tikAvatarCraig } from '../fixtures';

const meta: Meta = {
  title: 'Tik Tooria/Fundamentos/Cores',
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj;

const ColorsDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Fundamentos • Cores"
      title="Cores"
      description="A paleta do Tik Tooria foi lida via Plugin API do arquivo Figma “TikTok UI Screens (Community) - cópia”. O arquivo publica quatro variáveis de cor — Tik Tok Button, Tik Tok Pink, Tik Tok Light Blue e Tik Tok Dark; todo o restante foi extraído do preenchimento literal do nó de origem, cujo identificador está registrado em cada token."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Como a paleta se organiza e por que ela não é um par claro/escuro."
      barColor="#EA4359"
    />
    <TikDocGrid>
      <TikDocCard icon="🎨" title="Quatro variáveis publicadas">
        A marca vive em <code>--tik-color-brand-button</code>, <code>-pink</code>, <code>-cyan</code> e{' '}
        <code>-dark</code>. São as únicas cores que o arquivo expõe como variável; todas as outras
        foram lidas do nó.
      </TikDocCard>
      <TikDocCard icon="🌓" title="Dois contextos, não dois temas">
        O arquivo publica um cromo claro (listas, perfil, configurações) e um contexto imersivo preto
        (feed, câmera, leitor de QR). Não existe versão escura da folha de comentários nem versão
        clara do feed — por isso o módulo não tem <code>data-tik-theme</code>.
      </TikDocCard>
      <TikDocCard icon="🔒" title="Paleta de terceiros isolada">
        Os discos de WhatsApp, Messenger, SMS, Instagram e Facebook usam tokens
        <code> --tik-color-social-*</code> exclusivos da folha de compartilhamento. É proibido
        reaproveitá-los em qualquer outro componente.
      </TikDocCard>
      <TikDocCard icon="🧾" title="Rastreabilidade por nó">
        Cada token carrega <code>figmaNode</code> em <code>colors.ts</code>. Uma divergência entre
        código e arquivo pode sempre ser conferida abrindo o nó no Dev Mode.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Origem dos valores e desvios registrados."
      barColor="#E6436D"
    />
    <TikDocFigmaSpecs
      nodeId="4:171"
      frameName="Página TikTok — 15 telas de 414×896"
      specs={[
        { label: 'Variáveis de cor publicadas', value: '4' },
        { label: 'Tokens de cor derivados', value: '43' },
        { label: 'Gradientes literais', value: '3' },
        { label: 'Estilos de efeito publicados', value: '2' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Ausência de tema claro/escuro',
          detail:
            'o arquivo não publica o mesmo componente em duas versões cromáticas. Modelar um tema exigiria inventar, por exemplo, uma folha de comentários escura — o que é proibido. Em vez disso, os componentes que aparecem nos dois contextos (StatusBar, HomeIndicator, TabBar, PhoneFrame) recebem a prop `surface`, e ambos os valores são literais do arquivo.',
        },
        {
          subject: 'Gradiente angular do disco',
          detail:
            'o Figma descreve um GRADIENT_ANGULAR com paradas em 0,126 / 0,384 / 0,628 / 0,88. Foi traduzido para `conic-gradient` multiplicando cada posição por 360°, preservando as cores e a ordem.',
        },
        {
          subject: 'Gradiente radial do Instagram',
          detail:
            'o arquivo declara o gradiente sem centro explícito. O CSS usa `circle at 30% 107%`, posição canônica da marca, mantendo as quatro paradas literais.',
        },
        {
          subject: 'Onze brancos e três cinzas quase idênticos',
          detail:
            '#FFFFFF aparece 177 vezes com funções distintas (superfície, calha de grade, texto imersivo). Os usos foram separados em tokens semânticos distintos apontando para o mesmo valor, de modo que uma futura divergência de tema não exija refatoração.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia da paleta"
      description="Os oito grupos de tokens, na ordem em que o produto os consome. Clique em qualquer amostra para copiar a variável."
      barColor="#65D2E9"
    />
    {tikColorGroups.map((group) => (
      <div key={group.name} style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 16, margin: '0 0 4px 0', color: '#22272A' }}>{group.name}</h3>
        <p style={{ fontSize: 13, margin: '0 0 14px 0', color: '#475157' }}>{group.description}</p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
            gap: 14,
          }}
        >
          {Object.entries(group.tokens).map(([key, token]) => (
            <TikDocTokenSwatch
              key={key}
              name={key}
              cssVar={token.cssVar}
              value={token.value}
              figmaName={token.figmaVariable ?? token.figmaNode}
            />
          ))}
        </div>
      </div>
    ))}

    <UnooriaDocSectionHeader
      title="4. Matriz de contraste em uso"
      description="Os mesmos componentes sobre as superfícies do arquivo, para conferir a hierarquia de leitura."
      barColor="#161722"
    />
    <TikDocStage label="Cromo claro — linha de configuração" surface="chrome" align="stretch" direction="column" width={414}>
      <SettingsRow label="Manage my account" icon="accountStroke" />
      <SettingsRow label="Privacy and safety" icon="lock" />
    </TikDocStage>
    <TikDocStage label="Imersivo — metadados sobre o vídeo" surface="immersive" align="stretch" direction="column" width={414}>
      <VideoMeta
        handle="@craig_love"
        caption="The most satisfying Job"
        tags="#fyp #satisfying #roadmarking"
        music="Roddy Roundicch - The Rou"
      />
    </TikDocStage>

    <UnooriaDocSectionHeader
      title="5. Boas práticas"
      description="Regras de aplicação da paleta."
      barColor="#EA4359"
    />
    <TikDocPractices
      dos={[
        'Consuma sempre a variável CSS (var(--tik-color-…)), nunca o hexadecimal.',
        'Use --tik-color-text-secondary para metadados e --tik-color-text-muted apenas em descrições de estado vazio: são dois valores distintos no arquivo.',
        'Sobre superfície imersiva, aplique o estilo Text Drop aos rótulos que ficam por cima do vídeo.',
        'Mantenha os tokens de terceiros restritos à folha de compartilhamento e a “Find friends”.',
      ]}
      donts={[
        'Não use var(--unooria-*), var(--insta-*), var(--gpt-*) nem var(--wa-*) dentro do Tik Tooria.',
        'Não consolide #86878B, #8A8B8F e #7C7D83 em um único token: o arquivo os usa em contextos diferentes.',
        'Não derive um tema escuro por cálculo a partir do cromo claro — os valores não existem no arquivo.',
        'Não reaproveite --tik-color-brand-pink ou -cyan fora do botão de criação.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="Alternador entre os dois contextos publicados. O avatar e a tipografia são os mesmos componentes de produção em ambos."
      barColor="#65D2E9"
    />
    <TikDocSurfaceSwitcher>
      {(surface) => (
        <>
          <Avatar size="sm" src={tikAvatarCraig} alt="" ring={surface === 'immersive'} />
          <span
            style={{
              fontSize: 17,
              fontWeight: 600,
              color:
                surface === 'immersive'
                  ? 'var(--tik-color-text-on-immersive)'
                  : 'var(--tik-color-text-primary)',
            }}
          >
            @craig_love
          </span>
        </>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência da API de tokens"
      description="A lista completa está em src/tiktooria/tokens/colors.ts, com cssVar, value, usage e figmaNode por token."
      barColor="#161722"
    />
    <TikDocCard icon="📦" title="Importação">
      <pre style={{ margin: 0, fontSize: 12.5, whiteSpace: 'pre-wrap' }}>{`import '@unooria/design-system/tiktooria.css';
import { TikTooriaUI } from '@unooria/design-system';

// ou apenas a marca:
import { Avatar, TabBar } from '@unooria/design-system/tiktooria';`}</pre>
    </TikDocCard>
  </UnooriaDocShell>
);

/**
 * Documentação rica e completa da paleta, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ColorsDocumentationPage />,
};

/**
 * Todas as amostras de cor em uma grade única, para varredura rápida.
 */
export const TodosOsTokens: Story = {
  name: '🎨 Todos os tokens de cor',
  render: () => (
    <UnooriaDocShell>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 14,
        }}
      >
        {tikColorGroups.flatMap((group) =>
          Object.entries(group.tokens).map(([key, token]) => (
            <TikDocTokenSwatch
              key={`${group.name}-${key}`}
              name={key}
              cssVar={token.cssVar}
              value={token.value}
              figmaName={token.figmaVariable ?? token.figmaNode}
            />
          ))
        )}
      </div>
    </UnooriaDocShell>
  ),
};

/**
 * As quatro variáveis de cor que o arquivo de design publica.
 */
export const VariaveisPublicadas: Story = {
  name: '⭐ Variáveis publicadas pelo Figma',
  render: () => (
    <UnooriaDocShell>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {Object.entries(tikColorGroups[0].tokens).map(([key, token]) => (
          <TikDocTokenSwatch
            key={key}
            name={key}
            cssVar={token.cssVar}
            value={token.value}
            figmaName={token.figmaVariable}
          />
        ))}
      </div>
    </UnooriaDocShell>
  ),
};
