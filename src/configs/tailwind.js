import { create } from 'tailwind-rn';
import customColors from '@configs/customColors';
const _styles = require('node_modules/tailwind-rn/styles.json');

let styles = {
  'mx-auto': { marginHorisontal: 'auto' },
  'my-auto': { marginVertical: 'auto' },
  'ml-auto': { marginLeft: 'auto' },
  'mr-auto': { marginRight: 'auto' },
  'mt-auto': { marginTop: 'auto' },
  'mb-auto': { marginBottom: 'auto' },
  'h-auto': { height: 'auto' },
  'w-auto': { width: 'auto' },
  'text-top': {
    textAlignVertical: 'top',
  },
  'text-middle': {
    textAlignVertical: 'center',
  },
  'text-bottom': {
    textAlignVertical: 'bottom',
  },
  ..._styles,
};

Object.keys(customColors).forEach((name) => {
  styles[`bg-${name}`] = { backgroundColor: customColors[name] };
  styles[`text-${name}`] = { color: customColors[name] };
  styles[`border-${name}`] = {
    borderTopColor: customColors[name],
    borderRightColor: customColors[name],
    borderBottomColor: customColors[name],
    borderLeftColor: customColors[name],
  };
});

export const { tailwind, getColor } = create(styles);

export default { tailwind, getColor, customColors };
