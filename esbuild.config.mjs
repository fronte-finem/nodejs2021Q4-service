import { build } from 'esbuild';

const IS_PROD = process.env.NODE_ENV === 'production';

const makeAllPackagesExternalPlugin = {
  name: 'make-all-packages-external',
  setup(build) {
    const filter = /^[^.~\/]/; // Must not start with ".", "~", "/"
    build.onResolve({ filter }, ({ path }) => ({
      path,
      external: true,
    }));
  },
};

build({
  entryPoints: ['./src/server.ts'],
  outfile: 'dist/bundle.mjs',
  bundle: true,
  minify: IS_PROD,
  format: 'esm',
  platform: 'node',
  target: 'ESNext',
  logLevel: 'info',
  define: {
    'process.env.STARTUP_MODE': JSON.stringify('bundle'),
  },
  plugins: [makeAllPackagesExternalPlugin],
}).catch(() => process.exit(1));
