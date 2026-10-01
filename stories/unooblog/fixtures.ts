/**
 * Conteúdo de demonstração das estórias do Unooblog.
 *
 * Tudo aqui é fictício e autocontido: o blog "Caderno Aberto", as pessoas, os
 * textos e os comentários não existem. As imagens são ilustrações SVG originais
 * de `public/unooblog/`, geradas só com a paleta da Plataforma Unooria
 * (`scripts/gerar-ilustracoes-unooblog.mjs`). Nada é embutido no pacote: tudo
 * entra nos componentes por prop (`src`, `avatarSrc`, `coverSrc`).
 *
 * As datas giram em torno de um "agora" FIXO (`ublDemoNow`), para que "Há 2
 * horas" e "Há 1 dia" sejam os mesmos em qualquer máquina e em qualquer dia em
 * que o teste rodar. Passe `now={ublDemoNow}` a quem fala de datas.
 */

import type {
  UblAuthor,
  UblBlock,
  UblComment,
  UblPost,
  UblSeries,
  UblTopic,
} from '../../src/unooblog/content';
import { ublHeadingId } from '../../src/unooblog/content';

/** Momento de referência das estórias: quarta-feira, 30/09/2026, 10:00 em São Paulo. */
export const ublDemoNow = '2026-09-30T10:00:00-03:00';

const capa = (numero: string) => `/unooblog/capa-${numero}.svg`;
const retrato = (numero: string) => `/unooblog/retrato-${numero}.svg`;

/* Atalhos de escrita dos blocos: o intertítulo ganha a âncora pelo mesmo utilitário do produto. */
const p = (text: string): UblBlock => ({ type: 'paragraph', text });
const h2 = (text: string): UblBlock => ({ type: 'heading', level: 2, text, id: ublHeadingId(text) });
const h3 = (text: string): UblBlock => ({ type: 'heading', level: 3, text, id: ublHeadingId(text) });
const ul = (...items: string[]): UblBlock => ({ type: 'list', items });
const ol = (...items: string[]): UblBlock => ({ type: 'list', ordered: true, items });
const quote = (text: string, cite?: string): UblBlock => ({ type: 'quote', text, cite });
const callout = (tone: 'info' | 'tip' | 'warning', title: string, text: string): UblBlock => ({
  type: 'callout',
  tone,
  title,
  text,
});
const figure = (numero: string, alt: string, caption: string): UblBlock => ({
  type: 'figure',
  src: capa(numero),
  alt,
  caption,
  credit: 'Ilustração: equipe do Caderno Aberto',
});

/** Dados institucionais do blog de demonstração. */
export const ublSite = {
  name: 'Caderno Aberto',
  tagline: 'Notas sobre design, código e aprendizado',
  description:
    'Um blog de leitura longa sobre como projetar, construir e ensinar produtos digitais que mais gente consegue usar. Textos escritos por quem faz, com exemplos que dá para copiar.',
  copyright: '© 2026 Caderno Aberto. Todos os direitos reservados.',
} as const;

/** Os seis tópicos do blog. */
export const ublTopics: UblTopic[] = [
  {
    id: 'design-de-interfaces',
    label: 'Design de interfaces',
    description: 'Estrutura, cor, tipografia e prototipagem de telas.',
  },
  {
    id: 'acessibilidade',
    label: 'Acessibilidade',
    description: 'Como projetar e testar para quem usa teclado, leitor de tela e zoom.',
  },
  {
    id: 'programacao-web',
    label: 'Programação web',
    description: 'HTML, CSS, TypeScript e as práticas de quem entrega interface.',
  },
  {
    id: 'educacao',
    label: 'Educação',
    description: 'Ensinar e aprender tecnologia sem decorar receitas.',
  },
  {
    id: 'carreira',
    label: 'Carreira',
    description: 'Feedback, crescimento e as conversas difíceis do trabalho.',
  },
  {
    id: 'escrita',
    label: 'Escrita',
    description: 'Hábitos e técnicas para escrever com clareza.',
  },
];

/** Autoria de demonstração: quatro pessoas fictícias. */
export const ublAuthors: UblAuthor[] = [
  {
    id: 'marina-azevedo',
    name: 'Marina Azevedo',
    handle: '@marinaazevedo',
    role: 'Designer de produto sênior',
    bio: 'Desenha interfaces há doze anos e hoje lidera o sistema de design de uma plataforma de ensino. Escreve sobre estrutura, cor e o que se aprende testando com gente de verdade.',
    avatarSrc: retrato('01'),
    followers: 4820,
  },
  {
    id: 'caio-menezes',
    name: 'Caio Menezes',
    handle: '@caiomenezes',
    role: 'Engenheiro de front-end',
    bio: 'Constrói bibliotecas de componentes e revisa mais código do que escreve. Gosta de testes que contam uma história e de commits que dá para ler daqui a um ano.',
    avatarSrc: retrato('02'),
    followers: 3150,
  },
  {
    id: 'renata-prado',
    name: 'Renata Prado',
    handle: '@renataprado',
    role: 'Pesquisadora em acessibilidade',
    bio: 'Estuda como pessoas com diferentes deficiências usam a web e transforma o que observa em critérios de projeto. Acredita que acessibilidade se prova na prática, não no relatório.',
    avatarSrc: retrato('03'),
    followers: 2760,
  },
  {
    id: 'otavio-lins',
    name: 'Otávio Lins',
    handle: '@otaviolins',
    role: 'Professor e editor',
    bio: 'Dá aulas de programação para adolescentes e edita o Caderno Aberto nas horas vagas. Defende que escrever é a melhor forma de descobrir o que ainda não se entendeu.',
    avatarSrc: retrato('04'),
    followers: 1890,
  },
];

/** Os doze posts, o destaque primeiro e os demais da publicação mais recente à mais antiga. */
export const ublPosts: UblPost[] = [
  {
    id: 'foco-visivel',
    slug: 'foco-visivel-o-detalhe-que-decide',
    title: 'Foco visível: o detalhe que decide se o teclado funciona',
    subtitle: 'Um contorno bem desenhado leva quem navega sem mouse de um controle ao outro sem se perder.',
    summary:
      'Como projetar, implementar e testar indicadores de foco que passam no contraste e acompanham qualquer tema.',
    authorId: 'renata-prado',
    topicIds: ['acessibilidade', 'programacao-web'],
    seriesId: 'acessibilidade-na-pratica',
    seriesPart: 3,
    publishedAt: '2026-09-29T09:00:00-03:00',
    updatedAt: '2026-09-29T16:20:00-03:00',
    readingMinutes: 4,
    coverSrc: capa('08'),
    coverAlt: 'Teclado visto de cima, com uma tecla em destaque cercada por um contorno roxo espesso',
    featured: true,
    likes: 412,
    views: 9640,
    body: [
      p(
        'Abra qualquer site que você usa todo dia e aperte a tecla Tab. Se, depois de três ou quatro toques, você não sabe mais onde está, a página tem um problema de foco visível. Para quem navega só com o teclado, e isso inclui muita gente que não tem nenhuma deficiência, é como andar numa sala escura sem poder acender a luz.'
      ),
      p(
        'Este é o terceiro texto da série sobre acessibilidade na prática. Nos dois primeiros falamos de contraste e de formulários; aqui o assunto é o pequeno anel que mostra qual controle está ativo. Ele é fácil de desenhar, fácil de quebrar e, quando funciona, ninguém percebe que existe.'
      ),
      h2('Por que o foco precisa aparecer'),
      p(
        'O foco é a posição do teclado na página. Cada Tab avança para o próximo controle, e Enter ou Espaço ativa o que está sob o foco. Sem um indicador, a pessoa precisa adivinhar onde está, e adivinhar errado significa apagar um campo, enviar um formulário ou fechar um diálogo sem querer.'
      ),
      callout(
        'info',
        'Quem depende do foco',
        'Usuários de leitor de tela, de teclado adaptado, de controle por voz e de comutadores dependem dele. Também dependem quem está com a mão machucada, quem usa um notebook sem mouse e quem simplesmente prefere o teclado para ir mais rápido.'
      ),
      h2('O contorno que sobrevive a qualquer fundo'),
      p(
        'O navegador já desenha um contorno padrão, mas ele costuma ser fino e some em certos fundos. Um bom indicador tem espessura de pelo menos dois pixels, afastamento do elemento e contraste de 3:1 contra as cores vizinhas. Use o seletor focus-visible para que o anel apareça no teclado e não incomode quem clica com o mouse.'
      ),
      {
        type: 'code',
        language: 'css',
        filename: 'foco.css',
        highlightLines: [2, 3, 4],
        code: `:where(a, button, input, select, textarea, [tabindex]):focus-visible {
  outline: 3px solid var(--cor-foco);
  outline-offset: 2px;
  border-radius: 4px;
}

@media (forced-colors: active) {
  :where(a, button):focus-visible {
    outline-color: Highlight;
  }
}`,
      },
      callout(
        'tip',
        'Um anel, vários fundos',
        'Se o mesmo componente aparece sobre claro e sobre escuro, defina a cor do foco por tema e meça os dois. Um roxo que passa de 3:1 sobre branco pode cair para 1,5:1 sobre um cartão escuro.'
      ),
      ul(
        'Espessura mínima de dois pixels; três é mais seguro em telas de alta densidade.',
        'Afastamento de dois pixels entre o elemento e o contorno, para que o anel não se funda à borda.',
        'Contraste de 3:1 contra o fundo e contra o próprio componente.',
        'Nenhuma mudança de tamanho ou de posição quando o foco chega: o anel não pode empurrar o layout.'
      ),
      figure(
        '08',
        'Teclado com uma tecla cercada por contorno roxo espesso sobre fundo lavanda',
        'O anel de foco tem espessura, afastamento e cor próprios: não depende do contorno do navegador.'
      ),
      h3('Foco em componentes compostos'),
      p(
        'Diálogos, menus e gavetas movem o foco para dentro quando abrem e precisam devolvê-lo ao controle que os chamou quando fecham. Sem isso, quem usa teclado volta ao topo da página e perde o lugar onde estava lendo.'
      ),
      {
        type: 'code',
        language: 'typescript',
        filename: 'abrirComFoco.ts',
        highlightLines: [2, 6],
        code: `export function abrirComFoco(painel: HTMLElement) {
  const anterior = document.activeElement as HTMLElement | null;
  painel.focus();

  return function fechar() {
    anterior?.focus({ preventScroll: true });
  };
}`,
      },
      callout(
        'warning',
        'Nunca remova o contorno sem substituir',
        'Escrever outline: none em um reset global é o erro mais comum e o mais caro. Se você retirar o contorno do navegador, o seu próprio indicador precisa estar no lugar antes de o código ir para produção.'
      ),
      h2('Como testar em dois minutos'),
      ol(
        'Largue o mouse e navegue a página inteira apenas com Tab e Shift+Tab.',
        'Confira se a ordem do foco segue a ordem visual e se nenhum controle é pulado.',
        'Abra e feche um diálogo: o foco entra nele e volta ao botão de origem?',
        'Repita nos dois temas e com o zoom em 200%.'
      ),
      quote(
        'Acessibilidade não é um recurso que se acrescenta no fim; é a diferença entre um produto que funciona para todo mundo e um que funciona para quem se parece com quem o construiu.',
        'Renata Prado'
      ),
      p(
        'O foco visível custa algumas linhas de CSS e uma conversa com o time de design sobre cor e espessura. Em troca, ele devolve autonomia a quem mais depende do teclado e deixa a página mais fácil de usar para todo mundo. No próximo texto da série, vamos juntar os três temas em uma lista de verificação para revisar uma tela antes de publicar.'
      ),
    ],
  },
  {
    id: 'metricas-de-leitura',
    slug: 'medir-o-que-importa-metricas-de-leitura',
    title: 'Medir o que importa: métricas de leitura para um blog',
    subtitle: 'Visitas contam quem chegou; o tempo de leitura e a rolagem contam quem ficou.',
    summary:
      'Quais números ajudam a entender se um texto longo está sendo lido e como coletá-los sem vigiar ninguém.',
    authorId: 'caio-menezes',
    topicIds: ['programacao-web', 'escrita'],
    publishedAt: '2026-09-26T11:30:00-03:00',
    readingMinutes: 2,
    coverSrc: capa('12'),
    coverAlt: 'Gráfico com barras roxas e uma linha azul de tendência sobre uma grade clara',
    likes: 187,
    views: 4210,
    body: [
      p(
        'Todo blog novo cai na mesma tentação: abrir o painel de visitas toda manhã e comemorar ou se angustiar com um número que quase não diz nada. Uma visita só informa que alguém abriu a página, não se leu o primeiro parágrafo ou o texto inteiro.'
      ),
      h2('Três números que contam uma história'),
      ul(
        'Tempo de leitura efetivo: quantos minutos a aba ficou visível e ativa, e não apenas aberta.',
        'Profundidade de rolagem: até que ponto do texto as pessoas chegam, em faixas de 25%.',
        'Retorno: quantas pessoas voltam em até trinta dias para ler outro post.'
      ),
      p(
        'Compare o tempo efetivo com o tempo de leitura estimado do próprio texto. Se um post de oito minutos é lido, em média, em noventa segundos, o título prometeu mais do que o primeiro trecho entregou.'
      ),
      callout(
        'tip',
        'Meça o texto, não a pessoa',
        'Agregue os dados por post e por faixa de rolagem, sem identificar quem leu. Você aprende o mesmo sobre o texto e não precisa guardar nada sobre ninguém.'
      ),
      h2('Como coletar sem vigiar'),
      p(
        'Dois eventos bastam: um quando a pessoa passa de cada faixa de rolagem e outro quando ela sai da página. Envie-os agrupados, sem cookie de identificação, e descarte o endereço de rede antes de gravar.'
      ),
      {
        type: 'code',
        language: 'typescript',
        filename: 'rolagem.ts',
        highlightLines: [3, 4],
        code: `const faixas = [25, 50, 75, 100];
const vistas = new Set<number>();

export function registrarRolagem(posicao: number, enviar: (faixa: number) => void) {
  for (const faixa of faixas) {
    if (posicao >= faixa && !vistas.has(faixa)) {
      vistas.add(faixa);
      enviar(faixa);
    }
  }
}`,
      },
      p(
        'Com duas semanas de dados você já enxerga padrões úteis: onde os textos perdem as pessoas, quais títulos atraem sem entregar e que posts continuam sendo lidos meses depois. Esses são os números que orientam o que escrever em seguida.'
      ),
    ],
  },
  {
    id: 'revisao-de-codigo',
    slug: 'revisao-de-codigo-que-ensina',
    title: 'Revisão de código que ensina, e não que apenas aprova',
    subtitle: 'Bons comentários explicam o porquê, oferecem uma saída e deixam a decisão com quem escreveu.',
    summary:
      'Um roteiro para revisar código com foco em aprendizado: o que olhar, como comentar e quando apenas aprovar.',
    authorId: 'caio-menezes',
    topicIds: ['programacao-web', 'carreira'],
    publishedAt: '2026-09-24T14:00:00-03:00',
    readingMinutes: 2,
    coverSrc: capa('03'),
    coverAlt: 'Editor de código escuro com linhas coloridas e dois trechos destacados em roxo',
    likes: 264,
    views: 5380,
    body: [
      p(
        'A revisão de código costuma ser tratada como um portão: ou passa, ou volta. Quando funciona assim, quem escreve aprende a evitar o revisor em vez de aprender com ele, e quem revisa vira o gargalo do time.'
      ),
      h2('O que olhar primeiro'),
      ol(
        'O problema: a mudança resolve o que a descrição diz que resolve?',
        'O comportamento: há testes que provariam o contrário se algo quebrasse?',
        'A leitura: alguém novo no time entenderia este trecho em um minuto?',
        'Os detalhes: nomes, formatação e estilo, de preferência já cobertos por ferramenta.'
      ),
      p(
        'Nessa ordem, porque um nome ruim se corrige em segundos, mas uma solução para o problema errado custa dias. Deixe a formatação para o linter e guarde a atenção humana para o que só uma pessoa enxerga.'
      ),
      h2('Como escrever o comentário'),
      p(
        'Um comentário útil tem três partes: o que você viu, por que importa e uma sugestão. Compare "isso está confuso" com "essa função mistura leitura e gravação; separar as duas facilitaria o teste, algo como lerPedido e salvarPedido".'
      ),
      callout(
        'tip',
        'Pergunte antes de afirmar',
        'Quando não tiver certeza, faça uma pergunta: "o que acontece se a lista vier vazia aqui?". Se a resposta for boa, você aprendeu; se não for, quem escreveu descobre sozinho, e isso fica na memória.'
      ),
      quote('Revise o código como gostaria que revisassem o seu: com curiosidade e sem pressa de ter razão.'),
      p(
        'E quando está tudo certo, apenas aprove. Um "ótimo teste de borda" custa cinco segundos e ensina a quem escreveu o que repetir da próxima vez.'
      ),
    ],
  },
  {
    id: 'prototipo-clicavel',
    slug: 'prototipo-clicavel-para-testar-com-gente',
    title: 'Protótipo clicável: teste com gente antes de programar',
    subtitle: 'Um protótipo simples, em celular e tablet, descobre em uma tarde o que semanas de reunião não mostram.',
    summary:
      'Como montar um protótipo navegável, escolher as pessoas certas e transformar uma sessão de teste em decisões de projeto.',
    authorId: 'marina-azevedo',
    topicIds: ['design-de-interfaces'],
    seriesId: 'do-rascunho-ao-prototipo',
    seriesPart: 3,
    publishedAt: '2026-09-23T10:00:00-03:00',
    readingMinutes: 2,
    coverSrc: capa('10'),
    coverAlt: 'Celular e tablet lado a lado, ambos mostrando a mesma tela com cartões e botões roxos',
    likes: 231,
    views: 4870,
    body: [
      p(
        'Chegamos ao último passo da nossa série: pegar a estrutura dos wireframes e o sistema de cores e tipografia e transformá-los em algo em que uma pessoa possa clicar. O objetivo não é parecer pronto, é permitir uma conversa sobre algo concreto.'
      ),
      h2('O mínimo para um bom teste'),
      p(
        'Um protótipo de teste precisa de três coisas: um caminho principal que funcione do início ao fim, dados que pareçam reais e telas que caibam no aparelho em que a pessoa vai usar. O resto pode ser imagem estática.'
      ),
      ul(
        'Prototipe no tamanho do celular e do tablet que as pessoas realmente têm.',
        'Use textos e nomes reais; "Lorem ipsum" esconde problemas de leitura.',
        'Deixe os atalhos fora: o teste é para ver se o caminho principal se descobre sozinho.'
      ),
      figure(
        '10',
        'Dois aparelhos, um celular e um tablet, exibindo a mesma tela em proporções diferentes',
        'A mesma tela em duas proporções: o protótipo precisa ser testado nas duas.'
      ),
      h2('Cinco pessoas bastam, se forem as certas'),
      p(
        'Cinco sessões revelam a maior parte dos problemas graves de uma tela. O que importa é que as pessoas se pareçam com quem vai usar o produto de verdade, e não com quem trabalha na empresa.'
      ),
      callout(
        'info',
        'Peça para pensar em voz alta',
        'Diga à pessoa que o teste avalia a tela, e não ela. Peça que descreva o que espera ver antes de cada toque; é nessa distância entre o esperado e o encontrado que moram as melhorias.'
      ),
      p(
        'Ao fim de cada sessão, anote os três momentos em que a pessoa hesitou. Quando dois ou mais participantes hesitam no mesmo ponto, você tem a próxima tarefa de design.'
      ),
    ],
  },
  {
    id: 'escrever-todo-dia',
    slug: 'escrever-todo-dia-sem-esperar-inspiracao',
    title: 'Escrever todo dia sem esperar a inspiração chegar',
    subtitle: 'Uma rotina pequena, com horário e meta ridiculamente baixa, vence a espera pelo momento certo.',
    summary:
      'Um método de quinze minutos diários para criar o hábito de escrever, com regras simples e nenhuma cobrança de qualidade.',
    authorId: 'otavio-lins',
    topicIds: ['escrita', 'carreira'],
    publishedAt: '2026-09-20T08:00:00-03:00',
    readingMinutes: 2,
    coverSrc: capa('06'),
    coverAlt: 'Mesa de escrita vista de cima, com cadernos abertos, uma caneta roxa e uma xícara',
    likes: 156,
    views: 3320,
    body: [
      p(
        'Quase todo mundo que escreve já ouviu o conselho de escrever todos os dias, e quase todo mundo já desistiu dele na segunda semana. O problema raramente é falta de disciplina: é a meta grande demais para um dia comum.'
      ),
      h2('A regra dos quinze minutos'),
      p(
        'Marque quinze minutos, sempre no mesmo horário, e escreva sem parar. Não importa se o resultado é bom, importa que a mão se mova. Se a ideia acabar antes do tempo, escreva sobre o fato de que a ideia acabou.'
      ),
      ol(
        'Escolha um horário que já exista na sua rotina, como o café da manhã.',
        'Use um caderno ou um arquivo que fique sempre aberto, sem pastas nem formatação.',
        'Escreva por quinze minutos; quando o relógio tocar, pare, mesmo no meio da frase.',
        'Não releia durante a semana. Edite só aos domingos.'
      ),
      callout(
        'tip',
        'Pare no meio',
        'Parar no meio de uma frase deixa um gancho para o dia seguinte. É muito mais fácil recomeçar de uma frase pela metade do que de uma página em branco.'
      ),
      quote('A inspiração existe, mas precisa encontrar você trabalhando.', 'Otávio Lins'),
      h2('O que fazer com o que sobra'),
      p(
        'Depois de algumas semanas você terá páginas de rascunho. Aos domingos, releia e marque um parágrafo que valha a pena guardar. Em um mês, esses parágrafos formam um texto; em um ano, formam um blog.'
      ),
    ],
  },
  {
    id: 'formularios-que-explicam-o-erro',
    slug: 'formularios-que-explicam-o-proprio-erro',
    title: 'Formulários que explicam o próprio erro',
    subtitle: 'Uma mensagem de erro boa diz o que aconteceu, onde e como corrigir, e chega a quem não enxerga a tela.',
    summary:
      'Rótulos, dicas e mensagens de erro acessíveis: como ligar cada campo ao seu aviso e anunciá-lo no momento certo.',
    authorId: 'renata-prado',
    topicIds: ['acessibilidade', 'design-de-interfaces'],
    seriesId: 'acessibilidade-na-pratica',
    seriesPart: 2,
    publishedAt: '2026-09-16T09:30:00-03:00',
    readingMinutes: 2,
    coverSrc: capa('09'),
    coverAlt: 'Formulário com três campos de texto, um deles com borda vermelha e uma mensagem de erro abaixo',
    likes: 298,
    views: 6120,
    body: [
      p(
        'Um formulário é uma conversa: a página pergunta, a pessoa responde e, quando algo não bate, a página precisa explicar o motivo. A maior parte dos formulários falha nessa última parte, com um aviso vermelho genérico no topo e nenhuma pista de onde olhar.'
      ),
      h2('Todo campo precisa de um nome'),
      p(
        'O rótulo visível precisa estar ligado ao campo, para que o leitor de tela o anuncie e para que clicar no texto leve o foco ao campo. Um placeholder não substitui o rótulo: ele some assim que a pessoa começa a digitar.'
      ),
      {
        type: 'code',
        language: 'html',
        filename: 'campo.html',
        highlightLines: [1, 2, 3],
        code: `<label for="email">E-mail</label>
<input id="email" type="email" aria-describedby="email-dica email-erro" aria-invalid="true" />
<p id="email-dica">Usaremos só para enviar o recibo.</p>
<p id="email-erro" role="alert">Informe um e-mail válido, como nome@exemplo.com.</p>`,
      },
      h2('Uma boa mensagem de erro'),
      ul(
        'Diz o que aconteceu: "O e-mail está sem o arroba".',
        'Diz como corrigir: "Inclua o arroba e o domínio, como nome@exemplo.com".',
        'Fica ao lado do campo, e não só no topo da página.',
        'Não depende só da cor: leva um ícone e um texto.'
      ),
      callout(
        'warning',
        'Não valide a cada tecla',
        'Mostrar o erro enquanto a pessoa ainda digita é como ser interrompido no meio da frase. Valide quando o campo perde o foco ou quando o formulário é enviado, e leve o foco ao primeiro campo com problema.'
      ),
      p(
        'Com rótulos ligados, dicas associadas e erros anunciados, o mesmo formulário passa a servir a quem usa mouse, teclado e leitor de tela, sem precisar de uma versão à parte.'
      ),
    ],
  },
  {
    id: 'pedir-feedback',
    slug: 'como-pedir-feedback-e-crescer',
    title: 'Como pedir feedback e crescer sem esperar a promoção',
    subtitle: 'Perguntas específicas rendem respostas úteis; perguntas gerais rendem elogios.',
    summary:
      'Um roteiro para pedir retorno a colegas e a lideranças, ouvir sem se defender e transformar o que ouviu em um plano.',
    authorId: 'marina-azevedo',
    topicIds: ['carreira'],
    publishedAt: '2026-09-12T16:00:00-03:00',
    readingMinutes: 2,
    coverSrc: capa('05'),
    coverAlt: 'Escada de degraus roxos subindo até uma bandeira pequena, com uma pessoa estilizada no meio',
    likes: 342,
    views: 7015,
    body: [
      p(
        'Esperar a avaliação anual para saber como está indo é como dirigir um ano inteiro sem olhar o painel. O feedback frequente, pedido por você, é a forma mais barata de corrigir a rota antes que ela custe caro.'
      ),
      h2('Pergunte pelo específico'),
      p(
        '"Como estou indo?" é uma pergunta que quase todo mundo responde com "muito bem". Prefira perguntas que tenham uma resposta concreta, ligadas a um trabalho que a pessoa acabou de ver.'
      ),
      ul(
        'Na apresentação de hoje, que parte ficou menos clara para você?',
        'Se eu pudesse melhorar uma coisa na forma como documento as decisões, qual seria?',
        'Houve algum momento em que a reunião poderia ter sido mais curta?'
      ),
      h2('Ouça sem se defender'),
      p(
        'Quando o retorno vier, a tentação é explicar por que as coisas foram do jeito que foram. Resista. Anote, agradeça e faça uma pergunta de esclarecimento se precisar; a explicação pode esperar, o aprendizado não.'
      ),
      callout(
        'tip',
        'Feche o ciclo',
        'Duas semanas depois, volte a quem deu o retorno e conte o que mudou. Quem vê o próprio conselho virar prática passa a dar conselhos melhores e mais frequentes.'
      ),
      quote('Feedback é um presente, mas só vira presente quando alguém abre a embalagem.'),
      p(
        'Escolha um ponto por mês, transforme-o em uma ação pequena e acompanhe o resultado. Em um ano você terá doze melhorias concretas, e a promoção vira consequência, não objetivo.'
      ),
    ],
  },
  {
    id: 'ensinar-programacao',
    slug: 'ensinar-programacao-sem-comecar-pela-sintaxe',
    title: 'Ensinar programação sem começar pela sintaxe',
    subtitle: 'Antes de decorar palavras reservadas, a turma precisa ter um problema que valha a pena resolver.',
    summary:
      'Uma sequência de aulas para adolescentes que parte de perguntas e de projetos pequenos, deixando a sintaxe para quando ela faz falta.',
    authorId: 'otavio-lins',
    topicIds: ['educacao', 'programacao-web'],
    publishedAt: '2026-09-10T10:00:00-03:00',
    readingMinutes: 2,
    coverSrc: capa('04'),
    coverAlt: 'Sala de aula com lousa verde, carteiras em fileiras e um quadro com setas e caixas desenhadas',
    likes: 205,
    views: 4460,
    body: [
      p(
        'A aula típica de programação começa com uma lista: variáveis, tipos, condicionais, laços. Quando chega o primeiro exercício interessante, metade da turma já perdeu o interesse. O que costuma faltar não é inteligência, é motivo.'
      ),
      h2('Comece por um problema pequeno'),
      p(
        'Em vez de apresentar a sintaxe, apresente um incômodo: "como saber quantos colegas já responderam à enquete?". A turma propõe soluções em papel, discute e só então descobre que precisa de uma lista e de um contador.'
      ),
      ol(
        'Apresente um problema que a turma sinta como seu.',
        'Peça que descrevam a solução em português, passo a passo.',
        'Só então mostre como o computador entenderia aqueles passos.',
        'Deixe errarem e peça que expliquem o que o erro significa.'
      ),
      figure(
        '04',
        'Lousa de sala de aula com um fluxograma de caixas e setas coloridas',
        'O fluxograma em papel vem antes do código: a turma entende o raciocínio antes da sintaxe.'
      ),
      h2('O erro como material de aula'),
      callout(
        'info',
        'Mensagens de erro são texto',
        'Projete as mensagens de erro na lousa e leia-as em voz alta com a turma. Quem aprende a ler o erro perde o medo dele, e a maior parte da programação é exatamente isso: ler o que a máquina tem a dizer.'
      ),
      p(
        'Ao fim do bimestre, os alunos que começaram por problemas escrevem mais código, perguntam mais e lembram melhor da sintaxe, porque ela chegou quando tinha utilidade.'
      ),
      p(
        'Isso não quer dizer abandonar o rigor. A sintaxe continua sendo cobrada, mas em pequenas doses e no momento em que a turma já sabe por que precisa dela. Uma lista, por exemplo, só é apresentada depois que alguém tenta guardar trinta nomes em trinta variáveis e percebe que há um jeito melhor.'
      ),
    ],
  },
  {
    id: 'cores-e-tipografia',
    slug: 'cores-e-tipografia-a-base-do-sistema',
    title: 'Cores e tipografia: a base de um sistema de design',
    subtitle: 'Poucas escolhas, nomeadas e medidas, fazem mais pela consistência do que uma biblioteca inteira de componentes.',
    summary:
      'Como montar uma paleta com degraus nomeados e uma escala tipográfica pequena, e por que medir o contraste desde o começo.',
    authorId: 'marina-azevedo',
    topicIds: ['design-de-interfaces'],
    seriesId: 'do-rascunho-ao-prototipo',
    seriesPart: 2,
    publishedAt: '2026-09-09T09:00:00-03:00',
    readingMinutes: 2,
    coverSrc: capa('07'),
    coverAlt: 'Paleta de amostras de cor em tons de roxo e uma coluna de letras em tamanhos crescentes',
    likes: 276,
    views: 5790,
    body: [
      p(
        'Com a estrutura dos wireframes aprovada, é hora de dar cor e voz às telas. A tentação é abrir um editor e escolher "um roxo bonito", mas um sistema se constrói com escolhas que se repetem e podem ser explicadas.'
      ),
      h2('Uma paleta em degraus'),
      p(
        'Parta de uma cor de marca e derive dela uma escala de onze degraus, do mais claro ao mais escuro, com nomes numéricos (50, 100, 200 e assim por diante). Os componentes passam a citar o degrau, nunca o valor, e trocar a marca significa trocar a escala.'
      ),
      ul(
        'Degraus claros (50 a 200): superfícies e fundos suaves.',
        'Degraus médios (300 a 600): acentos, ícones e estados.',
        'Degraus escuros (700 a 950): texto, contornos e superfícies no tema escuro.'
      ),
      callout(
        'warning',
        'Meça antes de usar',
        'Um degrau médio costuma ser bonito e perigoso: ele quase nunca passa de 4,5:1 como texto sobre branco. Calcule o contraste de cada par que você pretende usar e registre o resultado ao lado do nome do degrau.'
      ),
      h2('Uma escala tipográfica curta'),
      p(
        'Dez tamanhos bastam para quase tudo: um de título grande, três de subtítulo, dois de corpo, um de legenda e o resto de apoio. Cada tamanho tem sua altura de linha e seu peso, e nenhum componente inventa um corpo fora da escala.'
      ),
      figure(
        '07',
        'Amostras de cor em degradê de roxo ao lado de letras em tamanhos crescentes',
        'A escala de cor e a escala tipográfica caminham juntas: cada uma é pequena e tem nomes.'
      ),
      p(
        'Com cor e tipografia nomeadas, o protótipo do próximo texto passa a ser montado em minutos, e qualquer mudança de marca vira uma edição de tabela.'
      ),
    ],
  },
  {
    id: 'caderno-publico',
    slug: 'por-que-manter-um-caderno-publico',
    title: 'Por que manter um caderno de notas público',
    subtitle: 'Escrever em público obriga a organizar o que se sabe, e é uma forma generosa de aprender.',
    summary:
      'Os benefícios de publicar notas de estudo, mesmo imperfeitas, e como começar sem medo de errar em voz alta.',
    authorId: 'otavio-lins',
    topicIds: ['escrita', 'educacao'],
    publishedAt: '2026-09-05T12:00:00-03:00',
    readingMinutes: 2,
    coverSrc: capa('11'),
    coverAlt: 'Estante de madeira clara com cadernos de capas roxas, azuis e lavanda enfileirados',
    likes: 119,
    views: 2680,
    body: [
      p(
        'Todo mundo que estuda guarda anotações em algum lugar: no caderno, em um arquivo, em abas esquecidas no navegador. Poucas dessas notas voltam a ser lidas. Publicar parte delas muda a relação com o que se aprende.'
      ),
      h2('Escrever para alguém'),
      p(
        'Quando você escreve para si mesmo, pula passos que acha óbvios. Quando escreve para outra pessoa, precisa explicá-los, e é na hora de explicar que descobre o que ainda não entendeu bem.'
      ),
      ul(
        'Notas públicas viram um índice pessoal: você encontra o que já resolveu.',
        'Leitores corrigem erros e sugerem caminhos que você não conhecia.',
        'O arquivo vira um retrato do seu aprendizado, útil em qualquer conversa de carreira.'
      ),
      quote('Se você não consegue explicar por escrito, provavelmente ainda não entendeu por inteiro.'),
      h2('Comece pequeno e imperfeito'),
      p(
        'Publique uma nota por semana, com título descritivo e cinco ou seis parágrafos. Registre a data e deixe claro que é um texto de estudo. Corrija quando alguém apontar um erro e agradeça: é o melhor sinal de que alguém leu.'
      ),
      p(
        'Não espere ter um site pronto: um blog simples, com uma página por nota e uma lista cronológica, já cumpre o papel. O que sustenta o hábito não é a ferramenta, é o compromisso pequeno e visível de publicar mesmo quando o texto ainda parece incompleto.'
      ),
      callout(
        'tip',
        'Uma regra de ouro',
        'Antes de publicar, pergunte-se: isto ajudaria quem estava no meu lugar há seis meses? Se a resposta for sim, está pronto, mesmo que não esteja perfeito.'
      ),
    ],
  },
  {
    id: 'contraste-sem-adivinhacao',
    slug: 'contraste-de-cor-sem-adivinhacao',
    title: 'Contraste de cor sem adivinhação',
    subtitle: 'Medir o contraste leva um minuto e evita que o texto mais importante da tela fique ilegível.',
    summary:
      'Como calcular a razão de contraste, quais mínimos valem para texto e para componentes e como registrar os pares aprovados.',
    authorId: 'renata-prado',
    topicIds: ['acessibilidade', 'design-de-interfaces'],
    seriesId: 'acessibilidade-na-pratica',
    seriesPart: 1,
    publishedAt: '2026-09-02T09:00:00-03:00',
    readingMinutes: 2,
    coverSrc: capa('02'),
    coverAlt: 'Duas colunas de amostras de cor lado a lado, uma clara e outra escura, com letras sobrepostas',
    likes: 389,
    views: 8240,
    body: [
      p(
        'Abra uma tela qualquer, diminua o brilho do monitor e olhe de longe. O que sumiu primeiro? Provavelmente um texto cinza sobre um fundo cinza um pouco mais claro. É o problema mais comum de legibilidade, e o mais fácil de resolver com um número.'
      ),
      h2('A razão de contraste'),
      p(
        'O contraste compara a luminância de duas cores e resulta em um número de 1:1 (idênticas) a 21:1 (preto sobre branco). Existem calculadoras gratuitas e extensões de navegador que fazem a conta; o que importa é medir cada par que você realmente usa.'
      ),
      ul(
        'Texto normal: pelo menos 4,5:1 sobre o fundo.',
        'Texto grande (a partir de 24px, ou 19px em negrito): pelo menos 3:1.',
        'Componentes e gráficos, como contornos de campo e ícones: pelo menos 3:1.'
      ),
      callout(
        'info',
        'O que não precisa passar',
        'Texto desabilitado e elementos puramente decorativos são isentos. Mas não use a isenção como desculpa: um botão desabilitado ilegível deixa a pessoa sem saber que opção existe.'
      ),
      figure(
        '02',
        'Amostras de cor lado a lado mostrando letras claras e escuras sobre fundos de roxo diferentes',
        'Os mesmos fundos com texto claro e escuro: apenas um dos pares passa de 4,5:1.'
      ),
      h2('Registre os pares aprovados'),
      p(
        'Em vez de medir de novo a cada tela, mantenha uma tabela de pares aprovados, com o degrau do texto, o degrau do fundo e a razão medida. Quando alguém propuser uma combinação nova, a tabela responde em segundos.'
      ),
      p(
        'Faça isso para os dois temas, claro e escuro. Um roxo que passa com folga sobre o branco pode ficar abaixo do mínimo sobre um fundo escuro, e só a medição mostra.'
      ),
    ],
  },
  {
    id: 'wireframes-estrutura-antes-da-cor',
    slug: 'wireframes-pense-na-estrutura-antes-da-cor',
    title: 'Wireframes: pense na estrutura antes da cor',
    subtitle: 'Cinza, retângulos e texto de verdade: a forma mais rápida de discutir o que a tela precisa fazer.',
    summary:
      'Como rascunhar telas em baixa fidelidade, o que decidir em cada etapa e por que adiar a cor ajuda o time a conversar sobre o que importa.',
    authorId: 'marina-azevedo',
    topicIds: ['design-de-interfaces'],
    seriesId: 'do-rascunho-ao-prototipo',
    seriesPart: 1,
    publishedAt: '2026-08-26T09:00:00-03:00',
    readingMinutes: 2,
    coverSrc: capa('01'),
    coverAlt: 'Três wireframes de tela em cinza e lavanda, com cabeçalho, cartões, campo de busca e botões em contorno',
    featured: true,
    likes: 308,
    views: 6930,
    body: [
      p(
        'Toda tela começa como uma ideia vaga, e a tentação é abrir logo a ferramenta de design e começar a escolher cores. Esse caminho esconde o que realmente importa na primeira conversa: o que a pessoa precisa fazer aqui e em que ordem.'
      ),
      h2('O que um wireframe resolve'),
      p(
        'Um wireframe mostra a hierarquia de informações, o agrupamento dos elementos e o caminho principal da tela. Como não há cor nem fotografia, a discussão se concentra no que está no lugar errado ou faltando.'
      ),
      ul(
        'Qual é a ação principal da tela e onde ela está?',
        'O que precisa estar visível sem rolar e o que pode esperar?',
        'Como a tela se comporta em um celular, em um tablet e em um monitor?'
      ),
      figure(
        '01',
        'Wireframes em cinza e lavanda com cabeçalho, cartões, campo de busca e botões',
        'Três variações de uma mesma tela: a estrutura muda, a conversa sobre o que importa é a mesma.'
      ),
      h2('Use texto de verdade'),
      p(
        'Preencher o wireframe com "Lorem ipsum" faz todas as telas parecerem boas. Use títulos, nomes e números reais, inclusive os longos e os vazios: é neles que a estrutura quebra, e é melhor descobrir isso agora.'
      ),
      callout(
        'tip',
        'Três versões, em vinte minutos',
        'Rascunhe três variações antes de escolher uma. A primeira ideia costuma ser a mais óbvia, e a terceira, a que o time ainda não tinha considerado.'
      ),
      p(
        'Quando a estrutura estiver combinada, o próximo passo é dar a ela cor e tipografia. No próximo texto da série, vamos montar essa base de forma que qualquer mudança de marca seja uma edição de tabela.'
      ),
    ],
  },
];

/** As duas séries de três posts. */
export const ublSeries: UblSeries[] = [
  {
    id: 'do-rascunho-ao-prototipo',
    title: 'Do rascunho ao protótipo',
    description:
      'Três textos que levam uma tela da estrutura em cinza até um protótipo clicável testado com gente de verdade.',
    coverSrc: capa('01'),
    postIds: ['wireframes-estrutura-antes-da-cor', 'cores-e-tipografia', 'prototipo-clicavel'],
  },
  {
    id: 'acessibilidade-na-pratica',
    title: 'Acessibilidade na prática',
    description:
      'Contraste, formulários e foco visível: os três pontos que mais barram quem usa teclado, leitor de tela ou zoom.',
    coverSrc: capa('02'),
    postIds: ['contraste-sem-adivinhacao', 'formularios-que-explicam-o-erro', 'foco-visivel'],
  },
];

/**
 * Comentários de demonstração nos três primeiros posts, com respostas de um
 * nível (comentário e resposta). O comentário `c-foco-voce` é da pessoa que lê.
 */
export const ublComments: UblComment[] = [
  /* Foco visível */
  {
    id: 'c-foco-1',
    postId: 'foco-visivel',
    authorName: 'Beatriz Nogueira',
    avatarSrc: retrato('05'),
    text: 'Passei a testar toda tela nova com Tab antes de abrir o pull request. No primeiro dia achei quatro botões sem foco visível. Obrigada pelo roteiro!',
    createdAt: '2026-09-29T11:40:00-03:00',
    likes: 24,
  },
  {
    id: 'c-foco-2',
    postId: 'foco-visivel',
    authorName: 'Renata Prado',
    avatarSrc: retrato('03'),
    text: 'Que bom saber, Beatriz! Quatro em uma tela é bem comum. Vale incluir o teste no checklist do time para não depender da memória de ninguém.',
    createdAt: '2026-09-29T12:05:00-03:00',
    parentId: 'c-foco-1',
    likes: 9,
  },
  {
    id: 'c-foco-3',
    postId: 'foco-visivel',
    authorName: 'Davi Ferraz',
    text: 'No nosso sistema o foco é um token de cor por tema, mas no escuro ele ficava com 2,1:1 sobre os cartões. Só descobrimos medindo, como o texto sugere.',
    createdAt: '2026-09-29T14:12:00-03:00',
    likes: 17,
  },
  {
    id: 'c-foco-4',
    postId: 'foco-visivel',
    authorName: 'Caio Menezes',
    avatarSrc: retrato('02'),
    text: 'Davi, vale conferir também o anel sobre fundos com imagem. Se não houver como garantir 3:1, um anel de duas camadas, uma clara e uma escura, resolve em qualquer fundo.',
    createdAt: '2026-09-29T15:30:00-03:00',
    parentId: 'c-foco-3',
    likes: 12,
  },
  {
    id: 'c-foco-5',
    postId: 'foco-visivel',
    authorName: 'Lúcia Sampaio',
    text: 'Uma dúvida: o focus-visible funciona bem em todos os navegadores que a gente precisa suportar? Tenho um cliente que ainda usa versões antigas.',
    createdAt: '2026-09-29T18:45:00-03:00',
    likes: 5,
  },
  {
    id: 'c-foco-6',
    postId: 'foco-visivel',
    authorName: 'Renata Prado',
    avatarSrc: retrato('03'),
    text: 'Hoje todos os navegadores atuais suportam. Para versões antigas, declare o estilo em :focus e o desfaça em :focus:not(:focus-visible); assim ninguém fica sem indicador.',
    createdAt: '2026-09-29T19:10:00-03:00',
    parentId: 'c-foco-5',
    likes: 14,
  },
  {
    id: 'c-foco-voce',
    postId: 'foco-visivel',
    authorName: 'Você',
    text: 'Vou levar a lista de verificação para a retrospectiva de amanhã. Ficou muito clara.',
    createdAt: '2026-09-30T08:20:00-03:00',
    likes: 2,
    mine: true,
  },
  {
    id: 'c-foco-7',
    postId: 'foco-visivel',
    authorName: 'Marcos Tavares',
    text: 'Excelente. Faltou só falar de foco em componentes dentro de iframes, que sempre dão dor de cabeça.',
    createdAt: '2026-09-30T09:35:00-03:00',
    likes: 3,
  },

  /* Métricas de leitura */
  {
    id: 'c-metricas-1',
    postId: 'metricas-de-leitura',
    authorName: 'Paula Rezende',
    avatarSrc: retrato('06'),
    text: 'Agregar por faixa de rolagem sem identificar ninguém é uma boa forma de respeitar a privacidade. Vou adotar no blog da escola.',
    createdAt: '2026-09-26T15:00:00-03:00',
    likes: 11,
  },
  {
    id: 'c-metricas-2',
    postId: 'metricas-de-leitura',
    authorName: 'Caio Menezes',
    avatarSrc: retrato('02'),
    text: 'Obrigado, Paula! Se quiser, posso compartilhar o esquema de agregação diária que usamos aqui.',
    createdAt: '2026-09-26T16:20:00-03:00',
    parentId: 'c-metricas-1',
    likes: 4,
  },
  {
    id: 'c-metricas-3',
    postId: 'metricas-de-leitura',
    authorName: 'Rafael Quintino',
    text: 'Como você trata a aba que fica aberta em segundo plano? O tempo efetivo conta só enquanto ela está visível?',
    createdAt: '2026-09-27T10:10:00-03:00',
    likes: 6,
  },

  /* Revisão de código */
  {
    id: 'c-revisao-1',
    postId: 'revisao-de-codigo',
    authorName: 'Helena Brandão',
    text: 'A ordem do que olhar primeiro mudou como eu reviso. Antes eu perdia meia hora em nome de variável e deixava passar o problema real.',
    createdAt: '2026-09-24T17:30:00-03:00',
    likes: 21,
  },
  {
    id: 'c-revisao-2',
    postId: 'revisao-de-codigo',
    authorName: 'Caio Menezes',
    avatarSrc: retrato('02'),
    text: 'É isso, Helena. Nome ruim a gente corrige em segundos; solução para o problema errado, só depois de dias.',
    createdAt: '2026-09-24T18:02:00-03:00',
    parentId: 'c-revisao-1',
    likes: 8,
  },
  {
    id: 'c-revisao-3',
    postId: 'revisao-de-codigo',
    authorName: 'Igor Salles',
    text: 'Gostei de "pergunte antes de afirmar". Já evitei duas discussões desnecessárias perguntando o que acontecia com a lista vazia.',
    createdAt: '2026-09-25T09:15:00-03:00',
    likes: 13,
  },
  {
    id: 'c-revisao-4',
    postId: 'revisao-de-codigo',
    authorName: 'Camila Duarte',
    avatarSrc: retrato('05'),
    text: 'Como vocês lidam com revisões de pessoas que acabaram de entrar no time? Sinto que preciso explicar mais.',
    createdAt: '2026-09-25T13:40:00-03:00',
    likes: 7,
  },
  {
    id: 'c-revisao-5',
    postId: 'revisao-de-codigo',
    authorName: 'Caio Menezes',
    avatarSrc: retrato('02'),
    text: 'Explicar mais é bem-vindo: quem acabou de chegar ainda não conhece as convenções. Um bom comentário com link para a documentação ensina e ainda poupa o próximo revisor.',
    createdAt: '2026-09-25T14:25:00-03:00',
    parentId: 'c-revisao-4',
    likes: 10,
  },
];

/** As doze capas, com a descrição de cada cena, na ordem dos arquivos. */
export const ublImages: { src: string; alt: string }[] = [
  { src: capa('01'), alt: 'Três wireframes de tela em cinza e lavanda, com cabeçalho, cartões, campo de busca e botões' },
  { src: capa('02'), alt: 'Duas colunas de amostras de cor lado a lado, uma clara e outra escura, com letras sobrepostas' },
  { src: capa('03'), alt: 'Editor de código escuro com linhas coloridas e dois trechos destacados em roxo' },
  { src: capa('04'), alt: 'Sala de aula com lousa verde, carteiras em fileiras e um fluxograma desenhado' },
  { src: capa('05'), alt: 'Escada de degraus roxos subindo até uma bandeira pequena, com uma figura no meio' },
  { src: capa('06'), alt: 'Mesa de escrita vista de cima, com cadernos abertos, uma caneta roxa e uma xícara' },
  { src: capa('07'), alt: 'Paleta de amostras de cor em tons de roxo e uma coluna de letras em tamanhos crescentes' },
  { src: capa('08'), alt: 'Teclado visto de cima, com uma tecla em destaque cercada por um contorno roxo espesso' },
  { src: capa('09'), alt: 'Formulário com três campos de texto, um deles com borda vermelha e uma mensagem de erro abaixo' },
  { src: capa('10'), alt: 'Celular e tablet lado a lado, ambos mostrando a mesma tela com cartões e botões roxos' },
  { src: capa('11'), alt: 'Estante de madeira clara com cadernos de capas roxas, azuis e lavanda enfileirados' },
  { src: capa('12'), alt: 'Gráfico com barras roxas e uma linha azul de tendência sobre uma grade clara' },
];

/** Os seis retratos quadrados (cinco rostos estilizados e uma imagem neutra com duas silhuetas). */
export const ublPortraits: string[] = ['01', '02', '03', '04', '05', '06'].map(retrato);
