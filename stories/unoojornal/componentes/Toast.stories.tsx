import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Toast } from '../../../src/unoojornal/components/Toast';
import type { UjnToastPosition } from '../../../src/unoojornal/components/Toast';
import { Button } from '../../../src/unoojornal/components/Button';
import { PhoneFrame } from '../../../src/unoojornal/components/PhoneFrame';
import type { UjnIconName } from '../../../src/unoojornal/components/Icon';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UjnDocGrid,
  UjnDocCard,
  UjnDocSpecs,
  UjnDocDecisions,
  UjnDocAnatomy,
  UjnDocPractices,
  UjnDocStage,
  UjnDocThemeSwitcher,
  UjnDocPropsTable,
} from '../../../.storybook/components';
import { PaginaDeFundo, notaEstilo } from './sobreposicoes.demo';

const BAR = '#716C98';

const MENSAGEM = 'Matéria salva para ler depois';

/**
 * Aparelho de demonstração com o botão que dispara o aviso. O estado de aberto
 * é do produto (aqui, da estória): o Toast só pede para fechar.
 */
const ToastDemo: React.FC<{
  theme?: 'light' | 'dark';
  inicialAberto?: boolean;
  message?: string;
  icon?: UjnIconName;
  comAcao?: boolean;
  duration?: number;
  position?: UjnToastPosition;
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
              Salvar matéria
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
      badgeBrand="Unoojornal"
      category="Componentes • Avisos"
      title="Toast"
      description="Aviso passageiro em cores invertidas, com glifo, mensagem e uma ação opcional (Desfazer). Flutua dentro da tela, acima da barra de gesto, e fecha sozinho após cinco segundos — pausando enquanto o ponteiro ou o foco estão nele."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Confirmação discreta de uma ação que já aconteceu."
    />
    <UjnDocGrid>
      <UjnDocCard icon="🔖" title="Salvar para ler depois">
        &quot;Matéria salva para ler depois · Desfazer&quot;: a ação já ocorreu, e o aviso só dá a chance de
        voltar atrás.
      </UjnDocCard>
      <UjnDocCard icon="🔗" title="Copiar o link">
        &quot;Link copiado&quot;, sem ação e sem tirar a pessoa da leitura.
      </UjnDocCard>
      <UjnDocCard icon="📣" title="Região viva">
        <code>role=&quot;status&quot;</code> com <code>aria-live=&quot;polite&quot;</code> existe sempre,
        mesmo fechada, para que o leitor de tela anuncie a mensagem quando ela entra.
      </UjnDocCard>
      <UjnDocCard icon="⏱️" title="Tempo para alcançar a ação">
        A contagem pausa com o ponteiro sobre o aviso ou o foco dentro dele, e Esc fecha: a pessoa
        sempre tem tempo de chegar ao &quot;Desfazer&quot;.
      </UjnDocCard>
    </UjnDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas do módulo e escolhas de composição."
    />
    <UjnDocSpecs
      component="Toast"
      layout="Absoluto · base da tela · retângulo de 4px de raio"
      specs={[
        { label: 'Superfície', value: '--ujn-color-toast-surface (invertida)' },
        { label: 'Texto', value: '--ujn-color-toast-text · Body/Medium' },
        { label: 'Ação', value: '--ujn-color-toast-action · Label · alvo de 44px' },
        { label: 'Elevação', value: '--ujn-elevation-overlay' },
        { label: 'Raio', value: '--ujn-radius-s (4px)' },
        { label: 'Camada', value: '--ujn-z-toast (50)' },
        { label: 'Recuo inferior', value: '--ujn-safe-area-bottom + 16px + offset' },
        { label: 'Duração', value: '5000ms (0 = não fecha sozinho)' },
      ]}
    />
    <UjnDocDecisions
      items={[
        {
          subject: 'Cores invertidas',
          detail:
            'o aviso é roxo profundo no tema claro e lavanda no escuro (--ujn-color-toast-*), para se destacar sobre a página sem usar cor de severidade: o jornal não tem verde nem amarelo de estado.',
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
          subject: 'Sem portal',
          detail:
            'o aviso é position: absolute no contêiner posicionado mais próximo (a tela do PhoneFrame ou do DesktopFrame), acima da área segura inferior e de offset.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Toque em “Salvar matéria” para ver o aviso no aparelho."
    />
    <UjnDocStage surface="subtle" align="flex-start" padding={16}>
      <ToastDemo inicialAberto duration={0} />
      <div style={{ flex: '1 1 320px' }}>
        <UjnDocAnatomy
          zones={[
            { name: 'Região viva', role: 'role="status" aria-live="polite"; sempre montada.', token: '--ujn-z-toast' },
            { name: 'Corpo', role: 'Retângulo em cores invertidas, com elevação.', token: '--ujn-color-toast-surface' },
            { name: 'Glifo', role: 'Ícone opcional do registro, herdando a cor do texto.', token: '--ujn-color-toast-text' },
            { name: 'Mensagem', role: 'Texto curto, em até duas linhas.', token: 'Body/Medium' },
            { name: 'Ação', role: 'Botão de texto (Desfazer), alvo de 44px.', token: '--ujn-color-toast-action' },
            { name: 'Fechar', role: 'Aparece quando o aviso não fecha sozinho.', token: '--ujn-touch-target' },
          ]}
        />
      </div>
    </UjnDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Cada aparelho mostra o aviso real."
    />
    <UjnDocStage label="Composições" surface="subtle" align="flex-start" padding={16}>
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
        <ToastDemo inicialAberto duration={0} position="top" icon="checkCircle" message="Carta enviada à redação" comAcao={false} scale={0.5} />
      </div>
    </UjnDocStage>
    <UjnDocStage label="Estados" surface="subtle" align="flex-start" padding={16}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>fechado (só a região viva)</p>
        <ToastDemo scale={0.5} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={notaEstilo}>offset de 64px (acima de uma barra)</p>
        <ToastDemo inicialAberto duration={0} offset={64} scale={0.5} />
      </div>
    </UjnDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" description="Quando usar um aviso passageiro." />
    <UjnDocPractices
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
    <UjnDocThemeSwitcher surface="subtle" padding={16}>
      {(tema) => <ToastDemo key={tema} theme={tema} inicialAberto duration={0} />}
    </UjnDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Referência completa de props"
      description="Contrato público do Toast. Os demais atributos vão à região viva."
    />
    <UjnDocPropsTable
      title="Toast"
      rows={[
        { name: 'open', type: 'boolean', description: 'Exibe o aviso. A região viva existe sempre. Obrigatório.' },
        { name: 'message', type: 'ReactNode', description: 'Mensagem do aviso. Obrigatório.' },
        { name: 'icon', type: 'UjnIconName', description: 'Glifo do registro antes da mensagem.' },
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
    <UjnDocPropsTable
      title="UjnToastPosition"
      rows={[
        { name: "'bottom'", type: 'UjnToastPosition', description: 'Acima da barra de gesto e de offset.' },
        { name: "'top'", type: 'UjnToastPosition', description: 'Abaixo da barra de status e de offset.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Toast> = {
  title: 'Unoojornal/Componentes/Toast',
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
 * Composição realista: salvar uma matéria para ler depois, com "Desfazer".
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
        <ToastDemo inicialAberto duration={0} comAcao={false} message="Carta enviada à redação" showClose={false} />
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

    await userEvent.click(tela.getByRole('button', { name: 'Salvar matéria' }));
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
    const salvar = tela.getByRole('button', { name: 'Salvar matéria' });

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

    await userEvent.click(tela.getByRole('button', { name: 'Salvar matéria' }));
    await expect(await within(regiao).findByText(MENSAGEM)).toBeInTheDocument();

    // Sem o botão de fechar: o aviso fecha sozinho, e o timer não deixa resto.
    await expect(within(regiao).queryByRole('button', { name: 'Fechar aviso' })).not.toBeInTheDocument();
    await waitFor(() => expect(within(regiao).queryByText(MENSAGEM)).not.toBeInTheDocument(), {
      timeout: 3000,
    });
  },
};
