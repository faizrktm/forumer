import { defaultProps } from 'grommet';
import { deepMerge } from 'grommet/utils';
import customTheme from 'config/theme';

const mergedTheme = deepMerge(defaultProps.theme.global, customTheme.global);
export const selectColor = color => mergedTheme.colors[color];
