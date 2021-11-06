/** @format */

//PLUGIN HELPS US TO OVERRIDE TEH FUNCTIONALITY OF ESBUILD TO GET PACKAGES FROM NPM

import * as esbuild from 'esbuild-wasm';
import axios from 'axios';

const UPKG = 'https://unpkg.com';

export const unpkgPathPlugin = () => {
  return {
    //name is for debugging purposes works as an identifier

    name: 'unpkg-path-plugin',

    //will be called automatically by the single build argument and does all tha tasks

    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResole', args);
        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        }
        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(args.path, UPKG + args.resolveDir + '/').href,
          };
        }
        return { path: `${UPKG}/${args.path}`, namespace: 'a' };
      });

      //this is the process where we overrode the default process of esbuild and brought the file system from unpkg
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          //every time we hit an import statement we go to the onresolve step
          return {
            loader: 'jsx',
            contents: `
              import message from 'redux';
              import reactDom from 'react-dom';
              console.log(message, reactDom);
            `,
          };
        }
        const { data, request } = await axios.get(args.path);
        console.log(request);

        return {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
      });
    },
  };
};
