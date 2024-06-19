import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['./src/platform/express/app.js'],
  bundle: true,
  outdir: "build/express/src",
  platform: 'node',
  format: "esm",
  alias: {
    'net-tools': './src/lib/net-tools.js',
    'auth-routes': './src/services/auth/router.js',
    'resource': './src/lib/resource.js',
    'auth-model': './src/model/auth.model.js',
    'email-client': './src/lib/email-client.js',
    'cryptonite': './src/lib/cryptonite.js',
    'auth-service': './src/services/auth/service.js',
    'platform-router-adapter': './src/platform/express/lib/router-adapter.js',
    'router-adapter': './src/lib/router-adapter.js'
  },
  external: ["bcrypt", "jsonwebtoken", "express", "body-parser", "cookie-parser"]
})