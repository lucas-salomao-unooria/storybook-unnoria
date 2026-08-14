# Guia de Desenvolvimento do Gemini / Agentes - Design System Unooria

Este documento estabelece as regras e padrões arquiteturais obrigatórios para desenvolvimento, criação de componentes e documentação no Storybook para a Plataforma Unooria.

---

## 1. Arquitetura de Pastas e Separação de Responsabilidades

### `src/` (Código de Produção para Distribuição NPM)
- A pasta `src/` é estritamente destinada ao código de produção do pacote React/NPM.
- **REGRA CRÍTICA / PROIBIDO**: **NUNCA** inclua arquivos `.stories.tsx` dentro da pasta `src/`.
- Estrutura esperada por componente em `src/unooria/components/[NomeComponente]/`:
  - `[NomeComponente].tsx`: Código do componente React.
  - `[NomeComponente].types.ts`: Tipos e interfaces TypeScript.
  - `[NomeComponente].css` (opcional): Estilização utilizando os tokens CSS de `src/unooria/tokens/`.
  - `index.ts`: Re-exportação do componente e dos tipos.
- Todos os componentes criados devem ser registrados em `src/unooria/components/index.ts` e no index raiz do pacote em `src/index.ts`.

### `stories/` (Ambiente de Testes, Exibição e Documentação Storybook)
- A pasta `stories/` é o local exclusivo para todas as estórias e documentações do Storybook.
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

## 3. Validação e Qualidade de Código

Sempre que criar ou alterar um componente ou estória:
1. Verifique se os tokens CSS de `src/unooria/tokens/` foram respeitados.
2. Certifique-se de que os modos **Light** e **Dark** são suportados nativamente.
3. Execute `npx tsc --noEmit` para garantir 0 erros de compilação.
4. Execute `npm run build-storybook` para validar o build sem erros do Storybook.
