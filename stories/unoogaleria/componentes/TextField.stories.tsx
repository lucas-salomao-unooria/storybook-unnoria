import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { TextField } from '../../../src/unoogaleria/components/TextField';
import { Button } from '../../../src/unoogaleria/components/Button';
import { IconButton } from '../../../src/unoogaleria/components/IconButton';
import { PhoneFrame } from '../../../src/unoogaleria/components/PhoneFrame';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UglDocGrid,
  UglDocCard,
  UglDocSpecs,
  UglDocDecisions,
  UglDocAnatomy,
  UglDocStage,
  UglDocPractices,
  UglDocThemeSwitcher,
  UglDocPropsTable,
} from '../../../.storybook/components';
import { uglAlbums, uglMediaItems } from '../fixtures';

const BAR = '#716C98';

/** Limite de caracteres do nome de álbum na demonstração. */
const ALBUM_NAME_LIMIT = 40;

/** Foto com legenda, para o exemplo imersivo. */
const photoWithCaption = uglMediaItems.find((item) => item.type === 'photo' && item.description) ?? uglMediaItems[0];

/**
 * Nome de álbum controlado pela estória, com validação de nome repetido.
 */
const AlbumNameField: React.FC = () => {
  const [name, setName] = useState('');
  const taken = uglAlbums.some(
    (album) => album.title.toLocaleLowerCase('pt-BR') === name.trim().toLocaleLowerCase('pt-BR')
  );

  return (
    <TextField
      label="Nome do álbum"
      placeholder="Ex.: Viagem de férias"
      value={name}
      onChange={(next) => setName(next)}
      maxLength={ALBUM_NAME_LIMIT}
      helperText="Aparece na aba Álbuns."
      error={taken ? 'Já existe um álbum com esse nome.' : undefined}
    />
  );
};

/**
 * Tela "Novo álbum" no aparelho.
 */
const NewAlbumScreen: React.FC = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--ugl-color-background-secondary)',
    }}
  >
    <header
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        padding: 'var(--ugl-safe-area-top) var(--ugl-spacing-xs) 0',
        minHeight: 'calc(var(--ugl-safe-area-top) + var(--ugl-topbar-height))',
        boxSizing: 'border-box',
        background: 'var(--ugl-color-surface-bar)',
      }}
    >
      <Button variant="tertiary" size="md" style={{ justifySelf: 'start' }}>
        Cancelar
      </Button>
      <h1 className="ugl-text ugl-text--title-md">Novo álbum</h1>
      <Button variant="tertiary" size="md" style={{ justifySelf: 'end' }}>
        Criar
      </Button>
    </header>
    <form
      onSubmit={(event) => event.preventDefault()}
      style={{ display: 'grid', gap: 'var(--ugl-spacing-xl)', padding: 'var(--ugl-spacing-xl) var(--ugl-gutter)' }}
    >
      <AlbumNameField />
      <TextField
        label="Descrição"
        multiline
        rows={4}
        maxLength={200}
        placeholder="Para que serve este álbum?"
        helperText="Opcional."
      />
    </form>
  </div>
);

/**
 * Legenda editada sobre a foto, na superfície imersiva.
 */
const ImmersiveCaption: React.FC = () => (
  <div
    data-ugl-immersive=""
    style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--ugl-color-immersive-surface)',
    }}
  >
    <div style={{ padding: 'var(--ugl-safe-area-top) var(--ugl-spacing-xs) 0', display: 'flex' }}>
      <IconButton icon="back" label="Voltar" variant="bar" />
    </div>
    <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center' }}>
      <img src={photoWithCaption.src} alt={photoWithCaption.alt} style={{ width: '100%', maxHeight: '100%', objectFit: 'contain' }} />
    </div>
    <div style={{ padding: 'var(--ugl-spacing-l) var(--ugl-gutter) calc(var(--ugl-safe-area-bottom) + var(--ugl-spacing-l))' }}>
      <TextField
        variant="immersive"
        label="Legenda"
        hideLabel
        multiline
        rows={2}
        maxLength={140}
        placeholder="Adicionar uma legenda…"
        defaultValue={photoWithCaption.description}
      />
    </div>
  </div>
);

/**
 * Página de documentação rica do componente TextField.
 */
const TextFieldDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoogaleria"
      category="Componentes • Controles"
      title="TextField"
      description="Campo de texto de uma linha ou área de texto, com rótulo ligado, texto de apoio, erro com glifo e contador de caracteres em code points. Controlado só quando o consumidor passa value."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Nome de álbum, legenda e descrição."
    />
    <UglDocGrid>
      <UglDocCard icon="🏷️" title="Nome de álbum">
        Uma linha, com limite e validação: o erro troca o texto de apoio, marca{' '}
        <code>aria-invalid</code> e entra no <code>aria-describedby</code>.
      </UglDocCard>
      <UglDocCard icon="📝" title="Legenda e descrição">
        <code>multiline</code> usa um <code>&lt;textarea&gt;</code> com <code>rows</code> e
        rolagem fina. A variante <code>immersive</code> vive sobre o visualizador.
      </UglDocCard>
      <UglDocCard icon="🔢" title="Contador honesto">
        <code>maxLength</code> conta <strong>code points</strong>: 🌊 conta um. O atributo nativo não
        é usado — ele mede UTF-16 e cortaria o emoji ao meio.
      </UglDocCard>
      <UglDocCard icon="✍️" title="Controlado só quando pedido">
        Sem <code>value</code>, o texto mora no DOM (<code>defaultValue</code>) e nenhuma
        re-renderização o apaga — a lição da regra 4.5.1.
      </UglDocCard>
    </UglDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UglDocSpecs
      component="TextField"
      layout="Rótulo · campo · rodapé"
      specs={[
        { label: 'Altura mínima', value: '44px (--ugl-touch-target)' },
        { label: 'Contorno', value: '1px --ugl-color-border-control (≥ 3:1)' },
        { label: 'Foco', value: '1px + 1px de sombra = 2px em --ugl-color-focus-ring' },
        { label: 'Forma', value: '--ugl-radius-m' },
        { label: 'Rótulo', value: 'label · Open Sans 600 · 14/20px' },
        { label: 'Texto', value: 'body-lg · Open Sans 400 · 16/24px' },
        { label: 'Apoio e contador', value: 'caption · 12/18px · text-secondary' },
        { label: 'Erro', value: '--ugl-color-text-danger + glifo infoFilled' },
        { label: 'Imersiva', value: 'immersive-control · borda immersive-track' },
      ]}
    />
    <UglDocDecisions
      items={[
        {
          subject: 'Glifo de erro substituto',
          detail:
            'o registro não publica um glifo de erro/alerta; o campo usa infoFilled em text-danger, com o prefixo “Erro:” só para leitor de tela. A mensagem nunca depende só da cor.',
        },
        {
          subject: 'Limite sem bloquear a digitação',
          detail:
            'passar do limite não trava o campo (truncar exigiria controlar o texto): o contador fica em vermelho, o campo recebe aria-invalid e uma região viva anuncia “Limite de N caracteres excedido.” uma única vez.',
        },
        {
          subject: 'Contador lido na descrição',
          detail:
            'o “12/40” visível é aria-hidden; o leitor de tela recebe “12 de 40 caracteres” pelo aria-describedby, ao focar o campo, sem ser interrompido a cada tecla.',
        },
        {
          subject: 'onChange com o texto primeiro',
          detail:
            'a assinatura é onChange(value, event), igual à do SearchField. Os atributos nativos (name, required, inputMode) e a ref vão para o <input>/<textarea>; className, style e theme vão para o invólucro.',
        },
        {
          subject: 'Borda imersiva em immersive-track',
          detail:
            'o fio immersive-border (branco a 30%) fica abaixo de 3:1 sobre a superfície imersiva; o campo usa immersive-track (40%), o degrau que passa.',
        },
        {
          subject: 'Altura mínima local',
          detail:
            '--ugl-text-field-min-height aponta para o alvo de 44px; o empurrão de 1px do glifo de erro (--ugl-text-field-icon-nudge) centra 16px na linha de 18px.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UglDocAnatomy
      zones={[
        { name: 'Rótulo (label)', role: 'Ligado por htmlFor; com hideLabel, só para leitor de tela.', token: '--ugl-font-label-*' },
        { name: 'Campo', role: '<input> ou <textarea>, com aria-invalid e aria-describedby.', token: '--ugl-color-border-control · --ugl-radius-m' },
        { name: 'Mensagem', role: 'Apoio ou erro (com glifo), à esquerda.', token: '--ugl-color-text-secondary · --ugl-color-text-danger' },
        { name: 'Contador', role: 'Code points / limite, à direita, com números tabulares.', token: '--ugl-font-caption-*' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Vazio, preenchido, com apoio, com contador, com erro, desabilitado e imersivo."
    />
    <UglDocStage label="Uma linha" direction="column" align="stretch" gap={20} width={390}>
      <TextField label="Nome do álbum" placeholder="Ex.: Viagem de férias" />
      <TextField label="Nome do álbum" defaultValue={uglAlbums[0].title} helperText="Aparece na aba Álbuns." />
      <TextField label="Nome do álbum" defaultValue={uglAlbums[1].title} maxLength={ALBUM_NAME_LIMIT} />
      <TextField label="Nome do álbum" defaultValue={uglAlbums[1].title} error="Já existe um álbum com esse nome." />
      <TextField label="Nome do álbum" defaultValue={uglAlbums[2].title} disabled />
    </UglDocStage>
    <UglDocStage label="Área de texto" direction="column" align="stretch" gap={20} width={390}>
      <TextField label="Legenda" multiline defaultValue={photoWithCaption.description} maxLength={140} />
      <TextField label="Legenda" multiline defaultValue="Cachoeira do Segredo, com a turma toda 🌊🌊" maxLength={20} />
    </UglDocStage>
    <UglDocStage label="Imersiva" surface="immersive" direction="column" align="stretch" gap={20} width={390}>
      <TextField variant="immersive" label="Legenda" multiline rows={2} placeholder="Adicionar uma legenda…" maxLength={140} />
      <TextField variant="immersive" label="Legenda" defaultValue="Legenda longa demais" maxLength={10} />
    </UglDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UglDocPractices
      dos={[
        'Dar sempre um rótulo; esconder com hideLabel só quando o contexto já diz o que é.',
        'Escrever o erro dizendo como resolver.',
        'Usar maxLength para limites de produto: ele conta como a pessoa vê.',
        'Passar value e onChange juntos, ou nenhum dos dois.',
      ]}
      donts={[
        'Usar o espaço reservado como rótulo.',
        'Passar o atributo nativo maxLength por fora: ele corta emoji ao meio.',
        'Marcar erro só com a cor da borda.',
        'Controlar o campo sem necessidade: o preenchimento automático perde o texto.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Contorno, texto, apoio, erro e foco acompanham data-ugl-theme; a variante imersiva é invariante."
    />
    <UglDocThemeSwitcher>
      {() => (
        <div style={{ width: 358, display: 'grid', gap: 20 }}>
          <TextField label="Nome do álbum" defaultValue={uglAlbums[0].title} maxLength={ALBUM_NAME_LIMIT} helperText="Aparece na aba Álbuns." />
          <TextField label="Nome do álbum" defaultValue={uglAlbums[1].title} error="Já existe um álbum com esse nome." />
        </div>
      )}
    </UglDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UglDocPropsTable
      title="TextField"
      rows={[
        { name: 'label', type: 'string', description: 'Rótulo e nome acessível. Obrigatório.' },
        { name: 'hideLabel', type: 'boolean', default: 'false', description: 'Rótulo só para leitor de tela.' },
        { name: 'value', type: 'string', description: 'Texto (modo controlado). Só vai ao elemento quando definido.' },
        { name: 'defaultValue', type: 'string', description: 'Texto inicial (modo não controlado).' },
        { name: 'onChange', type: '(value: string, event) => void', description: 'A cada alteração.' },
        { name: 'placeholder', type: 'string', description: 'Texto do campo vazio.' },
        { name: 'multiline', type: 'boolean', default: 'false', description: 'Usa <textarea>.' },
        { name: 'rows', type: 'number', default: '3', description: 'Linhas visíveis da área de texto.' },
        { name: 'maxLength', type: 'number', description: 'Limite em code points, com contador; sem o atributo nativo.' },
        { name: 'helperText', type: 'string', description: 'Texto de apoio.' },
        { name: 'error', type: 'string', description: 'Mensagem de erro; liga aria-invalid.' },
        { name: 'variant', type: "'default' | 'immersive'", default: "'default'", description: 'Superfície do tema ou imersiva.' },
        { name: 'id', type: 'string', default: 'useId()', description: 'Id do campo; o do consumidor vence.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda do contêiner.' },
        { name: 'className / style', type: 'string / CSSProperties', description: 'Classe e estilo do invólucro.' },
        { name: '...input', type: 'React.InputHTMLAttributes<HTMLInputElement>', description: 'Demais atributos, repassados ao <input>/<textarea> (com a ref).' },
      ]}
    />
    <UglDocPropsTable
      title="Tipos públicos"
      rows={[
        { name: 'UglTextFieldVariant', type: "'default' | 'immersive'", description: 'Variantes.' },
        { name: 'UglTextFieldElement', type: 'HTMLInputElement | HTMLTextAreaElement', description: 'Tipo da ref.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof TextField> = {
  title: 'Unoogaleria/Componentes/TextField',
  component: TextField,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text', description: 'Rótulo.' },
    hideLabel: { control: 'boolean', description: 'Rótulo só para leitor de tela.' },
    value: { control: 'text', description: 'Texto (modo controlado).' },
    defaultValue: { control: 'text', description: 'Texto inicial.' },
    placeholder: { control: 'text', description: 'Texto do campo vazio.' },
    multiline: { control: 'boolean', description: 'Área de texto.' },
    rows: { control: { type: 'number', min: 1, max: 10 }, description: 'Linhas da área de texto.' },
    maxLength: { control: { type: 'number', min: 1 }, description: 'Limite em code points.' },
    helperText: { control: 'text', description: 'Texto de apoio.' },
    error: { control: 'text', description: 'Mensagem de erro.' },
    variant: { control: 'radio', options: ['default', 'immersive'], description: 'Variante.' },
    disabled: { control: 'boolean', description: 'Desabilita o campo.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    onChange: { action: 'onChange', description: 'A cada alteração.' },
    id: { control: 'text', description: 'Id do campo.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    label: 'Nome do álbum',
    hideLabel: false,
    defaultValue: '',
    placeholder: 'Ex.: Viagem de férias',
    multiline: false,
    rows: 3,
    maxLength: ALBUM_NAME_LIMIT,
    helperText: 'Aparece na aba Álbuns.',
    variant: 'default',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof TextField>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TextFieldDocumentationPage />,
};

/**
 * Playground com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do TextField',
  render: (args) => (
    <UglDocStage
      theme={args.theme ?? 'light'}
      surface={args.variant === 'immersive' ? 'immersive' : 'primary'}
      align="stretch"
      width={390}
    >
      <TextField {...args} />
    </UglDocStage>
  ),
};

/**
 * "Novo álbum" e a legenda sobre a foto, dentro do aparelho.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: novo álbum e legenda',
  parameters: { layout: 'centered' },
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
      <PhoneFrame scale={0.75} ariaLabel="Galeria — novo álbum">
        <NewAlbumScreen />
      </PhoneFrame>
      <PhoneFrame scale={0.75} ariaLabel="Galeria — legenda da foto">
        <ImmersiveCaption />
      </PhoneFrame>
    </div>
  ),
};

/**
 * Uma linha, área de texto e imersiva.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <UglDocStage label="default" direction="column" align="stretch" gap={20} width={390}>
        <TextField label="Nome do álbum" placeholder="Ex.: Viagem de férias" />
        <TextField label="Descrição" multiline placeholder="Para que serve este álbum?" />
      </UglDocStage>
      <UglDocStage label="immersive" surface="immersive" direction="column" align="stretch" gap={20} width={390}>
        <TextField variant="immersive" label="Legenda" placeholder="Adicionar uma legenda…" />
        <TextField variant="immersive" label="Legenda" multiline rows={2} placeholder="Adicionar uma legenda…" />
      </UglDocStage>
    </div>
  ),
};

/**
 * Apoio, contador, erro, limite excedido e desabilitado.
 */
export const Estados: Story = {
  render: () => (
    <UglDocStage direction="column" align="stretch" gap={20} width={390}>
      <TextField label="Com apoio" helperText="Aparece na aba Álbuns." />
      <TextField label="Com contador" defaultValue={uglAlbums[3].title} maxLength={ALBUM_NAME_LIMIT} />
      <TextField label="Com erro" defaultValue={uglAlbums[1].title} error="Já existe um álbum com esse nome." />
      <TextField label="Acima do limite" defaultValue="Aniversário da vovó 🎂🎉" maxLength={10} />
      <TextField label="Desabilitado" defaultValue={uglAlbums[0].title} disabled />
      <TextField label="Rótulo escondido" hideLabel placeholder="Rótulo só para leitor de tela" />
    </UglDocStage>
  ),
};

/**
 * Os dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['light', 'dark'] as const).map((theme) => (
        <UglDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} direction="column" align="stretch" gap={20} width={390}>
          <TextField label="Nome do álbum" defaultValue={uglAlbums[0].title} maxLength={ALBUM_NAME_LIMIT} helperText="Aparece na aba Álbuns." />
          <TextField label="Nome do álbum" defaultValue={uglAlbums[1].title} error="Já existe um álbum com esse nome." />
        </UglDocStage>
      ))}
    </div>
  ),
};

/**
 * Validação controlada: nome repetido vira erro na hora.
 */
export const Controlado: Story = {
  name: 'Modo controlado com validação',
  render: () => (
    <UglDocStage align="stretch" width={390}>
      <AlbumNameField />
    </UglDocStage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByLabelText('Nome do álbum');
    await userEvent.type(field, uglAlbums[1].title);
    await expect(field).toHaveAttribute('aria-invalid', 'true');
    await expect(field).toHaveAccessibleDescription(/Já existe um álbum com esse nome\./);
    await userEvent.type(field, ' 2');
    await expect(field).not.toHaveAttribute('aria-invalid');
  },
};

/**
 * O contador conta code points (🌊 conta um), sem o atributo nativo `maxLength`,
 * e o campo não controlado mantém o texto colado.
 */
export const ContadorComEmoji: Story = {
  name: 'Interação: contador com emoji',
  args: { onChange: fn() },
  render: (args) => (
    <UglDocStage align="stretch" width={390}>
      <TextField label="Legenda" maxLength={8} onChange={args.onChange} />
    </UglDocStage>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const field = canvas.getByLabelText('Legenda') as HTMLInputElement;

    await expect(field).not.toHaveAttribute('maxlength');
    await expect(field).toHaveAccessibleDescription('0 de 8 caracteres');

    await userEvent.type(field, 'Praia ');
    field.focus();
    await userEvent.paste('🌊🌊');
    await expect(field.value).toBe('Praia 🌊🌊');
    await expect(field.value.length).toBe(10);
    await expect(canvas.getByText('8/8')).toBeInTheDocument();
    await expect(field).not.toHaveAttribute('aria-invalid');
    await expect(args.onChange).toHaveBeenLastCalledWith('Praia 🌊🌊', expect.anything());

    await userEvent.type(field, '!');
    await expect(canvas.getByText('9/8')).toBeInTheDocument();
    await expect(field).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.getByText('Limite de 8 caracteres excedido.')).toBeInTheDocument();
    await expect(field.value).toBe('Praia 🌊🌊!');
  },
};
