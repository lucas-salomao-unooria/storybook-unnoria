/**
 * Conteúdo de demonstração das estórias do Unoojornal.
 *
 * Tudo aqui é fictício e autocontido: a publicação "Gazeta do Pátio", o
 * "Colégio Anísio Bastos", as pessoas e os acontecimentos não existem. As
 * imagens são ilustrações SVG originais de `public/unoojornal/`, geradas só com
 * a paleta da Plataforma Unooria (`scripts/gerar-ilustracoes-unoojornal.mjs`).
 * Nada é embutido no pacote: tudo entra nos componentes por prop (`src`,
 * `avatarSrc`, `imageSrc`).
 *
 * As datas giram em torno de um "agora" FIXO (`ujnDemoNow`), para que "Há 2
 * horas" e "Há 1 dia" sejam os mesmos em qualquer máquina e em qualquer dia em
 * que o teste rodar. Passe `now={ujnDemoNow}` a quem fala de datas.
 */

import type {
  UjnAgendaEvent,
  UjnArticle,
  UjnAuthor,
  UjnGalleryPhoto,
  UjnSection,
} from '../../src/unoojornal/edition';

/** Momento de referência das estórias: sexta-feira, 20/03/2026, 14:40 em São Paulo. */
export const ujnDemoNow = '2026-03-20T14:40:00-03:00';

const foto = (numero: string) => `/unoojornal/foto-${numero}.svg`;
const retrato = (numero: string) => `/unoojornal/retrato-${numero}.svg`;

/** Dados institucionais da publicação de demonstração. */
export const ujnPublication = {
  name: 'Gazeta do Pátio',
  tagline: 'A voz, as ideias e o cotidiano da comunidade escolar do Colégio Anísio Bastos',
  institution: 'Colégio Anísio Bastos',
  edition: 'Ano XII · Edição nº 214',
  updatedLabel: 'Atualizado às 14:32 BRT',
  copyright: '© 2026 Gazeta do Pátio · Colégio Anísio Bastos. Todos os direitos reservados.',
  note: 'Criado com foco em liberdade de expressão e jornalismo estudantil.',
  description:
    'Jornal laboratório impresso e digital produzido integralmente pelos estudantes do Ensino Médio do Colégio Anísio Bastos. Fundado em 2014.',
} as const;

/** As cinco seções editoriais. O filtro "Todas" é tratado pelo aplicativo. */
export const ujnSections: UjnSection[] = [
  { id: 'vida-escolar', label: 'Vida escolar' },
  { id: 'ciencia', label: 'Ciência e tecnologia' },
  { id: 'cultura', label: 'Cultura' },
  { id: 'esportes', label: 'Esportes' },
  { id: 'opiniao', label: 'Opinião' },
];

/** Autoria de demonstração: cinco estudantes e a Redação institucional. */
export const ujnAuthors: UjnAuthor[] = [
  { id: 'beatriz-salgado', name: 'Beatriz Salgado', role: '3º ano B', avatarSrc: retrato('01') },
  { id: 'juliana-mendes', name: 'Juliana Mendes', role: '2º ano A', avatarSrc: retrato('02') },
  { id: 'mateus-rocha', name: 'Mateus Rocha', role: '3º ano C', avatarSrc: retrato('03') },
  { id: 'clarissa-vaz', name: 'Clarissa Vaz', role: '3º ano A', avatarSrc: retrato('04') },
  { id: 'thiago-santos', name: 'Thiago Santos', role: '2º ano B', avatarSrc: retrato('05') },
  { id: 'redacao', name: 'Editorial da Redação', role: 'Conselho editorial', avatarSrc: retrato('06') },
];

/** As matérias da edição, da mais recente à mais antiga. */
export const ujnArticles: UjnArticle[] = [
  {
    id: 'feira-de-ciencias',
    section: 'ciencia',
    kicker: 'Ciência e tecnologia',
    title: 'Feira de Ciências transforma o ginásio em laboratório por três dias',
    deck: 'Cento e vinte projetos de todas as turmas do Ensino Médio ocupam o espaço com experimentos, protótipos e debates abertos à comunidade.',
    summary:
      'Cento e vinte projetos, de braços hidráulicos a filtros de água feitos com material reciclado, ocupam o ginásio até sábado.',
    authorId: 'beatriz-salgado',
    publishedAt: '2026-03-20T12:35:00-03:00',
    readingMinutes: 7,
    imageSrc: foto('01'),
    imageAlt:
      'Bancadas coloridas do ginásio com cartazes, maquetes e estudantes apresentando experimentos aos visitantes',
    imageCaption: 'Bancadas da Feira de Ciências na manhã de abertura, no ginásio do colégio.',
    featured: true,
    body: [
      {
        type: 'paragraph',
        text: 'Quem passou pelo ginásio do Colégio Anísio Bastos na manhã desta sexta-feira encontrou um cenário pouco comum: no lugar das cestas de basquete, fileiras de bancadas cobertas de cartazes, circuitos, maquetes e frascos de cores improváveis. A 18ª Feira de Ciências abriu as portas às oito horas e segue até sábado, com entrada gratuita para famílias e visitantes de outras escolas.',
      },
      {
        type: 'paragraph',
        text: 'Ao todo, são cento e vinte projetos, desenvolvidos ao longo do último semestre por turmas do primeiro ao terceiro ano. Há de tudo: um braço hidráulico montado com seringas e papelão, um filtro de água feito com areia, carvão e garrafas recicladas, um jogo de tabuleiro sobre o ciclo do carbono e até uma estação meteorológica que publica a temperatura do pátio em tempo real.',
      },
      { type: 'heading', text: 'Do problema ao protótipo' },
      {
        type: 'paragraph',
        text: 'A regra da feira é simples: todo projeto parte de uma pergunta que a própria turma formulou. Em vez de reproduzir experimentos de livro, os grupos passaram semanas levantando hipóteses, testando, errando e registrando o processo em cadernos de campo que ficam expostos ao lado de cada bancada.',
      },
      {
        type: 'quote',
        text: 'O produto final importa, mas o que a gente avalia é o caminho. Um experimento que não deu certo e foi bem explicado vale mais do que uma demonstração perfeita que ninguém sabe justificar.',
        cite: 'Prof. Ivan Toledo, Orientador do Departamento de Ciências',
      },
      {
        type: 'figure',
        src: foto('11'),
        alt: 'Ginásio cheio de visitantes circulando entre as bancadas da feira',
        caption: 'O ginásio recebeu cerca de oitocentos visitantes só no primeiro turno.',
        credit: 'Acervo do Clube de Fotografia',
      },
      {
        type: 'paragraph',
        text: 'Para a estudante Isadora Prado, do segundo ano, o maior aprendizado foi lidar com o imprevisto. O protótipo de braço hidráulico que a equipe dela apresenta vazava nos primeiros testes. A solução veio de uma conversa com o técnico do laboratório, que sugeriu trocar as mangueiras e vedar as conexões com cola de silicone.',
      },
      { type: 'heading', text: 'Programação paralela' },
      {
        type: 'list',
        items: [
          'Sexta-feira, às 15h: mesa de debate “Ciência e responsabilidade”, no auditório.',
          'Sábado, às 9h: oficina de robótica com material reciclável, aberta ao público.',
          'Sábado, às 11h: premiação dos três projetos mais votados pelos visitantes.',
        ],
      },
      {
        type: 'paragraph',
        text: 'A votação do público é feita por fichas colocadas em urnas ao lado de cada bancada, e o resultado será anunciado ao final do evento. A comissão organizadora lembra que os projetos de todas as turmas ficam expostos na biblioteca durante a semana seguinte, para quem não conseguir visitar o ginásio.',
      },
    ],
  },
  {
    id: 'festival-de-musica',
    section: 'vida-escolar',
    kicker: 'Vida escolar',
    title: 'Grêmio Estudantil anuncia nova data para o festival de música estudantil',
    deck: 'Apresentações passam de abril para maio, depois de uma consulta que ouviu mais de quatrocentos estudantes.',
    summary:
      'O festival muda para 16 de maio, no pátio coberto, para não coincidir com a semana de provas do primeiro bimestre.',
    authorId: 'juliana-mendes',
    publishedAt: '2026-03-20T10:30:00-03:00',
    readingMinutes: 4,
    imageSrc: foto('06'),
    imageAlt: 'Palco com luzes roxas e azuis e instrumentos montados para um show',
    imageCaption: 'Palco montado para a edição do ano passado do festival.',
    body: [
      {
        type: 'paragraph',
        text: 'O Grêmio Estudantil confirmou nesta sexta-feira que o Festival de Música Estudantil será realizado no dia 16 de maio, e não mais em abril, como estava previsto no calendário. A mudança atende ao resultado de uma consulta feita durante a semana, na qual 412 estudantes opinaram sobre a melhor data.',
      },
      {
        type: 'paragraph',
        text: 'Segundo a presidente do Grêmio, a data original caía na semana de provas do primeiro bimestre, o que desestimulava a participação de bandas e do público. Em maio, o calendário fica mais leve e o clima, mais favorável a um evento no pátio coberto.',
      },
      {
        type: 'quote',
        text: 'A gente não queria um festival com todo mundo olhando o relógio para voltar a estudar. Música precisa de tempo e de cabeça tranquila.',
        cite: 'Larissa Duarte, presidente do Grêmio Estudantil',
      },
      {
        type: 'paragraph',
        text: 'As inscrições das bandas seguem abertas até 25 de abril, pelo formulário disponível na secretaria e no mural do Grêmio. Cada grupo poderá apresentar até três músicas, e ao menos uma delas deve ser autoral. A organização também procura voluntários para som, iluminação e recepção.',
      },
    ],
  },
  {
    id: 'telescopio-no-terraco',
    section: 'ciencia',
    kicker: 'Ciência e tecnologia',
    title: 'Clube de Astronomia monta telescópio no terraço para observação lunar',
    deck: 'A atividade aberta reuniu mais de sessenta pessoas para observar crateras e montanhas da Lua em uma noite de céu limpo.',
    summary:
      'Em uma noite de céu limpo, estudantes e famílias observaram as crateras da Lua em um telescópio refletor instalado no terraço.',
    authorId: 'mateus-rocha',
    publishedAt: '2026-03-19T09:00:00-03:00',
    readingMinutes: 5,
    imageSrc: foto('02'),
    imageAlt: 'Telescópio apontado para uma lua crescente sobre o terraço do colégio ao anoitecer',
    imageCaption: 'O telescópio refletor do clube apontado para a Lua, no terraço do bloco B.',
    body: [
      {
        type: 'paragraph',
        text: 'Na noite de quarta-feira, o terraço do bloco B virou um observatório improvisado. O Clube de Astronomia montou um telescópio refletor de 150 milímetros e convidou estudantes, famílias e vizinhos para ver de perto a Lua em fase crescente. A fila, que começou ao pôr do sol, só terminou depois das dez da noite.',
      },
      {
        type: 'paragraph',
        text: 'Antes de cada olhada no telescópio, um integrante do clube explicava o que havia para ver: o contraste entre os mares escuros e as terras altas, a cratera Tycho e as sombras compridas que se formam perto da linha que separa o dia da noite lunar. “Essa linha é a melhor região para observar, porque o relevo fica em alto contraste”, explicou o coordenador do clube.',
      },
      { type: 'heading', text: 'Como participar' },
      {
        type: 'list',
        items: [
          'Os encontros são quinzenais, às quartas-feiras, no terraço do bloco B.',
          'Não é preciso ter equipamento nem conhecimento prévio.',
          'Em caso de nuvens, a observação é remarcada para a quarta-feira seguinte.',
        ],
      },
      {
        type: 'paragraph',
        text: 'O próximo encontro está marcado para o dia 1º de abril e será dedicado à observação de Júpiter, que estará bem posicionado no início da noite. O clube informa que, com sorte, será possível enxergar até quatro das maiores luas do planeta.',
      },
    ],
  },
  {
    id: 'auto-da-compadecida',
    section: 'cultura',
    kicker: 'Cultura',
    title: 'Teatro do colégio estreia releitura contemporânea de “O Auto da Compadecida”',
    deck: 'Com figurinos feitos pelos próprios estudantes, a montagem aposta no humor e na crítica social da obra de Ariano Suassuna.',
    summary:
      'A turma de Teatro estreia no sábado, às 19h, uma montagem que mistura cordel, música ao vivo e cenário de papelão.',
    authorId: 'clarissa-vaz',
    publishedAt: '2026-03-18T16:00:00-03:00',
    readingMinutes: 6,
    imageSrc: foto('03'),
    imageAlt: 'Palco com cortinas roxas abertas e máscaras de teatro penduradas ao fundo',
    imageCaption: 'Cenário da peça, montado no auditório do colégio.',
    body: [
      {
        type: 'paragraph',
        text: 'Depois de quatro meses de ensaios, a turma de Teatro do colégio estreia neste sábado, às 19h, sua versão de “O Auto da Compadecida”. A montagem, dirigida pela professora de Artes, mantém o humor e a crítica social do texto de Ariano Suassuna, mas traz o sertão para dentro do universo dos estudantes: há trilha sonora ao vivo, referências a redes sociais e um João Grilo que não perde uma oportunidade de improvisar.',
      },
      {
        type: 'paragraph',
        text: 'Os figurinos e o cenário foram produzidos pelos próprios participantes, com tecido doado pelas famílias e muito papelão reaproveitado. As máscaras do Diabo e do Encourado, desenhadas em oficina com a turma de Artes Visuais, estão entre as peças mais comentadas dos bastidores.',
      },
      {
        type: 'quote',
        text: 'Cada ensaio era uma discussão sobre o que significa ser esperto e o que significa ser justo. A peça fala de coisas que a gente ainda vive todo dia.',
        cite: 'Rafael Nogueira, 2º ano C, intérprete de João Grilo',
      },
      {
        type: 'paragraph',
        text: 'As apresentações acontecem no auditório, nos dias 21 e 28 de março, às 19h, e no dia 29, às 16h. Os ingressos são gratuitos, mas é necessário retirar a senha na secretaria. Quem puder deve levar um quilo de alimento não perecível, que será doado a uma associação de moradores do bairro.',
      },
    ],
  },
  {
    id: 'futsal-feminino-final',
    section: 'esportes',
    kicker: 'Esportes',
    title: 'Time feminino de futsal conquista vaga invicta na final dos Jogos Intercolegiais',
    deck: 'Depois de cinco vitórias seguidas, a equipe encara o atual campeão no sábado, na quadra municipal.',
    summary:
      'Com uma goleada por 6 a 1 na semifinal, as meninas do colégio garantem presença na decisão pela primeira vez em seis anos.',
    authorId: 'thiago-santos',
    publishedAt: '2026-03-17T18:20:00-03:00',
    readingMinutes: 4,
    imageSrc: foto('04'),
    imageAlt: 'Quadra de futsal vista de cima, com as linhas brancas e as traves nas duas pontas',
    imageCaption: 'Quadra municipal onde será disputada a final do campeonato.',
    body: [
      {
        type: 'paragraph',
        text: 'O time feminino de futsal do Colégio Anísio Bastos está na final dos Jogos Intercolegiais. Na tarde de segunda-feira, a equipe goleou o time do Colégio Horizonte por 6 a 1, completou cinco vitórias em cinco jogos e chegou à decisão sem sofrer uma única derrota na competição.',
      },
      {
        type: 'paragraph',
        text: 'A última vez que o colégio disputou uma final feminina foi há seis anos. A treinadora atribui a campanha ao trabalho de base e à presença de atletas de todas as séries no grupo: “Aqui, quem está no primeiro ano treina com quem está no terceiro. Isso faz o time crescer junto”.',
      },
      {
        type: 'paragraph',
        text: 'A decisão será no sábado, às 15h, na quadra municipal, contra o atual campeão. A torcida organizada, formada por estudantes de diversas turmas, já combinou a saída em grupo a partir das 13h30, na entrada principal do colégio.',
      },
    ],
  },
  {
    id: 'o-patio-tambem-e-sala-de-aula',
    section: 'opiniao',
    kicker: 'Opinião',
    title: 'O pátio também é sala de aula',
    deck: 'O recreio ensina o que nenhum caderno consegue: a negociar, a perder, a esperar a vez e a conviver.',
    summary:
      'Defendemos que o tempo livre no pátio seja tratado como parte da formação, e não como intervalo entre o que realmente importa.',
    authorId: 'redacao',
    publishedAt: '2026-03-16T08:00:00-03:00',
    readingMinutes: 3,
    imageSrc: foto('10'),
    imageAlt: 'Pátio da escola com árvores, bancos e um mural colorido ao fundo',
    imageCaption: 'O pátio central do colégio, no horário do recreio.',
    opinion: true,
    body: [
      {
        type: 'paragraph',
        text: 'Há quem veja o recreio como um intervalo entre uma aula e outra. Para nós, que passamos nele alguns dos melhores momentos da vida escolar, o pátio é um território de aprendizagem tão importante quanto qualquer laboratório. É ali que se aprende a negociar as regras de um jogo, a lidar com a derrota, a dividir o espaço e a escutar quem pensa diferente.',
      },
      {
        type: 'paragraph',
        text: 'Por isso preocupa a discussão, levantada em reunião recente, sobre reduzir o tempo do intervalo para acomodar mais aulas na grade. Mais conteúdo não significa, necessariamente, mais aprendizagem. Estudantes que descansam, se movimentam e conversam voltam à sala mais atentos, e isso não é opinião: é o que mostram diversos estudos sobre rendimento escolar.',
      },
      {
        type: 'quote',
        text: 'Ninguém aprende a conviver olhando para a lousa.',
        cite: 'Editorial da Redação',
      },
      {
        type: 'paragraph',
        text: 'Pedimos à direção que mantenha os vinte minutos de recreio e que amplie, em vez de reduzir, os espaços de convivência. Bancos à sombra, uma quadra livre e uma estante de jogos de mesa custam pouco e rendem muito. O pátio também é sala de aula, e merece ser tratado como tal.',
      },
    ],
  },
  {
    id: 'biblioteca-cabines-silenciosas',
    section: 'vida-escolar',
    kicker: 'Vida escolar',
    title: 'Biblioteca amplia espaço de estudo individual com reforma das cabines silenciosas',
    deck: 'Obra entrega doze novas cabines com tomadas, luminárias e isolamento acústico, no mezanino.',
    summary:
      'Doze cabines individuais, com tomada e luz própria, abrem na segunda-feira para quem precisa de silêncio na hora de estudar.',
    authorId: 'juliana-mendes',
    publishedAt: '2026-03-15T11:10:00-03:00',
    readingMinutes: 3,
    imageSrc: foto('05'),
    imageAlt: 'Estantes de livros em corredores da biblioteca, com uma mesa de estudo e uma luminária ao fundo',
    imageCaption: 'Mezanino da biblioteca, onde ficam as novas cabines.',
    body: [
      {
        type: 'paragraph',
        text: 'A biblioteca do colégio reabre na segunda-feira com uma novidade pedida por muitos estudantes: doze cabines individuais de estudo, instaladas no mezanino. Cada uma tem tomada, luminária própria e painéis que reduzem o ruído do corredor, o que deve ajudar quem precisa de concentração para revisar conteúdo ou preparar trabalhos.',
      },
      {
        type: 'paragraph',
        text: 'O espaço antes abrigava arquivos antigos da secretaria. A reforma durou seis semanas e foi financiada com parte da arrecadação da última feira de livros. Segundo a bibliotecária responsável, a reserva das cabines será feita no balcão, por períodos de uma hora, e poderá ser renovada se não houver fila.',
      },
      {
        type: 'list',
        items: [
          'Funcionamento: das 7h30 às 18h, de segunda a sexta.',
          'Reserva no balcão, por períodos de uma hora.',
          'Uso silencioso: conversas e chamadas ficam do lado de fora.',
        ],
      },
    ],
  },
  {
    id: 'torneio-de-xadrez',
    section: 'esportes',
    kicker: 'Esportes',
    title: 'Torneio de xadrez rápido ocupa o pátio interno durante o recreio',
    deck: 'Partidas de dez minutos animam o intervalo e valem pontos para o ranking do clube.',
    summary:
      'A partir de 2 de abril, tabuleiros espalhados pelo pátio recebem partidas relâmpago durante o recreio, abertas a todas as séries.',
    authorId: 'thiago-santos',
    publishedAt: '2026-03-12T13:45:00-03:00',
    readingMinutes: 3,
    imageSrc: foto('07'),
    imageAlt: 'Tabuleiro de xadrez em tons de roxo com peças organizadas no início de uma partida',
    imageCaption: 'Tabuleiros do clube, prontos para a rodada de abertura.',
    body: [
      {
        type: 'paragraph',
        text: 'O Clube de Xadrez inicia, no dia 2 de abril, um torneio de partidas rápidas que acontecerá durante o recreio, no pátio interno. Cada jogador terá dez minutos no relógio, e as rodadas seguem o sistema suíço, com emparceiramento feito a cada dia pela organização.',
      },
      {
        type: 'paragraph',
        text: 'Não é preciso ser do clube para participar: basta se inscrever na lista fixada na porta da sala 14 e levar o nome completo e a turma. Quem nunca jogou em torneio poderá aprender as regras de relógio em uma oficina na véspera, às 12h30.',
      },
      {
        type: 'paragraph',
        text: 'O ranking final premiará os três primeiros colocados e o melhor estreante, e será divulgado no mural da biblioteca. Os tabuleiros e relógios são emprestados pelo clube, mas quem tiver o próprio material pode levar.',
      },
    ],
  },
  {
    id: 'palestra-carreiras-em-ia',
    section: 'vida-escolar',
    kicker: 'Vida escolar',
    title: 'Ex-aluno volta ao colégio para falar sobre carreiras em inteligência artificial e design',
    deck: 'A palestra, marcada para 8 de abril, abre a série “Voltei para contar”, que traz ex-estudantes ao auditório.',
    summary:
      'Formado em 2016, o convidado trabalha com produtos de inteligência artificial e vai conversar com os terceiros anos sobre escolhas de carreira.',
    authorId: 'beatriz-salgado',
    publishedAt: '2026-03-10T15:30:00-03:00',
    readingMinutes: 4,
    imageSrc: foto('08'),
    imageAlt: 'Auditório com fileiras de poltronas roxas voltadas para um palco com um palestrante e um telão',
    imageCaption: 'Auditório do colégio, onde a palestra será realizada.',
    body: [
      {
        type: 'paragraph',
        text: 'No dia 8 de abril, o auditório do colégio recebe Daniel Fonseca, formado na turma de 2016 e hoje designer de produtos de inteligência artificial. A conversa abre a série “Voltei para contar”, criada pela coordenação para aproximar os estudantes de quem já passou pelos mesmos corredores e seguiu caminhos diferentes.',
      },
      {
        type: 'paragraph',
        text: 'Daniel vai falar sobre como a mistura de lógica e criatividade, que ele descobriu nas aulas de Matemática e de Artes, o levou a trabalhar com tecnologia. Também abordará os desafios éticos da área, como o uso responsável de dados e a transparência dos sistemas automatizados.',
      },
      {
        type: 'paragraph',
        text: 'A palestra é voltada aos terceiros anos, mas as vagas restantes serão abertas a estudantes de outras séries, por ordem de inscrição na secretaria. Haverá tempo para perguntas ao final, e as dúvidas também podem ser enviadas com antecedência pelo mural do Grêmio.',
      },
    ],
  },
  {
    id: 'coral-abre-inscricoes',
    section: 'cultura',
    kicker: 'Cultura',
    title: 'Coral do colégio abre inscrições para a apresentação de abril',
    deck: 'Os ensaios são às terças e quintas, no horário do almoço, e não exigem experiência anterior.',
    summary:
      'O repertório mistura música popular brasileira e canções de roda, e a estreia do grupo será no encerramento do bimestre.',
    authorId: 'clarissa-vaz',
    publishedAt: '2026-03-06T09:20:00-03:00',
    readingMinutes: 3,
    imageSrc: foto('12'),
    imageAlt: 'Degraus de um palco com cadeiras dispostas em arco e partituras sobre os assentos',
    imageCaption: 'Sala de ensaio do coral, no primeiro andar.',
    body: [
      {
        type: 'paragraph',
        text: 'O coral do colégio está com inscrições abertas até o dia 27 de março. Os ensaios acontecem às terças e quintas-feiras, de 12h15 às 13h, na sala de música, e o grupo se apresenta pela primeira vez no encerramento do bimestre, em abril.',
      },
      {
        type: 'paragraph',
        text: 'O repertório reúne clássicos da música popular brasileira, canções de roda e uma composição inédita escrita por estudantes do terceiro ano. A regente garante que não é preciso saber ler partitura: o aprendizado é feito de ouvido e com apoio de gravações disponibilizadas à turma.',
      },
    ],
  },
];

/** Compromissos da agenda da escola. */
export const ujnAgenda: UjnAgendaEvent[] = [
  {
    id: 'roda-de-conversa',
    date: '2026-03-24',
    title: 'Roda de Conversa: Saúde Mental e Pressão Acadêmica no Ensino Médio',
    time: '18h30',
    place: 'Auditório',
  },
  {
    id: 'entrega-de-boletins',
    date: '2026-03-27',
    title: 'Entrega dos boletins do 1º bimestre e reunião de pais e professores',
    time: '8h às 12h',
    place: 'Salas de aula',
  },
  {
    id: 'torneio-de-xadrez-rapido',
    date: '2026-04-02',
    title: 'Início do torneio de xadrez rápido no pátio interno (recreio)',
    time: '10h20',
    place: 'Pátio interno',
  },
  {
    id: 'palestra-ex-aluno',
    date: '2026-04-08',
    title: 'Palestra com ex-aluno: Carreiras em Inteligência Artificial e Design',
    time: '19h',
    place: 'Auditório',
  },
];

/** Fotografias da galeria. */
export const ujnGallery: UjnGalleryPhoto[] = [
  {
    id: 'galeria-braco-hidraulico',
    src: foto('09'),
    alt: 'Bancada de laboratório com bequers coloridos e tubos de ensaio',
    caption: 'Isadora e Lucca testam o protótipo de braço hidráulico.',
    credit: 'Acervo do Clube de Fotografia',
  },
  {
    id: 'galeria-feira-lotada',
    src: foto('11'),
    alt: 'Ginásio cheio de visitantes circulando entre as bancadas da feira',
    caption: 'Visitantes lotam o ginásio no primeiro turno da Feira de Ciências.',
    credit: 'Acervo do Clube de Fotografia',
  },
  {
    id: 'galeria-bancadas',
    src: foto('01'),
    alt: 'Bancadas com cartazes e maquetes de projetos científicos',
    caption: 'Cartazes e maquetes dos projetos do segundo ano.',
    credit: 'Acervo do Clube de Fotografia',
  },
  {
    id: 'galeria-patio',
    src: foto('10'),
    alt: 'Pátio central da escola com árvores e bancos',
    caption: 'O pátio central na hora do recreio.',
    credit: 'Acervo do Clube de Fotografia',
  },
];

/** As doze fotografias de demonstração, com a descrição de cada uma. */
export const ujnImages: { src: string; alt: string }[] = [
  { src: foto('01'), alt: 'Bancadas coloridas de uma feira de ciências com cartazes e maquetes' },
  { src: foto('02'), alt: 'Telescópio apontado para uma lua crescente sobre um terraço' },
  { src: foto('03'), alt: 'Palco de teatro com cortinas roxas e máscaras ao fundo' },
  { src: foto('04'), alt: 'Quadra de futsal vista de cima, com as linhas e as traves' },
  { src: foto('05'), alt: 'Estantes de uma biblioteca com mesa de estudo e luminária' },
  { src: foto('06'), alt: 'Palco de festival de música com holofotes e instrumentos' },
  { src: foto('07'), alt: 'Tabuleiro de xadrez com as peças na posição inicial' },
  { src: foto('08'), alt: 'Auditório com poltronas voltadas para um palestrante e um telão' },
  { src: foto('09'), alt: 'Bancada de laboratório com bequers e tubos de ensaio' },
  { src: foto('10'), alt: 'Pátio de escola com árvores, bancos e um mural' },
  { src: foto('11'), alt: 'Ginásio lotado de visitantes e bancadas de feira' },
  { src: foto('12'), alt: 'Degraus de um palco com cadeiras em arco para um coral' },
];

/** Os seis retratos de demonstração (quadrados, 400 × 400). */
export const ujnPortraits: string[] = ['01', '02', '03', '04', '05', '06'].map(retrato);
