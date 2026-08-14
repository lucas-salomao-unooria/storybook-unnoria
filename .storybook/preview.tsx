import type { Preview } from '@storybook/nextjs-vite';
import '../app/globals.css';

/* WhatsApp UI Tokens */
import '../src/whatsapp/tokens/spacing.css';
import '../src/whatsapp/tokens/colors.css';
import '../src/whatsapp/tokens/typography.css';

/* Plataforma Unooria Tokens */
import '../src/unooria/tokens/colors.css';
import '../src/unooria/tokens/typography.css';
import '../src/unooria/tokens/grids.css';
import '../src/unooria/tokens/spacing.css';
import '../src/unooria/tokens/blur.css';
import '../src/unooria/tokens/elevation.css';

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