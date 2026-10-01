import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { AuthorCard } from '../../../src/unooblog/components/AuthorCard';
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
import { postEmDestaque, postsDoFeed, propsDoAuthorCard } from './feed.demo';

const BAR = '#716C98';

/** Espiões das estórias de interação. */
const followSpy = fn();

const autoria = propsDoAuthorCard(postEmDestaque);
const outraAutoria = propsDoAuthorCard(postsDoFeed[1]);

/**
 * Cartão de autoria com o estado de seguir guardado pelo produto.
 */
const AutorInterativo: React.FC<
  { inicial?: boolean; onChange?: (following: boolean) => void } & Partial<React.ComponentProps<typeof AuthorCard>>
> = ({ inicial = false, onChange, ...props }) => {
  const [following, setFollowing] = useState(inicial);
  return (
    <AuthorCard
      {...autoria}
      {...props}
      following={following}
      onToggleFollow={(next) => {
        setFollowing(next);
        onChange?.(next);
      }}
    />
  );
};

/**
 * Página de documentação rica do componente AuthorCard.
 */
const AuthorCardDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unooblog"
      category="Componentes • Feed"
      title="AuthorCard"
      description="Cartão de autoria, sempre presente no blog: avatar, nome, cargo, seguidores, bio e o botão Seguir/Seguindo. Em cartão, ao fim do post; em linha, em cabeçalhos e listas de autores."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="O blog é de autoria: quem escreve acompanha o texto do começo ao fim."
    />
    <UblDocGrid>
      <UblDocCard icon="🧑‍💻" title="Cartão ao fim do post">
        Avatar de 72px, nome, cargo, seguidores abreviados em pt-BR e uma bio de até três linhas.
      </UblDocCard>
      <UblDocCard icon="➕" title="Seguir e Seguindo">
        Um alternador com <code>aria-pressed</code>: o texto muda entre “Seguir” e “Seguindo”, o
        glifo entre <code>follow</code> e <code>following</code>, e o nome do autor o descreve.
      </UblDocCard>
      <UblDocCard icon="📋" title="Linha para listas">
        <code>layout=&quot;inline&quot;</code>: avatar de 32px, nome, cargo e o botão à direita,
        sem cartão — para cabeçalhos e listas de autores.
      </UblDocCard>
      <UblDocCard icon="🔗" title="Perfil sem competir com o botão">
        Com <code>href</code>, o nome é o alvo do cartão inteiro; o botão fica acima e nunca abre
        o perfil.
      </UblDocCard>
    </UblDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UblDocSpecs
      component="AuthorCard"
      layout="Cartão ou linha · largura do contêiner"
      specs={[
        { label: 'Superfície (card)', value: 'background-card (lavanda) + fio de 1px · raio xl (24px) · recuo de 24px' },
        { label: 'Avatar', value: 'xl (72px) no card · md (32px) no inline · decorativo' },
        { label: 'Nome', value: 'heading-4 · 20/30px (inline: label 14/20px · 700)' },
        { label: 'Cargo', value: 'body-md · 14/20px · text-secondary' },
        { label: 'Seguidores', value: 'caption · 12/18px · text-muted · “1,2 mil seguidores”' },
        { label: 'Bio', value: 'body-md · 14/20px · três linhas (só no card)' },
        { label: 'Seguir', value: 'Button sm · primary (Seguir) / secondary (Seguindo) · aria-pressed' },
        { label: 'Estreito (< 400px)', value: 'avatar em cima e tudo centralizado' },
      ]}
    />
    <UblDocDecisions
      items={[
        {
          subject: 'O rótulo muda e o botão é um alternador',
          detail:
            'o texto visível vira “Seguindo” e aria-pressed liga junto. O nome acessível é o texto visível (rótulo no nome, WCAG 2.5.3) e aria-describedby aponta o nome do autor: “Seguir”, descrito por “Marina Azevedo”, nunca fica sem dono.',
        },
        {
          subject: 'Seguindo é secundário, não desabilitado',
          detail:
            'o botão continua acionável (deixar de seguir) e passa de preenchido a contorno, com o glifo de confirmação: a mudança é de forma e de texto, não só de cor.',
        },
        {
          subject: 'Nome em <p>, não em título',
          detail:
            'o cartão aparece depois do texto, em lugares onde um título criaria um degrau de heading fora de ordem; o <article> é nomeado por aria-labelledby apontando para o nome.',
        },
        {
          subject: 'Seguidores abreviados em pt-BR',
          detail:
            'a partir de mil, Intl com notação compacta longa: 2760 vira “2,8 mil seguidores”; abaixo de mil, o número inteiro; 1 vira “1 seguidor”. O total é responsabilidade de quem passa (a fixture soma o seguir da pessoa).',
        },
        {
          subject: 'Bio só no cartão',
          detail: 'a linha (inline) é um atalho: avatar, nome, cargo e botão. Bio e seguidores ficam no cartão.',
        },
        {
          subject: 'Client Component',
          detail: "repassa onToggleFollow ao botão; por isso começa com 'use client'.",
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UblDocStage label="Cartão com todos os elementos" surface="page" align="stretch" direction="column" width={520}>
      <AutorInterativo />
    </UblDocStage>
    <UblDocAnatomy
      zones={[
        { name: 'Avatar', role: 'Retrato ou iniciais; decorativo.', token: '--ubl-avatar-xl' },
        { name: 'Nome', role: 'Texto ou link do perfil.', token: '--ubl-font-heading-4-*' },
        { name: 'Cargo', role: 'Papel da pessoa.', token: '--ubl-font-body-md-*' },
        { name: 'Seguidores', role: 'Glifo person e contagem abreviada.', token: '--ubl-font-caption-* · --ubl-color-text-muted' },
        { name: 'Bio', role: 'Três linhas.', token: '--ubl-color-text-secondary' },
        { name: 'Seguir', role: 'Alternador com aria-pressed.', token: 'Button sm' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Cartão, linha, seguido, sem botão e com link de perfil — componentes reais."
    />
    <UblDocStage label="Cartão: não seguido, seguido, sem botão" surface="page" align="stretch" direction="column" width={520}>
      <AutorInterativo />
      <AutorInterativo inicial {...outraAutoria} />
      <AuthorCard {...autoria} />
    </UblDocStage>
    <UblDocStage label="Linha: não seguido, seguido, com perfil" surface="page" align="stretch" direction="column" width={520} gap={4}>
      <AutorInterativo layout="inline" />
      <AutorInterativo layout="inline" inicial {...outraAutoria} />
      <AutorInterativo layout="inline" href="#perfil" />
    </UblDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UblDocPractices
      dos={[
        'Guardar following no produto e devolver o novo valor ao servidor.',
        'Usar o cartão ao fim do post e a linha no cabeçalho ou em listas de autores.',
        'Passar href quando o perfil existe: o nome vira link e o cartão inteiro clica.',
        'Omitir onToggleFollow quando a pessoa lê o próprio texto: o botão some.',
      ]}
      donts={[
        'Trocar o rótulo do botão por um aria-label que não contém “Seguir” ou “Seguindo”.',
        'Pôr outro link ou botão dentro do cartão: o clique já pertence ao nome.',
        'Indicar “seguindo” só pela cor do botão: o texto e o glifo já dizem.',
        'Passar uma bio longa no card esperando que ela apareça inteira: ela é cortada em três linhas.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Superfície, fio, texto e botão acompanham data-ubl-theme."
    />
    <UblDocThemeSwitcher surface="page">
      {() => (
        <div style={{ display: 'grid', gap: 16, width: 520 }}>
          <AutorInterativo />
          <AutorInterativo layout="inline" inicial {...outraAutoria} />
        </div>
      )}
    </UblDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props da API" />
    <UblDocPropsTable
      title="AuthorCard"
      rows={[
        { name: 'name', type: 'string', description: 'Nome de quem assina; com href, é o alvo do cartão. Obrigatório.' },
        { name: 'role', type: 'string', description: 'Cargo ou papel.' },
        { name: 'bio', type: 'string', description: 'Minibiografia, em três linhas (só no card).' },
        { name: 'avatarSrc', type: 'string', description: 'Retrato; sem ele, as iniciais.' },
        { name: 'followers', type: 'number', description: 'Quantidade de seguidores; formatada em pt-BR (só no card).' },
        { name: 'following', type: 'boolean', default: 'false', description: 'Autor seguido: aria-pressed, rótulo “Seguindo” e glifo following.' },
        { name: 'onToggleFollow', type: '(following: boolean) => void', description: 'Mostra o botão e recebe o novo valor.' },
        { name: 'href', type: 'string', description: 'Faz do nome um <a> e do cartão inteiro um alvo.' },
        { name: 'layout', type: "'card' | 'inline'", default: "'card'", description: 'Cartão lavanda ou linha sem fundo.' },
        { name: 'theme', type: "'light' | 'dark'", description: 'Força o tema; sem valor, herda.' },
        { name: 'className / ...', type: 'React.HTMLAttributes<HTMLElement>', description: 'Demais atributos do <article>.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof AuthorCard> = {
  title: 'Unooblog/Componentes/AuthorCard',
  component: AuthorCard,
  parameters: { layout: 'padded' },
  argTypes: {
    name: { control: 'text', description: 'Nome de quem assina.' },
    role: { control: 'text', description: 'Cargo ou papel.' },
    bio: { control: 'text', description: 'Minibiografia.' },
    avatarSrc: { control: 'text', description: 'Retrato.' },
    followers: { control: { type: 'number', min: 0, step: 1 }, description: 'Quantidade de seguidores.' },
    following: { control: 'boolean', description: 'Autor seguido.' },
    onToggleFollow: { action: 'onToggleFollow', description: 'Mostra o botão de seguir.' },
    href: { control: 'text', description: 'Endereço do perfil.' },
    layout: { control: 'radio', options: ['card', 'inline'], description: 'Cartão ou linha.' },
    theme: { control: 'radio', options: [undefined, 'light', 'dark'], description: 'Tema (vazio herda).' },
    className: { control: 'text', description: 'Classe CSS adicional.' },
  },
  args: {
    ...autoria,
    following: false,
    layout: 'card',
  },
};

export default meta;

type Story = StoryObj<typeof AuthorCard>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <AuthorCardDocumentationPage />,
};

/**
 * Playground do cartão, com 100% das props expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do AuthorCard',
  render: (args) => (
    <UblDocStage theme={args.theme ?? 'light'} surface="page" align="stretch" direction="column" width={520}>
      <AuthorCard {...args} />
    </UblDocStage>
  ),
};

/**
 * O cartão ao fim do post, com o estado de seguir guardado pelo produto.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de composição: fim do post',
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" width={620}>
      <AutorInterativo href="#perfil" />
    </UblDocStage>
  ),
};

/**
 * Do contêiner largo ao estreito: abaixo de 400px o cartão empilha e centraliza.
 */
export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {[620, 440, 320].map((width) => (
        <UblDocStage key={width} label={`Contêiner de ${width}px`} surface="page" align="stretch" direction="column" width={width}>
          <AutorInterativo />
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Cartão e linha.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" width={520}>
      <AutorInterativo layout="card" />
      <AutorInterativo layout="inline" />
    </UblDocStage>
  ),
};

/**
 * Não seguido, seguido, sem botão e com perfil. O hover e o foco se veem com o ponteiro e com o Tab.
 */
export const Estados: Story = {
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" width={520}>
      <AutorInterativo />
      <AutorInterativo inicial {...outraAutoria} />
      <AuthorCard {...autoria} />
      <AutorInterativo href="#perfil" />
    </UblDocStage>
  ),
};

/**
 * Os dois temas.
 */
export const DoisTemas: Story = {
  name: 'Claro e Escuro',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {(['light', 'dark'] as const).map((theme) => (
        <UblDocStage key={theme} label={theme === 'light' ? 'Tema claro' : 'Tema escuro'} theme={theme} surface="page" align="stretch" direction="column" width={460}>
          <AutorInterativo />
          <AutorInterativo layout="inline" inicial {...outraAutoria} />
        </UblDocStage>
      ))}
    </div>
  ),
};

/**
 * Interação: seguir alterna o texto, o `aria-pressed` e o glifo, devolve o novo
 * valor, e nunca abre o perfil; a contagem de seguidores sai em pt-BR.
 */
export const Seguir: Story = {
  name: 'Interação: seguir e deixar de seguir',
  render: () => (
    <UblDocStage surface="page" align="stretch" direction="column" width={520}>
      <AutorInterativo onChange={followSpy} href="#perfil" />
      <AuthorCard name="Autor sem seguidores" followers={1} />
      <AuthorCard name="Autor mediano" followers={980} />
    </UblDocStage>
  ),
  play: async ({ canvasElement }) => {
    followSpy.mockClear();
    const canvas = within(canvasElement);

    // Seguidores em pt-BR, abreviados a partir de mil.
    await expect(canvas.getByText('2,8 mil seguidores')).toBeInTheDocument();
    await expect(canvas.getByText('1 seguidor')).toBeInTheDocument();
    await expect(canvas.getByText('980 seguidores')).toBeInTheDocument();

    // O nome é o link do perfil e o nome do botão fala do autor.
    const link = canvas.getByRole('link', { name: autoria.name });
    await expect(link).toHaveAttribute('href', '#perfil');

    const seguir = canvas.getByRole('button', { name: 'Seguir' });
    await expect(seguir).toHaveAttribute('aria-pressed', 'false');
    await expect(seguir).toHaveAccessibleDescription(autoria.name);

    // Seguir: texto, aria-pressed e valor devolvido mudam; o glifo vira "following".
    await userEvent.click(seguir);
    await expect(followSpy).toHaveBeenLastCalledWith(true);
    const seguindo = canvas.getByRole('button', { name: 'Seguindo' });
    await expect(seguindo).toHaveAttribute('aria-pressed', 'true');
    await expect(seguindo).toHaveTextContent('check');
    await expect(canvas.queryByRole('button', { name: 'Seguir' })).toBeNull();

    // Deixar de seguir volta ao estado inicial.
    await userEvent.click(seguindo);
    await expect(followSpy).toHaveBeenLastCalledWith(false);
    await expect(canvas.getByRole('button', { name: 'Seguir' })).toHaveAttribute('aria-pressed', 'false');
    await expect(followSpy).toHaveBeenCalledTimes(2);

    // Sem onToggleFollow, o botão não existe (só um botão para três cartões).
    await expect(canvas.getAllByRole('button')).toHaveLength(1);
  },
};
