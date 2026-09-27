import type { HTMLAttributes, ReactNode } from 'react';
import type { UnooriaTheme } from '../../tokens';
import type { NewsMedium } from '../NewsCard/NewsCard.medium';

/**
 * Os layouts da primeira página — um CONJUNTO FECHADO, de propósito.
 *
 * Na missão "Jornal da Escola", quem escolhe o layout da edição é uma IA, e ela
 * só pode escolher entre estes três. Ela nunca mexe no texto: as manchetes e os
 * resumos são o trabalho da criança, e o layout é só a moldura. Um conjunto
 * fechado é o que torna a escolha verificável do lado do servidor (um
 * `z.enum(NEWSPAPER_LAYOUTS)` recusa qualquer outra coisa) e o que garante que
 * toda saída da IA tenha um desenho testado aqui, a 375px e em tela larga.
 *
 * - `classic`: a manchete em largura total no topo (texto primeiro, imagem à
 *   direita em tela larga e abaixo em tela estreita) e as duas secundárias lado
 *   a lado embaixo.
 * - `hero-image`: a imagem da manchete grande no topo e a manchete sobre uma
 *   faixa sólida logo abaixo; as secundárias lado a lado em tela larga e
 *   empilhadas na estreita.
 * - `columns`: a manchete numa coluna larga à esquerda e as secundárias
 *   empilhadas numa coluna estreita à direita, separadas por um fio de coluna;
 *   em tela estreita, tudo empilha.
 *
 * Acrescentar um layout aqui é mudar o contrato com a IA — o prompt, a
 * validação e as estórias precisam andar juntos.
 */
export const NEWSPAPER_LAYOUTS = ['classic', 'hero-image', 'columns'] as const;

/** Um dos três layouts do conjunto fechado (ver `NEWSPAPER_LAYOUTS`). */
export type NewspaperLayout = (typeof NEWSPAPER_LAYOUTS)[number];

/**
 * Tamanho da página.
 * - `full`: a página inteira, a que a criança monta e lê.
 * - `thumbnail`: a miniatura do comparativo "1ª edição × 2ª edição" —
 *   tipografia e espaçamentos menores, sem resumo e sem ações.
 */
export type NewspaperSize = 'full' | 'thumbnail';

/** Tom do marcador de revisão: `alert` aponta um problema, `ok` confirma a escolha. */
export type NewspaperMarkerTone = 'alert' | 'ok';

/**
 * O marcador que a revisão põe numa vaga — por exemplo, tom `alert` com
 * "Fato de 2018 — já passou". O texto é obrigatório porque a cor sozinha não
 * diz nada a quem não a distingue: o tom vira ícone (`warning` / `check_circle`)
 * com nome acessível, e o motivo vira texto.
 */
export interface NewspaperSlotMarker {
  /** `alert` (perigo) ou `ok` (sucesso). */
  tone: NewspaperMarkerTone;
  /** O motivo, em palavras. Nunca vazio. */
  label: ReactNode;
}

/** O que toda notícia posta numa vaga carrega, com ou sem imagem. */
interface NewspaperSlotBase {
  /** Identificador estável da notícia (chave de lista e rastreio). */
  id: string;
  /** A manchete. Na vaga 0 ela é visivelmente maior. */
  headline: ReactNode;
  /** O resumo sob a manchete. Não aparece na miniatura. */
  summary?: ReactNode;
  /** De que meio a notícia veio — mostra o ícone e o nome do meio. */
  medium?: NewsMedium;
  /** O marcador da revisão, quando houver. */
  marker?: NewspaperSlotMarker;
}

/**
 * Uma notícia posta numa vaga da primeira página.
 *
 * **Imagem sem descrição não compila**: com `imageSrc`, `imageAlt` passa a ser
 * obrigatório. Foto de primeira página é conteúdo, nunca enfeite, então um
 * `alt=""` estaria errado e um `alt` ausente faria o leitor de tela ler o nome
 * do arquivo. Para o dado que chega da api em JSON, onde o tipo não alcança, o
 * componente cumpre a mesma regra em tempo de execução: imagem com `imageAlt`
 * vazio NÃO é desenhada.
 */
export type NewspaperSlot = NewspaperSlotBase &
  (
    | {
        /** Endereço da imagem da notícia, mostrada em 16:9. */
        imageSrc: string;
        /** O que a imagem mostra. Obrigatório sempre que houver `imageSrc`. */
        imageAlt: string;
      }
    | {
        imageSrc?: undefined;
        imageAlt?: string;
      }
  );

/** Nível de título da manchete principal; as secundárias ficam um nível abaixo. */
export type NewspaperHeadingLevel = 2 | 3;

/**
 * Propriedades do componente NewspaperPage da Plataforma Unooria.
 *
 * A primeira página do jornal da escola, com EXATAMENTE três vagas: a manchete
 * principal (índice 0) e duas secundárias (1 e 2). É onde a criança monta a
 * edição, publica, e depois revisa com os marcadores e compara as edições.
 */
export interface NewspaperPageProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * O nome do jornal, em caixa alta no cabeçalho.
   * @default 'Jornal da Escola'
   */
  nameplate?: ReactNode;

  /** A edição (ex.: "1ª edição"). */
  edition?: ReactNode;

  /** A linha de data do cabeçalho (ex.: "Sexta-feira, 26 de setembro de 2026"). */
  dateLine?: ReactNode;

  /**
   * As três vagas, SEMPRE nesta ordem: 0 = manchete principal, 1 e 2 =
   * secundárias. `null` é vaga vazia. Menos de três posições viram vagas
   * vazias; posições além da terceira são ignoradas.
   */
  slots: (NewspaperSlot | null)[];

  /**
   * O layout, dentro do conjunto fechado `NEWSPAPER_LAYOUTS`.
   * @default 'classic'
   */
  layout?: NewspaperLayout;

  /**
   * O texto de cada vaga vazia, na caixa tracejada. Quando é texto, também
   * nomeia a vaga para o leitor de tela ("Manchete principal, vaga vazia").
   * @default ['Manchete principal', 'Notícia secundária A', 'Notícia secundária B']
   */
  emptyLabels?: [ReactNode, ReactNode, ReactNode];

  /**
   * A ação de cada vaga (ex.: o botão "Trocar matéria"). Chamada para as três
   * vagas, cheias ou vazias; sem ela, nada é desenhado. Ignorada em `readOnly`
   * e na miniatura — nem chega a ser chamada.
   */
  renderSlotAction?: (index: number, slot: NewspaperSlot | null) => ReactNode;

  /**
   * Edição publicada / modo leitura: sem ações, e as vagas vazias não mostram
   * o convite (nem o ícone de acrescentar, nem o tracejado).
   * @default false
   */
  readOnly?: boolean;

  /**
   * `thumbnail` é a miniatura do comparativo: menor, sem resumo e sem ações.
   * @default 'full'
   */
  size?: NewspaperSize;

  /**
   * Nível de título da manchete principal (as secundárias ficam um abaixo).
   * Use 3 quando a página vive sob um `h2` da tela.
   * @default 2
   */
  headingLevel?: NewspaperHeadingLevel;

  /**
   * Tema visual.
   * @default 'light'
   */
  theme?: UnooriaTheme;

  /** Classe CSS adicional. */
  className?: string;
}
