# NPM Starter

This project is an npm package starter used by @calummoore for @1productaweek.

It has the following additional features:

 * ✅ Typescript
 * ✅ Opinionated ESLint
 * ✅ Jest
 * ✅ React (optional)


### Storybook

Storybook is not included by default, but this can be easily installed with:

```sh
cd my-project-directory
npx -p @storybook/cli sb init
```

Then add these dependencies:
```sh
yarn add --dev @storybook/preset-typescript ts-loader fork-ts-checker-webpack-plugin
```

Finally, add overwrite the contents of  `.storybook/main.js` file that was created in the step above:

```js
module.exports = {
  stories: ['../stories/**/*.sb.tsx', '../**/__stories__/**/*.sb.tsx'],
  addons: [
    '@storybook/preset-typescript',
    '@storybook/addon-actions', 
    '@storybook/addon-links', 
  ],
}
```


### Made by 1PAW

https://1productaweek.com
  * |- [Ralley](https://ralley.io) - queue as a service
  * |- [Snapboard](https://snapboard.io) - hackable dashboard
