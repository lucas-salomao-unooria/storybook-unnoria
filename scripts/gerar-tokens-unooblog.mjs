/**
 * Gera as cores e a tipografia do Unooblog (`src/unooblog/tokens/`).
 *
 * Uso: `node scripts/gerar-tokens-unooblog.mjs`
 *
 * Toda a decisão de design de cor e de tipografia do módulo está nas tabelas
 * abaixo; o motor (`scripts/lib/gerar-tokens-marca.mjs`) lê os literais da
 * Plataforma Unooria, mede o contraste e só grava se todos os pares passarem.
 *
 * O blog não tem arquivo de design: a composição é própria (leitura em coluna
 * única, cartões lavanda sobre página branca, código em superfície escura
 * invariante). A identidade é a da Plataforma Unooria.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gerarCores, gerarTipografia } from './lib/gerar-tokens-marca.mjs';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = { raiz, modulo: 'unooblog', nome: 'Unooblog', p: 'ubl', P: 'Ubl' };

const U = (s) => `--unooria-${s}`;
const c = (s) => U(`color-${s}`);

/* [chave, grupo, uso, origem clara, origem escura] */
const TEMA = [
  ['backgroundPage', 'Superfícies', 'Fundo da página e da coluna de leitura', c('neutral-50'), c('brandpurple-950')],
  ['backgroundCard', 'Superfícies', 'Cartões de post, autor, série e newsletter', c('brandpurple-50'), c('brandpurple-900')],
  ['backgroundSubtle', 'Superfícies', 'Capa ainda não carregada, comentários respondidos e blocos sutis', c('brandpurple-100'), c('brandpurple-800')],
  ['backgroundElevated', 'Superfícies', 'Menus, folhas inferiores e diálogos', c('neutral-50'), c('brandpurple-800')],
  ['surfaceBar', 'Superfícies', 'Cabeçalho do site translúcido sobre a rolagem', c('opacity-neutrallight-900'), c('opacity-brandpurple-900')],

  ['textPrimary', 'Texto', 'Títulos, corpo do post e texto de alto contraste', c('neutral-950'), c('neutraldark-950')],
  ['textSecondary', 'Texto', 'Subtítulo, resumo, autoria e metadados', c('neutral-700'), c('neutraldark-900')],
  ['textMuted', 'Texto', 'Tempo de leitura, legendas e espaço reservado dos campos', c('neutral-600'), c('neutraldark-800')],
  ['textAccent', 'Texto', 'Links, tópicos e ações de texto', c('brandpurple-700'), c('brandpurple-300')],
  ['textOnAction', 'Texto', 'Rótulo sobre o preenchimento de ação', c('neutral-50'), c('brandpurple-950')],
  ['textDanger', 'Texto', 'Ações destrutivas em texto e erro de campo', c('danger-700'), c('danger-300')],
  ['textOnDanger', 'Texto', 'Rótulo sobre o botão destrutivo preenchido', c('neutral-50'), c('brandpurple-950')],

  ['iconPrimary', 'Ícones', 'Glifos ativos da navegação e das barras', c('neutral-950'), c('neutraldark-950')],
  ['iconSecondary', 'Ícones', 'Glifos de apoio e setas', c('neutral-500'), c('neutraldark-800')],
  ['iconAccent', 'Ícones', 'Glifo de destaque: post salvo, autor seguido', c('brandpurple-600'), c('brandpurple-400')],

  ['borderSubtle', 'Bordas', 'Divisores e contorno de cartão', c('brandpurple-200'), c('brandpurple-700')],
  ['borderDefault', 'Bordas', 'Contorno de superfície e de controle desabilitado', c('brandpurple-300'), c('brandpurple-700')],
  ['borderControl', 'Bordas', 'Contorno de campo e de controle (gráfico ≥ 3:1)', c('neutral-500'), c('neutraldark-800')],

  ['actionPrimary', 'Ações', 'Botão primário, item ativo, progresso de leitura e sumário ativo', c('brandpurple-600'), c('brandpurple-400')],
  ['actionPressed', 'Ações', 'Estado pressionado da ação primária', c('brandpurple-700'), c('brandpurple-300')],
  ['actionDisabled', 'Ações', 'Ação primária desabilitada', c('brandpurple-300'), c('brandpurple-700')],
  ['actionDanger', 'Ações', 'Botão destrutivo preenchido', c('danger-600'), c('danger-400')],
  ['fillField', 'Ações', 'Preenchimento de campo, de chip e do controle segmentado', c('brandpurple-100'), c('brandpurple-800')],
  ['stateHover', 'Ações', 'Realce de hover sobre qualquer superfície', c('opacity-brandpurple-50'), c('opacity-neutrallight-100')],
  ['statePressed', 'Ações', 'Realce de pressionado sobre qualquer superfície', c('opacity-brandpurple-100'), c('opacity-neutrallight-200')],
  ['focusRing', 'Ações', 'Anel de foco de 2px (gráfico ≥ 3:1)', c('brandpurple-600'), c('brandpurple-300')],

  ['brandLike', 'Marca', 'Coração de curtida quando ativo', c('danger-600'), c('danger-400')],
  ['statusInfo', 'Marca', 'Barra e glifo do aviso informativo', c('info-700'), c('info-300')],
  ['statusSuccess', 'Marca', 'Barra e glifo da dica e confirmação de inscrição', c('success-700'), c('success-400')],
  ['statusWarning', 'Marca', 'Barra e glifo do aviso de atenção', c('warning-700'), c('warning-300')],
  ['fillInfo', 'Marca', 'Fundo translúcido do aviso informativo', c('opacity-info-100'), c('opacity-info-100')],
  ['fillSuccess', 'Marca', 'Fundo translúcido da dica', c('opacity-success-100'), c('opacity-success-100')],
  ['fillWarning', 'Marca', 'Fundo translúcido do aviso de atenção', c('opacity-warning-100'), c('opacity-warning-100')],

  ['overlayScrim', 'Overlays', 'Véu atrás de folhas e diálogos', c('opacity-brandpurple-500'), c('opacity-brandpurple-700')],
  ['toastSurface', 'Overlays', 'Fundo do aviso passageiro (cores invertidas)', c('brandpurple-900'), c('brandpurple-100')],
  ['toastText', 'Overlays', 'Texto do aviso passageiro', c('neutral-50'), c('brandpurple-950')],
  ['toastAction', 'Overlays', 'Ação do aviso passageiro ("Desfazer")', c('brandpurple-300'), c('brandpurple-700')],

  ['elevationOverlay', 'Elevação', 'Menus, folhas, diálogos e avisos', U('elevation-brand-secondary'), U('elevation-neutral-2')],
];

/* [chave, grupo, uso, origem] */
const INVARIANTES = [
  ['codeSurface', 'Código', 'Fundo do bloco de código, nos dois temas', c('brandpurple-950')],
  ['codeText', 'Código', 'Texto do bloco de código', c('neutral-50')],
  ['codeTextMuted', 'Código', 'Nome do arquivo, linguagem e numeração das linhas', c('brandpurple-300')],
  ['codeAccent', 'Código', 'Linha destacada e confirmação de cópia', c('brandpurple-400')],
  ['codeBorder', 'Código', 'Fio entre a barra e o corpo do bloco de código', c('opacity-neutrallight-300')],
  ['codeControl', 'Código', 'Fundo do botão de copiar em hover', c('opacity-neutrallight-200')],
  ['mediaScrim', 'Mídia', 'Véu da base da capa, atrás de texto sobre a mídia', c('opacity-brandpurple-600')],
  ['mediaText', 'Mídia', 'Texto sobre a capa (sempre branco)', c('neutral-50')],
  ['deviceBody', 'Aparelho', 'Corpo do aparelho do mockup e ilha da câmera', c('brandpurple-950')],
  ['deviceEdge', 'Aparelho', 'Aro metálico do aparelho', c('brandpurple-800')],
  ['deviceButton', 'Aparelho', 'Botões laterais do aparelho', c('brandpurple-700')],
  ['deviceLens', 'Aparelho', 'Lente da câmera frontal', c('brandpurple-800')],
  ['deviceChrome', 'Aparelho', 'Barra do navegador do mockup de área de trabalho', c('brandpurple-800')],
  ['deviceChromeField', 'Aparelho', 'Campo de endereço do mockup de área de trabalho', c('brandpurple-900')],
  ['deviceChromeText', 'Aparelho', 'Texto do endereço no mockup de área de trabalho', c('neutraldark-900')],
];

const GRADIENTES = [
  ['media-bottom', 'Véu da base da capa, atrás do título sobre a mídia', 'linear-gradient(180deg, transparent 40%, var(--ubl-color-media-scrim) 100%)'],
];

const SUPERFICIES = ['backgroundPage', 'backgroundCard', 'backgroundElevated'];

/* [frente, fundo, tipo, uso] */
const PARES = [
  ...SUPERFICIES.flatMap((bg) => [
    ['textPrimary', bg, 'text', 'Título e corpo do post'],
    ['textSecondary', bg, 'text', 'Subtítulo, resumo e metadado'],
    ['textMuted', bg, 'text', 'Tempo de leitura, legenda e espaço reservado'],
    ['textAccent', bg, 'text', 'Link, tópico e ação de texto'],
    ['textDanger', bg, 'text', 'Ação destrutiva e erro de campo'],
    ['iconSecondary', bg, 'graphic', 'Glifo de apoio'],
    ['iconAccent', bg, 'graphic', 'Glifo de destaque'],
    ['actionPrimary', bg, 'graphic', 'Limite do controle selecionado e preenchimento do progresso'],
    ['borderControl', bg, 'graphic', 'Contorno de campo e de controle'],
    ['focusRing', bg, 'graphic', 'Anel de foco'],
    ['brandLike', bg, 'graphic', 'Coração de curtida ativo'],
  ]),
  ['textPrimary', 'backgroundSubtle', 'text', 'Texto sobre bloco sutil'],
  ['textSecondary', 'backgroundSubtle', 'text', 'Metadado sobre bloco sutil'],
  ['textMuted', 'backgroundSubtle', 'text', 'Legenda sobre bloco sutil'],
  ['textAccent', 'backgroundSubtle', 'text', 'Ação de texto sobre bloco sutil'],
  ['textPrimary', 'fillField@backgroundPage', 'text', 'Texto em chip e campo'],
  ['textMuted', 'fillField@backgroundPage', 'text', 'Espaço reservado do campo de busca'],
  ['textAccent', 'fillField@backgroundCard', 'text', 'Chip de tópico'],
  ['textPrimary', 'surfaceBar@backgroundPage', 'text', 'Navegação no cabeçalho translúcido'],
  ['textSecondary', 'surfaceBar@backgroundPage', 'text', 'Item inativo no cabeçalho translúcido'],
  ['textOnAction', 'actionPrimary', 'text', 'Rótulo do botão primário'],
  ['textOnAction', 'actionPressed', 'text', 'Rótulo do botão primário pressionado'],
  ['textOnDanger', 'actionDanger', 'text', 'Rótulo do botão destrutivo'],
  ['textPrimary', 'fillInfo@backgroundPage', 'text', 'Texto do aviso informativo'],
  ['textPrimary', 'fillSuccess@backgroundPage', 'text', 'Texto da dica'],
  ['textPrimary', 'fillWarning@backgroundPage', 'text', 'Texto do aviso de atenção'],
  ['statusInfo', 'fillInfo@backgroundPage', 'graphic', 'Barra e glifo do aviso informativo'],
  ['statusSuccess', 'fillSuccess@backgroundPage', 'graphic', 'Barra e glifo da dica'],
  ['statusWarning', 'fillWarning@backgroundPage', 'graphic', 'Barra e glifo do aviso de atenção'],
  ['statusSuccess', 'backgroundCard', 'graphic', 'Confirmação de inscrição'],
  ['toastText', 'toastSurface', 'text', 'Texto do aviso'],
  ['toastAction', 'toastSurface', 'text', 'Ação do aviso'],
  ['codeText', 'codeSurface', 'text', 'Código'],
  ['codeTextMuted', 'codeSurface', 'text', 'Nome do arquivo e numeração das linhas'],
  ['codeAccent', 'codeSurface', 'text', 'Confirmação de cópia'],
  ['codeText', 'codeControl@codeSurface', 'text', 'Botão de copiar em hover'],
  ['deviceChromeText', 'deviceChromeField', 'text', 'Endereço no mockup de área de trabalho'],
  /* Pior caso da mídia: texto sobre uma capa branca, com o véu da base. */
  ['mediaText', 'mediaScrim@__white', 'text', 'Título sobre a capa (pior caso: capa branca)'],
];

gerarCores({
  ...base,
  TEMA,
  INVARIANTES,
  PARES,
  GRADIENTES,
  invariantesTexto: `   O BLOCO DE CÓDIGO, a mídia e o aparelho do mockup são invariantes: o código
   vive sobre fundo escuro nos dois temas (leitura de código em claro cansa e
   perde o contraste das cores de destaque), e sobre a capa o texto é sempre
   branco.
`,
});

/* [chave TS, slug CSS, nome, degrau Unooria, peso, uso, itálico?, caixa alta?, monoespaçada?] */
const ESCALA = [
  ['display', 'display', 'Display', 'heading-4xl', 'bold', 'Título do post em destaque na capa do blog.'],
  ['heading1', 'heading-1', 'Heading/1', 'heading-xxxl', 'bold', 'Título do post aberto (h1).'],
  ['heading2', 'heading-2', 'Heading/2', 'heading-xxl', 'bold', 'Título de seção do post (h2) e da página.'],
  ['heading3', 'heading-3', 'Heading/3', 'title-xl', 'bold', 'Subtítulo de seção do post (h3) e título de cartão em destaque.'],
  ['heading4', 'heading-4', 'Heading/4', 'title-l', 'semibold', 'Título de cartão, de série e de autor (h4).'],
  ['lead', 'lead', 'Lead', 'title-l', 'regular', 'Subtítulo do post sob o título.'],
  ['prose', 'prose', 'Prose', 'body-m', 'regular', 'Corpo do post: parágrafos, listas e comentários.'],
  ['bodyLarge', 'body-lg', 'Body/Large', 'body-s', 'regular', 'Resumo do cartão, campos e texto de caixas.'],
  ['bodyMedium', 'body-md', 'Body/Medium', 'body-xs', 'regular', 'Metadados, legenda e texto de apoio.'],
  ['quote', 'quote', 'Quote', 'title-xl', 'regular', 'Citação em bloco (itálico).', true],
  ['labelLarge', 'label-lg', 'Label/Large', 'body-s', 'semibold', 'Rótulo de botão.'],
  ['label', 'label', 'Label', 'body-xs', 'semibold', 'Navegação, chips, abas e ações de texto.'],
  ['caption', 'caption', 'Caption', 'body-xxs', 'regular', 'Data, contagem e direitos autorais.'],
  ['captionStrong', 'caption-strong', 'Caption/Strong', 'body-xxs', 'semibold', 'Selo, contagem destacada e rótulo de tópico.'],
  ['code', 'code', 'Code', 'body-xs', 'regular', 'Código em bloco e em linha (pilha monoespaçada do sistema).', false, false, true],
];

gerarTipografia({
  ...base,
  ESCALA,
  mono: "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace",
});
