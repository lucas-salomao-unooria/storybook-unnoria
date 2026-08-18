<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Diretrizes de Arquitetura e Storybook - Design System Unooria (Padrão Ouro)

Este documento é a referência arquitetural e técnica obrigatória para o desenvolvimento de componentes, tokens e documentação interativa no Storybook da **Plataforma Unooria**.

---

## 1. Separação Estrita de Responsabilidade de Pastas

### 1.1. `src/` (Código-Fonte de Produção - Pacote NPM)
- Reservado **exclusivamente** para os arquivos distribuídos no pacote NPM.
- **REGRA CRÍTICA / PROIBIDO**: **NUNCA** crie arquivos `.stories.tsx` dentro da pasta `src/`.
- Cada componente deve residir em sua própria pasta sob `src/unooria/components/[NomeComponente]/`:
  - `[NomeComponente].tsx`: Implementação oficial do componente React (com forwardRef, acessibilidade e composição modular).
  - `[NomeComponente].types.ts`: Definições tipadas de interfaces e types TypeScript (Props, variantes, temas e handlers).
  - `[NomeComponente].css` (opcional): Estilos CSS nativos do componente baseados exclusivamente nos tokens de `src/unooria/tokens/`.
  - `index.ts`: Re-exportação do componente principal, subcomponentes e tipos.
- **Re-exportações Globais**: Todos os componentes e tipos devem ser registrados em `src/unooria/components/index.ts` e no ponto de entrada raiz do pacote em `src/index.ts`.
- **Tokens do Design System**: Armazenados em `src/unooria/tokens/` (`colors.css`, `typography.css`, `spacing.css`, `elevation.css`, `blur.css`, `grids.css`, `icons.css`, `scrollbar.css`, etc.).

### 1.2. `stories/` (Ambiente de Testes, Exibição e Documentação Storybook)
- Reservado para todas as estórias, documentações interativas e playgrounds do Storybook.
- **Componentes da Plataforma Unooria**: `stories/unooria/components/[NomeComponente].stories.tsx`.
- **Fundação & Tokens Unooria**: `stories/unooria/foundation/` (`Colors.stories.tsx`, `Typography.stories.tsx`, `Spacing.stories.tsx`, `Elevation.stories.tsx`, `Blur.stories.tsx`, `Grids.stories.tsx`, `Icons.stories.tsx`, etc.).
- **Clone WhatsApp**: `stories/whatsapp/` (para tokens, telas e componentes do clone WhatsApp).
- **Componentes Utilitários de Documentação**: Localizados em `.storybook/components/` (`UnooriaDocShell`, `UnooriaDocHeader`, `UnooriaDocSectionHeader`).

---

## 2. Uso Obrigatório e Estrito de Design Tokens (Zero Cores Hardcoded)

Todo e qualquer componente, estilo ou documentação **DEVE** utilizar exclusivamente as variáveis CSS oficiais criadas em `src/unooria/tokens/`. É **terminantemente proibido** utilizar valores hexadecimais avulsos ou cores arbitrárias de outros frameworks (ex: Tailwind `#e2e8f0`, `#64748b`, etc.).

### 2.1. Tokens de Cores e Overlays (`src/unooria/tokens/colors.css`)
- **Escala Primária (Brand Navy)**: `var(--unooria-color-brandnavy-50)` a `var(--unooria-color-brandnavy-950)`.
  - Cor de Destaque / Botões: `var(--unooria-color-brandnavy-600, #7FA5E2)`.
  - Cor Ativa / Selecionada: `var(--unooria-color-brandnavy-700, #6487C2)`.
- **Escala Neutra Light (Modo Claro)**:
  - Fundo Branco: `var(--unooria-color-neutral-50, #FFFFFF)`.
  - Fundo Secundário / Cards: `var(--unooria-color-neutral-100, #F5F5F5)`.
  - Bordas e Divisores: `var(--unooria-color-neutral-150, #E4E8E9)` ou `var(--unooria-color-neutral-200, #CBD4D6)`.
  - Texto Secundário / Muted: `var(--unooria-color-neutral-700, #475157)` ou `var(--unooria-color-neutral-500, #617379)`.
  - Texto Principal: `var(--unooria-color-neutral-950, #22272A)`.
- **Escala Neutra Dark (Modo Escuro)**:
  - Fundo Container Escuro: `var(--unooria-color-neutraldark-50, #22272A)`.
  - Bordas e Divisores Dark: `var(--unooria-color-neutraldark-200, #3D4448)`.
  - Texto Secundário Dark: `var(--unooria-color-neutraldark-900, #CBD4D6)`.
  - Texto Principal Dark: `var(--unooria-color-neutraldark-950, #F5F5F5)`.
- **Overlays e Transparências (RGBA Semântico)**:
  - `var(--unooria-color-opacity-brandnavy-50)` (5%), `100` (10%), `200` (20%), `300` (30%).
  - `var(--unooria-color-opacity-neutraldark-50)` (5%), `100` (10%), `300` (30%).
  - `var(--unooria-color-opacity-neutrallight-50)` (5%), `100` (10%), `300` (30%).
- **Severidades e Estados de Feedback**:
  - Danger (Perigo/Erro): `var(--unooria-color-danger-600, #E31A1A)`.
  - Success (Sucesso): `var(--unooria-color-success-500, #01B574)`.
  - Warning (Atenção): `var(--unooria-color-warning-500, #F97607)`.
  - Info / Ação: `var(--unooria-color-info-500, #0086FF)`.

### 2.2. Tipografia, Espaçamento, Bordas e Scrollbar
- **Tipografia**: `var(--unooria-font-sans, 'Open Sans', sans-serif)`.
- **Espaçamento**: `var(--unooria-spacing-4xs)` (2px) a `var(--unooria-spacing-xxxl)` (64px).
- **Raios de Borda**: `var(--unooria-radius-s)` (4px), `var(--unooria-radius-m)` (8px/12px), `var(--unooria-radius-full, 1000px)`.
- **Barra de Rolagem**: `var(--unooria-scrollbar-*)` e utilitários `.unooria-scrollbar`.

---

## 3. Convenção Oficial de Documentação em Componentes (Padrão Ouro)

Para garantir máxima fidelidade visual do Figma, interatividade total (cópia de tokens, simuladores, matrizes) e uma sidebar limpa sem duplicações ou telas em branco do `addon-docs`:

### 3.1. Uso Obrigatório do Componente Real da Pasta `src/`
- **REGRA MANDATÓRIA**: O Storybook deve **sempre importar e renderizar o componente real de produção da pasta `src/`**.
- É terminantemente **proibido** criar mockups paralelos ou réplicas artificiais dentro de `stories/`. Toda funcionalidade, estado, estilo, acessibilidade e temas devem ser consumidos diretamente do componente oficial.

### 3.2. Estrutura da Página de Documentação Rica
Todo componente **DEVE** declarar sua página de documentação rica usando os componentes utilitários de `.storybook/components`:
```tsx
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../.storybook/components';

const [NomeComponente]DocumentationPage = () => (
  <UnooriaDocShell>
    {/* 1. Cabeçalho Oficial com Badge, Categoria, Título e Descrição */}
    <UnooriaDocHeader
      badgeBrand="Plataforma Unooria"
      category="Componentes • [Categoria]"
      title="[NomeComponente]"
      description="[Descrição conceitual e técnica extraída das especificações do Figma]"
    />

    {/* Seções Obrigatórias:
        1. Visão Geral & Casos de Uso (Cards explicativos com ícones e propósito funcional)
        2. Figma & Especificações Técnicas (Link Dev Mode, Node ID Master e Component Sets)
        3. Anatomia do Componente (Zonas de customização, subcomponentes e propriedades visuais)
        4. Matriz de Variantes, Tamanhos e Estados (Exemplos renderizando o componente real)
        5. Boas Práticas (Cards comparativos de DO e DON'T com cores verde/vermelho)
        6. Suporte a Temas (Demonstração interativa com alternador em tempo real Light e Dark)
        7. Referência Completa de Props da API (Tabelas individuais detalhadas por componente) */}
  </UnooriaDocShell>
);
```

### 3.3. Configuração do Objeto `meta`
O objeto `meta` **NÃO DEVE** usar `tags: ['autodocs']` (para evitar abas vazias ou redundâncias na sidebar):
```tsx
const meta: Meta<typeof [NomeComponente]> = {
  title: 'Plataforma Unooria/Componentes/[NomeComponente]',
  component: [NomeComponente],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    // Especificação completa de tipos, controls e descrições das props
  },
  args: {
    // Valores padrão para o Playground
  },
};

export default meta;
```

### 3.4. Ordem Obrigatória de Exportação das Estórias
1. **Primeira História (Mandatória - Bullet de Documentação Dedicado)**:
   ```tsx
   type Story = StoryObj<typeof [NomeComponente]>;

   /**
    * Documentação rica e completa do componente baseada nas especificações do Figma.
    */
   export const Documentacao: Story = {
     name: '📄 Documentação Completa',
     render: () => <[NomeComponente]DocumentationPage />,
   };
   ```

2. **Playgrounds Individuais com 100% das Props Mapeadas**:
   - Cada componente (ou subcomponente individual no caso de suítes como `DataViz`) deve possuir seu próprio **Playground Dedicado** (`🕹️ 1. ...`, `🕹️ 2. ...`) com **todas as propriedades da API expostas em `args` e `argTypes`** (controles de texto, números, sliders de escala, radios de temas, booleans e JSON de dados).

3. **Histórias Interativas e Canônicas Subsequentes**:
   - `🎨 Exemplo Oficial do Figma`: Réplica visual de 1:1 dos frames oficiais do Figma (ex: formulário de 5 campos no `Modal`, itens de slot no `Collapse`).
   - `TodasVariantes` / `AllSeverities`: Matrizes visuais completas de variantes.
   - `Tamanhos` / `Sizes`: Comparação de tamanhos suportados (`sm`, `md`, `lg`, `full`).
   - `Estados` / `States`: Estados interativos (hover, active, focus, disabled, loading).
   - `ComposicaoModular`: Uso flexível com Compound Components (`[Componente].Header`, `[Componente].Body`, etc.).

---

## 4. Diretrizes de Qualidade Visual, UX e Acessibilidade

### 4.1. Visualização de Dados (DataViz)
- **SVG Puro (Zero Dependências)**: Gráficos vetoriais renderizados nativamente em SVG com React, sem bibliotecas pesadas de terceiros (D3, Chart.js, Recharts).
- **Balões Flutuantes Inteligentes (`DataVizTooltip`)**: Todos os gráficos pertinentes devem exibir balões estilizados no hover com categoria, indicador cromático e valores formatados.
- **Gráfico Radar**: 100% customizável em quantidade de eixos ($\ge 3$), níveis de profundidade da grade (`gridLevels`), escala máxima (`maxValue`), rótulos de escala e múltiplas séries sobrepostas.
- **Scrollbars Sutis**: Toda rolagem interna (legendas de gráficos, listas de ranking, corpo de modais) deve usar `scrollbar-width: thin` e trilhos transparentes, eliminando scrollbars cinzas do Windows com setas.

### 4.2. Contraste e Suporte Nativo a Temas (Light & Dark)
- No **Light Mode**: Fundo branco `var(--unooria-color-neutral-50, #FFFFFF)`, texto primário `var(--unooria-color-neutral-950, #22272A)`, texto secundário `var(--unooria-color-neutral-700, #475157)`, bordas `var(--unooria-color-neutral-150, #E4E8E9)`.
- No **Dark Mode**: Fundo escuro `var(--unooria-color-neutraldark-50, #22272A)`, texto primário `var(--unooria-color-neutraldark-950, #F5F5F5)`, texto secundário `var(--unooria-color-neutraldark-900, #CBD4D6)`, bordas `var(--unooria-color-neutraldark-200, #3D4448)`.
- **Prevenção de Camuflagem**: Garantir que títulos e valores numéricos em cards sobrescrevam cores para texto claro no Dark Mode.

### 4.3. Acessibilidade (a11y)
- Semântica ARIA completa (`role="dialog"`, `role="progressbar"`, `role="button"`, `role="region"`, `aria-expanded`, `aria-controls`, `aria-labelledby`, `aria-describedby`).
- Navegação completa por teclado (ESC para fechar modais/menus, Tab/Shift+Tab com focus trapping, Enter/Espaço para acionamento).

---

## 5. Validação Obrigatória e Critérios de Aceite
Antes de considerar qualquer tarefa de componente ou documentação concluída:
1. Validar que **todos os estilos e cores consomem variáveis CSS de `src/unooria/tokens/`**.
2. Executar `npx tsc --noEmit` e garantir **0 erros de compilação TypeScript**.
3. Executar `npm run build-storybook` e validar o **build sem falhas do Storybook**.
