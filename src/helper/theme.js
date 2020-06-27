import { defaultProps } from 'grommet';
import { deepMerge } from 'grommet/utils';
import customTheme from 'config/theme';

const mergedTheme = deepMerge(defaultProps.theme.global, customTheme.global);
// eslint-disable-next-line import/prefer-default-export
export const selectColor = (color) => mergedTheme.colors[color];
