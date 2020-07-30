import { configure } from '@storybook/react';
import '../src/grid.css'

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.(stories|sb).(t|j)sx?$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
