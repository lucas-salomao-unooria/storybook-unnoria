import React from 'react';
import type { UnooriaTheme } from '../../tokens';
import type { NewsMedium } from './NewsCard.medium';

/**
 * Propriedades do componente NewsCard da Plataforma Unooria.
 *
 * O cartão compacto de uma notícia na MESA da redação: a faixa do meio, a
 * imagem (ou o desenho do meio, quando não há imagem), a manchete e o resumo.
 * O cartão inteiro é um botão que abre a matéria original numa gaveta — por
 * isso `aria-haspopup="dialog"`, e por isso não há botão "ler mais" dentro dele.
 *
 * **Nada de métrica de vaidade.** Não existe prop para curtidas, seguidores ou
 * compartilhamentos, nem mesmo no meio `social`: o que a criança avalia é a
 * notícia, e um número de curtidas vira pista falsa de confiabilidade.
 *
 * **Texto essencial nunca é cortado.** Manchete e resumo quebram linha quantas
 * vezes precisarem; não há reticências nem `line-clamp`. Quem controla o
 * tamanho é o conteúdo (resumo de 25 a 35 palavras), não o CSS.
 *
 * `title` fica de fora: o nome do cartão é a manchete, e um `title` nativo
 * viraria um balão duplicado no ponteiro. `type` e `children` também: o cartão
 * é sempre `type="button"` (dentro de um formulário, tocar para ler não pode
 * enviar nada) e o conteúdo vem das props, não de filhos.
 */
export interface NewsCardProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'title' | 'type' | 'children'> {
  /** O meio de comunicação da notícia — define o ícone, o rótulo e o desenho. */
  medium: NewsMedium;

  /**
   * A manchete. Nomeia o botão para o leitor de tela (com ", na capa" quando
   * `onFrontPage`), então precisa fazer sentido sozinha.
   */
  headline: React.ReactNode;

  /**
   * O resumo, de 25 a 35 palavras — cabe em 3 ou 4 linhas sem corte. Entra na
   * descrição acessível do botão, depois do rótulo do meio.
   */
  summary?: React.ReactNode;

  /**
   * Endereço da imagem. Ausente, ou se falhar ao carregar, a área 16:9 mostra o
   * desenho pelo meio (o ícone do meio, grande, sobre fundo suave) — nunca um
   * buraco nem o ícone de imagem quebrada do navegador.
   */
  imageSrc?: string;

  /**
   * Texto alternativo da imagem. **Obrigatório de fato quando há `imageSrc`**:
   * ele entra na descrição acessível do cartão. Sem ele a imagem é tratada como
   * decorativa (`alt=""`) e quem usa leitor de tela não fica sabendo o que ela
   * mostra.
   */
  imageAlt?: string;

  /**
   * A notícia já está na capa. Mostra o selo e a borda de destaque, e acrescenta
   * ", na capa" ao nome acessível. Não usa `aria-pressed`: o botão abre a
   * gaveta, não alterna a escolha.
   * @default false
   */
  onFrontPage?: boolean;

  /**
   * Texto do selo de quem já está na capa. Também forma o sufixo do nome
   * acessível, em minúsculas (", na capa").
   * @default 'Na capa'
   */
  frontPageLabel?: string;

  /**
   * Sobrescreve o rótulo do meio na faixa do topo. Sem ele, vale o de
   * `NEWS_MEDIUM_LABELS` ("Jornal impresso", "Rádio"…).
   */
  mediumLabel?: string;

  /**
   * Tema visual.
   * @default 'light'
   */
  theme?: UnooriaTheme;

  /** Classe CSS adicional. */
  className?: string;
}
