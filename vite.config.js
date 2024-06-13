import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      'resource': resolve(__dirname, 'src/lib/resource.js'),
      'cryptonite': resolve(__dirname, 'src/lib/cryptonite.js'),
      'auth-model': resolve(__dirname, 'src/model/auth.model.js'),
      'email-client': resolve(__dirname, 'src/lib/email-client.js'),
      'response': resolve(__dirname, 'src/lib/email-client.js'),
      'request': resolve(__dirname, 'src/lib/email-client.js'),
    },
  },
  test: {
    // Vitest configuration options
  },
});
