module.exports = {
  stories: ['../stories/**/*.sb.tsx', '../**/__stories__/**/*.sb.tsx'],
  addons: [
    '@storybook/preset-typescript',
    '@storybook/addon-actions', 
    '@storybook/addon-links', 
  ],
}