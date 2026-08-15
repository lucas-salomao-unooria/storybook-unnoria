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
- **Tokens do Design System**: Armazenados em `src/unooria/tokens/` (`colors.css`, `typography.css`, `spacing.css`, `elevation.css`, `blur.css`, `grids.css`, etc.).

### 1.2. `stories/` (Ambiente de Testes, Exibição e Documentação Storybook)
- Reservado para todas as estórias, documentações interativas e playgrounds do Storybook.
- **Componentes da Plataforma Unooria**: `stories/unooria/components/[NomeComponente].stories.tsx`.
- **Fundação & Tokens Unooria**: `stories/unooria/foundation/` (`Colors.stories.tsx`, `Typography.stories.tsx`, `Spacing.stories.tsx`, `Elevation.stories.tsx`, `Blur.stories.tsx`, `Grids.stories.tsx`, etc.).
- **Clone WhatsApp**: `stories/whatsapp/` (para tokens, telas e componentes do clone WhatsApp).
- **Componentes Utilitários de Documentação**: Localizados em `.storybook/components/` (`UnooriaDocShell`, `UnooriaDocHeader`, `UnooriaDocSectionHeader`).

---

## 2. Convenção Oficial de Documentação em Componentes (Padrão Ouro)

Para garantir máxima fidelidade visual do Figma, interatividade total (cópia de tokens, simuladores, matrizes) e uma sidebar limpa sem duplicações ou telas em branco do `addon-docs`:

### 2.1. Uso Obrigatório do Componente Real da Pasta `src/`
- **REGRA MANDATÓRIA**: O Storybook deve **sempre importar e renderizar o componente real de produção da pasta `src/`**.
- É terminantemente **proibido** criar mockups paralelos ou réplicas artificiais dentro de `stories/`. Toda funcionalidade, estado, estilo, acessibilidade e temas devem ser consumidos diretamente do componente oficial.

### 2.2. Estrutura da Página de Documentação Rica
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

### 2.3. Configuração do Objeto `meta`
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

### 2.4. Ordem Obrigatória de Exportação das Estórias
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

## 3. Diretrizes de Qualidade Visual, UX e Acessibilidade

### 3.1. Visualização de Dados (DataViz)
- **SVG Puro (Zero Dependências)**: Gráficos vetoriais renderizados nativamente em SVG com React, sem bibliotecas pesadas de terceiros (D3, Chart.js, Recharts).
- **Balões Flutuantes Inteligentes (`DataVizTooltip`)**: Todos os gráficos pertinentes devem exibir balões estilizados no hover com categoria, indicador cromático e valores formatados.
- **Gráfico Radar**: 100% customizável em quantidade de eixos ($\ge 3$), níveis de profundidade da grade (`gridLevels`), escala máxima (`maxValue`), rótulos de escala e múltiplas séries sobrepostas.
- **Scrollbars Sutis**: Toda rolagem interna (legendas de gráficos, listas de ranking, corpo de modais) deve usar `scrollbar-width: thin` e trilhos transparentes, eliminando scrollbars cinzas do Windows com setas.

### 3.2. Contraste e Suporte Nativo a Temas (Light & Dark)
- No **Light Mode**: Fundo branco `#FFFFFF`, texto primário `#22272A`, texto secundário `#383E41` / `#617379`, bordas `#E4E8E9`.
- No **Dark Mode**: Fundo escuro `#22272A` / `#181C1E`, texto primário `#FFFFFF` / `#F5F5F5`, texto secundário `#A7B5B9`, bordas `#383E41` / `#475157`.
- **Prevenção de Camuflagem**: Garantir que títulos e valores numéricos em cards (ex: `MetricCard`) sobrescrevam cores para `#FFFFFF` no Dark Mode.

### 3.3. Acessibilidade (a11y)
- Semântica ARIA completa (`role="dialog"`, `role="progressbar"`, `role="button"`, `aria-expanded`, `aria-controls`, `aria-labelledby`, `aria-describedby`).
- Navegação completa por teclado (ESC para fechar modais/menus, Tab/Shift+Tab com focus trapping, Enter/Espaço para acionamento).

---

## 4. Validação Obrigatória e Critérios de Aceite
Antes de considerar qualquer tarefa de componente ou documentação concluída:
1. Executar `npx tsc --noEmit` e garantir **0 erros de compilação TypeScript**.
2. Executar `npm run build-storybook` e validar o **build sem falhas do Storybook**.
