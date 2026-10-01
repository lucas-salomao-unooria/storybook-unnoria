/**
 * Conteúdo de demonstração das estórias do agente de IA do professor.
 *
 * A resposta do agente está escrita como os elementos que o react-markdown
 * produziria (o hub converte o markdown; o DS só dá a tipografia). As datas do
 * histórico chegam prontas, como o produto as formataria — o DS não formata
 * data.
 */
import React from 'react';
import { RichContentTable } from '../../../../src/unooria/components/RichContent';
import type { ChatHistoryItem } from '../../../../src/unooria/components/ChatHistory';
import type { ChatMessageSource } from '../../../../src/unooria/components/ChatMessage';

export const PERGUNTA_DO_PROFESSOR =
  'Preciso de uma aula de 50 minutos sobre frações equivalentes para o 5º ano. Pode sugerir um roteiro?';

export const PERGUNTA_CURTA = 'E como eu avalio se a turma entendeu?';

/** A resposta em "markdown já renderizado": título, lista, tabela, citação, ênfase e link. */
export const RespostaEmMarkdown: React.FC = () => (
  <>
    <p>
      Claro! Segue um roteiro de <strong>50 minutos</strong> alinhado à habilidade{' '}
      <strong>EF05MA03</strong> da BNCC, usando o material da rede.
    </p>
    <h3>Roteiro da aula</h3>
    <ol>
      <li>
        <strong>Abertura (10 min)</strong> — dobre uma folha ao meio e depois em quatro: pergunte à turma se{' '}
        <em>1/2</em> e <em>2/4</em> são “a mesma quantidade”.
      </li>
      <li>
        <strong>Exploração (20 min)</strong> — em duplas, a turma usa as tiras de frações da página 12 do caderno
        para encontrar três frações equivalentes a 1/3.
      </li>
      <li>
        <strong>Sistematização (15 min)</strong> — registre no quadro a regra: multiplicar numerador e denominador
        pelo mesmo número.
      </li>
      <li>
        <strong>Fechamento (5 min)</strong> — cada dupla escreve uma fração equivalente a 3/4 num papel de saída.
      </li>
    </ol>
    <h3>Tabela de apoio</h3>
    <RichContentTable>
      <thead>
        <tr>
          <th>Fração</th>
          <th>× 2</th>
          <th>× 3</th>
          <th>× 4</th>
          <th>Representação na tira</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1/2</td>
          <td>2/4</td>
          <td>3/6</td>
          <td>4/8</td>
          <td>Metade da tira pintada</td>
        </tr>
        <tr>
          <td>1/3</td>
          <td>2/6</td>
          <td>3/9</td>
          <td>4/12</td>
          <td>Um terço da tira pintado</td>
        </tr>
      </tbody>
    </RichContentTable>
    <blockquote>
      <p>Dica: peça que a turma explique com as próprias palavras por que 2/4 e 1/2 ocupam o mesmo espaço da tira.</p>
    </blockquote>
    <p>
      O caderno traz mais atividades no <a href="#capitulo-3">capítulo 3</a>.
    </p>
  </>
);

/** Um trecho da resposta, como chega no meio da transmissão. */
export const RespostaParcial: React.FC = () => (
  <>
    <p>
      Uma forma simples é o <strong>papel de saída</strong>: no fim da aula, cada estudante escreve uma fração
      equivalente a 3/4 e
    </p>
  </>
);

export const FONTES: ChatMessageSource[] = [
  { titulo: 'Caderno do Professor — Matemática 5º ano', paginaInicio: 12, paginaFim: 13 },
  { titulo: 'BNCC — Matemática, Anos Iniciais', paginaInicio: 294 },
];

export const AVISO = 'Confira as páginas indicadas: a numeração pode mudar entre as edições do caderno.';

export const HISTORICO: ChatHistoryItem[] = [
  { id: 'c1', titulo: 'Aula de 50 minutos sobre frações equivalentes', atualizadaEm: 'Hoje, 14:32' },
  { id: 'c2', titulo: 'Atividade de leitura para o 3º ano', atualizadaEm: 'Ontem, 09:15' },
  { id: 'c3', titulo: 'Como avaliar produção de texto no 6º ano', atualizadaEm: '28/09/2026' },
  { id: 'c4', titulo: 'Sequência didática sobre o ciclo da água', atualizadaEm: '25/09/2026' },
  { id: 'c5', titulo: 'Dúvida sobre a BNCC de Computação no Ensino Médio', atualizadaEm: '19/09/2026' },
];
