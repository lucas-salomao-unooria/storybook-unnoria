import type { Preview } from '@storybook/nextjs-vite';
import '../app/globals.css';

/*
 * Fontes das marcas, embutidas no pacote.
 *
 * Cada `fonts.css` declara os `@font-face` apontando para os `.woff2` de
 * `src/fonts/` — nenhuma requisição ao Google Fonts. Ficam antes dos tokens
 * para que a família já esteja registrada quando o primeiro componente pintar.
 * O Instanooria não entra: usa SF Pro, fonte de sistema.
 */
import '../src/unooria/tokens/fonts.css';
import '../src/chatgpt/tokens/fonts.css';
import '../src/whatsappmobile/tokens/fonts.css';
import '../src/tiktooria/tokens/fonts.css';
import '../src/unootube/tokens/fonts.css';
import '../src/unoochat/tokens/fonts.css';
import '../src/unoovista/tokens/fonts.css';

/* WhatsApp Mobile Tokens */
import '../src/whatsappmobile/tokens/typography.css';
import '../src/whatsappmobile/tokens/colors.css';
import '../src/whatsappmobile/tokens/spacing.css';

/* Unoochat Tokens */
import '../src/unoochat/tokens/typography.css';
import '../src/unoochat/tokens/colors.css';
import '../src/unoochat/tokens/spacing.css';

/* Unoovista Tokens */
import '../src/unoovista/tokens/typography.css';
import '../src/unoovista/tokens/colors.css';
import '../src/unoovista/tokens/spacing.css';

/* Instanooria Tokens */
import '../src/instanooria/tokens/colors.css';
import '../src/instanooria/tokens/typography.css';
import '../src/instanooria/tokens/spacing.css';

/* ChatGPT Tokens */
import '../src/chatgpt/tokens/colors.css';
import '../src/chatgpt/tokens/typography.css';
import '../src/chatgpt/tokens/spacing.css';
import '../src/chatgpt/tokens/elevation.css';

/* Tik Tooria Tokens */
import '../src/tiktooria/tokens/colors.css';
import '../src/tiktooria/tokens/typography.css';
import '../src/tiktooria/tokens/spacing.css';
import '../src/tiktooria/tokens/elevation.css';

/* Unootube Tokens */
import '../src/unootube/tokens/colors.css';
import '../src/unootube/tokens/typography.css';
import '../src/unootube/tokens/spacing.css';
import '../src/unootube/tokens/elevation.css';

/* Plataforma Unooria Tokens */
import '../src/unooria/tokens/colors.css';
import '../src/unooria/tokens/typography.css';
import '../src/unooria/tokens/grids.css';
import '../src/unooria/tokens/spacing.css';
import '../src/unooria/tokens/blur.css';
import '../src/unooria/tokens/elevation.css';
import '../src/unooria/tokens/icons.css';
import '../src/unooria/tokens/scrollbar.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;