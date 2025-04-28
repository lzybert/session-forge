import { definePreset, defineTextStyles } from '@pandacss/dev';

const textStyles = defineTextStyles({
  heading: {
    description: 'Main heading text style for large titles',
    value: {
      //fontSize: 'token(fontSizes.4xl)',
      //fontWeight: '900',
      //fontFamily: 'token(fonts.heading)',
      //color: 'token(colors.cthulhu-green-500)',
    }
  }
});
export const preset = definePreset({
  name: 'SessionForgePreset',
  theme: {
    tokens: {
      fonts: {
        heading: { value: 'var(--font-bitter)' },
        body: { value: 'var(--font-bitter)' },
      },
      colors: {
        'cthulhu-green-DEFAULT': { value: '#3b6e58' },
        'cthulhu-green-50': { value: '#d8f4e8' },
        'cthulhu-green-100': { value: '#b2e3ce' },
        'cthulhu-green-200': { value: '#83d1ae' },
        'cthulhu-green-300': { value: '#5abb8d' },
        'cthulhu-green-400': { value: '#3b9c70' },
        'cthulhu-green-500': { value: '#3b6e58' },
        'cthulhu-green-600': { value: '#2d5646' },
        'cthulhu-green-700': { value: '#1f3d34' },
        'cthulhu-green-800': { value: '#142723' },
        'cthulhu-green-900': { value: '#0b1514' },

        'deep-ocean-DEFAULT': { value: '#1c2a40' },
        'deep-ocean-50': { value: '#d4dae8' },
        'deep-ocean-100': { value: '#a8b5d1' },
        'deep-ocean-200': { value: '#758bb5' },
        'deep-ocean-300': { value: '#4e628c' },
        'deep-ocean-400': { value: '#364874' },
        'deep-ocean-500': { value: '#1c2a40' },
        'deep-ocean-600': { value: '#151e30' },
        'deep-ocean-700': { value: '#0d121f' },
        'deep-ocean-800': { value: '#080b14' },
        'deep-ocean-900': { value: '#030509' },

        'tentacle-purple-DEFAULT': { value: '#5e3c6d' },
        'tentacle-purple-50': { value: '#efdbf5' },
        'tentacle-purple-100': { value: '#dcb6e7' },
        'tentacle-purple-200': { value: '#c28ad8' },
        'tentacle-purple-300': { value: '#985bba' },
        'tentacle-purple-400': { value: '#734397' },
        'tentacle-purple-500': { value: '#5e3c6d' },
        'tentacle-purple-600': { value: '#472c51' },
        'tentacle-purple-700': { value: '#311f38' },
        'tentacle-purple-800': { value: '#201323' },
        'tentacle-purple-900': { value: '#100912' },

        'misty-gray-DEFAULT': { value: '#848a96' },
        'misty-gray-50': { value: '#e9eaec' },
        'misty-gray-100': { value: '#cdd1d6' },
        'misty-gray-200': { value: '#b0b7c0' },
        'misty-gray-300': { value: '#929eaa' },
        'misty-gray-400': { value: '#767f8b' },
        'misty-gray-500': { value: '#848a96' },
        'misty-gray-600': { value: '#656b72' },
        'misty-gray-700': { value: '#464b4f' },
        'misty-gray-800': { value: '#2c3034' },
        'misty-gray-900': { value: '#191b1e' },

        'abyss-black-DEFAULT': { value: '#0a0d11' },
        'abyss-black-50': { value: '#d2d2d2' },
        'abyss-black-100': { value: '#a5a5a5' },
        'abyss-black-200': { value: '#787878' },
        'abyss-black-300': { value: '#4b4b4b' },
        'abyss-black-400': { value: '#1f1f1f' },
        'abyss-black-500': { value: '#0a0d11' },
        'abyss-black-600': { value: '#08090c' },
        'abyss-black-700': { value: '#060609' },
        'abyss-black-800': { value: '#040406' },
        'abyss-black-900': { value: '#020203' },

        'stormy-blue-DEFAULT': { value: '#264d6e' },
        'stormy-blue-50': { value: '#d6e8f4' },
        'stormy-blue-100': { value: '#add4eb' },
        'stormy-blue-200': { value: '#85bfe0' },
        'stormy-blue-300': { value: '#5daad5' },
        'stormy-blue-400': { value: '#3a93c5' },
        'stormy-blue-500': { value: '#264d6e' },
        'stormy-blue-600': { value: '#1f3f59' },
        'stormy-blue-700': { value: '#17304a' },
        'stormy-blue-800': { value: '#0f2234' },
        'stormy-blue-900': { value: '#091222' },
      },
    },
    // textStyles: {
    //   heading: {
    //     description: 'Main heading text style for large titles',
    //     value: {
    //       fontSize: 'token(fontSizes.4xl)',
    //       fontWeight: '900',
    //       fontFamily: 'token(fonts.heading)',
    //       color: 'token(colors.cthulhu-green-500)',
    //     },
    //   },
    //   subheading: {
    //     description: 'Subheading text style for sections',
    //     value: {
    //       fontSize: '2xl',
    //       fontWeight: 'semibold',
    //       fontFamily: '{fonts.heading}',
    //       color: '{colors.tentacle-purple-500}',
    //       lineHeight: 'shorter',
    //     },
    //   },
    //   body: {
    //     description: 'Main body text style for readable content',
    //     value: {
    //       fontSize: 'md',
    //       fontWeight: 'normal',
    //       fontFamily: '{fonts.body}',
    //       color: '{colors.misty-gray-500}',
    //       lineHeight: 'base',
    //     },
    //   },
    //   bodyLight: {
    //     description: 'Light body text for secondary content',
    //     value: {
    //       fontSize: 'md',
    //       fontWeight: 'normal',
    //       fontFamily: '{fonts.body}',
    //       color: '{colors.ghostly-white-500}',
    //       lineHeight: 'base',
    //     },
    //   },
    //   accent: {
    //     description: 'Accent text for highlights',
    //     value: {
    //       fontSize: 'lg',
    //       fontWeight: 'semibold',
    //       fontFamily: '{fonts.body}',
    //       color: '{colors.eldritch-glow-400}',
    //       textShadow: '0px 0px 8px {colors.eldritch-glow-400}',
    //     },
    //   },
    //   caption: {
    //     description: 'Small, descriptive text for captions or labels',
    //     value: {
    //       fontSize: 'sm',
    //       fontWeight: 'light',
    //       fontFamily: '{fonts.body}',
    //       color: '{colors.stormy-blue-500}',
    //     },
    //   },
    //   link: {
    //     description: 'Text style for links',
    //     value: {
    //       fontSize: 'md',
    //       fontWeight: 'medium',
    //       fontFamily: '{fonts.body}',
    //       color: '{colors.cthulhu-green-50}',
    //       cursor: 'pointer',
    //       textDecoration: 'none',
    //       _hover: {
    //         color: '{colors.cthulhu-green-200}',
    //         backgroundColor: '{colors.cthulhu-green-700}',
    //       },
    //     },
    //   },
    // },
  },
});
