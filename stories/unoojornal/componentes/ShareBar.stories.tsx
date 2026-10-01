import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ShareBar } from '../../../src/unoojornal/components/ShareBar';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UjnDocGrid,
  UjnDocCard,
  UjnDocSpecs,
  UjnDocDecisions,
  UjnDocAnatomy,
  UjnDocStage,
  UjnDocPractices,
  UjnDocThemeSwitcher,
  UjnDocPropsTable,
} from '../../../.storybook/components';

const BAR = '#716C98';

const noop = () => undefined;

const rotuloEstilo: React.CSSProperties = {
  margin: 0,
  fontFamily: 'var(--ujn-font-sans)',
  fontSize: 'var(--ujn-font-caption-size)',
  lineHeight: 'var(--ujn-font-caption-line)',
  color: 'var(--ujn-color-text-secondary)',
};

/**
 * Barra com legenda do arranjo.
 */
const BarraRotulada: React.FC<{
  rotulo: string;
  props?: Partial<React.ComponentProps<typeof ShareBar>>;
}> = ({ rotulo, props }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <p style={rotuloEstilo}>{rotulo}</p>
    <ShareBar onShare={noop} onCopyLink={noop} onSave={noop} onPrint={noop} {...props} />
  </div>
);

/**
 * Barra controlada: o produto guarda "salva" e mostra o estado ao lado.
 */
const BarraControlada: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme }) => {
  const [salva, setSalva] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <ShareBar
        theme={theme}
        onShare={noop}
        onCopyLink={noop}
        onPrint={noop}
        saved={salva}
        onSave={setSalva}
      />
      <p style={rotuloEstilo} data-testid="estado">
        Matéria {salva ? 'salva' : 'não salva'}
      </p>
    </div>
  );
};

/**
 * Página de documentação rica do componente ShareBar.
 */
const ShareBarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoojornal"
      category="Componentes • Matéria"
      title="ShareBar"
      description="Linha de ações da matéria: compartilhar, copiar o link, salvar para ler depois e imprimir. Cada uma é um botão de ícone com rótulo acessível; salvar é de alternância."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="O que a pessoa faz com a matéria depois de ler."
    />
    <UjnDocGrid>
      <UjnDocCard icon="📤" title="Compartilhar e copiar">
        O produto decide o que &quot;compartilhar&quot; faz (a folha do sistema, um menu); o
        componente só avisa por <code>onShare</code> e <code>onCopyLink</code>.
      </UjnDocCard>
      <UjnDocCard icon="🔖" title="Salvar é alternância">
        O botão tem <code>aria-pressed</code> e glifo preenchido quando a matéria está salva. O
        rótulo não muda com o estado.
      </UjnDocCard>
      <UjnDocCard icon="🖨️" title="Imprimir">
        Um jornal se imprime: <code>onPrint</code> aciona a impressão do navegador, se o produto
        quiser.
      </UjnDocCard>
      <UjnDocCard icon="🎛️" title="Só o que o produto trata">
        Cada botão só aparece quando há manipulador. Sem nenhum, a barra não renderiza nada.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Estrutura própria sobre os IconButtons do módulo; cores e fontes são as da Plataforma Unooria."
    />
    <UjnDocSpecs
      component="ShareBar"
      layout="Linha · IconButtons com intervalo de 8px · quebra de linha se faltar largura"
      specs={[
        { label: 'Estrutura herdada', value: 'Tela article-detail 3:363 (ações da matéria)' },
        { label: 'Botões', value: 'IconButton variant="outline" size="md"' },
        { label: 'Intervalo', value: '--ujn-spacing-xs (8px)' },
        { label: 'Alvo', value: '≥ --ujn-touch-target (44px), pelo IconButton' },
        { label: 'Glifos', value: 'share · link · bookmark / bookmarkFilled · print' },
        { label: 'Papel', value: 'role="group" · aria-label "Ações da matéria"' },
        { label: 'Fronteira', value: 'Client Component (estado de "salva" e manipuladores)' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Ação ausente, botão ausente',
          detail:
            'um botão sem manipulador seria um alvo morto. Cada ação só é renderizada quando o produto a trata; "salvar" também aparece quando saved ou defaultSaved é informado.',
        },
        {
          subject: 'Salvar não muda de rótulo',
          detail:
            'o nome é sempre "Salvar para ler depois" e o estado vai em aria-pressed: trocar o rótulo e o estado ao mesmo tempo faria o leitor de tela anunciar o contrário do que aconteceu.',
        },
        {
          subject: 'Controlado ou não',
          detail:
            'com saved, o estado é do produto e o botão só pede a troca por onSave(próximo). Sem saved, a barra guarda o estado a partir de defaultSaved e ainda avisa por onSave. defaultSaved é uma prop a mais que o contrato original, para o modo não controlado.',
        },
        {
          subject: 'Estado também no glifo',
          detail:
            'salva, o marcador é preenchido; o estado nunca depende só da cor.',
        },
        {
          subject: 'Contorno em vez de preenchimento',
          detail:
            'os botões usam a variante outline do IconButton: o contorno de 1px (border-control) separa o alvo do fundo sem sombra.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Quatro ações num grupo nomeado."
    />
    <UjnDocStage surface="card" align="stretch" direction="column" padding={32}>
      <ShareBar onShare={noop} onCopyLink={noop} onSave={noop} onPrint={noop} />
      <UjnDocAnatomy
        zones={[
          { name: 'Compartilhar', role: 'Pede ao produto que compartilhe a matéria.', token: 'share · onShare' },
          { name: 'Copiar link', role: 'Copia o endereço da matéria.', token: 'link · onCopyLink' },
          { name: 'Salvar', role: 'Alterna; aria-pressed e glifo preenchido.', token: 'bookmark · onSave · saved' },
          { name: 'Imprimir', role: 'Pede a impressão da matéria.', token: 'print · onPrint' },
          { name: 'Grupo', role: 'role="group" nomeado.', token: 'aria-label' },
        ]}
      />
    </UjnDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Ações presentes e estado de salva."
    />
    <UjnDocStage label="Variantes (ações presentes)" surface="card" align="flex-start" padding={24}>
      <BarraRotulada rotulo="Quatro ações" />
      <BarraRotulada
        rotulo="Compartilhar e salvar"
        props={{ onCopyLink: undefined, onPrint: undefined }}
      />
      <BarraRotulada
        rotulo="Só copiar o link"
        props={{ onShare: undefined, onSave: undefined, onPrint: undefined }}
      />
    </UjnDocStage>
    <UjnDocStage label="Estados" surface="card" align="flex-start" padding={24}>
      <BarraRotulada rotulo="Não salva" props={{ saved: false }} />
      <BarraRotulada rotulo="Salva" props={{ saved: true }} />
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Como usar a barra." />
    <UjnDocPractices
      dos={[
        'Passar só os manipuladores que o produto implementa.',
        'Confirmar a ação ao leitor (um aviso passageiro ao copiar o link, por exemplo).',
        'Controlar saved quando o produto guarda a lista de salvas.',
        'Manter a barra perto do fim da matéria, onde a pessoa decide o que fazer.',
      ]}
      donts={[
        'Trocar o rótulo do botão de salvar conforme o estado: o aria-pressed já diz.',
        'Mostrar o botão de imprimir em produto que não imprime.',
        'Esconder os rótulos: cada botão é só um ícone e depende do aria-label.',
        'Empilhar a barra com outras ações da página: ela é só da matéria.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Contornos, glifos e estados acompanham o tema."
    />
    <UjnDocThemeSwitcher surface="card" padding={32}>
      {(tema) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <ShareBar theme={tema} onShare={noop} onCopyLink={noop} onSave={noop} onPrint={noop} />
          <ShareBar theme={tema} onShare={noop} onCopyLink={noop} saved onSave={noop} onPrint={noop} />
        </div>
      )}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do ShareBar. Os demais atributos vão à <div> raiz."
    />
    <UjnDocPropsTable
      title="ShareBar"
      rows={[
        { name: 'onShare', type: '() => void', description: 'Chamado ao acionar "Compartilhar a matéria". Sem ele, o botão não aparece.' },
        { name: 'onCopyLink', type: '() => void', description: 'Chamado ao acionar "Copiar link da matéria". Sem ele, o botão não aparece.' },
        { name: 'onSave', type: '(saved: boolean) => void', description: 'Chamado ao alternar "Salvar para ler depois", com o novo estado.' },
        { name: 'saved', type: 'boolean', description: 'Matéria salva (modo controlado). Aparece o botão de salvar.' },
        { name: 'defaultSaved', type: 'boolean', description: 'Estado inicial no modo não controlado. Informá-lo faz o botão de salvar aparecer.' },
        { name: 'onPrint', type: '() => void', description: 'Chamado ao acionar "Imprimir a matéria". Sem ele, o botão não aparece.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        { name: 'aria-label', type: 'string', default: "'Ações da matéria'", description: 'Nome do grupo de ações.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ShareBar> = {
  title: 'Unoojornal/Componentes/ShareBar',
  component: ShareBar,
  parameters: { layout: 'padded' },
  argTypes: {
    onShare: { action: 'onShare', description: 'Chamado ao acionar "Compartilhar a matéria".' },
    onCopyLink: { action: 'onCopyLink', description: 'Chamado ao acionar "Copiar link da matéria".' },
    onSave: { action: 'onSave', description: 'Chamado ao alternar "Salvar para ler depois", com o novo estado.' },
    saved: { control: 'boolean', description: 'Matéria salva (modo controlado).' },
    defaultSaved: { control: 'boolean', description: 'Estado inicial no modo não controlado.' },
    onPrint: { action: 'onPrint', description: 'Chamado ao acionar "Imprimir a matéria".' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    defaultSaved: false,
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof ShareBar>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ShareBarDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas. As ações aparecem porque
 * os manipuladores vêm da aba Ações; `saved` liga o modo controlado.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ShareBar',
  render: (args) => (
    <UjnDocStage surface="card" theme={args.theme} align="flex-start" padding={32}>
      <ShareBar {...args} />
    </UjnDocStage>
  ),
};

/**
 * A barra de ações ao fim da matéria (tela `article-detail`, `3:363`), com o
 * estado de salva guardado pelo componente.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo oficial: ações da matéria',
  render: () => (
    <UjnDocStage surface="card" align="flex-start" padding={32}>
      <ShareBar onShare={noop} onCopyLink={noop} onSave={noop} defaultSaved={false} onPrint={noop} />
    </UjnDocStage>
  ),
};

/**
 * O tamanho dos alvos é do IconButton; aqui, a barra em contêineres de largura
 * diferente: a linha quebra quando falta lugar.
 */
export const Tamanhos: Story = {
  render: () => (
    <UjnDocStage surface="card" align="flex-start" padding={24}>
      {[120, 240, 480].map((largura) => (
        <div key={largura} style={{ width: largura, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={rotuloEstilo}>Contêiner de {largura}px</p>
          <ShareBar onShare={noop} onCopyLink={noop} onSave={noop} onPrint={noop} />
        </div>
      ))}
    </UjnDocStage>
  ),
};

/**
 * As combinações de ações presentes.
 */
export const TodasVariantes: Story = {
  render: () => (
    <UjnDocStage surface="card" align="flex-start" padding={24}>
      <BarraRotulada rotulo="Quatro ações" />
      <BarraRotulada rotulo="Sem imprimir" props={{ onPrint: undefined }} />
      <BarraRotulada rotulo="Compartilhar e salvar" props={{ onCopyLink: undefined, onPrint: undefined }} />
      <BarraRotulada
        rotulo="Só copiar o link"
        props={{ onShare: undefined, onSave: undefined, onPrint: undefined }}
      />
    </UjnDocStage>
  ),
};

/**
 * Não salva e salva (controlado).
 */
export const Estados: Story = {
  render: () => (
    <UjnDocStage surface="card" align="flex-start" padding={24}>
      <BarraRotulada rotulo="Não salva" props={{ saved: false }} />
      <BarraRotulada rotulo="Salva" props={{ saved: true }} />
    </UjnDocStage>
  ),
};

/**
 * A barra nos dois temas, não salva e salva.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <UjnDocStage
          key={tema}
          label={tema === 'light' ? 'Tema claro' : 'Tema escuro'}
          surface="card"
          theme={tema}
          align="flex-start"
          direction="column"
          padding={24}
        >
          <ShareBar theme={tema} onShare={noop} onCopyLink={noop} saved={false} onSave={noop} onPrint={noop} />
          <ShareBar theme={tema} onShare={noop} onCopyLink={noop} saved onSave={noop} onPrint={noop} />
        </UjnDocStage>
      ))}
    </div>
  ),
};

/**
 * Sem `saved`, a barra guarda o estado: clicar em "Salvar para ler depois"
 * alterna `aria-pressed` e o `onSave` recebe o novo valor.
 */
export const SalvarAlternaAriaPressed: Story = {
  name: 'Salvar alterna aria-pressed',
  args: { onShare: fn(), onCopyLink: fn(), onSave: fn(), onPrint: fn(), defaultSaved: false },
  render: (args) => (
    <UjnDocStage surface="card" align="flex-start" padding={32}>
      <ShareBar {...args} />
    </UjnDocStage>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);
    const salvar = tela.getByRole('button', { name: 'Salvar para ler depois' });

    await expect(salvar).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(salvar);
    await expect(salvar).toHaveAttribute('aria-pressed', 'true');
    await expect(args.onSave).toHaveBeenLastCalledWith(true);

    await userEvent.click(salvar);
    await expect(salvar).toHaveAttribute('aria-pressed', 'false');
    await expect(args.onSave).toHaveBeenLastCalledWith(false);
    await expect(args.onSave).toHaveBeenCalledTimes(2);
  },
};

/**
 * Cada botão tem o rótulo acessível próprio e chama o seu manipulador.
 */
export const RotulosEAcoes: Story = {
  name: 'Rótulos acessíveis e ações',
  args: { onShare: fn(), onCopyLink: fn(), onSave: fn(), onPrint: fn(), defaultSaved: false },
  render: (args) => (
    <UjnDocStage surface="card" align="flex-start" padding={32}>
      <ShareBar {...args} />
    </UjnDocStage>
  ),
  play: async ({ canvasElement, args }) => {
    const tela = within(canvasElement);

    await expect(tela.getByRole('group', { name: 'Ações da matéria' })).toBeInTheDocument();

    await userEvent.click(tela.getByRole('button', { name: 'Compartilhar a matéria' }));
    await expect(args.onShare).toHaveBeenCalledTimes(1);

    await userEvent.click(tela.getByRole('button', { name: 'Copiar link da matéria' }));
    await expect(args.onCopyLink).toHaveBeenCalledTimes(1);

    await userEvent.click(tela.getByRole('button', { name: 'Imprimir a matéria' }));
    await expect(args.onPrint).toHaveBeenCalledTimes(1);
  },
};

/**
 * Modo controlado: o produto guarda "salva" e a barra só pede a troca.
 */
export const SalvarControlado: Story = {
  name: 'Salvar no modo controlado',
  render: () => (
    <UjnDocStage surface="card" align="flex-start" padding={32}>
      <BarraControlada />
    </UjnDocStage>
  ),
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const salvar = tela.getByRole('button', { name: 'Salvar para ler depois' });

    await expect(tela.getByTestId('estado')).toHaveTextContent('Matéria não salva');
    await userEvent.click(salvar);
    await expect(salvar).toHaveAttribute('aria-pressed', 'true');
    await expect(tela.getByTestId('estado')).toHaveTextContent('Matéria salva');
  },
};
