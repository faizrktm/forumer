import { grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';

const theme = deepMerge(grommet, {
  defaultMode: 'light',
  global: {
    colors: {
      'status-up': '#0F866C',
      'status-down': '#FF0000',
      brand: {
        dark: '#fff',
        light: '#0D97FF',
      },
      text: {
        dark: '#fff',
        light: '#3A464F',
      },
      dark: '#4A4A4A',
      grey: '#F9F9F9',
      sky: '#F2FAFF',
      placeholder: '#98A4AE',
      background: '#EFF2F5',
      facebook: '#4267B2',
    },
    font: {
      family: 'Sarabun, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
    },
    input: {
      weight: 'normal',
      padding: {
        horizontal: '16px',
        vertical: '8px',
      },
    },
  },
  text: {
    xxsmall: {
      size: '10px',
      height: '16px',
    },
    xsmall: {
      size: '12px',
      height: '18px',
    },
    small: {
      size: '14px',
      height: '21px',
    },
    medium: {
      size: '16px',
      height: '20px',
    },
    large: {
      size: '18px',
      height: '27px',
    },
    xlarge: {
      size: '24px',
      height: '32px',
    },
    xxlarge: {
      size: '32px',
      height: '38px',
    },
  },
  button: {
    padding: {
      vertical: '8px',
    },
    border: {
      radius: '8px',
      width: '1px',
    },
  },
  formField: {
    border: {
      color: 'transparent',
    },
    label: {
      margin: {
        horizontal: '0px',
        vertical: '8px',
      },
    },
    margin: {
      bottom: '8px',
    },
    extend: '> div { background-color: #F8F8F8; border-radius: 8px; }',
  },
  select: {
    icons: {
      color: 'placeholder',
    },
  },
  textInput: {
    extend: 'border: none !important;',
  },
  anchor: {
    extend: 'text-decoration: none !important;',
  },
});

export default theme;
