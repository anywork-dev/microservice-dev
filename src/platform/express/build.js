import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['./src/platform/express/app.js'],
  bundle: true,
  outdir: "build/express",
  format: "esm",
  alias: {
    'cryptonite': './src/platform/cloudflare/lib/cryptonite.js',
  },
})