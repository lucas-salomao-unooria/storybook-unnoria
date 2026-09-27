/**
 * Os meios de comunicação de uma notícia — o vocabulário compartilhado por
 * `NewsCard`, `NewsArticle` e `NewspaperPage`.
 *
 * Nasceu para o Jornal da Escola (a redação onde a criança escolhe 3 de 8
 * notícias), mas não é da missão: é o que distingue um recorte de jornal de uma
 * mensagem encaminhada, em qualquer tela que mostre notícia de mais de um meio.
 *
 * `social` e `message` existem aqui porque o CARTÃO compacto os mostra na mesa
 * da redação. A matéria ORIGINAL deles não é desta seção: um post de rede social
 * se desenha com o `PostCard` do Instanooria e uma mensagem com o
 * `MessageBubble` do WhatsApp Mobile — cada peça na seção da plataforma que ela
 * imita. Por isso `NewsArticle` aceita só `NewsArticleMedium`.
 */
export type NewsMedium =
  | 'newspaper'
  | 'radio'
  | 'tv'
  | 'blog'
  | 'portal'
  | 'social'
  | 'message'
  | 'bulletin';

/** Os meios cuja matéria original esta seção desenha (sem rede social nem mensagem). */
export type NewsArticleMedium = Exclude<NewsMedium, 'social' | 'message'>;

/** O nome do meio como a criança o lê. */
export const NEWS_MEDIUM_LABELS: Record<NewsMedium, string> = {
  newspaper: 'Jornal impresso',
  radio: 'Rádio',
  tv: 'Telejornal',
  blog: 'Blog',
  portal: 'Portal de notícias',
  social: 'Rede social',
  message: 'Mensagem encaminhada',
  bulletin: 'Mural da escola',
};

/**
 * O glifo de cada meio, pelo nome da ligadura do Material Symbols Rounded — a
 * mesma biblioteca-base do `Icon` da seção. Todos estão no quadro de ícones
 * (`6024:2923`): o quadro não publica `radio`, `live_tv` nem `push_pin`, e por
 * isso o rádio é o microfone do locutor (`mic`), o telejornal é a tela
 * (`connected_tv`), o blog é o documento (`article`) e o mural é o alfinete
 * (`keep`, o nome do alfinete na biblioteca). Glifo fora do quadro abriria
 * desvio sem necessidade.
 */
export const NEWS_MEDIUM_ICONS: Record<NewsMedium, string> = {
  newspaper: 'newspaper',
  radio: 'mic',
  tv: 'connected_tv',
  blog: 'article',
  portal: 'public',
  social: 'photo_camera',
  message: 'forward_to_inbox',
  bulletin: 'keep',
};

export const NEWS_MEDIUMS = Object.keys(NEWS_MEDIUM_LABELS) as NewsMedium[];
