import React from 'react';
import type { UnooriaTheme } from '../../tokens';
import type { NewsArticleMedium } from '../NewsCard/NewsCard.medium';

/**
 * Propriedades do componente NewsArticle da Plataforma Unooria.
 *
 * A matéria como ela é no meio de origem, dentro da gaveta que o `NewsCard`
 * abre: o recorte de jornal, o boletim de rádio transcrito, o quadro do
 * telejornal, o post de blog, a matéria de portal ou o aviso do mural.
 *
 * **Só `NewsArticleMedium`, sem `social` nem `message`.** A matéria original de
 * um post de rede social se desenha com o `PostCard` do Instanooria, e a de uma
 * mensagem encaminhada com o `MessageBubble` do WhatsApp Mobile — cada peça na
 * seção da plataforma que ela imita. Desenhar um post "genérico" aqui criaria
 * um terceiro visual para a mesma coisa, e a criança aprenderia a reconhecer um
 * disfarce que não existe em lugar nenhum.
 *
 * `title` fica de fora: o nome da matéria vem do `aria-label` ("Matéria
 * original — Rádio") e o título dela é a `headline`.
 */
export interface NewsArticleProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** O meio de origem — escolhe a apresentação inteira. */
  medium: NewsArticleMedium;

  /** A manchete, como título (`h2`/`h3`/`h4`, ver `headingLevel`). */
  headline: React.ReactNode;

  /**
   * O corpo: o texto da matéria, a fala transcrita no rádio ou a transcrição
   * no telejornal. Parágrafos (`<p>`) ganham o espaçamento de leitura do meio.
   */
  children: React.ReactNode;

  /**
   * O nome do veículo (o cabeçalho do jornal, a barra do portal, a emissora).
   * Opcional de propósito: a FONTE é uma pista que a criança revela à parte, e
   * a matéria não pode entregá-la antes da hora. Sem ele, fica só a decoração
   * do meio (o fio duplo do jornal, a barra do portal), sem texto.
   */
  masthead?: React.ReactNode;

  /**
   * Endereço da imagem. No telejornal e no portal, sem imagem (ou se ela falhar
   * ao carregar) aparece o desenho pelo meio — nunca um buraco. Nos outros
   * meios a imagem é opcional e, sem ela, simplesmente não aparece.
   */
  imageSrc?: string;

  /**
   * Texto alternativo da imagem. **Obrigatório de fato quando há `imageSrc`**:
   * sem ele a imagem é tratada como decorativa (`alt=""`).
   */
  imageAlt?: string;

  /**
   * A legenda da imagem. No telejornal é a tarja inferior, sobre o quadro; nos
   * outros meios, a linha sob a foto. Acompanha o quadro da imagem: num meio
   * sem imagem (rádio ou mural sem `imageSrc`, por exemplo) não aparece.
   */
  caption?: React.ReactNode;

  /** Quem fala, no rádio (ex.: "Locutor"). Rótulo sobre a fala transcrita. */
  speaker?: React.ReactNode;

  /**
   * O nível do título. A gaveta costuma ter o próprio título (`h2`, como o do
   * `Modal`), então a manchete entra um nível abaixo.
   * @default 3
   */
  headingLevel?: 2 | 3 | 4;

  /**
   * O selo do boletim de rádio. A atividade não depende de som: o boletim
   * aparece transcrito, e o selo diz que era uma transmissão.
   * @default 'No ar'
   */
  onAirLabel?: string;

  /**
   * O rótulo sobre o corpo no telejornal.
   * @default 'Transcrição'
   */
  transcriptLabel?: string;

  /**
   * Tema visual.
   * @default 'light'
   */
  theme?: UnooriaTheme;

  /** Classe CSS adicional. */
  className?: string;
}
