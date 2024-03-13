import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import tailwind, { tailwindHMR, setPluginConfigurationDefaults } from 'stencil-tailwind-plugin';
import tailwindcss from 'tailwindcss';
import tailwindConf from './tailwind.config';
import autoprefixer from 'autoprefixer';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';

setPluginConfigurationDefaults({
  tailwindConf,
  tailwindCssPath: './src/global/app.css',
  postcss: {
    plugins: [tailwindcss(), autoprefixer()],
  },
});

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'www',
      // comment the following line to disable service workers in production
      // serviceWorker: null,
      baseUrl: 'https://myapp.local/',
    },
    // reactOutputTarget({
    //   componentCorePackage: 'checkout',
    //   proxiesFile: './src/components/react/index.ts',
    // }),
    // vueOutputTarget({
    //   componentCorePackage: 'checkout',
    //   proxiesFile: './src/components/vue/index.ts',
    // }),
  ],
  plugins: [sass(), tailwind(), tailwindHMR()],
};
