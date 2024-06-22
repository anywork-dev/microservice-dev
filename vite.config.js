import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      'resource': resolve(__dirname, 'src/lib/resource.js'),
      'cryptonite': resolve(__dirname, 'src/lib/cryptonite.js'),
      'auth-model': resolve(__dirname, 'src/model/auth.model.js'),
      'email-client': resolve(__dirname, 'src/lib/email-client.js'),
      'net-tools': resolve(__dirname, 'src/lib/net-tools.js'),
      'auth-service': resolve(__dirname, 'src/services/auth/service.js'),
      'platform-router-adapter': resolve(__dirname, 'src/lib/router-adapter.js'),
    },
  },
  test: {
    // Vitest configuration options
  },
});
