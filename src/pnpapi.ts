const { existsSync } = require(`fs`);
const { createRequire, createRequireFromPath } = require(`module`);
const { resolve } = require(`path`);

export let pnpRequire: NodeRequire = require;

/** 
 * try to setup Plug'n'Play for `yarn 2`  
 * https://yarnpkg.com/features/pnp  
 * https://yarnpkg.com/advanced/pnpapi 
*/
export function trySetupPnp(dir: string): NodeRequire {
  const relPnpApiPath = './.pnp.js';

  const absPnpApiPath = resolve(dir, relPnpApiPath);
  const absRequire = (createRequire || createRequireFromPath)(absPnpApiPath);

  if (existsSync(absPnpApiPath)) {
    if (!process.versions.pnp) {
      // Setup the environment to be able to require 
      require(absPnpApiPath).setup();
      pnpRequire = absRequire;
    }
  }

  return pnpRequire;
}

export const isPnpFn = () => {
  return process.versions.pnp !== undefined;
};
