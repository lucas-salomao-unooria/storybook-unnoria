/**
 * Gera as cores e a tipografia do Unoojornal (`src/unoojornal/tokens/`).
 *
 * Uso: `node scripts/gerar-tokens-unoojornal.mjs`
 *
 * Toda a decisão de design de cor e de tipografia do módulo está nas tabelas
 * abaixo; o motor (`scripts/lib/gerar-tokens-marca.mjs`) lê os literais da
 * Plataforma Unooria, mede o contraste e só grava se todos os pares passarem.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gerarCores, gerarTipografia } from './lib/gerar-tokens-marca.mjs';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = { raiz, modulo: 'unoojornal', nome: 'Unoojornal', p: 'ujn', P: 'Ujn' };

const U = (s) => `--unooria-${s}`;
const c = (s) => U(`color-${s}`);

/* [chave, grupo, uso, origem clara, origem escura] */
const TEMA = [
  ['backgroundPage', 'Superfícies', 'Fundo da página: o papel atrás das colunas', c('brandpurple-50'), c('brandpurple-950')],
  ['backgroundCard', 'Superfícies', 'Cartões, caixas laterais e a coluna de leitura', c('neutral-50'), c('brandpurple-900')],
  ['backgroundSubtle', 'Superfícies', 'Mídia ainda não carregada, tarja de data e blocos sutis', c('brandpurple-100'), c('brandpurple-800')],
  ['backgroundElevated', 'Superfícies', 'Menus, folhas inferiores e diálogos', c('neutral-50'), c('brandpurple-800')],
  ['surfaceBar', 'Superfícies', 'Barra superior translúcida do leitor de matéria', c('opacity-neutrallight-900'), c('opacity-brandpurple-900')],

  ['textPrimary', 'Texto', 'Títulos, rótulos e texto de alto contraste', c('neutral-950'), c('neutraldark-950')],
  ['textSecondary', 'Texto', 'Resumos, autoria, datas e metadados', c('neutral-700'), c('neutraldark-900')],
  ['textMuted', 'Texto', 'Tempo de leitura, legendas e espaço reservado dos campos', c('neutral-600'), c('neutraldark-800')],
  ['textAccent', 'Texto', 'Kicker, links e ações de texto', c('brandpurple-700'), c('brandpurple-300')],
  ['textOnAction', 'Texto', 'Rótulo sobre o preenchimento de ação e sobre a pílula selecionada', c('neutral-50'), c('brandpurple-950')],
  ['textDanger', 'Texto', 'Ações destrutivas em texto e erro de campo', c('danger-700'), c('danger-300')],
  ['textOnDanger', 'Texto', 'Rótulo sobre o botão destrutivo preenchido', c('neutral-50'), c('brandpurple-950')],

  ['iconPrimary', 'Ícones', 'Glifos ativos da navegação e das barras', c('neutral-950'), c('neutraldark-950')],
  ['iconSecondary', 'Ícones', 'Glifos de apoio e setas', c('neutral-500'), c('neutraldark-800')],
  ['iconAccent', 'Ícones', 'Glifo de destaque: matéria salva, item ativo', c('brandpurple-600'), c('brandpurple-400')],

  ['borderSubtle', 'Bordas', 'Divisores entre itens da lista e contorno de cartão', c('brandpurple-200'), c('brandpurple-700')],
  ['borderDefault', 'Bordas', 'Contorno do botão secundário e da pílula em repouso', c('brandpurple-300'), c('brandpurple-700')],
  ['borderRule', 'Bordas', 'Fio grosso e fio duplo do cabeçalho: a tinta do jornal (gráfico ≥ 3:1)', c('brandpurple-900'), c('brandpurple-200')],
  ['borderControl', 'Bordas', 'Contorno de campo e de controle (gráfico ≥ 3:1)', c('neutral-500'), c('neutraldark-800')],

  ['actionPrimary', 'Ações', 'Botão primário, pílula selecionada, progresso de leitura e item ativo', c('brandpurple-600'), c('brandpurple-400')],
  ['actionPressed', 'Ações', 'Estado pressionado da ação primária', c('brandpurple-700'), c('brandpurple-300')],
  ['actionDisabled', 'Ações', 'Ação primária desabilitada', c('brandpurple-300'), c('brandpurple-700')],
  ['actionDanger', 'Ações', 'Botão destrutivo preenchido', c('danger-600'), c('danger-400')],
  ['fillField', 'Ações', 'Preenchimento de campo, de etiqueta de destaque e de pílula em repouso', c('brandpurple-100'), c('brandpurple-800')],
  ['stateHover', 'Ações', 'Realce de hover sobre qualquer superfície', c('opacity-brandpurple-50'), c('opacity-neutrallight-100')],
  ['statePressed', 'Ações', 'Realce de pressionado sobre qualquer superfície', c('opacity-brandpurple-100'), c('opacity-neutrallight-200')],
  ['focusRing', 'Ações', 'Anel de foco de 2px (gráfico ≥ 3:1)', c('brandpurple-600'), c('brandpurple-300')],

  ['statusLive', 'Marca', 'Marcador "Atualizado agora" e confirmação de envio da carta', c('success-700'), c('success-400')],
  ['statusWarning', 'Marca', 'Nota de correção publicada', c('warning-700'), c('warning-300')],

  ['overlayScrim', 'Overlays', 'Véu atrás de folhas e diálogos', c('opacity-brandpurple-500'), c('opacity-brandpurple-700')],
  ['toastSurface', 'Overlays', 'Fundo do aviso passageiro (cores invertidas)', c('brandpurple-900'), c('brandpurple-100')],
  ['toastText', 'Overlays', 'Texto do aviso passageiro', c('neutral-50'), c('brandpurple-950')],
  ['toastAction', 'Overlays', 'Ação do aviso passageiro ("Desfazer")', c('brandpurple-300'), c('brandpurple-700')],

  ['elevationOverlay', 'Elevação', 'Menus, folhas, diálogos e avisos', U('elevation-brand-secondary'), U('elevation-neutral-2')],
];

/* [chave, grupo, uso, origem] */
const INVARIANTES = [
  ['footerSurface', 'Rodapé', 'Fundo do rodapé escuro, nos dois temas', c('brandpurple-900')],
  ['footerText', 'Rodapé', 'Texto principal do rodapé', c('neutral-50')],
  ['footerTextSecondary', 'Rodapé', 'Descrição e direitos autorais do rodapé', c('brandpurple-300')],
  ['footerAccent', 'Rodapé', 'Título das colunas e links do rodapé', c('brandpurple-400')],
  ['footerBorder', 'Rodapé', 'Fio que separa o rodapé da última linha de direitos', c('opacity-neutrallight-300')],
  ['mediaScrim', 'Mídia', 'Véu da base da fotografia, atrás de texto sobre a mídia', c('opacity-brandpurple-600')],
  ['mediaText', 'Mídia', 'Texto sobre fotografia (sempre branco)', c('neutral-50')],
  ['deviceBody', 'Aparelho', 'Corpo do aparelho do mockup e ilha da câmera', c('brandpurple-950')],
  ['deviceEdge', 'Aparelho', 'Aro metálico do aparelho', c('brandpurple-800')],
  ['deviceButton', 'Aparelho', 'Botões laterais do aparelho', c('brandpurple-700')],
  ['deviceLens', 'Aparelho', 'Lente da câmera frontal', c('brandpurple-800')],
  ['deviceChrome', 'Aparelho', 'Barra do navegador do mockup de área de trabalho', c('brandpurple-800')],
  ['deviceChromeField', 'Aparelho', 'Campo de endereço do mockup de área de trabalho', c('brandpurple-900')],
  ['deviceChromeText', 'Aparelho', 'Texto do endereço no mockup de área de trabalho', c('neutraldark-900')],
];

const GRADIENTES = [
  ['media-bottom', 'Véu da base da fotografia, atrás do texto sobre a mídia', 'linear-gradient(180deg, transparent 40%, var(--ujn-color-media-scrim) 100%)'],
  [
    'rule-double',
    'Fio duplo da tinta: 3px, vão de 2px e 1px (altura total de 6px)',
    'linear-gradient(180deg, var(--ujn-color-border-rule) 0 3px, transparent 3px 5px, var(--ujn-color-border-rule) 5px 6px)',
  ],
];

const SUPERFICIES = ['backgroundPage', 'backgroundCard', 'backgroundElevated'];

/* [frente, fundo, tipo, uso] */
const PARES = [
  ...SUPERFICIES.flatMap((bg) => [
    ['textPrimary', bg, 'text', 'Título e texto principal'],
    ['textSecondary', bg, 'text', 'Resumo, autoria e metadado'],
    ['textMuted', bg, 'text', 'Tempo de leitura, legenda e espaço reservado'],
    ['textAccent', bg, 'text', 'Kicker, link e ação de texto'],
    ['textDanger', bg, 'text', 'Ação destrutiva e erro de campo'],
    ['iconSecondary', bg, 'graphic', 'Glifo de apoio'],
    ['iconAccent', bg, 'graphic', 'Glifo de destaque'],
    ['actionPrimary', bg, 'graphic', 'Limite da pílula selecionada e preenchimento do progresso'],
    ['borderRule', bg, 'graphic', 'Fio grosso e fio duplo do cabeçalho'],
    ['borderControl', bg, 'graphic', 'Contorno de campo e de controle'],
    ['focusRing', bg, 'graphic', 'Anel de foco'],
  ]),
  ['textPrimary', 'backgroundSubtle', 'text', 'Texto sobre bloco sutil'],
  ['textSecondary', 'backgroundSubtle', 'text', 'Metadado sobre bloco sutil'],
  ['textMuted', 'backgroundSubtle', 'text', 'Legenda sobre bloco sutil'],
  ['textAccent', 'backgroundSubtle', 'text', 'Ação de texto sobre bloco sutil'],
  ['textPrimary', 'fillField@backgroundPage', 'text', 'Texto em pílula de filtro e campo'],
  ['textMuted', 'fillField@backgroundPage', 'text', 'Espaço reservado do campo de busca'],
  ['textAccent', 'fillField@backgroundCard', 'text', 'Etiqueta de destaque'],
  ['textPrimary', 'surfaceBar@backgroundPage', 'text', 'Título na barra translúcida do leitor'],
  ['textSecondary', 'surfaceBar@backgroundPage', 'text', 'Edição na barra translúcida do leitor'],
  ['textOnAction', 'actionPrimary', 'text', 'Rótulo do botão primário e da pílula selecionada'],
  ['textOnAction', 'actionPressed', 'text', 'Rótulo do botão primário pressionado'],
  ['textOnDanger', 'actionDanger', 'text', 'Rótulo do botão destrutivo'],
  ['statusLive', 'backgroundCard', 'graphic', 'Marcador "Atualizado agora"'],
  ['statusWarning', 'backgroundCard', 'graphic', 'Marcador da nota de correção'],
  ['toastText', 'toastSurface', 'text', 'Texto do aviso'],
  ['toastAction', 'toastSurface', 'text', 'Ação do aviso'],
  ['footerText', 'footerSurface', 'text', 'Texto do rodapé'],
  ['footerTextSecondary', 'footerSurface', 'text', 'Descrição e direitos autorais do rodapé'],
  ['footerAccent', 'footerSurface', 'text', 'Título das colunas e links do rodapé'],
  ['deviceChromeText', 'deviceChromeField', 'text', 'Endereço no mockup de área de trabalho'],
  /* Pior caso da mídia: texto sobre uma fotografia branca, com o véu da base. */
  ['mediaText', 'mediaScrim@__white', 'text', 'Legenda sobre a fotografia (pior caso: foto branca)'],
];

gerarCores({
  ...base,
  TEMA,
  INVARIANTES,
  PARES,
  GRADIENTES,
  invariantesTexto: `   O RODAPÉ escuro, a mídia e o aparelho do mockup são invariantes: o rodapé é
   a única superfície escura do jornal claro (e, no tema escuro, continua um
   degrau acima da página). Sobre fotografia o texto é sempre branco.
`,
});

/* [chave TS, slug CSS, nome, degrau Unooria, peso, uso, itálico?] */
const ESCALA = [
  ['masthead', 'masthead', 'Masthead', 'heading-4xl', 'bold', 'Nome da publicação no cabeçalho.'],
  ['headlineXl', 'headline-xl', 'Headline/XL', 'heading-xxxl', 'bold', 'Título da matéria aberta.'],
  ['headline', 'headline', 'Headline', 'heading-xxl', 'bold', 'Título da matéria de capa.'],
  ['titleLarge', 'title-lg', 'Title/Large', 'title-xl', 'bold', 'Título de seção e da caixa de opinião.'],
  ['titleMedium', 'title-md', 'Title/Medium', 'title-l', 'semibold', 'Título de item de lista e de cartão.'],
  ['deck', 'deck', 'Deck', 'title-l', 'regular', 'Linha fina sob o título da matéria.'],
  ['bodyLarge', 'body-lg', 'Body/Large', 'body-m', 'regular', 'Corpo da matéria aberta.'],
  ['bodyMedium', 'body-md', 'Body/Medium', 'body-s', 'regular', 'Resumo do item de lista, texto de caixas e campos.'],
  ['bodySmall', 'body-sm', 'Body/Small', 'body-xs', 'regular', 'Autoria, legenda e texto de apoio.'],
  ['quote', 'quote', 'Quote', 'title-xl', 'regular', 'Citação em destaque (itálico).', true],
  ['labelLarge', 'label-lg', 'Label/Large', 'body-s', 'semibold', 'Rótulo de botão.'],
  ['label', 'label', 'Label', 'body-xs', 'semibold', 'Navegação, pílulas de filtro e ações de texto.'],
  ['kicker', 'kicker', 'Kicker', 'body-xxs', 'semibold', 'Categoria sobre o título (caixa alta).', false, true],
  ['caption', 'caption', 'Caption', 'body-xxs', 'regular', 'Tempo de leitura, hora e direitos autorais.'],
];

gerarTipografia({ ...base, ESCALA });
