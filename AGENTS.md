<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Diretrizes de Arquitetura e Storybook - Design System Unooria

## 1. Separação de Responsabilidade de Pastas

### `src/` (Código-Fonte de Produção - Pacote NPM)
- Reservado **exclusivamente** para os arquivos distribuídos no pacote NPM.
- **REGRA CRÍTICA / PROIBIDO**: Não crie arquivos `.stories.tsx` dentro da pasta `src/`.
- Cada componente deve residir em sua própria pasta sob `src/unooria/components/[NomeComponente]/`:
  - `[NomeComponente].tsx`: Implementação do componente React.
  - `[NomeComponente].types.ts`: Definições das interfaces e tipos TypeScript.
  - `[NomeComponente].css` (opcional): Estilos do componente baseados nos tokens de `src/unooria/tokens/`.
  - `index.ts`: Re-exportação do componente e seus tipos.
- Todos os componentes e tipos devem ser re-exportados no index global do pacote em `src/unooria/components/index.ts` e `src/index.ts`.

### `stories/` (Estórias e Documentação do Storybook)
- Reservado para todas as estórias e documentações do Storybook.
- **Componentes Unooria**: `stories/unooria/components/[NomeComponente].stories.tsx`.
- **Fundação & Tokens Unooria**: `stories/unooria/foundation/` (`Colors.stories.tsx`, `Typography.stories.tsx`, `Spacing.stories.tsx`, `Elevation.stories.tsx`, etc.).
- **Clone WhatsApp**: `stories/whatsapp/` (para tokens e componentes do clone WhatsApp).

---

## 2. Convenção Oficial de Documentação em Componentes (Padrão Ouro)

Para garantir máxima fidelidade visual do Figma, interatividade total (cópia de tokens, simuladores, matrizes) e uma sidebar limpa sem duplicações ou telas em branco do addon-docs:

### 2.1. Estrutura da Página de Documentação Rica
Todo componente **DEVE** declarar sua página de documentação rica usando os componentes utilitários de `src/unooria/docs`:
```tsx
import { UnooriaDocShell, UnooriaDocHeader, UnooriaDocSectionHeader } from '../../../src/unooria/docs';

const [NomeComponente]DocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Plataforma Unooria"
      category="Componentes • [Categoria]"
      title="[NomeComponente]"
      description="[Descrição extraída das especificações de design do Figma]"
    />

    {/* Seções obrigatórias:
        1. Visão Geral & Motivos de Uso
        2. Figma & Especificações (Link e Node IDs)
        3. Anatomia do Componente
        4. Matriz de Variantes e Estados
        5. Boas Práticas (Do's & Don'ts)
        6. Suporte a Temas (Light e Dark)
        7. Tabela de Props API */}
  </UnooriaDocShell>
);
```

### 2.2. Configuração do Objeto `meta`
O objeto `meta` **NÃO DEVE** usar `tags: ['autodocs']` (para evitar abas vazias ou redundâncias na sidebar):
```tsx
const meta: Meta<typeof [NomeComponente]> = {
  title: 'Plataforma Unooria/Componentes/[NomeComponente]',
  component: [NomeComponente],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    // Especificação de controles e tipos
  },
  args: {
    // Valores padrão para o Playground
  },
};

export default meta;
```

### 2.3. Ordem Obrigatória de Exportação das Estórias
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

2. **Histórias Interativas Subsequentes**:
   - `Playground` / `Default`: Estória interativa com controls e container que adapta o fundo conforme o tema (`light` / `dark`).
   - `TodasVariantes` / `AllSeverities`: Matrizes visuais completas de variantes.
   - `Tamanhos` / `Sizes`: Comparação de tamanhos suportados.
   - `Estados` / `States`: Estados interativos (hover, active, focus, disabled, loading).
   - Estórias adicionais de recursos específicos (ex: `ComIcones`, `Dismissible`, etc.).

---

## 3. Validação Obrigatória
Antes de considerar qualquer tarefa de componente ou documentação concluída:
1. Executar `npx tsc --noEmit` e garantir 0 erros de compilação TypeScript.
2. Executar `npm run build-storybook` e validar o build sem falhas do Storybook.
