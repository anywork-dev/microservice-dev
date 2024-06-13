import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['./src/platform/cloudflare/app.js'],
  bundle: true,
  outdir: "build/cloudflare",
  format: "esm",
  alias: {
    'cryptonite': './src/platform/cloudflare/lib/cryptonite.js',
  },
})