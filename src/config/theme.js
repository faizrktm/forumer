import { grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';

const theme = deepMerge(grommet, {
  defaultMode: "light",
  global: {
    colors: {
      brand: '#1278CE',
      softBlue: '#6BBBFF',
      text: {
        light: '#3A464F',
        dark: 'white',
      },
      grey: '#f9f9f9',
      borderGrey: '#D3D3D3',
      softGrey: '#ECECEC',
      gold: '#EFCE4A',
      placeholder: '#98A4AE',
      green: '#0F866C',
    },
    font: {
      family: 'Sarabun, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
    },
    input: {
      weight: 'normal',
      font: {
        weight: 'normal'
      },
      padding: {
        horizontal: '16px',
        vertical: '8px'
      }
    },
    control: {
      border: {
        radius: '8px'
      }
    }
  },
  text: {
    small: {
      size: '14px',
      height: '21px'
    },
    medium: {
      size: '16px',
      height: '24px'
    },
    large: {
      size: '24px',
      height: '36px'
    },
    xlarge: {
      size: '32px',
      height: '48px'
    },
  },
  button: {
    padding: {
      vertical: '8px'
    },
    border: {
      radius: '8px'
    }
  },
  select: {
    icons: {
      color: 'text'
    }
  }
});

export default theme;
