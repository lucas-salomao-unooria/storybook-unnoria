import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Toast } from '../../../src/unooblog/components/Toast';
import type { UblToastPosition } from '../../../src/unooblog/components/Toast';
import { Button } from '../../../src/unooblog/components/Button';
import { PhoneFrame } from '../../../src/unooblog/components/PhoneFrame';
import type { UblIconName } from '../../../src/unooblog/components/Icon';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UblDocGrid,
  UblDocCard,
  UblDocSpecs,
  UblDocDecisions,
  UblDocAnatomy,
  UblDocPractices,
  UblDocStage,
  UblDocThemeSwitcher,
  UblDocPropsTable,
} from '../../../.storybook/components';
import { PaginaDeFundo, notaEstilo } from './sobreposicoes.demo';

const BAR = '#716C98';

const MENSAGEM = 'Post salvo para ler depois';

/**
 * Aparelho de demonstração com o botão que dispara o aviso. O estado de aberto
 * é do produto (aqui, da estória): o Toast só pede para fechar.
 */
const ToastDemo: React.FC<{
  theme?: 'light' | 'dark';
  inicialAberto?: boolean;
  message?: string;
  icon?: UblIconName;
  comAcao?: boolean;
  duration?: number;
  position?: UblToastPosition;
  offset?: number;
  showClose?: boolean;
  scale?: number;
}> = ({
  theme,
  inicialAberto = false,
  message = MENSAGEM,
  icon = 'bookmarkFilled',
  comAcao = true,
  duration = 5000,
  position = 'bottom',
  offset = 0,
  showClose,
  scale = 0.6,
}) => {
  const [aberto, setAberto] = useState(inicialAberto);
  const [desfeito, setDesfeito] = useState(false);

  return (
    <PhoneFrame scale={scale} theme={theme} ariaLabel="Aparelho de demonstração">
      <PaginaDeFundo
        faixa={
          <>
            <Button
              size="sm"
              iconStart="bookmark"
              onClick={() => {
                setDesfeito(false);
                setAberto(true);
              }}
            >
              Salvar post
            </Button>
            {desfeito && <p style={notaEstilo}>Salvamento desfeito</p>}
          </>
        }
      >
        <Toast
          open={aberto}
          message={message}
          icon={icon}
          actionLabel={comAcao ? 'Desfazer' : undefined}
          onAction={comAcao ? () => setDesfeito(true) : undefined}
          onClose={() => setAberto(false)}
          duration={duration}
          position={position}
          offset={offset}
          showClose={showClose}
        />
      </PaginaDeFundo>
    </PhoneFrame>
  );
};

/**
 * Página de documentação rica do componente Toast.
 */
const ToastDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Avisos"
      title="Toast"
      description="Aviso passageiro em cores invertidas, com glifo, mensagem e uma ação opcional (Desfazer). Flutua dentro da tela, acima da barra de gesto, e fecha sozinho após cinco segundos — pausando enquanto o ponteiro ou o foco estão nele."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Confirmação discreta de uma ação que já aconteceu."
    />
    <UblDocGrid>
      <UblDocCard icon="🔖" title="Salvar para ler depois">
        &quot;Post salvo para ler depois · Desfazer&quot;: a ação já ocorreu, e o aviso só dá a chance de
        voltar atrás.
      </UblDocCard>
      <UblDocCard icon="🔗" title="Copiar o link">
        &quot;Link copiado&quot;, sem ação e sem tirar a pessoa da leitura.
      </UblDocCard>
      <UblDocCard icon="📣" title="Região viva">
        <code>role=&quot;status&quot;</code> com <code>aria-live=&quot;polite&quot;</code> existe sempre,
        mesmo fechada, para que o leitor de tela anuncie a mensagem quando ela entra.
      </UblDocCard>
      <UblDocCard icon="⏱️" title="Tempo para alcançar a ação">
        A contagem pausa com o ponteiro sobre o aviso ou o foco dentro dele, e Esc fecha: a pessoa
        sempre tem tempo de chegar ao &quot;Desfazer&quot;.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas do módulo e escolhas de composição."
    />
    <UblDocSpecs
      component="Toast"
      layout="Absoluto · base da tela · cartão de 12px de raio"
      specs={[
        { label: 'Superfície', value: '--ubl-color-toast-surface (invertida)' },
        { label: 'Texto', value: '--ubl-color-toast-text · body-md (14/20)' },
        { label: 'Ação', value: '--ubl-color-toast-action · label (14/20) · alvo de 44px' },
        { label: 'Elevação', value: '--ubl-elevation-overlay' },
        { label: 'Raio', value: '--ubl-radius-m (12px; cantos macios) · ação em cápsula' },
        { label: 'Camada', value: '--ubl-z-toast (50)' },
        { label: 'Recuo inferior', value: '--ubl-safe-area-bottom + 16px + offset' },
        { label: 'Duração', value: '5000ms (0 = não fecha sozinho)' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'Cores invertidas',
          detail:
            'o aviso é roxo profundo no tema claro e lavanda no escuro (--ubl-color-toast-*), para se destacar sobre a página sem usar cor de severidade. O blog tem cores de status (info, dica, atenção), mas elas são do Callout e do Badge: um aviso passageiro confirma uma ação, não classifica uma gravidade.',
        },
        {
          subject: 'A região viva existe sempre',
          detail:
            'um leitor de tela só anuncia o que muda dentro de uma região viva já montada. Por isso o contêiner role="status" fica no DOM mesmo fechado, e só o conteúdo entra e sai.',
        },
        {
          subject: 'O tempo pausa e o timer é limpo',
          detail:
            'a contagem para com o ponteiro ou o foco no aviso e retoma com o tempo que restava. O timer é limpo a cada mudança de estado e ao desmontar — não sobra callback para um componente que saiu.',
        },
        {
          subject: 'Quem fecha é o produto',
          detail:
            'o Toast pede o fechamento por onClose (fim do tempo, Esc, fechar, depois da ação); trocar open para false é do produto. Sem duration automático (0), o botão de fechar aparece sozinho, para o aviso nunca ficar preso.',
        },
        {
          subject: 'Alvo de 44px na ação e no fechar',
          detail:
            'a ação é um botão de texto de 44px de altura. O realce de hover e de pressionado é a própria cor do botão em baixa opacidade, porque a camada state-* do tema seria da cor errada sobre uma superfície invertida.',
        },
        {
          subject: 'Cantos macios',
          detail:
            'o corpo usa raio m (12px) e a ação e o fechar são cápsulas, como os demais controles do blog; no jornal o aviso é um retângulo de 4px.',
        },
        {
          subject: 'Sem portal',
          detail:
            'o aviso é position: absolute no contêiner posicionado mais próximo (a tela do PhoneFrame ou do DesktopFrame), acima da área segura inferior e de offset.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Toque em “Salvar post” para ver o aviso no aparelho."
    />
    <UblDocStage surface="subtle" align="flex-start" padding={16}>
      <ToastDemo inicialAberto duration={0} />
      <div style={{ flex: '1 1 320px' }}>
        <UblDocAnatomy
          zones={[
            { name: 'Região viva', role: 'role="status" aria-live="polite"; sempre montada.', token: '--ubl-z-toast' },
            { name: 'Corpo', role: 'Cartão macio em cores invertidas, com elevação.', token: '--ubl-color-toast-surface' },
            { name: 'Glifo', role: 'Ícone opcional do registro, herdando a cor do texto.', token: '--ubl-color-toast-text' },
            { name: 'Mensagem', role: 'Texto curto, em até duas linhas.', token: '--ubl-font-body-md-*' },
            { name: 'Ação', role: 'Botão de texto (Desfazer), alvo de 44px.', token: '--ubl-color-toast-action' },
            { name: 'Fechar', role: 'Aparece quando o aviso não fecha sozinho.', token: '--ubl-touch-target' },
          ]}
        />
      </div>
    </UblDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Cada aparelho mostra o aviso real."
    />
    <UblDocStage label="Composições" surface="subtle" align="flex-start" padding={16}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>com ação (Desfazer)</p>
        <ToastDemo inicialAberto duration={0} scale={0.5} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>sem ação, com fechar</p>
        <ToastDemo inicialAberto duration={0} comAcao={false} icon="link" message="Link copiado" scale={0.5} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>position=&quot;top&quot;</p>
        <ToastDemo inicialAberto duration={0} position="top" icon="checkCircle" message="Comentário publicado" comAcao={false} scale={0.5} />
      </div>
    </UblDocStage>
    <UblDocStage label="Estados" surface="subtle" align="flex-start" padding={16}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>fechado (só a região viva)</p>
        <ToastDemo scale={0.5} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>offset de 64px (acima de uma barra)</p>
        <ToastDemo inicialAberto duration={0} offset={64} scale={0.5} />
      </div>
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Quando usar um aviso passageiro." />
    <UblDocPractices
      dos={[
        'Avisar de uma ação que já aconteceu, em uma frase curta.',
        'Oferecer "Desfazer" quando a ação tira algo do lugar.',
        'Manter o Toast na tela do aparelho, irmão do conteúdo, sem portal.',
        'Usar offset para ficar acima de uma barra fixa na base.',
        'Deixar o tempo padrão: ele pausa com o ponteiro e o foco.',
      ]}
      donts={[
        'Usar o Toast para erro que exige correção — use a mensagem do campo (TextField error).',
        'Esconder uma informação essencial num aviso que some sozinho.',
        'Empilhar vários avisos: um só aparece por vez.',
        'Pôr duas ações no aviso: ele serve a uma só.',
        'Depender da cor para dizer o que aconteceu: a mensagem diz.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="O aviso inverte o tema: escuro no claro e claro no escuro."
    />
    <UblDocThemeSwitcher surface="subtle" padding={16}>
      {(tema) => <ToastDemo key={tema} theme={tema} inicialAberto duration={0} />}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do Toast. Os demais atributos vão à região viva."
    />
    <UblDocPropsTable
      title="Toast"
      rows={[
        { name: 'open', type: 'boolean', description: 'Exibe o aviso. A região viva existe sempre. Obrigatório.' },
        { name: 'message', type: 'ReactNode', description: 'Mensagem do aviso. Obrigatório.' },
        { name: 'icon', type: 'UblIconName', description: 'Glifo do registro antes da mensagem.' },
        { name: 'actionLabel', type: 'string', description: 'Rótulo da ação ("Desfazer"). Só aparece com onAction.' },
        { name: 'onAction', type: '() => void', description: 'Ação acionada; em seguida o aviso pede para fechar.' },
        { name: 'onClose', type: '() => void', description: 'Fim do tempo, Esc, fechar ou depois da ação.' },
        { name: 'duration', type: 'number', default: '5000', description: 'Milissegundos até fechar sozinho; 0 não fecha sozinho. Pausa com ponteiro e foco.' },
        { name: 'position', type: "'bottom' | 'top'", default: "'bottom'", description: 'Posição dentro do contêiner.' },
        { name: 'offset', type: 'number', default: '0', description: 'Distância extra em pixels, somada à área segura.' },
        { name: 'showClose', type: 'boolean', description: 'Botão de fechar. Padrão: ligado quando duration é 0.' },
        { name: 'closeLabel', type: 'string', default: "'Fechar aviso'", description: 'Nome acessível do botão de fechar.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema. Sem valor, herda o do contêiner.' },
        { name: 'className / ref', type: 'string / Ref<HTMLDivElement>', description: 'Classe e ref da região viva.' },
      ]}
    />
    <UblDocPropsTable
      title="UblToastPosition"
      rows={[
        { name: "'bottom'", type: 'UblToastPosition', description: 'Acima da barra de gesto e de offset.' },
        { name: "'top'", type: 'UblToastPosition', description: 'Abaixo da barra de status e de offset.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Toast> = {
  title: 'Unooblog/Componentes/Toast',
  component: Toast,
  parameters: { layout: 'padded' },
  argTypes: {
    open: { control: 'boolean', description: 'Exibe o aviso.' },
    message: { control: 'text', description: 'Mensagem do aviso.' },
    icon: { control: 'text', description: 'Glifo do registro antes da mensagem (ex.: bookmarkFilled).' },
    actionLabel: { control: 'text', description: 'Rótulo da ação; só aparece com onAction.' },
    duration: { control: { type: 'number', min: 0, step: 500 }, description: 'Milissegundos até fechar; 0 não fecha sozinho.' },
    position: { control: 'radio', options: ['bottom', 'top'], description: 'Posição dentro do contêiner.' },
    offset: { control: { type: 'number', min: 0, step: 8 }, description: 'Distância extra em pixels.' },
    showClose: { control: 'boolean', description: 'Botão de fechar (padrão: ligado com duration 0).' },
    closeLabel: { control: 'text', description: 'Nome acessível do botão de fechar.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
    onAction: { action: 'onAction' },
    onClose: { action: 'onClose' },
  },
  args: {
    open: true,
    message: MENSAGEM,
    icon: 'bookmarkFilled',
    actionLabel: 'Desfazer',
    duration: 0,
    position: 'bottom',
    offset: 0,
    closeLabel: 'Fechar aviso',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof Toast>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ToastDocumentationPage />,
};

/**
 * Playground com todas as propriedades expostas. Com `duration` 0 o aviso fica
 * aberto para inspeção; `onAction` e `onClose` são registrados em Ações.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Toast',
  render: (args) => (
    <PhoneFrame scale={0.75} theme={args.theme}>
      <PaginaDeFundo>
        <Toast {...args} />
      </PaginaDeFundo>
    </PhoneFrame>
  ),
};

/**
 * Composição realista: salvar um post para ler depois, com "Desfazer".
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de composição: salvar para ler depois',
  render: () => <ToastDemo inicialAberto duration={0} scale={0.75} />,
};

/**
 * Posição e offset, abertos.
 */
export const Tamanhos: Story = {
  name: 'Posições e offset',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>position=&quot;bottom&quot;</p>
        <ToastDemo inicialAberto duration={0} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>position=&quot;top&quot;</p>
        <ToastDemo inicialAberto duration={0} position="top" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>offset=64</p>
        <ToastDemo inicialAberto duration={0} offset={64} />
      </div>
    </div>
  ),
};

/**
 * Com ação e sem ação.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>Com ação</p>
        <ToastDemo inicialAberto duration={0} showClose={false} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>Sem ação</p>
        <ToastDemo inicialAberto duration={0} comAcao={false} icon="link" message="Link copiado" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>Sem glifo</p>
        <ToastDemo inicialAberto duration={0} comAcao={false} message="Comentário publicado" showClose={false} />
      </div>
    </div>
  ),
};

/**
 * Fechado (só a região viva), aberto e com o fechar visível.
 */
export const Estados: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>open=false</p>
        <ToastDemo />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>duration=0 (fechar visível)</p>
        <ToastDemo inicialAberto duration={0} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>duration=5000 (fecha sozinho, sem fechar)</p>
        <ToastDemo inicialAberto duration={5000} />
      </div>
    </div>
  ),
};

/**
 * O aviso nos dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((tema) => (
        <div key={tema} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={notaEstilo}>{tema === 'light' ? 'Tema claro' : 'Tema escuro'}</p>
          <ToastDemo inicialAberto duration={0} theme={tema} />
        </div>
      ))}
    </div>
  ),
};

/**
 * A região viva existe antes de abrir; "Desfazer" chama a ação e fecha.
 */
export const DesfazerEFechar: Story = {
  name: 'Desfazer e fechar',
  render: () => <ToastDemo duration={0} />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);

    // A região viva já está montada, vazia, antes de o aviso entrar.
    const regiao = tela.getByRole('status');
    await expect(regiao).toBeEmptyDOMElement();

    await userEvent.click(tela.getByRole('button', { name: 'Salvar post' }));
    await expect(await within(regiao).findByText(MENSAGEM)).toBeInTheDocument();

    // "Desfazer" chama onAction e fecha.
    await userEvent.click(within(regiao).getByRole('button', { name: 'Desfazer' }));
    await waitFor(() => expect(within(regiao).queryByText(MENSAGEM)).not.toBeInTheDocument());
    await expect(await tela.findByText('Salvamento desfeito')).toBeInTheDocument();
  },
};

/**
 * Sem tempo automático, Esc e o botão de fechar fecham o aviso.
 */
export const FecharPeloTeclado: Story = {
  name: 'Fechar com Esc e com o botão',
  render: () => <ToastDemo duration={0} />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const regiao = tela.getByRole('status');
    const salvar = tela.getByRole('button', { name: 'Salvar post' });

    await userEvent.click(salvar);
    await expect(await within(regiao).findByText(MENSAGEM)).toBeInTheDocument();

    // Com duration 0, o botão de fechar aparece sozinho.
    await userEvent.click(within(regiao).getByRole('button', { name: 'Fechar aviso' }));
    await waitFor(() => expect(within(regiao).queryByText(MENSAGEM)).not.toBeInTheDocument());

    // Esc, com o foco dentro do aviso, também fecha.
    await userEvent.click(salvar);
    const desfazer = await within(regiao).findByRole('button', { name: 'Desfazer' });
    desfazer.focus();
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(within(regiao).queryByText(MENSAGEM)).not.toBeInTheDocument());
  },
};

/**
 * Fecha sozinho depois da duração.
 */
export const FechaSozinho: Story = {
  name: 'Fecha sozinho após a duração',
  render: () => <ToastDemo duration={600} />,
  play: async ({ canvasElement }) => {
    const tela = within(canvasElement);
    const regiao = tela.getByRole('status');

    await userEvent.click(tela.getByRole('button', { name: 'Salvar post' }));
    await expect(await within(regiao).findByText(MENSAGEM)).toBeInTheDocument();

    // Sem o botão de fechar: o aviso fecha sozinho, e o timer não deixa resto.
    await expect(within(regiao).queryByRole('button', { name: 'Fechar aviso' })).not.toBeInTheDocument();
    await waitFor(() => expect(within(regiao).queryByText(MENSAGEM)).not.toBeInTheDocument(), {
      timeout: 3000,
    });
  },
};
