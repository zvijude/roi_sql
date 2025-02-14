import type { Config } from 'tailwindcss'
import { boxShadow, components } from 'zvijude/funcs/twTheme'

const config: Config = {
  darkMode: 'class',
  content: [
    './ui/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/zvijude/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        mobile: { min: '0px', max: '1000px' },
        desktop: { min: '1000px' },
      },
      colors: {
        solid: '#1E4DB4',
        soft: 'rgb(219 234 254)',
        sec: '#f5866d', // '#F98B71',
      },
      boxShadow,
      size: {
        4.5: '1.15rem',
        5.5: '1.4rem',
      },
    },
  },
  plugins: [
    ({ addComponents }) => {
      addComponents({
        ...components,
      })
    },
  ],
}
export default config
