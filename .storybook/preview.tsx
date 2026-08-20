import type { Preview } from '@storybook/nextjs-vite';
import '../app/globals.css';

/* WhatsApp UI Tokens */
import '../src/whatsapp/tokens/spacing.css';
import '../src/whatsapp/tokens/colors.css';
import '../src/whatsapp/tokens/typography.css';

/* WhatsApp Mobile Tokens */
import '../src/whatsappmobile/tokens/typography.css';
import '../src/whatsappmobile/tokens/colors.css';
import '../src/whatsappmobile/tokens/spacing.css';

/* Instanooria Tokens */
import '../src/instanooria/tokens/colors.css';
import '../src/instanooria/tokens/typography.css';
import '../src/instanooria/tokens/spacing.css';

/* ChatGPT Tokens */
import '../src/chatgpt/tokens/colors.css';
import '../src/chatgpt/tokens/typography.css';
import '../src/chatgpt/tokens/spacing.css';
import '../src/chatgpt/tokens/elevation.css';

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